---
layout: post
status: publish
published: true
title: Attenzione al %20 nelle url
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1425
wordpress_url: http://imperugo.tostring.it/blog/post/attenzione-al-20-nelle-url/
date: 2011-11-02 17:15:00.000000000 +00:00
categories:
- ASP.NET
tags:
- MVC
- JQuery
- Routing
- Runtime
- ASP.NET
- Configurazione
- .NET
comments: true
---
<p>Giorni fa ho avuto a che fare con un piccolo problema riguardante le url di una mia applicazione web. In pratica mi trovavo con delle richieste verso un indirizzo tipo il seguente “<strong>/mycontroller/myaction/myid%20</strong>” (per chi non lo sapesse %20 equivale allo spazio) che, non per volere mio, restituiva sempre un <strong>404</strong> invece di dirottare la chiamata verso il mio controller.</p>  <p>Come si può ben immaginare il problema è dovuto a quel <em>%20</em> che, per qualche strano motivo, non viene digerito dal sistema di routing di <a title="ASP.NET Posts" href="http://tostring.it/tags/archive/asp.net" target="_blank">ASP.NET</a> 3.5 SP1.</p>  <p>Ovviamente un url del genere può sembrare raro in un’applicazione web, e molti di voi si chiederanno il perché di tale indirizzo, quindi provo a spiegarlo di seguito <img style="border-bottom-style: none; border-left-style: none; border-top-style: none; border-right-style: none" class="wlEmoticon wlEmoticon-smile" alt="Smile" src="http://tostring.it/UserFiles/imperugo/wlEmoticon-smile_2_13.png" />.</p>  <p>La settimana scorsa mi trovavo a sviluppare un textbox autocomplete con jquery per un’applicazione ASP.NET MVC; sfortunatamente le features richieste non erano coperte dalle migliaia di esempi presenti in rete, quindi mi sono dovuto armare di coraggio e, a colpi di javascript e json, sono riuscito a realizzare la textbox che trovate <a title="Alumni web site!" href="http://alumni.polimi.it/it/Wall" rel="nofollow" target="_blank">qui</a>.</p>  <p>All’apparenza il funzionamento è identico a quello di tutte le textbox con autocomplete. Per capire il problema sopra mostrato, non è necessario addentrarsi nel codice javascript o nel modo in cui ho implementato la textbox, ma basta capire cosa fa per mostrare i suggerimenti all’utente.</p>  <p>Nel momento in cui l’utente digita qualcosa, questo qualcosa viene inviato ad una Action di un controller MVC che non fa altro che eseguire una query con un like e restituire i primi 7 elementi. Questo vuol dire che ogni volta in cui l’utente digita una lettera all’interno della textbox, via javascript viene inviato il testo digitato per eseguire l’operazione sopra descritta.    <br />Passando alla pratica, quando l’utente digita “Mario”, una chiamata tipo la seguente “<strong>/Search/PersonSuggestion/Mario</strong>” viene effettuata.</p>  <p>Supponiamo ora di voler raffinare la ricerca in quanto troppe persone si chiamano Mario, e noi vogliamo trovare il classicissimo Mario Rossi.</p>  <p>Nel momento in cui l’utente deve aggiungere “ Rossi” (spazio Rossi), la chiamata diventa più o meno così:</p>  <p>“<strong>/Search/PersonSuggestion/Mario%20Rossi</strong>”</p>  <p>Ovviamente prima di arrivare a digitare Rossi c’è uno spazio, quindi verrà effettuata una chiamata come questa: “<strong>/Search/PersonSuggestion/Mario%20</strong>”</p>  <p>Ed eccoci arrivati al problema iniziale: il 404 da parte del server.</p>  <p>Il motivo risiede nel fatto che il runtime di ASP.NET effettua una validazione delle url in entrata, applicando le stesse regole del filesystem. Questo vuol dire che, così come non possiamo creare una folder con lo spazio alla fine (quindi “Mario “), non possiamo neanche avere un url con lo stesso spazio.</p>  <p>Ovviamente questo tipo di validazione è “aggirabile” grazie ad una proprietà dal curioso nome “RelaxedUrlToFileSystemMapping”, da aggiungere alla sezione HttpRuntime del web.config come mostrato di seguito.</p>  {% highlight xml %}
<system.web>
    <httpRuntime 
            requestValidationMode="2.0" 
            executionTimeout="20" 
            requestPathInvalidCharacters="" 
            relaxedUrlToFileSystemMapping="true" />
{% endhighlight %}
<p>Ciauz </p>
