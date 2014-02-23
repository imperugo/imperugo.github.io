---
layout: post
status: publish
published: true
title: TFS, i Power Tools ed il Team Explorer
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1524
wordpress_url: http://imperugo.tostring.it/blog/post/tfs-i-power-tools-ed-il-team-explorer/
date: 2010-01-28 17:38:30.000000000 +00:00
categories:
- .NET
tags:
- Visual Studio
- PowerTools
- TeamEplorer
- TFS
comments: true
---
<p>
	Primo post su <strong>TFS</strong>, <strong>TeamExplorer</strong> e <strong>famigghia</strong>. <br />
	Questo non &egrave; un cambio di genere e non ho intenzione (anche perch&egrave; sarebbe impossibile) fare &ldquo;concorrenza&rdquo; al buon <a href="http://www.codewrecks.com/blog/index.php" rel="nofollow friend met co-worker colleague" target="_new">Gian Maria</a> ed al buon <a href="http://geniodelmale.info/" rel="nofollow friend met colleague" target="_new">Lorenzo</a>; molto probabilmente quello che andrete a leggere lo avranno gi&agrave; mostrato, spiegato, decompilato e riscritto loro parecchia anni fa, sta di fatto che lo scrivo lo stesso xch&egrave; a qualcuno potrebbe essere sfuggito (tipo a me).</p>
<p>
	Ormai sono un paio di anni che uso Team Foundation Server in azienda insieme a <a href="http://imperugo.tostring.it/blog/search?q=Visual+Studio&amp;searchButton=Go" target="_blank" title="Search Visual Studio">Visual Studio</a> e al Team Explorer. Lavorando quotidianamente con lo stesso server all&rsquo;interno della stessa rete, non ho mai avuto nessun problema con il fatto che il Team Eplorer cerchi di connettersi all&rsquo;ultimo TFS utilizzato ogni volta che si avvia <a href="http://imperugo.tostring.it/blog/search?q=Visual+Studio&amp;searchButton=Go" target="_blank" title="Search Visual Studio">Visual Studio</a>. <br />
	Ultimamente per&ograve; il mio lavoro &egrave; un po&rsquo; cambiato, e mi trovo a dovermi connettere a diversi TFS sparsi per il mondo e, in casi ancora peggiori, mi ritrovo senza connessione. Queste situazioni vanno di parecchio in conflitto con la feature precedentemente descritta (l&rsquo;autocollegamento a TFS durante l&rsquo;avvio di Visual Studio), quindi mi sono deciso a fare una ricerca in rete per capire come risolvere il problema.</p>
<p>
	Neanche a dirlo gi&agrave; milioni di persone avevano bloggato il problema e mostrato una soluzione, che consiste nel modificare il registro di configurazione di Windows (maggiori info <a href="http://msmvps.com/blogs/vstsblog/archive/2009/06/29/disable-auto-connect-to-tfs-on-vs-startup.aspx" rel="nofollow" target="_blank" title="Disable auto-connect to TFS on VS startup">qui</a>).</p>
<p>
	Soluzione questa sicuramente funzionante e di semplice implementazione. Ma ne esiste una ancor pi&ugrave; carina ed elegate.</p>
<p>
	I ragazzi del team dei <strong>PowerTools</strong> hanno pensato di fare una comodissima UI per cambiare quest&rsquo;impostazione. Di fatto, una volta installati i <strong>PowerTools</strong> (che trovate <a href="http://msdn.microsoft.com/en-us/teamsystem/bb980963.aspx" rel="nofollow" target="_blank" title="Team Foundation Server Power Tools">qui</a>), ci basta digitare il comando seguente dal prompt del DOS:</p>
<blockquote>
	<p>
		<strong><em>tfpt tweakui</em></strong></p>
</blockquote>
<p>
	a questo punto dovrebbe aprirsi una finestra, come quella mostrata di seguito, che ci permette di disabilitare questa opzione.</p>
<p>
	<a href="http://imperugo.tostring.it/Content/Uploaded/image//imperugo/90646082-6b47-44c6-9b0d-ab403e042f1a.png" rel="shadowbox"><img alt="image" border="0" height="244" src="http://imperugo.tostring.it/Content/Uploaded/image//imperugo/b2ab2b32-139b-443a-80ae-6335c402e9e2.png" style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" width="210" /></a></p>
<p>
	Ciauz</p>
