---
layout: post
status: publish
published: true
title: ASP.NET MVC in Azure
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1438
wordpress_url: http://imperugo.tostring.it/blog/post/asp.net-mvc-in-azure/
date: 2011-08-29 17:00:00.000000000 +01:00
categories:
- ASP.NET
tags:
- MVC
- ASP.NET
- Azure
comments: true
---
<p>Ultimamente sto lavorando parecchio per migrare un’applicazione MVC3 su Azure. Una delle cose che trovo più noiose in Azure è il dover ricreare il package di deploy per ogni singola modifica; questo vuol dire che se si vuole cambiare un testo in una View occorre rifare il package e ripubblicarlo.   <br />Devo dire che, lato Azure, è più che comprensibile come comportamento. Essendo questo basato su macchine virtuali, nel momento in cui una di queste “cade” o l’utente ha la necessità di aumentare la forza lavoro, l’infrastruttura di Azure non fa altro che caricare una nuova macchina virtuale e deployare il package all’interno, perdendo però un’eventuale modifica fatta su un file (come la View dell’esempio precedente).</p>  <p>Proprio per questo motivo, tutto ciò che necessita di essere modificato frequentemente e deve essere accessibile da tutte le istanze attive di Azure dovrebbe risiedere nel blob storage.</p>  <p>Dato che il progetto a cui sto lavorando è in continua evoluzione, e le view cambiano più è più volte nell’arco di una giornata, ho deciso di far “pescare” le View ad MVC direttamente dal blob storage di Azure e non dal filesystem della macchina virtuale, evitando così la scomodità di dover “rideployare” continuamente l’applicazione.</p>  <p>Con questo scenario il vantaggio è notevole, posso caricare un singolo file della View in pochi secondi con un qualsiasi tool (io personalmente uso <a href="http://www.cerebrata.com/Products/CloudStorageStudio/Default.aspx">Cerebrata Cloud Storage Studio</a>, ma ne esistono molti altri gratuiti come <a href="http://azurestorageexplorer.codeplex.com/">questo</a>).</p>  <p>Fortunatamente tutto questo è facilmente implementabile, senza dover modificare la nostra applicazione. Di fatto ci basta registrare un nostro VirtualPathProvider all’interno del Global.asax.cs ed il gioco è fatto.</p>  <p>Proviamo a dare un’occhiata al codice:   {% highlight csharp %}
using System;
using System.Collections;
using System.Web.Caching;
using System.Web.Hosting;
using Dexter.Storage;

namespace Dexter.Web.Mvc.ViewEngines {
    public class DexterVirtualPathProvider : VirtualPathProvider {
        readonly IStorageProvider storageProvider;

        public DexterVirtualPathProvider ( IStorageProvider storageProvider ) {
            this.storageProvider = storageProvider;
        }

        public override bool FileExists ( string virtualPath ) {
            var fullPath = storageProvider.GetPublicUrl ( virtualPath );

            if (storageProvider.FileExist ( fullPath ))
                return true;

            return Previous.FileExists ( virtualPath ); 
        }

        public override VirtualFile GetFile ( string virtualPath ) {
            var fullPath = storageProvider.GetPublicUrl ( virtualPath );

            if (storageProvider.FileExist ( fullPath ))
                return new DexterVirtualFile ( virtualPath, storageProvider );

            return Previous.GetFile ( virtualPath ); 
        }

        public override CacheDependency GetCacheDependency ( string virtualPath , IEnumerable virtualPathDependencies , DateTime utcStart ) {
            return null;
        }
    }

    public class DexterVirtualFile : VirtualFile {
        readonly IStorageProvider storageProvider;

        public DexterVirtualFile ( string virtualPath , IStorageProvider storageProvider ) : base ( virtualPath ) {
            this.storageProvider = storageProvider;
        }

        public override Stream Open ( ) {
            var fullPath = storageProvider.GetPublicUrl ( VirtualPath );
            return storageProvider.GetFile ( fullPath ).OpenRead ( );
        }
    }

}
{% endhighlight %}
</p>

<p>&#160;</p>

<p>Ovviamente in questo codice non c’è nessuna reference verso Azure, ma l’implementazione di IStorageProvider si occupa di accedere al blob del could. La cosa carina di quest’implementazione è che permette di “manipolare” il path delle view in un unico punto con un effort molto basso.</p>

<p>La registrazione sulla nostra HttpApplication avviene in questo modo:</p>

{% highlight csharp %}
public void ApplicationStart ( ) {
    //....
    System.Web.Hosting.HostingEnvironment.RegisterVirtualPathProvider ( new DexterVirtualPathProvider(azureStorageProvider) );
}
{% endhighlight %}
<p>Da questo momento in poi le view verranno lette direttamente dal blob storage. </p>
