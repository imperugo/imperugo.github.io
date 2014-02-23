---
layout: post
status: publish
published: true
title: Il Throttling in WCF 4.0
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1588
wordpress_url: http://imperugo.tostring.it/blog/post/il-throttling-in-wcf-40/
date: 2009-07-28 03:00:00.000000000 +01:00
categories:
- .NET
tags:
- Windows Communication Foundation
- Beta
- Configurazione
- Framework 4.0
comments: true
---
<p>Il <a href="http://msdn.microsoft.com/en-us/library/system.servicemodel.description.servicethrottlingbehavior.aspx">Throttling</a> &egrave; quella parte di configurazione di <strong>Windows Communication Foundatio</strong>n che permette di impostare l&rsquo;impatto che il servizio WCF avr&agrave; verso il sitema operativo. Nello specifico &egrave; possibile modificare i valori dei parametri <strong>MaxConcurrentSessions</strong>, <strong>MaxConcurrentCalls&nbsp; </strong>e <strong>MaxConcurrentInstances</strong>.    <br />
Nelle versioni antecedenti alla 4.0 i valori di default erano i seguenti:</p>
<ul>
    <li><b>MaxConcurrentSessions</b> (default: 10);</li>
    <li><b>MaxConcurrentCalls</b> (default: 16);</li>
    <li><b>MaxConcurrentInstances</b> (default: 26);</li>
</ul>
<p>Purtroppo questi valori possono non essere adeguati a molte realt&agrave; applicative, obbligando cos&igrave; l&rsquo;utente a modificarli per evitare che alcuni client vadano in errore o non riescano a connettersi verso il servizio.   <br />
Sfortunatamente, per un utente normale non &egrave; facile capire il problema se non attivando il Trace di WCF che, superato il limite impostato di default, logga un&rsquo;apposita eccezione che ne permette l&rsquo;individuazione.</p>
<p>Come gi&agrave; detto <a href="http://imperugo.tostring.it/Blog/Post/Visual-Studio-2010-e-NET-Framework-40">qui</a>, uno degli obiettivi di Microsoft per Windows Communication Foundation &egrave; di ridurre il pi&ugrave; possibile la parte di configurazione per i servizi WCF e, proprio per questo motivo, la casa ha deciso di aumentare i sopracitati valori di default gi&agrave; dalla prossima release, come mostrato nell&rsquo;elenco seguente:</p>
<ul>
    <li><b>MaxConcurrentSessions</b> (default: 100 * ProcessorCount);</li>
    <li><b>MaxConcurrentCalls</b> (default: 16 * ProcessorCount);</li>
    <li><b>MaxConcurrentInstances</b> (default: &egrave; il totale del MaxConcurrentSessione e MaxConcurrentCalls);</li>
</ul>
<p>Per maggiori informazioni rimando a questo <a href="http://blogs.msdn.com/wenlong/archive/2009/07/26/wcf-4-higher-default-throttling-settings-for-wcf-services.aspx">post</a>.</p>
