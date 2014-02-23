---
layout: post
status: publish
published: true
title: Errore 404.3 con un servizio WCF hostato in IIS
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1484
wordpress_url: http://imperugo.tostring.it/blog/post/error-404-3-wcf-service-host-iis/
date: 2010-07-01 16:45:00.000000000 +01:00
categories:
- ASP.NET
tags:
- Windows Communication Foundation
- IIS
comments: true
---
<p>Ultimamente in <a title="Dexter Blog Engine Category" href="http://www.imperugo.tostring.it/categories/archive/Dexter" target="_blank">Dexter</a> stiamo aggiungendo una batteria di servizi per poter realizzare delle applicazioni client che possano interagire con il nostro engine e, nello specifico, applicazioni riguardanti il neonato Windows Phone 7, IPhone, IPad ed Android.    <br />Testando il primo servizio sono incappato subito in un errore riguardante la raggiungibilità del servizio stesso, ricevendo da IIS un <strong><em>HTTP Error 404.3 - Not Found, </em></strong>nonostante che il servizio fosse presente e correttamente configurato.</p>  <p>Il problema era dovuto al fatto che nel mio IIS locale non erano registrati tutti i moduli necessari al funzionamento del servizio; tutto ciò è facilmente risolvibile eseguendo dal prompt del dos I seguenti comandi:</p>  <blockquote>   <p>cd c:\windows\Microsoft.Net\Framework\v3.0\Windows Communication Foundation\</p>    <p>ServiceModelReg –i</p> </blockquote>  <p>A questo punto nella schermata dovrebbero apparire tutta una serie di messaggi che informano l’utente su cosa è stato installato.   <br />Scopo del post è ricordarsi il comando <img style="border-bottom-style: none; border-right-style: none; border-top-style: none; border-left-style: none" class="wlEmoticon wlEmoticon-smile" alt="Smile" src="http://tostring.it/UserFiles/imperugo/wlEmoticon-smile_2.png" /></p>  <p>Ciauz</p>
