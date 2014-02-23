---
layout: post
status: publish
published: true
title: Log4Net ed un buon logging
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1514
wordpress_url: http://imperugo.tostring.it/blog/post/log4net-ed-buon-logging/
date: 2010-03-09 17:32:00.000000000 +00:00
categories:
- .NET
tags:
- Ottimizzazione
- Logging
- Log4Net
- Dexter
comments: true
---
<p>Il logging è una parte fondamentale dell’applicazione; se implementato correttamente ed inserito nei posti giusti può salvare da lunghi down applicativi e molto altro ancora.</p>  <p>Pur potendo una persona essere bravissima a scrivere del codice, purtroppo (o per fortuna, dipende dai punti di vista) la stabilità e le problematiche dell’applicazione non dipendono soltanto dallo sviluppatore. Di fatto può cadere la connessione verso&#160; il database, possono esserci problemi di rete verso la <a title="SAN (Storage area network)" href="http://en.wikipedia.org/wiki/Storage_area_network" rel="nofollow" target="_blank">SAN</a>, un update può destabilizzare l’applicativo, ma per l’utente finale la colpa sarà sempre dell’applicazione; del resto è un punto di vista comprensibile, in quanto ciò che interessa è usare l’applicazione e non le eventuali problematiche esterne che ne possono causare un crash.</p>  <p>Appreso il fatto che, qualsiasi sia il problema, sta a noi trovarlo, passando poi la palla a chi di dovere (sistemista, tecnico di rete, etc), è comunque utile sapere che proprio in questi casi il logging può aiutare a ridurre al minimo il tempo necessario per poter identificare un bug applicativo e/o un problema di infrastruttura.</p>  <p>Purtroppo io sono abituato ad aggiungere al Dictionary Data delle eccezioni alcune informazioni riguardo al contenuto della chiamata, come dei parametri o delle variabili calcolate (vedi <a title="ASP.NET HealthMonitoring e le informazioni aggiuntive delle eccezioni" href="http://tostring.it/blog/post/aspnet-healthmonitoring-e-le-informazioni-aggiuntive-delle-eccezioni" target="_blank">qui</a>); inoltre, per tutte le applicazioni web, mi piace essere a conoscenza dell’esatta richiesta che è stata effettuata, quindi, per entrare un po’ più nel dettaglio, per ogni errore voglio sapere:</p>  <ul>   <li><strong>Url</strong> della richiesta; </li>    <li><strong>RawURL</strong> nel caso esista un sistema di routing o rewriting; </li>    <li><strong>UrlReferrer</strong>, se esiste; </li>    <li><strong>UserAgent</strong>, se esiste; </li>    <li><strong>UserHostName</strong>; </li>    <li>Tutte le <strong>ServerVariables</strong>; </li>    <li>Tutti i valori provenienti dalla <strong>Form</strong>; </li>    <li><strong>ServerName</strong>, nel caso mi trovi in un sistema di load balancing; </li>    <li><strong>ThreadLanguage</strong>; </li> </ul>  <p>Ovviamente tutte queste informazioni sono prensenti nel <a title="HttpContext" href="http://msdn.microsoft.com/en-us/library/system.web.httpcontext.aspx" rel="nofollow" target="_blank">HttpContext</a>, ma inserirle a mano ogni volta non è il massimo della comodità, così come non lo è crearsi una classe di helper perchè spesso il Logger può essere instanziato tramite un Framework di Inversion Of Control come <a title="Catle Project" href="http://www.castleproject.org/" rel="nofollow" target="_blank">Castle</a> (che offre già una serie di facilities a riguardo). Per concludere, il Logger deve aggiungere da solo tutto ciò che è ripetitivo.</p>  <p>Purtroppo il Logger di default non salva queste informazioni (né le informazioni aggiuntive della collection data, né il contesto web), ma è comunque possibile realizzare un layout base che aggiunga all’output del Logger le informazioni necessarie.</p>  <p>Personalmente utilizzo come output un file xml (il discorso rimane lo stesso anche se si opta per un’altra soluzione) perchè è compatibile con il mio log viewer preferito, <a title="Log4View" href="http://www.log4view.com/" rel="nofollow" target="_blank">Log4View</a>, che offre moltissime opzioni, tra cui la possibilità di effettuare logging tramite nettcp su un client remoto.</p>  <p>Chi segue il codice di <a title="Dexter Blog Engine" href="http://dexterblogengine.codeplex.com/" rel="nofollow" target="_blank">Dexter</a> può già trovare questa implementazione - che qui riporto solo per le parti relative all’argomento - al suo interno:</p>  {% raw %}<pre class="brush: csharp; ruler: true;">protected override void FormatXml(XmlWriter writer, LoggingEvent loggingEvent)
{
    if (DexterEnvironment.Context.IsSafe)
    {
        try
        {
            loggingEvent.Properties[&quot;Url&quot;] = DexterEnvironment.Context.CurrentRequestUri;
            loggingEvent.Properties[&quot;UrlReferrer&quot;] = DexterEnvironment.Context.CurrentUrlReferrer;
            loggingEvent.Properties[&quot;UserAgent&quot;] = DexterEnvironment.Context.CurrentUserAgent;
            loggingEvent.Properties[&quot;UserHostName&quot;] = DexterEnvironment.Context.CurrentUserHostName;
            loggingEvent.Properties[&quot;ServerVariables&quot;] = ServerVariables(DexterEnvironment.Context.CurrentServerVariables);
            loggingEvent.Properties[&quot;Form&quot;] = ServerVariables(DexterEnvironment.Context.CurrentForm);
            loggingEvent.Properties[&quot;RawURL&quot;] = DexterEnvironment.Context.CurrentRawUrl;//ctx.Request.RawUrl;
            loggingEvent.Properties[&quot;ServerName&quot;] = DexterEnvironment.Context.CurrentServerMachineName;
            loggingEvent.Properties[&quot;ThreadLanguage&quot;] = Thread.CurrentThread.CurrentCulture.DisplayName;
        }
        catch
        {
            //needed because the logging called from the appliction start che throw a new exception
            //more info here:http://mvolo.com/blogs/serverside/archive/2007/11/10/Integrated-mode-Request-is-not-available-in-this-context-in-Application_5F00_Start.aspx
        }
    }

    writer.WriteStartElement(mElmEvent);
    writer.WriteAttributeString(&quot;logger&quot;, loggingEvent.LoggerName);
    writer.WriteAttributeString(&quot;timestamp&quot;, XmlConvert.ToString(loggingEvent.TimeStamp, XmlDateTimeSerializationMode.Local));
    writer.WriteAttributeString(&quot;level&quot;, loggingEvent.Level.DisplayName);
    writer.WriteAttributeString(&quot;thread&quot;, loggingEvent.ThreadName);
    
    if (!string.IsNullOrEmpty(loggingEvent.Domain))
        writer.WriteAttributeString(&quot;domain&quot;, loggingEvent.Domain);

    if (!string.IsNullOrEmpty(loggingEvent.Identity))
        writer.WriteAttributeString(&quot;identity&quot;, loggingEvent.Identity);

    if (!string.IsNullOrEmpty(loggingEvent.UserName))
        writer.WriteAttributeString(&quot;username&quot;, loggingEvent.UserName);

    writer.WriteStartElement(mElmMessage);

    if (!Base64EncodeMessage)
        Transform.WriteEscapedXmlString(writer, loggingEvent.RenderedMessage, InvalidCharReplacement);
    else
    {
        byte[] bytes = Encoding.UTF8.GetBytes(loggingEvent.RenderedMessage);
        string textData = Convert.ToBase64String(bytes, 0, bytes.Length);
        Transform.WriteEscapedXmlString(writer, textData, InvalidCharReplacement);
    }
    writer.WriteEndElement();
    
    PropertiesDictionary properties = loggingEvent.GetProperties();
    if (properties.Count &gt; 0)
    {
        writer.WriteStartElement(mElmProperties);
        foreach (DictionaryEntry entry in properties)
        {
            writer.WriteStartElement(mElmData);
            writer.WriteAttributeString(&quot;name&quot;, Transform.MaskXmlInvalidCharacters((string) entry.Key, InvalidCharReplacement));
            string str2;
            if (!Base64EncodeProperties)
                str2 = Transform.MaskXmlInvalidCharacters(loggingEvent.Repository.RendererMap.FindAndRender(entry.Value), InvalidCharReplacement);
            else
            {
                byte[] inArray = Encoding.UTF8.GetBytes(loggingEvent.Repository.RendererMap.FindAndRender(entry.Value));
                str2 = Convert.ToBase64String(inArray, 0, inArray.Length);
            }
            writer.WriteAttributeString(&quot;value&quot;, str2);
            writer.WriteEndElement();
        }
        writer.WriteEndElement();
    }
    
    if (loggingEvent.ExceptionObject != null)
    {
        StringBuilder exceptionString = new StringBuilder();

        exceptionString.Append(loggingEvent.ExceptionObject);
        exceptionString.Append(Environment.NewLine);

        foreach (DictionaryEntry de in loggingEvent.ExceptionObject.Data)
        {
            exceptionString.Append(de.Key.ToString());
            exceptionString.Append(&quot;: &quot;);
            exceptionString.Append(de.Value.ToString());
            exceptionString.Append(Environment.NewLine);
        }
        if ((exceptionString.Length &gt; 0))
        {
            writer.WriteStartElement(mElmException);
            Transform.WriteEscapedXmlString(writer, exceptionString.ToString(), InvalidCharReplacement);
            writer.WriteEndElement();
        }
    }
    if (LocationInfo)
    {
        LocationInfo locationInformation = loggingEvent.LocationInformation;
        writer.WriteStartElement(mElmLocation);
        writer.WriteAttributeString(&quot;class&quot;, locationInformation.ClassName);
        writer.WriteAttributeString(&quot;method&quot;, locationInformation.MethodName);
        writer.WriteAttributeString(&quot;file&quot;, locationInformation.FileName);
        writer.WriteAttributeString(&quot;line&quot;, locationInformation.LineNumber);
        writer.WriteEndElement();
    }
    writer.WriteEndElement();
}</pre>{% endraw %}

<p>Come potete vedere tutto si svolge nel metodo FormatXml, dove è possibile aggiungere, rimuovere e leggere alcune informazioni. Nella prima parte vado ad inserire le informazioni inerenti il contesto web, quindi la url richiesta, il rawurl, useragent, etc, mentre più avanti renderizzo tutte le informazioni del Dictionary Data dell’eccezione.</p>

<p>Per poter utilizzare questa customizzazione è sufficiente specificare nel file di log4net la classe per il rendering delle informazioni, come mostrato di seguito:</p>

{% raw %}<pre class="brush: xml; ruler: true;">&lt;appender name=&quot;NHibernateFileLog&quot; type=&quot;log4net.Appender.RollingFileAppender&quot;&gt;
    &lt;file value=&quot;Logs/nHibernate.txt&quot; /&gt;
    &lt;maximumFileSize value=&quot;1000KB&quot; /&gt;
    &lt;rollingStyle value=&quot;Size&quot; /&gt;
    &lt;maxSizeRollBackups value=&quot;5&quot; /&gt;
    &lt;layout type=&quot;Dexter.Shared.Log.Log4Net.XmlLayout&quot;&gt;
    &lt;/layout&gt;
&lt;/appender&gt;</pre>{% endraw %}

<p>Chi è interessato all’implementazione completa del XmlLayout può guardare <a title="XmlLayoutBase for extended log" href="http://dexterblogengine.codeplex.com/SourceControl/changeset/view/45891#634177" rel="nofollow" target="_blank">qui</a>.</p>

<p>Ciauz</p>
