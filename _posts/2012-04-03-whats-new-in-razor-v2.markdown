---
layout: post
status: publish
published: true
title: What’s new in Razor v2
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1420
wordpress_url: http://imperugo.tostring.it/blog/post/whats-new-in-razor-v2/
date: 2012-04-03 17:00:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- Razor
- ViewEngine
comments: true
---
<p>Nel rilascio di <a title="ASP.NET MVC" href="http://tostring.it/tags/archive/mvc">ASP.NET MVC</a> 4 è inclusa anche la nuova release dell’ormai diffusissimo Razor View Engine. Per chi non lo sapesse <a title="Razor&#39;s post" href="http://tostring.it/tags/archive/razor" rel="tag" target="_blank">Razor</a> è un “framework” che offre la possibilità di scrivere il codice presente nelle view con una sintassi differente da quella delle classiche pagine ASP.NET. </p>

<p>Prima di Razor, nel mondo Microsoft, l’utente era abituato ad utilizzare il WebFormViewEngine anche sotto ASP.NET MVC ma, essendo MVC molto orientato al testing, la scelta di creare un’alternativa è quasi d’obbligo.</p>

<p>Di fatto Razor non ha più una dipendenza verso System.Web.UI.Page, e di conseguenza dall’ HttpContext, Web Server (IIS), etc. </p>

<p>Questo permette allo sviluppatore di poter scrivere unit test anche per le View (quanti di voi lo hanno mai fatto?).</p>

<p>Dopo questa premessa sulla storia di Razor, andiamo a vedere cosa offre la nuova release J.</p>

<p>Al momento l’unica novità di rilievo che ho riscontrato è quella che dal team viene chiamata con il nome “Conditional Attribute”, ossia la possibilità di renderizzare o no un determinato attributo, il cui valore è dinamico, e quindi legato ad una variabile.</p>

<p>Per renderla più semplice, diamo un’occhiata al seguente codice:</p>

{% highlight xml %}
<!-- Nome della classe css presa da una variabile -->
<p class="@myCssClass">.....</p>


<!-- markup necessario in caso la variabile sia nulla -->
<p>.....</p>
{% endhighlight %}
<p>Come potete vedere, la variabile myCssClass viene utilizzata per impostare la classe css appunto, in base ad un qualcosa (un evento, un settaggio, etc) gestito server side.</p>

<p>Ma cosa succede se dovete gestire anche la possibilità di non impostare la classe? 
  <br />Precedentemente a Razor V2 l’approccio sarebbe stato più o meno questo:</p>

{% highlight xml %}
@{
    var myCssClass = (bool)ViewBag.IsBol ? "boldClass" : null;
}

@if(myCssClass != null){
    <p class="@myCssClass">@ViewBag.Text</p>
}
else{
    <p>@ViewBag.Text</p>
}
{% endhighlight %}
<p>Al contrario, con la nuova release di Razor, diventa tutto più semplice. Se impostate il valore della variabile myCssClass a null l’attributo non viene renderizzato, in caso contrario si.</p>

{% highlight xml %}
<p class="@myCssClass">@ViewBag.Text</p>
{% endhighlight %}
<p>Bisogna prestare attenzione al fatto che il contenuto string.empty (nel caso di una stringa) renderizza ugualmente l’attributo, quindi solo null impedisce il rendering.</p>

<p>Nel caso di value type tipo il booleano, la situazione non cambia molto. In questo caso il true renderizza l’attributo checked, mentre il false no.</p>

{% highlight xml %}
<!-- codice con -->

@{
    ViewBag.IsBol = true;
}

<input type="checkbox" checked="@ViewBag.IsBol" />
{% endhighlight %}
<p>Razor Rulez!</p>
