---
layout: post
status: publish
published: true
title: Autoconfigurare Windows Live Writer
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1515
wordpress_url: http://imperugo.tostring.it/blog/post/autoconfigurare-windows-live-writer/
date: 2010-03-03 17:40:00.000000000 +00:00
categories:
- Web Dev
tags:
- Windows Live Writer
- Configurazione
- Dexter
comments: true
---
<p>Quando il tempo necessario richiesto a fornire una determinata informazione eguaglia il tempo necessario allo sviluppo di un sistema di risposta automatico, forse è il caso di fare qualcosa :).</p>  <p>Da tale situazione è nata l’esigenza di creare un sistema che configurasse in automatico <a title="Windows Live Writer" href="http://download.live.com/writer" rel="nofollow" target="_blank">Windows Live Writer</a>. </p>  <p>In quest’ ultimo periodo, insieme agli altri <a title="Dexter Blog Engine Staff" href="http://dexterblogengine.codeplex.com/team/view" rel="nofollow" target="_blank">ragazzi</a>, abbiamo rilasciato diverse versioni di <a title="Dexter Blog Engine" href="http://dexterblogengine.codeplex.com/" rel="nofollow" target="_blank">Dexter</a> ed abbiamo lavorato in particolar modo con l’integrazione su Windows Live Writer. Questo ha causato diversi reset della configurazione di WLW da parte di tutti gli utilizzatori (in realtà ora sono solo i beta tester) che, giustamente, mi chiedevano quale API Dexter implementasse e quale fosse la sua url.</p>  <p>Da qui è nata la decisione di creare un qualcosa che fornisse automaticamente a WLW le informazioni necessarie per autoconfigurarsi.</p>  <p>Grazie ad una dritta del buon <a href="http://www.primordialcode.com/" rel="nofollow friend co-worker colleague" target="_new">Alessandro</a> ho scoperto che è possibile fare ciò tramite un file <strong><em>RSD (Really Simple Discoverability 1.0)</em></strong>, che non fa altro che esporre le informazioni necessarie dei providers implementati tramite una struttura xml.</p>  <p>La struttura seguente mostra il file del mio blog:</p>  {% raw %}<pre class="brush: xml; ruler: true;">&lt;rsd version=&quot;1.0&quot; xmlns=&quot;http://archipelago.phrasewise.com/rsd&quot;&gt;
    &lt;service&gt;
        &lt;engineName&gt;Dexter Blog Engine&lt;/engineName&gt;
        &lt;engineLink&gt;http://dexterblogengine.codeplex.com/&lt;/engineLink&gt;
        &lt;homePageLink&gt;http://tostring.it/&lt;/homePageLink&gt;
        &lt;apis&gt;
            &lt;api name=&quot;MetaWeblog&quot; blogID=&quot;1&quot; preferred=&quot;false&quot; apiLink=&quot;http://tostring.it/metaweblog.axd&quot; /&gt;
        &lt;/apis&gt;
    &lt;/service&gt;
&lt;/rsd&gt;</pre>{% endraw %}

<p>Come potete vedere è tutto piuttosto semplice, l’unica nota (oltre al dexter blog engine :P) è il nodo APIs, dove è possibile specificare le varie API esposte dal blog engine (nel mio caso solo i metaweblog API).</p>

<p>Nella home page del sito basta inserire il seguente tag ed il gioco è fatto:</p>

{% raw %}<pre class="brush: xml; ruler: true;">&lt;link rel=&quot;EditURI&quot; type=&quot;application/rsd+xml&quot; title=&quot;RSD&quot; href=&quot;http://tostring.it/MetaWeblogRsd.axd&quot; /&gt;</pre>{% endraw %}

<p>Per quanto riguarda WLW, basta configurarlo specificando la Home Page: lui effettuerà il parser del markup in ricerca dell’apposito tag e si autoconfigurerà.</p>

<p>Di Seguito alcuni screenshots sulla procedura di configurazione</p>

<p><a href="http://tostring.it/Content/Uploaded/image//imperugo/wlw_001_4.png" rel="shadowbox[wlwscreen]"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="wlw_001" border="0" alt="wlw_001" src="http://tostring.it/Content/Uploaded/image//imperugo/wlw_001_thumb_1.png" width="244" height="208" /></a>&#160; <a href="http://tostring.it/Content/Uploaded/image//imperugo/wlw_002_2.png" rel="shadowbox[wlwscreen]"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="wlw_002" border="0" alt="wlw_002" src="http://tostring.it/Content/Uploaded/image//imperugo/wlw_002_thumb.png" width="244" height="208" /></a></p>

<p>&#160;<a href="http://tostring.it/Content/Uploaded/image//imperugo/wlw_003_2.png" rel="shadowbox[wlwscreen]"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="wlw_003" border="0" alt="wlw_003" src="http://tostring.it/Content/Uploaded/image//imperugo/wlw_003_thumb.png" width="244" height="208" /></a> <a href="http://tostring.it/Content/Uploaded/image//imperugo/wlw_004_2.png" rel="shadowbox[wlwscreen]"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="wlw_004" border="0" alt="wlw_004" src="http://tostring.it/Content/Uploaded/image//imperugo/wlw_004_thumb.png" width="244" height="208" /></a> </p>

<p>Enjoy your favorite blog engine (<a title="Dexter Blog Engine" href="http://imperugo.tostring.it/Categories/Archive/Dexter" target="_blank">dexter</a>)</p>

<p>Ciauz</p>
