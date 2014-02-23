---
layout: post
status: publish
published: true
title: I Bundle di ASP.NET MVC 4
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1417
wordpress_url: http://imperugo.tostring.it/blog/post/i-bundle-di-asp.net-mvc-4/
date: 2012-04-17 17:00:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- Ottimizzazione
- Beta
comments: true
---
L’ultima release (attualmente in beta) di <a title="ASP.NET MVC" href="http://tostring.it/tags/archive/mvc">ASP.NET MVC</a>, di cui abbiamo visto alcune novità <a title="What's new in Razor" href="http://tostring.it/blog/post/whats-new-in-razor-v2/" target="_blank">qui</a> e <a title="Il tilde in Razor" href="http://tostring.it/blog/post/whats-new-in-razor-v2/" target="_blank">qui</a>, introduce veramente molte feature interessanti, una delle quali è rappresentata dai Bundle.
Ormai noi tutti conosciamo l’importanza di ridurre al minimo il numero di richieste dal client verso il server. Quando parliamo di riduzione delle richieste, includiamo un po’ tutto: dai fogli di stile, ai javascript, e magari anche i dati tramite l’utilizzo di AJAX.

Per i primi due viene utilizzata la tecnica del “combine” e “minify” di più file in un’unica richiesta. Questo approccio consiste nel raggruppare tutti i files dello stesso tipo in un unico file, e nel rimuovere tutti gli spazi e commenti non necessari.

Tradotto in soldoni, tutte queste richieste che abbiamo nella pagina :

[xml]
&lt;script src=&quot;/Scripts/jquery-1.6.2.min.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;/Scripts/jquery-ui-1.8.11.min.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;/Scripts/jquery.validate.min.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;/Scripts/jquery.validate.unobtrusive.min.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;/Scripts/knockout-2.0.0.js&quot;&gt;&lt;/script&gt;
[/xml]

Diventano una sola
{% highlight xml %}
<script src="/Scripts/combined.js"></script>
{% endhighlight %}
Ovviamente lavorare con un file unico, che sia questo un file javascript o css, risulta un po’ scomodo e, proprio per questo motivo, esistono diversi tool/framework che agevolano la creazione di un unico file a runtime o compile time.

Con ASP.NET MVC 4 effettuare il “combine” e “minify” è veramente semplice: basta utilizzare un apposito metodo ed il gioco è fatto.

Guardiamo il seguente codice:

[xml]
&lt;link href=&quot;@System.Web.Optimization.BundleTable.Bundles.ResolveBundleUrl(&quot;~/Content/css&quot;)&quot; rel=&quot;stylesheet&quot; type=&quot;text/css&quot; /&gt;
&lt;script src=&quot;@System.Web.Optimization.BundleTable.Bundles.ResolveBundleUrl(&quot;~/Scripts/js&quot;)&quot;&gt;&lt;/script&gt;[/xml]

È importante sapere che non tutti i files presenti nella folder specificata saranno inclusi nell’output del file, ma bensì solo quelli registrati nel bundle. In un prossimo post vedremo come creare bundle custom in modo da includere differenti file in differenti folder.

Stay tuned!
