---
layout: post
status: publish
published: true
title: Errore di ViewState su ASP.NET MVC
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1494
wordpress_url: http://imperugo.tostring.it/blog/post/errore-di-viewstate-su-aspnet-mvc/
date: 2010-05-25 17:11:47.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- Configurazione
- Exception
comments: true
---
<p>
	Anche se il titolo &egrave; un po&rsquo; fuorviante, devo dire che il messaggio &ldquo;Invalid viewstate&rdquo; &egrave; apparso realmente; ma procediamo con ordine. <br />
	Molti di voi si saranno accorti che ultimamente, quando si accedeva al dettaglio di un post sul mio blog, si verificava in maniera del tutto casuale un errore e la navigazione dell&rsquo;utente veniva deviata verso una pagina di cortesia. <br />
	Purtroppo l&rsquo;errore non &egrave; dovuto a <a href="http://www.imperugo.tostring.it/categories/archive/Dexter" target="_blank" title="Dexter">Dexter</a> - dico purtroppo perch&egrave; altrimenti l&rsquo;avrei corretto da tempo - ma ad una serie di fattori che non sono neanche riuscito a riprodurre sistematicamente; sta di fatto che l&rsquo;applicazione andava in crash quando invocava l&rsquo;helper AntiForgeryToken, restituendo il seguente stack tracce:</p>
<blockquote>
	<p>
		System.Web.HttpException: Error executing child request for handler &#39;System.Web.Mvc.HttpHandlerUtil+ServerExecuteHttpHandlerWrapper&#39;.</p>
	<p>
		---&gt; System.Web.Mvc.HttpAntiForgeryException: A required anti-forgery token was not supplied or was invalid. ---&gt;</p>
	<p>
		System.Web.HttpException: Validation of viewstate MAC failed. If this application is hosted by a Web Farm or cluster, ensure that</p>
	<p>
		<machinekey> configuration specifies the same validationKey and validation algorithm. AutoGenerate cannot be used in a cluster. ---&gt; </machinekey></p>
	<p>
		System.Web.UI.ViewStateException: Invalid viewstate. <br />
		&nbsp;&nbsp;&nbsp; Client IP: 94.86.54.138 <br />
		&nbsp;&nbsp;&nbsp; Port: 44787 <br />
		&nbsp;&nbsp;&nbsp; User-Agent: Mozilla/5.0 (Windows; U; Windows NT 6.1; it; rv:1.9.1.9) Gecko/20100315 Firefox/3.5.9 <br />
		&nbsp;&nbsp;&nbsp; ViewState: eMzLc7Gx/IAC2ALGLNZWrgie4SgDWbcFeooL0JSADQan8USvQo7F0Fgx3u0m4aB4 <br />
		&nbsp;&nbsp;&nbsp; Referer: <br />
		&nbsp;&nbsp;&nbsp; Path: /blog/post/welcome-parallel-linq ---&gt; System.Security.Cryptography.CryptographicException: Padding is invalid and cannot</p>
	<p>
		be removed. <br />
		&nbsp;&nbsp; at System.Security.Cryptography.RijndaelManagedTransform.DecryptData(Byte[] inputBuffer, Int32 inputOffset, Int32 inputCount, Byte</p>
	<p>
		[]&amp; outputBuffer, Int32 outputOffset, PaddingMode paddingMode, Boolean fLast) <br />
		&nbsp;&nbsp; at System.Security.Cryptography.RijndaelManagedTransform.TransformFinalBlock(Byte[] inputBuffer, Int32 inputOffset, Int32</p>
	<p>
		inputCount) <br />
		&nbsp;&nbsp; at System.Security.Cryptography.CryptoStream.FlushFinalBlock() <br />
		&nbsp;&nbsp; at System.Web.Configuration.MachineKeySection.EncryptOrDecryptData(Boolean fEncrypt, Byte[] buf, Byte[] modifier, Int32 start,</p>
	<p>
		Int32 length, IVType ivType, Boolean useValidationSymAlgo) <br />
		&nbsp;&nbsp; at System.Web.UI.ObjectStateFormatter.Deserialize(String inputString) <br />
		&nbsp;&nbsp; --- End of inner exception stack trace --- <br />
		&nbsp;&nbsp; --- End of inner exception stack trace --- <br />
		&nbsp;&nbsp; at System.Web.UI.ViewStateException.ThrowError(Exception inner, String persistedState, String errorPageMessage, Boolean</p>
	<p>
		macValidationError) <br />
		&nbsp;&nbsp; at System.Web.UI.ObjectStateFormatter.Deserialize(String inputString) <br />
		&nbsp;&nbsp; at System.Web.Mvc.AntiForgeryDataSerializer.Deserialize(String serializedToken) <br />
		&nbsp;&nbsp; --- End of inner exception stack trace --- <br />
		&nbsp;&nbsp; at System.Web.Mvc.AntiForgeryDataSerializer.Deserialize(String serializedToken) <br />
		&nbsp;&nbsp; at System.Web.Mvc.HtmlHelper.GetAntiForgeryTokenAndSetCookie(String salt, String domain, String path) <br />
		&nbsp;&nbsp; at System.Web.Mvc.HtmlHelper.AntiForgeryToken(String salt, String domain, String path) <br />
		&nbsp;&nbsp; at System.Web.Mvc.HtmlHelper.AntiForgeryToken() <br />
		&nbsp;&nbsp; at ASP.themes_default_views_blog_post_aspx.__RenderContent1(HtmlTextWriter __w, Control parameterContainer) in c:\domains</p>
	<p>
		\tostring.it\wwwroot\Themes\Default\Views\Blog\Post.aspx:line 113 <br />
		&nbsp;&nbsp; at System.Web.UI.Control.RenderChildrenInternal(HtmlTextWriter writer, ICollection children) <br />
		&nbsp;&nbsp; at ASP.themes_default_views_shared_site_master.__Render__control1(HtmlTextWriter __w, Control parameterContainer) in c:\domains</p>
	<p>
		\tostring.it\wwwroot\Themes\Default\Views\Shared\Site.Master:line 113 <br />
		&nbsp;&nbsp; at System.Web.UI.Control.RenderChildrenInternal(HtmlTextWriter writer, ICollection children) <br />
		&nbsp;&nbsp; at System.Web.UI.Control.RenderChildrenInternal(HtmlTextWriter writer, ICollection children) <br />
		&nbsp;&nbsp; at System.Web.UI.Page.Render(HtmlTextWriter writer) <br />
		&nbsp;&nbsp; at System.Web.Mvc.ViewPage.Render(HtmlTextWriter writer) <br />
		&nbsp;&nbsp; at System.Web.UI.Page.ProcessRequestMain(Boolean includeStagesBeforeAsyncPoint, Boolean includeStagesAfterAsyncPoint) <br />
		&nbsp;&nbsp; at System.Web.UI.Page.ProcessRequest(Boolean includeStagesBeforeAsyncPoint, Boolean includeStagesAfterAsyncPoint) <br />
		&nbsp;&nbsp; at System.Web.UI.Page.ProcessRequest() <br />
		&nbsp;&nbsp; at System.Web.UI.Page.ProcessRequest(HttpContext context) <br />
		&nbsp;&nbsp; at System.Web.Mvc.ViewPage.ProcessRequest(HttpContext context) <br />
		&nbsp;&nbsp; at ASP.themes_default_views_blog_post_aspx.ProcessRequest(HttpContext context) in c:\windows\Microsoft.NET</p>
	<p>
		\Framework64\v2.0.50727\Temporary ASP.NET Files\root\878362b4\44ad105e\App_Web_qkslf0lt.1.cs:line 0 <br />
		&nbsp;&nbsp; at System.Web.Mvc.HttpHandlerUtil.ServerExecuteHttpHandlerWrapper.&lt;&gt;c__DisplayClass1.<processrequest>b__0() <br />
		&nbsp;&nbsp; at System.Web.Mvc.HttpHandlerUtil.ServerExecuteHttpHandlerWrapper.&lt;&gt;c__DisplayClass4.<wrap>b__3() <br />
		&nbsp;&nbsp; at System.Web.Mvc.HttpHandlerUtil.ServerExecuteHttpHandlerWrapper.Wrap[TResult](Func`1 func) <br />
		&nbsp;&nbsp; at System.Web.Mvc.HttpHandlerUtil.ServerExecuteHttpHandlerWrapper.Wrap(Action action) <br />
		&nbsp;&nbsp; at System.Web.HttpServerUtility.ExecuteInternal(IHttpHandler handler, TextWriter writer, Boolean preserveForm, Boolean </wrap></processrequest></p>
	<p>
		setPreviousPage, VirtualPath path, VirtualPath filePath, String physPath, Exception error, String queryStringOverride) <br />
		&nbsp;&nbsp; --- End of inner exception stack trace --- <br />
		&nbsp;&nbsp; at System.Web.HttpServerUtility.ExecuteInternal(IHttpHandler handler, TextWriter writer, Boolean preserveForm, Boolean</p>
	<p>
		setPreviousPage, VirtualPath path, VirtualPath filePath, String physPath, Exception error, String queryStringOverride) <br />
		&nbsp;&nbsp; at System.Web.HttpServerUtility.Execute(IHttpHandler handler, TextWriter writer, Boolean preserveForm, Boolean setPreviousPage) <br />
		&nbsp;&nbsp; at System.Web.HttpServerUtility.Execute(IHttpHandler handler, TextWriter writer, Boolean preserveForm) <br />
		&nbsp;&nbsp; at System.Web.HttpServerUtilityWrapper.Execute(IHttpHandler handler, TextWriter writer, Boolean preserveForm) <br />
		&nbsp;&nbsp; at System.Web.Mvc.ViewPage.RenderView(ViewContext viewContext) <br />
		&nbsp;&nbsp; at System.Web.Mvc.ViewResultBase.ExecuteResult(ControllerContext context) <br />
		&nbsp;&nbsp; at System.Web.Mvc.ControllerActionInvoker.&lt;&gt;c__DisplayClass14.<invokeactionresultwithfilters>b__11() <br />
		&nbsp;&nbsp; at System.Web.Mvc.ControllerActionInvoker.InvokeActionResultFilter(IResultFilter filter, ResultExecutingContext preContext, Func`1 </invokeactionresultwithfilters></p>
	<p>
		continuation) <br />
		&nbsp;&nbsp; at System.Web.Mvc.ControllerActionInvoker.InvokeActionResultFilter(IResultFilter filter, ResultExecutingContext preContext, Func`1</p>
	<p>
		continuation) <br />
		&nbsp;&nbsp; at System.Web.Mvc.ControllerActionInvoker.InvokeActionResultWithFilters(ControllerContext controllerContext, IList`1 filters,</p>
	<p>
		ActionResult actionResult) <br />
		&nbsp;&nbsp; at System.Web.Mvc.ControllerActionInvoker.InvokeAction(ControllerContext controllerContext, String actionName) <br />
		&nbsp;&nbsp; at Dexter.Web.Mvc.Controllers.DexterActionInvoker.InvokeAction(ControllerContext controllerContext, String actionName) <br />
		&nbsp;&nbsp; at System.Web.Mvc.Controller.ExecuteCore() <br />
		&nbsp;&nbsp; at System.Web.Mvc.MvcHandler.&lt;&gt;c__DisplayClass8.<beginprocessrequest>b__4() <br />
		&nbsp;&nbsp; at System.Web.Mvc.Async.AsyncResultWrapper.&lt;&gt;c__DisplayClass1.<makevoiddelegate>b__0() <br />
		&nbsp;&nbsp; at System.Web.Mvc.Async.AsyncResultWrapper.&lt;&gt;c__DisplayClass8`1.<beginsynchronous>b__7(IAsyncResult _) <br />
		&nbsp;&nbsp; at System.Web.Mvc.Async.AsyncResultWrapper.WrappedAsyncResult`1.End() <br />
		&nbsp;&nbsp; at System.Web.Mvc.MvcHandler.EndProcessRequest(IAsyncResult asyncResult) <br />
		&nbsp;&nbsp; at System.Web.HttpApplication.CallHandlerExecutionStep.System.Web.HttpApplication.IExecutionStep.Execute() <br />
		&nbsp;&nbsp; at System.Web.HttpApplication.ExecuteStep(IExecutionStep step, Boolean&amp; completedSynchronously) <br />
		ASPIMPERSONATING: </beginsynchronous></makevoiddelegate></beginprocessrequest></p>
</blockquote>
<p>
	Sinceramente non so se sono riuscito a risolvere il problema: di fatto questo post &egrave; anche un appello a chi ha avuto questa problematica e l&rsquo;ha risolta.</p>
<p>
	In tutte le righe del log veniva riportato come user agent quello di Internet Explorer 8 e, inizialmente, mi sono concentrato su di lui per capire la problematica; poi, guardando un po&rsquo; i logs e grazie all&rsquo;aiuto del buon <a href="http://blogs.msdn.com/b/giorgio/" rel="nofollow" target="_blank" title="Giorgio Sardo's Blog">Giorgio</a> ed <a href="http://www.ienumerable.it/" rel="nofollow" target="_blank" title="Andrea Balducci's Blog">Andrea</a>, ci siamo accorti che il problema era su ASP.NET MVC e non su IE8 (il log mostrava sempre IE8 per il semplice motivo che il browser di casa Microsoft &egrave; molto pi&ugrave; diffuso rispetto alla concorrenza).</p>
<p>
	Cercando in rete ho provato <a href="http://adam.kahtava.com/journal/2009/11/23/how-to-fix-the-validation-of-viewstate-mac-failed-error-aspnet-mvc/" rel="nofollow" target="_blank" title="How To Fix the: “Validation of viewstate MAC failed” Error (ASP.NET MVC)">questa</a> soluzione, sperando che dia i suoi frutti. <br />
	Nello specifico consiste nel registrare a mano i valori del MachineKey all&rsquo;interno del nostro web.config. Ovviamente i valori da registrare sono diversi, ma fortunatamente esiste questo <a href="http://aspnetresources.com/tools/keycreator.aspx" rel="nofollow" target="_blank" title="&lt;machineKey&gt; Generator"> Generator&quot; href=&quot;http://aspnetresources.com/tools/keycreator.aspx&quot; rel=nofollow target=_blank&gt;sito</a> che ci autogenera l&rsquo;apposita sezione del file di configurazione da insaaerire.</p>
<p>
	Il risultato finale del web.config dovrebbe essere una cosa del genere:</p>
{% highlight csharp %}
<machinekey decryption="AES" decryptionkey="CB5A09CB8CAF8CD33A97F1099A451D7C80C9CC175F34DDAFA925BA55043570CB" validation="SHA1" validationkey="E7E40ADAC94F3D467AAB86AEA2561E246A6323C69A0B32BF808587694E1CB387265CC6F2C46420F315831B54F683FA82F08A8E95E00B93BFEC3CD91DF65FEE8C"></machinekey>
{% endhighlight %}
<p>
	stay tuned! <br />
	.u</p>
