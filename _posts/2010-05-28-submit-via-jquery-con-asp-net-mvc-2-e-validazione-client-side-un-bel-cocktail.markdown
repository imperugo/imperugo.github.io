---
layout: post
status: publish
published: true
title: Submit via jQuery con ASP.NET MVC 2 e Validazione Client Side, un bel cocktail
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1490
wordpress_url: http://imperugo.tostring.it/blog/post/submit-via-jquery-con-aspnetmvc-2-e-validazione-client-side-un-bel-cocktail/
date: 2010-05-28 16:45:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- JQuery
- Various
comments: true
---
<p>Ultimamente sto facendo parecchio uso <a title="ASP.NET MVC Search" href="http://www.imperugo.tostring.it/tags/archive/mvc" target="_blank">ASP.NET MVC</a> 2, più precisamente mi sto occupando della parte di markup, jQuery ed input di dati; di fatto in un <a title="Validazione Client-Side su ASP.NET MVC 2 con jQuery" href="http://tostring.it/blog/post/validazione-client-side-su-aspnet-mvc-2-con-jquery" target="_blank">post</a> precedente avevo spiegato come era possibile sfruttare <a title="jQuery" href="http://tostring.it/Tags/Archive/JQuery" target="_blank">jQuery</a> e le DataAnnotations per validare dei dati sul client.    <br />    <br />Quanto detto precedentemente funziona perfettamente nel caso in cui l’oggetto che effettuerà il submit della <strong><em>&lt;form&gt;</em></strong> sarà un input type, al contrario se si ha la necessità di invocare il submit tramite un’immagine o un link è necessario a ricorrere al javascript.    <br />Purtroppo se si invoca il classico metodo <strong><em>submit()</em></strong> per invocare l’action della form, non viene invocata la validazione (questo a prescindere dal fatto che si usi o no jQuery per validare la form) e di conseguenza il controllo dei dati di input avverrebbe totalmente lato server.</p>  <p>Il problema è facilmente aggirabile e consiste nell’invocare via javascript la validzione associata alla form e, nel caso questa venga superata, si può invocare il <strong><em>submit()</em></strong> sopracitato.    <br />Lo script seguente mostra come fare:</p>  {% highlight xml %}
<div id="submitbox" class="left">
    <span class="button submit">
        <a href="javascript:if($('#myForm').validate().form())$('#myForm').submit();" title="Submit form">
            <span>Submit form</span>
        </a>
    </span>
</div>
{% endhighlight %}
<p>byez</p>

<p>.u</p>
