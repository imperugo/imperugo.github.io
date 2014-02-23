---
layout: post
status: publish
published: true
title: Utilizzare un RamDisk per l’esecuzione dei Test
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1554
wordpress_url: http://imperugo.tostring.it/blog/post/utilizzare-un-ramdisk-per-l-and-rsquo-esecuzione-dei-test/
date: 2009-10-14 01:30:00.000000000 +01:00
categories:
- .NET
tags:
- Visual Studio
- Testing
comments: true
---
<p>
	In un paio di post di circa un mesetto fa (li trovate <a href="http://www.nablasoft.com/alkampfer/index.php/2009/08/31/speedup-visual-studio-with-ramdisk/" rel="nofollow" target="_blank" title="Speedup Visual Studio with RAMDIsk">qui</a> e <a href="http://www.nablasoft.com/alkampfer/index.php/2009/09/10/faster-database-test-with-database-in-virtual-disk/" rel="nofollow" target="_blank" title="Faster Database Test With database in Virtual Disk">qui</a>) <a href="http://www.nablasoft.com/alkampfer/" rel="nofollow met colleague" target="_new">Alkampfer</a> aveva mostrato un ottimo tip per migliorare le performances di <a href="http://imperugo.tostring.it/blog/search?q=Visual+Studio&amp;searchButton=Go" target="_blank" title="Search Visual Studio">Visual Studio</a>, spostando i files temporanei della compilazione ed il database di test in un RamDisk.</p>
<p>
	Inutile parlare dell&rsquo;incredibile aumento di performances che si pu&ograve; ottenere con un approccio di questo tipo; prendendo spunto dall&rsquo;idea mostrata da <a href="http://www.nablasoft.com/alkampfer/" rel="nofollow met colleague" target="_new">Alkampfer</a>, ho pensato di fare lo stesso per la parte di testing. <br />
	Proprio oggi ho avuto la necessit&agrave; di eseguire pi&ugrave; volte dalla mia macchina diversi test, alcuni di questi molto onerosi in termini di performances, testing su disco, database, ecc, ed ho notato un certo rallentamento nell&rsquo;esecuzione degli stessi. <br />
	Da qui &egrave; nata l&rsquo;idea di spostare la directory di output dei test, che normalmente si trova nella stessa folder della solution, dal disco fisico al RamDisk, in modo da ridurre al minimo lo swap su disco di tutte quelle informazioni di cui non ho bisogno che rimangano persistite anche dopo il riavvio.</p>
<p>
	Per effettuare ci&ograve; &egrave; necessario andare modificare il file di configurazione <em><strong>LocalTestRun.testrunconfig</strong></em> presente nello stesso percorso della solution ed aggiungere la seguente riga:</p>
{% raw %}<pre class="brush: xml; ruler: true;"><deployment usedefaultdeploymentroot="false" userdeploymentroot="F:\Test Temp\"></deployment></pre>{% endraw %}
<p>
	In questo modo tutte le cartelle contenenti l&rsquo;output dei test verranno create nel RamDisk con un discreto incremento delle performaces.</p>
<p>
	Ciauz</p>
