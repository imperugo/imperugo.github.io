---
layout: post
status: publish
published: true
title: ASP.NET MVC 2 Preview 2
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1557
wordpress_url: http://imperugo.tostring.it/blog/post/aspnet-mvc-2-preview-2/
date: 2009-10-05 17:30:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- News
- Visual Studio 2010
- ASP.NET 4.0
comments: true
---
<p>
	Da pochi giorni &egrave; stata rilasciata la<strong> Preview 2 di </strong><a href="http://www.asp.net/mvc" rel="nofollow" target="_blank"><strong>ASP.NET MVC</strong></a><strong> 2</strong>, come annunciato dal Program Manager <a href="http://haacked.com/" rel="nofollow" target="_blank">Phil Haack</a> (<a href="http://haacked.com/archive/2009/10/01/asp.net-mvc-preview-2-released.aspx" target="_blank">qui</a>). <br />
	Come per la Preview 1, anche per questa versione &egrave; richiesto <a href="http://www.asp.net" rel="nofollow" target="_blank"><strong>ASP.NET</strong></a><strong> 3.5 SP1</strong>, mentre nel progetto di installazione trovate tutti i tools di integrazione con Visual Studio.</p>
<p>
	Dalla release note (disponibile <a href="http://go.microsoft.com/fwlink/?LinkID=157066" rel="nofollow" target="_blank" title="ASP.NET MVC 2 Preview 2 Release Note">qui</a>) notiamo una serie di novit&agrave; interessanti, che trovate elencate di seguito:</p>
<ul>
	<li>
		<strong>ModelMetaData e ModelMetaDataProvider</strong>;</li>
	<li>
		<strong>Client-Side Validation </strong>e<strong> Model Validator Provider;</strong>;</li>
	<li>
		New <strong>Code Snippet</strong> on Visual Studio 2010;</li>
	<li>
		New <strong>RequireHttpsAttribute ActionFilter</strong>;</li>
	<li>
		<strong>Overrriding the Http Method Verb</strong>;</li>
	<li>
		<strong>Single-Project Areas</strong>;</li>
	<li>
		New <strong>HiddenInputAttribute</strong> for Templated Helpers;</li>
</ul>
<p>
	Molto apprezzata la parte di validazione client-side (assente nella versione 1.0 del Framework), che sfrutta le potenzialit&agrave; della libreria <a href="http://bassistance.de/jquery-plugins/jquery-plugin-validation/" rel="nofollow" target="_blank" title="jQuery plugin validation">jQuery Validation</a> e consente di specificare una libreria di validazione custom tramite il <strong>Model Validator Provider</strong>, un po&rsquo; come avviene per il Framework <a href="http://xval.codeplex.com/" rel="nofollow" target="_blank" title="xVal">xVal</a> (di cui ho parlato <a href="http://imperugo.tostring.it/blog/post/rilasciato-xval-v10" target="_blank" title="xVal 1.0 RTM">qui</a>).</p>
<p>
	Il principio di funzionamento rimane molto simile a quello sfruttato dalla libreria prensente in <a href="http://www.codeplex.com" rel="nofollow" target="_blank" title="CodePlex">Codeplex</a>, ossia si dovr&agrave; decorare il custom Binder tramite le <strong><a href="http://msdn.microsoft.com/en-us/library/dd901590(VS.95).aspx" rel="nofollow" target="_blank" title="Using Data Annotations to Customize Data Classes">DataAnnotation</a></strong> pi&ugrave; adatte (StringLengthAttribute, RequiredAttribute, RegexAttribute, RangeAttribute, ecc).</p>
<p>
	Ottimo anche il <strong>RequireHttpsAttribute</strong> da poter utilizzare con le actions, che penser&agrave; ad effettuare il redirect allo stesso indirizzo ma forzando l&rsquo;https.</p>
<p>
	Purtroppo per sfruttare alcune features (come l&rsquo;auto HtmlEncode di cui ho parlato <a href="http://imperugo.tostring.it/blog/post/autoencode-in-aspnet-40" target="_blank" title="Auto HtmlEncode Bloc">qui</a> e altri code snippets) bisogner&agrave; aspettare la prossima beta di <strong><a href="http://imperugo.tostring.it/tags/archive/visual+studio+2010" target="_blank" title="Visual Studio 2010">VisualStudio 2010</a></strong> che, a differenza di quanto accaduto con la preview 1 di ASP.NET MVC, conterr&agrave; gi&agrave; al suo interno questa preview e le rispettive RTM saranno sincronizzate e rilasciate assieme.</p>
<p>
	Di seguito tutti i downloads:</p>
<ul>
	<li>
		<a href="http://www.microsoft.com/downloads/details.aspx?FamilyID=d3f06bb9-5f5f-4f46-91e9-813b3fce2db1&amp;displaylang=en" rel="nofollow" target="_blank" title="ASP.NET MVC 2 Preview 2">Download Page</a>;</li>
	<li>
		<a href="http://go.microsoft.com/fwlink/?LinkID=157066" target="_blank" title="ASP.NET MVC 2 Preview 2 release notes">Release Notes</a>;</li>
	<li>
		<a href="http://aspnet.codeplex.com/Wiki/View.aspx?title=Road%20Map&amp;referringTitle=Home" rel="nofollow" target="_blank" title="ASP.NET MVC 2 Preview 2 RoadMap">Roadmap</a>;</li>
	<li>
		<a href="http://aspnet.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=33836" rel="nofollow" target="_blank" title="ASP.NET MVC 2 Preview 2 Source Code and Futures">Source Code and Futures on CodePlex</a>;</li>
</ul>
<p>
	Stay tuned!</p>
