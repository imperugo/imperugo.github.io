---
layout: post
status: publish
published: true
title: Riflessioni su NHibernate
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1659
wordpress_url: http://imperugo.tostring.it/blog/post/riflessioni-su-nhibernate/
date: 2006-07-18 01:00:00.000000000 +01:00
categories:
- ORM
tags:
- Nhibernate
- ORM
- ASP.NET
- Architettura
comments: true
---
<p><span>Oggi, dopo un lungo periodo in cui mi sono sempre rifiutato di studiare <a href="http://www.hibernate.org/343.html">Nhibernate</a>, il <a href="http://blogs.ugidotnet.net/crad">crad</a> &egrave; riuscito a convicermi. Personalmente non mi &egrave; mai piaciuta l'idea di far fare tutto ad un framework senza avere il controllo su molte cose, ma davanti a fatto compiuto devo alzare le mani. :D (qui il <a href="http://blogs.ugidotnet.net/crad">crad</a> se la ride). </span></p>
<p>Piccola premessa per chi non sa cos'&egrave; <a href="http://www.hibernate.org/343.html">Nhibernate</a>:</p>
<p><a href="http://www.hibernate.org/343.html">Nhibernate</a> &egrave; un porting di una libreria Java <a href="http://www.hibernate.org/">Hibernate</a> in ambiente .net. Questa libreria ha il compito di agevolare l'utente nella memorizzazione di informazioni in un Database, evitandoci il &quot;problema&quot; di dover scrivere query e &quot;limitando&quot; il nostro compito nello gestire le sole entity. Da queste parole sembra che faccia tutto lui , beh quasi :P.</p>
<p>Detto questo passiamo alla mia esperienza:</p>
<p>Il primo impatto &egrave; stato molto brutto, il passaggio da un sistema &quot;classico&quot; &egrave; parecchio brusco ma una volta capito come lavora non &egrave; difficile da usare (da quel poco che ho potuto vedere).<br />
<br />
Se andiamo a pensare quanto possa essere difficile creare un buon DAL (Data Access Layer), quindi &quot;Lazy Load&quot;, &quot;Unit of Work&quot;, ecc, pu&ograve; venir utile tenere in considerazione <a href="http://www.hibernate.org/343.html">Nhibernate</a>.</p>
<p>Premetto che praticamente lo uso solo da un giorno, per&ograve; ad un primo impatto lo potrei descrivere come <b>molto</b> <b>produttivo.</b></p>
<p>Gestisce lui lo &quot;Unit of Work&quot;, &quot;Lazy Load&quot;, e inserimenti o modifiche di entity a cascata; basti pensare ad una entity Fattura che ha al suo interno una Entity cliente, passando a <a href="http://www.hibernate.org/343.html">Nhibernate</a> l'entity fattura, lui provedder&agrave; automaticamente a inserire la fattura e il cliente nel caso non sia presente nel Database mentre in una situazione normale avremmo dovuto creare 2 query, n parametri, interrogare il nostro DataHelper, ecc, ora tutto questo ci viene fatto con un risparmi di risorse incredibile.</p>
<p>Altra bella caratteristica &egrave; quella di poter cambiare tipo di database a runtime modificando una righa nel web.config oppure di dire a Nhibernate, &quot;...guarda sono in un'applicazione asp.net usa la cache&quot; e lui lo fa per noi :P</p>
<p>In termini prestazionali non so ancora quanto possa incidere, ma da quanto mi dicono se usato bene &egrave; molto performate.</p>
<p>Con questo post non voglio dire che dobbiamo sempre usare <a href="http://www.hibernate.org/343.html">Nhibernate</a> o che sia il metodo migliore, ci sono persone pi&ugrave; adatte a rispondere a questo tipo di interrogativo (<a href="http://blogs.aspitalia.com/rickyvr/">Ricky</a> o <a href="http://blogs.ugidotnet.org/pape">Andrea</a> per citarne due :P ) , ma vale la pena di perderci un attimo tempo perch&egrave; pu&ograve; venir utile.</p>
<p>Per chi vuole iniziare consiglio il libro in pdf stampabile e scaricabile <a href="http://www.hibernate.org/5.html">qui</a> e un tutorial che mostra come iniziare <a href="http://www.hibernate.org/362.html">qui</a>.</p>
<p>Successivamente (appena capisco un po' meglio cosa accade in &quot;background&quot;) posto un codice che mostra come iniziare ad utilizzarlo.</p>
