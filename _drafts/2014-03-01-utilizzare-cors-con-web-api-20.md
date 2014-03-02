---
layout: post
title: How to use CORS with ASP.NET Web API 2.0
categories:
- webapi
tags:
- webapi
- cors
status: publish
type: post
published: true
comments: true
---

<span style="line-height: 1.5em;">With the latest version of ASP.NET Web API, Microsoft introduced support for cross domain requests, usually called CORS (Cross-Origin Resource Sharing)</span>

By default it's not possible to make HTTP requests using Javascript from a source domain that is different from the called endpoint. For example, this means that it's not possible to call the URL http://mysite.com/api/myrestendpoint from a domain http://yoursite.com

This limitation has been introduced for security reasons: in fact, without this protection, a malicious javascript code could get info from another site without noticing the user.

However, even if the reason of this limitation is clear, sometimes we need to call anway something that is not hosted in our site.
The first solution is is to use [JSONP](http://en.wikipedia.org/wiki/JSONP). This approach is easy to use and it's supported by all browsers; the only problem is that the only HTTP VERB supported is GET, which has a limitation on the lenght of the string that can be passed as query parameter.

Otherwise, if you need to send lot of information we can't use this way, so the soulution could be to "proxy" the request locally and forward the data server side or to use CORS.

Basically CORS communication allow you to overtake the problem by defining some rules that makes the request more "secure".
Of course the first thing we need is a browser that support CORS: fortunately all the latest browsers support it.
Anyway, we have to consider that, looking at the real world, there are several clients that are still using Internet Explorer 8 which, among other things, doesn't support CORS. 

The following table ([http://caniuse.com/cors](source)) shows which browsers offer CORS support.

![CORS SUPPORT TABLE]({{ siteurl }}/assets/2014/03/cors.jpg)

> there are several workaround that allows you to use CORS with IE8/9 but there are some limitations with the VERBS (more info [here](http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx))

Now that it's clear what is CORS, it's time to configure it using one of the following browsers:

* Internet Explorer 10/11
* Chrome (all versions)
* Firefox 3.5+
* Safari 4.x

Now we need two different project, one for the client application and another one for the server, both hosted in different domains (in my esamply I used Azure Web Sites, so I've [http://imperdemo.azurewebsite.net](http://imperdemo.azurewebsite.net) for the server and [http://imperclient.azurewebsite.net](http://imperclient.azurewebsite.net) for the client)

&nbsp;

## Server Application
Once the project has been created, it's important to enable CORS for our "**trusted**" domains, in my sample *imperclient.azurewebsite.net*

If you used the default Visual Studio 2013 template, your Global.asax.cs should look like this:

{% gist  9308342 global.asax.cs %}

Next, it's time to edit the file with the API configuration, "WebApiConfig.cs" into "App_Start".

> N.B.: Before editing the file it's important to install the right NuGet Package; the default template included with Visual Studio doesn't have CORS package, so you have to install it manually.

{% raw %}
<div class="nuget-badge">
    <code>PM&gt; Install-Package Microsoft.AspNet.WebApi.Cors</code>
</div> 
{% endraw %}

Once all the "ingredients" are ready, it's time to enable CORS:

{% gist  9308342 WebApiConfig.cs %}

Our API Controller looks like this:

{% gist  9308342 ValueController.cs %}

The most important part of this code is **EnableCors** method and the namesake attribute (included the VERBS, Domain and HEADERS)

> In case you don't want to completely "open" the controller to CORS requests, you can use the single attribute in the Action or leave the attribute in the controller and apply the DisableCors attribute to the actions you want to "close"

## Client Application
At this time, the server is ready, it's time to work client side.

The code we'll see for the client is just plain Javascript, so you can use a simple .html page without any server side code.

The HTML Code:

{% gist  9308342 clientPage.html %}

Javascript Code:

{% gist  9308342 javascriptCall.js %}

If you did everything right, you can to deploy our apps (server and client) to test them. 


![image]({{ siteurl }}/assets/2014/03/cors-client.jpg)

When you click on the "Test It now" button the result should look like this:


![image]({{ siteurl }}/assets/2014/03/cors-client-show-response.jpg)

Otherwise if something goes wrong, check the point above.

&nbsp;

## How does it work
CORS is a simple "check" based on HEADERS between the caller and the server.

The browser (client) adds the current domain into the hader of the request using the key *Origin*.

The server check that this value matches with the allowed domains specified in the attribute, answering with another HEADER information named *Access-Control-Allow-Origin*

If both keys have the same values, you have the data, otherwise you'll get an error.

The screenshot below shows the headers:

![image]({{ siteurl }}/assets/2014/03/cors-client-show-response-headers.jpg)

Here is, instead, the classic error in case the HEADERS doesn't match:

![image]({{ siteurl }}/assets/2014/03/cors-client-show-response-error.jpg)

&nbsp;

## Conclusions
For me that I love to sperate the application using an API layer, CORS is absolutely cool. The onyl downside is that it's not supported by all the browser. Let's just hope that hope that all the IE8/9 installations will be replaced soon :-)

The demo is available [here]({{ siteurl }}/assets/2014/03//sample.zip)