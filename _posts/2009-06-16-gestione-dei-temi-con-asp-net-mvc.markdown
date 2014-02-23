---
layout: post
status: publish
published: true
title: Gestione dei temi con ASP.NET MVC
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1622
wordpress_url: http://imperugo.tostring.it/blog/post/gestione-dei-temi-con-aspnet-mvc/
date: 2009-06-16 02:14:12.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- ViewEngine
- Temi
- ASP.NET
- .NET
- Controller
comments: true
---
<p>Nella prima versione di <strong>ASP.NET MVC</strong> non &egrave; presente la possibilit&agrave; di gestire i temi nelle applicazioni: ci&ograve; significa che, per tutti i siti sviluppati con questo <strong>Framework</strong> che necessitino di una forte customizzazione dell&rsquo;interfaccia web, &egrave; necessario realizzare un&rsquo;implementazione custom in grado di far ci&ograve;.</p>
<p>Com&rsquo;&egrave; possibile apprendere dalla roadmap della versione <strong>2.0</strong> di <strong>ASP.NET MVC</strong>&nbsp;<a target="_blank" rel="nofollow" href="http://aspnet.codeplex.com/Wiki/View.aspx?title=Road%20Map&amp;referringTitle=Home">qui</a>, che sar&agrave; inglobata in <strong>ASP.NET</strong>, avr&agrave; incluso un sistema per la gestione dei temi; in attesa del rilascio, una possibile soluzione per affrontare il problema &egrave; quella di sostituire il <strong>WebFormViewEngine</strong> con uno realizzato ad hoc, in grado di cambiare la <strong>View</strong> in base al tema scelto.</p>
<p>Sebbene sia possibile realizzare forti customizzazioni dell&rsquo;interfaccia cambiando semplicemente il foglio di stile della pagina, a volte questo pu&ograve; non bastare in quanto si necessita di un particolare markup di output, tipo <strong>HTML Strict</strong>, <strong>Transitional</strong>, ecc;     <br />
per rendersi meglio conto della situazione basta pensare ad un dispositivo mobile, la cui visualizzazione &egrave; differente da quella di browser su un normale computer, e alle molte interazioni che da una parte avvengono tramite javascript, dall&rsquo;altra devono avvenire senza.</p>
<p>L&rsquo;immagine seguente mostra la nuova struttura per le <strong>Views</strong> e i <strong>Contents</strong> di un&rsquo;applicazione che fa uso del Framework <strong>ASP.NET MVC</strong>:</p>
<p>&nbsp;</p>
<p><a href="http://imperugo.tostring.it/Content/Uploaded/image/Temi_2.png" rel="shadowbox[Gestione-dei-temi-con-ASPNET-MVC];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase title="Temi" style="border-right: 0px; border-top: 0px; display: inline; border-left: 0px; border-bottom: 0px" height="240" alt="Temi" width="244" border="0" src="http://imperugo.tostring.it/Content/Uploaded/image/Temi_thumb.png" /></a></p>
<p>Per far s&igrave; che l&rsquo;applicazione cambi il percorso da cui leggere la <strong>View</strong>, &egrave; necessario realizzare un nuovo <strong>WebFormViewEngine</strong>; nell&rsquo;esempio, come quello mostrato di seguito, si chiamer&agrave; <strong>WebFormThemeViewEngine</strong>:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
public class WebFormThemeViewEngine : WebFormViewEngine
{
    private static readonly string[] masterLocationFormats = new[] { &quot;~/Themes/{2}/Views/{1}/{0}.master&quot;, &quot;~/Themes/{2}/Views/Shared/{0}.master&quot; };
    private static readonly string[] viewLocationFormats = new[] { &quot;~/Themes/{2}/Views/{1}/{0}.aspx&quot;, &quot;~/Themes/{2}/Views/{1}/{0}.ascx&quot;, &quot;~/Themes/{2}/Views/Shared/{0}.aspx&quot;, &quot;~/Themes/{2}/Views/Shared/{0}.ascx&quot; };

    public WebFormThemeViewEngine()
    {
        MasterLocationFormats = masterLocationFormats;
        ViewLocationFormats = viewLocationFormats;
        PartialViewLocationFormats = viewLocationFormats;
    }

    protected override bool FileExists(ControllerContext controllerContext, string virtualPath)
    {
        try
        {
            return File.Exists(controllerContext.HttpContext.Server.MapPath(virtualPath));
        }
        catch (HttpException exception)
        {
            if (exception.GetHttpCode() != 0x194)
            {
                throw;
            }
            return false;
        }
        catch
        {
            return false;
        }
    }

    /// &lt;summary&gt;
    /// Finds the view.
    /// &lt;/summary&gt;
    /// &lt;param name=&quot;controllerContext&quot;&gt;The controller context.&lt;/param&gt;
    /// &lt;param name=&quot;viewName&quot;&gt;Name of the view.&lt;/param&gt;
    /// &lt;param name=&quot;masterName&quot;&gt;Name of the master.&lt;/param&gt;
    /// &lt;param name=&quot;useCache&quot;&gt;if set to &lt;c&gt;true&lt;/c&gt; [use cache].&lt;/param&gt;
    /// &lt;returns&gt;The page view.&lt;/returns&gt;
    /// &lt;exception cref=&quot;ArgumentNullException&quot;&gt;&lt;c&gt;controllerContext&lt;/c&gt; is null.&lt;/exception&gt;
    /// &lt;exception cref=&quot;ArgumentException&quot;&gt;viewName must be specified.&lt;/exception&gt;
    public override ViewEngineResult FindView(ControllerContext controllerContext, string viewName, string masterName, bool useCache)
    {
        string[] strArray;
        string[] strArray2;

        if (controllerContext == null)
            throw new ArgumentNullException(&quot;controllerContext&quot;);
        
        if (string.IsNullOrEmpty(viewName))
            throw new ArgumentException(&quot;viewName must be specified.&quot;, &quot;viewName&quot;);

        string themeName = GetThemeToUse(controllerContext);

        string requiredString = controllerContext.RouteData.GetRequiredString(&quot;controller&quot;);

        string viewPath = GetPath(controllerContext, ViewLocationFormats, viewName, themeName, requiredString, &quot;View&quot;, useCache, out strArray);
        string masterPath = GetPath(controllerContext, MasterLocationFormats, masterName, themeName, requiredString, &quot;Master&quot;, useCache, out strArray2);

        if (!string.IsNullOrEmpty(viewPath) &amp;&amp; (!string.IsNullOrEmpty(masterPath) || string.IsNullOrEmpty(masterName)))
            return new ViewEngineResult(CreateView(controllerContext, viewPath, masterPath), this);
            
        return new ViewEngineResult(strArray.Union(strArray2));
    }

    /// &lt;summary&gt;
    /// Finds the partial view.
    /// &lt;/summary&gt;
    /// &lt;param name=&quot;controllerContext&quot;&gt;The controller context.&lt;/param&gt;
    /// &lt;param name=&quot;partialViewName&quot;&gt;Partial name of the view.&lt;/param&gt;
    /// &lt;param name=&quot;useCache&quot;&gt;if set to &lt;c&gt;true&lt;/c&gt; [use cache].&lt;/param&gt;
    /// &lt;returns&gt;The partial view.&lt;/returns&gt;
    /// &lt;exception cref=&quot;ArgumentNullException&quot;&gt;&lt;c&gt;controllerContext&lt;/c&gt; is null.&lt;/exception&gt;
    /// &lt;exception cref=&quot;ArgumentException&quot;&gt;partialViewName must be specified.&lt;/exception&gt;
    public override ViewEngineResult FindPartialView(ControllerContext controllerContext, string partialViewName, bool useCache)
    {
        string[] strArray;
        if (controllerContext == null)
            throw new ArgumentNullException(&quot;controllerContext&quot;);
            
        if (string.IsNullOrEmpty(partialViewName))
            throw new ArgumentException(&quot;partialViewName must be specified.&quot;, &quot;partialViewName&quot;);

        string themeName = GetThemeToUse(controllerContext);

        string requiredString = controllerContext.RouteData.GetRequiredString(&quot;controller&quot;);
        string partialViewPath = GetPath(controllerContext, PartialViewLocationFormats, partialViewName, themeName, requiredString, &quot;Partial&quot;, useCache, out strArray);
        if (string.IsNullOrEmpty(partialViewPath))
        {
            return new ViewEngineResult(strArray);
        }
        return new ViewEngineResult(CreatePartialView(controllerContext, partialViewPath), this);
    }

    private static string GetThemeToUse(ControllerContext controllerContext)
    {
        return controllerContext.HttpContext.Items[&quot;theme&quot;] as string ?? &quot;Default&quot;;
    }

    /// &lt;summary&gt;
    /// Gets the path.
    /// &lt;/summary&gt;
    /// &lt;param name=&quot;controllerContext&quot;&gt;The controller context.&lt;/param&gt;
    /// &lt;param name=&quot;locations&quot;&gt;The locations.&lt;/param&gt;
    /// &lt;param name=&quot;name&quot;&gt;The name.&lt;/param&gt;
    /// &lt;param name=&quot;themeName&quot;&gt;Name of the theme.&lt;/param&gt;
    /// &lt;param name=&quot;controllerName&quot;&gt;Name of the controller.&lt;/param&gt;
    /// &lt;param name=&quot;cacheKeyPrefix&quot;&gt;The cache key prefix.&lt;/param&gt;
    /// &lt;param name=&quot;useCache&quot;&gt;if set to &lt;c&gt;true&lt;/c&gt; [use cache].&lt;/param&gt;
    /// &lt;param name=&quot;searchedLocations&quot;&gt;The searched locations.&lt;/param&gt;
    /// &lt;returns&gt;&lt;/returns&gt;
    /// &lt;exception cref=&quot;InvalidOperationException&quot;&gt;locations must not be null or emtpy.&lt;/exception&gt;
    private string GetPath(ControllerContext controllerContext, string[] locations, string name, string themeName, string controllerName, string cacheKeyPrefix, bool useCache, out string[] searchedLocations)
    {
        searchedLocations = new string[0];
        if (string.IsNullOrEmpty(name))
            return string.Empty;
            
        if ((locations == null) || (locations.Length == 0))
            throw new InvalidOperationException(&quot;locations must not be null or emtpy.&quot;);

        bool flag = IsSpecificPath(name);
        string key = CreateCacheKey(cacheKeyPrefix, name, flag ? string.Empty : controllerName, themeName);
        
        if (useCache)
        {
            string viewLocation = ViewLocationCache.GetViewLocation(controllerContext.HttpContext, key);
            
            if (viewLocation != null)
                return viewLocation;
        }
        
        if (!flag)
            return GetPathFromGeneralName(controllerContext, locations, name, controllerName, themeName, key, ref searchedLocations);
        
        return GetPathFromSpecificName(controllerContext, name, key, ref searchedLocations);
    }

    private static bool IsSpecificPath(string name)
    {
        char ch = name[0];
        
        if (ch != '~')
            return (ch == '/');
        
        return true;
    }

    private string CreateCacheKey(string prefix, string name, string controllerName, string themeName)
    {
        return string.Format(CultureInfo.InvariantCulture, &quot;:ViewCacheEntry:{0}:{1}:{2}:{3}:{4}&quot;, new object[] {GetType().AssemblyQualifiedName, prefix, name, controllerName, themeName});
    }

    private string GetPathFromGeneralName(ControllerContext controllerContext, string[] locations, string name, string controllerName, string themeName, string cacheKey, ref string[] searchedLocations)
    {
        string virtualPath = string.Empty;
        searchedLocations = new string[locations.Length];
        for (int i = 0; i &lt; locations.Length; i++)
        {
            string str2 = string.Format(CultureInfo.InvariantCulture, locations[i], new object[] {name, controllerName, themeName});

            if (FileExists(controllerContext, str2))
            {
                searchedLocations = new string[0];
                virtualPath = str2;
                ViewLocationCache.InsertViewLocation(controllerContext.HttpContext, cacheKey, virtualPath);
                return virtualPath;
            }
            searchedLocations[i] = str2;
        }
        return virtualPath;
    }

    private string GetPathFromSpecificName(ControllerContext controllerContext, string name, string cacheKey, ref string[] searchedLocations)
    {
        string virtualPath = name;
        if (!FileExists(controllerContext, name))
        {
            virtualPath = string.Empty;
            searchedLocations = new[] {name};
        }
        ViewLocationCache.InsertViewLocation(controllerContext.HttpContext, cacheKey, virtualPath);
        return virtualPath;
    }
}</pre>{% endraw %}
<p>Come si pu&ograve; notare, basta replicare i metodi delle classi <strong>WebFormViewEngine</strong> e <strong>VirtualPathProviderViewEngine</strong>, andando a cambiare i percorsi tramite le 3 variabili impostate dal costruttore dell&rsquo;engine.    <br />
&Egrave; importante notare il metodo che restituisce il tema corrente, <strong><em>GetThemeToUse</em></strong>, che sar&agrave; utilizzato per andare a costruire il path da dove leggere le <strong>Views</strong> e i <strong>Contents</strong>.    <br />
Nell&rsquo;esempio mostrato &egrave; stata utilizzata la collection Items dell&rsquo;<strong>HttpContext</strong> in modo da poter cambiare anche solo provvisoriamente il tema da visualizzare (<em>http://localhost:1659/?theme=yellow</em>), come mostrato dallo snippet seguente:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
public abstract class ControllerBase : Controller
{
    private string currentTheme;

    protected override void Initialize(RequestContext requestContext)
    {
        //Andrebbe recuperato dal profilo
        string defaultTheme = &quot;Default&quot;;

        string previewTheme = requestContext.HttpContext.Request.QueryString[&quot;theme&quot;];

        requestContext.HttpContext.Items[&quot;theme&quot;] = !string.IsNullOrEmpty(previewTheme) ? previewTheme : defaultTheme;

        currentTheme = (string)requestContext.HttpContext.Items[&quot;theme&quot;];

        base.Initialize(requestContext);

        ViewData[&quot;ThemeName&quot;] = currentTheme;
    }
}</pre>{% endraw %}
<p>Questa funzione pu&ograve; risultare particolamente comoda quando si ha la necessit&agrave; di vedere un&rsquo;anteprima di una skin con i propri contenuti.</p>
<p>Per concludere ed utilizzare la nuova skin <strong>&egrave; necessario registrare il nuovo WebFormViewEngine nel file Global.asax</strong>, come mostrato di seguito:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
protected void Application_Start()
{
    RegisterRoutes(RouteTable.Routes);

    // Sostituisco il Default WebFormViewEngine con il nostro WebFormThemeViewEngine
    ViewEngines.Engines.Clear();
    ViewEngines.Engines.Add(new WebFormThemeViewEngine());
}</pre>{% endraw %}
<p>Ciauz</p>
<p>&nbsp;</p>
<div class="wlWriterEditableSmartContent" id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:52655c24-1c13-4895-80ab-60857200df94" style="padding-right: 0px; display: inline; padding-left: 0px; float: none; padding-bottom: 0px; margin: 0px; padding-top: 0px">
<p>Download Esempio <a target="_blank" href="http://imperugo.tostring.it/Content/Uploaded/image/imperugo.sample.mvc.themes.zip">qui</a></p>
</div>
<p>&nbsp;</p>
