---
layout: post
status: publish
published: true
title: ASP.NET WebForms o MVC?
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1527
wordpress_url: http://imperugo.tostring.it/blog/post/asp.net-webforms-o-mvc/
date: 2010-01-11 23:58:54.000000000 +00:00
categories:
- ASP.NET
tags:
- MVC
- ASP.NET
comments: true
---
<p>
	&Egrave; da molto tempo che rifletto su questo post, ed ho deciso di parlarne solo ora in quanto la seconda release di ASPNET MVC &egrave; prossima al rilascio (al momento in Release Candidate, vedi <a href="http://imperugo.tostring.it/blog/post/aspnet-mvc-2-release-candidate-is-out" target="_blank" title="ASP.NET MVC 2 Release Candidate is out">qui</a>): di riflesso, se ne comincia a parlare molto di pi&ugrave; e, ancor pi&ugrave; interessante, si comincia ad utilizzarla molto di pi&ugrave;.</p>
<p>
	Sinceramente sono rimasto scioccato da quanto interesse e &ldquo;strada facile&rdquo; abbia riscontrato ASP.NET MVC rispetto al pap&agrave; ASP.NET Web Forms. Di fatto noto come alcuni providers italiani, a non molto tempo dal rilascio della prima release di MVC, offrano gi&agrave; disponibile il nuovo Framework, mentre in passato per avere una versione aggiornata del Framework .NET si doveva aspettare parecchio dopo il suo rilascio. Segno che qualcosa stia veramente cambiando?</p>
<p>
	Parlando con pi&ugrave; persone durante speech, conf, chat, etc ho avuto l&rsquo;impressione che molti reputino ASP.NET MVC la manna dal cielo e le webforms il MALE.</p>
<p>
	Sinceramente sono rimasto basito dalla cosa, in quanto reputo MVC un&rsquo;alternativa alle Web Forms e non un concorrente.</p>
<p>
	Durante la sessione di Bologna ho cercato di esprimere questo concetto e di portare come esempio gli scenari in cui un Framework pu&ograve; avere vantaggi rispetto all&rsquo;altro, proprio a dimostrazione che non sono concorrenti.</p>
<p>
	<strong>IMHO la riuscita di un buon prodotto non dipende soltanto dalla qualit&agrave; tecnica del prodotto, ma anche da come si &egrave; riusciti a sfruttare le risorse a propria disposizione (e per risorse intendo tutto,team, budget, tempistiche, etc).</strong></p>
<p>
	Sicuramente tra le cose da non sottovalutare quando si debba effettuare una scelta importante, come lo &egrave; l&rsquo;utilizzo delle Webforms a discapito di MVC, sono i numerosi vantaggi che le prime possono offrire ripetto al secondo in determinati scenari e/o requirements.</p>
<p>
	In primis la pluritestata e diffusissima tecnologia che, nonostante ci&ograve; che si dica, riesce ad essere altamente scalabile ed estendibile e, da non trascurare, l&rsquo;approccio Windows form style.</p>
<p>
	Proprio su questo approccio volevo portare un esempio nato durante lo speech di Bologna, in cui in un team misto (Applicazioni Windows e Applicazioni Web) si aveva la necessit&agrave; di ricollocare alcune risorse sullo sviluppo web. Per chi viene dal mondo delle Windows Forms ASP.NET MVC risulta sicuramente scomodo e/o complesso; al contrario con le webforms il passaggio &egrave; quasi indolore e, in questi scenari, le WebForms possono essere la scelta che decide la riuscita di un progetto.</p>
<p>
	Personalmente (salvo imposizioni particolari), non realizzerei mai un BackOffice (tipicamente contraddistinto da una buona percentuale di dataentry) in ASP.NET MVC, salvo che uno dei requirements sia la testabilit&agrave;.</p>
<p>
	Ovviamente MVC non offre soltanto il vantaggio della testabilit&agrave;, ma anche la possibilit&agrave; di avere il controllo totale del markup (ASP.NET 4.0 si avvicina molto a questo) ed una forte espandibilit&agrave; maturata dall&rsquo;esperienza fatta precedentemente con ASP.NET WebForms.</p>
<p>
	Per concludere, le webforms non sono morte, anzi vivono ed in molti scenari vivono alla grande ;)</p>
