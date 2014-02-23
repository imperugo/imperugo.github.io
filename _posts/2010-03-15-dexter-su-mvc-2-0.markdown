---
layout: post
status: publish
published: true
title: dexter su MVC 2.0 :)
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1511
wordpress_url: http://imperugo.tostring.it/blog/post/dexter-su-mvc-20/
date: 2010-03-15 19:05:00.000000000 +00:00
categories:
- ASP.NET
tags:
- MVC
- ASP.NET
- Dexter
comments: true
---
<p>Ho approfittato del recente rilascio e della possibilità di utilizzare <a title="ASP.NET" href="http://imperugo.tostring.it/categories/archive/ASP.NET" target="_blank"></a><a title="ASP.NET MVC" href="http://imperugo.tostring.it/Categories/Archive/MVC" target="_blank">ASP.NET MVC</a> 2.0</a> su <a title="Search Visual Studio" href="http://imperugo.tostring.it/blog/search?q=Visual+Studio&amp;searchButton=Go" target="_blank">Visual Studio</a> RC per effettuare un po’ di refactoring del repository di <a title="Dexter Blog Engine" href="http://dexterblogengine.codeplex.com/" rel="nofollow" target="_blank">Dexter</a> e migrarlo alla versione 2.0 di <a title="Category: MVC" href="http://tostring.it/Categories/Archive/MVC" target="_blank">MVC</a>.</p>  <p>Per chi segue lo sviluppo del codice la vecchia trunk è stata rinomina in “<strong>trunk (mvc 1.0)”</strong> e la considero come deprecata, non ci saranno sviluppi sopra. Il lavoro si è spostato su una branch (che poi è la nuova trunk) che gira su <a title="ASP.NET" href="http://imperugo.tostring.it/categories/archive/ASP.NET" target="_blank">asp.net</a> mvc 2.     <br />Il porting è stato semplicissimo, basta utilizzare l’apposito tool (lo trovate <a title="Migrating ASP.NET MVC 1.0 applications to ASP.NET MVC 2 RTM" href="http://weblogs.asp.net/leftslipper/archive/2010/03/10/migrating-asp-net-mvc-1-0-applications-to-asp-net-mvc-2-rtm.aspx" rel="nofollow" target="_blank">qui</a>) e, nel caso di dexter, è stato necessario modificare un solo metodo (causa nuovo overload) per il controllerbase. </p>  <p>Una nota da segnalare sono i progetti di Testing, che Visual Studio 2010 converte al Framwework 4.0 e non permette il reverse. Quindi per questi progetti è necessario aprire la solution di VS 2010.</p>  <p>La semplicità di questo porting mostra la buona base che c’è su questo prodotto. Il prossimo step per dexter sarà rimuovere tutti i Frameworks e le implementazioni aggiunte alla versione 1.0 di mvc, per colmare alcune mancanze della vecchia versione (come la validazione client side).</p>  <p>Ah, dimenticavo, <a href="http://www.tostring.it">www.tostring.it</a> gira su mvc 2.0 :)</p>  <p>Ciauz</p>
