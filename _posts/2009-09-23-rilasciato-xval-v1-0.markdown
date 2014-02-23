---
layout: post
status: publish
published: true
title: Rilasciato xVal v1.0
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1561
wordpress_url: http://imperugo.tostring.it/blog/post/rilasciato-xval-v10/
date: 2009-09-23 11:54:09.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- ASP.NET
comments: true
---
<p>Da pochi giorni è stata rilasciata la prima RTM di <a title="xVal" href="http://xval.codeplex.com/" rel="nofollow" target="_blank">xVal</a>, come annunciato <a title="xval v1.0 now available" href="http://blog.codeville.net/2009/09/17/xval-v10-now-available/" rel="nofollow" target="_blank">qui</a>.    <br />Per chi non lo conoscesse <a title="xVal" href="http://xval.codeplex.com/" rel="nofollow" target="_blank">xVal</a> è una libreria per la validazione client-side nelle applicazioni <a title="ASP.NET MVC" href="http://www.asp.net/mvc" rel="nofollow" target="_blank">ASP.NET MVC</a>; di fatto <a title="ASP.NET MVC" href="http://www.asp.net/mvc" rel="nofollow" target="_blank">ASP.NET MVC</a> 1.0 non è dotato della validazione client-side, al contrario del papà ASP.NET che ha a disposizione un’ottima libreria di validatori.    <br />    <br />Personalmente ho avuto modo di utilizzare questa libreria in <a title="Dexter Blog Engine" href="http://imperugo.tostring.it/Categories/Archive/Dexter" target="_blank">Dexter</a>, e si è rivelata ottima e di facile implementazione; di fatto, per poterla sfruttare è necessario decorare un binder con gli opportuni attributi (è possibile sfruttare quelli messi a disposizione dal .NET Framework o i validator di <a href="http://www.castleproject.org/">Castle</a>), registrare il proprio ValidationModelBinder nel global.asax e poco più.    <br />Le novità di quest’ultima versione sono interessantissime e le trovate elencate qui di seguito:</p>  <ul>   <li>Supporto per i validation summaries;</li>    <li>Remote validation (tramite AJAX);</li>    <li>Localizzazione Danish, French, Dutch, Polish, Swedish, and <b>Italian;</b></li>    <li>Aggiornamento alle nuove release delle librerie jQuery 1.3.2 e jQuery.Validation 1.5.5;</li>    <li>Bug fixing;</li> </ul>  <p>Maggiori info sono disponibili nel blog di <a title="Steve Sanderson&#39;s Blog" href="http://blog.codeville.net/" rel="nofollow" target="_blank">Steve Sanderson</a> (<a title="xval v1.0 now available" href="http://blog.codeville.net/2009/09/17/xval-v10-now-available/" rel="nofollow" target="_blank">qui</a>), mentre il dowload è disponibile su <a href="http://www.codeplex.com">codeplex</a> (<a href="http://xval.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=33155">qui</a>).</p>
