---
layout: post
status: publish
published: true
title: Il TempDataProvider di ASP.NET MVC
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1633
wordpress_url: http://imperugo.tostring.it/blog/post/il-tempdataprovider-di-aspnet-mvc/
date: 2009-05-11 05:51:23.000000000 +01:00
categories:
- ASP.NET
tags:
- Various
- Controller
- Cookie
comments: true
---
<p>Con il Framework <a target="_blank" href="http://www.asp.net/mvc">ASP.NET MVC</a> &egrave; stato introdotto il <a target="_blank" href="http://msdn.microsoft.com/en-us/library/system.web.mvc.controller.tempdataprovider.aspx">TempDataProvider</a> che, come fa ben intuire il suo nome, ha lo scopo di memorizzare delle informazioni temporanee tra una chiamata e la successiva. Infatti, se si prova ad immaginare un ciclo di navigazione di tre pagine (A,B e C), dalla pagina C non si pu&ograve; accedere alle informazioni aggiunte al <a target="_blank" href="http://msdn.microsoft.com/en-us/library/system.web.mvc.controller.tempdataprovider.aspx">TempDataProvider</a> della pagina A, ma solo a quelle della pagina B.</p>
<p>Di default queste informazioni vengono memorizzate nella <strong>Session</strong> e, anche se il <a target="_blank" href="http://msdn.microsoft.com/en-us/library/system.web.mvc.controller.tempdataprovider.aspx">TempDataProvider</a> non viene utilizzato, se si prova a disabilitare la Sessione tramite l&rsquo;apposita riga del file di configurazione, verr&agrave; sollevato un&rsquo;errore dall&rsquo;applicazione tipo il seguente:</p>
<blockquote>
<p><i>The SessionStateTempDataProvider requires SessionState to be enabled.</i></p>
</blockquote>
<p>Questo avviene perch&egrave;, all&rsquo;interno della classe <a target="_blank" href="http://msdn.microsoft.com/en-us/library/system.web.mvc.controller.aspx">Controller</a> (<strong>System.Web.Mvc.Controller</strong>) nel metodo <strong>Get</strong>, viene restituita (nel caso non fosse stato impostato un TempDataProvider differente) un&rsquo;istanza della classe <a target="_blank" href="http://msdn.microsoft.com/en-us/library/system.web.mvc.sessionstatetempdataprovider.aspx">SessionStateTempDataProvider</a>, e ne verr&agrave; invocato il <strong>metodo</strong> Load all&rsquo;interno del metodo ExecuteCore del Controller.</p>
<p>Per capirne meglio il funzionamento basta guardare lo snippet seguente:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
public ITempDataProvider TempDataProvider
{
     get
     {
         if (this._tempDataProvider == null)
         {
           this._tempDataProvider = new SessionStateTempDataProvider();
         }

         return this._tempDataProvider;
     }
     set
     {
         this._tempDataProvider = value;
     }
}
protected override void ExecuteCore()
{
  base.TempData.Load(base.ControllerContext, this.TempDataProvider);

  //&hellip;
}</pre>{% endraw %}
<p>Se si ha la fortuna (o sfortuna, in base ai punti di vista) di sviluppare applicazioni che hanno come requisito il funzionamento in una server farm, la sessione non pu&ograve; essere utilizzata (salvo uso di frameowrk particolari), ed il provider deve essere sostituito con qualcosa di pi&ugrave; estensibile.</p>
<p>Per poter rispettare il requisito &egrave; necessario impostare un <a target="_blank" href="http://msdn.microsoft.com/en-us/library/system.web.mvc.controller.tempdataprovider.aspx">TempDataProvider</a> nel metodo <strong>Inizialize</strong> del <strong>Controller</strong> con una classe sostitutiva, come mostrato di seguito:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
protected override void Initialize(RequestContext requestContext)
{
  TempDataProvider = new CookieTempDataProvider(requestContext.HttpContext);
  base.Initialize(requestContext);
}</pre>{% endraw %}
<p>Il custom provider dovr&agrave; implementare l&rsquo;interfaccia <a target="_blank" href="http://msdn.microsoft.com/en-us/library/system.web.mvc.itempdataprovider.aspx">ITempDataProvider</a> che richiede i seguenti metodi:</p>
<ul>
    <li><strong>LoadTempData</strong>;</li>
    <li><strong>SaveTempData</strong>;</li>
</ul>
<p>Il primo verr&agrave; invocato nel momento in cui si vogliono recuperare delle informazioni dal repository, il secondo quando si vogliono aggiungere delle informazioni al repository. <br />
Se non si ha la necessit&agrave; di memorizzare grandi quantit&agrave; di informazioni nel <a target="_blank" href="http://msdn.microsoft.com/en-us/library/system.web.mvc.controller.tempdataprovider.aspx">TempDataProvider</a>, sicuramente pu&ograve; essere utile memorizzarle in un cookie. <br />
Di fatto, su <a target="_blank" href="http://www.codeplex.com/">codeplex</a> nelle <strong>ASP.NET MVC Futures</strong>, si trova un&rsquo;implementazione di un <a target="_blank" href="http://msdn.microsoft.com/en-us/library/system.web.mvc.controller.tempdataprovider.aspx">TempDataProvider</a> che utilizza proprio il cookie come repository (maggiori info qui: <a href="http://aspnet.codeplex.com/SourceControl/changeset/view/21528#266402">http://aspnet.codeplex.com/SourceControl/changeset/view/21528#266402</a>).</p>
