---
layout: post
status: publish
published: true
title: Verificare se l’applicazione Silverlight in esecuzione è in FullTrust
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1516
wordpress_url: http://imperugo.tostring.it/blog/post/verificare-se-l-applicazione-silverlight-in-esecuzione-%c3%a8-in-fulltrust-mode/
date: 2010-03-02 17:00:00.000000000 +00:00
categories:
- SILVERLIGHT
tags:
- OutOfBrowser
- Silverlight
- FullTrust
comments: true
---
<p><a title="Silverlight" href="http://imperugo.tostring.it/categories/archive/Silverlight" target="_blank">Silverlight</a> 4 ha introdotto la possibilità di eseguire operazioni in <em><strong>OutOfBrowser</strong></em> anche in <em><strong>FullTrustMode</strong></em>. Inutile dire che questa è una delle features più interessanti della prossima release di SIlverlight, in quanto ci permette di poter accedere a risorse precedentemente non accessibili come Fotocamere, Hard Drives, Office Documents, etc.</p>  <p>Ovviamente però, oltre a specificare che l’applicazione richiede permessi elevati, è necessario che l’utente autorizzi l’applicazione ad eseguire operazioni anche fuori dalla propria sandbox. Dato che non c’è certezza che l’utente approvi o no tali operazioni è sicuaramente utile capire da codice se ciò è avvenuto e, nel caso, cambiare il comportamento dell’applicazione e/o gestirne eventuali errori.</p>  <p>Come prima cosa è necessario specificare che l’applicazione richiede permessi elevati; questo è possibile dalla finestra delle proprietà del progetto, come mostrato dallo screenshot seguente:</p>  <p><a href="http://tostring.it/Content/Uploaded/image//imperugo/Silverlight_OOB_FullTrust1_5.png" rel="shadowbox"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="Silverlight_OOB_FullTrust1" border="0" alt="Silverlight_OOB_FullTrust1" src="http://tostring.it/Content/Uploaded/image//imperugo/Silverlight_OOB_FullTrust1_thumb_1.png" width="200" height="244" /></a> </p>  <p>Per la parte codice ci basta verificare tramite l’apposità proprietà se l’utente ha acconsentito il FullTrust mode, come mostrato nello snippet seguente:</p>  {% raw %}<pre class="brush: csharp; ruler: true;">if(!App.Current.HasElevatedPermissions)
    MessageBox.Show(&quot;You have to accept the Full Trust Mode!&quot;);</pre>{% endraw %}

<p>Ciauz</p>
