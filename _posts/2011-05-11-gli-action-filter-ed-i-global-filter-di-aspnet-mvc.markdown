---
layout: post
status: publish
published: true
title: Gli Action Filter ed i Global Filter di ASPNET MVC
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1445
wordpress_url: http://imperugo.tostring.it/blog/post/gli-action-filter-ed-i-global-filter-di-aspnet-mvc/
date: 2011-05-11 16:45:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- Filter
comments: true
---
<p>Già dalla prima release di<strong> ASPNET </strong><a title="ASP.NET MVC" href="http://tostring.it/tags/archive/mvc" target="_blank"><strong>MVC</strong></a> è stato introdotto il concetto di <strong>Action Filter</strong>, ossia un attributo che può decorare sia una singola Action o che addirittura un intero Controller. </p>  <p>Lo scopo di questi Filter è quello di <strong>aggiungere funzionalità che spesso ci troveremmo a scrivere con molta frequenza</strong>, o addirittura per ogni singola chiamata; per capire il concetto è sufficiente pensare ad una serie di Action che dovranno essere accessibili soltanto agli utenti loggati. Se provate ad immaginare questo scenario, un possibile risultato potrebbe essere questo:</p>  {% highlight csharp %}
public class HomeController : Controller {
    public ActionResult Index ( ) {
        if(!HttpContext.User.Identity.IsAuthenticated)
            Redirect ( "/Login" );

        //TODO: Fai qualcosa

        return View ( );
    }

    public ActionResult Products ( ) {
        if (!HttpContext.User.Identity.IsAuthenticated)
            Redirect ( "/Login" );

        //TODO: Fai qualcosa

        return View ( );
    }

    public ActionResult Details ( ) {
        if (!HttpContext.User.Identity.IsAuthenticated)
            Redirect ( "/Login" );

        //TODO: Fai qualcosa

        return View ( );
    }
}
{% endhighlight %}
<p>Come si può notare in tutte e tre le Action c’è un blocco di codice ripetuto che non fa altro che verificare che l’utente corrente sia autenticato e, nel caso non lo sia, lo reindirizza alla pagina di Login. Lo scopo degli Action Filter è di racchiudere tutta la logica che può essere comune alle Action, indipendentemente dal Binder in entrata e da ciò che la Action stessa deve fare, permettendoci così di sostituire tutte quelle righe di codice con un semplice attributo. Di fatto l’esecuzione del Filter avviene prima dell’esecuzione del codice presente all’interno della Action.
  <br />Lo snippet seguente mostra le stesse identiche Action dell’esempio precedente, ma con l’utilizzo degli Action Filter:</p>

{% highlight csharp %}
public class HomeController : Controller {
    [Authorize]
    public ActionResult Index ( ) {
        //TODO: Fai qualcosa

        return View ( );
    }

    [Authorize]
    public ActionResult Products ( ) {
        //TODO: Fai qualcosa

        return View ( );
    }

    [Authorize]
    public ActionResult Details ( ) {
        //TODO: Fai qualcosa

        return View ( );
    }
}

Oppure a livello di controller

[Authorize]
public class HomeController : Controller {
    public ActionResult Index ( ) {
        //TODO: Fai qualcosa

        return View ( );
    }

    public ActionResult Products ( ) {
        //TODO: Fai qualcosa

        return View ( );
    }
    
    public ActionResult Details ( ) {
        //TODO: Fai qualcosa

        return View ( );
    }
}
{% endhighlight %}
<p>All’interno di MVC esistono già diversi Action Filter, come l’Authorize mostrato sopra, oltre ad altri come OutputCache, HandleError, etc; inoltre nulla ci vieta di crearne dei nostri custom, come mostrato in un mio precedente post (<a title="Realizzare un ActionFilter per ottimizzare le nostre pagine web" href="http://imperugo.tostring.it/Blog/Post/Realizzare-un-ActionFilter-per-ottimizzare-le-nostre-pagine-web" target="_blank">qui</a>).</p>

<p>L’ultima release di MVC (la 3, di cui ho già parlato in parte <a title="Un MIX 2011 ricco di novità" href="http://tostring.it/blog/post/un-mix-2011-ricco-di-novita/" target="_blank">qui</a>) offre la possibilità di registrare i controlli in modalità globale per tutta l’applicazione, evitandoci così il noioso copia ed incolla per tutti i controller dell’applicazione. </p>

<p>Per far ciò è necessario registrare l’Action Filter nel global.asax, come mostrato di seguito:</p>

{% highlight csharp %}
protected void Application_Start ( ) {
    AreaRegistration.RegisterAllAreas ( );

    GlobalFilters.Filters.Add ( new HandleErrorAttribute ( ) );
    GlobalFilters.Filters.Add ( new AuthorizeAttribute ( ) );

    RegisterRoutes ( RouteTable.Routes );
}
{% endhighlight %}
<p>Non male direi.</p>

<p>Ciauz</p>
