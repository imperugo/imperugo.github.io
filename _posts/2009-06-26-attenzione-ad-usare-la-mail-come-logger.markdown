---
layout: post
status: publish
published: true
title: Attenzione ad usare la mail come Logger
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1613
wordpress_url: http://imperugo.tostring.it/blog/post/attenzione-ad-usare-la-mail-come-logger/
date: 2009-06-26 03:13:51.000000000 +01:00
categories:
- Various
tags:
- MailMessage
- SMTP
- .NET
- Exception
comments: true
---
<p>Spesso si utilizza la mail come <strong>Log per tutti quegli errori di cui si ha l&rsquo;esigenza di avere una notifica nell&rsquo;immediato</strong>; un esempio potrebbe riguardare tutte le eccezioni che impediscono l&rsquo;utilizzo dell&rsquo;applicazione da parte degli utenti.</p>
<p>Anche se pu&ograve; sembrare un&rsquo;operazione piuttosto semplice quella di inviare un&rsquo;eccezione via mail, bisogna ugualmente <strong>prestare attenzione</strong> in tutti quei casi in cui si utilizza la propriet&agrave; <em>Message</em> dell&rsquo;eccezione come <em>Subject</em> della mail; lo script seguente chiarisce la situazione.</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
MailMessage message = new MailMessage();
message.Subject = exc.Message;
...</pre>{% endraw %}
<p>Un approccio di questo tipo vi pu&ograve; portare incontro ad un&rsquo;eccezione come la seguente:</p>
<blockquote>
<p>ArgumentException: The specified string is not in the form required for a subject</p>
</blockquote>
<p>Il problema &egrave; dovuto al fatto che il contenuto della propriet&agrave; <em>Message</em> pu&ograve; contente una nuova linea, quindi <em>&ldquo;\r\n&rdquo;, </em>che genera un errore nel metodo <em>Send</em> come spiegato <a rel="nofollow" target="_blank" href="http://blog.dotsmart.net/2008/02/15/systemnetmail-the-specified-string-is-not-in-the-form-required-for-a-subject/">qui</a>.</p>
<p>La soluzione consiste nell&rsquo;effettuare il replace delle stringhe non consentite con uno spazio vuoto, come mostrato di seguito:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
MailMessage message = new MailMessage();
message.Subject = exc.Message.Replace(&quot;\r&quot;, &quot; &quot;).Replace(&quot;\n&quot;, &quot; &quot;);
...</pre>{% endraw %}
<p>Ciauz</p>
