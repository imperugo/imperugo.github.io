---
layout: post
status: publish
published: true
title: Utilizzare l’AntiXss Library per l’AutoEncode di ASP.NET / MVC2 con il .NET
  Framework 4.0
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1506
wordpress_url: http://imperugo.tostring.it/blog/post/utilizzare-antixss-library-autoencode-di-aspnet-mvc2-con-il-net-framework-4/
date: 2010-04-12 16:50:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- Security
- ASP.NET 4.0
comments: true
---
<p>Con il <a title=".NET Framework 4.0" href="http://imperugo.tostring.it/tags/archive/.net+framework+4.0" target="_blank">.NET Framework 4.0</a> è stato introdotto l’AutoEncode per i codeblocks di <a title="ASP.NET" href="http://imperugo.tostring.it/categories/archive/ASP.NET" target="_blank">ASP.NET</a>/<a title="Category: MVC" href="http://tostring.it/Categories/Archive/MVC" target="_blank">MVC</a>, come già detto <a title="AutoEncode in ASP.NET 4.0" href="http://tostring.it/blog/post/autoencode-in-aspnet-40" target="_blank">qui</a>; proprio in quel post concludevo dicendo:</p>  <blockquote>   <p>Sarebbe bello poter specificare un provider per cambiare il sistema di encoding, e magari anche sostituire l’HtmlEncode della classe HttpUtility con quello della Anti-XSS.</p> </blockquote>  <p>ed ho scoperto da poco che la cosa è realmente fattibile.</p>  <p>Per realizzare ciò il lavoro è piuttosto semplice, sono sufficienti pochi passaggi per poter estendere l’HtmlEncode offerto dalla classe <a title="HttpUtility Calss" href="http://msdn.microsoft.com/en-us/library/system.web.httputility.aspx" rel="nofollow" target="_blank">HttpUtility</a> con quello più affidabile offerto dalla AntiXss Library.</p>  <p>Per prima cosa è necessario creare una classe che eredita da <em>System.Web.Util.HttpEncoder</em> e che effettua l’override degli opportuni metodi, sostituendo ed implementando l’HtmlEnoding con l’AntiXss Library, come mostrato di seguito:</p>  {% raw %}<pre class="brush: csharp; ruler: true;">public class AutoEncodeWithAntiXss : HttpEncoder
{
    protected override void HtmlEncode(string value, TextWriter output)
    {
        output.Write(AntiXss.HtmlEncode(value));
    }

    protected override void HtmlAttributeEncode(string value, TextWriter output)
    {
        output.Write(AntiXss.HtmlAttributeEncode(value));
    }
}</pre>{% endraw %}

<p>Come ultimo step è necessario registrare la nostra classe nel web.config e, dal quel momento in poi, tutto ciò che utilizza l’autoencode introdotto con ASP.NET 4.0 utilizzerà la nostra classe.</p>

{% raw %}<pre class="brush: xml; ruler: true;">&lt;system.web&gt;
    &lt;httpRuntime encoderType=&quot;Imperugo.Web.Test.AutoEncode.AntiXSS.AutoEncodeWithAntiXss, Imperugo.Web.Test.AutoEncode.AntiXSS&quot;/&gt;</pre>{% endraw %}

<p>La classe <em>System.Web.Util.HttpEncoder</em> permette di effettuare l’ovveride di altri metodi, come l’HtmlDecode, ma l’AntiXss Library non supporta l’HtmlDecode; per questo motivo non è stato effettuato l’override. </p>

<p>Ciauz</p>
