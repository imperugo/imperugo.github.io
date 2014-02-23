---
layout: post
status: publish
published: true
title: Welcome Parallel Linq
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1545
wordpress_url: http://imperugo.tostring.it/blog/post/welcome-parallel-linq/
date: 2009-10-26 19:30:00.000000000 +00:00
categories:
- .NET
tags:
- Linq
- Performances
- Parallel
- .NET Framework 4.0
comments: true
---
<p>
	Il mio primo test della Beta 2 di <a href="http://imperugo.tostring.it/blog/search?q=Visual+Studio&amp;searchButton=Go" target="_blank" title="Search Visual Studio">Visual Studio</a> 2010 non riguarda <a href="http://imperugo.tostring.it/categories/archive/ASP.NET" target="_blank" title="ASP.NET">ASP.NET</a> ma il mondo del <a href="http://en.wikipedia.org/wiki/Parallel_computing" rel="nofollow" target="_blank" title="Parallel Programming">Parallel Programming</a>, e, nello specifico, del <a href="http://msdn.microsoft.com/en-us/magazine/cc163329.aspx" rel="nofollow" target="_blank" title="Parallel Linq">Parallel Linq</a>, ossia la possibilit&agrave; di utilizzare il Parallel Framework tramite la sintassi <a href="http://imperugo.tostring.it/tags/archive/linq" target="_blank" title="Linq">Linq</a>.</p>
<p>
	L&rsquo;utilizzo &egrave; semplicissimo e le prestazioni sono da paura se viene fatto un confronto con la stessa operazione ma senza l&rsquo;utilizzo del Parallel. Ovviamente il test che riporto &egrave; banalissimo, ma serve a rendere l&rsquo;idea di quanto semplice sia l&rsquo;implementazione di Parallel Linq con il <a href="http://imperugo.tostring.it/categories/archive/.NET" target="_blank" title=".NET Framework">.NET</a> Framework 4.0 e di che tipo di vantaggio si pu&ograve; trarre da un approccio di questo genere.</p>
<p>
	Come potete vedere dal codice seguente, l&rsquo;unica differenza nella sintassi Linq &egrave; l&rsquo;utilizzo dell&rsquo;apposito Extension Method AsParallel() sull&rsquo;oggetto da ciclare (Items in questo caso).</p>
{% raw %}<pre class="brush: csharp; ruler: true;">using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Parallel;
using System.Diagnostics;
using System.Threading;
using System.Collections;

namespace Imperugo.Test.ParallelLINQ
{
    class Program
    {
        private static IList<demoentity> items = new List<demoentity>();

        static void Main(string[] args)
        {
            PrepareData();

            ParalelTest();
            ClassicTest();

            Console.WriteLine(&quot;\nFinished...&quot;);
            Console.ReadKey(true);
        }

        private static void ParalelTest()
        {
            var results = from i in items.AsParallel() where i.SubValues.Contains(new Random(1000).Next()) select i;

            Stopwatch sw = Stopwatch.StartNew();
            IList<demoentity> resultsList = results.ToList();
            Console.WriteLine(&quot;{0} items&quot;, resultsList.Count());
            sw.Stop();

            Console.WriteLine(&quot;It Took {0} ms with parallel Linq&quot;, sw.ElapsedMilliseconds);
        }

        private static void ClassicTest()
        {
            var results = from i in items where i.SubValues.Contains(new Random(1000).Next()) select i;

            Stopwatch sw = Stopwatch.StartNew();
            IList<demoentity> resultsList = results.ToList();
            Console.WriteLine(&quot;{0} items with Linq&quot;, resultsList.Count());
            sw.Stop();

            Console.WriteLine(&quot;It Took {0} ms&quot;, sw.ElapsedMilliseconds);
        }

        static bool IsDivisibleByFive(int i)
        {
            return i % 5 == 0;
        }

        private static void PrepareData()
        {
            for (int i = 0; i &lt; 1000000; i++)
            {
                var item = new DemoEntity
                                                {
                                                    Title = &quot;New Title &quot; + i,
                                                    SubValues = Enumerable.Range(1, 1000)
                                                };

                items.Add(item);
            }
        }
    }
}</demoentity></demoentity></demoentity></demoentity></pre>{% endraw %}
<p>
	Nel test &egrave; stata eseguita la stessa operazione due volte, una utilizzando il Parallel Linq (quadrato blu), ed una utilizzando Linq normalmente (quadrato rosso) su di una collection con 1.000.000 di elementi. I tempi richiesti per completare l&rsquo;operazione sono ovviamente a vantaggio di Parallel Linq che conclude il ciclo con 9276 millisecondi, a differenza dei 16440 richiesti da Linq.</p>
<p>
	<a href="http://imperugo.tostring.it/Content/Uploaded/image/0023_2.jpg" rel="shadowbox"><img alt="0023" border="0" height="289" src="http://imperugo.tostring.it/Content/Uploaded/image/0023_thumb.jpg" style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="0023" width="307" /></a></p>
<p>
	Un aspetto molto interessante pu&ograve; essere lo scenario di utilizzo. Di fatto, per poter trarre vantaggio dall&rsquo;utilizzo di Parallel Linq lo si deve sfruttare in elementi corposi (nel test ho utilizzato una collection con 1.000.000 di elementi, ma i vantaggi si cominciano a percepire dai 50.000 elementi in poi), altrimenti si rischia di ottenere l&rsquo;effetto opposto. Ovviamente incide molto anche il numero di processori che si hanno a disposizione. <br />
	I dati riportati sono relativi ad un portatile dual core in modalit&agrave; balanced, ma la differenza si nota.</p>
<p>
	Ciauz.AsParallel()</p>
