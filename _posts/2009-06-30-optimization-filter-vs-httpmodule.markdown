---
layout: post
status: publish
published: true
title: Optimization Filter vs HttpModule
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1609
wordpress_url: http://imperugo.tostring.it/blog/post/optimization-filter-vs-httpmodule/
date: 2009-06-30 07:10:26.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- Ottimizzazione
- OutputCache
- ASP.NET
- HttpModule
- ActionResult
comments: true
---
<p>Diverse persone mi hanno chiesto il perchè, in questo <a href="http://imperugo.tostring.it/Blog/Post/Realizzare-un-ActionFilter-per-ottimizzare-le-nostre-pagine-web" target="_blank">post</a>, ho deciso di utilizzare un <a href="http://msdn.microsoft.com/en-us/library/dd410209.aspx" rel="nofollow" target="_blank">ActionFilter</a> al posto di un <a href="http://msdn.microsoft.com/en-us/library/zec9k340(VS.71).aspx" rel="nofollow" target="_blank">HttpModule</a> per “pulire” il markup generato da tutti gli spazi vuoti inutili, in modo da ottimizzare banda.     <br />Le motivazioni sono piuttosto semplici: Versatilità e Performance.</p>  <p>Un ActionFilter mi permette di decidere con estrema flessibilità quali <strong>Actions</strong> devono far uso di ottimizzazione e quali no; procedura che sarebbe molto più scomoda e difficile da gestire con un <strong>HttpModule</strong>.     <br />Inoltre quest’ultimo verrebbe invocato anche quando la <strong>Action</strong> del <strong>Controller</strong> fa uso dell’<strong>OutputCache</strong>, eseguendo così delle operazioni inutilmente.     <br />Di fatto, in una situazione come la seguente, la parte di ottimizzazzione viene invocata solo una volta per tutta la durata impostata nell’attributo OutputCache che aggiunge in memoria il markup già ottimizzato, cosa non fattibile con un HttpModule.</p>  {% raw %}<pre class="brush: csharp; ruler: true;">[OutputCache(Duration = 10000,VaryByParam = &quot;None&quot;)]
[OptimizationFilter(Compress = true,RemoveWhiteSpace = true)]
public ActionResult Index()
{
//.....
}</pre>{% endraw %}

<p>Ciauz</p>
