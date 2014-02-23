---
layout: post
status: publish
published: true
title: Unable to open Web site – Visual Studio e IIS7.x
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1536
wordpress_url: http://imperugo.tostring.it/blog/post/unable-to-open-web-site-ndash-visual-studio-e-iis7x/
date: 2009-11-27 08:02:00.000000000 +00:00
categories:
- .NET
tags:
- Visual Studio
- IIS
comments: true
---
<p>Questa sera, non so per quale motivo, <a title="Search Visual Studio" href="http://imperugo.tostring.it/blog/search?q=Visual+Studio&amp;searchButton=Go" target="_blank">Visual Studio</a> non mi permetteva di aprire un sito presente sul mio IIS locale. La cosa curiosa è che il sito era lì da mesi e che è sempre funzionato alla grande.     <br />Il messaggio di feedback fornito dal tool lasciava poco spazio all’immaginazione:</p>  <blockquote>   <p>Unable to open the Web site 'http://localhost:8008'. To access local IIS Web sites, you must install the following IIS components: </p>    <p>In addition, you must run Visual Studio in the context of an administrator account. </p>    <p>For more information, press F1.</p> </blockquote>  <p>e la finestra era piuttosto inquietante, come mostrato dallo screenshot seguente:</p>  <p><a href="http://imperugo.tostring.it/Content/Uploaded/image/86f7ea8c-8c4c-4f1c-a28a-1bddd94548fe.png" rel="shadowbox"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="VS-IIS-Problem" border="0" alt="VS-IIS-Problem" src="http://imperugo.tostring.it/Content/Uploaded/image/15ac8790-5101-446c-a569-56fd0c134290.png" width="244" height="135" /></a> </p>  <p>Ovviamente <a title="Search Visual Studio" href="http://imperugo.tostring.it/blog/search?q=Visual+Studio&amp;searchButton=Go" target="_blank">Visual Studio</a> era in esecuzione con privilegi amministrativi, e tutti i componenti necessari erano installati e funzionanti; di fatto fino poche ore prima tutto funzionava egregiamente.</p>  <p>Dopo qualche “sbingata” ed una letta all’Event Viewer di sistema, sono arrivato alla conclusione che il metabase di IIS per qualche motivo si era corrotto. La cosa curiosa è che se richiedevo il sito tramite il browser questo era visualizzato correttamente e navigabile al 100%, ma di “debuggarlo” con Visual Studio non c’era storia.    <br />Soluzoine? Rimuovere il sito da IIS e ricostruirlo :)</p>  <p>Ciauz</p>
