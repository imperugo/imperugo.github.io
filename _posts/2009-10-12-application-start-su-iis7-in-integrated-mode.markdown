---
layout: post
status: publish
published: true
title: Application Start su IIS7 in Integrated Mode
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1555
wordpress_url: http://imperugo.tostring.it/blog/post/application-start-su-iis7-in-integrated-mode/
date: 2009-10-12 17:30:00.000000000 +01:00
categories:
- ASP.NET
tags:
- IIS
- IIS 7.5
- Exception
comments: true
---
<p>La settimana scorsa mi sono imbattuto in uno “strano” errore&#160; sollevato da <strong><a title="Internet Information Service" href="http://imperugo.tostring.it/blog/search?q=IIS&amp;searchButton=Go" target="_blank">Internet Information Service 7 (IIS7)</a></strong>: nello specifico veniva sollevata una <em><a title="System.Web.HttpException" href="http://msdn.microsoft.com/en-us/library/system.web.httpexception.aspx" rel="nofollow" target="_blank">System.Web.HttpException</a></em> con il seguente messaggio:</p>  <blockquote>   <p>Request is not available in this context</p> </blockquote>  <p>L’eccezione veniva sollevata dall’ <strong>Application_Start</strong> del <strong>Global.asax</strong>, in quanto cercavo di accedere all’<a title="HttpContext" href="http://msdn.microsoft.com/en-us/library/system.web.httpcontext.aspx" rel="nofollow" target="_blank">HttpContext</a> per effettuare il log di avvio dell’applicazione; in realtà non avevo necessità di accedere all’ HttpContext, ma il logger che utilizzavo di default ad ogni chiamata verificava che il Context non fosse nullo e nel caso aggiungeva info sull’url richiesto (Referrer, ecc), più o meno come mostrato di seguito:</p>  {% raw %}<pre class="brush: csharp; ruler: true;">public static IExtendedLogger General
{
    get
    {
        AddExtraInformation(general);
        return general;
    }
}


private static void AddExtraInformation(IExtendedLogger logger)
{
    HttpContext ctx = HttpContext.Current;

    if (ctx != null)
    {
        logger.ThreadProperties[&quot;Url&quot;] = ctx.Request.Url;
        logger.ThreadProperties[&quot;UrlReferrer&quot;] = ctx.Request.UrlReferrer;
        logger.ThreadProperties[&quot;UserAgent&quot;] = ctx.Request.UserAgent;
        logger.ThreadProperties[&quot;UserHostName&quot;] = ctx.Request.UserHostName;
        logger.ThreadProperties[&quot;ServerVariables&quot;] = ServerVariables(ctx.Request.ServerVariables);
        logger.ThreadProperties[&quot;Form&quot;] = ServerVariables(ctx.Request.Form);
        logger.ThreadProperties[&quot;RawURL&quot;] = ctx.Request.RawUrl;
        logger.ThreadProperties[&quot;ServerName&quot;] = ctx.Server.MachineName;
        logger.ThreadProperties[&quot;ThreadLanguage&quot;] = Thread.CurrentThread.CurrentCulture.DisplayName;
    }
}</pre>{% endraw %}

<p>In realtà non c’è nulla di strano, di fatto lo stesso codice in un’altro webserver funzionava alla grande. “Sbingando” (cercando con <a title="Bing" href="http://www.bing.com" rel="nofollow" target="_blank">bing</a>) un po’, ho scoperto di non essere l’unico ad avere questo problema e la motivazione scatenante è dovuta da un insieme di fattori:</p>

<ul>
  <li>IIS 7/7.5; </li>

  <li>Integrated Mode; </li>

  <li>Accesso all’HttpContext dall’Application_Start del global.asax; </li>
</ul>

<p>L’unica soluzione che ho trovato (al momento) è quella di cambiare uno di questi fattori, quindi o cambiare la modalità da Integrated a Classic, o evitare di utilizzare l’HttpContext nell’Application_Start. 
  <br />Personalmente ho scelto la seconda, ritengo che l’integrated mode di II7.x sia una delle features più interessanti (maggiori info <a title="IIS7 Integrated Security" href="http://learn.iis.net/page.aspx/244/how-to-take-advantage-of-the-iis7-integrated-pipeline/" rel="nofollow" target="_blank">qui</a>), o per lo meno è sicuramente più utile dell’HttpContext nell’Application_Start per un semplice log di avvio.</p>

<p>Un’altra possibile soluzione può essere quella di “aspettare” che il metodo Application_Start sia concluso per poi accedere all’HttpContext come spiegato da <a title="Mike Volodarsky&#39;s Blog" href="http://mvolo.com/blogs/serverside/default.aspx" rel="nofollow" target="_blank">Mike Volodarsky</a> <a title="IIS7 Integrated mode: Request is not available in this context exception in Application_Start" href="http://mvolo.com/blogs/serverside/archive/2007/11/10/Integrated-mode-Request-is-not-available-in-this-context-in-Application_5F00_Start.aspx" rel="nofollow" target="_blank">qui</a> e mostrato dallo snippet seguente:</p>

{% raw %}<pre class="brush: csharp; ruler: true;">void Application_BeginRequest(Object source, EventArgs e)
{
    HttpApplication app = (HttpApplication)source;
    HttpContext context = app.Context;
    // Attempt to peform first request initialization
    FirstRequestInitialization.Initialize(context);
}

class FirstRequestInitialization
{
    private static bool s_InitializedAlready = false;
    private static Object s_lock = new Object();
    // Initialize only on the first request
    public static void Initialize(HttpContext context)
    {
        if (s_InitializedAlready)
        {
            return;
        }
        lock (s_lock)
        {
            if (s_InitializedAlready)
            {
                return;
            }
            // Perform first-request initialization here ...
            s_InitializedAlready = true;
        }
    }
}</pre>{% endraw %}

<p>Ciauz</p>
