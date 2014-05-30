---
layout: post
title: Create a JavascriptResult for ASP.NET MVC
categories:
- aspnetmvc
tags:
- aspnetmvc
- javascript
status: publish
type: post
published: true
comments: true
---
<span style="line-height: 1.5em;">One pillar of ASP.NET MVC is the extensibility. It means you can add whatever you want wherever you want (or something like that).</span>

Like all frameworks, ASP.NET MVC does not cover all features requested by developers, but offers the opportunity to create your own logic. That means extensibility.

In my case, the goal was to render a partial view into a JavaScript file.

Before to see how you can do that, it’s important to understand what does really mean “render a partial view into a Javascript file”.

In this example I want to create a simple HTML including the base info for a user profile (Firstname, Lastname and website).

The HTML Looks like this.

```html
@model imperugo.JavascriptResult.Controllers.PartialModel

The current user is <string>@Model.Firstname @Model.Lastname</string> and his website is available <a href="@Model.Website" target="_blank">here</a>
```

Render that HTML into a JavaScript means encoding everything and putting it into a document write. The result should looks like this.

```javascript
document.write('The current user is \u003cstring\u003eUgo Lattanzi\u003c/string\u003e and his website is available \u003ca href=\"http://tostring.it/\" target=\"_blank\"\u003ehere\u003c/a\u003e\r\n');
```

In MVC all requests need a Controller and an Action, which must return something that could be an HTML, json or javascript (in my case).

To do this, the first thing to do is create a JavascriptResult (and his extension method) like that:

```csharp
namespace imperugo.JavascriptResult.Controllers
{
	using System;
	using System.IO;
	using System.Text;
	using System.Web;
	using System.Web.Mvc;

	public class JavascriptResult : PartialViewResult
	{
		public JavascriptResult(PartialViewResult innerPartial)
		{
			this.InnerPartialViewResult = innerPartial;
		}

		protected PartialViewResult InnerPartialViewResult { get; set; }

		public override void ExecuteResult(ControllerContext context)
		{
			TextWriter old = context.HttpContext.Response.Output;
			StringBuilder sb = new StringBuilder();

			using (var tw = new StringWriter(sb))
			{
				context.HttpContext.Response.Output = tw;
				this.InnerPartialViewResult.ExecuteResult(context);
				context.HttpContext.Response.Output = old;
			}

			context.HttpContext.Response.ContentType = "text/javascript";
			context.HttpContext.Response.Write(String.Format(@"document.write('{0}');", HttpUtility.JavaScriptStringEncode(sb.ToString())));
		}
	}
}
```
```csharp
public static class PartialViewResultExtensions
{
	public static JavascriptResult AsJavaScriptDocumentDotWrite(this PartialViewResult partial)
	{
		return new JavascriptResult(partial);
	}
}
```

As you can see the code is really simple, I render the partial into a string, encode the content and return it changing the content type.

Now you are able to use the following code:

```csharp
public class WidgetController : Controller
{
	[AcceptVerbs(HttpVerbs.Get)]
	public ActionResult MyWidget(int id)
	{
		PartialModel model = new PartialModel();

		if (id == 1)
		{
			model.Firstname = "Ugo";
			model.Lastname = "Lattanzi";
			model.Website = new Uri("http://tostring.it");
		}

		if (id == 2)
		{
			model.Firstname = "Matteo";
			model.Lastname = "Pagani";
			model.Website = new Uri("http://wp.qmatteoq.com");
		}

		if (id == 3)
		{
			model.Firstname = "Daniel";
			model.Lastname = "Crisp";
			model.Website = new Uri("http://danielcrisp.com/");
		}

		return PartialView(model).AsJavaScriptDocumentDotWrite();
	}
}
```

The last thing to do is to render the partial view into another site, so you have to include your JavaScript like a normal resource.

```html
<script language="javascript" src="http://localhost:31044/Widget/MyWidget/1"></script>
```

In the screenshot below you can see how a client site (not the site that hosts the controller) shows the partial.

<a href="{{ site.url }}/assets/2014/01/JavascriptResult.jpg"><img class="alignnone size-medium wp-image-869" alt="JavascriptResult" src="{{ site.url }}/assets/2014/01/JavascriptResult-300x158.jpg" width="300" height="158" /></a>

&nbsp;

What is cool about that approach is about server side technology. Because we are returning a Javascript file the client could be a simple .html static page or something generated with nodejs or whatever you want.

Is it cool?

The code is available here <a href="https://github.com/imperugo/Spike/tree/master/imperugo.JavascriptResult">https://github.com/imperugo/Spike/tree/master/imperugo.JavascriptResult</a>
