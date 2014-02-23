---
layout: post
status: publish
published: true
title: Io, il GDI+ e il pocket pc
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1660
wordpress_url: http://imperugo.tostring.it/blog/post/io-il-gdi-e-il-pocket-pc/
date: 2006-06-10 01:00:00.000000000 +01:00
categories:
- .NET
tags:
- Mobile
- WinForm
- .NET
- Compact Framework
- GDI
comments: true
---
<p><span>Che fanno insieme io, il GDI+ del Compact Framework e un Pocket Pc rinchiusi in una stanza per due giorni?? </span></p>
<p>Beh creiamo componenti !!!!<br />
A parte gli scherzi, come detto in un precedente <a onclick="blankUrl(this.href); return false;" href="http://blogs.aspitalia.com/imperugo/post1607/Settimana-Lavoro-Problemi.aspx">post</a>, ultimamente mi trovo a dover realizzare un sofware su pocket pc, che esegue dei calcoli e mostra dei dati a video. <br />
Ora il problema principale del software &egrave; l'interfaccia grafica che era bruttina, causa i &quot;poveri&quot; componenti per pocket pc presenti nel framework.</p>
<p>Sbirciando in rete, non &egrave; che ci siano molte ditte che vendono componenti per pocket pc e quelle poche che lo fanno, non hanno grandi prodotti, almeno per le mie esigenze; di conseguenza mi sono dovuto armare nel crearmi componenti custom per le mie esigenze.</p>
<p>Beh pensavo fosse molto pi&ugrave; difficile mentre la parte del framework che riguarda il GDI+ &egrave; molto potente e ben sviluppata, per ultimo, ma non meno importante, &egrave; facile da usare :-).</p>
<p>I componenti creati sono stati 3 diversi tipi di grafici, i pulsanti sfumati e i panel sfumati.<br />
Per i pulsanti ho creato l'opzione di poter inserire un immagine e di selezionare il colore per &quot;sfondarla&quot; per creargli la trasparenza. Ovviamente per avere un buon risultato bisogna preparare bene le immagini (non come ho fatto io).<br />
Tutti i componenti sono parametrizzati e i loro valori sono quasi tutti gestibili dalla finestra delle propriet&agrave; di Visual Studio, senza avere la necessit&agrave; di far scrivere del codice all'utilizzatore.</p>
<p>I&nbsp;risultati li vedete sotto con delle parti un po' sfocate per tutelare il cliente.</p>
<p><img width="244" height="400" alt="" src="/content/Uploaded/image/grafici_0.jpg" /></p>
<p>C'&egrave; anche con il grafico a barre</p>
<p><img width="355" height="278" alt="" src="/content/Uploaded/image/grafici2.jpg" /><span class="Apple-style-span" style="color: rgb(0, 0, 238); text-decoration: underline;"><br />
</span></p>
<p>Sono tutti in fase di ultimazione per poter supportare le diverse <a href="http://blogs.aspitalia.com/imperugo/post1607/Settimana-Lavoro-Problemi.aspx">risoluzioni</a> dei palmari disponibili, ma sembra che funzionino :)</p>
<p>Personalmente ritengo che il Compact Framework &egrave; ancora un po &quot;povero&quot; (per far certe cose bisogna ingegnarsi un po') per&ograve; la strada &egrave; sicuramente quella buona e di materiale in rete se ne trova parecchio.</p>
<p>Ovviamente consigli e critiche sono ben accette. !!!</p>
<p>&nbsp;</p>
