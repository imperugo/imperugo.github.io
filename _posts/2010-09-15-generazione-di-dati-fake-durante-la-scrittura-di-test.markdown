---
layout: post
status: publish
published: true
title: Generazione di dati fake durante la scrittura di test.
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1470
wordpress_url: http://imperugo.tostring.it/blog/post/generazione-di-dati-fake-durante-la-scrittura-di-test/
date: 2010-09-15 16:00:00.000000000 +01:00
categories:
- .NET
tags:
- Testing
comments: true
---
<p>Spessissimo, quando mi trovo a dover scrivere dei test, ho la necessità di creare delle istanze di classi contenenti dei dati finti, in modo da verificarne il corretto funzionamento.</p>  <p>Di fatto, se proviamo ad immaginare di dover testare un metodo ForEach per una classe IEnumerable(vedi <a title="ForEach in un IEnumerable" href="http://tostring.it/blog/post/foreach-ienumerable-of-t" target="_blank">qui</a>), sicuramente nel test dobbiamo creare una lista contente gli elementi da iterare.     <br />Anche se semplice, la creazione di un set di informazioni finte, anche tramite classi “helper”, può risultare una fase noiosa e ripetitiva.     <br />Grazie ad un consiglio di Fabio ho provato questo framework, che ci aiuta tantissimo nella creazione di liste - ma anche di singole istanze - con dati fake.</p>  <p>Il funzionamento è piuttosto banale ed intuitivo: di fatto si ha una composizione fluent che ci permette di coprire i principali scenari.</p>  <p>Per capire il suo potenziale provate ad immaginare di dover creare una lista di 10 elementi…con <a title="NBuilder Home Page" href="http://nbuilder.org" rel="nofollow" target="_blank">NBuilder</a> si può ottenere lo stesso risultato con una sola riga di codice! J</p>  {% highlight csharp %}
var posts = Builder<Post>.CreateListOfSize(10).Build();
{% endhighlight %}
<br />Ovviamente si possono specificare anche criteri un po’ più “strong”, forzando il valore di una specifica proprietà o addirittura alternando un valore all’interno della lista. 

{% highlight csharp %}
var posts = Builder<Post>.CreateListOfSize(10)
                .WhereAll()
                .Have(p => p.Username = "imperugo")
                .Build();
{% endhighlight %}
<p>Un'altra feature che trovo interessantissima è la possibilità di persistere l’oggetto su di un nostro repository, quindi invocare un metodo passando il dato creato. Chi scrive integration test troverà sicuramente questa feature molto vantaggiosa.</p>

{% highlight csharp %}
//Definisco il servizio di persistenza da invocare
BuilderSetup.SetCreatePeristenceMethod<Post> (postService.SaveOrUpdate);

//Persisto l'oggetto fake
Builder<Post>.CreateNew().Persist();
{% endhighlight %}
<p>Ovviamente il framework offre numerosissime altre features, che trovate <a title="NBuilder" href="http://nbuilder.org/Documentation" rel="nofollow" target="_blank">qui</a>.</p>

<p>Direi un must.</p>

<p>Enjoy it.</p>
