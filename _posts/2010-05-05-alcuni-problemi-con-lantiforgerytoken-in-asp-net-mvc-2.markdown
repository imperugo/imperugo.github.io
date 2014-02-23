---
layout: post
status: publish
published: true
title: Alcuni problemi con l’AntiForgeryToken in ASP.NET MVC 2
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1504
wordpress_url: http://imperugo.tostring.it/blog/post/alcuni-problemi-con-lantiforgerytoken-aspnet-mvc-2/
date: 2010-05-05 16:37:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- Security
- Exception
- Farm
comments: true
---
<p>È un po’ che ho “in canna” questo post, ma l’ultimo periodo è stato veramente intenso e non mi ha concesso molto tempo per poter postare.</p>  <p>L’argomento in questione è l’utilizzo dell’attributo (o l’helper) AntiForgeryToken sul porting di applicazioni MVC2, che può causare non pochi problemi in fase di deploy di applicazioni distribuite.</p>  <p>Nello specifico si rischia di incappare in una serie di errori 500 come quello mostrato di seguito:</p>  {% raw %}<pre class="brush: csharp; ruler: true;">[InvalidCastException: Unable to cast object of type 'System.Web.UI.Triplet' to type 'System.Object[]'.]
   System.Web.Mvc.AntiForgeryDataSerializer.Deserialize(String serializedToken) +104

[HttpAntiForgeryException (0x80004005): A required anti-forgery token was not supplied or was invalid.]
   System.Web.Mvc.AntiForgeryDataSerializer.Deserialize(String serializedToken) +368
   System.Web.Mvc.HtmlHelper.GetAntiForgeryTokenAndSetCookie(String salt, String domain, String path) +209
   System.Web.Mvc.HtmlHelper.AntiForgeryToken(String salt, String domain, String path) +16
   System.Web.Mvc.HtmlHelper.AntiForgeryToken() +10
  &lt;snip&gt;</pre>{% endraw %}

<p>L’eccezione si verifica su tutti gli utenti collegati; ma facciamo un passo indietro e cerchiamo di capire quali fattori possono determinare un problema di questo genere.</p>

<p>Per prima cosa il problema si riscontra solo su applicazioni che sono state aggiornate alla versione 2 di <a title="ASP.NET MVC" href="http://imperugo.tostring.it/Categories/Archive/MVC" target="_blank">ASP.NET MVC</a> (quelle nate da questa versione rimangono estranee al problema) e, nello specifico, in una farm in cui non tutte le applicazioni sono state aggiornate -(quindi una situazione ibrida, stessa applicazione ma su alcuni server in MVC1 e su alcuni su MVC2); per complicare la situazione, e nel caso replicarla, è necessario che il balancer in fronte ai server web sia configurato in Round Robin, e che quindi l’utente, ad ogni richiesta, possa esser rimbalzato da un server ad un altro.</p>

<p>Come potete vedere la casistica è molto ristretta, ma la fortuna sicuramente non è dalla mia parte ed ovviamente ci sono incappato in pieno.</p>

<p>In questo <a title="Beware: Upgrade to ASP.NET MVC 2.0 with care if you use AntiForgeryToken" href="http://weblogs.asp.net/james_crowley/archive/2010/03/18/beware-upgrade-to-asp-net-mvc-2-0-with-care-if-you-use-antiforgerytoken.aspx" rel="nofollow" target="_blank">post</a> <a title="James Crowley&#39;s blog" href="http://weblogs.asp.net/james_crowley/default.aspx" rel="nofollow" target="_blank">James Crowley</a> spiega nel dettaglio la problematica.</p>

<p>Be careful! 
  <br />Ciauz</p>
