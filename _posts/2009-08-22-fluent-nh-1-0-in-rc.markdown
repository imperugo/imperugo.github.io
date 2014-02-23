---
layout: post
status: publish
published: true
title: Fluent NH 1.0 in RC.
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1576
wordpress_url: http://imperugo.tostring.it/blog/post/fluent-nh-10-in-rc/
date: 2009-08-22 12:15:44.000000000 +01:00
categories:
- ORM
tags:
- Nhibernate
- NHibernateFluent
- Mapping
comments: true
---
<p><a href="http://fluentnhibernate.org/" target="_blank">NHibernateFluent</a> &egrave; una valida alternativa al metodo classico (XML Based) di mappare le entity con con NHibernate.     <br />
Nello specifico, il mapping non avviene pi&ugrave; tramite la costruzione di un XML da embeddare nel progetto, ma scrivendo semplice codice C#. Anche se tramite gli appositi XSD si pu&ograve; disporre dell&rsquo;intellisense durante la stesura dell&rsquo;XML, l&rsquo;approccio Fluent offre ulteriori vantaggi.</p>
<p>La cosa pi&ugrave; interessante &egrave; che, nel caso di renaming di alcune propriet&agrave;, si ha gi&agrave; il mapping aggiornato, cosa che precedentemente al fluent era fattibile solo tramite l&rsquo;uso di appositi plugin come Resharper: nel caso non si avesse avuto a disposizione questo addon spesso ci si imbatteva in alcuni problemi (come l&rsquo;errata scrittura di una propriet&agrave;) solo a runtime, mentre ora l&rsquo;errore si avrebbe a compile time, con un vantaggio notevole per lo sviluppatore.    <br />
Oltre a ci&ograve;, grazie alle lambda, la scrittura del mapping &egrave; molto pi&ugrave; fluente (non a caso si chiama Fluent), come dimostra lo snippet seguente:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
public class CatMap : ClassMap&lt;Cat&gt;
{
  public CatMap()
  {
    Id(x =&gt; x.Id);
    Map(x =&gt; x.Name)
      .Length(16)
      .Not.Nullable();
    Map(x =&gt; x.Sex);
    References(x =&gt; x.Mate);
    HasMany(x =&gt; x.Kittens);
  }
}</pre>{% endraw %}
<p>Personalmente ho iniziato ad usare il Fluent gi&agrave; dalla versione 0.1 - praticamente la prima versione - con non pochi problemi relativamente alle composite unique key, ma ora che &egrave; alla versione <strong>1.0 RC</strong> (dal 16 di agosto), confido che i problemi siano risolti e che sia gi&agrave; utilizzabile alla grande.</p>
<p>Inoltre credo (qualcuno me lo ha detto, ma non ricordo chi) che il Fluent sia gi&agrave; presente nella trunk di NHibernate 3, ma questa notizia prendetela con le pinze :)</p>
<p>Ciauz</p>
<p>Maggiori info sul Fluent le trovate <a href="http://fluentnhibernate.org/">qui</a> e <a href="http://www.lostechies.com/blogs/jagregory/archive/2009/08/16/fluent-nhibernate-1-0rc.aspx">qui</a>.</p>
