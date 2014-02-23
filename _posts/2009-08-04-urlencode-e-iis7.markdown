---
layout: post
status: publish
published: true
title: UrlEncode e IIS7
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1584
wordpress_url: http://imperugo.tostring.it/blog/post/urlencode-e-iis7/
date: 2009-08-04 01:30:15.000000000 +01:00
categories:
- ASP.NET
tags:
- Windows
- Windows Server 2008
- ASP.NET
- Configurazione
- IIS
- IIS 7.5
comments: true
---
<p>Quando si costruiscono url dinamici in base a delle variabili di applicazione, &egrave; bene utilizzare l&rsquo;apposito metodo <strong><em>UrlEncode</em></strong> della classe statica <strong><em>HttpUtility</em></strong>, che ha il compito di effettuare il replace di tutti i caratteri non compatibili con gli url.    <br />
<br />
Per esempio l&rsquo;url seguente <a href="http://imperugo.tostring.it/Categories/Archive/Windows%20Communication%20Foundation">http://imperugo.tostring.it/Categories/Archive/Windows Communication Foundation</a> dovrebbe diventare <a href="http://imperugo.tostring.it/Categories/Archive/Windows+Communication+Foundation">http://imperugo.tostring.it/Categories/Archive/Windows+Communication+Foundation</a>    <br />
Di fatto <strong><em>HttpUtility.UrlEncode(&quot;Windows Communication Foundation&quot;)</em></strong> sostituisce lo spazio con il carattere &ldquo;+&rdquo;.    <br />
<br />
Quando la propria applicazione risiede su un web server come IIS7.x (Windows Vista, Windows Server 2008, Windows 7, Windows Server 3008 R2) si possono riscontrare dei problemi con questo tipo di url in quanto per default sono bloccati tutti gli url contenenti pi&ugrave; di un carattere di escape - nel nostro esempio il &ldquo;+&rdquo; - sollevando un&rsquo;eccezione come la seguente:</p>
<blockquote>
<p>HTTP Error 404.11 - Not Found     <br />
The request filtering module is configured to deny a request that contains a double escape sequence.</p>
</blockquote>
<p>Per disabilitare questa protezione e poter sfruttare l&rsquo;urlEncode &egrave; necessario agire sulla configurazione di IIS nell&rsquo;apposito file di configurazione (%windir%\System32\inetsrv\config\applicationHost.config) o nell&rsquo;apposita sezione del web.config dell&rsquo;applicazione come mostrato di seguito</p>
{% raw %}<pre class="brush: xml; ruler: true;">
&lt;system.webServer&gt;
  &lt;security&gt;
      &lt;requestFiltering allowDoubleEscaping=&quot;true&quot; /&gt;
  &lt;/security&gt;
  &lt;!-- ..... --&gt; 
&lt;/system.webServer&gt;</pre>{% endraw %}
<p>In questo modo non si avranno eccezioni per tutti gli url contenenti caratteri di escape.</p>
