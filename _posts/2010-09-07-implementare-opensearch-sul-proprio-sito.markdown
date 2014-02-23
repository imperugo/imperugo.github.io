---
layout: post
status: publish
published: true
title: Implementare OpenSearch sul proprio sito
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1471
wordpress_url: http://imperugo.tostring.it/blog/post/implementare-opensearch-sul-proprio-sito/
date: 2010-09-07 16:00:00.000000000 +01:00
categories:
- ASP.NET
tags:
- Open Search
- Browser
- Dexter
comments: true
---
Nel weekend scorso ho deciso di implementare l’<a title="Open Search Official Site" href="http://www.opensearch.org/Home" target="_blank" rel="nofollow">OpenSearch</a> all’interno del mio blog in modo da offrire un servizio in più ed imparare una cosa nuova.
In pratica lo scopo era di creare un provider di ricerca per i principali browser di navigazione come Internet Explorer, Firefox e Chrome.
L’implementazione è piuttosto banale: basta creare un HttpHandler - o un file statico nel caso in cui le informazioni non necessitino di una gestione dinamica - contenente un set d’informazioni in formato XML, aggiungere il link a tale risorsa nell’header della pagina, ed il gioco è fatto; il browser penserà poi a recuperare in automatico le informazioni e a “proporvi” il provider di ricerca da aggiungere.
Il codice dell’HttpHandler è veramente banale e lo potete vedere qui di seguito:

[csharp]
public class OpenSearchHandler : HttpHandlerBase
{
    private readonly ISiteConfigurationService siteConfigurationService;
    private readonly IUrlBuilderService urlBuilder;

    public OpenSearchHandler ()
    {
        siteConfigurationService = IoC.Resolve&amp;lt;ISiteConfigurationService&amp;gt; ();
        urlBuilder = IoC.Resolve&amp;lt;IUrlBuilderService&amp;gt; ();
    }

    public OpenSearchHandler ( ISiteConfigurationService siteConfigurationService , IUrlBuilderService urlBuilder )
    {
        this.siteConfigurationService = siteConfigurationService;
        this.urlBuilder = urlBuilder;
    }

    public override void ProcessRequest ( HttpContextBase context )
    {
        SiteConfigurationDTO configuration = siteConfigurationService.GetConfiguration ();

        StringBuilder sb = new StringBuilder ( &quot;&amp;lt;OpenSearchDescription xmlns=\&quot;http://a9.com/-/spec/opensearch/1.1/\&quot;&amp;gt; &quot; );
        sb.AppendFormat ( &quot;&amp;lt;ShortName&amp;gt;{0}&amp;lt;/ShortName&amp;gt;&quot; , configuration.BlogName );
        sb.AppendFormat ( &quot;&amp;lt;Description&amp;gt;{0}&amp;lt;/Description&amp;gt;&quot; , configuration.SeoConfiguration.DefaultDescription );
        sb.AppendFormat ( &quot;&amp;lt;Image height=\&quot;16\&quot; width=\&quot;16\&quot; type=\&quot;image/vnd.microsoft.icon\&quot;&amp;gt;{0}{1}&amp;lt;/Image&amp;gt;&quot; , urlBuilder.SiteWithHttp () , &quot;Images/favicon.ico&quot; );
        sb.AppendFormat(&quot;&amp;lt;Url type=\&quot;text/html\&quot; template=\&quot;{0}blog/search?q={1}\&quot; /&amp;gt; &quot;, urlBuilder.SiteWithHttp(), &quot;{searchTerms}&quot;);
        sb.AppendFormat(&quot;&amp;lt;Url type=\&quot;application/rss+xml\&quot; template=\&quot;{0}blog/search?q={1}\&quot; /&amp;gt; &quot;, urlBuilder.SiteWithHttp(), &quot;{searchTerms}&quot;);
        sb.Append ( &quot;&amp;lt;/OpenSearchDescription&amp;gt;&quot; );

        context.Response.ContentEncoding = Encoding.UTF8;
        AddHeaders ( &quot;text/xml&quot; , 30 , sb.GetHashCode () );

        context.Response.Write ( sb.ToString () );
    }
}
[/csharp]

Mentre per quanto riguarda l’header della pagina html, è sufficiente inserire il seguente markup html:
[xml]&amp;lt;link type=&quot;application/opensearchdescription+xml&quot; rel=&quot;search&quot; title=&quot;Il blog di ugo lattanzi&quot; href=&quot;/opensearch.axd&quot;/&amp;gt;[/xml]
A questo punto il risultato dovrebbe essere più o meno quello riportato negli screenshot seguenti:

<strong>Internet Explorer:</strong>

<a href="http://tostring.it/UserFiles/imperugo/image_8.png" rel="shadowbox[OpenSearch]"><img style="margin: 0px 5px 0px 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="image" alt="image" src="http://tostring.it/UserFiles/imperugo/image_thumb_3.png" width="249" height="164" border="0" /></a><a href="http://tostring.it/UserFiles/imperugo/image_10.png" rel="shadowbox[OpenSearch]"><img style="background-image: none; margin: 0px 5px 0px 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="image" alt="image" src="http://tostring.it/UserFiles/imperugo/image_thumb_4.png" width="216" height="164" border="0" /></a><a href="http://tostring.it/UserFiles/imperugo/image_12.png" rel="shadowbox[OpenSearch]"><img style="background-image: none; margin: 0px 5px 0px 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="image" alt="image" src="http://tostring.it/UserFiles/imperugo/image_thumb_5.png" width="249" height="164" border="0" /></a>

<strong>FireFox:</strong>

<a href="http://tostring.it/UserFiles/imperugo/image_2_1.png" rel="shadowbox[OpenSearch]"><img style="background-image: none; margin: 0px 5px 0px 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="image" alt="image" src="http://tostring.it/UserFiles/imperugo/image_thumb_1.png" width="243" height="164" border="0" /></a><a href="http://tostring.it/UserFiles/imperugo/image_4.png" rel="shadowbox[OpenSearch]"><img style="background-image: none; margin: 0px 5px 0px 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="image" alt="image" src="http://tostring.it/UserFiles/imperugo/image_thumb_1_1.png" width="226" height="164" border="0" /></a><a href="http://tostring.it/UserFiles/imperugo/image_6.png" rel="shadowbox[OpenSearch]"><img style="background-image: none; margin: 0px 5px 0px 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="image" alt="image" src="http://tostring.it/UserFiles/imperugo/image_thumb_2.png" width="231" height="164" border="0" /></a>

Nota: Chi fosse interessato può esporre anche il suggest nella ricerca, restituendo un set di informazioni in formato json (vedi <a title="OpenSearch Suggest" href="http://www.opensearch.org/Specifications/OpenSearch/Extensions/Suggestions/1.1" target="_blank" rel="nofollow">qui</a>).

Ciauz
