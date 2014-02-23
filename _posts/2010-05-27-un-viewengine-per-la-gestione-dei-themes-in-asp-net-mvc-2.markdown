---
layout: post
status: publish
published: true
title: Un ViewEngine per la gestione dei Themes in ASP.NET MVC 2
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1492
wordpress_url: http://imperugo.tostring.it/blog/post/un-viewengine-per-la-gestione-dei-themes-in-aspnet-mvc-2/
date: 2010-05-27 16:45:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- ViewEngine
- Temi
comments: true
---
<p>Tempo fa avevo parlato <a title="Gestione dei temi con ASP.NET MVC" href="http://tostring.it/blog/post/gestione-dei-temi-con-aspnet-mvc" target="_blank">qui</a> di come realizzare un ViewEngine Custom per <a href="http://www.imperugo.tostring.it/tags/archive/mvc">ASP.NET MVC</a> che permettere di gestire diversi temi per la stessa applicazione, ossia offre la possibilità di cambiare la folder dove andare a “pescare” le nostre Views, Master, etc. a runtime, ma il tutto su ASP.NET MVC 1.0.</p>  <p>Con la nuova release di MVC è stata aggiunta una comodissima novità, ossia il supporto alle “Aree”, che non sono altro che dei “sottositi” che hanno lo scopo di semplificare la struttura dei Controllers e delle Views presenti nella struttura principale.    <br />L’immagine seguente rende meglio l’idea di cosa siano le Aree e di come si collochino all’interno del nostro progetto:</p>  <p></p>  <p>&#160;</p>  <p><a href="http://tostring.it/Content/Uploaded/image//imperugo/image_5.png" rel="shadowbox"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="http://tostring.it/Content/Uploaded/image//imperugo/image_thumb_4.png" width="163" height="244" /></a>&#160;</p>  <p>Cambiando un po’ la struttura delle folders ho dovuto modificare mio “vecchio” ViewEngine in modo che “digerisca” questa nuova feature.    <br />Il codice è più o meno lo stesso del ViewEngine precedente, fatta eccezione per alcune classi (come AreaHelpers, già presente nel framework ma di tipo internal e quindi inutilizzabile).</p>  <p>Di seguito riporto il codice:</p>  <p></p>  {% highlight csharp %}
public partial class WebFormThemeViewEngine : WebFormViewEngine
{
    private static readonly string[] masterLocationFormats = new[]
                                                         {
                                                             "~/Themes/{2}/Views/{1}/{0}.master" , "~/Themes/{2}/Views/Shared/{0}.master"
                                                         };

    private static readonly string[] viewLocationFormats = new[]
                                                       {
                                                           "~/Themes/{2}/Views/{1}/{0}.aspx" , "~/Themes/{2}/Views/{1}/{0}.ascx" , "~/Themes/{2}/Views/Shared/{0}.aspx" , "~/Themes/{2}/Views/Shared/{0}.ascx"
                                                       };

    public WebFormThemeViewEngine ()
    {
        MasterLocationFormats = masterLocationFormats;
        ViewLocationFormats = viewLocationFormats;
        PartialViewLocationFormats = viewLocationFormats;
    }

    protected override bool FileExists ( ControllerContext controllerContext , string virtualPath )
    {
        try
        {
            return File.Exists ( controllerContext.HttpContext.Server.MapPath ( virtualPath ) );
        }
        catch ( HttpException exception )
        {
            if ( exception.GetHttpCode () != 404 )
                throw;
        
            return false;
        }
        catch
        {
            return false;
        }
    }
    
    /// <summary>
    ///     Finds the view.
    /// </summary>
    /// <param name = "controllerContext">The controller context.</param>
    /// <param name = "viewName">Name of the view.</param>
    /// <param name = "masterName">Name of the master.</param>
    /// <param name = "useCache">if set to <c>true</c> [use cache].</param>
    /// <returns>The page view.</returns>
    public override ViewEngineResult FindView ( ControllerContext controllerContext , string viewName , string masterName , bool useCache )
    {
        string[] strArray;
        string[] strArray2;
        
        if ( controllerContext == null )
            throw new ArgumentNullException ( "controllerContext" );
        
        if ( string.IsNullOrEmpty ( viewName ) )
            throw new ArgumentException ( "viewName must be specified." , "viewName" );
        
        
        string themeName = DexterEnvironment.Instance.Context.CurrentTheme();
        
        string requiredString = controllerContext.RouteData.GetRequiredString ( "controller" );
        
        string viewPath = this.GetPath(controllerContext, this.ViewLocationFormats, this.AreaViewLocationFormats , viewName, requiredString, "View", useCache, out strArray, themeName);
        string masterPath = this.GetPath(controllerContext, this.MasterLocationFormats, this.AreaMasterLocationFormats , masterName, requiredString, "Master", useCache, out strArray2, themeName);
        
        if ( !string.IsNullOrEmpty ( viewPath ) && ( !string.IsNullOrEmpty ( masterPath ) || string.IsNullOrEmpty ( masterName ) ) )
            return new ViewEngineResult ( CreateView ( controllerContext , viewPath , masterPath ) , this );
        
        ViewEngineResult view = new ViewEngineResult ( strArray.Union ( strArray2 ) );
        
        if (view.View == null)
            throw new HttpException(404, "File Not Found");
        
        return view;
    }

    /// <summary>
    ///     Finds the partial view.
    /// </summary>
    /// <param name = "controllerContext">The controller context.</param>
    /// <param name = "partialViewName">Partial name of the view.</param>
    /// <param name = "useCache">if set to <c>true</c> [use cache].</param>
    /// <returns>The partial view.</returns>
    public override ViewEngineResult FindPartialView ( ControllerContext controllerContext , string partialViewName , bool useCache )
    {
        string[] strArray;
        if ( controllerContext == null )
            throw new ArgumentNullException ( "controllerContext" );
        
        if ( string.IsNullOrEmpty ( partialViewName ) )
            throw new ArgumentException ( "partialViewName must be specified." , "partialViewName" );
        
        string themeName = DexterEnvironment.Instance.Context.CurrentTheme();
        
        string requiredString = controllerContext.RouteData.GetRequiredString ( "controller" );
        
        string partialViewPath = this.GetPath(controllerContext, this.PartialViewLocationFormats, this.AreaPartialViewLocationFormats , partialViewName, requiredString, "Partial", useCache, out strArray, themeName);
        
        if ( string.IsNullOrEmpty ( partialViewPath ) )
            return new ViewEngineResult ( strArray );
        
        return new ViewEngineResult ( CreatePartialView ( controllerContext , partialViewPath ) , this );
    }


    private string GetPath( ControllerContext controllerContext , string[] locations , string[] areaLocations , string name , string controllerName , string cacheKeyPrefix , bool useCache , out string[] searchedLocations , string themeName )
    {
        searchedLocations = new string[0];
        
        if (string.IsNullOrEmpty(name))
            return string.Empty;
        
        string areaName = AreaHelper.GetAreaName(controllerContext.RouteData);
        bool flag = !string.IsNullOrEmpty(areaName);
        
        List<ViewLocation> viewLocations = GetViewLocations(locations, flag ? areaLocations : null);
        
        if (viewLocations.Count == 0)
            throw new InvalidOperationException("locations must not be null or emtpy.");
        
        bool flag2 = IsSpecificPath(name);
        string key = this.CreateCacheKey(cacheKeyPrefix, name, flag2 ? string.Empty : controllerName, areaName,themeName);
        
        if (useCache)
        {
            string viewLocation = ViewLocationCache.GetViewLocation(controllerContext.HttpContext, key);
        
            if (viewLocation != null)
                return viewLocation;
        }
        
        return !flag2
                   ? this.GetPathFromGeneralName ( controllerContext , viewLocations , name , controllerName , areaName , key , ref searchedLocations, themeName )
                   : this.GetPathFromSpecificName(controllerContext, name, key, ref searchedLocations);
    }

    private static bool IsSpecificPath(string name)
    {
        char ch = name[0];
        if (ch != '~')
        {
            return (ch == '/');
        }
        return true;
    }
    
    private string CreateCacheKey(string prefix, string name, string controllerName, string areaName,string themeName)
    {
        return string.Format(CultureInfo.InvariantCulture, ":ViewCacheEntry:{0}:{1}:{2}:{3}:{4}:{5}:", new object[] { GetType().AssemblyQualifiedName, prefix, name, controllerName, areaName ?? "nullArea", themeName });
    }

    private static List<ViewLocation> GetViewLocations(string[] viewLocationFormats, string[] areaViewLocationFormats)
    {
        List<ViewLocation> list = new List<ViewLocation>();
        if ( areaViewLocationFormats != null )
            list.AddRange ( areaViewLocationFormats.Select ( str => new AreaAwareViewLocation ( str ) ).Cast<ViewLocation> () );
        
        if ( viewLocationFormats != null )
            list.AddRange ( viewLocationFormats.Select ( str2 => new ViewLocation ( str2 ) ) );
        
        return list;
    }

    private string GetPathFromGeneralName(ControllerContext controllerContext, List<ViewLocation> locations, string name, string controllerName, string areaName, string cacheKey, ref string[] searchedLocations, string themeName)
    {
        string virtualPath = string.Empty;
        searchedLocations = new string[locations.Count];
        for (int i = 0; i < locations.Count; i++)
        {
            string str2 = locations[i].Format(name, controllerName, areaName,themeName);
            if (this.FileExists(controllerContext, str2))
            {
                searchedLocations = new string[0];
                virtualPath = str2;
                this.ViewLocationCache.InsertViewLocation(controllerContext.HttpContext, cacheKey, virtualPath);
                return virtualPath;
            }
            searchedLocations[i] = str2;
        }
        return virtualPath;
    }

    private string GetPathFromSpecificName(ControllerContext controllerContext, string name, string cacheKey, ref string[] searchedLocations)
    {
        string virtualPath = name;
        if (!this.FileExists(controllerContext, name))
        {
            virtualPath = string.Empty;
            searchedLocations = new[] { name };
        }

        this.ViewLocationCache.InsertViewLocation(controllerContext.HttpContext, cacheKey, virtualPath);
        return virtualPath;
    }
}

//Classe introdotta per il supporto alle aree
internal class ViewLocation
{

    protected readonly string VirtualPathFormatString;
    
    public ViewLocation ( string virtualPathFormatString )
    {
        this.VirtualPathFormatString = virtualPathFormatString;
    }
    
    public virtual string Format ( string viewName , string controllerName , string areaName , string themeName )
    {
        return string.Format ( CultureInfo.InvariantCulture , this.VirtualPathFormatString , new object[]
                                                                                                  {
                                                                                                      viewName ,     controllerName,themeName
                                                                                                  } );
    }
}

//Classe introdotta per il supporto alle aree
internal static class AreaHelper
{
    public static string GetAreaName ( RouteData routeData )
    {
        object obj2;
        if ( routeData.DataTokens.TryGetValue ( "area" , out obj2 ) )
        {
            return ( obj2 as string );
        }
        return GetAreaName ( routeData.Route );
    }

    public static string GetAreaName ( RouteBase route )
    {
        IRouteWithArea area = route as IRouteWithArea;
        if ( area != null )
        {
            return area.Area;
        }
        Route route2 = route as Route;
        if ( ( route2 != null ) && ( route2.DataTokens != null ) )
        {
            return ( route2.DataTokens [ "area" ] as string );
        }
        return null;
    }
}

//Classe introdotta per il supporto alle aree
internal class AreaAwareViewLocation : ViewLocation
{
    public AreaAwareViewLocation(string virtualPathFormatString)
        : base(virtualPathFormatString)
    {
    }

    public override string Format( string viewName , string controllerName , string areaName , string themeName )
    {
        return string.Format(CultureInfo.InvariantCulture, VirtualPathFormatString, new object[] { viewName, controllerName, areaName });
    }

}
{% endhighlight %}
<p>Ciauz</p>

<p>.u</p>
