---
layout: post
status: publish
published: true
title: Ricerca all'interno dei documenti
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1663
wordpress_url: http://imperugo.tostring.it/blog/post/ricerca-all-interno-dei-documenti/
date: 2006-04-05 01:00:00.000000000 +01:00
categories:
- .NET
tags:
- Lucene.Net
- .NET
comments: true
---
<p><span>In questi giorni sono parecchio incasinato con il lavoro e per questo sto tralasciando un po' la comunity, (forum, blog, ecc.) e me ne scuso, d'altro canto il lavoro &egrave; sempre il lavoro. </span></p>
<p>In particolar modo&nbsp;sto lavorando alla realizzazione di un motore di ricerca un po' diverso dal solito, ossia con la possibilit&agrave; di indicizzare dei documenti presenti all'interno del nostro sito o indicizzare pagine esterne tramite url.</p>
<p>Per capire bene la cosa immaginiamo un sito dove le news, articoli, delibere, ecc, vengono create dinamicamte tramite un CMS o un FTP da parte dell'amministratore.&nbsp;<br />
Nel motore di ricerca del sito dobbiamodo dare la posssibilit&agrave; di indicizzare anche il testo contenuto&nbsp;in questi file.Operazione solitamente scomoda se il cms non offre questa possibilit&agrave; o l'amministratore non scrive le keyword del documento distribuito on-line in qualche field che ci andiamo a leggere successivamente.</p>
<p>Partendo da quest'idea la prima cosa fatta &egrave; stata una ricerca sul web di prodotti gi&agrave; esistenti e qui sono incappato su <a href="http://www.dotlucene.net/" onclick="blankUrl(this.href); return false;">DotLucene</a>, motore di ricerca realizzato in .Net, che per lo storage dell'indice utilizza un file e non un database. Da l&igrave; sono finito su <a href="http://www.seekafile.org/" onclick="blankUrl(this.href); return false;">SeekaFile</a>, che non &egrave; altro che un servizio windows che indicizza dei file presenti all'interno di un path impostato da noi, con in pi&ugrave; una dependency&nbsp;sul file che, nel caso venga modificato, l'indice &egrave; automaticamente aggiornato.Funzione spettacolare, ma non sempre si ha la possibilit&agrave; di installare dei servizi custom sul server, quindi ho preso il tutto, ho scorporato il servizio, gli ho aggiunto un po' di plug-in per leggere l'html direttamente da un url ripulendolo e indicizzando solo il testo, stessa cosa per i PDF e RTF e ottenendo come risultato di ricerche e indicizzazione delle mie custom entity e collection (ormani le uso da tutte le parti, non mi ricordo neanche come si crea un datatable).</p>
<p>L'aspetto&nbsp;pi&ugrave; interessante di questa versione da me creata &egrave; che tutto &egrave; utilizzabile senza realizzare nessun setup ma soltanto impostando dei valori nel web.config ed effettuando una chiamata quando si crea, upload o modifica un file.<br />
L'indicizzazione avviene tramite thread, con una gestione della coda, a volte per leggere un pdf di diversi mega e ripulirlo la macchina pu&ograve; impiegare diversi secondo, ma la ricerca continua a funzionare e tutti gli altri file da indicizzare sono in attesa che finisca il primo thread.<br />
L'indicizzazione avviene in&nbsp;lowpriority, il che significa che in caso altre applicazioni sul server richiedano risore lui le rilascia, aspettando che la macchina si meno indaffarata :)</p>
<p>Ricapitolando le caratteristiche del motore.</p>
<ul>
    <li>Indicizzazione su file senza Database;</li>
    <li>Non necessita di installazione;</li>
    <li>Indicizza documenti DOC,PDF,XLS,PPT,RTF,HTML,TXT,XML;</li>
    <li>Indicizza direttamente l'HTML da un url (grabba il codice lo filtra e lo indicizza)</li>
    <li>Possibilit&agrave; di crearsi plug-in personalizzati e caricarli a runtime;</li>
    <li>Possibilit&agrave; di indicizzare direttamente delle directory;</li>
    <li>Utilizzo di custom entity e collection;</li>
    <li>Gestione della coda di indicizzazione;</li>
    <li>Low priority per l'indicizzazione.</li>
    <li>e poi non so vediamo un po' l'ispirazione cosa porta :)</li>
</ul>
<p>Per chi fosse interessato alla cosa non posso che dire Stay Tuned!!.<br />
( frase brutalmente copiata, non dico a chi, ma sono sicuro che lui lo sa )</p>
<p>Ovviamente se avete esperienze, idee o altro sono ben accette.<br />
Chiss&agrave; che non mi venga in mente di realizzare un desktop search tipo quello di Google o Microsoft, il principio &egrave; lo stesso. :D</p>
<p>&nbsp;</p>
