---
layout: post
status: publish
published: true
title: Microsoft AJAX CDN con il supporto all’https
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1535
wordpress_url: http://imperugo.tostring.it/blog/post/microsoft-ajax-cdn-con-il-supporto-allrsquohttps/
date: 2009-12-02 07:58:42.000000000 +00:00
categories:
- ASP.NET
tags:
- Deploy
- Ajax
comments: true
---
<p>
	In un post <a href="http://imperugo.tostring.it/blog/post/microsoft-ajax-cdn" target="_blank" title="Microsoft AJAX CDN (Content Delivery Network)">precedente</a> avevo parlato del <a href="http://www.microsoft.com" rel="nofollow" target="_blank" title="Microsoft Corporation">Microsoft</a>&nbsp;<a href="http://en.wikipedia.org/wiki/Ajax_(programming)" rel="nofollow" target="_blank">AJAX</a>&nbsp;<strong>CDN (Content Delivery Network), con una</strong> breve spiegazione dei problemi che questo approccio pu&ograve; portare, come quando ad esempio lo si&nbsp; utilizza in connessioni protette (https).</p>
<p>
	A pochi mesi dall&rsquo;uscita Microsoft annuncia, tramite <a href="http://weblogs.asp.net/scottgu" rel="nofollow" target="_blank" title="Scott Guthrie's Blog">Scott Guthrie</a>, la possibilit&agrave; di sfruttare questo servizio anche in connessioni https. Ovviamente la cosa &egrave; semplicissima, l&rsquo;url rimane identico, basta aggiungere la &ldquo;s&rdquo; ed il gioco &egrave; fatto.</p>
<p>
	Connessione non protetta:</p>
{% raw %}<pre class="brush: xml; ruler: true;"><script src="http://ajax.microsoft.com/ajax/jquery/jquery-1.3.2.js" type="text/javascript"></script>  </pre>{% endraw %}
<p>
	Connessione protetta:</p>
{% raw %}<pre class="brush: xml; ruler: true;"><script src="https://ajax.microsoft.com/ajax/jquery/jquery-1.3.2.js" type="text/javascript"></script>  </pre>{% endraw %}
<p>
	Un&rsquo;altra importante novit&agrave; sono le numerose librerie aggiunte; nello specifico ora &egrave; possibile avere tramite il CDN le seguenti librerie:</p>
<ul>
	<li>
		<strong>ASP.NET Ajax Library version 0911 (Beta)</strong>;</li>
	<li>
		<strong>ASP.NET Ajax Library version 0910 (Preview 6)</strong>;</li>
	<li>
		<strong>ASP.NET Ajax Library version 0909 (Preview 5)</strong>;</li>
	<li>
		<strong>ASP.NET Ajax Library version 3.5</strong>;</li>
	<li>
		<strong>jQuery version 1.3.2</strong>;</li>
	<li>
		<strong>jQuery Validate 1.5.5</strong>;</li>
	<li>
		<strong>ASP.NET MVC 1.0</strong>;</li>
</ul>
<p>
	Maggiori info <a href="http://www.asp.net/ajaxLibrary/cdn.ashx" rel="nofollow" target="_blank">qui</a>.<br />
	Ciauz</p>
