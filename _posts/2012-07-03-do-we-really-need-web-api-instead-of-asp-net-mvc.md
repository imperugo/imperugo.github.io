---
layout: post
title: Do we really need Web API instead of ASP.NET MVC?
categories:
- aspnetmvc
- WebAPI
tags:
- aspnetmvc
- webapi
status: publish
type: post
published: true
comments: true
---
When I tried for the first time <a href="http://tostring.it/tag/webapi/">WebAPI</a> I asked to myself if I really need it instead of <a href="http://tostring.it/tag/aspnetmvc/">ASP.NET MVC</a> because part of my own code (Controller Factory, Attributes, etc) doesn’t work as is.
In these days I’ve started to do some experiments and, after that, I can say that we really need it for many reason, one of this is absolutely the content negotiation.

Take a look at the two code blocks below:
<pre class="brush: csharp; gutter: true">public IEnumerable&lt;string&gt; Get() {
  return new string[] { &quot;value1&quot;, &quot;value2&quot; };
}

[AcceptVerbs(HttpVerbs.Get)]
public ActionResult Get() {
  return Json(new string[] {&quot;value1&quot;, &quot;value2&quot;}, JsonRequestBehavior.AllowGet);
}</pre>
As you can see these two code blocks are really similar except for two things:
<ul>
	<li>The attribute <em>AcceptVerbs</em>;</li>
	<li>The method <em>Json()</em> in the return statement;</li>
</ul>
When I was thinking that I don’t need WebAPI I told to myself that calling a method and adding an attribute is not a big issue for a developer, but there is something more important to consider, the response content.

In fact, if you look the code from another point of view, you can imagine that with the Web API there isn’t a direct connection from your code and the response type (JSON in this case).

With ASP.NET MVC the response will be always a JSON (in fact I specified it using the method <em>Json</em>()), in the second one there isn’t a connection to the JSON format, it means that you could have different responses without changing the Action, let’s try and see!

Let’s start to create a simple Web API application using the classic template, so follow the step below:

<a href="http://tostring.it/wp-content/uploads/2012/07/WebAPI001.png"><img class="alignnone size-medium wp-image-578" title="WebAPI001" src="http://tostring.it/wp-content/uploads/2012/07/WebAPI001-300x179.png" alt="" width="300" height="179" /></a>

<a href="http://tostring.it/wp-content/uploads/2012/07/WebAPI002.png"><img class="alignnone size-medium wp-image-579" title="WebAPI002" src="http://tostring.it/wp-content/uploads/2012/07/WebAPI002-300x179.png" alt="" width="300" height="179" /></a>

Without any change you are able to run the application: try by yourself by pushing F5 and navigating with a browser to the path <em>“/api/values”</em> of your website.
If you are doing that with Internet Explorer, probably it will ask you to download the json response, otherwise if you open the same url with Chrome you can see the response inside the browser in XML format.
With the same code you have two different serializations. That’s awesome.

<strong>How can this happen?</strong>

The response format depends from two values in the http header, <em><strong>Accept</strong> </em>and <em><strong>ContentType</strong></em>. If you change that (for example <em>Accept: application/xm<strong>l</strong></em> and <em>Content-Type: application/json</em>), you can have a different response as you saw opening the same url with two different browser.

<strong>Why is that so cool?</strong>
Because you can have and create different response like the aforementioned XML or JSON without changing the code; plus, you can add other response type like Binary and CSV and you Action is still the same.
I love it!

In the next posts I’ll show some helper to improve the response in Web API and how to create custom responses, so stay tuned!
