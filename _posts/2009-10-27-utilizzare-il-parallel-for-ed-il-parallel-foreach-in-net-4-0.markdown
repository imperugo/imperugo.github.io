---
layout: post
status: publish
published: true
title: Utilizzare il Parallel For ed il Parallel ForEach in .NET 4.0
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1544
wordpress_url: http://imperugo.tostring.it/blog/post/utilizzare-il-parallel-for-ed-il-parallel-foreach-in-net-40/
date: 2009-10-27 17:30:00.000000000 +00:00
categories:
- .NET
tags:
- Performances
- Parallel
- .NET Framework 4.0
comments: true
---
<p>L’utilizzo del <a title="Parallel Programming" href="http://en.wikipedia.org/wiki/Parallel_computing" rel="nofollow" target="_blank">Parallel Programming</a> in <a title=".NET Framework" href="http://imperugo.tostring.it/categories/archive/.NET" target="_blank">.NET</a> 4.0 va oltre a quanto già detto <a title="Welcome Parallel Linq" href="http://imperugo.tostring.it/blog/post/welcome-parallel-linq" target="_blank">qui</a>: di fatto all’interno del namespace System.Threading.Tasks esiste una classe Parallel che permette di effettuare cicli sfruttando più Threads, in modo da abbassare il tempo necessario all’iterazione.</p>  <p>Lo snippet seguente mostra un semplicissimo ciclo di 50 elementi con e senza il Parallel For, con risultati nettamente a vantaggio dell’istruzione Parallel.For.</p>  {% raw %}<pre class="brush: csharp; ruler: true;">static void Main(string[] args)
{
    Console.WriteLine(&quot;MTID={0}&quot;, Thread.CurrentThread.ManagedThreadId);

    ParallelMethod();
    NonParallelMethod();
    
    Console.WriteLine(&quot;\nFinished...&quot;);
    Console.ReadKey(true);
}

static void NonParallelMethod()
{
    Stopwatch sw = Stopwatch.StartNew();

    for (int i = 0; i &lt; 50; i++)
    {
        Console.WriteLine(&quot;ThreadID={0}, i={1}&quot;, Thread.CurrentThread.ManagedThreadId, i);
        SimulateProcessing();
    }

    sw.Stop();

    Console.WriteLine(&quot;It Took {0} ms with simple for&quot;, sw.ElapsedMilliseconds);
}

static void ParallelMethod()
{
    Stopwatch sw = Stopwatch.StartNew();

    Parallel.For(0, 50, i =&gt;
    {
        Console.WriteLine(&quot;ThreadID={0}, i={1}&quot;, Thread.CurrentThread.ManagedThreadId, i);

        SimulateProcessing();
    });

    sw.Stop();

    Console.WriteLine(&quot;It Took {0} ms with Parallel For&quot;, sw.ElapsedMilliseconds);
}

static void SimulateProcessing()
{
    Thread.SpinWait(80000000);
}</pre>{% endraw %}

<p>Dallo screenshot seguente è possibile capire come l’utilizzo del Parallel ci permette di sfruttare a meglio l’hardware a disposizione in quanto utilizza entrambi i processori, a differenza del classico ciclo for che ne sfrutta uno solo.</p>

<p><a href="http://imperugo.tostring.it/Content/Uploaded/image/001r_2.jpg" rel="shadowbox"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="001r" border="0" alt="001r" src="http://imperugo.tostring.it/Content/Uploaded/image/001r_thumb.jpg" width="283" height="267" /></a> </p>

<p>Ovviamente la classe Parallel non offre soltanto metodi per il ciclo for ma anche per il ForEach che funziona allo stesso modo, come mostrato di seguito:</p>

{% raw %}<pre class="brush: csharp; ruler: true;">static void ParallelForEach()
{
    int[] values = Enumerable.Range(1,50).ToArray();

    Parallel.ForEach&lt;int&gt;(values, i =&gt;
    {
        Console.WriteLine(&quot;ThreadID={0}, i={1}&quot;, Thread.CurrentThread.ManagedThreadId, i);

        SimulateProcessing();
    });
}</pre>{% endraw %}

<p>Anche questo, come il <a title="Welcome Parallel Linq" href="http://imperugo.tostring.it/blog/post/welcome-parallel-linq" target="_blank">precedente</a>, resta un test dimostrativo della semplicità con cui si può sfruttare il <a title="Parallel Programming" href="http://en.wikipedia.org/wiki/Parallel_computing" rel="nofollow" target="_blank">Parallel Programming</a> con il <a title=".NET Framework 4.0" href="http://imperugo.tostring.it/tags/archive/.net+framework+4.0" target="_blank">.NET Framework 4.0</a> e del fatto che i risultati ottenibili sono influenzabili dall’hardware che si ha a disposizione, numero di processori in primis.</p>

<p>Parallel.Ciauz()</p>
