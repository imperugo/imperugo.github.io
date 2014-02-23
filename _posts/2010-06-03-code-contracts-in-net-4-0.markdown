---
layout: post
status: publish
published: true
title: Code Contracts in .NET 4.0
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1488
wordpress_url: http://imperugo.tostring.it/blog/post/code-contracts-net-4/
date: 2010-06-03 16:45:00.000000000 +01:00
categories:
- .NET
tags:
- CodeContracts
comments: true
---
<p>Approfittando del giorno di vacanza mi sono messo a dare uno sguardo ai CodeContracts del <a title=".NET Framework Search" href="http://www.imperugo.tostring.it/tags/archive/.net" target="_blank">.NET Framework</a> 4.0. Per chi non li conoscesse, i CodeContracts non sono altro che un insieme di classi che permettono, grazie anche a dei tools che vanno installati, di definire delle regole di PreCondizione, PostCondizione e Invarianti di Oggetto per le nostre classi. Guardando un po’ il lato pratico, possiamo brevemente riassumere che:</p>  <ul>   <li>Le PreCondizioni equivalgono alla validazione dei parametri di ingresso in un determinato metodo (es: l’oggetto <em>foo</em> non deve essere null); </li>    <li>Le PostCondizioni sono molto simili alle PreCondizioni, ma si rivolgono all’oggetto in uscita dal metodo; </li>    <li>Le Invarianti di Oggetto invece si rivolgono alle proprietà di un oggetto; </li> </ul>  <p>Un aspetto interessante è sicuramente la possibilità di specificare queste regole anche a delle interfacce, forse in maniera abbastanza “strana”, ma pensandoci su corretta. Di fatto, ci basta creare una classe che implementa l’interfaccia a cui vogliamo assegnare i nostri Contracts e decorarla con un apposito attributo; a questo punto il compilatore farà il resto, ossia inserire tutto il necessario su chi andrà ad implementare realmente l’interfaccia.    <br />Inoltre, grazie ai tools (disponibili <a title="Code Contracts Home Page" href="http://msdn.microsoft.com/en-us/devlabs/dd491992.aspx" rel="nofollow" target="_blank">qui</a>) viene generata automaticamente la documentazione in formato XML, che successivamente può essere data in pasto a <a title="Sandcastle - Documentation Compiler for Managed Class Libraries" href="http://sandcastle.codeplex.com/" rel="nofollow" target="_blank">SandCastle</a> per averne un formato leggibile :).</p>  <p>Concludendo, devo dire che il primo approccio è sicuramente positivo e di fatto, dopo un po’ che ci “giocavo”, mi sono apparsi in mente diversi scenari in cui poter sfruttare questa nuova interessante feature e sicuramente ne nasceranno dei posts, quindi Stay tuned!</p>  <p>Ciauz!</p>
