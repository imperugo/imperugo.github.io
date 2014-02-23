---
layout: post
status: publish
published: true
title: Alcune novità di ASP.NET 4.0
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1629
wordpress_url: http://imperugo.tostring.it/blog/post/alcune-novita-di-aspnet-40/
date: 2009-05-26 14:35:03.000000000 +01:00
categories:
- ASP.NET
tags:
- Ottimizzazione
- Session
- SEO
- Visual Studio 2010
- Beta
- .NET
- ASP.NET 4.0
- .NET Framework 4.0
comments: true
---
<p>Nel <a target="_blank" href="http://imperugo.tostring.it/Blog/Post/Visual-Studio-2010-e-NET-Framework-40">post precedente</a> ho riportato alcune delle principali novit&agrave; introdotte con la <strong>Beta 1</strong> del <strong>.NET Framework 4.0</strong> e <strong>Visual Studio 2010</strong>; da questo post in poi vorrei iniziare una serie di pubblicazioni che entrano un po&rsquo; pi&ugrave; in dettaglio su come possono essere utilizzate queste importanti features introdotte da Microsoft.</p>
<p>Le novit&agrave; di <strong>ASP.NET 4.0</strong> sono divise nelle sei categorie seguenti:</p>
<ul>
    <li><strong>Core</strong>;</li>
    <li><strong>AJAX Functionality in ASP.NET 4.0</strong>;</li>
    <li><strong>Web Forms</strong>;</li>
    <li><strong>Dynamic Data</strong>;</li>
    <li><strong>Visual Studio 2010 Web Designer Improvements</strong>;</li>
    <li><strong>Web Application Deployment with Visual Studio 2010</strong>;</li>
</ul>
<p>Ovviamente ogni categoria racchiude diverse migliorie rispetto alle versioni precedenti del <strong>.NET Framework</strong>; per esempio nella categoria Core possiamo trovare il <strong>PermantRedirect</strong>, <strong>Extensible Output Caching</strong>, <strong>Auto-start</strong>, ecc.</p>
<p>In questo post si vedr&agrave; nel dettaglio il funzionamento di due nuove features presenti nella sezione Core:</p>
<ul>
    <li>Permanent Redirect;</li>
    <li>Session State Compression;</li>
</ul>
<p><b>Permanent Redirect: <br />
</b>Quando un indirizzo web viene cambiato &egrave; necessario effettuare un redirect dal vecchio indirizzo verso il nuovo, per far s&igrave; che non venga restituito un errore 404.</p>
<p>Nel caso il client richiedente l&rsquo;indirizzo sia un motore di ricerca &egrave; necessario comunicare che il cambiamento &egrave; di tipo Permanent (status code 301); questo permetter&agrave; al Bot del search engine di sostiturire il vecchio indirizzo con il nuovo.</p>
<p>Questo tipo di approccio &egrave; importantissimo per le pratiche <strong>SEO</strong> (<strong>Search Engine Optimization</strong>) ed andrebbe sempre utilizzando per questo tipo di redirect. <br />
Dalla versione Beta 1 &egrave; disponibile un apposito metodo che ci permette di effettuare questo tipo di Redirect; il codice seguente mostra la differenza tra la nuovissima Beta 1 del .NET Framework 4.0 e le versioni precedenti.</p>
<p><em>Versione antecedente al Framework 4.0:</em></p>
{% raw %}<pre class="brush: csharp; ruler: true;">
Response.Status = &quot;301 Moved Permanently&quot;;
Response.AddHeader(&quot;Location&quot;,&quot;http://www.mysite.com/newurl/&quot;);</pre>{% endraw %}
<p><em>Versione del Framewrok 4.0:</em></p>
{% raw %}<pre class="brush: csharp; ruler: true;">
RedirectPermanent(&quot;http://www.mysite.com/newurl/&quot;);</pre>{% endraw %}
<p>&nbsp;</p>
<p><b>Session State Compression: <br />
</b>Quando si fa uso della <strong>Sessione Out Of Process</strong>, i dati che vengono inseriti in questo repository devono essere serializzati al momento del salvataggio e deserializzati al momento della lettura, per fare in modo che vengano salvati in un qualcosa che possa essere letto al di fuori del processo corrente.</p>
<p>Se si prova ad immaginare un&rsquo;applicazione web che risiede su una server farm o, senza andare cos&igrave; lontano, un&rsquo;applicazione il cui Application Pool ha la WebGarden abilitata, ci si rende subito conto del perch&egrave; i dati debbano essere serializzati.</p>
<p>Ovviamente il processo di <strong>Serializzazione/Deserializzazione</strong> ha un costo che pu&ograve; crescere se lo si aggiunge al trasporto delle informazioni da un server ad un altro; proprio quest&rsquo;ultima parte pu&ograve; essere migliorata andando a comprimere il dato, garantendo cos&igrave; una riduzione del tempo di trasporto delle informazioni.</p>
<p>Con il .NET Framework 4.0 &egrave; stata aggiunta la possibilit&agrave; di attivare questa compressione per la Session Out Of Process. <br />
L&rsquo;abilitazione di questa funzione avviene tramite file di configurazione, come mostrato di seguito:</p>
{% raw %}<pre class="brush: xml; ruler: true;">
&lt;sessionState    
	mode=&quot;SqlServer&quot;    
	sqlConnectionString=&quot;data source=mydbserver;Initial Catalog=myDatabase&quot;    
	allowCustomSqlDatabase=&quot;true&quot;    
	compressionEnabled=&quot;true&quot;/&gt;</pre>{% endraw %}
<p>La parte della compressione viene eseguita in automatico dalla libreria System.IO.Compression.GZipStream.</p>
<p>Ciauz</p>
