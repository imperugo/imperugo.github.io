---
layout: post
status: publish
published: true
title: UserControl, UpdatePanel UrlRewrite, una combinazione vincente!
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1653
wordpress_url: http://imperugo.tostring.it/blog/post/usercontrol-updatepanel-urlrewrite-una-combinazione-vincente/
date: 2007-10-05 01:00:00.000000000 +01:00
categories:
- ASP.NET
tags:
- UrlRewrite
- ASP.NET
- Ajax
- Controls
comments: true
---
<p><span>&Egrave;&nbsp;un po' di tempo che non faccio post sul blog, ma oggi con <a href="http://blogs.aspitalia.com/sm15455">Stefano</a> e <a onclick="blankUrl(this.href); return false;" href="http://www.gvnn.it/">GVNN</a>, stavamo cercando di risolvere un problema in una situazione tipo la seguente: </span></p>
<p>UserControl normalissimo con all'interno un semplice UdatePanel che al click esegue delle semplici operazioni di select ed insert sul database.<br />
E fin qui nulla di particolare se non fosse per il fatto che al primo colpo veniva eseguito il codice perfettamente, mentre al secondo giro la chiamata asincrona non andava pi&ugrave; e veniva mostrato un messaggio di errore tipo il seguente:</p>
<blockquote>
<p><em>Validation of viewstate MAC failed. If this application is hosted by a Web Farm or cluster, ensure that &lt;machinekey&gt;&nbsp;configuration specifies the same validationKey and validation algorithm. AutoGenerate cannot be used in a cluster.</em></p>
</blockquote>
<p>Ovviamente sia <strong>EnableViewStateMac </strong>che <strong>ViewStateEncryptionMode</strong> sono impostati su false ed eravamo in locale quindi niente cluster.</p>
<p>Andando a guardare con fiddler le chiamate ci siamo accorti che al primo giro veniva effettuata una chiamata ad un url, mentre al secondo l'url era differente, o meglio non era pi&ugrave; il RawUrl ad essere chiamato ma l'url non riscritto da un HttpModule interno.</p>
<p>Indagando un po' pi&ugrave; a fondo ci siamo accorti che all'interno dell'evento pageLoading della classe Sys.WebForms.PageRequestManager veniva riscritto l'url da chiamare.</p>
<p>Il problema &egrave; risolvibile aggiungedo questo 4 righe di JavaScript:</p>
{% raw %}<pre title="code" class="brush: csharp">
Sys.Application.add_load(function()
{
var form = Sys.WebForms.PageRequestManager.getInstance()._form;
form._initialAction = form.action = window.location.href;
});</pre>{% endraw %}
<p>&nbsp;</p>
<p>Devo dire che ormai non mi stupisco pi&ugrave; quando trovo stranezze sul Framework Ajax 1.0 che ritengo pi&ugrave; una versione 0.8, e aggiungo questo comportamento all'elenco delle cose che spero Fixate nella prossima Release (Encoding non UTF-8, WebPart, ecc)&nbsp;del Framework ASP.NET&nbsp;AJAX.</p>
<p>Ciauz</p>
<p>&nbsp;</p>
