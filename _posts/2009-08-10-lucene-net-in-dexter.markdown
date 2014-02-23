---
layout: post
status: publish
published: true
title: Lucene.Net in Dexter
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1579
wordpress_url: http://imperugo.tostring.it/blog/post/lucenenet-in-dexter/
date: 2009-08-10 20:19:40.000000000 +01:00
categories:
- Various
tags:
- Various
comments: true
---
<p>
	La settimana scorsa parlavo con <a href="http://codeclimber.net.nz/default.aspx" rel="nofollow friend met co-worker colleague" target="_new" title="Simone Chiaretta's Blog">Simone</a> (<a href="http://codeclimber.net.nz/archive/2009/08/03/reducing-the-bounce-rate-of-tech-blogs-with-subtext-and.aspx" rel="nofollow" target="_blank" title="Reducing the bounce rate of tech blogs with subtext and">qui</a> trovate un suo post a riguardo) della possibilit&agrave; di integrare il motore di <a href="http://incubator.apache.org/lucene.net/" rel="nofollow" target="_blank" title="Lucene.Net project">Lucence.Net</a> come search provier per il proprio blog engine (sia io che <a href="http://codeclimber.net.nz/default.aspx" rel="nofollow friend met co-worker colleague" target="_new" title="Simone Chiaretta's Blog">Simone</a> siamo dev su due progetti differenti di BlogEngine). <br />
	Per chi non lo conoscesse <a href="http://incubator.apache.org/lucene.net/" rel="nofollow" target="_blank" title="Lucene.Net project">Lucence.Net</a> &egrave; il porting di un gi&agrave; ben noto Framework, presente nel mondo <a href="http://www.java.com/en/" rel="nofollow" target="_blank" title="Java Official Site">Java</a> da diversi anni, che permette di effettuare ricerche <a href="http://en.wikipedia.org/wiki/Full-text" target="_blank">full-text</a> su un database proprietario basato su filesystem qiundi senza la necessit&agrave; di dover installare nulla sul server. <br />
	Gi&agrave; in passato avevo avuto modo di utilizzarlo (vedi <a href="http://imperugo.tostring.it/Blog/Post/Ricerca-all-interno-dei-documenti">qui</a> e <a href="http://imperugo.tostring.it/Blog/Post/Ricerca-all-interno-dei-documenti-Parte-2">qui</a>), ma devo dire che l&rsquo;ultima versione &egrave; parecchio migliorata in stabilit&agrave; (la versione precedente al subentro di <a href="http://www.jboss.org/">JBoss</a> lamentava problemi di integrit&agrave; del database). <br />
	La cosa brillante di questo Framework risiede nella sua velocit&agrave; di ricerca a dir poco impressionate, come mostrato dallo screenshot seguente:</p>
<p>
	<a href="http://imperugo.tostring.it/Content/Uploaded/image/8-9-2009%201-32-16%20PM_2.png" rel="shadowbox[LuceneNet-in-Dexter];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img alt="8-9-2009 1-32-16 PM" border="0" height="275" singlelineignorecase="" src="http://imperugo.tostring.it/Content/Uploaded/image/8-9-2009%201-32-16%20PM_thumb.png" style="border: 0px none ; display: inline;" title="8-9-2009 1-32-16 PM" width="584" /></a></p>
<p>
	Oltre alla velocit&agrave; di ricerca, ci sono diverse features che lo rendono appetibile, come la possibilit&agrave; di avere un &ldquo;<strong>Did you mean</strong>&rdquo; stile <a href="http://www.google.com" rel="nofollow" target="_blank" title="Google">google</a>, gli Analyzer personalizzati per la lingua (es: cercando persona vengono cercati anche i termini comuni tipo persone) e la possibilit&agrave; di effettuare ricerche per similarit&agrave;, ossia creare una correlazione tra i contenuti.</p>
<p>
	<a href="http://imperugo.tostring.it/Content/Uploaded/image/8-10-2009%206-10-37%20PM_2.png" rel="shadowbox[LuceneNet-in-Dexter];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img alt="8-10-2009 6-10-37 PM" border="0" height="342" singlelineignorecase="" src="http://imperugo.tostring.it/Content/Uploaded/image/8-10-2009%206-10-37%20PM_thumb.png" style="border: 0px none ; display: inline;" title="8-10-2009 6-10-37 PM" width="584" /></a></p>
<p>
	Come potete vedere dagli screenshot precedenti, la prossima build di <a href="http://imperugo.tostring.it/About/Dexter" target="_blank" title="Dexter Blog Engine">Dexter</a> implementa gi&agrave; <a href="http://incubator.apache.org/lucene.net/" rel="nofollow" target="_blank" title="Lucene.Net project">Lucence.Net</a> v.2.4 sia come search engine che come correlatore di contenuti. <br />
	<br />
	Purtroppo questo Framework &egrave; molto scarso dal lato della documentazione, sia per il porting .NET che per la versione Java, il che mi fa apprezzare ancor di pi&ugrave; gli sforzi realizzati da <a href="http://www.microsoft.com" rel="nofollow" target="_blank" title="Microsoft Corporation">Microsoft</a> e da tutte le altre organizzazioni, che compiono per fornire agli sviluppatori una documentazione adeguata. <br />
	Speriamo che anche per Lucence si sforzino un po&rsquo; di pi&ugrave;.</p>
<p>
	Ciauz</p>
