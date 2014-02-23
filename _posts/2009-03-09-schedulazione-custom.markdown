---
layout: post
status: publish
published: true
title: Schedulazione Custom
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1642
wordpress_url: http://imperugo.tostring.it/blog/post/schedulazione-custom/
date: 2009-03-09 00:00:00.000000000 +00:00
categories:
- .NET
tags:
- Windows Communication Foundation
- Schedulazione
- Configurazione
comments: true
---
<p>La riconciliazione notturna ormai &egrave; parte integrante delle applicazioni che mi trovo a sviluppare tutti i giorni.&nbsp;<br />
Spessissimo mi capita di dover eseguire qualcosa (invalidazione della cache, pulizia di record sporchi, ecc) in un determinato momento, che sia questo in un'applicazione web o in un servizio.</p>
<p style="font-size: small; ">Queste procedure tra decine di servizi e applicazioni web sono sempre difficoltose da gestire, spesso alcune devo essere seguite dopo altre o solo in alcuni giorni.</p>
<p style="font-size: small; ">Proprio per questa serie di motivi che ho deciso di crearmi un servizio custom del tutto autonomo in cui, tramite file di configurazione, devo solo specificare cosa, dove e quando devo effettuare una chiamata.</p>
<p style="font-size: small; ">Tradotto in codice viene fuori una roba del genere:</p>
{% raw %}<pre title="code" class="brush: csharp">
&lt;schedule name=&quot;mySchedule&quot;&gt; 
  &lt;service proxyFullyQualifiedName=&quot;MyServiceClient, Imperugo.Services.Client&quot;&gt; 
    &lt;method scheduleName=&quot;sc1&quot; methodName=&quot;Test&quot;&gt; 
      &lt;day weekDay=&quot;Sunday&quot; startTime=&quot;19:00:00&quot;&gt; 
        &lt;parameter parameterName=&quot;param1&quot; parameterType=&quot;System.Int32&quot;parameterValue=&quot;10&quot; /&gt; 
        &lt;parameter parameterName=&quot;param2&quot; parameterType=&quot;System.String&quot;parameterValue=&quot;prova&quot;&gt;&lt;/parameter&gt; 
        &lt;parameter parameterName=&quot;param3&quot; parameterType=&quot;System.Int32&quot;parameterValue=&quot;4&quot;&gt;&lt;/parameter&gt; 
       &lt;/day&gt; 
       &lt;day weekDay=&quot;Monday&quot; startTime=&quot;19:00:00&quot; /&gt; 
       &lt;day weekDay=&quot;Tuesday&quot; startTime=&quot;19:00:00&quot; /&gt; 
       &lt;day weekDay=&quot;Wednesday&quot; startTime=&quot;19:00:00&quot; /&gt; 
       &lt;day weekDay=&quot;Thursday&quot; startTime=&quot;19:00:00&quot; /&gt; 
       &lt;day weekDay=&quot;Friday&quot; startTime=&quot;19:00:00&quot; /&gt; 
       &lt;day weekDay=&quot;Saturday&quot; startTime=&quot;19:00:00&quot; /&gt; 
    &lt;/method&gt; 
  &lt;/service&gt;

   &lt;service proxyFullyQualifiedName=&quot;MyServiceClient, Imperugo.Services.Client&quot;&gt; 
    &lt;method scheduleName=&quot;sc1&quot; methodName=&quot;Test&quot;&gt; 
      &lt;day weekDay=&quot;Sunday&quot; startTime=&quot;19:00:00&quot;&gt; 
        &lt;parameter parameterName=&quot;param1&quot; parameterType=&quot;System.Int32&quot;parameterValue=&quot;10&quot; /&gt; 
        &lt;parameter parameterName=&quot;param2&quot; parameterType=&quot;System.String&quot;parameterValue=&quot;prova&quot;&gt;&lt;/parameter&gt; 
        &lt;parameter parameterName=&quot;param3&quot; parameterType=&quot;System.Int32&quot;parameterValue=&quot;4&quot;&gt;&lt;/parameter&gt; 
       &lt;/day&gt; 
       &lt;day weekDay=&quot;Monday&quot; startTime=&quot;19:00:00&quot; /&gt; 
       &lt;day weekDay=&quot;Tuesday&quot; startTime=&quot;19:00:00&quot; /&gt; 
       &lt;day weekDay=&quot;Wednesday&quot; startTime=&quot;19:00:00&quot; /&gt; 
       &lt;day weekDay=&quot;Thursday&quot; startTime=&quot;19:00:00&quot; /&gt; 
       &lt;day weekDay=&quot;Friday&quot; startTime=&quot;19:00:00&quot; /&gt; 
       &lt;day weekDay=&quot;Saturday&quot; startTime=&quot;19:00:00&quot; /&gt; 
    &lt;/method&gt; 
  &lt;/service&gt; 
&lt;/schedule&gt; </pre>{% endraw %}
<p style="font-size: small; ">&nbsp;</p>
<p style="font-size: small; ">La realizzazione &egrave; piuttosto semplice, una custom section nel file di configurazione,un Timer, il ThreadPool e un po' di reflection per assegnare i parametri ed invocare i proxy.&nbsp;<br />
Ovviamente essendo un servizio di Maintenance non mi sono preoccupato tanto delle performance, quindi la reflection andava benissimo ;).</p>
<p style="font-size: small; ">Appena ultimato con alcune aggiunte (tipo poter impostare una chiamata giornaliera senza inseririe tutti i giorni, oppure eseguire un qualcosa ogni x minuti) poster&ograve; un po' di codice e perch&egrave; no il download.</p>
<p style="font-size: small; ">Ciauuzz</p>
