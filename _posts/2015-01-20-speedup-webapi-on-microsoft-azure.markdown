---
layout: post
title: "Speed up WebAPI on Microsoft Azure"
date: "2015-01-20"
description: "Run you API on Microsoft Azure outside of IIS improving the performance, scalability and much more"
comments: true
imagePath: /assets/2015/01/IIS WebServer.png.png
categories:
- WebAPI
tags:
- azure
- webapi
- owin
- katana
---

One of my favorite features of ASP.NET WebAPI is the opportunity to run your code outside Internet Information Service (IIS). I don’t have anything against IIS, in fact my tough matches with this tweet:

<p style="text-align:center">
  <img src="{{ site.url }}/assets/2015/01/IIS WebServer.png" style="text-align:center" />
</p>

But System.Web is really a problem and, in some cases, IIS pipeline is too complicated for a simple REST call.

>we fix one bug and open seven new one (unnamed Microsoft employee on System.Web)

Another important thing I like is cloud computing and Microsoft Aure in this case. In fact, if you want to run your APIs outside IIS and you have to scale on Microsoft Azure, maybe this article could be helpful.

Azure offers different ways to host your APIs and scale them. The most common solutions are WebSites or Cloud Services.

Unfortunately we can’t use Azure WebSites because everything there runs on IIS (more info [here](http://tostring.it/2014/07/09/nodejs-azure-and-iis/)) so, we have to use the Cloud Services but the question here is **Web Role** or **Worker Role**?

The main difference among Web Role and Worker Role is that the first one runs on IIS, the domain is configured on the webserver and the port 80 is opened by default; the second one is a process (.exe file to be clear) that runs on a “closed” environment.

To remain consistent with what is written above, we have to use the Worker Role instead of the Web Role so, let’s start to create it following the steps below:

<p style="text-align:center">
  <img src="{{ site.url }}/assets/2015/01/001.png" style="text-align:center" />
</p>

<p style="text-align:center">
  <img src="{{ site.url }}/assets/2015/01/002.png" style="text-align:center" />
</p>

Now that the Azure project and Workrole project are ready, It's important to open the port 80 on the worker role (remember that by default the worker role is a close environment).

<p style="text-align:center">
  <img src="{{ site.url }}/assets/2015/01/003.png" style="text-align:center" />
</p>

<p style="text-align:center">
  <img src="{{ site.url }}/assets/2015/01/004.png" style="text-align:center" />
</p>

Finally we have the environment ready, It’s time to install few WebAPI packages and write some code.

{% raw %}
<div class="nuget-badge">
    <code>PM&gt; Install-Package Microsoft.AspNet.WebApi.OwinSelfHost</code>
</div>
{% endraw %}

Now add OWIN startup class

<p style="text-align:center">
  <img src="{{ site.url }}/assets/2015/01/005.png" style="text-align:center" />
</p>

<p style="text-align:center">
  <img src="{{ site.url }}/assets/2015/01/006.png" style="text-align:center" />
</p>

and finally configure WebAPI Routing and its OWIN Middleware

```csharp
using System.Web.Http;
using DemoWorkerRole;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof (Startup))]

namespace DemoWorkerRole
{
	public class Startup
	{
		public void Configuration(IAppBuilder app)
		{
			var config = new HttpConfiguration();

			// Routing
			config.Routes.MapHttpRoute(
				"Default",
				"api/{controller}/{id}",
				new {id = RouteParameter.Optional});

			//Configure WebAPI
			app.UseWebApi(config);
		}
	}
}
```
and create a demo controller

```csharp
using System.Web.Http;

namespace DemoWorkerRole.APIs
{
	public class DemoController : ApiController
	{
		public string Get(string id)
		{
			return string.Format("The parameter value is {0}", id);
		}
	}
}
```

Till now nothing special, the app is ready and we have just to configure the worker role that is the WorkerRole.cs file created by Visual Studio.

What we have to do here, is to read the configuration from Azure (we have to map a custom domain for example) and start the web server.

To do that, first add the domain on the cloud service configuration following the steps below:

<p style="text-align:center">
  <img src="{{ site.url }}/assets/2015/01/007.png" style="text-align:center" />
</p>

<p style="text-align:center">
  <img src="{{ site.url }}/assets/2015/01/008.png" style="text-align:center" />
</p>

finally the worker role:

```csharp
using System;
using System.Diagnostics;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Owin.Hosting;
using Microsoft.WindowsAzure.ServiceRuntime;

namespace DemoWorkerRole
{
	public class WorkerRole : RoleEntryPoint
	{
		private readonly CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
		private readonly ManualResetEvent runCompleteEvent = new ManualResetEvent(false);

		private IDisposable app;

		public override void Run()
		{
			Trace.TraceInformation("WorkerRole is running");

			try
			{
				RunAsync(cancellationTokenSource.Token).Wait();
			}
			finally
			{
				runCompleteEvent.Set();
			}
		}

		public override bool OnStart()
		{
			// Set the maximum number of concurrent connections
			ServicePointManager.DefaultConnectionLimit = 12;

			string baseUri = String.Format("{0}://{1}:{2}", RoleEnvironment.GetConfigurationSettingValue("protocol"),
				RoleEnvironment.GetConfigurationSettingValue("domain"),
				RoleEnvironment.GetConfigurationSettingValue("port"));

			Trace.TraceInformation(String.Format("Starting OWIN at {0}", baseUri), "Information");

			try
			{
				app = WebApp.Start<Startup>(new StartOptions(url: baseUri));
			}
			catch (Exception e)
			{
				Trace.TraceError(e.ToString());
				throw;
			}

			bool result = base.OnStart();

			Trace.TraceInformation("WorkerRole has been started");

			return result;
		}

		public override void OnStop()
		{
			Trace.TraceInformation("WorkerRole is stopping");

			cancellationTokenSource.Cancel();
			runCompleteEvent.WaitOne();

			if (app != null)
			{
				app.Dispose();
			}

			base.OnStop();

			Trace.TraceInformation("WorkerRole has stopped");
		}

		private async Task RunAsync(CancellationToken cancellationToken)
		{
			// TODO: Replace the following with your own logic.
			while (!cancellationToken.IsCancellationRequested)
			{
				//Trace.TraceInformation("Working");
				await Task.Delay(1000);
			}
		}
	}
}
```

we are almost done, the last step is to configure the right execution context into the ```ServiceDefinistion.csdef```

```xml
<?xml version="1.0" encoding="utf-8"?>
<ServiceDefinition name="imperugo.demo.azure.webapi" xmlns="http://schemas.microsoft.com/ServiceHosting/2008/10/ServiceDefinition" schemaVersion="2014-06.2.4">
	<WorkerRole name="DemoWorkerRole" vmsize="Small">
		<Runtime executionContext="elevated" />
		<Imports>
			<Import moduleName="Diagnostics" />
		</Imports>
		<Endpoints>
			<InputEndpoint name="Http" protocol="http" port="80" localPort="80" />
		</Endpoints>
		<ConfigurationSettings>
			<Setting name="protocol" />
			<Setting name="domain" />
			<Setting name="port" />
		</ConfigurationSettings>
	</WorkerRole>
</ServiceDefinition>
```

Here the important part is Runtime node. That part is really important because we are using the HttpListener to read the incoming message from the Web and that requires elevated privileges.

Now we are up & running using WebAPi hosted on a Cloud Service without using IIS. 

The demo code is available [here]({{ site.url }}/download/imperugo.demo.azure.webapi.zip).

Have fun.


