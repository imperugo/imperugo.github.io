---
layout: post
status: publish
published: true
title: Installare un’applicazione Silverlight sul client via C#
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1517
wordpress_url: http://imperugo.tostring.it/blog/post/installare-un-applicazione-silverlight-sul-client-via-csharp/
date: 2010-03-01 17:00:00.000000000 +00:00
categories:
- SILVERLIGHT
tags:
- OutOfBrowser
- Silverlight
comments: true
---
<p>Nel post precedente avevo mostrato come verificare se l’applicaizone <a title="Silverlight" href="http://imperugo.tostring.it/categories/archive/Silverlight" target="_blank">Silverlight</a> fosse installata o meno sul client. L’idea di questo post è di mostrare come installare l’applicazione tramite un pulsante custom presente all’interno della pagina ed eseguire la procedura di installazione via C#.</p>  <p>Lo snippet seguente mostra l’evento OnClick del button per l’installazione:</p>  {% raw %}<pre class="brush: csharp; ruler: true;">private void InstallButton_Click(object sender, System.Windows.RoutedEventArgs e)
{
    if (!App.Current.IsRunningOutOfBrowser &amp;&amp; App.Current.InstallState == InstallState.NotInstalled)
    {
        App.Current.Install();
    }
}</pre>{% endraw %}

<p>Come avrete potuto notare, fin’ora tutte le informazioni necessarie per poter lavorare sono state esposte tramite la classe <strong><em>System.Windows.Application;</em></strong> grazie a quest’ultima, nei prossimi post si vedrà come verificare se l’applicazione è in esecuzione in fulltrust mode e, nel caso ne esista una più recente, come aggiornarla.</p>

<p>Ciauz</p>
