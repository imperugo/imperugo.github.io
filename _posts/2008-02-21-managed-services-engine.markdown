---
layout: post
status: publish
published: true
title: Managed Services Engine
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1651
wordpress_url: http://imperugo.tostring.it/blog/post/managed-services-engine/
date: 2008-02-21 01:00:00.000000000 +00:00
categories:
- .NET
tags:
- Windows Communication Foundation
- Configurazione
- Deploy
comments: true
---
<p><span>Su suggerimento dello <a onclick="function onclick(event) { function onclick(event) { blankUrl(this.href); return false; } }" href="http://blogs.ugidotnet.org/janky">Sciuro Sudano</a> ho dato un'occhiata a <strong>Managed Services Engine</strong> che in ambienti tipo quello descritto in questo <a onclick="function onclick(event) { function onclick(event) { blankUrl(this.href); return false; } }" href="http://blogs.aspitalia.com/imperugo/post2229/bello-lavori.aspx">post</a>, in cui si ha un alto numero di endpoint pu&ograve; essere una manna dal cielo. </span></p>
<p>Per chi non lo conoscesse gi&agrave;, <strong>MSE</strong> (scaricabile da <a onclick="function onclick(event) { function onclick(event) { blankUrl(this.href); return false; } }" href="http://www.codeplex.com/servicesengine">CodePlex</a>), non &egrave; altro che un repository di servizi con il compito di fare da routing di tutti i client verso i vari servizi sparsi nella rete. <br />
<br />
Si provi ad immaginare di dover cambiare indirizzo ad un servizio referenziato da 40 client? Sarebbe di difficile e di scomoda gestione, almeno 40 cambi configurazione e 40 riavvii dei vari applicativi.</p>
<p>Con MSE vi basta far puntare il vostro client al servizio che a sua volta ridiriger&agrave; le chiamate al servizio corretto, cos&igrave; nel caso si decida di cambiare un endopoint, una porta, o quel che volete, vi basta farlo solo su <strong>MSE,</strong> e non su tutti i client, poi come per incanto i 40 cambi di configurazione si traducono in un'unica operazione!</p>
<p>Beh mica male direi.</p>
<p>A tutto ci&ograve; va aggiunto il fatto che questo tool &egrave; dotato di un'ottimo wizard che segue l'utente durante la configurazione dei vari endpoint.</p>
<p>Ovviamente gli endpoint supportati da wcf li abbiamo tutti come mostrato dallo screenshot seguente:</p>
<p><img width="437" height="218" alt="" src="/content/Uploaded/image/image_thumb.png" /><span class="Apple-style-span" style="color: rgb(0, 0, 238); text-decoration: underline;"><br />
</span></p>
<p>&nbsp;</p>
<p>ma si ha la possibilit&agrave; di definirne dei propri.</p>
<p>Per la memorizzazione delle varie configurazione si appoggia a SQL Server, ma la creazione delle varie tabelle necessarie al suo funzionamento &egrave; del tutto automatizzata dal suo setup (cosa non sempre scontata in progetti open source)</p>
<p>Sono rimasto cos&igrave; impressionato dall'efficacia e utilit&agrave; di questo tool che mi sembrava giusto parlarne.</p>
<p>Una grazie allo <a onclick="function onclick(event) { function onclick(event) { blankUrl(this.href); return false; } }" href="http://blogs.ugidotnet.org/janky">Sciuro Sudano</a> per la dritta.</p>
<p>Ciauz</p>
<p>&nbsp;</p>
