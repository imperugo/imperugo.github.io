---
layout: post
status: publish
published: true
title: Idle timeout in IIS e Azure
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1436
wordpress_url: http://imperugo.tostring.it/blog/post/idle-timeout-in-iis-e-azure/
date: 2011-09-05 17:36:00.000000000 +01:00
categories:
- ASP.NET
tags:
- IIS
- Azure
- Deploy
comments: true
---
<p>Come era facilmente intuibile da uno dei miei ultimi post, ultimamente sto lavorando ad un’applicazione “hostata” su Windows <a title="Azure contents" href="http://imperugo.tostring.it/tags/archive/azure" target="_blank">Azure</a>. Oltre ai “problemi” di continuous deployment descritti <a title="ASP.NET MVC in Azure" href="http://imperugo.tostring.it/blog/post/asp.net-mvc-in-azure/" target="_blank">qui</a>, ho riscontrato un altro piccolo problema riguardante la configurazione di <a title="IIS Contents" href="http://imperugo.tostring.it/tags/archive/iis" target="_blank">IIS</a>.     <br />IIS ha un’interessante configurazione (idle timeout) nata allo scopo di ridurre al minimo le risorse utilizzate dalle applicazioni web; tale configurazione consiste nello “spegnere” un sito web, nel caso non vi siano richieste da parte di utenti per un tempo di 20 minuti.</p>  <p>Questo valore è ovviamente configurabile dalla console di IIS e lo si può ridurre, aumentare o addirittura disabilitare. Nel caso ci si trovi nell’ambito di un’installazione locale, è sufficiente cambiare la configurazione dell’application pool che “hosterà” il nostro sito web.</p>  <h3><strong>Ma se ci si trova in Windows Azure? </strong></h3>  <p>In Azure non è possibile accedere in terminal server alla macchina contenente il nostro sito e cambiare l’Idle Timeout. Esiste però un escamotage che abilita tale accesso al server sul cloud; tale “hack” risulterebbe in ogni caso inutile, in quanto al riavvio della macchina virtuale (ma anche alla creazione di una nuova istanza) sarebbe necessario reimpostare di nuovo il valore, obbligandoci così a collegarci nuovamente in terminal server.</p>  <p>Fortunatamente all’interno del package di Azure possiamo definire dei task di avvio, che verranno eseguiti ad ogni riavvio della macchina virtuale (o alla creazione di una nuova istanza). All’interno di questi task possiamo eseguire applicazioni, comandi DOS e quant’altro possa servirci per far funzionare la nostra applicazione.</p>  <p>In questo <a title="Controlling Application Pool Idle Timeouts in Windows Azure" href="http://blog.smarx.com/posts/controlling-application-pool-idle-timeouts-in-windows-azure" rel="nofollow" target="_blank">post</a>&#160;<a title="Steve Marx" href="http://blog.smarx.com/" rel="nofollow" target="_blank">Steve Marx</a> spiega come eseguire dei task e, proprio in questo esempio, mostra come cambiare il timeout di default di IIS.</p>  <p>Per prima cosa è necessario modificare il file <em><strong>ServiceDefinition.csdef</strong></em> ed inserire il seguente codice:</p>  {% highlight xml %}
<Startup>
    <Task commandLine="Tasks\startup.cmd" executionContext="elevated" taskType="simple" />
</Startup>
{% endhighlight %}
<p>Per questo esempio il <i>task type</i> sarà di tipo <i>simple</i>, ma in un futuro post vedremo le differenti tipologie ed eventuali scenari di utilizzo.</p>

<p>Da qui in poi è sufficiente creare un file .cmd con all’interno il comando DOS per per disabilitare il timeout di IIS, come mostrato di seguito.</p>

<blockquote>
  {% raw %}<pre>%windir%\system32\inetsrv\appcmd set config -section:applicationPools
    -applicationPoolDefaults.processModel.idleTimeout:00:00:00</pre>{% endraw %}
</blockquote>

<p>A questo punto l’applicazione hostata in Azure sarà sempre reattiva, anche in caso di poco traffico (molto comodo in fase di testing). 
  <br />Ciauz</p>
