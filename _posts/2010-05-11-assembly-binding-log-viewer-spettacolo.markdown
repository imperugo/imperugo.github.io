---
layout: post
status: publish
published: true
title: Assembly Binding Log Viewer (spettacolo).
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1502
wordpress_url: http://imperugo.tostring.it/blog/post/assembly-binding-log-viewer-che-spettacolo/
date: 2010-05-11 14:45:00.000000000 +01:00
categories:
- .NET
tags:
- Visual Studio
- Unit Test
- Tools
comments: true
---
<p>
	Ametto la mia totale ignoranza a riguardo, ma purtroppo ho scoperto solo ieri l&rsquo;esistenza di <a href="http://msdn.microsoft.com/en-us/library/e74a18c4(VS.71).aspx#cpgrffusionlogviewerfuslogvwexeanchor8" rel="nofollow" target="_blank" title="Assembly Binding Log Viewer (Fuslogvw.exe)">questo</a> tool (fighissimo) che mi ha permesso di risolvere un problema in pochi istanti; ma partiamo con ordine.</p>
<p>
	La settimana scorsa mi &egrave; arrivato il portatile aziendale ed ovviamente c&rsquo;&egrave; stata tutta la trafila di installazione di quei tools fondamentali per il lavoro, quindi <a href="http://tostring.it/tags/archive/visual+studio" target="_blank" title="Visual Studio Contents">Visual Studio</a>, Reflector, Sql, etc. <br />
	Forse perch&egrave; lo uso un po&rsquo; meno, per&ograve; ho tralasciato l&rsquo;installazione di <a href="http://tostring.it/tags/archive/visual+studio" target="_blank" title="Visual Studio Contents">Visual Studio</a> 2008 (in azienda siamo su 2010 e per i miei sfoghi tecnologici non uso sicuramente la 2008).</p>
<p>
	Una volta reso abile ed arruolato il pc per lavorare, ho deciso di mettermi a scrivere un po&rsquo; di test: tutti i test che precedentemente andavano hanno deciso di non andare e, dalla test detail view, si poteva notare che il problema era riconducibile ad un&rsquo;assemlby ben precisa &ldquo;<strong>Microsoft.VisualStudio.QualityTools.UnitTestFramework, Version=9.0.0.0</strong>&rdquo;, ed il messaggio di errore era il seguente:</p>
<blockquote>
	<p>
		Test method Dexter.Core.UI.Framework.Test.Services.PostServiceTest.Get_list_with_valid_data_should_raise_post_retrieved_list_event threw exception: <br />
		System.IO.FileNotFoundException: Could not load file or assembly &#39;Microsoft.VisualStudio.QualityTools.UnitTestFramework, Version=9.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a&#39; or one of its dependencies. The system cannot find the file specified.WRN: Assembly binding logging is turned OFF. <br />
		To enable assembly bind failure logging, set the registry value [HKLM\Software\Microsoft\Fusion!EnableLog] (DWORD) to 1. <br />
		Note: There is some performance penalty associated with assembly bind failure logging. <br />
		To turn this feature off, remove the registry value [HKLM\Software\Microsoft\Fusion!EnableLog].</p>
</blockquote>
<p>
	La prima domanda &egrave; stata: come mai c&rsquo;&egrave; qualcosa che sta referenziando la versione 9.0.0.0 dello UnitTestFramework quando tutto il progetto &egrave; su .NET Framework 4.0? Ma sopratutto chi lo stava facendo?</p>
<p>
	Il buon <a href="http://www.codewrecks.com/blog/index.php" rel="nofollow" target="_blank" title="http://www.codewrecks.com/blog/index.php">Gian Maria</a> mi ha indirizzato verso <a href="http://msdn.microsoft.com/en-us/library/e74a18c4(VS.71).aspx#cpgrffusionlogviewerfuslogvwexeanchor8" rel="nofollow" target="_blank" title="Assembly Binding Log Viewer (Fuslogvw.exe)">questo</a> tool (per avviarlo &egrave; sufficiente digitare dal prompt di <a href="http://tostring.it/tags/archive/visual+studio" target="_blank" title="Visual Studio Contents">Visual Studio</a> &ldquo;<strong>fuslogvw&rdquo;</strong>), che permette di abilitare e consultare il Binding Log tramite una UserInterface, senza andare di conseguenza ad agire manualmente sulle chiavi di registro. Di fatto, dopo aver impostato il livello di logging nella finestra dei settings e rieseguito i test, la finestra del tool si &egrave; popolata come da screenshot:</p>
<p>
	<a href="http://tostring.it/Content/Uploaded/image//imperugo/image8.png" rel="shadowbox[Fuslogvw]"><img alt="image" border="0" height="125" src="http://tostring.it/Content/Uploaded/image//imperugo/image8_thumb.png" style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" width="240" /></a></p>
<p>
	La cosa bella &egrave; che facendo doppio click sulla voce interessata all&rsquo;interno della lista viene aperto un ulteriore dettaglio che permette di individuare chi referenzia l&rsquo;assembly mancante.</p>
<p>
	<a href="http://tostring.it/Content/Uploaded/image//imperugo/image_3.png" rel="shadowbox[Fuslogvw]"><img alt="image" border="0" height="165" src="http://tostring.it/Content/Uploaded/image//imperugo/image_thumb_3.png" style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" width="240" /></a></p>
<p>
	&nbsp;</p>
<p>
	&nbsp;</p>
<p>
	In questo caso SharpTestEx.MSTest.</p>
<p>
	Ciauz</p>
