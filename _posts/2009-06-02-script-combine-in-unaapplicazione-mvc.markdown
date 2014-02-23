---
layout: post
status: publish
published: true
title: Script Combine in una'Applicazione MVC
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1626
wordpress_url: http://imperugo.tostring.it/blog/post/script-combine-in-una-applicazione-mvc/
date: 2009-06-02 13:29:13.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- Ottimizzazione
- ASP.NET
- .NET
- Ajax
- Cache
comments: true
---
<p>In un <a target="_blank" href="http://imperugo.tostring.it/Blog/Post/ASP-Combine">post precedente</a> avevo parlato dell&rsquo;utilit&agrave; dello <strong>Script Combine</strong> introdotto con la <strong>Service Pack 1</strong> di <a rel="nofollow" target="_blank" href="http://www.asp.net">ASP.NET</a>, che permette di ridurre le chiamate dal client verso il server riunendo pi&ugrave; files <a rel="nofollow" target="_blank" href="http://en.wikipedia.org/wiki/Javascript_">Javascript</a><strong> </strong>in un unico file. <br />
Purtroppo questa tecnologia non &egrave; presente in <a rel="nofollow" target="_blank" href="http://www.asp.net/mvc">ASP.NET MVC</a>, ma &egrave; facilmente realizzabile andando a creare un <a rel="nofollow" target="_blank" href="http://msdn.microsoft.com/en-us/library/5c67a8bd%28VS.71%29.aspx">HttpHandler</a> che raggruppi in un&rsquo;unica richesta tutti i files <a rel="nofollow" target="_blank" href="http://en.wikipedia.org/wiki/Javascript_">Javascript</a>, ed ottimizzando il risultato tramite quella tecnica chiamata &ldquo;Minification&rdquo; (maggiori info le trovate <a target="_blank" href="http://blogs.ugidotnet.org/marcom/archive/2009/06/01/quotminificarequot-i-javascript.aspx">qui</a>.) che consiste nella rimozione degli spazi, newline, ecc dall&rsquo;output.</p>
<p>L&rsquo;HttpHandler avr&agrave; il compito di leggere il contenuto dei files <a rel="nofollow" target="_blank" href="http://en.wikipedia.org/wiki/Javascript_">Javascript</a> dal disco, riunirli in un&rsquo;unica stringa, ottimizzarla tramite un&rsquo;apposita classe e mettere il tutto in cache, in modo da non rielaborare tutti i files ad ogni richiesta.</p>
<p>Nel codice seguente potete trovare l&rsquo;implementazione dell&rsquo;HttpHandler, che sfrutta una sezione nel file di configurazione per recuperare i files da unire; la parte di &ldquo;Minification&rdquo; &egrave; basata su questo <a rel="nofollow" target="_blank" href="http://www.west-wind.com/Weblog/posts/196267.aspx">ottimo post</a> di <a rel="nofollow" target="_blank" href="http://www.west-wind.com/Weblog/default.aspx">Rick Strahl</a>.</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
public class CombineHandler : IHttpHandler
{
    #region IHttpHandler Members

    public bool IsReusable
    {
        get { return false; }
    }

    public void ProcessRequest(HttpContext context)
    {
        string javascriptCombineName = context.Request.QueryString[&quot;jscn&quot;];
        string javascritpCombineVersion = context.Request.QueryString[&quot;v&quot;];

        string cacheKey = string.Format(&quot;JSCOMBINE_{0}_{1}&quot;, javascriptCombineName, javascritpCombineVersion);

        string output = context.Cache.Get(cacheKey) as string;

        if (string.IsNullOrEmpty(output))
        {
            output = GetValue(javascriptCombineName, context);

            context.Cache.Insert(cacheKey, output);
        }

        context.Response.ContentType = @&quot;text/javascript&quot;;
        context.Response.Write(output);
        context.Response.End();
    }

    #endregion

    private static string GetValue(string javascriptCombineName, HttpContext context)
    {
        string configurationValue = ConfigurationManager.AppSettings[javascriptCombineName];

        string[] files = configurationValue.Split(new[] {','}, StringSplitOptions.RemoveEmptyEntries);

        StringBuilder allScripts = new StringBuilder();

        for (int i = 0; i &lt; files.Length; i++)
        {
            string path = context.Server.MapPath(files[i].Trim());

            if (File.Exists(path))
                allScripts.Append(File.ReadAllText(path));
        }

        JavaScriptMinifier jsm = new JavaScriptMinifier();
        return jsm.MinifyString(allScripts.ToString());
    }
}</pre>{% endraw %}
<div id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:c8174e7e-362c-439e-aaa7-629b7c6a47b6" class="wlWriterEditableSmartContent" style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px">
<p>Download Esempio <a target="_blank" href="http://imperugo.tostring.it/Content/Uploaded/image/ScriptCombineMVC.rar">qui</a></p>
</div>
