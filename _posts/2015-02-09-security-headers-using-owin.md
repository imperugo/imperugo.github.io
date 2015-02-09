---
layout: post
title: "Security Headers using OWIN"
date: "2015-02-09"
description: "Adding some security headers into our web application using Owin middleware could be very easy."
comments: true
categories:
- OWIN
tags:
- OWIN
- katana
---

There are several ways to add security to our web application, sometime it could be difficult and requires several hours but, with a good architecture, it could be very easy

What some developers don't know is that there are some very useful HTTP Headers available that help your web application to be more secure with the support of the modern browsers.

The site [OWASP](https://www.owasp.org/index.php/List_of_useful_HTTP_headers) has a list of the common security-related HTTP headers that every web application must have.

<br />

###**Strict-Transport-Security**
also know as (HSTS), is an opt-in security enhancement that it's specified by a web application to enforce secure (HTTP over SSL/TLS) connections to the server preventing [downgrate attacks](http://en.wikipedia.org/wiki/Moxie_Marlinspike#Notable_research) like [Man-in-the-middle](http://en.wikipedia.org/wiki/Man-in-the-middle_attack).

Browser support: 

| Browser      | Version |
| ------------- |-------------|
| Internet Explorer | **not supported** |
| Firefox | **from version 4** |
| Opera | **from version 12** |
| Safari | **from Mavericks (Mac OS X 10.9)** |
| Chrome | **from version 4.0.211.0** |

**Options**

| Options      | Description |
| ------------- |-------------|
| max-age=31536000 | Tells the user-agent to cache the domain in the STS list (which is a list that contains known sites supporting HSTS) for one year |
| max-age=31536000; includeSubDomains | Tells the user-agent to cache the domain in the STS list for one year and include any sub-domains. | 
| max-age=0 | Tells the user-agent to remove, or not cache the host in the STS cache | 

**Example**:  

```
Strict-Transport-Security: max-age=16070400; includeSubDomains
```
<br />

###**X-Frame-Options**
Provides [Clickjacking](https://www.owasp.org/index.php/Clickjacking) protection. 

Browser support: 

| Browser      | DENY/SAMEORIGIN | ALLOW-FROM |
| ------------- |-------------| -------------|
| Internet Explorer | **from 8.0** | **from 9.0** |
| Firefox | **from version 3.6.9 (1.9.2.9)** | **from version 18.0** |
| Opera | **from version 10.50** | **not supported** |
| Safari | **from version 4.0** | **not supported** |
| Chrome | **from version 4.1.249.1042** | **not supported** |

**Options**

| Options      | Description |
| ------------- |-------------|
| DENY | The page cannot be displayed in a frame, regardless of the site attempting to do so |
| SAMEORIGIN | The page can only be displayed in a frame on the same origin as the page itself | 
| ALLOW-FROM http://www.tostring.it | The page can only be displayed in a frame on the specified origin. |  

**Example**:  

```
X-Frame-Options: deny
```

<br />

###**X-XSS-Protection**
This HTTP Header prevents [Cross-site scripting](https://www.owasp.org/index.php/Cross-site_scripting) (XSS) enabling the filters available in the most recent browsers.

| Browser      | Version |
| ------------- |-------------|
| Internet Explorer | **supported** |
| Firefox | **not supported** |
| Opera | **not supported** |
| Safari | **not supported** |
| Chrome | **supported** |

**Options**

| Options      | Description |
| ------------- |-------------|
| 0  | Disables the XSS Protections. |
| 1  | Enables the XSS Protections. | 
| 1; mode=block  | Enables XSS protections and prevents browser rendering if a potential XSS attack is detected | 
| 1; report=http://site.com/report  | Available only for Chrome and WebKit allows to report the possible attack to a specific url sending data (using JSON and verb POST) | 

**Example**: 

```
X-XSS-Protection: 1; mode=block
```

<br />

###**X-Content-Type-Options**
This HTTP Header prevents the browsers from MIME-sniffing a response away from the declared content-type.

**Options**

The only option available here is ```nosniff```

**Example**: 

```
X-Content-Type-Options: nosniff
```

<br />

###**Content-Security-Policy**
This HTTP Header (aka CSP) is very powerful and it requires a precise tuning because we need to specify all the trusted sources for our pages like Images, Script, Fonts, and so on.

With the correct configuration the browser doesn't load a not trusted source preventing execution of dangerous code.

| Browser      | Version |
| ------------- |-------------|
| Internet Explorer | **partial support starting from 9.0** |
| Firefox | **from version 4** |
| Opera | **from version 15** |
| Safari | **partial support starting from 5.1, total support from 6** |
| Chrome | **from version 14** |

**Options**

| Options      | Description |
| ------------- |-------------|
| default-src | Specify loading policy for all resources type in case one of the following directive is not defined (fallback) |
| script-src  | The script-src directive specifies valid sources for JavaScript |
| object-src  | The object-src directive specifies valid sources for the ```<object>```, ```<embed>```, and ```<applet>``` elements. |
| style-src  | The style-src directive specifies valid sources for stylesheets. |
| img-src  | The style-src directive specifies valid sources for images and favicons. |
| media-src | The media-src directive specifies valid sources for loading media using the ```<audio>``` and ```<video>``` elements. |
| frame-src | The frame-src  directive specifies valid sources for web workers and nested browsing contexts loading using elements such as ```<frame>``` and ```<iframe>``` |
| font-src | The font-src directive specifies valid sources for fonts loaded using @font-face |
| connect-src | The connect-src directive defines valid sources for XMLHttpRequest, WebSocket, and EventSource connections |
| form-action | The form-action  directive specifies valid endpoints for ```<form>``` submissions |
| plugin-types  | The plugin-types directive specifies the valid plugins that the user agent may invoke. |
| reflected-xss  | Instructs a user agent to activate or deactivate any heuristics used to filter or block reflected cross-site scripting attacks, equivalent to the effects of the non-standard X-XSS-Protection header |
| report-uri  | The report-uri directive instructs the user agent to report attempts to violate the Content Security Policy (send json using post) |


Example: 

```
Content-Security-Policy: default-src 'self'
```

Now that we know all these header, let's see how to implement them on our applications.
As usual there are several ways to configure the HTTP Headers, we can do it using WebServer configuration (IIS and Apache support that) or, if we use owin, we can do it using a sample middleware without configuring the webserver.

The last one is absolutely my favorite implementation because I can switch the webserver without configuring anything (that's is one of the reason why Owin was created).

Anyway let's start to add **SecurityHeadersMiddleware**


{% raw %}
<div class="nuget-badge">
    <code>PM&gt; Install-Package SecurityHeadersMiddleware</code>
</div>
{% endraw %}

and now to configure it is very easy

```csharp

var contentSecurityPolicy = new ContentSecurityPolicyConfiguration();

//Content-Security-Policy header 

//Configuring trusted Javascript
contentSecurityPolicy.ScriptSrc.AddScheme("https");
contentSecurityPolicy.ScriptSrc.AddKeyword(SourceListKeyword.Self);
contentSecurityPolicy.ScriptSrc.AddKeyword(SourceListKeyword.UnsafeEval);
contentSecurityPolicy.ScriptSrc.AddKeyword(SourceListKeyword.UnsafeInline);
contentSecurityPolicy.ScriptSrc.AddHost("cdnjs.cloudflare.com");

//Configuring trusted connections
contentSecurityPolicy.ConnectSrc.AddScheme("wss");
contentSecurityPolicy.ConnectSrc.AddScheme("https");
contentSecurityPolicy.ConnectSrc.AddKeyword(SourceListKeyword.Self);

//Configuring trusted style
contentSecurityPolicy.StyleSrc.AddKeyword(SourceListKeyword.Self);
contentSecurityPolicy.StyleSrc.AddKeyword(SourceListKeyword.UnsafeInline);
contentSecurityPolicy.StyleSrc.AddHost("fonts.googleapis.com");

//Configuring fallback
contentSecurityPolicy.DefaultSrc.AddKeyword(SourceListKeyword.Self);

//Configuring trusted image source
contentSecurityPolicy.ImgSrc.AddHost("*");

//Configuring trusted fonts
contentSecurityPolicy.FontSrc.AddKeyword(SourceListKeyword.Self);
contentSecurityPolicy.FontSrc.AddHost("fonts.googleapis.com");
contentSecurityPolicy.FontSrc.AddHost("fonts.gstatic.com");

app.ContentSecurityPolicy(contentSecurityPolicy);

//X-Frame-Options
app.AntiClickjackingHeader(XFrameOption.Deny);

//X-XSS-Protection
app.XssProtectionHeader();
```
[Here](https://github.com/StefanOssendorf/SecurityHeadersMiddleware) the github repository.

Have fun and make your application secure.

