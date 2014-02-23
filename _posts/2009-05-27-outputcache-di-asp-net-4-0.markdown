---
layout: post
status: publish
published: true
title: OutputCache di ASP.NET 4.0
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1628
wordpress_url: http://imperugo.tostring.it/blog/post/outputcache-di-aspnet-40/
date: 2009-05-27 07:51:38.000000000 +01:00
categories:
- ASP.NET
tags:
- Scalabilità
- OutputCache
- UserControls
- ASP.NET 4.0
- .NET Framework 4.0
comments: true
---
<p>In un <a target="_blank" href="http://imperugo.tostring.it/Blog/Post/L-OutputCache-su-MVC-View-User-Control">precedente post</a> ho parlato della comodit&agrave; e potenzialit&agrave; dell&rsquo;<strong>OutputCache di ASP.NET</strong>, e, sempre in un&rsquo;<a target="_blank" href="http://imperugo.tostring.it/Blog/Post/Alcune-novita-di-ASPNET-40">altro post</a>, ho parlato di alcune novit&agrave; che caratterizzano la nuova versione di ASP.NET che verr&agrave; rilasciata con il Framework 4.0.     <br />
Proprio con la futura versione sar&agrave; possibile specificare un provider per l&rsquo;OutputCache che pu&ograve; essere differente tra usercontrol e usercontrol, permettendo cos&igrave; di utilizzare questo potente strumento anche in ambienti distribuiti dove la comune cache di ASP.NET non pu&ograve; arrivare.</p>
<p>Per prima cosa nel file di configurazione &egrave; stata aggiunta la possibilit&agrave; di specificare l&rsquo;elenco dei provider utilizzabili da questo tipo di cache, come mostrato di seguito:</p>
{% raw %}<pre class="brush: xml; ruler: true;">
&lt;caching&gt;
    &lt;outputCache defaultProvider=&quot; SossProvider &quot;&gt;
        &lt;providers&gt;
            &lt;add name=&quot;SossProvider&quot; type=&quot;imperugo.cache.SossOutputCacheProvider,  imperugo.cache&quot;/&gt;
            &lt;add name=&quot;NCacheProvider&quot; type=&quot;imperugo.cache.NCacheOutputCacheProvider,  imperugo.cache&quot;/&gt;
            &lt;add name=&quot;FakeProvider&quot; type=&quot;imperugo.cache.FakeOutputCacheProvider,  imperugo.cache&quot;/&gt;
        &lt;/providers&gt;
    &lt;/outputCache&gt;
&lt;/caching&gt;</pre>{% endraw %}
<p>Ogni provider che si desidera realizzare deve ereditare dalla classe astratta&nbsp; <strong>OutputCacheProvider</strong> presente in <strong>System.Web.Caching</strong>, che espone quattro metodi (<strong>Add, Get, Remove, Set</strong>).</p>
<p>A livello di UserControl basta specificare nella direttiva @Page il provider che si intende utilizzare, come mostrato dallo snippet seguente (attenzione che nella Beta 1 di VS 2010 l&rsquo;intellisense per la propriet&agrave; providerName non funziona):</p>
{% raw %}<pre class="brush: xml; ruler: true;">
&lt;%@ OutputCache Duration=&quot;60&quot; VaryByParam=&quot;None&quot;  providerName=&quot;SossProvider&quot; %&gt;</pre>{% endraw %}
<p>Personalemente avrei trovato molto comoda la possibilit&agrave; di disabilitare l&rsquo;output cache da file di configurazione (funzione comoda in fase di testing), in modo da evitare di aggiungere nuove righe o sezioni di configurazioni custom per ogni provider.</p>
<p>Ciauz</p>
