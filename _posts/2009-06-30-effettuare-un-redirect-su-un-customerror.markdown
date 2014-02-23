---
layout: post
status: publish
published: true
title: Effettuare un Redirect su un customError
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1610
wordpress_url: http://imperugo.tostring.it/blog/post/effettuare-un-redirect-su-un-customerror/
date: 2009-06-30 02:01:54.000000000 +01:00
categories:
- ASP.NET
tags:
- SEO
- ASP.NET
- Configurazione
- .NET
- Deploy
- Framework
comments: true
---
<p>Spesso, quando ci si trova a realizzare pagine web il cui risultato &egrave; fortemente legato ad una variabile come potrebbe essere un ID, si pu&ograve; avere la necessit&agrave; di effettuare un <em>Redirect</em> verso la pagina di customError specificata nel <em>web.config</em>, comunicando cos&igrave; al bot del motore di ricerca che il contenuto ricercato non &egrave; presente, e non deve quindi essere indicizzato.<br />
La soluzione &egrave; presente nel .NET&nbsp;Framework e ci basta sollevare una HttpException specificando lo status code che si intende restituire come mostrato di seguito:</p>
<p>&nbsp;</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
if (post == null)
    throw new HttpException(404, &quot;Data not found&quot;);</pre>{% endraw %}
<p>Per quanto riguarda il file di configurazione, esso dovrebbe essere tipo il seguente:</p>
{% raw %}<pre class="brush: xml; ruler: true;">
&lt;customErrors mode=&quot;On&quot; defaultRedirect=&quot;/Errors/Generic.aspx&quot;&gt;
    &lt;error statusCode=&quot;403&quot; redirect=&quot;/Errors/403.aspx&quot; /&gt;
    &lt;error statusCode=&quot;404&quot; redirect=&quot;/Errors/404.aspx&quot; /&gt;
&lt;/customErrors&gt;</pre>{% endraw %}
<p>Precedentemente in questo post avevo proposto una soluzione basata su un extension method ma, esistendo gi&agrave; un qualcosa di analogo nel .NET&nbsp;Framework, aveva poco sensoe quindi il post &egrave; stato cambiato.</p>
<p>Ciauz</p>
