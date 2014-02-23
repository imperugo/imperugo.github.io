---
layout: post
status: publish
published: true
title: AOP per il Bug Fixing
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1619
wordpress_url: http://imperugo.tostring.it/blog/post/aop-per-il-bug-fixing/
date: 2009-06-22 04:26:23.000000000 +01:00
categories:
- .NET
tags:
- Windows Communication Foundation
- SpringFramework
- Configurazione
- Eventi
- Deploy
- Cache
- AOP
comments: true
---
<p>Spesso l&rsquo;utilizzo dell&rsquo;<a href="http://en.wikipedia.org/wiki/Aspect-oriented_programming" target="_blank" rel="nofollow">Aspect Oriented Programming</a> (<strong>AOP</strong>) viene associato alla parte di <strong>Logging</strong>, e rarissimamente alla parte di <strong>Business</strong> di un&rsquo;applicazione; ovviamente il suo campo d'azione &egrave; ben pi&ugrave; grande e, giusto la scorsa settimana, mi &egrave; capitato di utilizzare l&rsquo;<strong>AOP</strong> per effettuare del <strong>Bug Fixing</strong> su un servizio <strong>WCF</strong> fornitomi da un&rsquo;azienda esterna.</p>
<p>In una sessione insieme a <a href="http://blogs.aspitalia.com/sm15455/" target="_blank" rel="nofollow">Stefano</a> mostrai l&rsquo;approccio utilizzato in <a href="http://www.mtv.it" target="_blank" rel="nofollow">MTV.it</a> per la parte di <strong>Logging</strong> e di <strong>Rewarding</strong> nei servizi <strong>WCF</strong>; affrontammo cos&igrave; come utilizzare <strong>AOP</strong> anche per la parte di business dell&rsquo;applicazione e, sempre nella stessa sessione, mostrammo come realizzare un Custom Behaviour per WCF che permettesse di utilizzare l&rsquo;AOP senza la necessit&agrave; di ricompilare il servizio.</p>
<p>Come accennato sopra, proprio la scorsa settimana ho avuto dei problemi con un servizio WCF realizzato da una ditta fornitrice esterna che, nell&rsquo;invocazione di un determinato metodo, non invalidava la cache, causando cos&igrave; un&rsquo;incongruenza di dati tra tutte quelle applicazioni che accedevano allo stesso repository di Cache.</p>
<p>Purtroppo, non avendo il codice sorgente n&eacute; la possibilit&agrave; di effettuare un deploy in tutti i server, l&rsquo;unica soluzione indolore che mi &egrave; venuta in mente &egrave; stata quella di realizzare un&rsquo;interceptor per <a href="http://www.springframework.net/" target="_blank" rel="nofollow">SpringFramework</a> ed invalidare la cache tramite AOP.</p>
<p>Con 10 righe di codice per l&rsquo;interceptor e altre 10 nel file di configurazione del servizio, il bug &egrave; stato risolto. <br />
Tutto questo a dimostrazione del fatto che l&rsquo;utilizzo dell&rsquo;AOP pu&ograve; andare ben oltre il semplice Logging applicativo, e che spesso pu&ograve; far risparmiare parecchio tempo in fase di sviluppo e bug fixing.</p>
<p>Ciauz</p>
