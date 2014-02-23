---
layout: post
status: publish
published: true
title: Convertire un’applicazione da MVC 1 a MVC 2
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1548
wordpress_url: http://imperugo.tostring.it/blog/post/convertire-un-and-rsquo-applicazione-da-mvc-1-a-mvc-2/
date: 2009-10-22 07:00:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- Visual Studio 2010
- Beta
comments: true
---
<p>
	Ieri sera stavo valutando l&rsquo;idea di convertire <a href="http://imperugo.tostring.it/Categories/Archive/Dexter" target="_blank" title="Dexter Blog Engine">Dexter</a> dalla versione 1.0 di <a href="http://imperugo.tostring.it/Categories/Archive/MVC" target="_blank" title="ASP.NET MVC">ASP.NET MVC</a> alla versione 2.0, per poter sfruttare tutte le nuove catatteristiche offerte da <a href="http://imperugo.tostring.it/tags/archive/visual+studio+2010" target="_blank" title="Visual Studio 2010">Visual Studio 2010</a> Beta 2 che, come comunicato dal PM <a href="http://haacked.com/" rel="nofollow" target="_blank">Phil Haack</a>&nbsp;<a href="http://haacked.com/archive/2009/10/20/vs10beta2-and-aspnetmvc.aspx" rel="nofollow" target="_blank" title="VS10 Beta 2 From an ASP.NET MVC Perspective">qui</a>, non supporter&agrave; la versione 1 di <a href="http://imperugo.tostring.it/Categories/Archive/MVC" target="_blank" title="ASP.NET MVC">ASP.NET MVC</a>.</p>
<p>
	Il passaggio non &egrave; particolarmente complesso, basta cambiare i riferimenti nei vari <strong>web.config</strong> (web application, test, ecc.) delle librerie <strong>routing</strong> e di <strong>mvc, </strong>i puntamenti nei vari progetti e l&rsquo;applicazione &egrave; pronta per girare con la 2.0.&nbsp; <br />
	Gi&agrave; dalla Beta 1 <a href="http://www.hanselman.com/blog/" rel="nofollow" target="_blank" title="Scott Hanselman">Scott Hanselman</a> aveva mostrato, tramite il suo blog (<a href="http://www.hanselman.com/blog/CheesyASPNETMVCProjectUpgraderForVisualStudio2010Beta1.aspx" rel="nofollow" target="_blank" title="Cheesy ASP.NET MVC Project Upgrader for Visual Studio 2010 Beta 1">qui</a>), come realizzare una console application che convertisse il progetto in automatico; proprio da questo post <a href="http://weblogs.asp.net/leftslipper/default.aspx" rel="nofollow" target="_blank" title="Eilon Lipton'Blog">Eilon Lipton</a> ha realizzato una piccola windows form che, data una solution, converte in automatico tutti i progetti presenti al suo interno ed i vari files di configurazione.</p>
<p>
	L&rsquo;applicazione sembra girare bene, senza particolari controindicazioni, ma, nel caso in cui abbiate effettuato dei forti cambiamenti alla struttura delle folders, potreste intercorrere in qualche errore :) : proprio per questo motivo non mi &egrave; stato possibile convertire dexter con questo tool. <br />
	Purtroppo, non avendo pi&ugrave; la cartella Scripts, il tool &egrave; andato in errore cercando di caricare le librerie aggiornate di jQuery ed <a href="http://en.wikipedia.org/wiki/Ajax_(programming)" rel="nofollow" target="_blank">Ajax</a>. Ovviamente ho inviato una segnalazione all&rsquo;autore spiegando la situazione e non ci resta che sperare in un aggiornamento.</p>
<p>
	Sotto uno screenshot dell&rsquo;applicazione:</p>
<p>
	<a href="http://imperugo.tostring.it/Content/Uploaded/image/mvc1.jpg" rel="shadowbox"><img alt="mvc1" border="0" height="193" src="http://imperugo.tostring.it/Content/Uploaded/image/mvc1_thumb.jpg" style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="mvc1" width="244" /></a></p>
<p>
	Maggiori informazioni ed il download sono disponibili al blog dell&rsquo;autore (<a href="http://weblogs.asp.net/leftslipper/archive/2009/10/19/migrating-asp-net-mvc-1-0-applications-to-asp-net-mvc-2.aspx" rel="nofollow" target="_blank" title="Migrating ASP.NET MVC 1.0 applications to ASP.NET MVC 2">qui</a>).</p>
