---
layout: post
status: publish
published: true
title: DTO e AutoMapper
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1621
wordpress_url: http://imperugo.tostring.it/blog/post/dto-e-automapper/
date: 2009-06-17 04:49:00.000000000 +01:00
categories:
- .NET
tags:
- Ottimizzazione
- IL
- Reflection
- Framework
- DTO
comments: true
---
<p>Giuro che non vivo di soli <strong>DTO (Data Trasfer Object)</strong>, ma dopo l’ultimo <a href="http://imperugo.tostring.it/Blog/Post/DTO-IL-e-Reflection-nelle-nostre-applicazioni" target="_blank">post</a>, su consiglio di <a href="http://blogs.ugidotnet.org/bmatte/Default.aspx" rel="nofollow" target="_blank">Matteo</a>, mi sono messo a dare un occhio ad <a href="http://automapper.codeplex.com/" rel="nofollow" target="_blank">AutoMapper</a>, ossia una libreria che semplifica la parte di “trasbordo” dei dati da una classe ad un’altra.</p>  <p>Dopo un primo sguardo le potenzialità&#160; sembrano ottime, ed è molto interessante come hanno implementato la parte di mapping anche per entità e grafi di DTO complessi e non.    <br />I mapping possibili sono diversi:</p>  <ul>   <li><a href="http://automapper.codeplex.com/Wiki/View.aspx?title=Flattening" rel="nofollow" target="_blank">Flattening</a>; </li>    <li><a href="http://automapper.codeplex.com/Wiki/View.aspx?title=Projection" rel="nofollow" target="_blank">Projection</a>; </li>    <li><a href="http://automapper.codeplex.com/Wiki/View.aspx?title=Configuration%20Validation" rel="nofollow" target="_blank">Configuration Validation</a>; </li>    <li><a href="http://automapper.codeplex.com/Wiki/View.aspx?title=Lists%20and%20Arrays" rel="nofollow" target="_blank">Lists and Arrays</a>; </li>    <li><a href="http://automapper.codeplex.com/Wiki/View.aspx?title=Nested%20Mappings" rel="nofollow" target="_blank">Nested Mappings</a>; </li>    <li><a href="http://automapper.codeplex.com/Wiki/View.aspx?title=Custom%20Type%20Converters" rel="nofollow" target="_blank">Custom Type Converters</a>; </li>    <li><a href="http://automapper.codeplex.com/Wiki/View.aspx?title=Custom%20Value%20Resolvers" rel="nofollow" target="_blank">Custom Value Resolvers</a>; </li>    <li><a href="http://automapper.codeplex.com/Wiki/View.aspx?title=Custom%20Value%20Formatters" rel="nofollow" target="_blank">Custom Value Formatters</a>; </li>    <li><a href="http://automapper.codeplex.com/Wiki/View.aspx?title=Null%20Substitution" rel="nofollow" target="_blank">Null Substitution</a>;</li> </ul>  <p>L’unico neo sono le performances. Come già detto nel <a href="http://imperugo.tostring.it/Blog/Post/DTO-IL-e-Reflection-nelle-nostre-applicazioni" target="_blank">post</a> precedente (in realtà è stato detto praticamente da tutti) la Reflection non gode di una fama velocistica, e questa libreria ne fa uso per idratare le entities.</p>  <p>Dopo un veloce sguardo al codice sorgente ho sostituito con estrema facilità la parte in cui si faceva uso della Reflection con la parte utilizzata nel mio snippet precendete, per iniettare IL a runtime.    <br />Il risultato è sbalorditivo, tutte le ottime potenzialità di questa libreria con le performances dell’IL.     <br />    <br />Ovviamente ho segnalato la cosa al <a href="http://automapper.codeplex.com/People/ProjectPeople.aspx" rel="nofollow" target="_blank">Team</a>, che gode della presenza di <a href="http://jeffreypalermo.com/" rel="nofollow" target="_blank">Jeffrey Palermo</a>, e che ha accolto la richiesta e sta analizzando come e quando integrare questo tipo di approccio.</p>  <p>Ciauz</p>
