---
layout: post
status: publish
published: true
title: Gestire HttpRequestValidationException in ASP.NET MVC
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1473
wordpress_url: http://imperugo.tostring.it/blog/post/gestire-httprequestvalidationexception-aspnet-mvc/
date: 2010-08-02 16:30:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- Exception Handling
comments: true
---
<p>Chi lavora con le applicazioni web si sarà sicuramente imbattuto nell’eccezione <a title="http://msdn.microsoft.com/it-it/library/system.web.httprequestvalidationexception.aspx" href="http://msdn.microsoft.com/it-it/library/system.web.httprequestvalidationexception.aspx" rel="nofollow" target="_blank">HttpRequestValidationException</a> scatenata dall’engine di <a title="ASP.NET Category" href="http://www.tostring.it/categories/archive/asp.net" target="_blank">ASP.NET</a> quando un client cerca di effettuare il submit di informazioni potenzialmente pericolose, aka codice html, verso il server.    <br />Personalmente ritengo questa una comodissima feature in quanto ci consente di “alleggerire” la nostra applicazione nell’analisi dei dati in ingresso e demandare il tutto ad ASP.NET; al contrario, se si vuole gestire questa casistica secondo dei propri requirements, è possibile disattivarla e prendersi carico e <strong>responsabilità</strong> del fatto che ciò che arriverà dal client non è stato validato da nessuno.    <br />    <br />Dando per assodato che, dal mio punto di vista, questa funzione dovrebbe rimanere abilitata, quello che vorrei specificare in questo post è come mostrare all’utente un messaggio “friendly” che lo invita ad inserire del plaintext nel campo di input. L’idea è nata analizzando il log del mio blog, in cui ho trovato una miriade di tentativi di commenti che cercavano di inserire link (praticamente tutto spam), ma senza successo grazie a questo blocco.    <br />    <br />Questo è possibile in diversi modi, come con l’utilizzo di httpmodule, applicationError, etc., ma in applicazioni MVC preferisco utilizzare il meno possibile HttpModule (vuoi perchè in IntegratedMode passa veramente di tutto) e gestire la cosa dal controller.     <br />In <a title="Dexter Blog Engine Category" href="http://www.imperugo.tostring.it/categories/archive/Dexter" target="_blank">Dexter</a> ho un ControllerBase da cui ereditano tutti i controller, dove, oltre ad esporre delle ActionResult custom, ho la gestione dei log per ciò che riguarda la parte di MVC, in soldoni ho l’override del metodo <em>OnException</em> dove butto dentro la mia logica di logging, etc.</p>  <p>Quando una qualsiasi eccezione riguardante una richiesta MVC viene sollevata dal framework, si può essere certi che verrà intercettata e verrà invocato quel metodo, permettendoci di gestirla a nostro piacimento. </p>  {% highlight csharp %}
protected override void OnException(ExceptionContext filterContext)
{
    HttpException httpException = filterContext.Exception as HttpException;

    if (httpException is HttpRequestValidationException)
    {
        Logger.Info ( httpException.Message , httpException );

        var currentUrl = filterContext.RequestContext.HttpContext.Request.Url.AbsolutePath;

        filterContext.ExceptionHandled = true;

        filterContext.Result =  RedirectToAction("HttpRequestValidation", "Errors", new
                                                                    {
                                                                 aspxerrorpath = currentUrl
                                                                    });
    } else if (httpException != null && httpException.GetHttpCode() == 404)
        Logger.Info(httpException.Message, httpException);
    else if (filterContext.Exception is HttpAntiForgeryException)
        Logger.Info(filterContext.Exception.Message, filterContext.Exception);
    else
        Logger.Error("Generic Exception", filterContext.Exception);
}
{% endhighlight %}
<p>Come potete vedere non è nulla di fantascientifico ed è più o meno quello che si andrebbe a fare con un’applicazione WebForm classica, fatta eccezione per l’utilizzo della proprietà ExceptionHandled, che notifica a MVC che siamo noi a prenderci in carico il <em>Result</em> da quel momento in poi, e di fatto subito dopo si va ad effettuare un redirect.</p>

<p>Il risultato è <a title="HttpRequestValidation example" href="http://tostring.it/errors/HttpRequestValidation" target="_blank">questo</a>.</p>
