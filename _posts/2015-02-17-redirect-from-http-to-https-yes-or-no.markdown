---
layout: post
title: "Redirect from http to https yes or no?"
date: "2015-02-17"
description: "Is it correct to redirect a user from an unsecure connection to a secure connection? This article explain some risk about that approach"
comments: true
categories:
- aspnet
tags:
- OWIN
- katana
---

In the previous [post](http://tostring.it/2015/02/09/security-headers-using-owin/), I wrote about HTTP security, particularly about "special" headers. This post is partially related to the previous one, it means I am writing about security in a common scenario for web applications.

How many times did you add a redirect from an HTTP request to an HTTPS?
I think you did it more than one time and, looking on internet, there are several simple solutions.

If you are using OWIN it's enough to create a custom Middleware like this:


```csharp
public class ForceHttpsMiddleware : OwinMiddleware
{
    private readonly int port;

    public ForceHttpsMiddleware(OwinMiddleware next, int port) : base(next)
    {
        this.port = port;
    }

    public override Task Invoke(IOwinContext context)
    {
        if (context.Request.Uri.Scheme == "http")
        {
            var httpsUrl = string.Format("https://{0}:{1}{2}", context.Request.Uri.Host,
                port,
                context.Request.Uri.PathAndQuery);

            context.Response.Redirect(httpsUrl);
        }

        return Next.Invoke(context);
    }
}
```

Nothing complex here, but the question is: "Is it correct to redirect a user from an **unsecure connection** to a **secure connection**?"
Basically the answer should be yes, but you must be careful about a particular scenario.

An unsecure request (HTTP) that includes a cookie and/or SessionId is subject to [hijacking attacks]( http://en.wikipedia.org/wiki/Session_hijacking) and we don't want that to happen on our website.
The easiest way to prevent this is to release the cookies only in a secure mode, it means that the cookies are not available from an unsecure request, but only from an HTTPS preventig a [MITM](http://en.wikipedia.org/wiki/Man-in-the-middle_attack) (Man in the middle) attack.


Using Aspnet and Owin you can do it easily

```csharp
app.UseCookieAuthentication(new CookieAuthenticationOptions
{
    AuthenticationType = "Cookies",
    CookieSecure = CookieSecureOption.Always,
    CookieHttpOnly = true
});
```

Here the most important part is ```CookieSecure``` property. It defines that only HTTPS request can access to cookie.
To complete the security scenario, you could add also HTTP Strict Transport Security (HSTS) explained [here](http://tostring.it/2015/02/09/security-headers-using-owin/).


Enjoy.