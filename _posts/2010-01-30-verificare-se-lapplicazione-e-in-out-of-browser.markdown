---
layout: post
status: publish
published: true
title: Verificare se l’applicazione è in Out Of Browser
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1523
wordpress_url: http://imperugo.tostring.it/blog/post/verificare-se-lapplicazione-e-in-out-of-browser/
date: 2010-01-30 11:48:06.000000000 +00:00
categories:
- SILVERLIGHT
tags:
- OutOfBrowser
- Silverlight
comments: true
---
<p>
	Gi&agrave; da quanto scritto precedentemente (<a href="http://tostring.it/blog/post/life-cycle-di-unapplicazione-out-of-browser-in-silverlight-4-intro" rel="Life cycle di un’applicazione Out Of Browser in Silverlight 4 - Intro" target="_blank">qui</a>) si intuiva l&rsquo;arrivo di una serie di post su <a href="http://imperugo.tostring.it/categories/archive/Silverlight" target="_blank" title="Silverlight">Silverlight</a> 4. Sto infatti studiando la possibilit&agrave; di utilizzo di Silverlight 4 per un&rsquo;applicazione Out Of Browser che rispecchi almeno i requisiti descritti nel precedente post. <br />
	<br />
	Per questo motivo oggi mi trovo a rispondere alla prima domanda: &ldquo;<strong>Come faccio a verificare se l&rsquo;applicazione Silverlight in esecuzione &egrave; in modalit&agrave; OOB&rdquo;?</strong></p>
<p>
	Beh, devo dire che &egrave; veramente semplice. Quando si crea una nuova applicazione Silverlight, al suo interno &egrave; presente un file <strong><em>App.xml</em></strong> che &egrave; il file principale dell&rsquo;applicazione; per effettuare un paragone con il mondo <a href="http://imperugo.tostring.it/categories/archive/ASP.NET" target="_blank" title="ASP.NET">ASP.NET</a> si potrebbe definire il file <strong><em>App.xml</em></strong> un po&rsquo; come il <strong><em>Global.asax</em></strong>. <br />
	<br />
	Questa classe, che eredita da <strong><em>System.Windows.Application</em></strong>, espone la propriet&agrave; <strong><em>IsRunningOutOfBrowser,</em></strong> che &egrave; indispensabile se si vogliono creare interazioni particolari e mostrare oggetti solo in modalit&agrave; OOB; basta quindi accedere alla propriet&agrave;, come mostrato dallo snippet seguente:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">bool isOOB = App.Current.IsRunningOutOfBrowser;</pre>{% endraw %}
<p>
	Un esempio pratico potrebbe essere il semplice pulsante di setup, che dovr&agrave; essere visualizzato soltanto nel caso l&rsquo;applicazione stia girando all&rsquo;interno del browser.</p>
<p>
	Al prossimo giro vedremo come installare un&rsquo;applicazione Silverlight sul client tramite C#.</p>
<p>
	Stay tuned!</p>
