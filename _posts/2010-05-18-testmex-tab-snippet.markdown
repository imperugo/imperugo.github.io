---
layout: post
status: publish
published: true
title: Testmex =&gt; tab (snippet)
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1497
wordpress_url: http://imperugo.tostring.it/blog/post/testmex-tab-snippet/
date: 2010-05-18 16:30:00.000000000 +01:00
categories:
- .NET
tags:
- Visual Studio
- Testing
- Unit Test
- Snippet
- SharpTestEx
comments: true
---
<p>In questo periodo sto scrivendo test in continuazione, un po’ perchè sto leggendo il libro di <a href="http://weblogs.asp.net/rosherove/">Roy Osherove</a> “<a href="http://www.amazon.com/Art-Unit-Testing-Examples-Net/dp/1933988274/ref=sr_1_1?ie=UTF8&amp;s=books&amp;qid=1274130780&amp;sr=8-1">The Art of Unit Test</a>”, ed un po’ perchè sto cercando di colmare un gap su dexter. Chi mi frequenta pensa che ormai sono vittima del testing in quanto non faccio altro che parlare di unit test, di come scrivere test, etc., e devo ammettere che un po’ è anche vero :). </p>  <p>Il tutto è partito da una certa <a href="http://blogs.ugidotnet.org/pape/Default.aspx">persona</a> (un po’ contabile ed un po’ commercialista :D) che mi ha spronato più e più volte a guardare lo sviluppo anche da una prospettiva differente, ossia da quella del testing...per questo&#160; non posso che ringraziarlo, anche se per assimilare bene i concetti e metterli in pratica ho impiegato un po’ di tempo, ma credo che sia del tutto normale. </p>  <p>Parlando dell’aspetto pragmatico dei test scritti in questi giorni, posso dire che hanno una cosa che li contraddistingue, ossia la presenza di <a href="http://sharptestex.codeplex.com/">SharpTestEx</a> e <a href="http://www.ayende.com/projects/rhino-mocks.aspx">RhinoMock</a>; di fatto mi sono creato uno snippet che mi creasse a sua volta un metodo con la struttura secondo la mia nomenclatura preferita e, nel caso mi aspettassi un’eccezione dal test, mi implementasse anche il controllo della stessa.    <br />Per farla breve tutti i miei test devono avere un nome leggibilissimo, che rispecchi il più possibile i tre aspetti base, quindi far capire cosa si sta testando, con quali valori e cosa ci si aspetta: </p>  <p><em><b>“MethodUnderTest_Scenario_ExpectedBehavior”</b></em></p>  <p>In un esempio pratico in cui si voglia testare un metodo “GetList”, passando un valore negativo al parametro “pageSize” e aspettandosi dal metodo da testare un’eccezione, il nome del test dovrebbe essere una cosa tipo: “<em><b>GetList_WithNegativePageSize_ShouldThrowArgumentOutOfRangeException</b></em>” che, tradotto in soldoni, dovrebbe essere implementato più o meno così:</p>  <p></p>  <p></p>  {% highlight csharp %}
[TestMethod]
public void GetList_WithNegativePageIndex_ShouldThrowNewArgumentOutOfRangeException()
{
    //TODO:Arrage

    //TODO:Act

    //TODO:Assert
    ActionAssert.Throws<ArgumentOutOfRangeException>(() => something).ParamName.Should().Be.EqualTo("pageSize");
}
{% endhighlight %}
<p>Purtroppo anche con il copia/incolla può essere scomodo ripetere ogni volta questo codice, così mi sono deciso a scrivere uno snippet che, digitando !testmex + tab!, mi crea automaticamente lo scheletro. </p>

<p>Di seguito lo snippet che possiamo copiare ed incollare direttamente nell’apposita folder</p>

<p></p>

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<CodeSnippets xmlns="http://schemas.microsoft.com/VisualStudio/2005/CodeSnippet">
    <CodeSnippet Format="1.0.0">
        <Header>
            <SnippetTypes>
                <SnippetType>Expansion</SnippetType>
            </SnippetTypes>
            <Title>Test Method With Exception Management</Title>
            <Shortcut>testmex</Shortcut>
            <Description>Code snippet for a test method with Exception </Description>
            <Author>Ugo Lattanzi</Author>
        </Header>
        <Snippet>
            <Imports>
                <Import>
                    <Namespace>SharpTestsEx</Namespace>
                </Import>
                <Import>
                    <Namespace>Rhino.Mocks</Namespace>
                </Import>
            </Imports>
            <References>
                <Reference>
                    <Assembly>SharpTestsEx.MSTest.dll</Assembly>
                    <Assembly>Rhino.Mocks.dll</Assembly>
                </Reference>
            </References>
            <Declarations>
                <Literal>
                    <ID>MethodName</ID>
                    <ToolTip>Replace with the name of the test method</ToolTip>
                    <Default>MethodName</Default>
                </Literal>
                <Literal>
                    <ID>StateUnderTest</ID>
                    <ToolTip>Replace with the state under test name</ToolTip>
                    <Default>StateUnderTest</Default>
                </Literal>
                <Literal>
                    <ID>ExpectedParameterName</ID>
                    <ToolTip>Replace with the expected exception parameter name</ToolTip>
                    <Default>ExpectedParameterName</Default>
                </Literal>
                <Literal>
                    <ID>ExceptionType</ID>
                    <ToolTip>Exception type</ToolTip>
                    <Function>SimpleTypeName(global::System.Exception)</Function>
                </Literal>
            </Declarations>
            <Code Language="csharp">
                <![CDATA[[TestMethod]
          public void $MethodName$_$StateUnderTest$_ShouldThrowNew$ExceptionType$()
        {
            //TODO:Arrage
            
            //TODO:Act
            
            //TODO:Assert
            ActionAssert.Throws<$ExceptionType$> ( () => something ).ParamName.Should().Be.EqualTo ( "$ExpectedParameterName$" );
          }]]>
            </Code>
        </Snippet>
    </CodeSnippet>
</CodeSnippets>
{% endhighlight %}
<p>enjoy the snippet!</p>

<p>Ciauz</p>
