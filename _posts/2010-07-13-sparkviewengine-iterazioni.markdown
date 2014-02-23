---
layout: post
status: publish
published: true
title: 'SparkViewEngine: Iterazioni'
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1478
wordpress_url: http://imperugo.tostring.it/blog/post/sparkviewengine-iterazioni/
date: 2010-07-13 16:30:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- ViewEngine
- SparkViewEngine
comments: true
---
<p>Nel post <a title="SparkViewEngine: If, else, elseif" href="http://tostring.it/blog/post/sparkviewengine-conditional_elements_if_else_elseif" target="_blank">precedente</a> ho mostrato come è possibile ridurre il numero di righe di codice presenti all’interno della skin quando ci si trova a dover gestire dei blocchi di if per la visualizzazione di porzioni di Html. Ovviamente all’interno delle nostre Views non ci troviamo soltanto ad utilizzare i vari if/elseif/else, ma sicuramente andremo a creare delle iterazioni che ci permettono di mostrare un set di contenuti, come potrebbe essere l’elenco delle ultime news.</p>  <p>L’approccio è lo stesso, ed in questi due blocchi di codice (engine classic e spark) possiamo notare come è possibile evitare la sintassi di apertura e di chiusura del ciclo:</p>  {% raw %}<pre class="brush: xml;">&lt;%for (int i = 0; i &lt; Model.Categories.Count; i++){%&gt;
    &lt;li class=&quot;category&quot;&gt;
        &lt;%= Model.Categories[i].Name%&gt;
    &lt;/li&gt;
&lt;%}%&gt;</pre>{% endraw %}

{% raw %}<pre class="brush: xml;">&lt;li class=&quot;category&quot; each=&quot;var Category in Model.Categories&quot;&gt;
    ${Category.Name}
&lt;/li&gt;</pre>{% endraw %}

<p>Ovviamente volendo è possibile usare una sintassi leggermente differente, e quindi senza l’attributo each per un tag container: in questo caso è sufficiente utilizzare il tag for, come mostrato di seguito:</p>

{% raw %}<pre class="brush: xml;">&lt;for each=&quot;var Category in Model.Categories&quot;&gt;
    &lt;li class=&quot;category&quot;&gt;
        ${Category.Name}
    &lt;/li&gt;
&lt;/for&gt;</pre>{% endraw %}

<p>Come potete vedere in questa situazione, anche se non si ha un vantaggio nel numero di righe scritte, si ha comunque un vantaggio in leggibilità del codice.</p>

<p>Sicuramente in alcuni casì c’è però la necessità di essere a conoscenza dell’esatta posizione in cui ci si trova all’interno del ciclo,&#160; del numero totale di elementi, oppure di sapere se si è all’inizio o alla fine dello stesso: il problema è risolto grazie a Spark, che mette a disposizione, tramite un’apposita name convention, delle proprietà che ci restituiscono queste informazioni, come mostrato di seguito:</p>

{% raw %}<pre class="brush: xml;">&lt;for each=&quot;var Category in Model.Categories&quot;&gt;
    ItemIndex = ${CategoryIndex}
    TotalItems = ${CategoryCount}
    IsFirstItem = ${CategoryIsFirst}
    IsLastItem = ${CategoryIsLast}
&lt;/for&gt;</pre>{% endraw %}

<p>Come potete vedere basta aggiungere in coda all’item corrente (category nell’esempio) un suffisso, il resto lo fa Spark.</p>

<p>Enjoy it.</p>
