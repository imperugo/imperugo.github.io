---
layout: post
status: publish
published: true
title: Il Domain Model
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1658
wordpress_url: http://imperugo.tostring.it/blog/post/il-domain-model/
date: 2006-09-07 01:00:00.000000000 +01:00
categories:
- ORM
tags:
- ORM
- .NET
- Architettura
comments: true
---
<p><span>Orami in tutte le mie applicazioni realizzo un <a onclick="blankUrl(this.href); return false;" href="http://martinfowler.com/eaacatalog/domainmodel.html"><strong>Domian Model</strong></a> sia che queste siano complesse che non. </span></p>
<p>Ora <a onclick="blankUrl(this.href); return false;" href="http://www.martinfowler.com/">Fowler</a> ci dice:</p>
<blockquote>
<p><i>An object model of the domain that incorporates both behavior and data.</i></p>
</blockquote>
<p>ed &egrave; tutto giustissimo il Domain sar&agrave; un contenitore di dati disconnesso e, nel caso avere delle implementazioni interne, ma non dovrebbe scostarsi di pi&ugrave; da ci&ograve;.</p>
<p>Un'ulteriore caratteristica che dobbiamo rispettare &egrave; che il Domain deve essere quello a prescindere dal tipo di applicazione che si andr&agrave; a realizzare (Web Application, WinForm, Mobile, ecc) e dal tipo di strato dati, che sia <a onclick="blankUrl(this.href); return false;" href="http://www.hibernate.org/343.html">NHibernate</a> o un provider custom, xml o quel che volete.</p>
<p>Detto questo mi chiedo: <br />
ma &egrave; giusto implementare nel domain l'interfaccia <strong>INotifyPropertyChanged</strong> dato che un'applicazione ASP.NET non sa che farsene, inoltre &egrave; giusto implementare <strong>Collection&lt;T&gt;</strong> per le nostre collezioni quando per un DataBinding su WinForm sarebbe pi&ugrave; giusto utilizzare <strong>BindingList&lt;T&gt;</strong>???</p>
<p>Ora dato che ogni tipo di applicazione richiede delle caratteristiche diverse per il proprio Domain forse &egrave; il caso che queste tipo di implementazioni vengano fatte nella UI dell'applicazione e non nel Domain rischiando di avere implementazioni &quot;pesanti&quot; che non verrano mai utilizzate perch&egrave; il tipo di applicazione su cui gira il Domain non le richiede.</p>
<p>Per esempio se andiamo ad analizzare <strong>BindingList&lt;T&gt;</strong> e <strong>Collection&lt;T&gt;</strong> entrambe implementano l'interfaccia <strong>IList&lt;T&gt;</strong>.</p>
<p>Quello che mi chiedo io non &egrave; il caso che nel Domain per gestire le collection si utilizzi una sintassi del tipo:</p>
<div class="codeboxheader">&nbsp;</div>
<div class="codebox">
{% raw %}<pre>
 IList roles = new List<span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">T</span><span style="color: rgb(0, 0, 255);">&gt;</span> 
</pre>{% endraw %}
</div>
<p>e l'interfaccia <strong>INotifyPropertyChanged </strong>venga implementata nel UI che la richieda e non nel Domain in modo da avere un domain &quot;perfetto&quot; per ogni tipo di applicazione??</p>
<p>Una parte di questo mio dubbio &egrave; risolvibile utilizzando un oggetto per WinForm che come dice il sito stesso:</p>
<blockquote>
<p><em>A library to facilitate DataBinding in .NET Windows.Forms.</em></p>
</blockquote>
<p>dimenticavo il <a onclick="blankUrl(this.href); return false;" href="http://sourceforge.net/projects/objectviews">Link</a>.</p>
<p>&nbsp;</p>
