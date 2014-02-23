---
layout: post
status: publish
published: true
title: Configurare Azure Tools su SQL Server
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1461
wordpress_url: http://imperugo.tostring.it/blog/post/configurare-azure-sql-server/
date: 2010-12-15 17:45:00.000000000 +00:00
categories:
- .NET
tags:
- Sql
- Configurazione
- Azure
comments: true
---
<p>Ultimamente sto lavorando parecchio con il cloud computing, ed ho avuto modo di parlarne nello specifico sia ai <strong><a title="TechDays and Azure" href="http://tostring.it/blog/post/23-24-25-novembre-techdayswpc/" target="_blank">TechDays/WPC</a></strong> che in alcuni progetti interni all’azienda. </p>  <p>Non voglio star qui a scrivere di cosa è il cloud e quando vada scelto (magari lo farò in un post futuro), piuttosto vorrei parlare di un piccolo tip riguardante i tools di sviluppo per <strong>Windows Azure</strong>.     <br />Di fatto, se si vuole sviluppare per questa piattaforma, è necessario scaricare (da <a title="Windows Azure tools" href="http://www.microsoft.com/windowsazure/" rel="nofollow" target="_blank">qui</a>) ed installare sulla propria macchina di sviluppo dei tools che permettono di “<em>simulare</em>” in locale l’environment che si avrà in produzione.     <br />Senza andare troppo in profondità, ci basta sapere che i tools di Azure “wrappano” tutte le chiamate verso il client all’interno di un database Sql Server (il che è molto importante, in quanto ci permette di effettuare unit test sulle chiamate con estrema semplicità) che deve essere installato sulla macchina locale; di fatto, se non avete installato Sql sulla macchina e provate a lanciare un qualsiasi <b>worker role</b> o <b>web role,</b> riceverete dal Framework una bellissima eccezione tipo la seguente:</p>  <blockquote>   <p>“Windows Azure Tools: Failed to initialize the Development Storage service. Unable to start Development Storage. Failed to start Development Storage: the SQL Server instance ‘localhost\SQLExpress’ could not be found. Please configure the SQL Server instance for Development Storage using the ‘DSInit’ utility in the Windows Azure SDK.”</p> </blockquote>  <p>Questo accade perchè l’environment locale di Azure cerca di accedere all’istanza di default di SQLExpress che, come nel mio caso, potrebbe non essere installata sulla macchina.</p>  <p>Per chi, come me, ha l’esigenza di sviluppare su Windows Azure Platform e non vuole installare SQL Express sulla propria macchina perchè ha già installato una versione differente di SQL (2008 R2 Developer Edition nel mio caso), può tranquillamente farlo eseguendo con privilegi amministrativi “<strong>Windows Azure SDK Command Prompt</strong>” (lo trovate all’interno del menu programmi), digitando il seguente comando:</p>  <p><strong>DSInit /sqlInstance:. /forceCreate</strong></p>  <p>Ovviamente se si ha un nome d’istanza differente si può sostituire il “.”, che equivale a localhost, con il proprio nome, impostato durante l’installazione di SQL Server.    <br />A questo punto verrà creato un database con tutto il necessario per poter utilizzare i tools di Azure sulla propria macchina, senza dover passare per SQL Express.</p>  <p>Azure rulez!</p>
