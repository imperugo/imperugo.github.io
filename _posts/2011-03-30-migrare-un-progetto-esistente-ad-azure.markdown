---
layout: post
status: publish
published: true
title: Migrare un progetto esistente ad Azure
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1453
wordpress_url: http://imperugo.tostring.it/blog/post/migrare-un-progetto-esistente-ad-azure/
date: 2011-03-30 16:50:00.000000000 +01:00
categories:
- Web Dev
tags:
- ASP.NET
- Azure
- Cloud
comments: true
---
<p>Dopo il deploy di <a title="Dexter Blog Engine Official Site" href="http://dexterblogengine.com/" target="_blank">Dexter</a>, finalmente torno a fare un po’ di post tecnici (speriamo che duri <img style="border-bottom-style: none; border-left-style: none; border-top-style: none; border-right-style: none" class="wlEmoticon wlEmoticon-smile" alt="Smile" src="http://www.tostring.it/UserFiles/imperugo/wlEmoticon-smile_2_4.png" />) e spero di raccontare un po’ delle tante “<em>figosità</em>”- passatemi il termine - che ho inserito nell’ultima versione, prima fra tutte il supporto a Windows <a title="Azure" href="http://tostring.it/tags/archive/azure" target="_blank">Azure</a>.     <br />Non che ci siano cose difficili da fare lato tecnologico per migrare una piattaforma ad Azure, ma alcune cose, se pur semplici, non è detto che siano scontante. Quando mi è stato chiesto il supporto al cloud di casa Microsoft, la prima domanda che mi sono posto è stata: come modifico la soluzione e come aggiungo un qualcosa di preesistente?</p>  <p><strong>I passaggi sono veramente pochi e semplici</strong>; per prima cosa ci basta aggiungere alla Solution un nuovo progetto di tipo “<strong>Windows Azure Cloud Service</strong>” e non associare nessun web/worker role al nuovo progetto. Da questo momento la nostra solution dovrebbe contenere il nuovo progetto e, una volta cliccato con il tasto destro, si ha la possibilità di associare un progetto esistente presente nella solution come webrole del nostro Cloud Service.     <br />Gli screenshot seguenti mostrano la proceura passo passo.</p>  <p><a href="http://www.tostring.it/UserFiles/imperugo/29-03-2011%2023-29-42_2.gif"><img style="background-image: none; border-right-width: 0px; margin: 0px 5px 0px 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="29-03-2011 23-29-42" border="0" alt="29-03-2011 23-29-42" src="http://www.tostring.it/UserFiles/imperugo/29-03-2011%2023-29-42_thumb.gif" width="136" height="150" /></a>&#160;<a href="http://www.tostring.it/UserFiles/imperugo/29-03-2011%2023-30-23_2.gif"><img style="background-image: none; border-right-width: 0px; margin: 0px 5px 0px 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="29-03-2011 23-30-23" border="0" alt="29-03-2011 23-30-23" src="http://www.tostring.it/UserFiles/imperugo/29-03-2011%2023-30-23_thumb.gif" width="217" height="150" /></a><a href="http://www.tostring.it/UserFiles/imperugo/29-03-2011%2023-30-36_2.gif"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="29-03-2011 23-30-36" border="0" alt="29-03-2011 23-30-36" src="http://www.tostring.it/UserFiles/imperugo/29-03-2011%2023-30-36_thumb.gif" width="240" height="150" /></a></p>  <p><a href="http://www.tostring.it/UserFiles/imperugo/29-03-2011%2023-33-39_2.gif"><img style="background-image: none; border-right-width: 0px; margin: 0px 5px 0px 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="29-03-2011 23-33-39" border="0" alt="29-03-2011 23-33-39" src="http://www.tostring.it/UserFiles/imperugo/29-03-2011%2023-33-39_thumb.gif" width="240" height="150" /></a><a href="http://www.tostring.it/UserFiles/imperugo/29-03-2011%2023-33-58_2.gif"><img style="background-image: none; border-right-width: 0px; margin: 0px 5px 0px 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="29-03-2011 23-33-58" border="0" alt="29-03-2011 23-33-58" src="http://www.tostring.it/UserFiles/imperugo/29-03-2011%2023-33-58_thumb.gif" width="240" height="150" /></a></p>  <p>Una volta completati questi passaggi è necessario che la nostra applicazione referenzi le tre assembly indispensabili al funzionamento sul cloud:</p>  <ul>   <li><strong>Microsoft.WindowsAzure.Diagnostics</strong>; </li>    <li><strong>Microsoft.WindowsAzure.ServiceRuntime</strong>; </li>    <li><strong>Microsoft.WindowsAzure.StorageClient;</strong> </li> </ul>  <p>Come ultimo passaggio è necessario inserire una classe, “WebRole.cs” nel nostro caso, nel progetto web per far sì che l’environment di sviluppo di Azure possa verificare il corretto funzionamento dell’istanza.</p>  <p>La classe dovrà contenere il seguente codice:</p>  <p>&#160;</p>  {% highlight csharp %}
using System.Linq;
using Microsoft.WindowsAzure;
using Microsoft.WindowsAzure.ServiceRuntime;

namespace Dexter.Web.UI.Azure {
    public class WebRole : RoleEntryPoint {
        public override bool OnStart ( ) {
            // For information on handling configuration changes
            // see the MSDN topic at http://go.microsoft.com/fwlink/?LinkId=166357.
            RoleEnvironment.Changing += RoleEnvironmentChanging;

            CloudStorageAccount.SetConfigurationSettingPublisher ( ( configName , configSetter ) => configSetter ( RoleEnvironment.GetConfigurationSettingValue ( configName ) ) );

            return base.OnStart ( );
        }

        static void RoleEnvironmentChanging ( object sender , RoleEnvironmentChangingEventArgs e ) {
            // If a configuration setting is changing
            if ( e.Changes.Any ( change => change is RoleEnvironmentConfigurationSettingChange ) ) {
                // Set e.Cancel to true to restart this role instance
                e.Cancel = true;
            }
        }
    }
}
{% endhighlight %}
<br />



<p>Da questo momento in poi possiamo fare il run dell’applicazione, ed il tutto dovrebbe girare sotto “Azure”.</p>

<p>Soon altri post del tipo “come migrare un’applicazione ad Azure senza referenziare Azure <img style="border-bottom-style: none; border-left-style: none; border-top-style: none; border-right-style: none" class="wlEmoticon wlEmoticon-smile" alt="Smile" src="http://www.tostring.it/UserFiles/imperugo/wlEmoticon-smile_2_4.png" />“</p>
