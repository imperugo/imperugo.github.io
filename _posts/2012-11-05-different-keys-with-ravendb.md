---
layout: post
title: Different keys with RavenDb
categories:
- .NET
tags:
- database
- ravendb
status: publish
type: post
published: true
comments: true
---
<span style="line-height: 1.5em;">In last period, I am spending so times to learn document databases, in my case <a title="RavenDB" href="http://ravendb.net/" target="_blank"><strong>RavenDB</strong> </a>and <a title="MongoDB" href="http://www.mongodb.org/" target="_blank"><strong>MongoDB</strong></a>. To be honest I am working only on Raven right now because it is friendlier for .NET developers but I promised myself to compare some features from these two awesome database engines</span>.

One of the big difficult I found, is to create the right model. I said big because I’m used to design the model for relation database and here is really different. For example we do not have the join and we also need to denormalize the references (<a href="http://ravendb.net/docs/faq/denormalized-references">http://ravendb.net/docs/faq/denormalized-references</a>).

It is mandatory because each document must be independent as Oren wrote on the site:
<blockquote><em>One of the </em><em>design principals that RavenDB adheres to is the idea that documents are independent, that all the data required to process a document is stored within the document itself</em></blockquote>
Fortunately, Raven makes easy some stuff like update and loading, respectively using <strong>Patch API</strong> (<a href="http://ravendb.net/docs/client-api/partial-document-updates">http://ravendb.net/docs/client-api/partial-document-updates</a>) and <strong>Include</strong>.

The <strong>Include</strong> command is absolutely cool, it makes easy to load two documents with one roundtrip and it means only one thing, Faster!
For the NHibernate users it reminds me a little the <em>Future</em> command, with an important different, here you can load only document that has a key to another one, in NH you can load also objects completely unlinked.

Let’s see my domain:

<a href="{{ site.url }}/assets/2012/11/domain.png"><img class="aligncenter size-medium wp-image-749" title="domain" alt="" src="{{ site.url }}/assets/2012/11/domain-300x284.png" width="300" height="284" /></a>

It seems more complex that it really is. There is a <strong>Post</strong> class and <strong>ItemComments</strong>. The first one includes all you need to have in the aggregate view; the second one, combined with the first one, has all you need to show in the detail view or admin area (in the most blog enginea you don’t need to show the comments in the main page, otherwise you need in the permalink).

The only common thing between them is the property CommentsId into Post class (It’s called Id in ItemComments). With it, you can easily load both documents in the same time.
Let’s see how to use it:

{% gist 7795099 gistfile1.cs %}

As you see in the diagram, the key for the Post is a simple integer but in the ItemComments it is a string. That is mandatory if you want to use the <strong>Include</strong> because in the string there is all Raven needs to load the document (the ID and the type, in this case ItemComments/12345 where 12345 is the id).

Different CLR types for the key means to extend the base class for all entities. Typically I have a base class (EntityBase in this model) that includes the ID, Creation Date and a calculate property to check the status of the entity.

{% gist 7795099 gistfile2.cs %}

The property IsTransient could be helpful to understand if you have to execute some path or not.
Using a generic CLR type for the ID the base class must be extended like this:

{% gist 7795099 gistfile3.cs %}

Now you can still use a base class with the same features having fun with RavenDB.
