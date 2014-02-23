---
layout: post
status: publish
published: true
title: AutoRun delle applicazioni Web
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1627
wordpress_url: http://imperugo.tostring.it/blog/post/autorun-delle-applicazioni-web/
date: 2009-05-28 06:03:09.000000000 +01:00
categories:
- ASP.NET
tags:
- Ottimizzazione
- Windows Server 2008
- Configurazione
- IIS 7.5
- ASP.NET 4.0
- .NET Framework 4.0
comments: true
---
<p>Con <strong>Windows Server 2008 R2</strong> e <strong>ASP.NET 4.0</strong> (entrambi in Beta) &egrave; possibile far s&igrave; che un&rsquo;applicazione web possa avviarsi automaticamente, anche se non vi &egrave; nessuna richiesta web in quel determinato istante.    <br />
In tutte le versioni precedenti ad <strong>IIS 7.5</strong> una applicazione web inizia il suo ciclo di vita nel momento in cui viene effettuata la prima richiesta da parte di un client; ho specificato precedenti ad <strong>IIS 7.5</strong> perch&eacute;, proprio con quest&rsquo;ultima versione, &egrave; possibile fare in modo che l&rsquo;applicazione si avvii automaticamente, annullando cos&igrave; la dipendenza dalla prima richiesta web.    <br />
Come prima cosa &egrave; necessario specificare ad <strong>IIS 7.5</strong> quale <strong>Application Pool</strong> deve essere avviato automaticamente e, dato che un Application Pool pu&ograve; contentere pi&ugrave; applicazioni web, quale applicazione deve essere avviata.    <br />
Tutto questo va fatto tramite il file <strong>applicationHost.config</strong> andando ad agire sulla sezione <strong>&lt;sites&gt;</strong> e, nel caso si decida di avviare un qualcosa di custom, anche nella sezione <strong>&lt;preloadProviders&gt;</strong>, come mostrato di seguito:</p>
{% raw %}<pre class="brush: xml; ruler: true;">
&lt;sites&gt;
  &lt;site name=&quot;MySite&quot; id=&quot;1&quot;&gt;
    &lt;application path=&quot;/&quot;
         preloadEnabled=&quot;true&quot;
         preloadProvider=&quot;PrewarmMyCache&quot; &gt;
    &lt;/application&gt;
  &lt;/site&gt;
&lt;/sites&gt;

&lt;preloadProviders&gt;
     &lt;add name=&quot;myPreloadImplementation&quot; type=&quot;imperugo.application.myPreloadClass, imperugo.application&quot; /&gt;
&lt;/preloadProviders&gt;</pre>{% endraw %}
<p>Come si pu&ograve; vedere il tutto &egrave; piuttosto semplice, l&rsquo;unica nota &egrave; per la classe <strong>myPreloadClass</strong> che deve necessariamente implementare l&rsquo;interfaccia <strong>IProcessHostPreloadClient</strong> presente in <strong>System.Web.Hosting</strong>.</p>
<p>Personalmente ritengo molto utile questa funzionalit&agrave; in tutte quelle applicazioni che necessitano di un pre-caching di alcune informazioni o fanno uso di timer per eseguire operazioni pianificate, laddove non sia possibile installare servizi sul server.</p>
<p>Ciauz</p>
