---
layout: post
status: publish
published: true
title: Service Oriented e i tanti file di configurazione
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1644
wordpress_url: http://imperugo.tostring.it/blog/post/service-oriented-e-i-tanti-file-di-configurazione/
date: 2008-11-11 01:00:00.000000000 +00:00
categories:
- .NET
tags:
- Windows Communication Foundation
- SOA
- Configurazione
comments: true
---
<p><span>Una delle cose scomode che si ha in un'applicazione service oriented &egrave; il deploy e i numerosi file di configurazione. Se penso alla nostra attuale struttura parliamo di circa 20 servizi e di altrettanti file di configurazione. </span></p>
<p>Molto spesso questi file di configurazione hanno parti in comune tra loro, tipo custom section, behaviors, ecc e ogni qual volta devi cambiare una di queste parti sei costretto a dover modificare decine di file di configurazione.<br />
Per ovviare il problema mi sono venute in mente due soluzione (se ne avete altre sono ben accette :D):</p>
<ol>
    <li>Mettere le configurazioni in comune su file di configurazione esterni;</li>
    <li>Creare un file di configurazione comune a tutti i servizi.</li>
</ol>
<p>Diciamo che mi &egrave; piaciuta pi&ugrave; la seconda opzione, minor numero di file da gestire e maggior difficolt&agrave; nel realizzare la cosa :D (per la serie le cose semplici non ci piacciono).</p>
<p>Detto ci&ograve; ne &egrave; uscita la seguente classe:</p>
{% raw %}<pre title="code" class="brush: csharp; ruler: true;">
using System; 
using System.Configuration; 
using System.IO; 
using System.ServiceModel; 
using System.ServiceModel.Configuration; 
using System.Web.Hosting; 

public class MyServiceHost : ServiceHost 
{ 
    private string configPath; 

    /// &lt;summary&gt; 
    /// Initializes a new instance of the &lt;see cref=&quot;MyServiceHost&quot;&gt; class. 
    /// &lt;/see&gt; 
    /// &lt;/summary&gt; 
    /// &lt;param name=&quot;serviceType&quot; /&gt;Type of the service. 
    /// &lt;param name=&quot;baseAddresses&quot; /&gt;The base addresses. 
    public MyServiceHost(Type serviceType, params Uri[] baseAddresses) : base(serviceType, baseAddresses) 
    { 
    } 

    /// &lt;summary&gt; 
    /// Initializes a new instance of the &lt;see cref=&quot;MyServiceHost&quot;&gt; class. 
    /// &lt;/see&gt; 
    /// &lt;param name=&quot;singletonInstance&quot; /&gt;The instance of the hosted service. 
    /// &lt;param name=&quot;baseAddresses&quot; /&gt;An &lt;see cref=&quot;T:System.Array&quot;&gt; of type &lt;see cref=&quot;T:System.Uri&quot;&gt; that contains the base addresses for the hosted service. 
    /// &lt;exception cref=&quot;T:System.ArgumentNullException&quot;&gt; 
    ///     &lt;paramref name=&quot;singletonInstance&quot;&gt; is null.&lt;/paramref&gt; 
    public MyServiceHost(object singletonInstance, params Uri[] baseAddresses) 
        : base(singletonInstance, baseAddresses) 
    { 
    } 

    private string ConfigPath 
    { 
        get 
        { 
            if (configPath == null) 
            { 
                // Hostato in IIS 
                configPath = HostingEnvironment.ApplicationPhysicalPath; 

                if (String.IsNullOrEmpty(configPath)) 
                    //Non hostato da IIS 
                    configPath = Directory.GetCurrentDirectory(); 
            } 

            return configPath; 
        } 
    } 

    /// &lt;summary&gt; 
    /// Loads the service description information from the configuration file and applies it to the runtime being constructed. 
    /// &lt;/summary&gt; 
    /// &lt;exception cref=&quot;T:System.InvalidOperationException&quot;&gt;The description of the service hosted is null.&lt;/exception&gt; 
    protected override void ApplyConfiguration() 
    { 
        // generate the name of the custom configFile, from the service name: 
        string configFilename = Path.Combine(ConfigPath, 
                                             String.Format(&quot;{0}.config&quot;, Description.Name)); 

        if (!string.IsNullOrEmpty(configFilename) &amp;&amp; File.Exists(configFilename)) 
            base.ApplyConfiguration(); 
        else 
            LoadConfigFromCustomLocation(@&quot;C:\Temp\Services.config&quot;); 
    } 


    /// &lt;summary&gt; 
    /// Load the config file from custom location. 
    /// &lt;/summary&gt; 
    /// &lt;param name=&quot;configFilename&quot; /&gt;The config filename. 
    private void LoadConfigFromCustomLocation(string configFilename) 
    { 
        var filemap = new ExeConfigurationFileMap {ExeConfigFilename = configFilename}; 

        Configuration config = 
            ConfigurationManager.OpenMappedExeConfiguration 
                (filemap, 
                 ConfigurationUserLevel.None); 

        ServiceModelSectionGroup serviceModel = ServiceModelSectionGroup.GetSectionGroup(config); 

        if (serviceModel == null) 
            throw new ConfigurationErrorsException(&quot;There are a problem with the configuration file.&quot;); 

        bool loaded = false; 
        foreach (ServiceElement se in serviceModel.Services.Services) 
        { 
            if (!loaded) 
                if (se.Name == Description.ConfigurationName) 
                { 
                    LoadConfigurationSection(se); 
                    loaded = true; 
                } 
        } 
        if (!loaded) 
            throw new ArgumentException(&quot;ServiceElements not found in the configuration file.&quot;); 
    } 
}</pre>{% endraw %}
<p><span id="PostView">Il modo di utilizzarlo rimane lo stesso:</span></p>
{% raw %}<pre title="code" class="brush: csharp">
ServiceHost service = new MtvServiceHost(typeof(EmailService)); 
service.Open();</pre>{% endraw %}
<p><span>Nel file Services.config possiamo configurare tutti i servizi di cui abbiamo bisogno, ma tutto il resto del file di configurazione &egrave; comune a tutti.<br />
Cambiamo un custom behavior comune a tutti, lo facciamo in un unico posto in un unico file!<br />
<br />
Per ora sembra funzionare :D</span></p>
<p>&nbsp;</p>
