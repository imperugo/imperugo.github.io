---
layout: post
status: publish
published: true
title: EntityFramework over WCF
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1602
wordpress_url: http://imperugo.tostring.it/blog/post/entityframework-over-wcf/
date: 2009-07-15 01:46:30.000000000 +01:00
categories:
- ASP.NET
tags:
- Windows Communication Foundation
- ORM
- .NET
- Framework
- Framework 4.0
- Entity Framework
- DTO
comments: true
---
<p>Ormai è appurato che sono un fanatico dei DTO (ne ho parlato <a title="Uso dei DTO (Data Transfer Object)" href="http://imperugo.tostring.it/Blog/Post/DTO-IL-e-Reflection-nelle-nostre-applicazioni" target="_blank">qui</a> e <a title="AutoMapper" href="http://imperugo.tostring.it/Blog/Post/DTO-e-AutoMapper" target="_blank">qui</a>), ma voglio ugualmente segnalare <a title="A bad idea to use EF entities over wcf" href="http://weblogs.asp.net/cibrax/archive/2009/06/25/a-bad-idea-ef-entities-over-wcf.aspx" rel="nofollow" target="_blank">questo</a> articolo di <a title="Pablo M. Cibraro" href="http://weblogs.asp.net/cibrax/default.aspx" rel="nofollow" target="_blank">Pablo M. Cibraro</a> che spiega il perchè non debba essere mai esposta direttamente una classe di EntityFramework, bensì un DTO.     <br />Riporto di seguito una frase che mi ha colpito particolarmente:</p>  <blockquote>   <p>I do not know what the folks in Microsoft were thinking when they decided to enable a feature like this. They made a good work teaching us about how evil Datasets were for interoperability with other platforms, and now they came up with a solution like this, no way.</p> </blockquote>  <p>Sempre nello stesso post <a title="Pablo M. Cibraro" href="http://weblogs.asp.net/cibrax/default.aspx" rel="nofollow" target="_blank">Pablo</a> forza la mano sul DTO, consiglia <a href="http://automapper.codeplex.com/" rel="nofollow" target="_blank">AutoMapper</a> e successivamente, in un’altro <a title="A bad idea use EF entities over wcf part II" href="http://weblogs.asp.net/cibrax/archive/2009/07/13/a-bad-idea-ef-entities-over-wcf-part-ii.aspx" rel="nofollow" target="_blank">post</a>, parla della nuova versione di EntityFramework 4.0, dell’implementazione POCO e di <a title="Rich Internet Application" href="http://it.wikipedia.org/wiki/Rich_Internet_application" rel="nofollow" target="_blank">RIA</a> Application, spiegando che, nonostante la prossima versione dell’O/RM permetta di decorare le classi con gli attributi DataContract e DataMember, questo tipo di approccio rimane sconsigliato.     <br />Di fatto, un forte accoppiamento tra persistenza, contract e client è particolarmente pericoloso per il versioning del servizio; basti pensare che una entity di dominio può cambiare per qualsiasi motivo, ed in questo caso potrebbe essere necessario modificare il contract ed eventuali clients.     <br />A detta di <a title="Pablo M. Cibraro" href="http://weblogs.asp.net/cibrax/default.aspx" rel="nofollow" target="_blank">Pablo</a>, un approccio del genere può risultare comodo unicamente per le <a title="Rich Internet Application" href="http://it.wikipedia.org/wiki/Rich_Internet_application" rel="nofollow" target="_blank">RIA</a> Applications, che ad oggi occupano solo una piccolissima parte delle applicazioni services oriented.</p>  <p>Ciauz</p>
