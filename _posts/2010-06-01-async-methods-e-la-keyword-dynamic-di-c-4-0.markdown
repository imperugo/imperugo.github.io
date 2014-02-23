---
layout: post
status: publish
published: true
title: Async Methods e la keyword dynamic di C# 4.0
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1489
wordpress_url: http://imperugo.tostring.it/blog/post/async-methods-e-la-keyword-dynamic-di-csharp-4/
date: 2010-06-01 16:45:00.000000000 +01:00
categories:
- .NET
tags:
- C#
- Async
comments: true
---
<p>Il bello di avere un <a title="Mauro Servienti&#39;s Blog" href="http://topics.it/" rel="nofollow" target="_blank">collega</a> MVP su C#, ma ancor prima devMaskio, è che quando hai un dubbio sul linguaggio lui sa subito risponderti e spesso con una soluzione al tuo problema.     <br />Sorvolando la domanda ed il perchè è nata, l’idea era quella di evitare la noiosa costruzione di apposite classi di “<strong><em>state</em></strong>” per invocare metodi in asincroni.     <br />Osservando la parte pragmatica del problema, prima della versione 4.0 del <a title=".NET Framework Search" href="http://www.imperugo.tostring.it/tags/archive/.net" target="_blank">.NET Framework</a> quello che dovevamo fare per invocare un metodo asincrono era più o meno questo:</p>  {% highlight csharp %}
internal class Program
{
    private static void Main(string[] args)
    {
        AsyncCallState obj = new AsyncCallState
                                 {
                                     Property1 = "String" ,
                                     Property2 = 10 ,
                                     Property3 = new AsyncCallState2 ()
                                                     {
                                                         P1 = "SubProperty1"
                                                     }
                                 };

        ThreadPool.QueueUserWorkItem(AsyncCall, obj);

        Console.ReadLine();
    }

    private static void AsyncCall(object obj)
    {
        AsyncCallState anonymous = (AsyncCallState)obj;

        string p1 = anonymous.Property1;
        int p2 = anonymous.Property2;

        string sP1 = anonymous.Property3.P1;

    }
}

internal class AsyncCallState
{
    public string Property1 { get; set; }
    public int Property2 { get; set; }
    public AsyncCallState2 Property3 { get; set; }
}

internal class AsyncCallState2
{
    public string P1 { get; set; }
}
{% endhighlight %}
<p>Come potete vedere le classi AsyncCallState ed AsyncCallState2 hanno un utilizzo ridottissimo e legato soltanto a questa chiamata, infatti difficilmente ci capiterà di riutilizzare questa classe per altre firme all’interno della nostra applicazione. 
  <br />Grazie alla keyword <em><strong><a title="Using Type dynamic (C# Programming Guide)" href="http://msdn.microsoft.com/en-us/library/dd264736.aspx" rel="nofollow" target="_blank">dynamic</a></strong></em> di C# 4.0 è possibile evitare la costruzione di questa classe e risparmiare un bel po’ di tempo:</p>

{% highlight csharp %}
internal class Program
{
    private static void Main ( string[] args )
    {
        ThreadPool.QueueUserWorkItem ( AsyncCall , new
                                                       {
                                                           Property1 = "String" ,
                                                           Property2 = 10 ,
                                                           Property3 = new
                                                                           {
                                                                               P1 = "SubProperty1"
                                                                           }
                                                       } );

        Console.ReadLine ();
    }

    private static void AsyncCall ( object obj )
    {
        dynamic anonymous = obj;

        string p1 = anonymous.Property1;
        int p2 = anonymous.Property2;
        dynamic p3 = anonymous.Property3;

        string sP1 = p3.P1;

    }
}
{% endhighlight %}
<p>Ciauz</p>
