---
layout: post
status: publish
published: true
title: 'SparkViewEngine: If, else, elseif'
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1481
wordpress_url: http://imperugo.tostring.it/blog/post/sparkviewengine-conditional_elements_if_else_elseif/
date: 2010-07-07 16:45:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- ViewEngine
- SparkViewEngine
comments: true
---
<p>Una delle cose che trovo più belle di Spark è la possibilità di ridurre, a volte anche dimezzare, il numero di righe di codice presenti all’interno delle nostre View. </p>  <p>Fortunatamente con MVC molta della logica non esiste più, a parte quella riguardante la visualizzazione o meno di un blocco di html, il cambiamento di un css in base ad una condizione, oppure l’iterazione di una collection; in soldoni non dovremmo avere molto codice all’interno se non delle if/else, dei for.</p>  <p>Supponiamo di avere un codice come il seguente:</p>  {% raw %}<pre class="brush: xml;">&lt;%if (Model.RecentPost.Count &gt; 0){%&gt;
&lt;li&gt;
   something
&lt;/li&gt;
&lt;%}%&gt;</pre>{% endraw %}

<p>in Spark possiamo rimuovere due righe, la prima di apertura della if e quella di chiusura, impostando la condizione direttamente nell’attributo del tag da mostrare, come da snippet seguente:</p>

{% raw %}<pre class="brush: xml;">&lt;li if=&quot;Model.RecentPost.Count &gt; 0&quot;&gt;
    something<br />&lt;/li&gt;</pre>{% endraw %}

<p>Ovviamente, se la if non deve racchiudere un solo tag ma più blocchi di tag non annidati, si può utilizzare l’apposita sintassi di Spark che, come potete vedere dall’esempio seguente, è molto simile al codice HTML:</p>

{% raw %}<pre class="brush: xml;">&lt;if confition=&quot;Model.RecentPost.Count &gt; 0&quot;&gt;
    &lt;li&gt;something&lt;/li&gt;
    &lt;li&gt;something 1&lt;/li&gt;
    &lt;li&gt;something 2&lt;/li&gt;
&lt;/if&gt;</pre>{% endraw %}

<p>Anche le altre condizioni else ed elseif funzionano allo stesso modo:</p>

{% raw %}<pre class="brush: xml;">&lt;li if=&quot;Model.RecentPost.Count &gt; 0&quot;&gt;something&lt;/li&gt;
&lt;li elseif=&quot;Model.RecentPost.Count == 0&quot;&gt;something 1&lt;/li&gt;
&lt;else&gt;
    &lt;li&gt;something 2&lt;/li&gt;
&lt;/else&gt;</pre>{% endraw %}

<p>Oppure:</p>

{% raw %}<pre class="brush: xml;">&lt;if condition=&quot;Model.RecentPost.Count &gt; 0&quot;&gt;
   &lt;li&gt;something&lt;/li&gt;
&lt;/if&gt;
&lt;else if=&quot;Model.RecentPost.Count == 0&quot;&gt;
  &lt;li&gt;something 2&lt;/li&gt;
&lt;/else&gt;
&lt;else&gt;
  &lt;li&gt;something 3&lt;/li&gt;
&lt;/else&gt;</pre>{% endraw %}

<p>Enjoy Spark</p>
