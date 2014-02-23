---
layout: post
status: publish
published: true
title: Visual Studio, Firefox, Cassini, Windows Vista/Seven ed un po’ di lentezza.
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1604
wordpress_url: http://imperugo.tostring.it/blog/post/visual-studio-firefox-cassini-windows-vistaseven-ed-un-po%e2%80%99-di-lentezza/
date: 2009-07-13 06:31:24.000000000 +01:00
categories:
- .NET
tags:
- Visual Studio
- Windows Seven
- Windows Vista
- Firefox
- Cassini
comments: true
---
<p>Una combinazione a dir poco snervante per lo sviluppatore, che si trova a subire dei rallentamenti in fase di debug delle proprie pagine web.</p>
<p>Ogni richiesta effettuata dal client verso il web server integrato in Visual Studio richiede un tempo che pu&ograve; arrivare fino ad un secondo per ogni elemento contenuto nella pagina e, considerando che in media una pagina ha circa 50 richieste verso il server, tra immagini, <a href="http://en.wikipedia.org/wiki/Css" target="_blank">css</a>, <a href="http://en.wikipedia.org/wiki/Javascript" target="_blank">javascript</a>, ecc., il tempo pu&ograve; salire fino a circa un minuto, e pu&ograve; andare ben oltre se si hanno pagine particolarmente ricche di contenuti e/o complesse.</p>
<p>Cos&igrave; ieri sera mi son deciso a &ldquo;sbingare&rdquo; (cercare con bing.com :-) ) un po&rsquo;, e sono stato felice di apprendere che non sono l&rsquo;unico ad avere questo tipo di problema, che sembra essere legato all&rsquo;<a href="http://en.wikipedia.org/wiki/Ipv6" target="_blank">IPv6</a>.     <br />
Infatti sono risalito a questo <a title="Fixing Firefox slowness with localhost on vista" href="http://weblogs.asp.net/dwahlin/archive/2007/06/17/fixing-firefox-slowness-with-localhost-on-vista.aspx" rel="nofollow" target="_blank">post</a> che spiega come risolvere l'inconveniente, disabilitando l&rsquo;IPv6 sul browser.</p>
<p>Entrando nello specifico basta digitare in Firefox &ldquo;<strong><em>about:config</em></strong>&rdquo; &ndash;&gt; &ldquo;<strong><em>network.dns.disableIPv6</em></strong>&rdquo; doppio click in modo che il valore passi <strong>da false a true</strong>.</p>
<p>Ovviamente a fine procedura &egrave; necessario il riavvio del browser.</p>
<p>Ciauz</p>
