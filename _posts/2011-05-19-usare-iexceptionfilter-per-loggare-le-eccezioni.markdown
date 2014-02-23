---
layout: post
status: publish
published: true
title: Usare IExceptionFilter per loggare le eccezioni.
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1442
wordpress_url: http://imperugo.tostring.it/blog/post/usare-iexceptionfilter-per-loggare-le-eccezioni/
date: 2011-05-19 16:45:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- Logging
- Filter
comments: true
---
<p>In un post precedente (vedi <a title="Gli Action Filter ed i Global Filter di ASPNET MVC" href="http://www.tostring.it/blog/post/gli-action-filter-ed-i-global-filter-di-aspnet-mvc/" target="_blank">qui</a>) ho già introdotto il concetto di <a title="Action Filter posts" href="http://www.tostring.it/tags/archive/Filter" target="_blank">ActionFilter</a> e alcune opportunità che ci offre. In questo post vorrei mostrare come realizzarne uno custom per loggare le eccezioni.     <br />Per prima cosa è bene sapere che ogni ActionFilter deve ereditare da FilterAttribute, che è la classe base per tutti i Filter che si utilizzano in ASPNET <a title="ASP.NET MVC" href="http://tostring.it/tags/archive/mvc" target="_blank">MVC</a> e, se si vogliono catturare tutti gli errori non gestiti, è necessario implementare anche l’interfaccia IExceptionFilter.</p>  <p>Lo snippet seguente mostra l’implementazione dell’ActionFilter:</p>  {% highlight csharp %}
public class LoggerFilterAttribute : FilterAttribute, IExceptionFilter {
    readonly ILogger logger;

    /// <summary>
    /// Initializes a new instance of the <see cref="T:System.Web.Mvc.FilterAttribute"/> class.
    /// </summary>
    public LoggerFilterAttribute ( ) {
        logger = new Logger()
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="T:System.Web.Mvc.FilterAttribute"/> class.
    /// </summary>
    public LoggerFilterAttribute ( ILogger logger ) {
        this.logger = logger;
    }

    /// <summary>
    /// Called when an exception occurs.
    /// </summary>
    /// <param name="context">The filter context.</param>
    public void OnException ( ExceptionContext context ) {
        logger.Error ( context.Exception.Message, context.Exception );

        throw new HttpException(500,context.Exception.Message,context.Exception);
    }
}
{% endhighlight %}
<p>A questo punto è sufficiente decorare i nostri Controller, o ancora meglio registrare il Filter come Global per poterlo sfruttare:</p>

{% highlight csharp %}
[LoggerFilterAttribute()]
public class HomeController : ControllerBase {
  public ActionResunt Index(){
    //DO SOMETHING
  }
}
{% endhighlight %}
<p>Ciauz</p>
