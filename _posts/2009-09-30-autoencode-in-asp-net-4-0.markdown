---
layout: post
status: publish
published: true
title: AutoEncode in ASP.NET 4.0
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1559
wordpress_url: http://imperugo.tostring.it/blog/post/autoencode-in-aspnet-40/
date: 2009-09-30 01:30:00.000000000 +01:00
categories:
- ASP.NET
tags:
- ASP.NET 4.0
comments: true
---
<p>Sinceramente mi ero chiesto perchè non esistesse in <a href="http://www.asp.net" rel="nofollow" target="_blank">ASP.NET</a> un qualcosa per effettuare l’encode di una stringa nel markup senza ricorrere ogni volta all’<a title="HttpUtility HtmlEncode Method" href="http://msdn.microsoft.com/en-us/library/system.web.httputility.htmlencode.aspx" rel="nofollow" target="_blank">apposito metodo</a> della classe <a title="HttpUtility Calss" href="http://msdn.microsoft.com/en-us/library/system.web.httputility.aspx" rel="nofollow" target="_blank">HttpUtility</a>; ovviamente questo non è un grandissimo problema, ma allunga i tempi di scrittura del codice e, IMHO, aggiunge verbosità allo stesso.</p>  <p>Per comodità mi sono realizzato un extension method per le stringhe che si occupa di effettuare l’encode/decode sia per l’html che per l’url, facilitando un po’ la scrittura del codice, come mostrato di seguito:</p>  {% raw %}<pre class="brush: xml; ruler: true;">&lt;!-- metodo classico --&gt;
&lt;%= Server.HtmlEncode(myVar) %&gt;

&lt;!-- con extension method --&gt;
&lt;%= myVar.EncodeHtml() %&gt;</pre>{% endraw %}

<p>In ASP.NET 4.0 esisterà qualcosa di ancor più comodo ed immediato - lo annuncia <a title="Phil Haac" href="http://www.haacked.com/" rel="nofollow" target="_blank">Phil Haac</a> <a title="Html encoding code nuggets" href="http://haacked.com/archive/2009/09/25/html-encoding-code-nuggets.aspx" rel="nofollow" target="_blank">qui</a> - ossia una nuova “sintassi” per i blocchi di codice nelle pagine aspx (ovviemente vale anche per i controlli, view, ecc)&#160; che effettuerà per noi l’encode in HTML: infatti oltre al binding ed al response ci sarà Html Encoding, come mostrato di seguito:</p>

{% raw %}<pre class="brush: xml; ruler: true;">&lt;%: myVar %&gt;</pre>{% endraw %}

<p>Sarebbe bello poter specificare un provider per cambiare il sistema di encoding, e magari anche sostituire l’HtmlEncode della classe HttpUtility con quello della <a title="XSS Cross Site Scripting" href="http://imperugo.tostring.it/Tags/Archive/XSS+Cross+Site+Scripting" target="_blank">Anti-XSS</a>.</p>
