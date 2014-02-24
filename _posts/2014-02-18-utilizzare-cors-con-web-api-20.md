---
layout: post
title: "Utilizzare CORS con Web API 2.0"
description: "WEB API 2.0 introducono il supporto alle chiamate CORS, in questo articolo vediamo cosa significa e come usarlo al meglio"
categories:
- WEB API
tags:
- WebAPI
- CORS
comments: true
---

Con la versione 2.0 delle Web API è stato introdotto il supporto alle richieste cross domain, più comunemente chiamate CORS (Cross-Origin Resource Sharing).

Normalmente non è possibile effettuare richieste HTTP via Javascript da un source il cui dominio è differente da quello dell’endpoint chiamato. Tradotto in soldoni, se il nostro Javascript si trova su **http://www.miosito.it/Index.html** non è possibile chiedere informazioni al sito **http://www.tuosito.it/**.

I motivi sono semplicemente di sicurezza, e servono ad impedire che qualcuno possa attingere a informazioni personali tramite un JS “*maligno*”.

Chiarito il perché di questo blocco, a volte può risultare necessario effettuare questo tipo di chiamate, e le strade possono essere diverse a seconda dei browser che si vogliono supportare. La prima ed universale soluzione è comunicare via [JSONP](http://en.wikipedia.org/wiki/JSONP). Questo approccio è molto facile da utilizzare e tutti i browser lo supportano; l’unico incoveniente è il VERB della chiamata http che può essere solo in GET, con il conseguente limite dei caratteri utilizzabili.

Se, al contrario, vogliamo inviare parecchie informazioni non possiamo utilizzare questo approccio (una soluzione in questo caso è “proxare” lato server le chiamate JS e ribaltarle all’endpoint).

Un'altra soluzione è l’utilizzo del CORS, che da il titolo a questo articolo. 
In pratica la comunicaione CORS stabilisce, tramite delle recole che vedremo più avanti in questo articolo, che un client può accedere a delle informazioni da un dominio differente a condizione che il server lo consenta.
 Ovviamente per far ciò è necessario che il browser permetta questo tipo di chiamata, cosa che purtroppo non è del tutto scontata. Internet Explorer in questo è stato fermo per molto tempo e, solo a partire dalla versione 10, ha introdotto il supporto completo a questo meccanismo di comunicazione.

La tabella seguente ([http://caniuse.com/cors](fonte)) mostra il supporto al CORS dai vari browsers

![CORS SUPPORT TABLE](/assets/2014-02-16-utilizzare-cors-con-web-api-20/cors.jpg)

> ci sono dei workaround che permettono di sfruttare CORS anche con IE 8/9 ma con alcuni limiti sui VERB della chiamata (maggiori info [qui](http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx) )

Ora che abbiamo chiarito cos’è il CORS, è arrivato il momento di configurarlo utilizzando uno tra questi browsers: IE10/11, Chrome (tutte le versioni), Firefox dalla 3.5+ e Safari 4+.

A questo punto abbiamo bisogno di due progetti, uno per il client ed uno per il server, entrambi “hostati” su domini differenti (nel mio esempio ho sfruttato i websites di azure, quindi ho [http://imperdemo.azurewebsite.net](http://imperdemo.azurewebsite.net) per la parte server e [http://imperclient.azurewebsite.net](http://imperclient.azurewebsite.net) per la parte client).

## Applicazione Server

Una volta creato il nostro progetto, come prima cosa è necessario abilitare il CORS per i domini che riteniamo "**trusted**", quindi nel mio esempio *imperclient.azurewebsite.net*, nel Global.asax.cs

Se avete utilizzato il template di default di Visual Studio, il vostro golbal.asax.cs dovrebbe essere più o meno come questo.



{% highlight c# linenos=table %}
public class WebApiApplication : System.Web.HttpApplication
{
	protected void Application_Start()
	{
		AreaRegistration.RegisterAllAreas();
		GlobalConfiguration.Configure(WebApiConfig.Register);
		FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
		RouteConfig.RegisterRoutes(RouteTable.Routes);
		BundleConfig.RegisterBundles(BundleTable.Bundles);
	}
}
{% endhighlight %}

Da qui il file da modificare è quello contenente la configurazione delle Web API, quindi "WebApiConfig.cs" contenuto nella folder "App_Start".


> N.B.: Prima di moficare il codice è necessario installare il corretto NuGet Packages; di fatto il template di Visual Studio delle Web API "as is" non contiene il package per il CORS, che va quindi installato manualmente.


{% raw %}
<div class="nuget-badge">
    <code>PM&gt; Install-Package Microsoft.AspNet.WebApi.Cors</code>
</div> 
{% endraw %}

Una volta che tutti gli "ingredienti" sono pronti, non ci resta che abilitare il CORS a livello applicativo e specificare per ogni singolo controller i "trusted" domain così:


{% highlight c# linenos=table %}
using System.Web.Http;

namespace imperugo.webapi.cors.server
{
	public static class WebApiConfig
	{
		public static void Register(HttpConfiguration config)
		{
			// Web API configuration and services
			config.EnableCors();

			// Web API routes
			config.MapHttpAttributeRoutes();
			
			config.Routes.MapHttpRoute(
				name: "DefaultApi",
				routeTemplate: "api/{controller}/{id}",
				defaults: new { id = RouteParameter.Optional }
			);
		}
	}
}
{% endhighlight %}

Mentre il nostro ValueController risulta così:

{% highlight c# linenos=table %}
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace imperugo.webapi.cors.server.Controllers
{
	[EnableCors(origins: "http://imperclient.azurewebsites.net", headers: "*", methods: "*")]
	public class ValuesController : ApiController
	{
		// GET api/values/5
		public string Get()
		{
			return "This is my controller response";
		}
	}
}

{% endhighlight %}

La parte importante di quest'ultimo blocco di codice è l'attributo **EnableCors** dove viene specificato l'url accettato per la richeista, gli headers ed i vari metodi.
> Se non si vuole "aprire" un intero controller a delle chiamate Cross Domain, è possibile utilizzare l'attributo anche solo sulla singola Action oppure lasciare l'attributo sul controller e disabilitare una singola Action tramite l'attributo DisableCors

## Applicazione Client
A questo punto, dato che la parte server è stata completata, non ci resta che creare un'altra applicazione con il compito di chiamare le nostre API appena create e deployate sul nostro server.

Il codice sottostante è un semplicissimo codice javascript, quindi può risiedere anche su una semplice pagina .html, senza la necessità di creare un'applicazione server side.

La pagina HTML sarà così composta:

{% highlight html linenos=table %}
<div class="jumbotron">
    <h2>Test CORS (Cross-origin resource sharing)</h2>
	<p class="lead">
		<a href="#" class="btn btn-primary btn-large" id="testButton">Test it now&raquo;</a></p>
	<p>
	<p id="response">
		NoResponse
	</p>
</div>
{% endhighlight %}
con il seguente codice javascript:

{% highlight js linenos=table %}
<script language="javascript">
	var feedbackArea = $('#response');
	$('#testButton')
		.click(function () {
			$.ajax({
				type: 'GET',
				url: 'http://imperdemo.azurewebsites.net/api/values'
			}).done(function (data) {
				feedbackArea.html(data);
			}).error(function (jqXHR, textStatus, errorThrown) {
				feedbackArea.html(jqXHR.responseText || textStatus);
			});
	});
</script>
{% endhighlight %}

Se abbiamo fatto tutto correttamente, non ci resta che deployare l'applicazione server e quella client.  Se utilizzate il template di Visual Studio, quest'ultima dovrebbe apparire così:

![image](/assets/2014-02-16-utilizzare-cors-con-web-api-20/cors-client.jpg)

Il tutto dovrebbe dare un risultato tipo il seguente:

![image](/assets/2014-02-16-utilizzare-cors-con-web-api-20/cors-client-show-response.jpg)

Al contrario se qualcosa non va, è necessario ricontrollare i punti sopra.
## Come funziona
Il funzionamento del CORS è un semplice gioco di HEADERS tra il chiamante ed il server che riceve la risposta. 
Il browser (il client) aggiunge nell'header della chimata un'informazione riguardo al dominio corrente (imperclient.azurewebsites.net nel mio caso) con la chiave *Origin*.
Il server a sua volta verifica che tale valore sia tra quelli trusted e risponde con un'altra informazione (sempre nell'header) con la chiave *Access-Control-Allow-Origin*
Se i due valori "matchano" allora il browser utilizza la risposta, altrimenti si avrà un errore.
In questo screenshot potete vedere l'header della richiesta e della risposta http, con evidenziati i valori utilizzati per il confronto

![image](/assets/2014-02-16-utilizzare-cors-con-web-api-20/cors-client-show-response-headers.jpg)

Di seguito invece il classico errore che restituisce Chrome nel momento in cui il CORS non funziona correttamente
![image](/assets/2014-02-16-utilizzare-cors-con-web-api-20/cors-client-show-response-error.jpg)
## Conclusioni
Per me che amo "spezzare" le mie applicazioni con un layer di API tra il front-end ed il backend, il CORS è una gran comodità, peccato purtroppo la non completa compatiblità con tutti i browser.
La demo di questo sito è disponibile [qui](/assets/2014-02-16-utilizzare-cors-con-web-api-20/sample.zip)

