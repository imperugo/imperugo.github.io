---
layout: post
status: publish
published: true
title: ASP.NET HealthMonitoring e le informazioni aggiuntive delle eccezioni
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1546
wordpress_url: http://imperugo.tostring.it/blog/post/aspnet-healthmonitoring-e-le-informazioni-aggiuntive-delle-eccezioni/
date: 2009-10-23 19:46:09.000000000 +01:00
categories:
- ASP.NET
tags:
- ASP.NET
- Exception Handling
comments: true
---
<p>
	L&rsquo;HealthMonitoring di <a href="http://www.asp.net" rel="nofollow" target="_blank">ASP.NET</a> &egrave; sicuramente uno strumento potentissimo per tenere traccia dello stato di salute della nostra applicazione web. Uno dei suoi principali vantaggi &egrave; che dalla versione 2.0 di ASP.NET &egrave; gi&agrave; presente con un nutrito insieme di provider che permettono di loggare informazioni in svariati repository. <br />
	Entranto pi&ugrave; nello specifico si hanno a disposizione i seguenti provider:</p>
<ul>
	<li>
		<strong>EventLogWebEventProvider</strong> (memorizza nell&rsquo;Event Log di Windows);</li>
	<li>
		<strong>SqlWebEventProvider</strong> (Database Sql Server 2000/05/08);</li>
	<li>
		<strong>WmiWebEventProvider</strong> (sfrutta il <a href="http://en.wikipedia.org/wiki/Windows_Management_Instrumentation" rel="nofollow" target="_blank" title="Windows Management Instrumentation">Windows Management Instrumentation</a> per gestire le notifiche);</li>
	<li>
		<strong>SimpleMailWebEventProvider</strong> (Invia una Email);</li>
	<li>
		<strong>TemplatedMailWebEventProvider </strong>(Invia una Email in base ad un template);</li>
	<li>
		<strong>TraceWebEventProvider</strong> (sfrutta il <a href="http://msdn.microsoft.com/en-us/library/y13fw6we(VS.71).aspx" rel="nofollow" target="_blank" title="ASP.NET Trace">trace</a> di <a href="http://imperugo.tostring.it/categories/archive/ASP.NET" target="_blank" title="ASP.NET">ASP.NET</a>);</li>
</ul>
<p>
	Ovviamente, essendo basato a provider, l&rsquo;healthmonitorig offre la possibilit&agrave; di realizzare ed utilizzare delle implementazioni custom, nel caso quelli precedentemente elencati non soddisfini le esigenze dello sviluppatore. Per far ci&ograve; &egrave; necessario realizzare una classe che implementi una delle apposite classi astratte messe a disposizione dal <a href="http://imperugo.tostring.it/categories/archive/.NET" target="_blank" title=".NET Framework">.NET</a> Framework -<a href="http://msdn.microsoft.com/en-us/library/system.web.management.webeventprovider.aspx" rel="nofollow" target="_blank" title="WebEventProvider">WebEventProvider</a> o <a href="http://msdn.microsoft.com/en-us/library/system.web.management.bufferedwebeventprovider.aspx" rel="nofollow" target="_blank" title="BufferedWebEventProvider">BufferedWebEventProvider</a> - ed aggiungere al loro interno propria logica.</p>
<p>
	Personalmente ritengo pi&ugrave; che sufficienti i provider messi a disposizione e non sentirei la necessit&agrave; di realizzarne uno custom se quelli messi a disposizione memorizzarsero anche le informazioni presente nella collection Data della classe Exception. <br />
	In attensa del <a href="http://imperugo.tostring.it/Tags/Archive/Historical+Debugger" target="_blank" title="Tags: Historical Debugger">Historical Debugger</a>, per poter capire cosa non va nella nostra applicazione e riprodurlo, &egrave; necessario riempire il codice di logging per poter catturare e riprodurre una specifica situazione che scatena un&rsquo;errore. <br />
	Purtroppo alcune volte un Logger che memorizza soltanto l&rsquo;eccezione pu&ograve; non bastare in quanto il problema pu&ograve; riscontrarsi solo con alcuni paramentri e, in questi casi, &egrave; necessario memorizzare anche loro insieme all&rsquo;eccezzione.</p>
<p>
	Per far ci&ograve; una buona pratica &egrave; quella di <strong>inserire questi valori nell&rsquo;apposito Dictionary Data</strong> presente nell&rsquo;oggetto Exception in modo da avere in un&rsquo;unico oggetto sia lo stack che le informazioni legate all&rsquo;eccezione. <br />
	Lo snippet seguente mostra come sfruttarlo:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">public static void Send(Uri sourceUrl, Uri targetUrl)
{
    try
    {
        //do something
    }
    catch (Exception ex)
    {
        ex.Data.Add(&quot;Source Url: &quot;, sourceUrl);
        ex.Data.Add(&quot;Target Url: &quot;, targetUrl);

        Log.Log.General.Error(&quot;Send PingBack Error&quot;, ex);
    }
}</pre>{% endraw %}
<p>
	Purtroppo i provider dell&rsquo;HealthMonitoring messi a disposizione dal .NET Framework non memorizzano questo tipo di informazioni, il che ci obbliga (se siamo interessati a tener traccia di queste informazioni) a scriverci un provider custom che dovrebbe essere pi&ugrave; o meno cos&igrave;:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">public class HealthMonitorDataBaseProvider : BufferedWebEventProvider
{
    public override void ProcessEvent(WebBaseEvent eventRaised)
    {
        if (UseBuffering)
            base.ProcessEvent(eventRaised);
        else
            Save(new[] { eventRaised });
    }

    public override void ProcessEventFlush(WebEventBufferFlushInfo flushInfo)
    {
        Save(flushInfo.Events);
    }

    private static void Save(ICollection eventCollection)
    {
        WebRequestInformation requestInformation = null;
        Exception errorException = null;
        MyLog item = new MyLog();

        foreach (WebBaseEvent eventRaised in eventCollection)
        {
            //popolo myLog 
            
            if (eventRaised is WebBaseErrorEvent)
                errorException = ((WebBaseErrorEvent)eventRaised).ErrorException;

            if (errorException != null)
            {
                StringBuilder sb = new StringBuilder(errorException.ToString());

                if (errorException.Data != null &amp;&amp; errorException.Data.Count &gt; 0)
                {
                    sb.Append(Environment.NewLine);

                    foreach (DictionaryEntry de in errorException.Data)
                    {
                        sb.Append(de.Key.ToString());
                        sb.Append(&quot;: &quot;);
                        sb.Append(de.Value.ToString());
                        sb.Append(Environment.NewLine);
                    }
                }

                logInstance.Details = sb.ToString();
            }

            new LogService().Save(item);
        }
    }
}</pre>{% endraw %}
<p>
	stay connected!</p>
