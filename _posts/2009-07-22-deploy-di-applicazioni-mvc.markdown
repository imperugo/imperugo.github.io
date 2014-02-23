---
layout: post
status: publish
published: true
title: Deploy di Applicazioni MVC
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1596
wordpress_url: http://imperugo.tostring.it/blog/post/deploy-di-applicazioni-mvc/
date: 2009-07-22 04:01:11.000000000 +01:00
categories:
- ASP.NET
tags:
- Windows Server
- Windows Server 2008
- Windows Server 2003
- ASP.NET
- Configurazione
- .NET
- IIS
- Deploy
- Framework
comments: true
---
<p>Molte persone mi hanno chiesto quale server utilizzo per hostare il mio blog realizzato in MVC.    <br />In realtà, per hostare un’applicazione basata sul Framework <a href="http://www.asp.net/mvc" rel="nofollow" target="_blank">ASP.NET MVC</a> non è necessario aver installato quest’ultimo sul web server: ma basta avere il .NET Framework 3.5 SP1 e copiare le DLL di <a href="http://www.asp.net/mvc" rel="nofollow" target="_blank">ASP.NET MVC</a> (<strong>System.Web.Mvc</strong>, <strong>System.Web.Routing</strong>, <strong>System.Web.Abstractions</strong>) nell’apposita folder <em>Bin,</em> come spiegato dal PM di MVC <a href="http://haacked.com/" rel="nofollow" target="_blank">Phil Haack</a>.</p>  <p>Un’altra cosa necessaria è configurare correttamente IIS per sfruttare il Routing introdotto con la SP1 del .NET Framework 3.5. </p>  <p>Di seguito riporto una serie di link che spiegano come effettuare il deploy e la configurazione di <a href="http://www.asp.net/mvc" rel="nofollow" target="_blank">ASP.NET MVC</a>.</p>  <ul>   <li><strong>Deploy di un’applicazione MVC</strong> <a title="Bin deploy aspnetmvc" href="http://haacked.com/archive/2008/11/03/bin-deploy-aspnetmvc.aspx" rel="nofollow" target="_blank">link</a>. </li>    <li><strong>Configurare IIS6 per MVC</strong> <a title="asp.net mvc on iis6 walkthrough" href="http://haacked.com/archive/2008/11/26/asp.net-mvc-on-iis-6-walkthrough.aspx" rel="nofollow" target="_blank">link</a>. </li>    <li><strong>Configurare IIS7 per MVC</strong> <a title="Deploying an aspnet mvc web application to iis7" href="http://blogs.dovetailsoftware.com/blogs/kmiller/archive/2008/10/07/deploying-an-asp-net-mvc-web-application-to-iis7.aspx" rel="nofollow" target="_blank">link</a>. </li> </ul>  <p>Ciauz</p>
