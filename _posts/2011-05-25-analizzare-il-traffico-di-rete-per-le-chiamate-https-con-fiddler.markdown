---
layout: post
status: publish
published: true
title: Analizzare il traffico di rete per le chiamate https con Fiddler
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1441
wordpress_url: http://imperugo.tostring.it/blog/post/analizzare-il-traffico-di-rete-per-le-chiamate-https-con-fiddler/
date: 2011-05-25 16:50:00.000000000 +01:00
categories:
- Web Dev
tags:
- Windows Communication Foundation
- ASP.NET
- Fiddler
- Https
comments: true
---
<p>Oggi ho avuto la necessità di analizzare del traffico di rete la cui Request partiva dalla mia macchina, per poi finire verso un webserver Java hostato in https su di un webserver Apache. Essendo esposto in BasicHttpBinding, il suo utilizzo è risultato da subito molto semplice; un semplice AddServiceReference da VisualStudio e poche righe di codice per cominciare a comunicare con la piattaforma esterna.</p>  <p>Tale comunicazione è avvenuta senza problemi al primo colpo, ma il dato restituito non conteneva tutte le informazioni che mi sarei aspettato per quella chiamata. Purtroppo dall’altra parte mi son sentito dire che il problema risiedeva nei miei proxy e che il parser dell’xml restituito dal servizio era errato.</p>  <p>Fortunatamente non ho mai avuto problemi di questo tipo con i proxy creati tramite svcutil, quindi mi sono messo ad analizzare i pacchetti di rete tra la mia macchina ed i servizi in questione. Durante tale analisi ho riscontrato due problemi:</p>  <ol>   <li><strong>Il traffico di rete tra la mia macchina ed i servizi avveniva tramite una connessione sicura https</strong>; </li>    <li><strong>Le chiamate venivano effettuate tramite un’applicazione web che non viene tracciata di default tramite fiddler</strong>; </li> </ol>  <p>Entrambi i punti sono facilmente risolvibili. Per la parte https è necessario installare l’ultima versione di Fiddler (scaricabile da <a title="Download Fiddler" href="http://www.fiddler2.com/fiddler2/" rel="nofollow" target="_blank">qui</a>) ed attivare la relativa opzione nei suoi setting, come mostrato dagli screenshots seguenti:</p>  <p><a href="http://www.tostring.it/UserFiles/imperugo/SNAGHTML7ba8f5b.png" target="_blank"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="SNAGHTML7ba8f5b" border="0" alt="SNAGHTML7ba8f5b" src="http://www.tostring.it/UserFiles/imperugo/SNAGHTML7ba8f5b_thumb.png" width="240" height="174" /></a><a href="http://www.tostring.it/UserFiles/imperugo/SNAGHTML7bb638b.png" target="_blank"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="SNAGHTML7bb638b" border="0" alt="SNAGHTML7bb638b" src="http://www.tostring.it/UserFiles/imperugo/SNAGHTML7bb638b_thumb.png" width="296" height="174" /></a></p>  <p><em>Maggiori info riguardo Fiddler e https sono disponibili </em><a title="Fiddler https" href="http://www.fiddler2.com/Fiddler/help/httpsdecryption.asp" rel="nofollow" target="_blank"><em>qui</em></a><em>.</em></p>  <p>Per quanto riguarda invece il problema di monitorare il traffico in uscita da un’applicazione web, è sufficiente cambiare l’identity dell’application pool con cui viene eseguital’applicazione ed impostare lo stesso utente con cui gira Fiddler (quindi l’utente loggato). A questo punto come per magia verrà mostrato anche il traffico della vostra web application.    <br />La “vicenda” si è conclusa dimostrando che i servizi non restituivano le informazioni aspettate <img style="border-bottom-style: none; border-left-style: none; border-top-style: none; border-right-style: none" class="wlEmoticon wlEmoticon-smile" alt="Smile" src="http://www.tostring.it/UserFiles/imperugo/wlEmoticon-smile_2_8.png" /></p>
