---
layout: post
status: publish
published: true
title: Testare il mapping di NHibernate
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1566
wordpress_url: http://imperugo.tostring.it/blog/post/testare-il-mapping-di-nhibernate/
date: 2009-09-09 09:49:05.000000000 +01:00
categories:
- ORM
tags:
- Nhibernate
- Testing
- Mapping
comments: true
---
<p>Un buon mapping &egrave; la base di un buon risultato ottenibile tramite l&rsquo;uso di un O/RM.    <br />
Anche se in molti esempi pu&ograve; sembrare semplice effettuare il mapping, in applicazioni reali (o con particolari richieste) questo pu&ograve; essere tutt&rsquo;altro che semplice.     <br />
In <a title="Dexter Blog Engine" target="_blank" href="http://imperugo.tostring.it/About/Dexter">Dexter</a> ho avuto la necessit&agrave; di realizzare diversi UserType per gestire enumerati, timezone, conversioni, ecc, ed ovviamente, essendoci una logica di calcolo dietro, questi andrebbero testati per evitare di avere un&rsquo;incongruenza di dati o, nel peggiore dei casi, degli errori.     <br />
<a title="FluentNHibernate" rel="nofollow" target="_blank" href="http://fluentnhibernate.org/">FluentNHibernate</a> mette a disposizione delle classi che permettono di effettuare lo UnitTest del mapping verificando cos&igrave; che la CRUD della entity funzioni a dovere; quindi, nello specifico, si ha a disposizione un mini Framework per testare le seguenti operazioni:</p>
<ul>
    <li>Inserimento della entity;</li>
    <li>Modifica della entity;</li>
    <li>Recupero della entity;</li>
    <li>Cancellazione della entity;</li>
</ul>
<p>Lo snippet seguente mostra come effettuare questo tipo di test con poche righe di codice, avendo la certezza che il mapping sia corretto:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
[TestMethod]
public void BlogRollMap()
{
    new PersistenceSpecification&lt;BlogRoll&gt;(session)
        .CheckProperty(c =&gt; c.ID, 1)
        .CheckProperty(c =&gt; c.Co_worker, true)
        .CheckProperty(c =&gt; c.Colleague, true)
        .CheckProperty(c =&gt; c.Crush, true)
        .CheckProperty(c =&gt; c.Date, true)
        .CheckProperty(c =&gt; c.FamilyType, BlogRollFamilyType.Sibling)
        .CheckProperty(c =&gt; c.FriendType, BlogRollFriendType.Contact)
        .CheckProperty(c =&gt; c.GeographicalType, BlogRollGeographicalType.Neighbor)
        .CheckProperty(c =&gt; c.IsMyBlog, true)
        .CheckProperty(c =&gt; c.Link, &quot;http://www.microsoft.com&quot;)
        .CheckProperty(c =&gt; c.Met, true)
        .CheckProperty(c =&gt; c.Muse, true)
        .CheckProperty(c =&gt; c.Name, &quot;Microsoft&quot;)
        .CheckProperty(c =&gt; c.Position, 1)
        .CheckProperty(c =&gt; c.Sweetheart, true)
        .CheckProperty(c =&gt; c.Username, &quot;imperugo&quot;)
        .VerifyTheMappings();
}</pre>{% endraw %}
<p>Inoltre per condizioni particolari &egrave; possibile specificare, tramite l&rsquo;apposito overload del costruttore, una classe IEqualityComparer per effettuare una comparazione custom dei dati, come mostrato di seguito:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
public class SiteConfigurationEqualityComparer : IEqualityComparer
{
    public new bool Equals(object x, object y)
    {
        if (x == null || y == null)
            return false;

        if (x is TimeZoneInfo &amp;&amp; y is TimeZoneInfo)
            return ((TimeZoneInfo)x).Id == ((TimeZoneInfo)y).Id;

        if (x is ReCaptcha &amp;&amp; y is ReCaptcha)
        {
            var r1 = (ReCaptcha)x;
            var r2 = (ReCaptcha)y;

            return (r1.Enable == r2.Enable &amp;&amp;
                    r1.PrivateKey == r2.PrivateKey &amp;&amp;
                    r1.PublicKey == r2.PublicKey &amp;&amp;
                    r1.Theme == r2.Theme);
        }
}</pre>{% endraw %}
<p>Maggiori info sono disponibili <a title="FluentMapping Persistance Service" rel="nofollow" target="_blank" href="http://wiki.fluentnhibernate.org/Persistence_specification_testing">qui</a>.</p>
<p>Ciauz</p>
