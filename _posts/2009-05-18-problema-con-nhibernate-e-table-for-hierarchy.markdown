---
layout: post
status: publish
published: true
title: Problema con NHibernate e Table for Hierarchy
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1631
wordpress_url: http://imperugo.tostring.it/blog/post/problema-con-nhibernate-e-table-for-hierarchy/
date: 2009-05-18 10:55:12.000000000 +01:00
categories:
- ORM
tags:
- Nhibernate
- ORM
- Configurazione
- .NET
comments: true
---
<p>Tempo fa, insieme a <a href="http://blogs.aspitalia.com/cradle" target="_blank">Marco</a>, mi sono imbattuto in un problema relativo al fetching di collection polimorfiche tramite <a href="https://www.hibernate.org/343.html" target="_blank">NHibernate</a>.</p>  <p>In pratica, quando si hanno <strong>collection il cui tipo contenuto eredita da un’altra entity persistita tramite Table for Hierarchy</strong> (maggiori info <a href="http://nhforge.org/doc/nh/en/index.html#inheritance-tableperclass" target="_blank">qui</a>) , si possono riscontrare dei problemi in fase di fetching quando la collection è contenuta in una entity parent.     <br />Per capire meglio il significato di quanto appena detto si osservi il diagramma di classe seguente:</p>  <p><a href="http://imperugo.tostring.it/Content/Uploaded/image/Diagramma_1.png" rel="shadowbox"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="Diagramma" border="0" alt="Diagramma" src="http://imperugo.tostring.it/Content/Uploaded/image/Diagramma_thumb_1.png" width="262" height="346" /></a> </p>  <p>Per la situazione sopra descritta si avrà un mapping come il seguente:</p>  {% raw %}<pre class="brush: xml; ruler: true;">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;
&lt;hibernate-mapping
    schema=&quot;dbo&quot;
    xmlns=&quot;urn:nhibernate-mapping-2.2&quot;
    default-access=&quot;property&quot;
    namespace=&quot;ConsoleApplication1.ObjectModel&quot;
    assembly=&quot;ConsoleApplication1&quot;&gt;

    &lt;class name=&quot;Post&quot; table=&quot;Posts&quot; lazy=&quot;true&quot; dynamic-update=&quot;true&quot;&gt;
        &lt;id name=&quot;ID&quot; column=&quot;ID&quot; unsaved-value=&quot;0&quot;&gt;
            &lt;generator class=&quot;identity&quot;/&gt;
        &lt;/id&gt;
        &lt;property name=&quot;Title&quot;&gt;
            &lt;column name=&quot;Title&quot; sql-type=&quot;nvarchar(100)&quot; not-null=&quot;true&quot; /&gt;
        &lt;/property&gt;
    &lt;bag name=&quot;PostTags&quot; cascade=&quot;all-delete-orphan&quot; generic=&quot;true&quot;&gt;
            &lt;key column=&quot;PostID&quot; /&gt;
            &lt;one-to-many class=&quot;PostTag&quot; /&gt;
        &lt;/bag&gt;
    &lt;bag name=&quot;ImageTags&quot; cascade=&quot;all-delete-orphan&quot; generic=&quot;true&quot;&gt;
      &lt;key column=&quot;PostID&quot; /&gt;
      &lt;one-to-many class=&quot;ImageTag&quot; /&gt;
    &lt;/bag&gt;
    &lt;/class&gt;
    
&lt;/hibernate-mapping&gt;</pre>{% endraw %}

<p>&#160;</p>

{% raw %}<pre class="brush: xml; ruler: true;">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;
&lt;hibernate-mapping
    schema=&quot;dbo&quot;
    xmlns=&quot;urn:nhibernate-mapping-2.2&quot;
    default-access=&quot;property&quot;
    namespace=&quot;ConsoleApplication1.ObjectModel&quot;
    assembly=&quot;ConsoleApplication1&quot;&gt;

    &lt;class name=&quot;TagBase&quot; table=&quot;Tags&quot; lazy=&quot;true&quot; dynamic-update=&quot;true&quot;&gt;
        &lt;id name=&quot;ID&quot; column=&quot;ID&quot; unsaved-value=&quot;0&quot;&gt;
            &lt;generator class=&quot;identity&quot;/&gt;
        &lt;/id&gt;
    &lt;discriminator force=&quot;true&quot;&gt;
      &lt;column name=&quot;Discriminator&quot; not-null=&quot;true&quot;  sql-type=&quot;int&quot; /&gt;
    &lt;/discriminator&gt;
        &lt;property name=&quot;Name&quot;&gt;
            &lt;column name=&quot;Name&quot; sql-type=&quot;nvarchar(100)&quot; not-null=&quot;true&quot; /&gt;
        &lt;/property&gt;
    &lt;/class&gt;
    
&lt;/hibernate-mapping&gt;</pre>{% endraw %}

<p>&#160;</p>

{% raw %}<pre class="brush: xml; ruler: true;">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;
&lt;hibernate-mapping
    schema=&quot;dbo&quot;
    xmlns=&quot;urn:nhibernate-mapping-2.2&quot;
    default-access=&quot;property&quot;
    namespace=&quot;ConsoleApplication1.ObjectModel&quot;
    assembly=&quot;ConsoleApplication1&quot;&gt;

    &lt;subclass name=&quot;ImageTag&quot; extends=&quot;TagBase&quot; discriminator-value=&quot;1&quot; &gt;
    &lt;/subclass&gt;
    
&lt;/hibernate-mapping&gt;</pre>{% endraw %}

<p>&#160;</p>

{% raw %}<pre class="brush: xml; ruler: true;">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;
&lt;hibernate-mapping
    schema=&quot;dbo&quot;
    xmlns=&quot;urn:nhibernate-mapping-2.2&quot;
    default-access=&quot;property&quot;
    namespace=&quot;ConsoleApplication1.ObjectModel&quot;
    assembly=&quot;ConsoleApplication1&quot;&gt;

    &lt;subclass name=&quot;PostTag&quot; extends=&quot;TagBase&quot; discriminator-value=&quot;0&quot;&gt;
    &lt;/subclass&gt;
    
&lt;/hibernate-mapping&gt;</pre>{% endraw %}

<p>Se si tenta di recuperare una collection di <strong>PostTag</strong> non si riscontrano problemi; al contrario, se si tenta di recuperare un’istanza della classe <strong>Post</strong> e, allo stesso tempo, la collection PostTag ad esso associata, si andrà incontro ad un’eccezione. 

  <br />Per ovviare al problema basta inserire nel mapping della collection la where con il discriminator, come mostrato di seguito:</p>

{% raw %}<pre class="brush: xml; ruler: true;">&lt;bag name=&quot;PostTags&quot; cascade=&quot;all-delete-orphan&quot; generic=&quot;true&quot; where=&quot;Discriminator = 0&quot;&gt;
    &lt;key column=&quot;PostID&quot; /&gt;
    &lt;one-to-many class=&quot;PostTag&quot; /&gt;
&lt;/bag&gt;
&lt;bag name=&quot;ImageTags&quot; cascade=&quot;all-delete-orphan&quot; generic=&quot;true&quot; where=&quot;Discriminator = 1&quot;&gt;
    &lt;key column=&quot;PostID&quot; /&gt;
    &lt;one-to-many class=&quot;ImageTag&quot; /&gt;
&lt;/bag&gt;</pre>{% endraw %}

<p>Questo comportamento, pur essendo documentato dal team di Nhibernate <a href="https://www.hibernate.org/407.html#A14" target="_blank">qui</a>, resta comunque strano. 

  <br />Un’altra soluzione, sicuramente più comoda e mantenibile, consiste nell’impostare l’attributo force del discriminator a true, dicendo così ad Nhibernate di specificare sempre la where del discriminator nelle proprie query, come mostrato dal seguente mapping:</p>

{% raw %}<pre class="brush: xml; ruler: true;">&lt;discriminator force=&quot;true&quot;&gt;
  &lt;column name=&quot;Discriminator&quot; not-null=&quot;true&quot;  sql-type=&quot;int&quot; /&gt;
&lt;/discriminator&gt;</pre>{% endraw %}

<p>In allegato potete trovare un esempio che riproduce il problema. 
  <br />Maggiori informazioni ed aggiornamenti potete trovarli <a href="http://nhjira.koah.net/browse/NH-1674?page=com.atlassian.jira.plugin.system.issuetabpanels:all-tabpanel" target="_blank">qui</a>.</p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:8995c0d4-fb02-4d0b-87fb-1cbe74d53c10" class="wlWriterEditableSmartContent"><p>Download Esempio <a href="http://imperugo.tostring.it/Content/Uploaded/image/imperugo.blog.sample.nhibernate.zip" target="_blank">qui</a></p></div>
