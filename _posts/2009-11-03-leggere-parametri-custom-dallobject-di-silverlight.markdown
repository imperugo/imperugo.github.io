---
layout: post
status: publish
published: true
title: Leggere parametri custom dall’object di Silverlight
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1543
wordpress_url: http://imperugo.tostring.it/blog/post/leggere-parametri-custom-dall-and-rsquo-object-di-silverlight/
date: 2009-11-03 18:32:00.000000000 +00:00
categories:
- SILVERLIGHT
tags:
- Silverlight
comments: true
---
<p>Ultimamente sto lavorando ad una piccola applicazione in <a href="http://silverlight.net/" rel="nofollow" target="_blank">Silverlight</a>, nello specifico un wall di DeepZoom che ha il compito di mostrare le immagini caricate dagli utenti, sfruttando questa fantastica tecnologia.     <br />L’applicazione offre sì la possibilità di caricare le foto direttamente dagli utenti di una community, ma offre anche la possibilità di creare il wall lato editoriale, quindi da backoffice dell’applicativo, e di far ridistribuire sui clients soltanto l’object tag ed il <a href="http://en.wikipedia.org/wiki/Javascript_" rel="nofollow" target="_blank">javascript</a> necessario.</p>  <p>Proprio per questo tipo di richieste si può avere la necessità di aggiungere dei parametri custom all’object che si rilascia, in modo che fornisca alcune informazioni utili alla visualizzazione.</p>  <p>In pratica è sufficiente aggiungere un parametro, il cui name sarà <em><strong>initParams,</strong></em> nel tag object della pagina, con al suo interno la coppia chiave-valore che si desidera utilizzare in Silverlight, separati dalla virgola.     <br />L’esempio seguente mostra il markup dell’object.</p>  {% raw %}<pre class="brush: xml; ruler: true;">&lt;object data=&quot;data:application/x-silverlight-2,&quot; type=&quot;application/x-silverlight-2&quot; width=&quot;100%&quot; height=&quot;100%&quot;&gt;
    &lt;param name=&quot;source&quot; value=&quot;ClientBin/MyApplication.xap&quot; /&gt;
    &lt;param name=&quot;onError&quot; value=&quot;onSilverlightError&quot; /&gt;
    &lt;param name=&quot;background&quot; value=&quot;white&quot; /&gt;
    &lt;param name=&quot;minRuntimeVersion&quot; value=&quot;3.0.40624.0&quot; /&gt;
    &lt;param name=&quot;autoUpgrade&quot; value=&quot;true&quot; /&gt;
    &lt;param name=&quot;initParams&quot; value=&quot;param=1,param2=prova&quot; /&gt;
    &lt;a href=&quot;http://go.microsoft.com/fwlink/?LinkID=149156&amp;v=3.0.40624.0&quot; style=&quot;text-decoration: none&quot;&gt;
        &lt;img src=&quot;http://go.microsoft.com/fwlink/?LinkId=108181&quot; alt=&quot;Get Microsoft Silverlight&quot; style=&quot;border-style: none&quot; /&gt;
    &lt;/a&gt;
&lt;/object&gt;</pre>{% endraw %}

<p>Lato server, all’avvio dell’applicazione viene effettuato uno split dei vari elementi ed vengono forniti tramite un dictionary nel metodo Application_Startup della classe App del progetto Silverlight. 
  <br />Il codice seguente mostra come recuperare i valori inseriti nell’object e passarli alla nostra “Page”.</p>

{% raw %}<pre class="brush: csharp; ruler: true;">public partial class App : Application
    {
    
        public App()
        {
            Startup += Application_Startup;
            Exit += Application_Exit;
            UnhandledException += Application_UnhandledException;

            InitializeComponent();
        }

        private void Application_Startup(object sender, StartupEventArgs e)
        {
            int parameter1= 0;
            string parameter2 = string.Empty;
            
            if (e.InitParams != null &amp;&amp; e.InitParams.Count &gt; 0)
            {
                parameter1= int.Parse(e.InitParams[&quot;param1&quot;]);
                parameter2 = e.InitParams[&quot;param2&quot;];
            }

            RootVisual = new MainPage(parameter1, parameter2);
        }

        private void Application_Exit(object sender, EventArgs e)
        {
        }
}</pre>{% endraw %}

<p>Enjoy Silverlight!</p>
