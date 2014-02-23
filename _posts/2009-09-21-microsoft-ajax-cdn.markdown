---
layout: post
status: publish
published: true
title: Microsoft AJAX CDN
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1562
wordpress_url: http://imperugo.tostring.it/blog/post/microsoft-ajax-cdn/
date: 2009-09-21 14:01:15.000000000 +01:00
categories:
- ASP.NET
tags:
- Deploy
- Ajax
- .NET Framework 4.0
comments: true
---
<p>
	Da pochi giorni &egrave; stato annunciato, tramite il blog di <a href="http://weblogs.asp.net/scottgu" rel="nofollow" target="_blank" title="Scott Guthrie's Blog">Scott Guthrie</a> (<a href="http://weblogs.asp.net/scottgu/archive/2009/09/15/announcing-the-microsoft-ajax-cdn.aspx" rel="nofollow" target="_blank" title="Microsoft Ajax CDN">qui</a>),<strong> </strong><a href="http://www.microsoft.com" rel="nofollow" target="_blank" title="Microsoft Corporation"><strong>Microsoft</strong></a><strong>&nbsp;</strong><a href="http://en.wikipedia.org/wiki/Ajax_(programming)" rel="nofollow" target="_blank"><strong>AJAX</strong></a><strong> CDN (Content Delivery Network)</strong>, ossia un sistema di caching delle principali librerie AJAX utilizzate dagli sviluppatori Microsoft e non. <br />
	Nello specifico &egrave; possibile trovare tutte le librerie Microsoft Ajax e Jquery, come mostrato dall&rsquo;elenco seguente:</p>
<p>
	Url delle librerie Microsoft Ajax distribuite tramite CDN:</p>
<ul>
	<li>
		http://ajax.Microsoft.com/ajax/beta/0909/MicrosoftAjax.js;</li>
	<li>
		http://ajax.Microsoft.com/ajax/beta/0909/MicrosoftAjax.debug.js;</li>
	<li>
		http://ajax.Microsoft.com/ajax/beta/0909/MicrosoftAjaxAdoNet.js;</li>
	<li>
		http://ajax.Microsoft.com/ajax/beta/0909/MicrosoftAjaxAdoNet.debug.js;</li>
	<li>
		http://ajax.Microsoft.com/ajax/beta/0909/MicrosoftAjaxDataContext.js;</li>
	<li>
		http://ajax.Microsoft.com/ajax/beta/0909/MicrosoftAjaxDataContext.debug.js;</li>
	<li>
		http://ajax.Microsoft.com/ajax/beta/0909/MicrosoftAjaxTemplates.js;</li>
	<li>
		http://ajax.Microsoft.com/ajax/beta/0909/MicrosoftAjaxTemplates.debug.js;</li>
</ul>
<p>
	Url delle librerie JQuery distribuite tramite CDN:</p>
<ul>
	<li>
		http://ajax.Microsoft.com/ajax/jQuery/jquery-1.3.2.js;</li>
	<li>
		http://ajax.Microsoft.com/ajax/jQuery/jquery-1.3.2.min.js;</li>
	<li>
		http://ajax.Microsoft.com/ajax/jQuery/jquery-1.3.2-vsdoc.js;</li>
	<li>
		http://ajax.Microsoft.com/ajax/jQuery/jquery-1.3.2.min-vsdoc.js;</li>
</ul>
<p>
	Questo tipo di approccio dovrebbe fornire delle migliori performances sia del client che del server; quest&rsquo;ultimo si troverrebbe a gestire un minor numero di richieste e, conseguentemente, un minor traffico, mentre il client effettuerebbe il download della libreria da un server geograficamente pi&ugrave; vicino a lui e, nel caso l&rsquo;utente fosse passato per un sito che gi&agrave; utilizzava la libreria javascript tramite CDN, non effettuerebbe il download sfruttando la cache del browser.</p>
<p>
	&Egrave; gi&agrave; possibile utilizzare questo sistema di rilascio delle librerie Javascript mettendo il percorso completo per i file JS, come mostrato dallo snippet seguente:</p>
{% raw %}<pre class="brush: xml; ruler: true;"><script src="http://ajax.Microsoft.com/ajax/beta/0909/MicrosoftAjax.debug.js" type="text/javascript"></script>
<script src="http://ajax.Microsoft.com/ajax/beta/0909/MicrosoftAjaxAdoNet.debug.js" type="text/javascript"></script>
<script src="http://ajax.Microsoft.com/ajax/beta/0909/MicrosoftAjaxDataContext.debug.js" type="text/javascript"></script>
<script src="http://ajax.Microsoft.com/ajax/beta/0909/MicrosoftAjaxTemplates.debug.js" type="text/javascript"></script></pre>{% endraw %}
<p>
	Ovviamente con la prossima versione di Microsoft <a href="http://www.asp.net" rel="nofollow" target="_blank">ASP.NET</a> AJAX sar&agrave; incluso il supporto e baster&agrave; specificare, tramite un apposito attributo, se si vorr&agrave; sfruttare o no questa tipologia di rilascio, come mostrato di seguito:</p>
{% raw %}<pre class="brush: xml; ruler: true;"><asp:scriptmanager enablecdn="true" id="SM1" runat="server"></asp:scriptmanager></pre>{% endraw %}
<p>
	Un interessante post - che trovate <a href="http://idunno.org/archive/2009/09/16/quick-thoughts-on-the-microsoft-ajax-cdn.aspx" rel="nofollow" target="_blank" title="Quick thoughts on the Microsoft ajax cdn">qui</a> - spiega eventuali problemi che si possono riscontrare con tale libreria, nel caso in cui il proprio sito sia un https o il client abbia un alto numero di cookies per il dominio microsoft.com.</p>
<p>
	Ciauz</p>
