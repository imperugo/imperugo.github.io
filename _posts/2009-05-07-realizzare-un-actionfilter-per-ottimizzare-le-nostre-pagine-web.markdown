---
layout: post
status: publish
published: true
title: Realizzare un ActionFilter per ottimizzare le nostre pagine web.
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1635
wordpress_url: http://imperugo.tostring.it/blog/post/realizzare-un-actionfilter-per-ottimizzare-le-nostre-pagine-web/
date: 2009-05-07 08:19:01.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- Ottimizzazione
- ASP.NET
- HttpModule
- ActionResult
comments: true
---
<p>Fin dalla Preview 2 del Framework <a target="_blank" href="http://www.asp.net/mvc">ASP.NET MVC</a> sono stati introdotti gli <a target="_blank" href="http://msdn.microsoft.com/en-us/library/dd410209.aspx">ActionFilter</a>, che permettono di variare o migliorare il comportamento di un <strong>Controller </strong>o della singola <strong>Action </strong>in esso contenuta, consentendo cos&igrave; un forte riutilizzo del codice. <br />
Il loro utilizzo &egrave; piuttosto semplice: basta decorare la Action o il Controller con l'attributo e implementare la logica nei metodi esposti dall'ActionFilter base da cui tutti ereditano. <br />
I metodi messi a disposizione sono 4:</p>
<ul>
    <li><strong>OnActionExecuted</strong>;</li>
    <li><strong>OnActionExecuting</strong>;</li>
    <li><strong>OnResultExecuted</strong>;</li>
    <li><strong>OnResultExecuting</strong>;</li>
</ul>
<p><br />
Per capire pi&ugrave; a fondo le potenzialit&agrave; e semplicit&agrave; di utilizzo di questi ActionFilter ci basti osservare lo snippet seguente che abilita l&rsquo;accesso alla Action soltato agli utenti presenti nel ruolo di Administrator.</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
[Authorize(Roles = &quot;Administrator&quot;)]
public ActionResult Index()
{
    //Nostra Action
}</pre>{% endraw %}
<p>Ovviamente nel Framework troviamo gi&agrave; parecchi ActionFilter come HandleError, OutputCache, Authorize, ecc, ma spesso non tutti riescono a soddisfare esigenze quali, ad esempio, l'abilitazione della compressione sulle pagine, la rimozione di spazi vuoti dal markup o l'aggiunta di una firma a fondo pagina. <br />
Proprio dall'esigenza di rimuovere gli spazi vuoti &egrave; nata l'idea di realizzare un custom ActionFilter, che nel nostro esempio si chiamer&agrave; OptimizationFilter, che avr&agrave; il compito di ottimizzare la nostra pagina.</p>
<p>I requisiti per un filter di questo genere sono abbastanza semplici:</p>
<ul>
    <li>Possibilit&agrave; di attivare la compressione dei dati;</li>
    <li>Possibilit&agrave; di rimuovere gli spazi vuoti dal markup;</li>
    <li>Possibilit&agrave; di ignorare l'esecuzione del filtro per tutti gli utenti presenti in un determinato ruolo;</li>
</ul>
<p>Precedentemente in <a target="_blank" href="http://www.asp.net">ASP.NET</a>, per la rimozione degli spazi vuoti dal markup veniva realizzato un HttpModule, che aveva il compito di verificare se la richiesta effettuata era rivolta verso una pagina web, e, nel caso, eseguiva una Regular Expression per la rimozione degli spazi (maggiori info qui: <a target="_blank" href="http://madskristensen.net/post/A-whitespace-removal-HTTP-module-for-ASPNET-20.aspx">http://madskristensen.net/post/A-whitespace-removal-HTTP-module-for-ASPNET-20.aspx)</a>. <br />
Purtroppo, bench&egrave; comodissime, le Regular Expression non brillano sicuramente per le performance, quindi consiglio di abbinare l'outputcache all'utilizzo di questo ActionFilter.</p>
<p>Partendo da quanto mostrato in questo post (<a target="_blank" href="http://madskristensen.net/post/The-WebOptimizer-class.aspx">http://madskristensen.net/post/The-WebOptimizer-class.aspx)</a> di <a target="_blank" href="http://madskristensen.net/">Mads Kristensen</a>, ho implementato il CustomFilter come mostrato di seguito:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
[AspNetHostingPermission(SecurityAction.Demand, Level = AspNetHostingPermissionLevel.Minimal)]
public class OptimizationFilter : ActionFilterAttribute
{
    private bool? executeUser;
    private string[] rolesException;

    public OptimizationFilter()
    {
        Compress = false;
        RemoveWhiteSpace = false;
    }

    public bool Compress { get; set; }
    public bool RemoveWhiteSpace { get; set; }

    public string RolesException
    {
        get { return string.Join(&quot;,&quot;, rolesException); }
        set { rolesException = value.Split(&quot;,&quot;); }
    }

    public override void OnActionExecuting(ActionExecutingContext filterContext)
    {
        bool execute = Execute(filterContext);

        if (!execute)
            return;

        if (!Compress)
            base.OnActionExecuting(filterContext);

        HttpRequestBase request = filterContext.HttpContext.Request;

        string acceptEncoding = request.Headers[&quot;Accept-Encoding&quot;];

        if (string.IsNullOrEmpty(acceptEncoding))
            return;

        acceptEncoding = acceptEncoding.ToUpperInvariant();

        HttpResponseBase response = filterContext.HttpContext.Response;

        if (acceptEncoding.Contains(&quot;GZIP&quot;))
        {
            response.AppendHeader(&quot;Content-encoding&quot;, &quot;gzip&quot;);
            response.Filter = new GZipStream(response.Filter, CompressionMode.Compress);
        }
        else if (acceptEncoding.Contains(&quot;DEFLATE&quot;))
        {
            response.AppendHeader(&quot;Content-encoding&quot;, &quot;deflate&quot;);
            response.Filter = new DeflateStream(response.Filter, CompressionMode.Compress);
        }
    }

    private bool Execute(ControllerContext filterContext)
    {
        bool execute = true;

        if (rolesException == null)
            executeUser = true;

        if (executeUser != null)
            return executeUser.Value;

        for (int i = 0; i &lt; rolesException.Length; i++)
            if (filterContext.HttpContext.User.IsInRole(rolesException[i]))
            {
                execute = false;
                break;
            }

        executeUser = execute;

        return execute;
    }

    public override void OnResultExecuted(ResultExecutedContext filterContext)
    {
        base.OnResultExecuted(filterContext);

        if (!Execute(filterContext))
            return;

        if (RemoveWhiteSpace)
            filterContext.HttpContext.Response.Filter = new WhitespaceFilter(filterContext.HttpContext.Response.Filter);
    }
}

internal class WhitespaceFilter : Stream
{
    private static readonly Regex RegexBetweenTags = new Regex(@&quot;&gt;\s+&lt;&quot;, RegexOptions.Compiled);
    private static readonly Regex RegexLineBreaks = new Regex(@&quot;\n\s+&quot;, RegexOptions.Compiled);

    private readonly Stream sink;

    public WhitespaceFilter(Stream sink)
    {
        this.sink = sink;
    }

    public override void Flush()
    {
        sink.Flush();
    }

    public override long Seek(long offset, SeekOrigin origin)
    {
        return sink.Seek(offset, origin);
    }

    public override void SetLength(long value)
    {
        sink.SetLength(value);
    }

    public override void Close()
    {
        sink.Close();
    }

    public override int Read(byte[] buffer, int offset, int count)
    {
        return sink.Read(buffer, offset, count);
    }

    public override void Write(byte[] buffer, int offset, int count)
    {
        var data = new byte[count];
        Buffer.BlockCopy(buffer, offset, data, 0, count);
        string html = Encoding.Default.GetString(buffer);


        html = RegexBetweenTags.Replace(html, &quot;&gt; &lt;&quot;);
        html = RegexLineBreaks.Replace(html, string.Empty);
        html = html.Replace(&quot;\r&quot;, string.Empty);
        html = html.Replace(&quot;//&lt;![CDATA[&quot;, string.Empty);
        html = html.Replace(&quot;//]]&gt;&quot;, string.Empty);
        html = html.Replace(&quot;\n&quot;, string.Empty); 

        byte[] outdata = Encoding.Default.GetBytes(html.Trim());
        sink.Write(outdata, 0, outdata.GetLength(0));
    }

    public override bool CanRead
    {
        get { return true; }
    }

    public override bool CanSeek
    {
        get { return true; }
    }

    public override bool CanWrite
    {
        get { return true; }
    }

    public override long Length
    {
        get { return 0; }
    }

    public override long Position { get; set; }
}</pre>{% endraw %}
<p>Come si potr&agrave; notare, l&rsquo; ActionFilter ha esposte tre propriet&agrave;:</p>
<ul>
    <li><strong>Compress; </strong></li>
    <li><strong>RemoveWhiteSpace; </strong></li>
    <li><strong>RolesException; </strong></li>
</ul>
<p>La prima serve per impostare la compressione, la seconda a rimuovere gli spazi vuoti dal markup e la terza per disabilitare le prime solo ad alcuni ruoli; proprio quest'ultima si pu&ograve; rivelare molto utile nel caso si debbano effettuare controlli sul markup. <br />
Come si pu&ograve; vedere dallo snippet seguente il suo utilizzo risulta molto semplice.</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
[OptimizationFilter(Compress = false, RemoveWhiteSpace = true, RolesException = &quot;CSSDesigner,MarkupDesigner&quot;)]
public ActionResult Index(string page)
{
    //Nostra Action
}</pre>{% endraw %}
<p>Ulteriori informazioni riguardo agli Action Filter le potete trovare <a target="_blank" href="http://weblogs.asp.net/scottgu/archive/2008/07/14/asp-net-mvc-preview-4-release-part-1.aspx">qui</a>.</p>
<p>Ciauz</p>
