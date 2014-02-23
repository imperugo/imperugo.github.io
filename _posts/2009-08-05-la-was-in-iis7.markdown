---
layout: post
status: publish
published: true
title: La WAS in IIS7
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1583
wordpress_url: http://imperugo.tostring.it/blog/post/la-was-in-iis7/
date: 2009-08-05 01:46:44.000000000 +01:00
categories:
- ASP.NET
tags:
- Windows Communication Foundation
- Windows
- WAS
- Windows Server
- ASP.NET
- Configurazione
- IIS
- Deploy
- IIS 7.5
comments: true
---
<p>Con l&rsquo;uscita di <strong>Windows Vista</strong> e <strong>Windows Server 2008</strong> &egrave; stata introdotta la <strong>WAS</strong> (<strong>Windows Activation Service</strong>), che permette di &ldquo;hostare&rdquo; su <strong>IIS (Internet Information Services)</strong> servizi WCF anche per protocolli differenti dal tradizionale SOAP (<strong>basicHttpBinding</strong> e <strong>HttpBinding</strong>).    <br />
Precedentemente a queste versioni di sistema operativo era necessario realizzare un servizio Windows che &ldquo;hostasse&rdquo; il servizio WCF, complicando cos&igrave; tutta la procedura di deploy.    <br />
IIS7, con la WAS, abbatte totalmente i problemi legati al rilascio e manutenzione dei servizi in quanto &egrave; sufficiente copiare la singola assembly del servizio all&rsquo;interno del nostro sito web o modificare la sua configurazione e sar&agrave; lui ad occuparsi di tutto il resto.</p>
<p>Sia in Windows Vista che in Windows Server 2008 la WAS non &egrave; presente di default: va quindi installata a mano nell&rsquo;apposita sezione &ldquo;Programs and Features&rdquo;, come mostrato dagli screenshots seguenti:</p>
<p><a href="http://imperugo.tostring.it/Content/Uploaded/image/8-1-2009%203-29-19%20PM_6.png" rel="shadowbox[La-WAS-in-IIS7];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase width="244" height="184" border="0" src="http://imperugo.tostring.it/Content/Uploaded/image/8-1-2009%203-29-19%20PM_thumb_2.png" alt="8-1-2009 3-29-19 PM" title="8-1-2009 3-29-19 PM" style="border: 0px none ; display: inline;" singlelineignorecase="" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/8-1-2009%203-31-56%20PM_2.png" rel="shadowbox[La-WAS-in-IIS7];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase width="244" height="184" border="0" src="http://imperugo.tostring.it/Content/Uploaded/image/8-1-2009%203-31-56%20PM_thumb.png" alt="8-1-2009 3-31-56 PM" title="8-1-2009 3-31-56 PM" style="border: 0px none ; display: inline;" singlelineignorecase="" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/8-1-2009%203-33-15%20PM_2.png" rel="shadowbox[La-WAS-in-IIS7];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase width="244" height="184" border="0" src="http://imperugo.tostring.it/Content/Uploaded/image/8-1-2009%203-33-15%20PM_thumb.png" alt="8-1-2009 3-33-15 PM" title="8-1-2009 3-33-15 PM" style="border: 0px none ; display: inline;" singlelineignorecase="" /></a></p>
<p>Una volta completata la procedura di installazione verr&agrave; automaticamente configurato il DefaultSite per supportare i protocolli <strong>non-http</strong>, quindi <strong><em>NET.TCP, NET.PIPE e NET.MSMQ</em></strong>.</p>
<p>A dimostrazione di quanto appena detto, se si prova ad editare a mano il file XML contenente la configurazione di IIS7 (%windir%\System32\inetsrv\config\applicationHost.config) e si controlla l&rsquo;apposita area del Default Site, si dovrebbe avere una configurazione come la seguente:</p>
{% raw %}<pre class="brush: xml; ruler: true;">
&lt;site name=&quot;Default Web Site&quot; id=&quot;1&quot; serverAutoStart=&quot;true&quot;&gt;
    &lt;application path=&quot;/WCFService&quot; applicationPool=&quot;DefaultAppPool&quot; enabledProtocols=&quot;http,net.tcp,net.pipe,net.msmq&quot;&gt;
        &lt;virtualDirectory path=&quot;/&quot; physicalPath=&quot;C:\inetpub\wwwroot\WCFService&quot; /&gt;     
    &lt;/application&gt;

    &lt;bindings&gt;
        &lt;binding protocol=&quot;https&quot; bindingInformation=&quot;*:443:&quot; /&gt;
        &lt;binding protocol=&quot;http&quot; bindingInformation=&quot;*:80:&quot; /&gt;
        &lt;binding protocol=&quot;net.pipe&quot; bindingInformation=&quot;*&quot; /&gt;
        &lt;binding protocol=&quot;net.msmq&quot; bindingInformation=&quot;localhost&quot; /&gt;
        &lt;binding protocol=&quot;net.tcp&quot; bindingInformation=&quot;808:*&quot; /&gt;
    &lt;/bindings&gt;
&lt;/site&gt; </pre>{% endraw %}
<p>Nel caso la configurazione non coincida con quella appena mostrata, &egrave; possibile eseguire manualmente il comando di configurazione ed abilitazione per i nostri siti web.   <br />
Di seguito potete trovare l&rsquo;elenco dei comandi disponibile per i protocolli non-HTTP:</p>
<blockquote>
<p><strong><em>%windir%\system32\inetsrv\appcmd.exe set site &quot;Default Web Site&quot; -+bindings.[protocol='net.pipe',bindingInformation='*']</em></strong></p>
<p><strong><em>%windir%\system32\inetsrv\appcmd.exe set site &quot;Default Web Site&quot; -+bindings.[protocol='net.tcp',bindingInformation='808:*']</em></strong></p>
<p><strong><em>%windir%\system32\inetsrv\appcmd.exe set site &quot;Default Web Site&quot; -+bindings.[protocol='net.msmq',bindingInformation='localhost']</em></strong></p>
<p><strong><em>%windir%\system32\inetsrv\appcmd.exe set site &quot;Default Web Site&quot; -+bindings.[protocol='msmq.formatname&quot;',bindingInformation='localhost']</em></strong></p>
</blockquote>
<p>Una volta completata la configurazione, &egrave; necessario abilitare i protocolli per tutte le applicazioni che necessitano di hostare WCF in modalit&agrave; non-HTTP.   <br />
Il comando seguente mostra come fare:</p>
<blockquote>
<p><strong><em>%windir%\system32\inetsrv\appcmd.exe set app &quot;Default Web Site/MyVirtual&quot; /enabledProtocols:http,net.pipe, net.tcp, net.msmq</em></strong></p>
</blockquote>
<p>A questo punto da Visual Studio, per aggiungere il servizio net.tcp hostato in IIS basta aggiungere l&rsquo;indirizzo del file .svc presente nel web server ed il gioco &egrave; fatto, come mostrato di seguito:</p>
<p><a href="http://imperugo.tostring.it/Content/Uploaded/image/8-3-2009%209-12-37%20PM_2.png" rel="shadowbox[La-WAS-in-IIS7];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase width="244" height="198" border="0" src="http://imperugo.tostring.it/Content/Uploaded/image/8-3-2009%209-12-37%20PM_thumb.png" alt="8-3-2009 9-12-37 PM" title="8-3-2009 9-12-37 PM" style="border: 0px none ; display: inline;" singlelineignorecase="" /></a></p>
<p>Anche se si specifica un indirizzo http, questo non vuol dire che il servizio viene esposto in http o il proxy punta ad un binding http, ma sar&agrave; direttamente IIS a comunicare al client il protocollo utilizzato.</p>
