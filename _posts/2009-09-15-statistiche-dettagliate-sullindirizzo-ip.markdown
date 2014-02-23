---
layout: post
status: publish
published: true
title: Statistiche dettagliate sull’indirizzo IP
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1563
wordpress_url: http://imperugo.tostring.it/blog/post/statistiche-dettagliate-sull-and-rsquo-indirizzo-ip/
date: 2009-09-15 14:23:18.000000000 +01:00
categories:
- Various
tags:
- Dexter
comments: true
---
<p>Come ogni vero blogengine, anche <a title="Dexter Blog Engine" href="http://imperugo.tostring.it/About/Dexter" target="_blank">Dexter</a> ha un’apposita sezione per le statistiche dei propri posts. Anche se il BackOffice di Dexter non brilla per estetica e funzionalità, ho deciso di aggiungere un’interessante feature (la vera motivazione è che non avevo voglia di lavorare ad altro), che fornisce informazioni aggiuntive sul visitatore grazie all’IP di provenienza.</p>  <p><a title="GeoBytes" href="http://www.geobytes.com/" rel="nofollow" target="_blank">GeoBytes</a> è un sito che permette di attingere a diverse informazioni dato un’indirizzo IP; offre inoltre la possibilità di sfruttare queste informazioni nelle proprie applicazioni (tramite un’apposita webrequest) .     <br />In pratica è sufficiente interrogare l’indirizzo seguente (ovviamente l’indirizzo IP va cambiato) :     <br /><a href="http://www.geobytes.com/IpLocator.htm?GetLocation&amp;template=php3.txt&amp;IpAddress=93.34.55.138">http://www.geobytes.com/IpLocator.htm?GetLocation&amp;template=php3.txt&amp;IpAddress=93.34.55.138</a></p>  <p>per ottenere un’output come quello mostrato di seguito:</p>  {% raw %}<pre class="brush: xml; ruler: true;">&lt;html&gt; 
&lt;head&gt; 
 
&lt;meta name=&quot;known&quot; content=&quot;true&quot;&gt; 
&lt;meta name=&quot;locationcode&quot; content=&quot;ITLOMILA&quot;&gt; 
&lt;meta name=&quot;fips104&quot; content=&quot;IT&quot;&gt; 
&lt;meta name=&quot;iso2&quot; content=&quot;IT&quot;&gt; 
&lt;meta name=&quot;iso3&quot; content=&quot;ITA&quot;&gt; 
&lt;meta name=&quot;ison&quot; content=&quot;380&quot;&gt; 
&lt;meta name=&quot;internet&quot; content=&quot;IT&quot;&gt; 
&lt;meta name=&quot;countryid&quot; content=&quot;119&quot;&gt; 
&lt;meta name=&quot;country&quot; content=&quot;Italy&quot;&gt; 
&lt;meta name=&quot;regionid&quot; content=&quot;2246&quot;&gt; 
&lt;meta name=&quot;region&quot; content=&quot;Lombardia&quot;&gt; 
&lt;meta name=&quot;regioncode&quot; content=&quot;LO&quot;&gt; 
&lt;meta name=&quot;adm1code&quot; content=&quot;IT09&quot;&gt; 
&lt;meta name=&quot;cityid&quot; content=&quot;11937&quot;&gt; 
&lt;meta name=&quot;city&quot; content=&quot;Milano&quot;&gt; 
&lt;meta name=&quot;latitude&quot; content=&quot;45.4670&quot;&gt; 
&lt;meta name=&quot;longitude&quot; content=&quot;9.2000&quot;&gt; 
&lt;meta name=&quot;timezone&quot; content=&quot;+01:00&quot;&gt; 
&lt;meta name=&quot;certainty&quot; content=&quot;93&quot;&gt; 
 
&lt;title&gt;PHP2 Template&lt;/title&gt; 
&lt;/head&gt; 
&lt;body&gt;&lt;/body&gt; 
&lt;/html&gt; </pre>{% endraw %}

<p>
  <br />

  <br />“Parsando” i dati si può ottenere un risultato simile al seguente: 

  <br />

  <br /><a href="http://imperugo.tostring.it/Content/Uploaded/image/14-Sep-09%2021-00-15_2.png" rel="shadowbox[IPInfo]"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="14-Sep-09 21-00-15" border="0" alt="14-Sep-09 21-00-15" src="http://imperugo.tostring.it/Content/Uploaded/image/14-Sep-09%2021-00-15_thumb.png" width="244" height="172" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/14-Sep-09%2021-00-35_2.png" rel="shadowbox[IPInfo]"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="14-Sep-09 21-00-35" border="0" alt="14-Sep-09 21-00-35" src="http://imperugo.tostring.it/Content/Uploaded/image/14-Sep-09%2021-00-35_thumb.png" width="244" height="172" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/14-Sep-09%2021-00-57_2.png" rel="shadowbox[IPInfo]"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="14-Sep-09 21-00-57" border="0" alt="14-Sep-09 21-00-57" src="http://imperugo.tostring.it/Content/Uploaded/image/14-Sep-09%2021-00-57_thumb.png" width="220" height="172" /></a> 

  <br />

  <br />P.S.: il servizio è gratuito fino ad un certo numero (non ho capito bene a quanto equivale) di interrogazioni in un determinato lasso di tempo. Se si decide di utilizzare senza limiti il servizio è necessario abbonarsi.</p>
