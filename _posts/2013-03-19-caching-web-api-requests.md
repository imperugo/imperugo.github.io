---
layout: post
title: Caching Web API Requests
categories:
- WebAPI
tags:
- cache
- performance
- webapi
status: publish
type: post
published: true
comments: true
---
I wrote many times about <a href="http://tostring.it/category/webdev/webapi-webdev/" target="_blank">Web API</a>, so you should know about the library and the main differences between the client part of Web API and the server side; in this post I’m going to write about the client side of this cool library.
Exactly like the “old” <em>System.Net.WebRequest</em> class, also the Web API client can manage the caching policy for all REST requests.

Before seeing the code, it’s important to understand what does it mean “<em>manage the caching policy</em>” and why we should do that.

The class HttpClient is created for web requests and it has all problems/features of a browser without the render and Javascript stuff.

All the modern browsers has an aggressive cache policy with the purpose of reducing the network traffic and increase the performances. The last point is really important: to execute operations faster browsers read a set of information from the response header (Etag, Cache-Control and Date), and, based on their values, it decides to take the data from the response or from the cache.

In one of the latest projects we are working in my company (I spoke about that <a href="http://tostring.it/2012/12/03/manage-cookies-using-web-api/" target="_blank">here</a>), we have to call some rest services which totally ignore the cache header values. To be clear I’ve the same headers values for different results so I’ve to disable the cache for my request to that endpoint because the default behavior use the cache:

Default cache policy (from MSDN)
<blockquote>Satisfies a request for a resource either by using the cached copy of the resource or by sending a request for the resource to the server. The action taken is determined by the current cache policy and the age of the content in the cache. This is the cache level that should be used by most applications.</blockquote>
To change the cache policy we need to do something like that:

{% gist 7786489 gistfile1.cs %}

As you can see is really simple and really important so, be careful using the right Header values in your response J
