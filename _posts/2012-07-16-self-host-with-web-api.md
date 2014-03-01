---
layout: post
title: Self-Host with Web API
categories:
- WebAPI
- WebDev
tags:
- aspnetmvc
- iis
- iisexpress
- selfhost
- webapi
status: publish
type: post
published: true
comments: true
---
Inside <a title="More posts about Web API" href="http://tostring.it/tag/webapi/" target="_blank"><strong>Web API</strong></a> there is a hidden gem that isn't having the right interest, the <em><strong>Self-Host</strong></em>.
The most typical mistake is to consider Web API as part of <a title="More posts about aspnetmvc" href="http://tostring.it/tag/aspnetmvc/" target="_blank">ASP.NET MVC</a>. Really it doesn't and there aren't shared libraries between them.

<a href="{{ siteurl }}/assets/2012/07/twitter.jpg"><img class="aligncenter size-full wp-image-614" title="twitter" src="{{ siteurl }}/assets/2012/07/twitter.jpg" alt="" width="320" height="250" /></a>

&nbsp;

In fact you can use Web API without ASP.NET MVC simply installing it from <a title="More posts about Nuget" href="http://tostring.it/tag/nuget/" target="_blank">NuGet</a>. The first advantage to be separated from MVC is the Self-Host.

<strong>What does it mean Self-Host in Web API?</strong>

The answer is really simple; you can “start” the application without use <em><strong>IIS</strong> </em>or <em><strong>IIS Express</strong></em> and, for this scenario, there are two important aspects:
<ul>
	<li>You can host your services in a simple console application, so double click on a “.exe” and you can start immediately use the Web API (IIS is a Windows service and is always started);</li>
	<li>You can create easily an integration test hosting the Web API inside your test suite;</li>
</ul>
<strong>How can we do that?</strong>

Like previous, the answer is really simple. We need to create a console application and a few lines of code.
The first step is to create new project from Visual Studio, choose Console Application and then install the Web API package:

<a href="{{ siteurl }}/assets/2012/07/Capture.jpg"><img class="aligncenter size-full wp-image-616" title="Capture" src="{{ siteurl }}/assets/2012/07/Capture.jpg" alt="" width="754" height="85" /></a>

Now, as for the web application, we have to create a folder for our controllers and put inside the classic ValuesController:
<pre class="brush: csharp">public class ValuesController : ApiController
{
  public IEnumerable&lt;string&gt; Get()
  {
    return new[]
             {
               &quot;http://tostring.it&quot;,
             &quot;http://imperugo.tostring.it&quot;,
             &quot;http://twitter.com/imperugo&quot;,
             &quot;http://www.linkedin.com/in/imperugo&quot;
             };
  }
}</pre>
Right now we have to create only the host for the server, so:
<pre class="brush: csharp">using System;
using System.Web.Http;
using System.Web.Http.SelfHost;

namespace imperugo.webapi.selfhost
{
	internal class Program
	{
		private static void Main(string[] args)
		{
			var config = new HttpSelfHostConfiguration(&quot;http://localhost:12345&quot;);

			config.Routes.MapHttpRoute(&quot;Default&quot;, &quot;{controller}&quot;, new {controller = &quot;Home&quot;});

			// Create server
			var server = new HttpSelfHostServer(config);

			// Start the server
			server.OpenAsync().Wait();

			Console.WriteLine(&quot;WebServer Started&quot;);
			Console.WriteLine(&quot;Press enter to exit&quot;);
			Console.ReadLine();
		}
	}
}</pre>
Absolutely easy and fun.

You can download this sample cloning my spike repository from github  <a href=" http://s.tostring.it/Q1wt6U " target="_blank">http://s.tostring.it/Q1wt6U </a>
