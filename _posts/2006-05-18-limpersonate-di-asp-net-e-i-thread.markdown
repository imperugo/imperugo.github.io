---
layout: post
status: publish
published: true
title: L'impersonate di asp.net e i thread
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1661
wordpress_url: http://imperugo.tostring.it/blog/post/l-impersonate-di-aspnet-e-i-thread/
date: 2006-05-18 01:00:00.000000000 +01:00
categories:
- ASP.NET
tags:
- Impersonate
- MultiThreading
comments: true
---
<p><span>Ieri notte, insieme al mio amico Fabio, stavamo sviluppando un applicazione web non eccessivamente complessa fino a quando non si &egrave; verificato un problema di permessi. <br />
Entro meglio nel dettaglio per far capire la cosa:<br />
La prima caratteristica dell'applicazione &egrave; che dovendo accedere a determinate cartelle protette non doveva usare l'utente ASP.NET per eseguire le operazioni, ma bensi un utente membro di un dominio che per comodift&agrave; chiamer&ograve; farmuser.<br />
Per far si che l'utente utilizzato non sia asp.net basta andare ad aggiungere nel web.config la riga sull'identity, come la seguente:</span></p>
{% raw %}<pre title="code" class="brush: xhtml">
&lt;identity impersonate=&quot;true&quot; userName=&quot;farmuser&quot; password=&quot;farmpass&quot; /&gt;</pre>{% endraw %}
<p><span> </span></p>
<p>Fatto ci&ograve; sembra tutto ok, fino a quando non andavamo a utilizzare dei thread in una situazione simile alla seguente:</p>
<p>La pagina aspx lancia un nuovo thread (nel mio caso passando per un metodo statico) ed seguiva un blocco di codice tipo il seguente:</p>
{% raw %}<pre title="code" class="brush: csharp">
indexerThread = new Thread(new ThreadStart(Run)); 
indexerThread.Priority = ThreadPriority.Lowest; 
indexerThread.Name = &quot;Indexer&quot;; 
indexerThread.Start();

</pre>{% endraw %}
<p><span> </span></p>
<p>Il metodo statico run eseguiva delle operazioni su file, e qui sono cominciati gli errori. :)</p>
<p>L'inghippo lo abbiamo trovato nei nuovi file creati dal metodo run che avevano come utente ASP.NET, ma poi quando dovevano essere rinominati e/o cancellati dall'utente farmuser, il runtime ci stampava un bell'errore di accesso negato.</p>
<p>Armati di pazienza (molta pi&ugrave; Fabio che io) tramite</p>
{% raw %}<pre title="code" class="brush: csharp">
WindowsIdentity.GetCurrent().Name&nbsp;</pre>{% endraw %}
<p><span>ci siamo messi a cercare dove veniva cambiato l'utente e questo avveniva all'interno del metodo run; quindi se da una pagina asp.net si lancia un thread&nbsp;anche se si ha impostato l'imperosnificazione dell'utente asp.net nel web config, il secondo thread ha sempre come user ASP.NET. </span></p>
<p>Per risolvere il problema (dopo vari tentativi e ricerche su google) siamo arrivati a questa soluzione:</p>
{% raw %}<pre title="code" class="brush: csharp">
internal static System.Security.Principal.WindowsIdentity ApplicationIdentity;&nbsp;</pre>{% endraw %}
<p>dentro il nostro metodo statico</p>
{% raw %}<pre title="code" class="brush: csharp">
ApplicationIdentity = System.Security.Principal.WindowsIdentity.GetCurrent();</pre>{% endraw %}
{% raw %}<pre title="code" class="brush: csharp">
indexerThread = new Thread(new ThreadStart(Run)); 
indexerThread.Priority = ThreadPriority.Lowest; 
indexerThread.Name = &quot;Indexer&quot;; 
indexerThread.Start();</pre>{% endraw %}
<p>e dentro il run</p>
{% raw %}<pre title="code" class="brush: csharp">
ApplicationIdentity.Impersonate();</pre>{% endraw %}
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
