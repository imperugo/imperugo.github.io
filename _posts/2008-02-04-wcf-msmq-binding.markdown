---
layout: post
status: publish
published: true
title: WCF + MSMQ Binding
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1652
wordpress_url: http://imperugo.tostring.it/blog/post/wcf-msmq-binding/
date: 2008-02-04 01:00:00.000000000 +00:00
categories:
- .NET
tags:
- Windows Communication Foundation
- Scalabilità
- SOA
comments: true
---
<p><span>In quest'ultimo periodo, in azienda, stiamo organizzando e progettando delle nuove parti di un'applicativo fortemente basato su servizi. </span></p>
<p>In questo e in molti altri scenari, si ha la necessit&agrave; di avere una forte scalabilit&agrave; e la certezza di non perdere nessun dato anche nel caso uno dei servizi si offline per manutenzione e/o problemi tecnici di qualsiasi tipo.</p>
<p>Dopo varie analisi con lo sciur Sudano aka <a onclick="blankUrl(this.href); return false;" href="http://www.giancarlosudano.it/">Janky</a> (spinto dalle teorie di <a onclick="blankUrl(this.href); return false;" href="http://blogs.msdn.com/pathelland/">Pat Helland</a> :D, altro che notepad) abbiamo deciso di implementare per i punti crifiti dell'applicativo <strong>Microsoft Message Queue con WCF</strong> e, devo dar atto che le suo potenzialit&agrave; e casi di utilizzo sono veramente impressionati.</p>
<p>Basti pensare che in tutte quelle situazioni in cui si ha la necessit&agrave; di avere cahiamate OneWay verso un servizio, MSMQ pu&ograve; essere utilissimo.</p>
<p>Non voglio dilungarmi in particolari scenari e specifiche troppo tecniche, magari ne esce un qualcosa di scritto successivamente.</p>
<p>A chiunque sia interessato sull'argomento consiglio la lettura e visione di questo articolo /screencast</p>
<p><a title="http://code.msdn.microsoft.com/msmqpluswcf" href="http://code.msdn.microsoft.com/msmqpluswcf">http://code.msdn.microsoft.com/msmqpluswcf</a></p>
<p>Quindi come dice il caro <a onclick="blankUrl(this.href); return false;" href="http://blogs.aspitalia.com/sm15455">Mostardone nazionale</a> stay tuned</p>
<p><br />
Ciauz a tutti.</p>
<p>&nbsp;</p>
<p>P.S: il gatto &egrave; sotto l'auto e il lupo guarda lontano.</p>
<p>&nbsp;</p>
