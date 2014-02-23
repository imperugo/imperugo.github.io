---
layout: post
status: publish
published: true
title: Visual Studio 2010 e .NET Framework 4.0
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1630
wordpress_url: http://imperugo.tostring.it/blog/post/visual-studio-2010-e-net-framework-40/
date: 2009-05-19 13:51:52.000000000 +01:00
categories:
- .NET
tags:
- Windows Communication Foundation
- Visual Studio 2010
- ORM
- PDC
- WorkFlow
- Beta
- Configurazione
- Deploy
- ASP.NET 4.0
- .NET Framework 4.0
- Cache
- Framework 4.0
- Entity Framework
comments: true
---
<p>Gi&agrave; dalla presentazione alla <strong><a target="_blank" href="http://www.microsoftpdc.com/Default.aspx">PDC</a> di Los Angeles</strong> se ne parla molto e da ieri, per i possessori di un abbonamento MSDN, &egrave; possibile scaricare la <strong>Beta1</strong> del <strong>.NET Framework 4.0</strong> e <strong>Visual Studio 2010</strong>.</p>
<p>Ovviamente le novit&agrave; sono tantissime, a partire dal tool di sviluppo che include nuove e numerosissime migliorie, fino ad arrivare ad <strong>ASP.NET</strong> passando per il totalmente nuovo <strong>WorkFlow</strong> e <strong>Windows Communication Foundation</strong> che sar&agrave; sempre pi&ugrave; presente nel mondo dello sviluppatore.</p>
<p>Partendo da <strong>Visual Studio</strong> la prima cosa che salta all&rsquo;occhio &egrave; sicuramente l&rsquo;interfaccia migliorata come testimoniano gli screenshot seguenti:</p>
<p><a href="http://imperugo.tostring.it/Content/Uploaded/image/001_4.png" rel="shadowbox[Visual-Studio-2010-e-NET-Framework-40];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase width="204" height="123" border="0" title="001" alt="001" style="border: 0px none ; display: inline;" src="http://imperugo.tostring.it/Content/Uploaded/image/001_thumb_1.png" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/002_2.png" rel="shadowbox[Visual-Studio-2010-e-NET-Framework-40];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase width="204" height="123" border="0" title="002" alt="002" style="border: 0px none ; display: inline;" src="http://imperugo.tostring.it/Content/Uploaded/image/002_thumb.png" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/003_2.png" rel="shadowbox[Visual-Studio-2010-e-NET-Framework-40];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase width="204" height="123" border="0" title="003" alt="003" style="border: 0px none ; display: inline;" src="http://imperugo.tostring.it/Content/Uploaded/image/003_thumb.png" /></a>&nbsp;<a href="http://imperugo.tostring.it/Content/Uploaded/image/004_2.png" rel="shadowbox[Visual-Studio-2010-e-NET-Framework-40];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase width="204" height="124" border="0" title="004" alt="004" style="border: 0px none ; display: inline;" src="http://imperugo.tostring.it/Content/Uploaded/image/004_thumb.png" /></a>&nbsp; <a href="http://imperugo.tostring.it/Content/Uploaded/image/006_2.png" rel="shadowbox[Visual-Studio-2010-e-NET-Framework-40];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase width="204" height="123" border="0" title="006" alt="006" style="border: 0px none ; display: inline;" src="http://imperugo.tostring.it/Content/Uploaded/image/006_thumb.png" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/010_2.png" rel="shadowbox[Visual-Studio-2010-e-NET-Framework-40];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase width="204" height="123" border="0" title="010" alt="010" style="border: 0px none ; display: inline;" src="http://imperugo.tostring.it/Content/Uploaded/image/010_thumb.png" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/007_2.png" rel="shadowbox[Visual-Studio-2010-e-NET-Framework-40];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase width="204" height="124" border="0" title="007" alt="007" style="border: 0px none ; display: inline;" src="http://imperugo.tostring.it/Content/Uploaded/image/007_thumb.png" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/008_2.png" rel="shadowbox[Visual-Studio-2010-e-NET-Framework-40];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase width="204" height="123" border="0" title="008" alt="008" style="border: 0px none ; display: inline;" src="http://imperugo.tostring.it/Content/Uploaded/image/008_thumb.png" /></a>&nbsp;<a href="http://imperugo.tostring.it/Content/Uploaded/image/009_2.png" rel="shadowbox[Visual-Studio-2010-e-NET-Framework-40];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase width="204" height="123" border="0" title="009" alt="009" style="border: 0px none ; display: inline;" src="http://imperugo.tostring.it/Content/Uploaded/image/009_thumb.png" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/005_4.png" rel="shadowbox[Visual-Studio-2010-e-NET-Framework-40];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase width="204" height="123" border="0" title="005" alt="005" style="border: 0px none ; display: inline;" src="http://imperugo.tostring.it/Content/Uploaded/image/005_thumb_1.png" /></a></p>
<p>Anche il designer di <strong>WPF</strong> e <strong>Workflow</strong> &egrave; totalmente nuovo e potenziato; inoltre &egrave; stato aggiunto il supporto per i diagrammi <strong>UML</strong> per la versiose Architect e TeamSystem e nello specifico per i seguenti diagrammi:</p>
<ul>
    <li><strong>Activity</strong>;</li>
    <li><strong>Use Case</strong>;</li>
    <li><strong>Component</strong>;</li>
    <li><strong>Sequence</strong>;</li>
    <li><strong>Class</strong>;</li>
</ul>
<p>Interessante l&rsquo;introduzione di un designer (che <strong>sfrutta WorkFlow 4.0</strong> con delle custom activity) per la <strong>customizzazioni di Build</strong>.</p>
<p>Altre novit&agrave; di Visual Studio 2010 le trovate in <a target="_blank" href="http://channel9.msdn.com/pdc2008/TL47/">questo video</a>.</p>
<p><b>ASP.NET 4.0</b>:</p>
<ul>
    <li>Possibilit&agrave; di specificare <b>providers custom per la gestione della cache</b>;</li>
    <li><strong>AutoStart</strong> delle applicazione web;</li>
    <li>Aggiunto il metodo per il <strong>Permanent Redirect</strong> (301);</li>
    <li>Aggiunte le Propriet&agrave; <strong>Keywords</strong> e <strong>Description</strong> all&rsquo;oggetto <strong>Page</strong>;</li>
    <li>Possibilit&agrave; di <strong>abilitare il ViewState per il singolo controllo</strong> ignorando la direttiva ViewState della pagina;</li>
    <li>Introdotto il<strong> Routing come in ASP.NET MVC</strong>;</li>
    <li>Possibilit&agrave; di <strong>intervenire sul ClientID dei controlli</strong>;</li>
    <li>Migliorata l&rsquo;<strong>integrazione con la libreria Javascript JQuery</strong>;</li>
    <li>Migliorato il <strong>supporto per i CSS e Javascript</strong>;</li>
    <li>Aggiunta la possibilit&agrave; di <strong>inserire snippet anche nel markup</strong>;</li>
    <li>&Eacute; stato introdotto un nuovo meccanismo di deploy che consente la trasformazione del file di configurazione tramite <strong>XDT (XML Document Transform)</strong>;</li>
    <li>&Egrave; stato introdotto il <strong>Web Packaging</strong> che permette di creare un file di installazione con tutto il necessario per il corretto funzionamento della nostra applicazione web;</li>
</ul>
<p>Maggiori informazioni sulle novit&agrave; di <b>ASP.NET 4.0</b> sono disponibili <a target="_blank" href="http://www.asp.net/learn/whitepapers/aspnet40/">qui</a> ed un video introduttivo sulle novit&agrave; <a target="_blank" href="http://channel9.msdn.com/pdc2008/PC20/">qui</a>.</p>
<p>&nbsp;</p>
<p><strong>ENTITY FRAMEWORK: </strong></p>
<ul>
    <li>La tanto richiesta <b>Persistance Ignorance</b>;</li>
    <li>Il <b>LazyLoad</b>;</li>
    <li>Possibilit&agrave; di utilizzare il <b>tool grafico per il mapping partendo da un dominio esistente</b>;</li>
    <li>Migliorata la <b>stabilit&agrave; del designer;</b></li>
    <li>Aggiunta la possibilit&agrave; di <b>mappare stored procedure su entit&agrave; custom</b>;</li>
</ul>
<p>Per maggiori informazioni sulle novit&agrave; di <b>EntityFramework</b> consiglio di seguire il blog del team <a target="_blank" href="http://blogs.msdn.com/efdesign/">qui</a> ed un video sulle principali novit&agrave; <a target="_blank" href="http://channel9.msdn.com/pdc2008/TL20/">qui</a>.</p>
<p>&nbsp;</p>
<p><strong>WINDOWS COMMUNICATION FOUNDATION:</strong></p>
<ul>
    <li>Migliorate le performance del <b>DataContractSerializer</b>;</li>
    <li><b>Semplificazione della configurazione</b>;</li>
    <li><b>Autoconfigurazione dei file svc</b>;</li>
    <li>Aggiunto il binding <b>HTTP Pooling Duplex</b>, utilizzato da <b>Silverlight</b>;</li>
    <li>Possibilit&agrave; di <b>esporre un servizio sul protocollo UDP</b>;</li>
    <li>Routing (precedentemente incluso su Dublin);</li>
    <li>REST&nbsp;Caching;</li>
    <li>Hosting in IIS senza SVC;</li>
    <li>Discovery dei servizi;</li>
    <li>Nuovo sistema di <b>Claim</b> basato su <b>Geneva</b> (nuovo framework per l'autenticazione e gestione dell'identit&agrave;, maggiori info le trovate <a target="_blank" href="http://blogs.ugidotnet.org/raffaele/archive/2009/05/13/geneva-beta-2-finalmente-disponibile.aspx">qui</a>);</li>
    <li>Aggiunto il routing, utile per dirottare chiamate verso diversi endpoint;</li>
</ul>
<p>Maggiori informazioni sulle novit&agrave; di WCF le trovate <a target="_blank" href="http://msdn.microsoft.com/en-us/library/ee354381.aspx">qui</a> ed un video sulle novit&agrave; <a target="_blank" href="http://channel9.msdn.com/pdc2008/TL06/">qui</a>.</p>
<p><br />
<strong>WORKFLOW:</strong></p>
<ul>
    <li>Totalmente riscritto;</li>
    <li>MIgliorate le performarce;</li>
    <li>Nuova Activity Library con il supporto per le collection;</li>
    <li>Nuovo WorkFlow chiamato FlowChart;</li>
    <li>Nuovo e pi&ugrave; potente designer integrato in Visual Studio 2010;</li>
    <li>Maggior integrazione con WCF;</li>
</ul>
<p>Maggiori informazioni le trovate <a target="_blank" href="http://blogs.aspitalia.com/cradle/post2501/.NET-Framework-4.0-Beta-1-Workflow-Foundation-4.0.aspx">qui</a> ed un video introduttivo su WorkFlow 4.0 <a target="_blank" href="http://channel9.msdn.com/pdc2008/TL17/">qui</a>.</p>
<p>Da annotare che nella Beta non &egrave; presente il Framework <a target="_blank" href="http://www.asp.net/mvc">ASP.NET MVC</a> come spiegato da <a target="_blank" href="http://haacked.com/">Phil Haack</a>&nbsp;<a target="_blank" href="http://haacked.com/archive/2009/05/18/aspnetmvc-vs2010-beta1.aspx">qui</a>.</p>
<p>Ciauz</p>
