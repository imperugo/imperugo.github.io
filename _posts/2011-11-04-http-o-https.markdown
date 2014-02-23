---
layout: post
status: publish
published: true
title: http o https?
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1424
wordpress_url: http://imperugo.tostring.it/blog/post/http-o-https/
date: 2011-11-04 17:15:00.000000000 +00:00
categories:
- Web Dev
tags:
- Risorse
- HTML
comments: true
---
<p>Quando ci troviamo a navigare pagine web con connessione protetta - e per connessione protetta intendo tramite il protocollo https - ed alcune delle sue risorse (immagini, javascript, css, etc) non puntano ad un indirizzo sicuro, rischiamo di avere una fastidiosa notifica da parte del browser che ci obbliga a dare il consenso per mostrare i contenuti non sicuri.</p>  <p>Diamo un occhio all’html seguente per capire meglio di cosa stiamo parlando:</p>  {% highlight xml %}
    
    
    
    <meta name="description" content="" />
    <meta name="author" content="" />
    <link rel="stylesheet" href="http://mysite.com/css/mystyle.css" />
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="http://mysite.com/js/libs/modernizr-1.7.min.js?v=1.5.0.21"></script>
{% endhighlight %}
<p>Finché navighiamo la pagina sopra in http non c’è nessun problema ma, se proviamo ad aprire la stessa pagina in https, un buon browser dovrebbe notificarci il rischio a cui andiamo incontro (sia il css, sia jquery puntano ad una connessione http e non https). 
  <br />Per evitare il problema ci basta cambiare le url da http://.... ad https://..... nel caso la connessione corrente sia in https, e viceversa. 

  <br />Ovviamente questo cambio deve essere automatico e, riempire il codice di html di <strong><em>if</em></strong> che cambiano il protocollo, non è la soluzione corretta!</p>

<p>Fortunatamente esiste un rimedio più semplice e pulito che consiste nella rimozione dall’url della parte relativa al tipo di protocollo; quindi dobbiamo rimuovere <strong><em>http:</em></strong> o <strong><em>https:</em></strong> e lasciare semplicemente il <strong><em>//</em></strong> come mostrato di seguito.</p>

[xml]
    &lt;meta name=&quot;description&quot; content=&quot;&quot; /&gt;
    &lt;meta name=&quot;author&quot; content=&quot;&quot; /&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;//mysite.com/css/mystyle.css&quot; /&gt;
    &lt;script src=&quot;//ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
    &lt;script type=&quot;text/javascript&quot; src=&quot;//mysite.com/js/libs/modernizr-1.7.min.js?v=1.5.0.21&quot;&gt;&lt;/script&gt;
[/xml]

<p>A questo punto sarà il browser a “switchare” in automatico dalla connessione <strong><em>http/https</em></strong> in base a quella corrente.</p>

<p>Questa tecnica prende il nome di “<strong>network-path reference</strong>” (maggiori info <a title="Relative Reference RFC 3986" href="http://tools.ietf.org/html/rfc3986#section-4.2" rel="nofollow" target="_blank">qui</a>) e funziona anche per i css, come potete vedere sotto:</p>

[css].mycssclass { background: url(//mysite.com/myimage.jpg); }[/css]

<p>Inoltre questo approccio funziona egregiamente con tutti i browser, tranne che con Internet Explorer 7 e 8 dove, solo per i tag <link />o @import, il download della risorsa avviene due volte (maggiori info <a title="5a Missing schema double download" href="http://www.stevesouders.com/blog/2010/02/10/5a-missing-schema-double-download/" rel="nofollow" target="_blank">qui</a>).</p>

<p>Figo no?</p>
