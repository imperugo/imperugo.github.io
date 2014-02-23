---
layout: post
status: publish
published: true
title: Unit test su HttpModule ed un HttpHandler
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1496
wordpress_url: http://imperugo.tostring.it/blog/post/unit-test-su-httpmodule-ed-httphandler/
date: 2010-05-19 16:30:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- Testing
- Unit Test
- ASP.NET
- HttpHandler
- HttpModule
comments: true
---
<p><a title="ASP.NET MVC Search" href="http://www.imperugo.tostring.it/tags/archive/mvc" target="_blank">ASP.NET MVC</a> ha aperto un mondo nuovo allo sviluppo di applicazioni web, ossia quello del testing. Di fatto, grazie ad MVC sono stati astratti alcuni concetti che precedentemente impedivano la testabilità delle webforms.</p>  <p>Purtroppo anche con MVC alcune cose rimangono scomode da testare, come gli HttpModule e HttpHandler; anzi, nella normale implementazione non sono proprio testabili. Cercando un po’ in rete ho scovato questo <a title="Unit Testable HttpModule and HttpHandlers" href="http://weblogs.asp.net/rashid/archive/2009/03/12/unit-testable-httpmodule-and-httphandler.aspx" rel="nofollow" target="_blank">post</a>, che mostra un approccio molto elegante su come effettuare Unit Test anche sui moduli e sugli handler, ma procediamo per gradi.</p>  <p>Con l’uscita del&#160; ServicePack 1 del <a title=".NET Framework Search" href="http://www.imperugo.tostring.it/tags/archive/.net" target="_blank">.NET Framework</a> è stata introdotta una nuova libreria, la “<strong><em>System.Web.Abstraction</em></strong>”, contenente una serie di wrapper che hanno lo scopo di impedire l’utilizzo diretto di alcune classi (come l’HttpContext) e, di conseguenza, permettono di testare del codice precedentemente non testabile (HttpModule e HttpHandler).     <br />Per far ciò è necessario creare delle classi base da cui tutti i Module/Handler andranno ad ereditare e gestire gli eventi a livello di baseclass, permettendo così un’eventuale override della classe concreta nel caso del Module, o un’implementazione nel caso dell’Httphandler. Nell’esempio seguente viene mostrata la base classe per un HttpModule:</p>  {% highlight csharp %}
/// <summary>
///        The base class for the HttpModules
/// </summary>
public abstract class BaseHttpModule : IHttpModule
{
    #region IHttpModule Members

    /// <summary>
    /// Initializes a module and prepares it to handle requests.
    /// </summary>
    /// <param name="context">An <see cref="T:System.Web.HttpApplication"/> that provides access to the methods, properties, and events common to all application objects within an ASP.NET application</param>
    public void Init(HttpApplication context)
    {
        context.BeginRequest += (sender, e) => OnBeginRequest(new HttpContextWrapper(((HttpApplication)sender).Context));
        context.Error += (sender, e) => OnError(new HttpContextWrapper(((HttpApplication)sender).Context));
        context.EndRequest += (sender, e) => OnEndRequest(new HttpContextWrapper(((HttpApplication)sender).Context));
    }

    /// <summary>
    /// Disposes of the resources (other than memory) used by the module that implements <see cref="T:System.Web.IHttpModule"/>.
    /// </summary>
    public virtual void Dispose()
    {
    }

    #endregion

    /// <summary>
    /// Method called when a server receive a webrequest before other requests
    /// </summary>
    /// <param name="context">The context.</param>
    public virtual void OnBeginRequest(HttpContextBase context)
    {
    }

    /// <summary>
    /// Method called when an error occurred.
    /// </summary>
    /// <param name="context">The context.</param>
    public virtual void OnError(HttpContextBase context)
    {
    }

    /// <summary>
    /// Method called when a server receive a webrequest and all methods in the request life cycle are completed.
    /// </summary>
    /// <param name="context">The context.</param>
    public virtual void OnEndRequest(HttpContextBase context)
    {
    }
}
{% endhighlight %}
<p>Da qui l’implementazione di un Module (nell’esempio il ReferrerModule di <a title="Dexter Blog Engine Category" href="http://www.imperugo.tostring.it/categories/archive/Dexter" target="_blank">dexter</a> semplificato) è piuttosto banale, l’unica differenza è che invece di agganciare un evento va effettuato l’override del metodo virtual presente sulla classe base, come mostrato di seguito:</p>

{% highlight csharp %}
public class ReferrerModule : BaseHttpModule
{
    private ILogger logger;
    private ITraceService traceService;
    private IUrlBuilderService urlbuilder;

    public ILogger Logger
    {
        get { return logger ?? (logger = IoC.Resolve<ILogger>()); }
    }

    public ITraceService TraceService
    {
        get { return traceService ?? (traceService = IoC.Resolve<ITraceService>()); }
    }

    public IUrlBuilderService Urlbuilder
    {
        get { return urlbuilder ?? (urlbuilder = IoC.Resolve<IUrlBuilderService>()); }
    }

    public ReferrerModule ()
    {
    }

    public ReferrerModule ( ILogger logger , ITraceService traceService , IUrlBuilderService urlbuilder )
    {
        this.logger = logger;
        this.traceService = traceService;
        this.urlbuilder = urlbuilder;
    }

    public override void OnEndRequest ( HttpContextBase context )
    {
        base.OnEndRequest ( context );

        if (context.Request.UrlReferrer != null)
            TraceService.AddReferrer(url.ToString(), referrer.ToString());
    }
}
{% endhighlight %}
<p>A questo punto il test è facilmente scrivibile, come mostrato sotto:</p>

{% highlight csharp %}
[TestMethod]
public void OnEndRequest_WithValidRequestUrl_ShouldInvokeTheServiceMethod()
{
    //Arrage
    var httpContext = MockRepository.GenerateStub<HttpContextBase> ();
    var httpRequest = MockRepository.GenerateStub<HttpRequestBase>();
    var httpResponse = MockRepository.GenerateStub<HttpResponseBase>();

    httpContext.Expect ( x => x.Request ).Return ( httpRequest );
    httpContext.Expect(x => x.Response).Return(httpResponse);
        
    Uri currentUrl = new Uri ( "http://www.tostring.it");
    Uri urlReferrer = new Uri ( "http://www.bing.com/search?q=imperugo");
    
    httpRequest.Expect ( x => x.Url ).Return ( currentUrl ) );
    httpRequest.Expect ( x => x.UrlReferrer ).Return ( urlReferrer ) );

    ITraceService traceService = MockRepository.GenerateMock<ITraceService> ();

    var module = new ReferrerModule (
        MockRepository.GenerateStub<ILogger> () ,
        traceService ,
        MockRepository.GenerateStub<IUrlBuilderService> ()
        );

    //Act
    module.OnBeginRequest(httpContext);

    //TODO:Assert
    traceService.AssertWasNotCalled(x => x.AddReferrer(Arg<Uri>.Is.Equal(currentUrl), Arg<Uri>.Is.Equal(urlReferrer)));
    
}
{% endhighlight %}
<p>Come potete vedere, se si ha la necessità di iniettare delle dipendenze potete creare un secondo costruttore che accetti l’instanza della dipendenza e gestire l’eventuale null nella property di get o nel costruttore parameterless (nel mio caso ero obbligato a gestire la dipendenza dalle properties perchè non avevo ancora inizializzato l’IoC Container al momento in cui l’HttpModule viene registrato nell’applicazione, problema che in Dexter si andrà a risolvere nelle prossime release).</p>

<p>Per quanto riguarda un HttpHandler l’approccio è esattamente lo stesso, classe base, metodi virtual ed override.</p>

{% highlight csharp %}
/// <summary>
///        The base class for the HttpHandlers
/// </summary>
public abstract class HttpHandlerBase : IHttpHandler
{
    #region IHttpHandler Members

    /// <summary>
    /// Gets a value indicating whether another request can use the <see cref="T:System.Web.IHttpHandler"/> instance.
    /// </summary>
    /// <value></value>
    /// <returns>true if the <see cref="T:System.Web.IHttpHandler"/> instance is reusable; otherwise, false.
    /// </returns>
    public virtual bool IsReusable
    {
        get { return false; }
    }

    /// <summary>
    /// Enables processing of HTTP Web requests by a custom HttpHandler that implements the <see cref="T:System.Web.IHttpHandler"/> interface.
    /// </summary>
    /// <param name="context">An <see cref="T:System.Web.HttpContext"/> object that provides references to the intrinsic server objects (for example, Request, Response, Session, and Server) used to service HTTP requests.</param>
    public void ProcessRequest(HttpContext context)
    {
        ProcessRequest(new HttpContextWrapper(context));
    }

    #endregion

    /// <summary>
    /// Enables processing of HTTP Web requests by a custom HttpHandler that implements the <see cref="T:System.Web.IHttpHandler"/> interface.
    /// </summary>
    /// <param name="context">An <see cref="T:System.Web.HttpContext"/> object that provides references to the intrinsic server objects (for example, Request, Response, Session, and Server) used to service HTTP requests.</param>
    public abstract void ProcessRequest(HttpContextBase context);
}
{% endhighlight %}
<p>Buopn Testing
  <br />Ciauz</p>

<p>.u</p>
