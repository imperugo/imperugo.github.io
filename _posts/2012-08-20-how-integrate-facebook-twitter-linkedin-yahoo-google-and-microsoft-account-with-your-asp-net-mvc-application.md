---
layout: post
title: How integrate Facebook, Twitter, LinkedIn, Yahoo, Google and Microsoft Account
  with your ASP.NET MVC application
categories:
- aspnetmvc
- WebDev
tags:
- aspnetmvc
- facebook
- google
- linkedin
- microsoftclient
- oauth
- twitter
- yahoo
status: publish
type: post
published: true
comments: true
---
<span style="line-height: 1.5em;">In the past week, 15 august, Microsoft released an incredible number of cool stuff, starting from <strong>Windows 8</strong> and ending to <strong>Visual Studio 2012</strong> including the new <strong>ASP.NET Stack</strong></span>.

The version 4 of ASP.NET MVC introduces several cool features; most of them was available with the Beta and RC versions (Web API, Bundling, Mobile Projects Templates, etc.), but the <strong>RTM is not a “fixed version” of the RC</strong>, it has other interesting things.

After the installation, the first thing I noticed is a set of helpers inside the folder <strong>App_Start</strong>:

<a href="{{ siteurl }}/assets/2012/08/001.png"><img class="aligncenter size-medium wp-image-689" title="New helpers into MVC4 template" src="{{ siteurl }}/assets/2012/08/001-300x278.png" alt="" width="300" height="278" /></a>

That makes the code much cleaner and maintainable, but it’s not enough J

From my point of view the most cool feature introduced with the RTM is the integration with the social network.

In the RTM, there are new packages in the default templates:
<pre class="brush: xml; gutter: true">&lt;package id=&quot;DotNetOpenAuth.AspNet&quot; version=&quot;4.0.3.12153&quot; targetFramework=&quot;net45&quot; /&gt;
&lt;package id=&quot;DotNetOpenAuth.Core&quot; version=&quot;4.0.3.12153&quot; targetFramework=&quot;net45&quot; /&gt;
&lt;package id=&quot;DotNetOpenAuth.OAuth.Consumer&quot; version=&quot;4.0.3.12153&quot; targetFramework=&quot;net45&quot; /&gt;
&lt;package id=&quot;DotNetOpenAuth.OAuth.Core&quot; version=&quot;4.0.3.12153&quot; targetFramework=&quot;net45&quot; /&gt;
&lt;package id=&quot;DotNetOpenAuth.OpenId.Core&quot; version=&quot;4.0.3.12153&quot; targetFramework=&quot;net45&quot; /&gt;
&lt;package id=&quot;DotNetOpenAuth.OpenId.RelyingParty&quot; version=&quot;4.0.3.12153&quot; targetFramework=&quot;net45&quot; /&gt;</pre>
These packages make simple the integration with the most social networks like <strong>Facebook</strong>, <strong>Twitter</strong>, <strong>LinkedIn</strong>, <strong>Yahoo</strong>, <strong>Google</strong> and <strong>Microsoft Client</strong>.

Obviously you can extend this with other providers but we’ll take a look in another post. Right now just testing the commons social.

<strong>Facebook integration:</strong>

First step for Facebook is retrieve the ConsumerKey and ConsumerSecret (it is based on oAuth 2.0), so register you application on <a href="https://developers.facebook.com/apps">https://developers.facebook.com/apps</a>

<a href="{{ siteurl }}/assets/2012/08/002.png"><img class="aligncenter size-medium wp-image-690" title="Facebook app registration" src="{{ siteurl }}/assets/2012/08/002-300x194.png" alt="" width="300" height="194" /></a>

Now, inside the method RegisterAuth into the class AuthConfig (App_Start/AuthConfig.cs), write that code:
<pre class="brush: csharp; gutter: true">OAuthWebSecurity.RegisterFacebookClient(appId: &quot;yourAppId&quot;, appSecret: &quot;yourAppSecret&quot;);</pre>
<strong>Twitter integration:</strong>

Twitter is based on oAuth 1.x and, exactly like Facebook, it needs the ConsumerKey and ConsumerSecret so, register your app here <a href="https://dev.twitter.com/">https://dev.twitter.com/</a>

<a href="{{ siteurl }}/assets/2012/08/003.jpg"><img class="aligncenter size-medium wp-image-691" title="Twitter App registration" src="{{ siteurl }}/assets/2012/08/003-300x235.jpg" alt="" width="300" height="235" /></a>

Now,  add this line of code into AuthConfig:
<pre class="brush: csharp; gutter: true">OAuthWebSecurity.RegisterTwitterClient(consumerKey: &quot; yourConsumerKey&quot;, consumerSecret: &quot;yourConsumerSecret&quot;);</pre>
<strong>LinkedIn integration:</strong>

As the previous socials, register your app here <a href="https://www.linkedin.com/secure/developer?newapp=">https://www.linkedin.com/secure/developer?newapp=</a>

<a href="{{ siteurl }}/assets/2012/08/004.jpg"><img class="aligncenter size-medium wp-image-692" title="Linkedin App Registration" src="{{ siteurl }}/assets/2012/08/004-300x209.jpg" alt="" width="300" height="209" /></a>

In AuthConfig add this:
<pre class="brush: csharp; gutter: true">OAuthWebSecurity.RegisterLinkedInClient(&quot;yourKey&quot;, &quot;yourSecret&quot;);</pre>
<strong>Yahoo Integration:</strong>

That is really simple, just add this line of code:
<pre class="brush: csharp; gutter: true">OAuthWebSecurity.RegisterYahooClient();</pre>
into AuthConfig

<strong>Google Integration:</strong>

Like Yahoo, Google integration doesn’t require any key or secret, so just add this:
<pre class="brush: csharp; gutter: true">OAuthWebSecurity.RegisterGoogleClient();</pre>
in AuthConfig.cs

<strong>Microsot Account (formely known as Live ID):</strong>

It is based on oAuth, so you need to register your application here <a href="https://manage.dev.live.com/AddApplication.aspx">https://manage.dev.live.com/AddApplication.aspx</a> (not so easy to find the url :))

<a href="{{ siteurl }}/assets/2012/08/005.jpg"><img class="aligncenter size-medium wp-image-693" title="Microsoft Account Application Registration" src="{{ siteurl }}/assets/2012/08/005-300x176.jpg" alt="" width="300" height="176" /></a>

Into AuthConfig add this:
<pre class="brush: csharp; gutter: true">OAuthWebSecurity.RegisterMicrosoftClient(clientId: “yourClientId”,clientSecret: “yourClientSecret”);</pre>
<strong>Start the application.
</strong>Now, all your social networks are registered, so you just need to run the application and test it.
Push F5 and everything should work automatically.

<a href="{{ siteurl }}/assets/2012/08/007.jpg"><img class="aligncenter size-medium wp-image-694" title="Default Template Screenshot - oAuth 001" src="{{ siteurl }}/assets/2012/08/007-300x181.jpg" alt="" width="300" height="181" /></a>

<a href="{{ siteurl }}/assets/2012/08/009.jpg"><img class="aligncenter size-medium wp-image-695" title="Default Template Screenshot - oAuth 002" src="{{ siteurl }}/assets/2012/08/009-300x182.jpg" alt="" width="300" height="182" /></a>

<a href="{{ siteurl }}/assets/2012/08/010.jpg"><img class="aligncenter size-medium wp-image-696" title="Default Template Screenshot - oAuth 003" src="{{ siteurl }}/assets/2012/08/010-300x181.jpg" alt="" width="300" height="181" /></a>

Just few notes about the login page.

As you probably noticed we called a set of static method for the class <strong>OAuthWebSecurity</strong>. Each time we add a provider, the login page changes showing the available social.
If you want to retrieve the list you just have to call the method <strong>OAuthWebSecurity.RegisteredClientData</strong> to obtain a collection of <strong>AuthenticationClientData</strong> with all information (<strong>provider name, authentication data, extra data and so on</strong>).

Is it cool?
I think so. <strong>Stay tuned for other cool stuff about ASP.NET MVC 4</strong>
