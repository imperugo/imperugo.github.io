---
layout: post
status: publish
published: true
title: Unit Test con SharpTestEx
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1508
wordpress_url: http://imperugo.tostring.it/blog/post/unit-test-con-sharptestex/
date: 2010-04-07 16:43:00.000000000 +01:00
categories:
- .NET
tags:
- Unit Test
- SharpTestEx
comments: true
---
<p>Ultimamente, lavorando in <a title="Dexter Blog Engine" href="http://dexterblogengine.codeplex.com/" rel="nofollow" target="_blank">Dexter</a>, ho deciso di metter su un po’ di test; diciamo pure che le buone intenzioni ci sono, e come prima cosa ho deciso di testare tutto ciò che di nuovo introduco (al momento ho messo solo 108 test, ma spero aumentino velocemente). Ovviamente primo test primo “problema” :). Come prima cosa avevo la necessità di testare un metodo tipo il seguente:</p>  {% raw %}<pre class="brush: csharp; ruler: true;">public class Foo
{
    public void TestMethod(string value1, string value2, string value3)
    {
        if (string.IsNullOrEmpty(value1))
            throw new ArgumentNullException(&quot;value1&quot;);

        if (string.IsNullOrEmpty(value2))
            throw new ArgumentNullException(&quot;value2&quot;);

        if (string.IsNullOrEmpty(value3))
            throw new ArgumentNullException(&quot;value3&quot;);

        //DO SOMETHING
    }
}</pre>{% endraw %}

<p>ed il primo test era una cosa tipo questa:</p>

{% raw %}<pre class="brush: csharp; ruler: true;">[TestMethod()]
[ExpectedException(typeof(ArgumentNullException))]
public void TestMethodTest()
{
    Foo foo = new Foo();
    foo.TestMethod(null,null,null);
}</pre>{% endraw %}

<p>Il problema era legato alle eccezioni, nello specifico volevo verificare che, nel caso i parametri fossero nulli, venisse sollevata l’oppurtuna ArgumentNullException. Detto così nessun problema, basta inserire l’attributo ExpectedException (come mostrato nel codice precedente) ed il gioco è fatto. Però la cosa che non mi piace è che, ipoteticamente, io potrei non avere la certezza che l’eccezione è stata sollevata per il primo, il secondo o il terzo parametro (nel caso fossero tutti e tre nulli) e, per esserne sicuro, devo verificare il ParameterName dell’eccezione.
  <br />Purtroppo l’attributo di MSTest non permette di specificarlo, così ho avuto tre idee:</p>

<ul>
  <li>Metto un try/catch nel test e verifico manualmente il ParameterName;</li>

  <li>Creo un attributo custom che permette di specificare l’eventuale parametro;</li>

  <li>Chiamo <a href="http://www.codewrecks.com/blog/index.php" rel="nofollow friend met co-worker colleague" target="_new">Gian Maria</a> che sicuramente ha affrontato il problema;</li>
</ul>

<p>Sono bastati 5 secondi e la terza opzione si è concretizzata e, su suggerimento del buon <a href="http://www.codewrecks.com/blog/index.php" rel="nofollow friend acquaintance met co-worker colleague" target="_new">Alkampfer</a>, ho deciso di provare <a title="SharpTestEx Home Page" href="http://sharptestex.codeplex.com/" rel="nofollow" target="_blank">SharpTestEx</a> del buon <a title="Fabio Maulo&#39;s Blog" href="http://fabiomaulo.blogspot.com/" rel="nofollow" target="_blank">Fabio Maulo</a>. Devo dire che la prima impressione è ottima: l’utilizzo Fluent è molto comodo, in più lo stesso Framework può essere utilizzato non solo con MSTest, ma anche con NUnit, xUnit, MbUnit.

  <br />Ovviamente il consiglio di Gian Maria non poteva che essere ottimo, ed il problema si è risolto molto velocemente:</p>

{% raw %}<pre class="brush: csharp; ruler: true;">[TestMethod()]
public void TestMethodTest2()
{
    Foo foo = new Foo();
    ActionAssert.Throws&lt;ArgumentNullException&gt;(() =&gt; foo.TestMethod(&quot;prova&quot;, null, &quot;prova2&quot;))
                            .ParamName
                            .Should ( )
                            .Be
                            .EqualTo(&quot;value2&quot;);
}</pre>{% endraw %}

<p>Molto probabilmente SharpTextEx sarà il mio Framework di testing per un po’, anche se mi riservo di provare TypeMock per effettuare UnitTest sulle WebForms.
  <br />Ciauz</p>
