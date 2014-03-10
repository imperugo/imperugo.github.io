---
layout: post
title: Manage cookies using Web API
categories:
- WebAPI
tags:
- aspnetmvc
- webapi
- webdev
status: publish
type: post
published: true
comments: true
---
<span style="line-height: 1.5em;">In my last project, I’ve deeply used WebApi, both for the client side and server side. In fact my application must call several REST endpoints developed with java and, after a code elaboration, I have to expose the data to other clients (javascript into an html page in this case)</span>.

One of the pillars request by the Java services (really is not a technology request but just from the implementation made by the external company) is to read all cookies from the response and then send them back to the next requests (like a proxy).

To make more clear where my app is, I realized the following chart:

<a href="{{ site.url }}/assets/2012/12/webapi-chart.png"><img class="aligncenter size-medium wp-image-757" title="webapi chart" alt="" src="{{ site.url }}/assets/2012/12/webapi-chart-270x300.png" width="270" height="300" /></a>

As you can see the communication between my application and the Java Rest endpoint is based on the client library released with Web API.
In fact,<strong> Web API is more than a service library used just to expose data</strong>; it includes a client library that makes very easy to execute a REST call, so let’s start to install the client package named “Microsoft ASP.NET Web API Client Libraries” from NuGet!

<a href="{{ site.url }}/assets/2012/12/webpi-nuget.png"><img class="aligncenter size-medium wp-image-758" title="webpi nuget" alt="" src="{{ site.url }}/assets/2012/12/webpi-nuget-300x44.png" width="300" height="44" /></a>

From now on, if you need to create a web request, you should do something like in the code below:

{% gist 7786454 gistfile1.cs %}

My problem was to manage the cookie from the response, since I needed to read the cookies and then store them somewhere for the next request.
Obviously, the example above is really simple and it’s not enough for me because I need to read all the cookies and then send them to the browser.

Fortunately, there is an easy way to read the cookies from an Http Response using Web Api client library.
The first thing to do is to create an instance of <em>HttpClientHandler</em>, inizialize the<em> CookieContainer</em> collection and then use it the HttpClient Constructor:

{% gist 7786454 gistfile2.cs %}

Now, after the request, the <em>CookieContainer</em> should contain the correct cookies.  Now we need to manage the cookie’s type, since we have two different kind of responses: one for ASP.NET MVC and one for Web API.

The two frameworks have no shared assemblies, it means that the cookies are represented by different classes in different namespaces with the same kind of data and I’m in a weird situation:
<ul>
	<li>The Cookiecontainer contains a list of <strong>System.Net.Cookie</strong>;</li>
	<li>The Web Api server request use <strong>System.Net.Http.Headers.CookieHeaderValue</strong>;</li>
	<li>ASP.NET MVC uses <strong>System.Web.HttpCookie</strong>;</li>
</ul>
Three different classes, the first one comes from the client and the others for the response to the browsers.

For this reason, I created a Cookie manager class that moves the data from a cookie class to another one.
To use the cookie in ASP.NET MVC is really simple, we just need to use the HttpContext (Request or response, depends if you need to add or read a cookie) like the code below:

{% gist 7786454 gistfile3.cs %}

For the Web API the approach is different. In fact, into the controller, there isn’t the HttpContext class like into MVC, so we need to manage the data using the HttpHeader like this:

{% gist 7786454 gistfile4.cs %}

Now I’m able to read cookies from everywhere and my last goal is to find a valid entry point where to manage the cookie read/write for MVC and Web API (easy ActionInvoker J)
