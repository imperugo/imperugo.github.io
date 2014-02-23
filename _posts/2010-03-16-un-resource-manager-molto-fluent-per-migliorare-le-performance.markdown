---
layout: post
status: publish
published: true
title: Un Resource Manager molto fluent per migliorare le performance
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1510
wordpress_url: http://imperugo.tostring.it/blog/post/resource-manager-molto-fluent-migliorare-le-performance/
date: 2010-03-16 16:53:00.000000000 +00:00
categories:
- ASP.NET
tags:
- MVC
- Ottimizzazione
- Performances
- Dexter
comments: true
---
<p>Ormai, al giorno d’oggi, se non si sviluppa un qualcosa che offra un utilizzo Fluent allora vuol dire che il codice non è figo :D. Ovviamene in <a title="Dexter Blog Engine" href="http://dexterblogengine.codeplex.com/" rel="nofollow" target="_blank">Dexter</a> non potevamo rimanere indietro, per cui, per seguire questa “moda”, ho deciso di sviluppare un Resource Manager per effettuare il combine ed il minifier dei <a href="http://en.wikipedia.org/wiki/Javascript_" rel="nofollow" target="_blank">javascript</a> e dei css.</p>  <p>Proprio osservando la mia skin mi rendo conto di avere un numero piuttosto alto di includes al suo interno (css del sito, css del codehightlither, shadowbox, etc), e la stessa cosa vale per i js (in realtà sono anche di più dei css). Già in passato (vedi qui) avevo parlato dei vantaggi che si hanno nel ridurre al minimo le chiamate del browser verso il client, ma purtroppo l’approccio mostrato in quel post non era utilizzabile in <a title="ASP.NET" href="http://imperugo.tostring.it/categories/archive/ASP.NET" target="_blank"></a><a title="ASP.NET MVC" href="http://imperugo.tostring.it/Categories/Archive/MVC" target="_blank">ASP.NET MVC</a>.</a></p>  <p>Il goal che mi ero proposto era creare un qualcosa di molto semplice che permettesse di accorpare il numero di files js/css in un unico file e di restituire quest’ultimo effettuando un minify (quindi rimuovendo gli spazi inutili), mettendo in cache il riusultato, con dipendenza sui files in uso.</p>  <p>Ovviamente mi sono dovuto munire di alcuni strumenti che mi rendessero più agevoli alcune operazioni come il minify. Su consiglio di <a href="http://www.primordialcode.com" rel="nofollow friend co-worker colleague" target="_new">Alessandro</a>, ho deciso di appoggiarmi alla libreria offerta da Yahoo, che svolge il suo lavoro egregiamente. Per il resto, con un paio di handlers, alcune interfacce, una classe ed alcuni extension methods ho raggiunto questo risultato:</p>  {% raw %}<pre class="brush: xml; ruler: true;">&lt;%= ResourceManager.Js()
        .Combine()
        .Minify()
        .Add(SkinJs(&quot;codeHighlither/shCore.js&quot;))
        .Add(SkinJs(&quot;codeHighlither/shBrushCSharp.js&quot;))
        .Add(SkinJs(&quot;codeHighlither/shBrushXml.js&quot;))
        .Add(SkinJs(&quot;XFNHighlighter.js&quot;))
        .Add(SkinJs(&quot;jquery.cookie.js&quot;))
        .Add(SkinJs(&quot;jquery.highlight-3.yui.js&quot;))
        .Add(SkinJs(&quot;customFunction.js&quot;))
        .Add(SkinJs(&quot;xVal.jquery.validate.js&quot;))
        .Add(SkinJs(&quot;shadowbox.js&quot;))
        .Render()
%&gt;

&lt;%= ResourceManager.Css()
        .Combine()
        .Minify()
        .Add(SkinCss(&quot;Site.css&quot;))
        .Add(SkinCss(&quot;XFNHighlighter.css&quot;))
        .Add(SkinCss(&quot;shCore.css&quot;))
        .Add(SkinCss(&quot;shThemeDefault.css&quot;))
        .Add(SkinCss(&quot;shadowbox.css&quot;))
        .Add(SkinCss(&quot;CodeSnippets.css&quot;))
        .Render()
%&gt;</pre>{% endraw %}

<p>A pagina renderizzata si ha una chiamata all’handler in cui i files da comprimere vengono passati in querystring (ho dovuto comprimere il risultato per evitare di eccedere nella lunghezza massima utilizzabile da una querystring), che svolgerà il resto del lavoro.</p>

<p>La cosa che mi è piaciuta di più è che, con questa classe, anche se non si vuole effettuare né il combine né il minify, quindi renderizzare i semplici tag per i css e js come nelle normali pagine, il risultato è più comodo e veloce; di fatto il seguente snippet:</p>

{% raw %}<pre class="brush: xml; ruler: true;">&lt;%= ResourceManager.Js()
        .DoNotCombine()
        .DoNotMinify()
        .Add(SkinJs(&quot;codeHighlither/shCore.js&quot;))
        .Add(SkinJs(&quot;codeHighlither/shBrushCSharp.js&quot;))
        .Render()
%&gt;</pre>{% endraw %}

<p>renderizza il seguente markup:</p>

{% raw %}<pre class="brush: xml; ruler: true;">&lt;script src=&quot;/codeHighlither/shCore.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;/codeHighlither/shBrushCSharp.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;</pre>{% endraw %}

<p>Giusto per aggiungere un po’ di numeri al post, nella mia skin sono riuscito ad accorpare 9 files javascript in un un’unico file, riducendo il peso da 79kb a 60kb; inoltre, accorpando 6 files css, ho ottenuto una riduzione quasi del 30% (53kb contro i 38kb del minify).</p>

<p>Un paio di screenshot per mostrare il fantaggio tratto da tale approccio.</p>

<p><a href="http://tostring.it/Content/Uploaded/image//imperugo/notCombined_2.png" rel="shadowbox[mvcConboJSMinify]"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="notCombined" border="0" alt="notCombined" src="http://tostring.it/Content/Uploaded/image//imperugo/notCombined_thumb.png" width="324" height="85" /></a> </p>

<p><a href="http://tostring.it/Content/Uploaded/image//imperugo/Combined_2.png" rel="shadowbox[mvcConboJSMinify]"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="Combined" border="0" alt="Combined" src="http://tostring.it/Content/Uploaded/image//imperugo/Combined_thumb.png" width="324" height="53" /></a> </p>

<p>A breve il codice sorgente sia dell’interfaccia fluent che degli httphandler per il minify.</p>

<p>Stay tuned.</p>
