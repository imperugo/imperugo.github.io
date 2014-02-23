---
layout: post
status: publish
published: true
title: Accesso ai membri internal.
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1638
wordpress_url: http://imperugo.tostring.it/blog/post/accesso-ai-membri-internal/
date: 2009-04-22 06:22:46.000000000 +01:00
categories:
- Various
tags:
- Nhibernate
- .NET
- C#
- Framework
comments: true
---
<p>Per chi come me fa uso di <a target="_blank" href="http://www.nhibernate.org">NHibernate</a> per la parte di persistenza sapr&agrave; sicuramente che &egrave; necessario impostare le propriet&agrave; delle nostre entities come virtual. Questo &egrave; necessario in quanto <a target="_blank" href="http://www.nhibernate.org">NHibernate</a> per poter sfruttare a pieno le sue potenzialit&agrave;, come <a target="_blank" href="http://www.martinfowler.com/eaaCatalog/lazyLoad.html">LazyLoad</a>, crea un&rsquo;istanza di un proxy (con&nbsp;<a target="_blank" href="http://www.castleproject.org/dynamicproxy/index.html">DynamicProxy</a> di <a target="_blank" href="http://www.castleproject.org/">Castle</a>) ed inietta a runtime la logica da noi richiestra tramite mapping, fetching, ecc.</p>
<p>Ora se il nostro strato di accesso ai dati non restituisce la entity di dominio, bens&igrave; un DTO (Data Transfer Object, ne abbiamo parlato <a target="_blank" href="http://imperugo.tostring.it/Blog/Post/DTO-IL-e-Reflection-nelle-nostre-applicazioni">qui</a>)&nbsp; vorrei che il progetto che referenzier&agrave; il nostro Data Layer non possa creare un&rsquo;istanza della entity di dominio; per far questo ci basta specificare che la entity di dominio sia di tipo internal.</p>
<p>Questo va si a risolvere il nostro problema, ma impedisce all&rsquo;assembly di NHibernate di accedere alle entities di dominio in quanto questo si trova a sua volta in un&rsquo;assembly esterna, sollevando una bella Castle.DynamicProxy.Generators.GeneratorException, come quella mostrata qui di seguito:</p>
<blockquote>
<p>Type is not public, so a proxy cannot be generated. Type: imperugo.example.domain.entitybase</p>
<p>Castle.DynamicProxy.Generators.GeneratorException: Type is not public, so a proxy cannot be generated. Type : imperugo.example.domain.entitybase</p>
</blockquote>
<p>Per ovviare a questo problema e permettere solo al proxy di Castle di poter accedere all nostra assembly ci basta modificare il file AssemblyInfo aggiungendo la seguente riga:</p>
{% raw %}<pre class="brush: csharp; ruler: true; gutter: false; toolbar: false;">
[assembly: InternalsVisibleTo(&quot;DynamicProxyGenAssembly2&quot;)]</pre>{% endraw %}
<p>A questo punto tutto dovrebbe essere ok, il Data Layer non ha esposto esternamente il dominio ed NHibernate riesce a creare i suoi proxy.   <br />
Ciauz</p>
