---
layout: post
status: publish
published: true
title: BLinq (Linq to Bing)
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1575
wordpress_url: http://imperugo.tostring.it/blog/post/blinq-linq-to-bing/
date: 2009-08-23 21:21:50.000000000 +01:00
categories:
- .NET
tags:
- Linq
- Bing
comments: true
---
<p><a href="http://www.nikhilk.net">Nikhil Kothari</a>, tramite il proprio blog, ha annunciato un provider Linq che si appoggia alle ottime API di <a href="http://www.bing.com">Bing</a> per poter effettuare delle ricerche nelle proprie applicazioni.    <br />
Nello specifico le API di <a href="http://www.bing.com">Bing</a> (ulteriori informazioni sono disponibili <a href="http://www.bing.com/developers">qui</a>) permettono di effettuare ricerche anche per tipologie di contenuti, come <strong>Web</strong>, <strong>Images</strong>, <strong>InstantAnswer</strong>, <strong>Phonebook</strong>, <strong>RelatedSearch</strong>, ecc, il tutto in comunicazione con diversi protocolli, <strong>JSON</strong>, <strong>XML</strong> e <strong>SOAP</strong>.</p>
<p>Gli snippet seguenti mostrano la comodit&agrave; di Linq e l&rsquo;integrazione con <a href="http://www.bing.com">Bing</a>.</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
//Pages
BingContext bing = new BingContext(appKey);
IQueryable&lt;PageSearchResult&gt; pagesQuery =
    from p in bing.Pages
    where p.Query == &quot;nikhil&quot;
    select p;

//Pages
IQueryable&lt;PageSearchResult&gt; pagesQuery =
    from p in bing.Pages.LocalResults(&quot;Redmond&quot;)
    where p.Query == &quot;pizza&quot;
    select p;

//Images
IQueryable&lt;ImageSearchResult&gt; imagesQuery =
    from img in bing.Images.SafeResults()
    where img.Query == &quot;Yellowstone&quot;
    select img;
var imagesPage1 = imagesQuery.Take(10).ToList();
var imagesPage2 = imagesQuery.Skip(10).Take(10).ToList();</pre>{% endraw %}
<p>Al momento non tutte le tipologie di ricerche sono supportate dal provider ma, lo stesso <a title="Nikhil Kothari" href="http://www.nikhilk.net" rel="nofollow" target="_blank">Nikhil</a>, fa sapere che nel TODO sono presenti numerose novit&agrave;, come le ricerche correlate, ads, Spell, ecc.  <br />
Non ci resta che provare questa versione ed attendere le novit&agrave; future.</p>
<p>Il download <a href="http://www.nikhilk.net/Content/Posts/BLinq/BLinq.zip">qui</a>.    <br />
Ciauz</p>
