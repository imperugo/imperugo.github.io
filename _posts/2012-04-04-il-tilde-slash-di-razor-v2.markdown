---
layout: post
status: publish
published: true
title: Il Tilde Slash di Razor V2
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1419
wordpress_url: http://imperugo.tostring.it/blog/post/il-tilde-slash-di-razor-v2/
date: 2012-04-04 17:00:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- Razor
- ViewEngine
comments: true
---
<p>Su segnalazione del buon <a title="Andrea Balducci" href="https://twitter.com/#!/andreabalducci" rel="nofollow" target="_blank">Andrea</a>, ho scoperto che, oltre ai “<a title="What’s new in Razor v2" href="http://tostring.it/blog/post/whats-new-in-razor-v2/" target="_blank">conditional attributes</a>”, <a title="Razor&#39;s post" href="http://tostring.it/tags/archive/razor" rel="tag" target="_blank">Razor</a> introduce un’altra novità chiamata “<strong>Tilde Slash</strong>” ossia “~/”.</p>

<p>Il concetto è simile a quello espresso in un mio vecchio post su Spark (vedi <a title="Spark View Engine" href="http://tostring.it/blog/post/gestire-le-risorse-con-sparkviewengine/">qui</a>), con la differenza che in <a title="Spark View Engine" href="http://tostring.it/tags/archive/sparkviewengine" target="_blank">Spark</a> si può specificare un dominio differente (molto comodo se si usa CDN).</p>

<p>In ogni caso l’utilizzo del Razor, con il Tilde Slash, aiuta lo sviluppatore nella scrittura del codice prendendosi in carico l’onere di risolvere automaticamente la url, eliminando così le noiose ripetizioni del ResolveUrl.</p>

<p>Dando un occhio al codice, questo markup </p>

{% highlight xml %}
<img src="@Url.Content("~/Content/mylogo.png")" />
{% endhighlight %}
<p>con Razor v2 diventa semplicemente questo</p>

{% highlight xml %}
<img src="~/Content/mylogo.png" />
{% endhighlight %}
<p>Beh comodo no?</p>
