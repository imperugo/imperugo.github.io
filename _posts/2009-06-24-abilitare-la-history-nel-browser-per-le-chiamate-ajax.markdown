---
layout: post
status: publish
published: true
title: Abilitare la History nel browser per le chiamate AJAX
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1615
wordpress_url: http://imperugo.tostring.it/blog/post/abilitare-la-history-nel-browser-per-le-chiamate-ajax/
date: 2009-06-24 02:27:03.000000000 +01:00
categories:
- ASP.NET
tags:
- Usabilità
- Browser
- ASP.NET
- Ajax
comments: true
---
<p>Ormai sempre pi&ugrave; applicazioni web fanno uso della tecnologia <a rel="nofollow" target="_blank" href="http://en.wikipedia.org/wiki/Ajax_(programming)">AJAX</a>, in quanto essa offre numerosi vantaggi: dall&rsquo;ottimizzazione del traffico di rete ad una maggior velocit&agrave; di navigazione. L&rsquo;uso di questa tecnologia permette s&igrave; la navigazione tra contenuti differenti senza effettuare il reload della pagina, ma purtroppo toglie usabilit&agrave; al sito, in quanto l&rsquo;utente &egrave; portato ad utilizzare il bottone <strong>Back</strong> del browser per tornare al contenuto precedente, cosa che non avviene se si sta utilizzando <strong>AJAX</strong>.</p>
<p><br />
Per risolvere questo incoveniente Microsoft ha introdotto, tramite il <strong>Service Pack 1</strong> del <strong>.NET Framework 3.5</strong>, la possibilit&agrave; di utilizzare i bottoni per la navigazione integrati con il browser per muoversi attraverso l&rsquo;hystory delle chiamate <strong>AJAX</strong>.</p>
<p>Come per ogni <a rel="nofollow" target="_blank" href="http://www.asp.net">ASP.NET</a> WebForm che utilizza AJAX, &egrave; necessario che nella pagina sia presente lo <a rel="nofollow" target="_blank" href="http://msdn.microsoft.com/it-it/library/system.web.ui.scriptmanager.aspx">ScriptManager</a>, dove si andr&agrave; ad abilitare l&rsquo;utilizzo dell&rsquo;Hystory e ad associare l&rsquo;evento che dovr&agrave; essere scatenato durante la navigazione, come mostrato di seguito:</p>
{% raw %}<pre class="brush: xml; ruler: true;">
&lt;asp:ScriptManager ID=&quot;ScriptManager1&quot; runat=&quot;server&quot; EnableHistory=&quot;True&quot; 
    onnavigate=&quot;ScriptManager1_Navigate&quot;&gt;
&lt;/asp:ScriptManager&gt;</pre>{% endraw %}
<p>Nello snippet seguente viene mostrato come aggiungere un <strong>HystoryPoint</strong>, e l&rsquo;evento che viene invocato alla pressione dei tasti <strong>Back</strong> e <strong>Forward</strong> del browser.</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
protected void GridView1_PageIndexChanged(object sender, EventArgs e)
{
    if(ScriptManager1.IsInAsyncPostBack &amp;&amp; !ScriptManager1.IsNavigating)
    {
        ScriptManager1.AddHistoryPoint(&quot;Gridview1&quot;,GridView1.PageIndex.ToString());
    }
}

protected void ScriptManager1_Navigate(object sender, HistoryEventArgs e)
{
    int pageIndex = 0;

    if(string.IsNullOrEmpty(e.State[&quot;Gridview1&quot;]))
    {
        GridView1.PageIndex = pageIndex;
    }
    else
    {
        pageIndex = int.Parse(e.State[&quot;Gridview1&quot;]);
        GridView1.PageIndex = pageIndex;

        Title = &quot;Paginda del gridview numero:&quot; + (pageIndex + 1);

    }
}</pre>{% endraw %}
<p>In questo esempio si &egrave; optato per l&rsquo;associazione degli HystoryPoint alla paginazione di un GridView, ma la stessa cosa &egrave; applicabile a qualsiasi tipo di chiamata AJAX.</p>
