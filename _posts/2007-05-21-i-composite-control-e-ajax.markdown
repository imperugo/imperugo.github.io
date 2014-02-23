---
layout: post
status: publish
published: true
title: I composite Control e AJAX
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1654
wordpress_url: http://imperugo.tostring.it/blog/post/i-composite-control-e-ajax/
date: 2007-05-21 01:00:00.000000000 +01:00
categories:
- ASP.NET
tags:
- ASP.NET
- Controls
comments: true
---
<p><span>&egrave; un po' che volevo fare questo post, ma causa deadline vicinissima non ho avuto il tempo. </span></p>
<p>Nell'ultimo periodo ho dovuto sviluppare parecchi Custom Control ed ho fatto uso abbastanza spinto del Framework Ajax di Microsoft riscontrando anche diversi bug (e il <a href="http://blogs.aspitalia.com/sm15455/">romano</a> lo sa bene), ma mi sono imbattuto in una situazione un po' &quot;strana&quot; che non &egrave; giusto definirla bug.</p>
<p>Nel realizzare un Custom Control che ereditava da Composite Control (che a sua volta eredita da WebControl) ho avuto la necessit&agrave; di rimuovere il tag iniziale che questo mi creava, per precisione un span.<br />
Ora tramite la propriet&agrave; TagKey del WebControl era possibile specificare un tag di uscita diverso dallo span, ma a me non andava bene e non lo volevo proprio.<br />
Da qui &egrave; nata l'idea di effettuare l'override dei metodi RenderBeginTag e RenderEndTag, commetanto la chiamata al base del metodo stesso.<br />
Purtroppo questo ha scatenato un'improvvisa incompatibilit&agrave; dei miei eventi contenuti all'interno del Composite Control nei confronti del framework ajax, in quanto qualsiasi evento sollevato da un linkbutton (ma &egrave; uguale per qualsiasi altro Control) presente all'interno del mio controllo, effettua un PostBack Sincrono ignorando la propriet&agrave; ChilderAsTrigger dell'update panel impostata su true, e, anche forzando il trigger a mano il postback rimane sempre asyncrono.<br />
L'unica soluzione che ho trovato &egrave; stata quella di recuperare lo ScriptManager della pagina dal controllo e registrare a mano i controlli figli che scatenano l'evento.</p>
<p>Il codice mostra la procedura.</p>
{% raw %}<pre title="code" class="brush: csharp">
ScriptManage sm = ScriptManager.GetCurrent(Page); 
LinkButton myLinkButton = new LinkButton(); 
if(sm != null) 
{ 
 sm.RegisterAsyncPostBackControl(myLinkButton); 
}</pre>{% endraw %}
<p><span id="PostView"> </span></p>
<p>In questo modo le chiamate sono tornate asincrone.<br />
Questa operazione deve essere fatta prima del metodo PreRender, dopo di che non &egrave; pi&ugrave; possibile registrare il controllo allo ScriptManager.</p>
<p>Ora in quel periodo lavoravo molto di fretta, magari non &egrave; la soluzione migliore o il metodo migliore per rimuovere il tag dal Composite Control, ma magari se qualcuno ha avuto lo stesso problema gli faccio risparmiare del tempo :D.</p>
<p>Ciauz</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
