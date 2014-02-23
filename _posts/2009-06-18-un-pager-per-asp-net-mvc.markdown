---
layout: post
status: publish
published: true
title: Un Pager per ASP.NET MVC
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1620
wordpress_url: http://imperugo.tostring.it/blog/post/un-pager-per-aspnet-mvc/
date: 2009-06-18 01:59:01.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- UserControls
- ASP.NET
- .NET
- Controls
- Framework
- Controller
comments: true
---
<p>Se si è abituati a sviluppare applicazioni con <a href="http://www.asp.net" rel="nofollow" target="_blank">ASP.NET</a> e si passa successivamente a sviluppare con il Framework <a href="http://www.asp.net/mvc" rel="nofollow" target="_blank">ASP.NET MVC</a>, la prima cosa di cui si sente la mancanza sono i controlli, che in MVC mancano proprio.</p>  <p>Uno tra questi è il controllo <strong>Pager</strong> che, come fa ben intuire il nome, serve per gestire la paginazione in tutte quelle parti dei siti web in cui non è possibile mostrare l’elenco completo dei contenuti in un’unica pagina.</p>  <p>Per poter creare un controllo <strong>Pager</strong> riutilizzabile in tutte le applicazion <strong>MVC</strong> based, è necessario stabilire tutto ciò che serve per poter creare questo tipo di controllo, ossia:</p>  <ul>   <li>Numero totale di pagine (<strong>TotalCount</strong>); </li>    <li>Numero di contenuti per pagina (<strong>PageSize</strong>); </li>    <li>Pagina corrente (<strong>PageIndex</strong>); </li>    <li>Parametro da utilizzare in querystring per comunicare al server la nuova pagina (<strong>ParameterName</strong>); </li> </ul>  <p>Dato che gli MVC ViewUserControl, come le MVC ViewPage, possono avere un Model da utilizzare all’interno del controllo, come prima cosa sarà necessario costruirne uno come il seguente:</p>  {% raw %}<pre class="brush: csharp; ruler: true;">public class PagerViewModel
{
    public PagerViewModel(string parameterName, int totalCount, int pageSize, int pageIndex)
    {
        ParameterName = parameterName;
        TotalCount = totalCount;
        PageSize = pageSize;
        PageIndex = pageIndex;
    }

    public int PageIndex { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public string ParameterName { get; set; }

    public int TotalPages
    {
        get { return (int) (TotalCount/(long) PageSize) + (TotalCount%(long) PageSize == 0 ? 0 : 1); }
    }

    public bool HasPreviousPage
    {
        get { return (PageIndex &gt; 1); }
    }

    public bool HasNextPage
    {
        get { return (PageIndex*PageSize) &lt;= TotalCount; }
    }

    public string PageActionLink(int pageIndex)
    {
        if (HttpContext.Current.Request.QueryString.Count &gt; 0)
        {
            string q = string.Concat(HttpContext.Current.Request.Url.AbsolutePath, &quot;?&quot;, HttpContext.Current.Request.QueryString.ToString(), &quot;&amp;&quot;, ParameterName + &quot;=&quot;, pageIndex);

            if (!string.IsNullOrEmpty(HttpContext.Current.Request.QueryString[ParameterName]))
            {
                string qs = HttpContext.Current.Request.QueryString.ToString();
                string oldvalue = string.Concat(ParameterName, &quot;=&quot;, HttpContext.Current.Request.QueryString[ParameterName]);
                string newvalue = string.Concat(ParameterName, &quot;=&quot;, pageIndex);

                qs = qs.Replace(oldvalue, newvalue);

                return string.Concat(HttpContext.Current.Request.Url.AbsolutePath, &quot;?&quot;, qs);
            }

            return q;
        }

        return string.Concat(HttpContext.Current.Request.Url.AbsolutePath, &quot;?&quot;, ParameterName + &quot;=&quot;, pageIndex);
    }

    public string GetPageUrl()
    {
        return HttpContext.Current.Request.Url.AbsolutePath + &quot;?&quot; + ParameterName + &quot;=&quot; + PageIndex;
    }
}</pre>{% endraw %}

<p>Da qui, con una serie di istruzioni <strong><em>if,</em></strong> è facile creare la struttura per la paginazione, come mostrato dal markup seguente:</p>

{% raw %}<pre class="brush: xml; ruler: true;">&lt;%@ Control Language=&quot;C#&quot; Inherits=&quot;System.Web.Mvc.ViewUserControl&lt;PagerViewModel&gt;&quot; %&gt;
&lt;%@ Import Namespace=&quot;imperugo.sample.mvc.pager.Models&quot;%&gt;

&lt;% if (Model.TotalPages &gt; 1) { %&gt;
&lt;div class=&quot;pnavigation&quot;&gt;
    &lt;div class=&quot;pager&quot;&gt;
        &lt;span class=&quot;pages&quot;&gt;&amp;#8201;&lt;%= Model.PageIndex %&gt; di &lt;%= Model.TotalPages %&gt;&amp;#8201;&lt;/span&gt;
        &lt;% if (Model.PageIndex &gt; 1) { %&gt;
        &lt;a href=&quot;&lt;%=Model.PageActionLink (1)%&gt;&quot; title=&quot;&amp;laquo; First&quot;&gt;&amp;#8201;&amp;laquo; First&amp;#8201;&lt;/a&gt;
        &lt;% } %&gt;
        &lt;% if (Model.PageSize - Model.PageSize &gt; 0) { %&gt;
            &lt;a href=&quot;&lt;%=Model.PageActionLink((Model.PageIndex - Model.PageSize) + 1)%&gt;&quot; title=&quot;&lt;%=(Model.PageIndex - Model.PageSize) + 1%&gt;&quot;&gt;&amp;#8201;...&amp;#8201;&lt;/a&gt;
        &lt;% } %&gt;
        &lt;% if (Model.HasPreviousPage) { %&gt;  
            &lt;a href=&quot;&lt;%=Model.PageActionLink((Model.PageIndex - 1))%&gt;&quot; title=&quot;Previous&quot; &gt;&amp;laquo;&lt;/a&gt;
        &lt;% } %&gt;
        &lt;% for (int page = Model.PageIndex; page &lt; Math.Round((Model.TotalCount / Model.PageSize) + 0.5) &amp;&amp; page &lt; Model.PageIndex + Model.PageSize; page++)
           { %&gt;
            &lt;% if (page == Model.PageIndex) { %&gt;
                &lt;span class=&quot;current&quot;&gt;&amp;#8201;&lt;%= Model.PageIndex %&gt;&amp;#8201;&lt;/span&gt;
            &lt;% } else { %&gt;
                &lt;a href=&quot;&lt;%=Model.PageActionLink(page)%&gt;&quot; title=&quot;&lt;%=page.ToString()%&gt;&quot;&gt;&amp;#8201;&lt;%=page.ToString()%&gt;&amp;#8201;&lt;/a&gt;
            &lt;% } %&gt;
        &lt;% } %&gt;
              
        &lt;% if (Model.HasNextPage) { %&gt;  
            &lt;a href=&quot;&lt;%=Model.PageActionLink ((Model.PageIndex + 1))%&gt;&quot; title=&quot;Next&quot; &gt;&amp;raquo;&lt;/a&gt;
        &lt;% } %&gt;
        &lt;% if (Model.PageIndex + Model.PageSize &lt;= (Math.Round((Model.TotalCount / Model.PageSize) + 0.5) - 1)) { %&gt;
            &lt;a href=&quot;&lt;%=Model.PageActionLink((Model.PageIndex + Model.PageSize) + 1)%&gt;&quot; title=&quot;&lt;%=(Model.PageIndex + Model.PageSize) + 1%&gt;&quot;&gt;&amp;#8201;...&amp;#8201;&lt;/a&gt;
        &lt;% } %&gt; 
        &lt;% if (Model.PageIndex &lt; Model.TotalPages) { %&gt;
        &lt;a href=&quot;&lt;%=Model.PageActionLink(Model.TotalPages)%&gt;&quot; title=&quot;Last &amp;raquo;&quot;&gt;&amp;#8201;Last &amp;raquo;&amp;#8201;&lt;/a&gt;
        &lt;% } %&gt;
    &lt;/div&gt;
&lt;/div&gt;        
&lt;% } &gt;</pre>{% endraw %}

<p>Ora che si hanno a disposizione sia l’ MVC ViewUserControl che il suo Model, è necessario popolare quest’ultimo dal controller come mostrato di seguito:</p>

{% raw %}<pre class="brush: csharp; ruler: true;">[HandleError]
public class HomeController : Controller
{
    public ActionResult Index(string page)
    {
        int pageIndex = string.IsNullOrEmpty(page) ? 1 : int.Parse(page);
        const int PAGE_SIZE = 10;

        HomeModel hm = new HomeModel();
        hm.News = GetNews(pageIndex, PAGE_SIZE);
        hm.NewsPage = new PagerViewModel(&quot;page&quot;, GetTotalNumber(), PAGE_SIZE, pageIndex);

        return View(hm);
    }

....

}</pre>{% endraw %}

<p>L’ultimo snippet mostra come utilizzare l’ MVC ViewUserControl&#160; dalla View.</p>

{% raw %}<pre class="brush: xml; ruler: true;">&lt;asp:Content ID=&quot;indexContent&quot; ContentPlaceHolderID=&quot;MainContent&quot; runat=&quot;server&quot;&gt;
    &lt;% for (int i = 0; i &lt; Model.News.Count; i++) { %&gt;
        &lt;div&gt;&lt;%= Model.News[i].Title %&gt;&lt;/div&gt;
    &lt;% } %&gt;
    &lt;div class=&quot;pager&quot;&gt;
        &lt;% Html.RenderPartial(&quot;~/Views/Shared/PagerUserControl.ascx&quot;, Model.NewsPage); %&gt;
    &lt;/div&gt;
&lt;/asp:Content&gt;</pre>{% endraw %}

<p>Nello screeshot seguente è visibile il risultato raggiunto nell’esempio allegato.</p>

<p><a href="http://imperugo.tostring.it/Content/Uploaded/image/MVC%20Pager_2.png" rel="shadowbox[Un-Pager-per-ASPNET-MVC];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="MVC Pager" border="0" alt="MVC Pager" src="http://imperugo.tostring.it/Content/Uploaded/image/MVC%20Pager_thumb.png" width="244" height="150" /></a> </p>



<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:a56b200d-d628-48ce-b9b5-75b5513992ea" class="wlWriterEditableSmartContent"><p>Download esempio <a href="http://imperugo.tostring.it/Content/Uploaded/image/imperugo.sample.mvc.pager.zip" target="_blank">qui</a></p></div>
