---
layout: post
status: publish
published: true
title: WCF, MSMQ e Service Broker
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1648
wordpress_url: http://imperugo.tostring.it/blog/post/wcf-msmq-e-service-broker/
date: 2008-07-22 01:00:00.000000000 +01:00
categories:
- .NET
tags:
- Windows Communication Foundation
- SOA
- Architettura
comments: true
---
<p><span>Ai <a onclick="blankUrl(this.href); return false;" href="http://www.communitydays.it/">Community Days,</a> con <a onclick="blankUrl(this.href); return false;" href="http://blogs.aspitalia.com/sm15455">Stefano</a> durante la sessione &quot;Creare applicazioni web service-based con .NET 3.5&quot; abbiamo parlato di <strong>Message Queue</strong>, ma subito dopo ci &egrave; stato chiesto il perch&egrave; andare ad utilizzare <strong>Message Queue</strong> in alternativa ai <strong>Service Broker</strong> di SQL Server. </span></p>
<p>La decisione non &egrave; affatto facile in quanto ognuno dei due ha dei punti a favore nei confronti dell'altro.</p>
<p>Per prima cosa c'&egrave; da dire che<strong> MSMQ &egrave; integrato con il sistema operativo</strong> fin dai tempi di Windows 95, caratteristica non da poco in quanto <strong>non richiede costi di licenza aggiuntiva</strong> a differenza dei <strong>Service Broker</strong> che <strong>richiedono una licenza di SQL Server</strong>. <br />
Altra caratteristica che gioca a favore di <strong>MSMQ</strong> &egrave; <strong>l'integrazione a costo zero con WCF</strong>, infatti quest'ultimo ha gi&agrave; un transport channel per MSMQ, <strong>cosa non presente per i Service Broker</strong> (qui nasce la domanda, perch&egrave;?).</p>
<p>Cambiando sponda con <strong>Service Broker</strong> si ha il vantaggio del repository, che &egrave; il database di Sql Server e questo <strong>ci permette di evitare transazioni distribuite consentendoci maggiore performance</strong>.</p>
<p>Sicuramente per la parte di sviluppo applicativo MSMQ la vince sui Service Broker, in quanto bastano poche righe di codice WCF per poter cominciare subito ad utilizzarlo, e questa non &egrave; una caratteristica da poco, ma non si pu&ograve; dire se &egrave; meglio uno o l'altro, la scelta va ponderata in base alla propria esigenza.</p>
<p>Ciauz</p>
<p>&nbsp;</p>
