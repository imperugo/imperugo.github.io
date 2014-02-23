---
layout: post
status: publish
published: true
title: ForEach in un IEnumerable&lt;T&gt;
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1505
wordpress_url: http://imperugo.tostring.it/blog/post/foreach-ienumerable-of-t/
date: 2010-04-13 16:50:00.000000000 +01:00
categories:
- .NET
tags:
- Linq
- C#
- Extension Methods
comments: true
---
<p><a title="Linq" href="http://imperugo.tostring.it/tags/archive/linq" target="_blank">Linq</a> è senza ombra di dubbio una delle features più belle introdotte da <a title="Microsoft Corporation" href="http://www.microsoft.com" rel="nofollow" target="_blank">Microsoft</a> in <a title=".NET Framework" href="http://imperugo.tostring.it/categories/archive/.NET" target="_blank">.NET</a> negli ultimi anni (dopo i Generics); sicuramente anche gli Extension Methods hanno il loro fascino agevolando lo sviluppatore nella scrittura del codice. Purtroppo una cosa che mi manca in Linq (ma in realtà è un extension method) è il ForEach per IEnumerable&lt;T&gt;. In effetti c’è la possibilità di utilizzarlo per IList&lt;T&gt; e per le array, ma non per IEnumerable&lt;T&gt;.     <br />Stufo di scrivere il <em>foreach</em> ogni volta, ho deciso di realizzarmi un’extension method che risolvesse il problema :).</p>  <p>Lo snippet seguente mostra la realizzazione:</p>  {% raw %}<pre class="brush: csharp; ruler: true;">/// &lt;summary&gt;
/// Eaches the specified enumeration.
/// &lt;/summary&gt;
/// &lt;typeparam name=&quot;T&quot;&gt;&lt;/typeparam&gt;
/// &lt;param name=&quot;enumeration&quot;&gt;The enumeration.&lt;/param&gt;
/// &lt;param name=&quot;action&quot;&gt;The action.&lt;/param&gt;
public static void ForEach &lt;T&gt; ( this IEnumerable &lt;T&gt; enumeration , Action &lt;T&gt; action )
{
    Ensure.That ( enumeration ).IsNotNull ( );

    foreach ( T item in enumeration )
        action ( item );
}</pre>{% endraw %}

<p>Il suo UnitTest (sempre utilizzando <a title="SharpTestEx Home Page" href="http://sharptestex.codeplex.com/" rel="nofollow" target="_blank">SharpTestEx</a>):</p>

{% raw %}<pre class="brush: csharp; ruler: true;">[TestMethod]
public void eachTest_with_null_object_shold_throw_argumentNullException()
{
    var mockService = MockRepository.GenerateStrictMock&lt;IFakeClass&gt;();
    ActionAssert.Throws&lt;ArgumentNullException&gt;(() =&gt; ((IEnumerable&lt;string&gt;)null).ForEach(x =&gt; mockService.FakeMethod(&quot;testValue&quot;)));
}

[TestMethod]
public void eachTest_with_valid_object()
{
    IEnumerable&lt;string&gt; values = new List&lt;string&gt; { &quot;testValue1&quot;, &quot;testValue2&quot;, &quot;testValue3&quot; };

    var mockService = MockRepository.GenerateStub &lt;IFakeClass&gt;();

    values.ForEach(mockService.FakeMethod);

    var calls = mockService.GetArgumentsForCallsMadeOn(obj =&gt; obj.FakeMethod(null));

    calls [ 0 ] [ 0 ].Should ( ).Be.EqualTo ( &quot;testValue1&quot; );
    calls [ 1 ] [ 0 ].Should ( ).Be.EqualTo ( &quot;testValue2&quot; );
    calls [ 2 ] [ 0 ].Should ( ).Be.EqualTo ( &quot;testValue3&quot; );
}</pre>{% endraw %}

<p>&#160;</p>

<p>Ciauz</p>
