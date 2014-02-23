---
layout: post
status: publish
published: true
title: Loggare il ricliclo dell'Application Domain
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1591
wordpress_url: http://imperugo.tostring.it/blog/post/loggare-il-ricliclo-dell-application-domain/
date: 2009-07-27 03:13:12.000000000 +01:00
categories:
- ASP.NET
tags:
- ASP.NET
- .NET
- IIS
- Dexter
comments: true
---
<p>Nello sviluppare <a href="http://imperugo.tostring.it/About/Dexter">Dexter</a> ho avuto diversi problemi con la cache che, per cause non mie, non ne voleva sapere di andare, al contrario di quello che succede nell&rsquo;ambiente di sviluppo dove funziona alla grande.</p>
<p>Nello specifico il problema consiste nel fatto che, spesso, gli oggetti inseriti precedentemente in cache risultano nulli, venendo quindi rimossi.</p>
<p>I motivi per cui un oggetto pu&ograve; essere rimosso dalla cache sono decisamente pochi:</p>
<ul>
    <li>rimozione manuale tramite codice;</li>
    <li>Shoutdown causa riciclo o crash del worlprocess;</li>
    <li>fine della memoria disponibile.</li>
</ul>
<p>Dato che sono certo di non aver svuotato la cache via codice J, la ricerca del problema si &egrave; subito spostata sulla seconda ipotesi, e mi son messo a loggare lo shoutdown lato applicativo, non avendo accesso al server.</p>
<p>Sfortunatamente questa non &egrave; cosa semplice perch&egrave; non &egrave; detto che il WorkProcess non venga &ldquo;killato&rdquo; manualmente sul server, oppure che un&rsquo;altra applicazione presente all&rsquo;interno dello stesso application pool non provochi un&rsquo;eccezione che termini il processo.</p>
<p><a href="http://weblogs.asp.net/scottgu/default.aspx" title="Scott Guthrie" rel="nofollow" target="_blank">ScottGu</a>, nel suo blog, propone una possibile soluzione che consiste nell&rsquo;invocare via reflection i metodi _shutDownMessage e _shutDownStack, che forniscono tutte le informazioni per capire il motivo che ha scatenato lo shoutdown, come mostrato di seguito.</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
public void Application_End()
{

    HttpRuntime runtime = (HttpRuntime)typeof(System.Web.HttpRuntime).InvokeMember(&quot;_theRuntime&quot;,BindingFlags.NonPublic| BindingFlags.Static| BindingFlags.GetField,null,null,null);

    if (runtime == null)
        return;

    string shutDownMessage = (string)runtime.GetType().InvokeMember(&quot;_shutDownMessage&quot;,BindingFlags.NonPublic| BindingFlags.Instance| BindingFlags.GetField,null,runtime,null);

    string shutDownStack = (string)runtime.GetType().InvokeMember(&quot;_shutDownStack&quot;,BindingFlags.NonPublic| BindingFlags.Instance| BindingFlags.GetField,null,runtime,null);
    
    Logger.Error(shutDownMessage, shutDownStack);
}</pre>{% endraw %}
<p>Maggiori info le trovate <a href="http://weblogs.asp.net/scottgu/archive/2005/12/14/433194.aspx" title="Logging ASP.NET Application Shutdown Events" rel="nofollow" target="_blank">qui</a>.</p>
