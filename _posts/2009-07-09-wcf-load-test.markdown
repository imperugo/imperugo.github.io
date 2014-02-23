---
layout: post
status: publish
published: true
title: WCF Load Test
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1606
wordpress_url: http://imperugo.tostring.it/blog/post/wcf-load-test/
date: 2009-07-09 01:27:33.000000000 +01:00
categories:
- .NET
tags:
- Ottimizzazione
- Visual Studio
- Windows Communication Foundation
- Tools
- Performances
- Configurazione
comments: true
---
<p><strong>Windows Communication Foundation</strong> &egrave; sicuramente uno tra i migliori <strong>Framework</strong> sviluppati da <strong>Microsoft</strong> negli ultimi anni: offre un&rsquo;ottima estendibilit&agrave; e, allo stesso tempo, risulta facile da utilizzare per chi da subito vuole realizzare servizi senza particolari esigenze.     </p>
<p>Una cosa su cui si discute spessissimo sono le performances ottenibili con questo Framework, e, proprio come detto dalla stessa Microsoft(su questo argomento suggerisco <a target="_blank" rel="nofollow" href="http://channel9.msdn.com/pdc2008/TL38/">questa</a> sessione di <a target="_blank" rel="nofollow" href="http://blogs.msdn.com/drnick/" title="Nicholas Allen">Nicholas Allen</a> della PDC 2008..), raggiungere ottime performances non &egrave; cosa facile ed immediata.     <br />
Per avere dei buoni risultati &egrave; necessario effettuare un tuning del nostro servizio, andando a modificare i numerosi parametri presenti nel file di configurazione.     <br />
Purtroppo questi parametri non sono uguali per tutti i servizi: variano infatti in base all&rsquo;endpoint utilizzato, al tipo di messaggio che si restituisce, al size del messaggio, ecc, e quindi va effettuata un&rsquo;analisi di questi fattori per ogni servizio.     <br />
Proprio per realizzare questo tipo di tuning, su <a target="_blank" rel="nofollow" href="http://www.codeplex.com/" title="Codeplex">Codeplex</a> &egrave; presente un add-on per Visual Studio 2005-2008 (su Visual Studio 2010 sar&agrave; gi&agrave; incluso) che permette di effettuare un test di carico sul servizio, in modo da trovare i valori giusti per la configurazione.     <br />
Questa libreria offre le caratteristiche molto interessanti che elenco di seguito:</p>
<ul>
    <li>Replay of captured scenario in a unit test that can be included in a load test.</li>
    <li>Support for the DataContractSerializer.</li>
    <li>Support for message contracts.</li>
    <li>ASMX support (beta)</li>
    <li>Support for proxies generated using svcutil.</li>
    <li>Support for clients that create proxies at run time from contract interfaces.</li>
    <li>Supports calls to multiple services in a single scenario.</li>
    <li>Supports multiple calls to the same service operation.</li>
    <li>Filtering by SOAP action of which messages in the trace to replay.</li>
    <li>Readable and modifiable code is generated.</li>
    <li>Automatic association of trace message with proxy method (requires all operations to have a unique SOAP action).</li>
    <li>Support for client and server side traces.</li>
    <li>A command line tool for processing traces and generating code.</li>
    <li>Visual Studio 2005/2008 integration (Team Developer, Team Test, Team Suite and for 2008 also Professional)) that can be used instead of the command line tool.</li>
</ul>
<p>Per chi fosse interessato il download lo si trova <a target="_blank" rel="nofollow" href="http://wcfloadtest.codeplex.com/">qui</a>.</p>
