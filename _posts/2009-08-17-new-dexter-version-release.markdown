---
layout: post
status: publish
published: true
title: New Dexter version Release.
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1577
wordpress_url: http://imperugo.tostring.it/blog/post/new-dexter-version-release/
date: 2009-08-17 11:55:02.000000000 +01:00
categories:
- Various
tags:
- Dexter
comments: true
---
<p>
	Questa notte, causa insonnia, ho deciso di effettuare il deploy della nuova versione di <a href="http://imperugo.tostring.it/About/Dexter">Dexter</a>. <br />
	Una parte delle novit&agrave; l&rsquo;avevo gi&agrave; annunciata <a href="http://imperugo.tostring.it/Blog/Post/LuceneNet-in-Dexter">qui</a>, ma si sono aggiunte una serie di nuove features e fix che rendono il prodotto ancor pi&ugrave; interessante. <br />
	Come potete vedere/provare ora la ricerca &egrave; di tipo <a href="http://en.wikipedia.org/wiki/Full-text" target="_blank">full-text</a> e, nel <a href="http://en.wikipedia.org/wiki/Permalink" target="_blank">permalink</a> di ogni post, &egrave; presente una lista di contenuti correlati. <br />
	Ora il tutto gira su di una Membership proprietaria (precedentemente mi appoggiavo ad un progetto esterno) e, ovviamente, rimane la possibilit&agrave; di utilizzare un Membership Provider e un Role Provider esterno qualora si decida di utilizzare Dexter all&rsquo;interno di un&rsquo;applicazione che integra gi&agrave; la parte di autenticazione e ruoli.</p>
<p>
	Rimanendo in ambito di providers, ne ho aggiunto uno custom per l&rsquo;HealthMonitoring dell&rsquo;applicazione, che fornisce alcune informazioni in pi&ugrave; e si integra con qualsiasi tipo di database supportato da NHibernate. Ora mi rimane da unificare il tutto con il Log e realizzare le pagine di visualizzazione nel backoffice.</p>
<p>
	Inoltre, anche l&rsquo;utilizzo di NHibernate &egrave; stato migliorato e la cache &egrave; ora presente in tutte le query; infatti, dopo la prima navigazione, non vengono pi&ugrave; effettuate chiamate verso il database :) e grazie a Lucene, anche per le ricerche il Database non viene interrogato.</p>
<p>
	Ovviamente ci sono molte altre migliorie di minor rilevanza ma, appena sistemato il backoffice, si pu&ograve; parlare della prima relase ufficiale; proprio da settembre un paio di persone di nostra conoscenza dovrebbero passare a Dexter. <br />
	Infatti con il deploy sar&agrave; presente anche uno script di migrazione contenuti da SubText e si avr&agrave; la possibilit&agrave; di conservare le vecchie url, in modo da non perdere posizioni nei motori di ricerca.</p>
<p>
	Come potete vedere dagli screenshots seguenti, nel BackOffice c&rsquo;&egrave; ancora molto da lavorare :(:</p>
<p>
	<a href="http://imperugo.tostring.it/Content/Uploaded/image/8-16-2009%2011-39-51%20AM_2.png" rel="shadowbox[New-Dexter-version-Release];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img alt="8-16-2009 11-39-51 AM" border="0" height="191" singlelineignorecase="" src="http://imperugo.tostring.it/Content/Uploaded/image/8-16-2009%2011-39-51%20AM_thumb.png" style="border-width: 0px; display: inline;" title="8-16-2009 11-39-51 AM" width="324" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/8-16-2009%2011-41-32%20AM_2.png" rel="shadowbox[New-Dexter-version-Release];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img alt="8-16-2009 11-41-32 AM" border="0" height="191" singlelineignorecase="" src="http://imperugo.tostring.it/Content/Uploaded/image/8-16-2009%2011-41-32%20AM_thumb.png" style="border-width: 0px; display: inline;" title="8-16-2009 11-41-32 AM" width="324" /></a></p>
<p>
	Stay tuned!</p>
