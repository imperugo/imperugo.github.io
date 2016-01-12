---
layout: post
title: "Using Kestrel with ASP.NET 5"
date: "2016-01-12"
description: "A deep dive with Kestrel, including https, self host and more"
comments: true
categories:
- aspnet
tags:
- kestrel
---

With ASP.NET 5 is possible to host your web applications in different ways; of course you can always host your application using IIS (Internet Information Services) and probably it is the best way if you are running your application on top of a Windows OS, but sometimes could be helpful to run test your application also outside of IIS.

For all people who don’t know what Kestrel is (but you should have guessed) let me past here the official definition

>Kestrel is a cross-platform web server based on [libuv](https://en.wikipedia.org/wiki/Libuv), a cross-platform asynchronous I/O library. Kestrel is open-source, and you can view the Kestrel source on [GitHub](https://github.com/aspnet/KestrelHttpServer). Kestrel is a great option to at least include support for in your ASP.NET 5 projects so that your project can be easily run by developers on any of the supported platforms. You add support for Kestrel by including “Kestrel” in your project’s dependencies listed in project.json.

Now that you know what is Kestrel let’s see how to use it.

First of all, when you create a new project from Visual Studio or Yeoman the project is automatically configured to run using Kestrel, in fact into your ```project.config```
 you should have something like that

![Kestrel-001]({{ site.url }}/assets/2016/01/Kestrel-001.jpg)

>My code is based on the RC1 but should be the same also if you are running and older or newer version.

The arrows show you two important things:

1. Kestrel dependency
2. Web command

The first one is the normal reference you need if you want to run your web application on Kestrel, the second one is the command to run into your project folder (is the same to run ***dnu web***)

Now you have your application ready (I used Web Application template, see here) you have two ways to run it on Kestrel.

From command line run ***dnu web*** getting an output like this (maybe you have to ***run dnu restore*** if is the first time with your app)

![Kestrel-002]({{ site.url }}/assets/2016/01/Kestrel-002.jpg)

or using the play button from Visual Studio 

![Kestrel-003]({{ site.url }}/assets/2016/01/Kestrel-003.jpg)

That’s pretty easy but is helpful only you want to test your application locally, right now you are not specifying any domain host and you are exposing your application on to schema http and not https.
That’s not so good in a real world so, let’ start to see how to do more with Kestrel.

Because we want to run our application on https, first of all we have to buy a certificate. For demo purpose I’ve create one myself (so is not trusted) but is ok for now.
Below the steps to create your own self signed certificate

![Kestrel-004]({{ site.url }}/assets/2016/01/Kestrel-004.jpg)

![Kestrel-005]({{ site.url }}/assets/2016/01/Kestrel-005.jpg)

![Kestrel-006]({{ site.url }}/assets/2016/01/Kestrel-006.jpg)

Now your test certificate is ready, let’s add the Kestrel.Https dependency to our project.
To do that let’s open the ```project.config``` and add ```Microsoft.AspNet.Server.Kestrel.Https```

Now it’s time to configure the certificate into our Startup class like this:

```csharp
public void Configure(IApplicationBuilder app, 
									IHostingEnvironment env,
									IApplicationEnvironment appEnv,
									ILoggerFactory loggerFactory)
                                    
    var certFile = applicationEnvironment.ApplicationBasePath + "\\democertificate.pfx";
    var signingCertificate = new X509Certificate2(certFile, "democertificate.io");

    app.UseKestrelHttps(signingCertificate);

    //...... your code
}
```
As you can see the code is pretty simple, is enough to create the ```X509Certificate2``` class and call the specific method ```UseKestrelHttps```.

**Note**: if you are running the RC1 of ```Microsoft.AspNet.Server.Kestrel.Https``` you have a problem with the schema. That because it’s a bit buggy as you can see here (https://github.com/aspnet/KestrelHttpServer/issues/551). That is fixed with the RC2 (not released yet) but, in the meanwhile, you can use a simple workaround like this

```csharp
private static RequestDelegate ChangeContextToHttps(RequestDelegate next)
{
    return async context =>
    {
        context.Request.Scheme = "https";
        await next(context);
    };
}

public void Configure(IApplicationBuilder app, 
									IHostingEnvironment env,
									IApplicationEnvironment appEnv,
									ILoggerFactory loggerFactory)
                                    
    var certFile = applicationEnvironment.ApplicationBasePath + "\\democertificate.pfx";
    var signingCertificate = new X509Certificate2(certFile, "democertificate.io");
    
    app.Use(ChangeContextToHttps);
    app.UseKestrelHttps(signingCertificate);

    //...... your code
}
```

Finally we have to specify out custom domain and the https protocol to Kestrel. To do this is enough to add a json file into the root of the project named ```hosting.json``` and put this code into it

```json
{
  "server": "Microsoft.AspNet.Server.Kestrel",
  "server.urls": "http://localhost:5000;https://localhost:5001"
}
```

As you can see you can specify more than one url and, if you have mapped the DNS, you can also replace localhost with your domain (i.e. http://tostring.it).

Finally the result


![Kestrel-006]({{ site.url }}/assets/2016/01/Kestrel-007.jpg)

Stay tuned!