---
layout: post
status: publish
published: true
title: Dominio stai lontano dalle mie View
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1428
wordpress_url: http://imperugo.tostring.it/blog/post/dominio-stai-lontano-dalle-mie-view/
date: 2011-10-25 17:30:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- Architettura
comments: true
---
<p>Tutti i giorni mi capita di consultare esempi e progetti fatti da altri, sia nel mondo dell’open source che nel mondo del lavoro.</p>  <p>Moltissime volte ho visto applicazioni <a title="Posts about mvc" href="http://tostring.it/tags/archive/mvc" target="_blank">MVC</a> che hanno il “vizietto” di utilizzare le classi del dominio direttamente dentro le View. Devo ammettere che anche io in passato sono stato tentato - a volte ho anche ceduto - di percorrere questa strada per accorciare i tempi di sviluppo ma, ancora una volta, mi trovo a blaterare su questo errore.</p>  <p>Partendo dalla premessa che noi siamo pagati per sviluppare del buon codice (non credo che mai nessuno vi abbia mai detto – “ti pago, ma scrivi un codice di merda!”), e che non dobbiamo scrivere il codice a nostra comodità perché siamo pigri, volevo ricordare alcuni dei problemi che si posso incontrare utilizzando il dominio nella view:</p>  <ul>   <li><b>La view può avere maggior complessità</b> (non è detto che l’entity abbia le info come le vuole la view, e quindi questa deve recuperarle ed adattarle): questo rischia di creare scenari la cui testabilità della view può diventare difficile, se non impossibile; </li>    <li><b>Query inaspettate</b>. Spesso le entity di dominio sono “proxate” da un O/RM, questo vuol dire che colui che realizzerà la view potrà accedere ad una property che scatenerà a sua volta una query onerosa (magari vuole mostrare il numero di prodotti e fa un count su IList&lt;Product&gt;, finendo con il caricare tutti i prodotti); </li>    <li><b>Problemi di balancing</b>. Per lo stesso motivo di cui sopra (proxy dell’O/RM), le entity di dominio possono non essere serializzabili, escludendo così la possibilità di effettuare caching sui dati delle view. </li>    <li><b>Crescita applicativa bloccata</b>. Se all’improvviso, per imposizioni del client o per scelte architetturali, ci si trova nella situazione in cui tutta la logica di accesso ai dati finisce in un servizio e le view non possono arrivare direttamente all’O/RM, siamo costretti a riscrivere tutta la parte dinamica delle view attingendo ai DTO restituiti dal servizio. </li> </ul>  <p>Capisco la comodità e la velocità nell’utilizzare il dominio nella view, ma fidatevi, alla lunga paga la strada corretta!</p>  <p>Ciauz</p>
