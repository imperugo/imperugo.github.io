---
layout: post
title: "Security Headers using OWIN"
date: "2015-01-22"
description: "Adding some security headers into our web application usin Owin middleware could be very easy."
comments: true
categories:
- OWIN
tags:
- OWIN
- katana
---

There are several ways to add security to our web application, sometime could be difficult and requires several hours but, with a good architecture, could be very easy.

What some developers don't know is that there are some very useful HTTP Headers available that help your web application to be more secure with the support ot the modern browsers.

The site [OWASP](https://www.owasp.org/index.php/List_of_useful_HTTP_headers) has a list of the common security-related HTTP headers that every web application must have.

<br />

###**Strict-Transport-Security**
also know as (HSTS) is an opt-in security enhancement that is specified by a web application to enforces secure (HTTP over SSL/TLS) connections to the server preventing [downgrate attacks](http://en.wikipedia.org/wiki/Moxie_Marlinspike#Notable_research) like [Man-in-the-middle](http://en.wikipedia.org/wiki/Man-in-the-middle_attack).

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
| DENY | Denies any resource (local or remote) from attempting to frame the resource that also supplied the X-Frame-Options header |
| SAMEORIGIN | Allows only resources which are apart of the Same Origin Policy to frame the protected resource | 
| ALLOW-FROM http://www.tostring.it | Allows a specified domain (with scheme) to frame the protected resource. |  

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
| 1; mode=block  | Enables XSS protections and prevent browser rendering if a potential XSS attack is detected | 
| 1; report=http://site.com/report  | Available only for Chrome and WebKit allow to report the possible attack to a specific url sending data (using JSON and verb POST) | 

**Example**: 

```
X-XSS-Protection: 1; mode=block
```

<br />

###**X-Content-Type-Options**
This HTTP Header prevents the browsers from MIME-sniffing a response away from the declared content-type.

**Options**

The only option available here is only ```nosniff```

**Example**: 

```
X-Content-Type-Options: nosniff
```

<br />

###**Content-Security-Policy**
This HTTP Header (aka CSP) is very powerful and requires a precise tuning because we need to specify all the trusted sources for our pages like Images, Script, Fonts, and so on.

With the correct configuration the browser doesn't load not trusted source preventing execution of dangerous code.

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
| script-src  | Specify which scripts the page can execute |
| object-src  | Specify from where the page can load plugins |
| style-src  | Specify which stylesheet the user applies to the page |
| img-src  | Specify from where the page can load images |
| media-src | Specify from where the page can load video and audio |
| frame-src | Specify from where the page can embed frames |
| font-src | Specify from where the page can load fonts |
| connect-src | Specify which URIs the page can load using script interfaces |
| form-action | Specify which URIs can be used as the action of HTML form elements |
| sandbox | Specifies an HTML sandbox policy that the user agent applies to the page |
| script-nonce  | Specify script execution by requiring the presence of the specified nonce on script elements |
| plugin-types  | Specify the set of plugins that can be invoked by the protected resource by limiting the types of resources that can be embedded |
| reflected-xss  | Instructs a user agent to activate or deactivate any heuristics used to filter or block reflected cross-site scripting attacks, equivalent to the effects of the non-standard X-XSS-Protection header |
| report-uri  | Specifies a URI to which the user agent sends reports about policy violation |


Example: 

```
Content-Security-Policy: default-src 'self'
```

Not that we know all these header, let's see how to implement on our applications.
As usual there are several ways to configure the HTTP Headers, we can do it using WebServer configuration (IIS and Apache support that) or, if we use owin, we can do it using a sample middleware without configure the webserver.

That's absolutely my favorite implementation because I can switch the webserver without configure anything (that's is one of the reason why Owin was created).

Anyway let's start to add **SecurityHeadersMiddleware**


{% raw %}
<div class="nuget-badge">
    <code>PM&gt; Install-Package SecurityHeadersMiddleware</code>
</div>
{% endraw %}

and now configure it is very easy

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

