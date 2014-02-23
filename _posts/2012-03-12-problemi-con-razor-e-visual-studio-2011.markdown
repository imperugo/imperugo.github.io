---
layout: post
status: publish
published: true
title: Problemi con Razor e Visual Studio 2011
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1422
wordpress_url: http://imperugo.tostring.it/blog/post/problemi-con-razor-e-visual-studio-2011/
date: 2012-03-12 17:05:00.000000000 +00:00
categories:
- ASP.NET
tags:
- MVC
- Razor
- Visual Studio
- ASP.NET
comments: true
---
<p>Chi come me si sta divertendo nel testare <a title="ASP.NET MVC" href="http://tostring.it/tags/archive/mvc" target="_blank">ASP.NET MVC</a> 4 e lo sta facendo con <a title="Visual Studio" href="http://tostring.it/tags/archive/visual+studio" target="_blank">Visual Studio</a> 2011, avrà sicuramento riscontrato dei problemi di stabilità da parte dell’editor Razor che causa continui freeze della UI.</p>  <p>Tale problema non si verifica ogni qualvolta si cerca di editare una view realizzata con Razor, ma quando si cerca di indentare il codice HTML.    <br />Inizialmente avevo attribuito il problema a Resharper, in quanto la versione installata è una super preview ma, una volta disinstallato quest’ultimo, ho notato che il problema persisteva e a quel punto è scattato il piano B: Google.</p>  <p>A primo colpo ecco la soluzione:</p>  <p>Basta andare su <strong>Tools</strong> =&gt; <strong>Options</strong> =&gt; <strong>Text Editor</strong> =&gt; <strong>HTML</strong> =&gt; <strong>Tab</strong> ed impostare l’indenting option su <strong>Smart</strong>.</p>  <p>A questo punto Visual Studio torna a funzionare senza particolari crash e con Resharper J</p>  <p>Fonte: <a href="http://blogs.msdn.com/b/webdevtools/archive/2012/03/06/visual-studio-11-beta-razor-editor-issue-workaround.aspx">http://blogs.msdn.com/b/webdevtools/archive/2012/03/06/visual-studio-11-beta-razor-editor-issue-workaround.aspx</a></p>
