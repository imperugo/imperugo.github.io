---
layout: post
status: publish
published: true
title: Verificare se un’applicazione Silverlight è installata sul client
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1521
wordpress_url: http://imperugo.tostring.it/blog/post/verificare-se-unapplicazione-silverlight-e-installata-sul-client/
date: 2010-02-03 17:00:00.000000000 +00:00
categories:
- SILVERLIGHT
tags:
- OutOfBrowser
- Silverlight
comments: true
---
<p>
	Continuando il percorso iniziato nel post <a href="http://tostring.it/blog/post/verificare-se-lapplicazione-e-in-out-of-browser" target="_blank" title="Welcome Parallel Linq">precedente</a>, oggi vorrei affrontare la parte di setup di un&rsquo;applicazione <a href="http://imperugo.tostring.it/categories/archive/Silverlight" target="_blank" title="Silverlight">Silverlight</a>. <br />
	L&rsquo;installazione pu&ograve; essere effettuata in due modi:</p>
<ul>
	<li>
		Menu contestuale di Silverlight;</li>
	<li>
		Tramite C#;</li>
</ul>
<p>
	Qualsiasi approccio si scelga &egrave; sempre necessario specificare che il progetto pu&ograve; essere installato sul client (di default le applicazioni Silverlight non posso essere installate sul client). Per far ci&ograve; ci basta accedere alle propriet&agrave; del progetto (tasto destro sul progetto &ndash;&gt; propriet&agrave;) ed abilitare la modalit&agrave; OutOfBrowser, come mostrato dallo screenshot seguente:</p>
<p>
	<a href="http://imperugo.tostring.it/Content/Uploaded/image//imperugo/d0398d24-8ef1-4082-8404-249df7c8b9f9.png" rel="shadowbox"><img alt="image" border="0" height="169" src="http://imperugo.tostring.it/Content/Uploaded/image//imperugo/410013ed-6643-4e90-afec-a4501cdeae40.png" style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" width="244" /></a></p>
<p>
	Come in ogni setup che si rispetti, prima &egrave; necessario verificare che l&rsquo;applicazione interessata non sia gi&agrave; installata sul client, e questo &egrave; fattibile tramite l&rsquo;apposita propriet&agrave; <em><strong>InstallState</strong></em> della classe application, come mostrato di seguito:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">if(App.Current.InstallState == InstallState.Installed)
    //TODO:Installed
else
    //TODO:NotInstalled</pre>{% endraw %}
<p>
	&nbsp;</p>
<p>
	Nel prossimo post vedremo cosa scrivere nei TODO per installare l&rsquo;applicazione sul client tramite c#.</p>
<p>
	Stay tuned.</p>
