---
layout: post
status: publish
published: true
title: Controller omonimi in ASP.NET MVC
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1459
wordpress_url: http://imperugo.tostring.it/blog/post/controller-omonimi-aspnet-mvc/
date: 2011-02-02 17:36:00.000000000 +00:00
categories:
- ASP.NET
tags:
- MVC
- Routing
- ASP.NET
comments: true
---
<p>Oggi mi è capitato di dover gestire una nuova problematica in un’applicazione <a title="ASP.NET MVC Posts" href="http://www.tostring.it/tags/archive/mvc" target="_blank">ASP.NET MVC</a>. Nello specifico mi trovavo nella condizione di avere due controller con lo stesso nome; il primo era all’interno della struttura principale dell’applicazione, il secondo dentro un Area di MVC.</p>  <p>Il problema è identificabile e risolvibile a livello di routing; di fatto se si prova a guardare i seguenti controller (dai namespace è facilmente identificabile l’area):</p>  {% highlight csharp %}
namespace Dexter.Web.UI.Areas.Admin.Controllers {
  public class HomeController : BackOfficeControllerBase {
    [AcceptVerbs ( HttpVerbs.Get )]
    [OutputCache ( VaryByParam = "id" , Duration = 600 )]
    public ActionResult Index ( string id ){
      return View();
    }
  }
}


namespace Dexter.Web.UI.Controllers {
  public class HomeController : BackOfficeControllerBase {
    [AcceptVerbs ( HttpVerbs.Get )]
    [OutputCache ( VaryByParam = "id" , Duration = 600 )]
    public ActionResult Index ( string id ){
      return View();
    }
  }
}
{% endhighlight %}
<p>per la seguente Route:</p>

{% highlight csharp %}
routes.MapRoute (
    "Default" ,
    "{controller}/{action}/{id}" ,
    new {controller = "Home" , action = "Index" , id = UrlParameter.Optional}
);
{% endhighlight %}
<p>ed ad associarla all’url http://www.miosito.com/Home/Index, si può capire come MVC non sia in grado di identificare correttamente quale dei due controller Home deve essere invocato per tale richiesta, e si trova “obbligato” a sollevare un’eccezione come la seguente:</p>

<blockquote>
  <p>Multiple types were found that match the controller named 'Home'. This can happen if the route that services this request ('{controller}/{action}/{id}') does not specify namespaces to search for a controller that matches the request. If this is the case, register this route by calling an overload of the 'MapRoute' method that takes a 'namespaces' parameter.</p>

  <p>The request for 'Home' has found the following matching controllers: 
    <br />Dexter.Web.UI.Controller.HomeController 

    <br />Dexter.Web.UI.Areas.Admin.Controllers.HomeController</p>
</blockquote>

<p>Nulla di allarmante, il problema è facilmente risolvibile specificando il namespace contenente il Controller corretto nella registrazione della Route, come mostrato di seguito:</p>

{% highlight csharp %}
routes.MapRoute (
    "Default" ,
    "{controller}/{action}/{id}" ,
    new {controller = "Home" , action = "Index" , id = UrlParameter.Optional} ,
    new string[] {"Dexter.Web.UI.Controller"}
);
{% endhighlight %}
<p>A questo punto l’engine di MVC sa quale controller invocare e può esaudire correttamente la richiesta web.</p>
