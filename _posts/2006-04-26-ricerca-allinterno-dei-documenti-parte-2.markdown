---
layout: post
status: publish
published: true
title: Ricerca all'interno dei documenti Parte 2
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1662
wordpress_url: http://imperugo.tostring.it/blog/post/ricerca-all-interno-dei-documenti-parte-2/
date: 2006-04-26 01:00:00.000000000 +01:00
categories:
- .NET
tags:
- Lucene.Net
- .NET
comments: true
---
<p><span>Per chi si fosse perso il <a href="http://imperugo.tostring.it/Blog/Post/Ricerca-all-interno-dei-documenti">post</a> precedente, sto realizzando un motore di ricerca per indicizzare dei documenti. <br />
Beh rispetto alla versione precedente posso dire di aver fatto dei bei passi in avanti, ora posso paginare (pu&ograve; sembrare una stupidata, ma vi assicuro che con dotLucene non lo &egrave;), ed avere ottime performance. <br />
La paginazione &egrave; stata dura, in quanto dotLucene non ha una query tipo il COUNT di una SELECT, quindi mi sono dovuto arrangiare un po' creado un sistema a parte per la paginare, effettuando una sola query in modo da non perdere in performance. <br />
Ora con 2200 documenti indicizzati riesco a fare una ricerca avendo 1951 risultati in 0.0625 secondi. :) !!!!Spettacolo direi, anche se spero di migliorare ancora le performance passando alla versione nuova del motore. <br />
<br />
Per completare l'operona ora manca veramente poco, inserire i Filtri per la lingua Italiana, in modo da togliere tutti gli articoli (il,del, per,ecc) dall'indicizzazione e poco altro ancora. <br />
<br />
Per i test mi sono divertito a fare un interfaccia un po' particolare, mi ricorda qualcosa. Secondo voi che??? <a href="http://daniele.aspitalia.com/"><br />
<br />
Daniele </a>&nbsp;quando l'ha vista mi ha detto che sono megalomane.<br />
<br />
<img border="0" src="http://photos1.blogger.com/blogger/2782/1333/400/schermata.jpg" alt=" " style="margin: 0px auto 10px; display: block; text-align: center;" /> Le prestazioni: <img border="0" src="http://photos1.blogger.com/blogger/2782/1333/400/prestazioni.jpg" alt=" " style="margin: 0px auto 10px; display: block; text-align: center;" /> </span></p>
<p>&nbsp;</p>
<p>Un rigranziamento particolare a Fabio (cyber), che mi ha aiutato mentre imprecavo quando il motore non andava.</p>
<p>&nbsp;</p>
