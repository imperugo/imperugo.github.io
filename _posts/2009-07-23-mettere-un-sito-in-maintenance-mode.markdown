---
layout: post
status: publish
published: true
title: Mettere un sito in  Maintenance mode.
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1595
wordpress_url: http://imperugo.tostring.it/blog/post/mettere-un-sito-in-maintenance-mode/
date: 2009-07-23 10:15:50.000000000 +01:00
categories:
- ASP.NET
tags:
- SEO
- ASP.NET
- Configurazione
- Deploy
- HttpModule
comments: true
---
<p>Mentre pianificavo il deploy di una nuova versione di <a href="http://imperugo.tostring.it/About/Dexter" title="Dexter Blog Engine" target="_blank">Dexter</a>, mi &egrave; venuto in mente di realizzare un <a href="http://msdn.microsoft.com/en-us/library/zec9k340(VS.71).aspx" title="HttpModule" target="_blank">HttpModule</a> che bloccasse l&rsquo;accesso al sito a tutti clients non provenienti da un determinanto indirizzo IP, reindirizzandoli verso una pagina temporanea che comunicava all&rsquo;utente che era in corso un aggiornamento.</p>
<p>Fin qui nulla di particolare, un semplice <a href="http://msdn.microsoft.com/en-us/library/zec9k340(VS.71).aspx" title="HttpModule" target="_blank">HttpModule</a> che&nbsp; verifica IPAddress del client e, nel caso questo non sia presente nella &ldquo;white list&rdquo;, effettua un semplice redirect.</p>
<p><strong>Ma cosa accade nel caso in cui un crawler di un search engine passi in quel determinato momento?</strong></p>
<p>Una buona soluzione &egrave; quella di comunicare al bot che il sito non &egrave; momentaneamente disponibile e di rimandare la fase di crawling.</p>
<p>Per far ci&ograve; una possibile soluzione consiste nell&rsquo;effettuare il redirect di ogni pagina verso un&rsquo;altra, ed impostare uno status code differente, cos&igrave; che il search engine non sostituisca nell&rsquo;indice il contenuto della pagina richiesta con quello della pagina temporanea.</p>
<p><strong>Ma quale status code &egrave; pi&ugrave; adatto a questo tipo di operazione?</strong></p>
<p>Leggendo da <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html" title="W3C Status Code" rel="nofollow" target="_blank">W3C</a>, un possibile status code sarebbe il &ldquo;503 Service Unavailable&rdquo;, ma questo non &egrave; customizzabile come spiegato qui:</p>
<blockquote>
<p>The 503 error cannot be customized because they are handled in the kernel mode by HTTP.sys. This means that user-mode routines cannot be run.</p>
</blockquote>
<p>Una soluzione alternativa &egrave; effettuare un &ldquo;302 Found&rdquo; ad una pagina html custom, che verr&agrave; esclusa dall&rsquo;indicizzazione tramite l&rsquo;apposito file Robots.txt.</p>
<p>Il redirect con status code 302 indica al client che il contenuto &egrave; stato spostato solo temporaneamente verso il nuovo indirizzo, e che successivamente potr&agrave; trovarlo nuovamente al vecchio url.</p>
<p>Questo permette di reindirizzare il client verso una pagina esclusa dall&rsquo;indicizzazione.</p>
<p>Di seguito potete trovare il codice e l&rsquo;apposita area di configurazione del HttpModule.</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
public class MaintenanceModule : IHttpModule
{
    #region IHttpModule Members

    public void Dispose()
    {
    }

    public void Init(HttpApplication context)
    {
        if (MaintenanceConfiguration.Instance.EnableMaintenance)
            context.BeginRequest += context_BeginRequest;
    }

    #endregion

    private void context_BeginRequest(object sender, EventArgs e)
    {
        HttpContext context = HttpContext.Current;

        if (context.Request.Url.AbsolutePath == MaintenanceConfiguration.Instance.AbsolutePagePath)
            return;

        if (MaintenanceConfiguration.Instance.AllowedIP.Split(new[] {','}, StringSplitOptions.RemoveEmptyEntries).Contains(context.Request.UserHostAddress))
            return;

        context.Response.StatusCode = 302;
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
        context.Response.AddHeader(&quot;Location&quot;, MaintenanceConfiguration.Instance.AbsolutePagePath);
    }
}</pre>{% endraw %}
<p>&nbsp;</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
/// &lt;summary&gt;
/// Maintenance Configuration class.
/// &lt;/summary&gt;
public static class MaintenanceConfiguration
{
    private static readonly MaintenanceConfigurationSection section;

    /// &lt;summary&gt;
    /// Initializes the &lt;see cref=&quot;MaintenanceConfiguration&quot;/&gt; class.
    /// &lt;/summary&gt;
    static MaintenanceConfiguration()
    {
        section = ConfigurationManager.GetSection(&quot;dexter.maintenance.configurationSection&quot;) as MaintenanceConfigurationSection;

        if (section == null)
            throw new MaintenanceSettingException(&quot;Maintenance section not found in the configuration file.&quot;);
    }

    /// &lt;summary&gt;
    /// Gets the instance of MaintenanceConfigurationSection class.
    /// &lt;/summary&gt;
    /// &lt;value&gt;The instance.&lt;/value&gt;
    public static MaintenanceConfigurationSection Instance
    {
        get { return section; }
    }
}

/// &lt;summary&gt;
/// Log Configuration Section class.
/// &lt;/summary&gt;
public sealed class MaintenanceConfigurationSection : ConfigurationSection
{
    [ConfigurationProperty(&quot;enableMaintenance&quot;, DefaultValue = false, IsRequired = true)]
    public bool EnableMaintenance
    {
        get { return (bool) this[&quot;enableMaintenance&quot;]; }
        set { this[&quot;enableMaintenance&quot;] = value; }
    }

    [ConfigurationProperty(&quot;allowedIP&quot;, IsRequired = true)]
    public string AllowedIP
    {
        get { return (string) this[&quot;allowedIP&quot;]; }
        set { this[&quot;allowedIP&quot;] = value; }
    }

    [ConfigurationProperty(&quot;absolutePagePath&quot;, IsRequired = true)]
    public string AbsolutePagePath
    {
        get { return (string) this[&quot;absolutePagePath&quot;]; }
        set { this[&quot;absolutePagePath&quot;] = value; }
    }
}

public class MaintenanceSettingException : Exception
{
    /// &lt;summary&gt;
    /// Initializes a new instance of the &lt;see cref=&quot;MaintenanceSettingException&quot;/&gt; class.
    /// &lt;/summary&gt;
    /// &lt;param name=&quot;message&quot;&gt;The message.&lt;/param&gt;
    public MaintenanceSettingException(string message) : base(message)
    {
    }

    /// &lt;summary&gt;
    /// Initializes a new instance of the &lt;see cref=&quot;MaintenanceSettingException&quot;/&gt; class.
    /// &lt;/summary&gt;
    /// &lt;param name=&quot;message&quot;&gt;The message.&lt;/param&gt;
    /// &lt;param name=&quot;innerException&quot;&gt;The inner exception.&lt;/param&gt;
    public MaintenanceSettingException(string message, Exception innerException) : base(message, innerException)
    {
    }

    /// &lt;summary&gt;
    /// Initializes a new instance of the &lt;see cref=&quot;MaintenanceSettingException&quot;/&gt; class.
    /// &lt;/summary&gt;
    /// &lt;param name=&quot;info&quot;&gt;The &lt;see cref=&quot;T:System.Runtime.Serialization.SerializationInfo&quot;/&gt; that holds the serialized object data about the exception being thrown.&lt;/param&gt;
    /// &lt;param name=&quot;context&quot;&gt;The &lt;see cref=&quot;T:System.Runtime.Serialization.StreamingContext&quot;/&gt; that contains contextual information about the source or destination.&lt;/param&gt;
    /// &lt;exception cref=&quot;T:System.ArgumentNullException&quot;&gt;
    /// The &lt;paramref name=&quot;info&quot;/&gt; parameter is null.
    /// &lt;/exception&gt;
    /// &lt;exception cref=&quot;T:System.Runtime.Serialization.SerializationException&quot;&gt;
    /// The class name is null or &lt;see cref=&quot;P:System.Exception.HResult&quot;/&gt; is zero (0).
    /// &lt;/exception&gt;
    public MaintenanceSettingException(SerializationInfo info, StreamingContext context)
        : base(info, context)
    {
    }
}</pre>{% endraw %}
{% raw %}<pre class="brush: xml; ruler: true;">
&lt;dexter.maintenance.configurationSection 
            enableMaintenance=&quot;true&quot; 
            allowedIP=&quot;127.0.0.1&quot; 
            absolutePagePath=&quot;/Maintenance.aspx&quot; /&gt;</pre>{% endraw %}
<p>Ciauz</p>
