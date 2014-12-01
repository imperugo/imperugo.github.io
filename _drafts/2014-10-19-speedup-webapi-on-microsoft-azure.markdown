---
layout: post
title: "Speedup WebAPI on Microsoft Azure"
date: "2014-10-19"
description: "Run you API on Microsoft Azure outside of IIS improving the performance, scalability and much more"
comments: true
imagePath: /assets/2014/10/IIS WebServer.png.png
categories:
- WebAPI
tags:
- azure
- webapi
- owin
- katana
---

One of my favorite features of ASP.NET WebAPI is the opportunity to run your code outside IIS. I don’t have anything against IIS in fact my tough matches with this tweet:

<p style="text-align:center">
  <img src="{{ site.url }}/assets/2014/11/IIS WebServer.png" style="text-align:center" />
</p>

But System.Web is really a problem and, im some cases, IIS pipeline is too complicate for a simple REST call.

>we fix one bug and open seven new one (unnamed Microsoft employee on System.Web)

If you want to run your APIs outside IIS and you have to scale on Microsoft Azure maybe this article could be helpful.

First thing to know is that we can’t use Azure WebSites because everything there runs on IIS (more info [here](http://tostring.it/2014/07/09/nodejs-azure-and-iis/)) so, we have to use the Cloud Services.

The main difference among Web Role and Worker Role in cloud services is that the first one runs on IIS, the domain is configured on the webserver and the port 80 is opened by default; the second one is a process (.exe file to be clear) that runs on a “closed” environment.

To remain consistent with what is written above we have to use the Worker Role instead of the Web Role so, let’s start to create it following the steps below:

<p style="text-align:center">
  <img src="{{ site.url }}/assets/2014/11/001.png" style="text-align:center" />
</p>

<p style="text-align:center">
  <img src="{{ site.url }}/assets/2014/11/002.png" style="text-align:center" />
</p>

Now that the Azure project and Workrole project are ready, is important to open the port 80 on the worker role (remember that by default the worker role is a close environment).

<p style="text-align:center">
  <img src="{{ site.url }}/assets/2014/11/003.png" style="text-align:center" />
</p>

<p style="text-align:center">
  <img src="{{ site.url }}/assets/2014/11/004.png" style="text-align:center" />
</p>

Finally we have the environment ready, it’s time to install few WebAPI packages and write some code.

{% raw %}
<div class="nuget-badge">
    <code>PM&gt; Install-Package Microsoft.AspNet.WebApi.OwinSelfHost</code>
</div>
{% endraw %}

Now add OWIN startup class

<p style="text-align:center">
  <img src="{{ site.url }}/assets/2014/11/005.png" style="text-align:center" />
</p>

<p style="text-align:center">
  <img src="{{ site.url }}/assets/2014/11/006.png" style="text-align:center" />
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
				"api/{controller}/{action}/{id}",
				new {id = RouteParameter.Optional});

			//Configure WebAPI
			app.UseWebApi(config);
		}
	}
}

```
