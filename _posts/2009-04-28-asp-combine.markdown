---
layout: post
status: publish
published: true
title: ASP Combine
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1637
wordpress_url: http://imperugo.tostring.it/blog/post/asp-combine/
date: 2009-04-28 05:42:10.000000000 +01:00
categories:
- ASP.NET
tags:
- ASP.NET
- .NET
- Deploy
- Ajax
comments: true
---
<p>Con l&rsquo;uscita del <strong>Service Pack 1</strong> per il <strong>.NET Framework 3.5</strong> &egrave; stata introdotta una nuova ed utilissima funzionalit&agrave; che permette di ridurre il numero di chiamate verso file Javascript effettuate dal browser verso il server, ottimizzando cos&igrave; il traffico e le performance della pagina.    <br />
Ormai si fa sempre pi&ugrave; uso di <strong>Javascript</strong>, che siano queste semplici chiamate <strong>AJAX</strong> o complesse animazioni, ed il numero di librerie esistenti (<a target="_blank" href="http://jquery.com/">JQuery</a>, <a target="_blank" href="http://www.shadowbox-js.com/">ShadowBox</a>, <a target="_blank" href="http://www.prototypejs.org/">Prototype</a>, ecc) ci impone di aggiungere reference continue alle nostre pagine, riducendone cos&igrave; le performance ed aumentado il traffico di rete.    <br />
Una soluzione consiste nel riunire tutti i file Javascript in un unico file, riducendo cos&igrave; il numero di chiamate dal browser verso il server.    <br />
Si provi ad immaginare la situazione in cui la nostra pagina web abbia le seguenti reference javascript</p>
{% raw %}<pre class="brush: xml; ruler: true;">
&lt;script src=&quot;Scripts/jquery-1.3.2.min.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;Scripts/shadowbox.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;Scripts/jquery.validate.min.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;Scripts/customFunction.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;Scripts/jquery.cookie.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;Scripts/jquery.delegate-1.1.min.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;Scripts/MicrosoftMvcAjax.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;Scripts/shadowbox-jquery.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;</pre>{% endraw %}
<p>Come si pu&ograve; vedere si hanno ben 8 file Javascript e, se nella stessa pagina &egrave; presente anche lo <strong>Script Manager di ASP.NET AJAX</strong>, il numero sale fino a 11, come mostrato dallo screenshot seguente:</p>
<p><a rel="shadowbox[ASP-Combine];options={counterType:'skip',continuous:true,animSequence:'sync'}" href="http://imperugo.tostring.it/Content/Uploaded/image/old22-04-2009%2021.04_2.png"><img singleline="" title="old22-04-2009 21.04" style="border-right: 0px; border-top: 0px; display: inline; border-left: 0px; border-bottom: 0px" height="180" alt="old22-04-2009 21.04" width="554" border="0" src="http://imperugo.tostring.it/Content/Uploaded/image/old22-04-2009%2021.04_thumb.png" /></a></p>
<p>Per ottimizzare le chiamate nello script manager &egrave; stata aggiunta una nuova sezione (CompisiteScript) che offre la possibilit&agrave; di specificare tutti i file Javascript che devono essere accorpati in un unico file, come mostrato dallo snippet seguente:</p>
{% raw %}<pre class="brush: xml; ruler: true;">
&lt;asp:ScriptManager ID=&quot;sm&quot; runat=&quot;server&quot; ScriptMode=&quot;Release&quot; CompositeScript-ScriptMode=&quot;Release&quot;&gt;
    &lt;CompositeScript&gt;
        &lt;Scripts&gt;
            &lt;asp:ScriptReference Path=&quot;Scripts/jquery-1.3.2.min.js&quot; /&gt;
            &lt;asp:ScriptReference Path=&quot;Scripts/shadowbox.js&quot; /&gt;
            &lt;asp:ScriptReference Path=&quot;Scripts/jquery.validate.min.js&quot; /&gt;
            &lt;asp:ScriptReference Path=&quot;Scripts/customFunction.js&quot;  /&gt;
            &lt;asp:ScriptReference Path=&quot;Scripts/jquery.cookie.js&quot; /&gt;
            &lt;asp:ScriptReference Path=&quot;Scripts/jquery.delegate-1.1.min.js&quot; /&gt;
            &lt;asp:ScriptReference Path=&quot;Scripts/MicrosoftMvcAjax.js&quot; /&gt;
            &lt;asp:ScriptReference Path=&quot;Scripts/shadowbox-jquery.js&quot;  /&gt;
        &lt;/Scripts&gt;
    &lt;/CompositeScript&gt;
&lt;/asp:ScriptManager&gt;</pre>{% endraw %}
<p>Questo permette di ridurre pesantemente le chiamate del browser da 11 a 5 (4 dello script manager ed 1 per tutti i file sopra specificati), come mostrato qui di seguito.</p>
<p>&nbsp;<a rel="shadowbox[ASP-Combine];options={counterType:'skip',continuous:true,animSequence:'sync'}" href="http://imperugo.tostring.it/Content/Uploaded/image/22-04-2009%2021.21_2.png"><img singleline="" title="22-04-2009 21.21" style="border-right: 0px; border-top: 0px; display: inline; border-left: 0px; border-bottom: 0px" height="96" alt="22-04-2009 21.21" width="554" border="0" src="http://imperugo.tostring.it/Content/Uploaded/image/22-04-2009%2021.21_thumb.png" /></a></p>
<p>Anche se il test &egrave; stato effettuato su una macchina di sviluppo e non in una condizione reale, si pu&ograve; gia notare come il tempo di esecuzione della pagina si sia ridotto da 12.77 secondi a 5.44 secondi, come mostrato dall&rsquo;immagine seguente:</p>
<p><a rel="shadowbox[ASP-Combine];options={counterType:'skip',continuous:true,animSequence:'sync'}" href="http://imperugo.tostring.it/Content/Uploaded/image/22-04-2009%2021.04_2.png"><img singleline="" title="22-04-2009 21.04" style="border-right: 0px; border-top: 0px; display: inline; border-left: 0px; border-bottom: 0px" height="75" alt="22-04-2009 21.04" width="554" border="0" src="http://imperugo.tostring.it/Content/Uploaded/image/22-04-2009%2021.04_thumb.png" /></a></p>
<p>Ovviamente il tutto pu&ograve; essere impostato anche lato <strong>Object Oriented</strong>, eliminando per&ograve; la possibilit&agrave; di effettuare cambiamenti a runtime.</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
sm.CompositeScript.Scripts.Add(new ScriptReference(&quot;Scripts/jquery-1.3.2.min.js&quot;));
sm.CompositeScript.Scripts.Add(new ScriptReference(&quot;Scripts/shadowbox.js&quot;));
sm.CompositeScript.Scripts.Add(new ScriptReference(&quot;Scripts/jquery.validate.min.js&quot;));
sm.CompositeScript.Scripts.Add(new ScriptReference(&quot;Scripts/customFunction.js&quot;));
sm.CompositeScript.Scripts.Add(new ScriptReference(&quot;Scripts/jquery.cookie.js&quot;));
sm.CompositeScript.Scripts.Add(new ScriptReference(&quot;Scripts/jquery.delegate-1.1.min.js&quot;));
sm.CompositeScript.Scripts.Add(new ScriptReference(&quot;Scripts/MicrosoftMvcAjax.js&quot;));sm.CompositeScript.Scripts.Add(new ScriptReference(&quot;Scripts/shadowbox-jquery.js&quot;));</pre>{% endraw %}
<p>Successivamente si vedr&agrave; come implementare lo stesso tipo di ottimizzazione in un&rsquo;applicativo che fa uso del nuovo framework <strong>ASP.NET MVC</strong>, andando a migliorare l&rsquo;output dei file javascript.</p>
