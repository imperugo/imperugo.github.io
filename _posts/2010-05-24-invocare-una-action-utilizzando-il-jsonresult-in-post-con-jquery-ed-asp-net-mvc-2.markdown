---
layout: post
status: publish
published: true
title: Invocare una action utilizzando il JSonResult in post con JQuery ed ASP.NET
  MVC 2
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1495
wordpress_url: http://imperugo.tostring.it/blog/post/invocare-una-action-utilizzando-il-jsonresult-post-con-jquery-ed-aspnet-mvc-2/
date: 2010-05-24 16:40:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- JQuery
- Security
- Json
comments: true
---
<p>Con la release di <a href="http://www.imperugo.tostring.it/tags/archive/mvc">ASP.NET MVC</a> 2 è stata introdotta una “breaking change”, direi corretta e necessaria, che va ad influenzare il comportamente di un JsonResult; nello specifico, la nuova release non permette di interrogare una action che restituisce le informazioni in formato JSon tramite il JSonResult se l’invocazione è stata fatta in GET anziché POST.</p>  <p>Prima di allarmarci è necessario dire che è possibile ancora invocare la Action in GET; di fatto la scritta breaking change era tra virgolette, e possiamo in qualsiasi momento ripristinare il comportamento della release precedente in questo modo:</p>  {% highlight csharp %}
public ActionResult JsonAction()
{
    return Json ( myObject, JsonRequestBehavior.AllowGet );
}
{% endhighlight %}
<p>Ovviamente in caso di upgrade alla nuova versione di MVC questo può causare un malfunzionamento della nostra applicazione, specie se questa fa forte uso di javascript per interrogare actions e popolare dinamicamente parti di HTML. 
  <br />Nonostante l’enorme supporto offerto da <a href="http://tostring.it/tags/archive/visual+studio">Visual Studio</a> 2010, spesso può risultare scomodo, o ancora peggio costoso, modificare il codice javascript per adattare la nostra applicazione al nuovo comportamento richiesto, e siamo portati a lavorare sul codice lato server anziché client. 

  <br />Prima però di effettuare queste modifiche è necessario domandarsi il perchè di questa “breaking change” e come la motivazione si rispecchia nel nostro scenario. 

  <br />Provo a spiegarmi un po’ meglio portando come esempio quanto accaduto tempo fa a Google, nello specifico Gmail, che è stato vittima di un <a href="http://jeremiahgrossman.blogspot.com/2006/01/advanced-web-attack-techniques-using.html">attacco</a> proprio in uno scenario che includeva il formato JSon e l’interrogazione dello stesso tramite javascript.</p>

<p>Non voglio star qui a spiegare nel dettaglio il tipo di attacco, ma è sufficiente sapere che è stato possibile recuperare tutto l’addressbook di un utente gmail con un semplice link mandato al suo stesso indirizzo email :). 
  <br />Direi che questo attacco, e di conseguenza la vulnerabilità riscontrata, ha fatto pendere l’ago della bilancia verso la disabilitazione della possibilità di interrogare in Get il JSonResult da parte del team di ASP.NET e lasciare così allo sviluppatore la responsabilità di esporre i propri dati verso l’esterno.</p>

<p>Ora, la prima domanda che un dev deve porsi nel momento in cui si trova a decidere se modificare tutto il javascript della sua applicazione - che abbiamo già detto richiede un maggior effort - oppure ripristinare il comportamento antecedente all’upgrade (rischiando un' eventuale “grab” delle informazioni), è una domanda di questo tipo:</p>

<p><strong><em>Sto esponendo tramite JSon informazioni sensibili?</em></strong> </p>

<p>Dovrebbe bastare a farci prendere una decisione: se la risposta è si, siamo “costretti” a dover mettere mano a tutto il nostro javascript e ad invocare le nostre Actions in POST; in caso contrario l’overload con AllowGet mostrato precedentemente può ridurre di parecchio il nostro sforzo. 
  <br />Fortunatamente, per chi usa jQuery per popolare queste informazioni all’interno delle pagine, può facilmente sostituire il codice potenzialmente vulnerabile con un qualcosa di più “robusto” che invochi le nostre Actions in POST.</p>

<p>Guardando il lato pragmatico della cosa, lo snippet seguente mostra come precedentemente recuperavamo le informazioni da una fonte dati Json:</p>

{% highlight csharp %}
$.getJSON('/Home/JsonAction', function (dr) {
    $.each(dr, function () {
        //DO SOMETHING
    });
});
{% endhighlight %}
<p>Questo sistema non è sbagliato, ma non ci permette di cambiare il “method” della richiesta. Fortunatamente il metodo getJson presente nello snippet è soltanto un overload del metodo ajax(), che ci offre un maggior numero di opzioni, alcune delle quali utili al raggiungimento del nostro scopo. </p>

<p>Di seguito si può vedere come è possibile invocare la action anche in POST:</p>

{% highlight csharp %}
$.ajax({
    type: "POST",
    url: "/Home/JsonAction,
    dataType: 'json',
    success: function (dr) {
        $.each(dr, function () {
        //DO SOMETHING
        });
    }
});
{% endhighlight %}
<p>A questo punto ci siamo tutelati da un eventuale attacco come quello di cui è stata vittima Google, ed abbiamo modificato a costo “piuttosto basso” il nostro codice javascript.</p>

<p>jQuery Rulez! 
  <br />.u</p>
