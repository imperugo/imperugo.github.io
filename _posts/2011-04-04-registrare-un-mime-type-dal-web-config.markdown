---
layout: post
status: publish
published: true
title: Registrare un mime type dal web.config
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1452
wordpress_url: http://imperugo.tostring.it/blog/post/registrare-un-mime-type-dal-web-config/
date: 2011-04-04 16:45:00.000000000 +01:00
categories:
- ASP.NET
tags:
- Configurazione
- IIS
- IIS 7.5
comments: true
---
<p>
	<a href="http://tostring.it/tags/archive/iis" target="_blank" title="Internet Information Service posts">Internet Information Service</a> (IIS) versione 7.x offre la possibilit&agrave; di configurare il proprio sito un po&rsquo; pi&ugrave; in autonomia rispetto alle versioni precedenti.</p>
<p>
	Quando parlo di autonomia mi riferisco alla possibilit&agrave; di cambiare tutti quei parametri che normalmente richiedono l&rsquo;accesso alla console di IIS sul server, come compressione dei files, static content, mime types, etc. ; e proprio dell&rsquo;abilitazione dei mime-type volevo parlare quest&rsquo;oggi.</p>
<p>
	Prima di vedere come aggiungere nuovi <em>mime-type</em> alla configurazione di IIS, &egrave; giusto capire il perch&eacute; un webserver non consenta l&rsquo;accesso ad alcune estensioni di default, bloccando di conseguenza alcuni file a noi utili. <br />
	La risposta si racchiude in una sola parola: <strong>Sicurezza</strong>.</p>
<p>
	Di fatto, se non ci fosse questo tipo di blocco, un utente potrebbe scaricare anche files con dati sensibili, tipo .mdb, .inc, etc., ossia tutti quei files che il client non dovrebbe mai vedere J.</p>
<p>
	Capito il perch&eacute; esistono questi blocchi, &egrave; necessario capire come abilitarne alcuni non accessibili normalmente. <br />
	A partire dalla versione 7.x di IIS siamo abituati a vedere una nuova sezione nel file di configurazione: &ldquo;system.webServer&rdquo;, sezione questa che viene ignorata nel caso l&rsquo;applicazione stia girando in una versione antecedente alla 7.x (quindi non spaventiamoci se ci troviamo su Windows 2003 ed abbiamo questa strana sezione J).</p>
<p>
	Al suo interno possiamo impostare parecchi parametri, tra i quali ci sono i mime-type. Questa procedura &egrave; veramente molto semplice, ci basta infatti aggiungere poche righe di XML per avere ci&ograve; che ci serve, come mostrato dal codice seguente:</p>
{% highlight xml %}
<system.webserver>
    <staticcontent>
        <mimemap fileextension=".mp4" mimetype="video/mp4">
        <mimemap fileextension=".m4v" mimetype="video/m4v">
    </mimemap></mimemap></staticcontent>
</system.webserver>
{% endhighlight %}
<p>
	&Egrave; molto importante fare attenzione a cosa ci &egrave; consentito fare e cosa no da IIS. Infatti non &egrave; detto che l&rsquo;amministratore di sistema voglia offrire la possibilit&agrave; allo sviluppatore di cambiare alcuni settaggi. Infatti &egrave; necessario che le &ldquo;Delegation&rdquo; di IIS siano impostate in &ldquo;Allow&rdquo; per le sezioni che ci interessano.</p>
<p>
	Chi fosse interessato all&#39;argomento pu&ograve; buttare un occhio qui <a href="http://learn.iis.net/page.aspx/94/delegating-administration/">http://learn.iis.net/page.aspx/94/delegating-administration/</a></p>
<p>
	IIS Rulez!</p>
