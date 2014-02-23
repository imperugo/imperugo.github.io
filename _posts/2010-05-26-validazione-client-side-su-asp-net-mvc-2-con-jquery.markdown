---
layout: post
status: publish
published: true
title: Validazione Client-Side su ASP.NET MVC 2 con jQuery
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1493
wordpress_url: http://imperugo.tostring.it/blog/post/validazione-client-side-su-aspnet-mvc-2-con-jquery/
date: 2010-05-26 16:45:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- JQuery
comments: true
---
<p>Ormai ne hanno parlato tutti (me incluso, vedi <a title="ASP.NET MVC 2: Powerful data form" href="http://www.microsoft.com/italy/beit/Msdn.aspx?video=330bfe9b-6e28-479d-9ed3-1cbeeade5915#1" rel="nofollow" target="_blank">qui</a>) di come sfruttare le DataAnnotations per effettuare una validazione client side su <a title="ASP.NET MVC Archive" href="http://www.imperugo.tostring.it/tags/archive/mvc" target="_blank">ASP.NET MVC</a>, ma in tutti gli esempi si fa uso dei files javascript realizzati da Microsoft e presenti nel template di default di ASP.NET MVC.</p>  <p>Purtroppo, o per fortuna, io sono un grandissimo estimatore di jQuery e mi sono subito posto la domanda: “Come faccio a sfruttare le Data Annotations e jQuery per effettuare una validazione ClientSide?”. L’implementazione non dovrebbe essere molto difficile dato che il metodo “Html.EnableClientValidation()” non fa altro che iniettare in pagina il JSon contenente le regole di validazione specificate con le Data Annotations; l’unica cosa che bisogna fare è leggere il Json e, interpretarlo ed infine collegarlo alla form con jQuery.</p>  <p>Per nostra fortuna Microsoft ha già pensato a questa necessità e, se scarichiamo da <a href="http://aspnet.codeplex.com/releases/view/41742">qui</a> MVC Futures, troviamo al suo interno un file javascript che ci permette di utilizzare jQuery Validation con MVC2 a costo zero.</p>  <p>Il file javascript in questione si chiama “<em><strong>MicrosoftMvcJQueryValidation.js</strong></em>” e per utilizzarlo è sufficiente sostituire quello che avremmo fatto normalmente per utilizzare la validazione client side, ossia questo:</p>  {% highlight xml %}
<script src="/Scripts/MicrosoftAjax.js" type="text/javascript"></script> 
<script src="/Scripts/MicrosoftMvcAjax.js" type="text/javascript"></script> 
<script src="/Scripts/MicrosoftMvcValidation.js" type="text/javascript"></script>
{% endhighlight %}
<p>con questo</p>

{% highlight xml %}
<script src="/Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
<script src="/Scripts/jquery.validate.min.js" type="text/javascript"></script>
<script src="/Scripts/MicrosoftMvcJQueryValidation.js" type="text/javascript"></script>
{% endhighlight %}
<p>oppure ancora meglio con questa versione che sfrutta il CDN di Microsoft, con un ovvio vantaggio di performance e risparmio banda:</p>

{% highlight xml %}
<script src="http://ajax.microsoft.com/ajax/jQuery/jquery-1.4.2.min.js" type="text/javascript"></script>
<script src="http://ajax.microsoft.com/ajax/jquery.validate/1.7/jquery.validate.min.js" type="text/javascript"></script>
<script src="/Scripts/MicrosoftMvcJQueryValidation.js" type="text/javascript"></script>
{% endhighlight %}
<p>enjoy jQuery.</p>

<p>.u</p>
