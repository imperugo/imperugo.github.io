---
layout: post
status: publish
published: true
title: ClientIDMode in ASP.NET 4.0
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1540
wordpress_url: http://imperugo.tostring.it/blog/post/clientidmode-in-aspnet-40/
date: 2009-11-10 17:00:00.000000000 +00:00
categories:
- ASP.NET
tags:
- ASP.NET 4.0
comments: true
---
<p>Finalmente, dopo <a title="ASP.NET" href="http://imperugo.tostring.it/categories/archive/ASP.NET" target="_blank"></a><a title="ASP.NET MVC" href="http://imperugo.tostring.it/Categories/Archive/MVC" target="_blank">ASP.NET MVC</a>,</a> anche con le <a title="ASP.NET" href="http://imperugo.tostring.it/categories/archive/ASP.NET" target="_blank">ASP.NET</a> WebForms è possibile avere maggior controllo sul markup generato, nello specifico il controllo degli ID per i controlli runat server che, precedentemente a questa release, subivano una trasformazione in base alla loro gerarchia nell’albero dei controlli della pagina.     <br />Per esempio, in una semplice pagina in cui si abbia una Master Page con un ContentPlaceolder che continene una semplice label con un ID myLabel, si ottiene una trasformazione in NomeContentPlaceolderDellaMaster_mylabel.</p>  <p>La slide seguente chiarifica la situazione:</p>  <p><a href="http://imperugo.tostring.it/Content/Uploaded/image/aspnet4ClientIDMode001.jpg" rel="shadowbox"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="aspnet4ClientIDMode001" border="0" alt="aspnet4ClientIDMode001" src="http://imperugo.tostring.it/Content/Uploaded/image/aspnet4ClientIDMode001_thumb.jpg" width="244" height="184" /></a> </p>  <p>Ovviamente, in pagine parecchio complesse si possono avere nomi piuttosto lunghi e la loro non prevedibilità obbliga lo sviluppatore ad utilizzare degli scomodi <em>workarounds</em> per utilizzare del codice <a href="http://en.wikipedia.org/wiki/Javascript_" rel="nofollow" target="_blank">javascript</a> che interagisca con questi controlli. Ovviamente questo tipo di problema vale anche per i fogli di stile (CSS) che non possono utilizzare gli ID ma devono per forza appoggiarsi all’attributo class del tag.</p>  <p>I due snippets seguenti mostrano i <em>workarounds</em> utilizzabili prima dell’uscita di ASP.NET 4.0.</p>  {% raw %}<pre class="brush: xml; ruler: true;">#&lt;%= myLabel.ClientID %&gt;
{
    font-size: 100%;
}

&lt;script type=&quot;text/javascript&quot;&gt;
    function MyFunction()
    {
        alert(&lt;%= myLabel.ClientID %&gt;);
    }
&lt;/script&gt;</pre>{% endraw %}

<p>Fortunatamente ora è disponibile un nuovo attributo - <strong><em>ClientIDMode</em></strong> - per tutti i controlli <strong><em>runat=”server”,</em></strong> che permette di cambiare il comportamente utilizzato dall’engine di rendering (per i soli ID) indipendentemente dalla gerarchia dei controlli contenuti nella pagina.</p>

<p>Nello specifico i comportamenti disponibili sono 4:</p>

<table border="0" cellspacing="0" cellpadding="0" width="100%"><tbody>
    <tr>
      <td valign="top" width="20%"><strong>AutoID</strong></td>

      <td valign="top" width="80%">È il normale comportamente che si ha con le versioni precendenti ad ASP.NET 4.0.</td>
    </tr>

    <tr>
      <td valign="top" width="20%"><strong>Static</strong></td>

      <td valign="top" width="8%">Permette di forzare l’ID di output. Con questa opzione non avverrà nessuna trasformazione ed il valore sarà perfettamente identico a quello impostato nell’attributo ID.</td>
    </tr>

    <tr>
      <td valign="top" width="20%"><strong>Predictable</strong></td>

      <td valign="top" width="80%">Questo attributo viene utilizzato quando ci si trova in un contesto il cui il controllo contenitore è di tipo DataBoundControl, ossia quando si ha una generazione di più righe tipo in un GridView.</td>
    </tr>

    <tr>
      <td valign="top" width="20%"><strong>Inherit</strong></td>

      <td valign="top" width="80%">Indica che il CliendIDMode verrà eredito dal controllo padre.</td>
    </tr>
  </tbody></table>

<p>Personalmente ritengo molto utile questa funzionalità introdotta nella nuova versione di ASP.NET, in quanto il controllo del markup è una necessità indispensabile quando si ha l’esigenza di sviluppare applicazioni web in cui il numero di interazioni client-side (javascript) con l’utente è alto.</p>
