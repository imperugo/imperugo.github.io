---
layout: post
title: Customize Json result in Web API
categories:
- Various
- WebAPI
- WebDev
tags:
- aspnetmvc
- json
- webapi
status: publish
type: post
published: true
comments: true
---
In my previous <a title="Do we really need Web API instead of ASP.NET MVC?" href="http://tostring.it/2012/07/03/do-we-really-need-web-api-instead-of-asp-net-mvc/" target="_blank">post</a> I wrote about <a title="More posts about Web API" href="http://tostring.it/category/webdev/web-api/" target="_blank">Web API</a> and the content negotiation. In this post I’d like to describe how it’s easy to change the Json serialization.

The most important improvement from the Beta to the RC in the Web API is about the serialization, in fact now the framework is using Json.Net for the serialization.
For all people who don’t know what <a title="Json.NET Site" href="http://james.newtonking.com/projects/json-net.aspx" target="_blank">Json.Net</a> is I can say, to make the definition easily, <strong>Json.Net is the best serializer in the .NET world</strong>.

It's cool for many reasons, especially because it's flexible and easy to setup. In this post I’d like to show the principals and useful settings that you probably want to change in your application, or can be helpful for you in the future.

Before to start, we have to make our Web API project easy to debug so, I’m going to remove the XML formatter.
I’m doing that because I’m in a test project and I’d like to see the response in the browser. The easily way to force the response to Json for all Web API requests is to remove the XML. Obviously you shouldn't do it in production.

NOTE: All code in this post,except the last one, must be located into the global.asax.cs

{% gist 7786526 gistfile1.cs %}

Now we can start change the setting for all Json responses accessing to <em><strong>GlobalConfiguration.Configuration.Formatters.JsonFormatter</strong></em>.

In the following examples I’ll use always the class below:

{% gist 7786526 gistfile2.cs %}

<strong>How can we indent the json response?</strong>

{% gist 7786526 gistfile3.cs %}

<strong>How can we change the case in the response?</strong>

{% gist 7786526 gistfile4.cs %}

<strong>How can we manage the null in the response?</strong>

{% gist 7786526 gistfile5.cs %}

<strong>How can we change the DateTime format?</strong>

{% gist 7786526 gistfile6.cs %}

<strong>How can we change the TimeZone format?</strong>

{% gist 7786526 gistfile7.cs %}

<strong>How can we change the Culture of the serializer?</strong>

{% gist 7786526 gistfile8.cs %}

Another cool feature of Web API is to opportunity to override the configuration for a single response.
You can use all of the previous setting directly in the single action like explained in the code below:

{% gist 7786526 gistfile9.cs %}

Such as ASP.NET MVC, Web API are really flexible ... and ROCKS!
