---
layout: post
status: publish
published: true
title: L'OutputCache su MVC View User Control
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1632
wordpress_url: http://imperugo.tostring.it/blog/post/l-outputcache-su-mvc-view-user-control/
date: 2009-05-15 02:39:24.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- OutputCache
- UserControls
- ASP.NET
- .NET
- Controls
- Framework
- Cache
comments: true
---
<p>Personalmente faccio parecchio uso dell'<strong>OutputCache</strong>, e lo ritengo uno dei migliori sistemi di caching (in ambienti non distribuiti) che si possano utilizzare: il vantaggio consiste nel fatto che viene messo in cache il markup gi&agrave; elaborato, tagliando di netto dall'applicazione tutta la parte di elaborazione dati necessaria alla creazione della pagina, o una sua porzione; in pratica &egrave; come avere un file statico in ram!</p>
<p>Nella maggior parte dei casi non &egrave; possibile utilizzare l'<strong>OutputCache</strong> sull'intera pagina web in quanto questa pu&ograve; contenere informazioni differenti da utente a utente, come delle porzioni di pagine visibili solo ad alcuni ruoli o la maschera di login nel caso l'utente non sia loggato; <br />
&egrave; comunque sicuramente vantaggioso utilizzare l'outputcache su porzioni di pagine (usercontrol). <br />
In <a target="_blank" href="http://www.asp.net/mvc">ASP.NET MVC</a> ho avuto problemi nell'adottare questa tecnica in quanto, per renderizzare lo usercontrol, utilizzavo il metodo <strong>RenderPartial</strong>, che ignora totalmente l'attributo <strong>OutputCache</strong> . <br />
Da quanto invece apprendo dal blog di <a target="_blank" href="http://haacked.com/">Phil Haack</a>&nbsp;(maggiori info <a target="_blank" href="http://haacked.com/archive/2009/05/12/donut-hole-caching.aspx">qui</a>), risulta che &egrave; comunque possibile risolvere tale problema sostituendo l'utilizzo del <strong>RenderPartial</strong> ed andando a registrare il controllo, utilizzandolo cos&igrave; tramite il suo tag, come mostrato dal blocco di codice seguente:</p>
{% raw %}<pre class="brush: xml; ruler: true;">
&lt;%@ Register Src=&quot;~/Views/Home/Partial.ascx&quot; TagName=&quot;Partial&quot; TagPrefix=&quot;imperugo&quot; %&gt;

&lt;p&gt;
    Metodo con Registrazione del tag
    &lt;imperugo:Partial runat=&quot;server&quot; /&gt;
&lt;/p&gt;</pre>{% endraw %}
<p>In allegato trovate un progetto che mostra lo stesso <strong>MVC View User Control</strong> utilizzato con le due metodologie, e, al refresh della pagina, si potr&agrave; notare la differenza di comportamento.</p>
<p>Ciauz</p>
<div id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:31e2a09a-6af0-42f5-b161-b6b1ee340386" class="wlWriterEditableSmartContent" style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px">
<p>Download Esempio <a target="_blank" href="http://imperugo.tostring.it/Content/Uploaded/image/imperugo.sample.mvc.outputcache.zip">qui</a></p>
</div>
