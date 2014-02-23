---
layout: post
status: publish
published: true
title: Visual Studio e le varie tipologi di progetti.
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1460
wordpress_url: http://imperugo.tostring.it/blog/post/visual-studio-e-le-varie-tipologi-di-progetti/
date: 2011-01-28 17:30:00.000000000 +00:00
categories:
- .NET
tags:
- MVC
- Visual Studio
- Visual Studio 2010
- ASP.NET
comments: true
---
<p>In quest’ultimo periodo sto lavorando parecchio su <a title="Dexter Blog Engine Official Site" href="http://dexterblogengine.com/" target="_blank">Dexter</a> e sto migrando parte del codice all’ultima release di <a title="ASP.NET MVC Posts" href="http://www.tostring.it/tags/archive/mvc" target="_blank">ASP.NET MVC</a>. Tra le varie branch, merge, update, etc, mi è capitato che il progetto web non fosse più “riconosciuto” da <a title="http://www.tostring.it/tags/archive/visual+studio" href="http://www.tostring.it/categories/archive/mvc/" target="_blank">Visual Studio</a> come un progetto MVC, con la scomoda conseguenza che i menù contestuali non mi offrivano più le funzioni di <em>AddView</em>, <em>AddArea</em>, etc.</p>  <p>Nulla di grave, ma avere la possibilità di aggiungere una View direttamente dal controller nell’esatta cartella (il tutto con un solo click) è piuttosto comodo.    <br />Ovviamente il problema era sicuramente nel file .<em><strong>csproj</strong></em>, si trattava solo di capire cosa mancava per riattivare gli “aiuti” di Visual Studio per MVC.     <br />Per comprendere cosa andare a toccare all’interno del file di progetto, ne ho creato uno nuovo da VS e sono andato a correggere a mano il file .csproj </p>  <p>A questo punto è entrato in gioco <a title="WinMerge&#39;s Office Site" href="http://winmerge.org/" rel="nofollow" target="_blank">WinMerge</a>, con cui sono andato a confrontare i due file e mi sono accorto che un nodo dell’xml è diverso tra i due. Nello specifico si trattava del nodo &lt;ProjectTypeGuids&gt; che contiene una serie di guid separati dalla virgola che hanno lo scopo di descrivere a Visual Studio la tipologia, il liguanggio e l’output del progetto.     <br />Trattandosi la mia applicazione di un WAP (Web Application Project) fatto con ASP.NET MVC 3 e scritto in C#, il contenuto di questo tag deve essere così:</p>  {% highlight xml %}
<ProjectTypeGuids>{E53F8FEA-EAE0-44A6-8774-FFD645390401};{349c5851-65df-11da-9384-00065b846f21};{fae04ec0-301f-11d3-bf4b-00c04f79efbc}</ProjectTypeGuids>
{% endhighlight %}
<p>Per sapere il significato di ogni GUID riporto qui una tabella che ho creato dopo un po’ di ricerche in rete:</p>

<table border="0" cellspacing="0" cellpadding="2" width="645"><tbody>
    <tr>
      <td valign="top" width="153"><em>Windows (C#)</em></td>

      <td valign="top" width="490"><em>{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}</em></td>
    </tr>

    <tr>
      <td valign="top" width="153"><em>Windows (VB.NET)</em></td>

      <td valign="top" width="490"><em>{F184B08F-C81C-45F6-A57F-5ABD9991F28F}</em></td>
    </tr>

    <tr>
      <td valign="top" width="153"><em>Windows (Visual C++)</em></td>

      <td valign="top" width="490"><em>{8BC9CEB8-8B4A-11D0-8D11-00A0C91BC942}</em></td>
    </tr>

    <tr>
      <td valign="top" width="153"><em>Web Application</em></td>

      <td valign="top" width="490"><em>{349C5851-65DF-11DA-9384-00065B846F21}</em></td>
    </tr>

    <tr>
      <td valign="top" width="153"><em>Web Site</em></td>

      <td valign="top" width="490"><em>{E24C65DC-7377-472B-9ABA-BC803B73C61A}</em></td>
    </tr>

    <tr>
      <td valign="top" width="153"><em>ASP.NET MVC 3</em></td>

      <td valign="top" width="490"><em>{E53F8FEA-EAE0-44A6-8774-FFD645390401}</em></td>
    </tr>

    <tr>
      <td valign="top" width="153"><em>WCF</em></td>

      <td valign="top" width="490"><em>{3D9AD99F-2412-4246-B90B-4EAA41C64699}</em></td>
    </tr>

    <tr>
      <td valign="top" width="153"><em>WPF</em></td>

      <td valign="top" width="490"><em>{60DC8134-EBA5-43B8-BCC9-BB4BC16C2548}</em></td>
    </tr>

    <tr>
      <td valign="top" width="153"><em>XNA (Windows)</em></td>

      <td valign="top" width="490"><em>{6D335F3A-9D43-41b4-9D22-F6F17C4BE596}</em></td>
    </tr>

    <tr>
      <td valign="top" width="153"><em>XNA (XBox) </em></td>

      <td valign="top" width="490"><em>{2DF5C3F4-5A5F-47a9-8E94-23B4456F55E2}</em></td>
    </tr>

    <tr>
      <td valign="top" width="153"><em>XNA (Zune) </em></td>

      <td valign="top" width="490"><em>{D399B71A-8929-442a-A9AC-8BEC78BB2433}</em></td>
    </tr>

    <tr>
      <td valign="top" width="153"><em>Silverlight </em></td>

      <td valign="top" width="490"><em>{A1591282-1198-4647-A2B1-27E5FF5F6F3B}</em></td>
    </tr>
  </tbody></table>

<p>Come potete vedere la parte riguardante MVC è <strong>{E53F8FEA-EAE0-44A6-8774-FFD645390401}</strong>: una volta reinserito questo GUID all’interno del mio file .csproj tutto è tornato a funzionare per il meglio.</p>

<p>Ciauz</p>
