---
layout: post
status: publish
published: true
title: Gestire le risorse con SparkViewEngine
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1482
wordpress_url: http://imperugo.tostring.it/blog/post/gestire-le-risorse-con-sparkviewengine/
date: 2010-07-05 16:45:00.000000000 +01:00
categories:
- ASP.NET
tags:
- ViewEngine
- SparkViewEngine
- Dexter
comments: true
---
<p>Già nel post <a title="SparkViewEngine Kick Off" href="http://tostring.it/blog/post/sparkviewengine-kick-off" target="_blank">precedente</a> ho introdotto <a title="SparkViewEngine" href="http://sparkviewengine.com/" rel="nofollow" target="_blank">SparkViewEngine</a>; in questo voglio mostrare un’interessante feature che apre diversi scenari di mantenibilità e di “servizio”, come nel caso di <a title="Dexter Blog Engine Category" href="http://www.imperugo.tostring.it/categories/archive/Dexter" target="_blank">Dexter</a> che mostrerò più avanti.</p>  <p>Sicuramente ci sarà capitato molto spesso di dover “hostare” le nostre applicazioni all’interno di una virtual directory, e magari di doverle spostare successivamente sulla root di un sito e viceversa: spesso questo risulta scomodo in quanto può comportare alcune modifiche ai percorsi dei file di risorse (immagini, css, javascript, etc). Se proviamo a guardare il lato pratico, un codice html simile a questo:</p>  {% highlight xml %}
<link type="text/css" rel="stylesheet" href="/Styles/Site.css" />
{% endhighlight %}
<p>non sarebbe più valido nel caso il sito fosse spostato all’interno di una virtual directory, e dovrebbe diventare una cosa del tipo: 
  <br />

  <br /></p>

{% highlight xml %}
<link type="text/css" rel="stylesheet" href="/MyVirtualDirectory/Styles/Site.css" />
{% endhighlight %}
<p>&#160;</p>

<p>Ovviamente il problema è risolvibile sfruttando un helper che effettua il resolve dell’url, con il conseguente svantaggio di aggiungere codice all’interno del markup, rendendo difficile un eventuale refactoring; a questo si aggiunge la perdita in leggibilità del codice html. Un’altra soluzione è far gestire i percorsi delle risorse a Spark (devo dire che lo fa egregiamente e con estrema semplicità) : in primis è necessario modificare il web.config aggiungendo la sezione di Spark, come mostrato di seguito:</p>

{% highlight xml %}
    <section name="spark" type="Spark.Configuration.SparkSectionHandler, Spark" requirePermission="false"/>
</configSections>

<spark>
    <compilation debug="false"/>
    <pages automaticEncoding="true">
        <namespaces>
            <add namespace="System" />
            <add namespace="System.Web" />
            <add namespace="System.Web.Mvc" />
            <add namespace="System.Web.Mvc.Ajax" />
            <add namespace="System.Web.Mvc.Html" />
            <add namespace="System.Web.Routing" />
            <add namespace="System.Linq" />
        </namespaces>
        <resources>
            <add match="~/Scripts" location="/Resource/Scripts" />
            <add match="~/Styles" location="/Resource/Styles" />
            <add match="~/Images" location="/Resource/Images" />
            <add match="~/Media" location="/Resource/Media" />
        </resources>
    </pages>
</spark>
{% endhighlight %}
<p>Come potete intuire la sezione resource è quella più interessante, e ci permette di specificare dove sono presenti i files delle risorse: quindi, lato view, è sufficiente utilizzare il tilde per indicare il percorso iniziale dell’applicativo, poi ci penserà spark in fase di rendering a sostituirlo con quanto specifica nel file di configurazione. 
  <br />Se proviamo a renderizzare questo codice html con i settaggi sopra specificati, il rendering finale dovrebbe essere questo: 

  <br />

  <br /></p>

{% highlight xml %}
<link type="text/css" rel="stylesheet" href="~/Styles/Site.css" />

<link type="text/css" rel="stylesheet" href="/Resouce/Styles/Site.css" />
{% endhighlight %}
<p>&#160;</p>

<p>Ovviamente questo può aprire un ulteriore scenario, ossia offrire la possibilità a chi sviluppa la parte html di utilizzare alcune CDN (google, Microsoft, etc) senza doverne conoscere il percorso; di fatto, chi vuole sviluppare una skin per dexter e vuole utilizzare la cdn di Microsoft per <a title="jQuery" href="http://tostring.it/Tags/Archive/JQuery" target="_blank">jQuery</a>, può semplicemente scrivere questo:</p>

{% highlight xml %}
<script src="~/Scripts/CDN/jQueryTools/1.2.2/jquery.tools.min.js" type="text/javascript" language="javascript"></script>
{% endhighlight %}
<p>Così facendo si può cambiare in un qualsiasi momento la CDN da utilzzare, o scegliere di hostare il file con la libreria su un proprio server. 
  <br />Di seguito riporto il blocco di configurazione di spark in dexter, che mostra le varie CDN supportate:</p>

{% highlight xml %}
<spark>
    <compilation debug="false"/>
    <pages automaticEncoding="true">
        <namespaces>
            <add namespace="System" />
            <add namespace="System.Web" />
            <add namespace="System.Web.Mvc" />
            <add namespace="System.Web.Mvc.Ajax" />
            <add namespace="System.Web.Mvc.Html" />
            <add namespace="System.Web.Routing" />
            <add namespace="System.Linq" />
            <add namespace="Dexter.Web.Site.Models.Blog" />
            <add namespace="System.Collections.Generic" />
            <add namespace="Dexter.Web.Mvc.Helpers" />
            <add namespace="Dexter.Core.Configuration" />
            <add namespace="Dexter.Core.Concrete" />
            <add namespace="Dexter.Web.Mvc.Controls" />
        </namespaces>
        <resources>
            <add match="~/Scripts/CDN/Microsoft" location="http://ajax.microsoft.com/ajax"/>                 <!-- http://www.asp.net/ajaxlibrary/cdn.ashx -->
            <add match="~/Scripts/CDN/Google" location="http://ajax.googleapis.com/ajax/libs"/>                 <!-- http://code.google.com/apis/ajaxlibs/documentation/#AjaxLibraries -->
            <add match="~/Scripts/CDN/jQueryTools" location="http://cdn.jquerytools.org"/>                    <!-- http://flowplayer.org/tools/download/index.html -->
            <add match="~/Scripts" location="~/Scripts" />
            <add match="~/Styles" location="~/Styles" />
            <add match="~/Images" location="~/Images" />
            <add match="~/Media" location="~/Media" />
        </resources>
    </pages>
</spark>
{% endhighlight %}
<p>Ciauz</p>
