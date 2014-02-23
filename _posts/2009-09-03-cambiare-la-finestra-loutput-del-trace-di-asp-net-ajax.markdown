---
layout: post
status: publish
published: true
title: Cambiare la finestra l’output del Trace di ASP.NET AJAX
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1569
wordpress_url: http://imperugo.tostring.it/blog/post/cambiare-la-finestra-l%e2%80%99output-del-trace-di-aspnet-ajax/
date: 2009-09-03 09:36:06.000000000 +01:00
categories:
- ASP.NET
tags:
- Trace
- ASP.NET
- Ajax
comments: true
---
<p>Fin dalla prima versione di ASP.NET esiste la possibilit&agrave; di avere un tracciato del ciclo di vita della richiesta web, per poter monitorare e comprendere al meglio ci&ograve; che accade nella nostra applicazione web.    <br />
Personalmente lo ritengo uno strumento indispensabile quando si &egrave; nella situazione di dover lavorare su pagine web particolarmente complesse, in cui i fattori partecipanti alla costruzione dell&rsquo;output possono rendere difficile l&rsquo;individuazione di un particolare problema: proprio in questi contesti il <strong><a title="ASP.NET Trace" target="_blank" rel="nofollow" href="http://msdn.microsoft.com/en-us/library/y13fw6we(VS.71).aspx">Trace</a></strong> di <a target="_blank" rel="nofollow" href="http://www.asp.net">ASP.NET</a> pu&ograve; riverlarsi un ottimo alleato.</p>
<p>Ovviamente questo tipo di problematica si pu&ograve; riscontrare anche per tutte le pagine ricche di chiamate <a target="_blank" rel="nofollow" href="http://en.wikipedia.org/wiki/Ajax_(programming)">AJAX</a> o <a target="_blank" rel="nofollow" href="http://en.wikipedia.org/wiki/Javascript_">Javascript</a> e, per fortuna dello sviluppatore, anche in questo caso &egrave; disponibile una libreria client-side che permette di effettuare un <strong><a title="ASP.NET Trace" target="_blank" rel="nofollow" href="http://msdn.microsoft.com/en-us/library/y13fw6we(VS.71).aspx">Trace</a>&nbsp;</strong>delle chiamate.     <br />
Di fatto, in una semplice pagina <a target="_blank" rel="nofollow" href="http://www.asp.net">ASP.NET</a> in cui sia presente uno <a target="_blank" rel="nofollow" href="http://msdn.microsoft.com/it-it/library/system.web.ui.scriptmanager.aspx">ScriptManager</a> &egrave; possibile invocare l&rsquo;apposito metodo &ldquo;Sys.Debug.trace&rdquo; ed il contenuto del messaggio verr&agrave; mostrato nella finestra di output di VisualStudio.</p>
<p>Lo snippet seguente mostra l&rsquo;utilizzo del &ldquo;trace&rdquo; su semplici funzioni ajax:    <br />
&nbsp;</p>
{% raw %}<pre class="brush: xml; ruler: true;">
&lt;script language=&quot;javascript&quot; type=&quot;text/javascript&quot;&gt;
    function testMessage(param) {
        Sys.Debug.trace(Date() + &quot; - Button1 clicked&quot;);
    }
&lt;/script&gt;</pre>{% endraw %}
<p>Lo screenshot seguente mostra la finestra di Output di Visual Studio che presenta il messaggio invocato dal trace via javascript:</p>
<p><a href="http://imperugo.tostring.it/Content/Uploaded/image/8-11-2009%202-05-44%20PM_2.png" rel="shadowbox[Cambiare-la-finestra-l’output-del-Trace-di-ASPNET-AJAX];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase singlelineignorecase="" style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="8-11-2009 2-05-44 PM" border="0" alt="8-11-2009 2-05-44 PM" height="181" width="604" src="http://imperugo.tostring.it/Content/Uploaded/image/8-11-2009%202-05-44%20PM_thumb.png" /></a></p>
<p>Personalmente non ritengo molto comoda la visualizzazione dei Trace invocati tramite javascript nella finestra di output, in quanto vengono mischiati ad altre informazioni generate da Visual Studio stesso o dal compilatore. 
     <br />
Fortunatamente &egrave; possibile aggiungere, in alternativa, una textarea all&rsquo;interno della pagina web, che mostrer&agrave; tutti i <strong><a title="ASP.NET Trace" target="_blank" rel="nofollow" href="http://msdn.microsoft.com/en-us/library/y13fw6we(VS.71).aspx">Trace</a>&nbsp;</strong>client-side. Per poter sfruttare questa modalit&agrave; &egrave; necessario aggiungere una textarea all&rsquo;interno della pagina web in cui si desidera mostrare il Trace, ed il suo <strong><em>ID</em></strong> dovr&agrave; essere &ldquo;<strong><em>TraceConsole</em></strong>&rdquo;, come mostrato dallo snippet seguente:</p>
{% raw %}<pre class="brush: xml; ruler: true;">
&lt;asp:TextBox Columns=&quot;100&quot; Rows=&quot;5&quot; runat=&quot;server&quot; ID=&quot;TraceConsole&quot; TextMode=&quot;MultiLine&quot;&gt;&lt;/asp:TextBox&gt;</pre>{% endraw %}
<p>Lo screenshot seguente mostra il trace nella textarea in azione. 
     <br />
<br />
<a href="http://imperugo.tostring.it/Content/Uploaded/image/8-11-2009%202-04-41%20PM_2.png" rel="shadowbox[Cambiare-la-finestra-l’output-del-Trace-di-ASPNET-AJAX];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase singlelineignorecase="" style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="8-11-2009 2-04-41 PM" border="0" alt="8-11-2009 2-04-41 PM" height="206" width="604" src="http://imperugo.tostring.it/Content/Uploaded/image/8-11-2009%202-04-41%20PM_thumb.png" /></a></p>
<p>Ulteriori informazioni riguardarti il Trace di applicazioni web sono disponibili <a href="http://msdn.microsoft.com/en-us/library/y13fw6we%28VS.71%29.aspx">qui</a>.</p>
