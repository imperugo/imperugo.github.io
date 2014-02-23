---
layout: post
status: publish
published: true
title: SparkViewEngine Kick Off
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1486
wordpress_url: http://imperugo.tostring.it/blog/post/sparkviewengine-kick-off/
date: 2010-06-29 16:45:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- ViewEngine
- SparkViewEngine
comments: true
---
<p>Già nel post precedente avevo annunciato una serie di contenuti riguardanti <a title="SparkViewEngine" href="http://sparkviewengine.com/" rel="nofollow" target="_blank">SparkViewEngine</a>. Per approfondire l’utilizzo di questo engine ho cominciato il porting della skin del mio blog: devo dire che, man mano che lo utilizzo, rimango colpito dalla sua produttività e potenza, a partire dalle cose più semplici fino ad arrivare a funzioni un po’ più avanzate che permettono di creare delle vere e proprie funzioni e/o ottimizzazioni.</p>  <p>Per chi non abbia voglia di aspettare e voglia vedere un utilizzo un po’ più “spinto” di Spark, consiglio di dare un’occhiata al codice di <a title="Dexter Blog Engine Category" href="http://www.imperugo.tostring.it/categories/archive/Dexter" target="_blank">Dexter</a> e, nello specifico, alla cartella Themes/Fusion, dove si trova il porting della mia skin che è abbastanza ricca di html.</p>  <p>Come preannuncia il titolo, questo post ha lo scopo di mostrare come utilizzare da subito per una semplicissima applicazione SparkViewEngine, quindi configurarlo e capirne un po’ la logica.</p>  <p>Una volta scaricato il codice da <a title="SparkViewEngine Download" href="http://sparkviewengine.codeplex.com/releases/view/27601" rel="nofollow" target="_blank">qui</a>, basta referenziare le due Assembly che ne permettono l’utilizzo in <a title="ASP.NET MVC Search" href="http://www.imperugo.tostring.it/tags/archive/mvc" target="_blank">ASP.NET MVC</a>, Spark.dll e Spark.Web.Mvc.Dll e registrare il nuovo ViewEngine allo startup dell’applicativo; quindi nel global.asax.cs basta inserire il seguente codice:</p>  {% highlight csharp %}
protected void Application_Start(object sender, EventArgs e)
{
    RegisterRoutes(RouteTable.Routes);
    SparkEngineStarter.RegisterViewEngine();
}
{% endhighlight %}
<p>A questo punto l’applicazione è abile ed arruolata a sfruttare tutte le potenzialità di Spark, ma prima di scrivere un po’ di codice nella view è importante sapere che:</p>

<ul>
  <li>La struttura delle folder contenente le View è esattamente la stessa che si avrebbe senza spark. </li>

  <li>Tutti I files delle view, partial view, master, etc devono avere estensione <em>.spark</em>; </li>

  <li>All’interno della cartella <em>shared</em> normalmente va creato un file <em>“_global.spark”</em> contenente tutti i vari using ed eventuali macro necessari alla costruzione della vista; </li>

  <li>La master page di default (anch’essa presente nella cartella <em>shared</em>) si chiama “<em>Application.spark</em>”; </li>
</ul>

<p>A questo punto dovrebbe esser ben chiaro il fatto che abbiamo una cartella Views/Shared ed al suo interno abbiamo la nostra master page “Application.spark”; salvo forzature esplicite, tutte le viste erediteranno da questa master, e, se lo si vuole, resta comunque possibile specificare una master differente, ma lo vedremo più avanti.</p>

<p>Il codice seguente mostra una master page realizzata con spark:</p>

{% highlight xml %}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title><use content="title">${Model.Title}</use></title>
        <meta name="description" content="${Model.Description}" /> 
        <meta name="keywords" content="${Model.KeyWords}" /> 
        <meta name="author" content="${Model.Author}" />
        <link rel="SHORTCUT ICON" href="~/images/favicon.ico" type="image/x-icon" />
        <link type="text/css" rel="stylesheet" href="~/Styles/Site.css" />
        <script src="~/Scripts/jquery.watermark.js" type="text/javascript" language="javascript"></script>
        <script src="~/Scripts/jquery.fancybox-1.3.1.pack.js" type="text/javascript" language="javascript"></script>
    </head>
    <body>
        <use content="MainContent"></use>
        qualcosa ......
    </body>
</html>
{% endhighlight %}
<p>Come potete vedere non è presente nessun codeblock a inizio pagina e le risorse tipo css, img, etc. posso essere specificate con il prefisso tilde <strong><em>~/&#160; , </em></strong>che verrà sostituito dall’engine di spark con la root del sito o con quello che ci è più congeniale.</p>

<p>Per ora ci basta creare la nostra master page e specificare i placeholder tramite il tag Use, che andremo a riutilizzare nel vista in questo modo:</p>

{% highlight xml %}
<content name="MainContent">
    Benvenuto Spark!
</content>
{% endhighlight %}
<p>Anche qui, come potete vedere, tutti i codeblock sono spariti a vantaggio della leggibilià e del numero ridotto di righe presenti all’inteno della view (fidatevi, questo non è nulla <img style="border-bottom-style: none; border-right-style: none; border-top-style: none; border-left-style: none" class="wlEmoticon wlEmoticon-smile" alt="Smile" src="http://tostring.it/UserFiles/imperugo/wlEmoticonsmile.png" />).</p>
