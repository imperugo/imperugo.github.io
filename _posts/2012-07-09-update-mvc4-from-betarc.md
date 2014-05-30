---
layout: post
title: Update MVC4 from Beta/RC
categories:
- aspnetmvc
- WebDev
tags:
- aspnetmvc
- migration
- nuget
status: publish
type: post
published: true
comments: true
---
As I wrote in my first post <a title="How to override tostring.it" href="http://tostring.it/2012/05/20/how-to-override-tostring/">here</a>, I’m a web addicted and I’m absolutely in love with <a title="ASP.NET MVC" href="http://tostring.it/tag/aspnetmvc/" target="_blank">ASP.NET MVC</a>. I started to use it from the first beta and I’m using the latest release in my projects.

What I absolutely love in ASP.NET MVC 4 is the distribution mode. Right now it is deployed by <a title="NuGet official site" href="http://www.nuget.org" target="_blank">NuGet</a> and, with few clicks, you can easily update it from the Beta to the RC.

Unluckily, in my case, the update process missed to update one package <strong>Microsoft.Web.Optimization</strong>

To be honest this sentence is not really true, in fact an update for that package is not available, so Nuget correctly updated all packages except that.

With the RC release the package changes its name from <strong>Microsoft.Web.Optimization</strong>  to <strong>Microsoft.AspNet.Web.Optimization </strong>and,<strong> </strong>if you create a new project after you have installed the RC, the package.config looks like that:

```xml
<?xml version="1.0" encoding="utf-8"?>
<packages>
  <package id="EntityFramework" version="5.0.0-rc" targetFramework="net40" />
  <package id="jQuery" version="1.6.2" targetFramework="net40" />
  <package id="jQuery.UI.Combined" version="1.8.11" targetFramework="net40" />
  <package id="jQuery.Validation" version="1.8.1" targetFramework="net40" />
  <package id="knockoutjs" version="2.0.0" targetFramework="net40" />
  <package id="Microsoft.AspNet.Mvc" version="4.0.20505.0" targetFramework="net40" />
  <package id="Microsoft.AspNet.Providers.Core" version="1.0" targetFramework="net40" />
  <package id="Microsoft.AspNet.Providers.LocalDB" version="1.0" targetFramework="net40" />
  <package id="Microsoft.AspNet.Razor" version="2.0.20505.0" targetFramework="net40" />
  <package id="Microsoft.AspNet.Web.Optimization" version="1.0.0-beta2" targetFramework="net40" />
  <package id="Microsoft.AspNet.WebApi" version="4.0.20505.0" targetFramework="net40" />
  <package id="Microsoft.AspNet.WebApi.Client" version="4.0.20505.0" targetFramework="net40" />
  <package id="Microsoft.AspNet.WebApi.Core" version="4.0.20505.0" targetFramework="net40" />
  <package id="Microsoft.AspNet.WebApi.WebHost" version="4.0.20505.0" targetFramework="net40" />
  <package id="Microsoft.AspNet.WebPages" version="2.0.20505.0" targetFramework="net40" />
  <package id="Microsoft.jQuery.Unobtrusive.Ajax" version="2.0.20505.0" targetFramework="net40" />
  <package id="Microsoft.jQuery.Unobtrusive.Validation" version="2.0.20505.0" targetFramework="net40" />
  <package id="Microsoft.Net.Http" version="2.0.20505.0" targetFramework="net40" />
  <package id="Microsoft.Web.Infrastructure" version="1.0.0.0" targetFramework="net40" />
  <package id="Modernizr" version="2.0.6" targetFramework="net40" />
  <package id="Newtonsoft.Json" version="4.5.1" targetFramework="net40" />
  <package id="WebGrease" version="1.0.0" targetFramework="net40" />
</packages>
```

<strong>But why the package name is changed?</strong> <strong>And, more important, what’s changed?</strong>
Sincerely I don’t have an answer for the first question and I think is not important (nothing changes if we know the reason) but the second point is really really interesting.

The packages include a library called <strong>System.Web.Optimization</strong> that offers an incredible cool feature for combining and minifying our resources (css and js files).

Every web developers know how important is reduce the number of calls from the client to the server obtaining less traffic and more performance (the files cleaned from whitespaces and comments).

Unfortunately this technique makes it difficult to debug and understand the Javascripts and Stylesheets. For this reason the latest version (the version that I didn’t received with the update) includes a cool class that help us to use the classic approach (not combined files) when we are debugging, and the optimized way when the site is in production.

With ASP.NET MVC Beta we were using the bundles in this way:

```html
<link href="@System.Web.Optimization.BundleTable.Bundles.ResolveBundleUrl("~/Content/Styles/css")" rel="stylesheet" type="text/css" />
<script src="@System.Web.Optimization.BundleTable.Bundles.ResolveBundleUrl("~/Content/themes/base/css")"></script>
```
And the result will be something like that:

```html
<link href="/Content/Styles/css?v=jt8aeS0wrB24h6ADtIW3yucGRpbJ2UViuR3OjTHGcuQ1" rel="stylesheet" type="text/css" />
<script src="/Scripts/myBundle/js?v=R9XQ5talr3vJ0OlpwOsMJgF38vpqToKFryeXfaBLY1"></script>
```

How is it possible to debug this output?
With the Beta is really difficult, in fact there are few post in internet that describe how to create and extension method that renders all resources when you are debugging (<a title="Disabling Bundling and Minification in ASP.NET 4.5/MVC 4" href="http://blog.kurtschindler.net/post/disabling-bundling-and-minification-in-aspnet-45mvc-4" target="_blank">this </a>is one of that posts)

With the new packages, so with the new version, the ASP.NET Team introduces the same approach and now we have this code:

```html
@Styles.Render("~/Content/themes/base/css", "~/Content/css")
@Scripts.Render("~/bundles/modernizr")
```
Obtaining this result:

```html
<link href="/Content/css?v=1KFY-7bppjbhzNj-uZ7aDrhiojPPiupccFdkrQVig1" rel="stylesheet" type="text/css" />
<script src="/bundles/modernizr?v=EuTZa4MRY0ZqCYpBXjMhJfFJU2QBDf0xGrVp1fHME1" type="text/javascript"></script>
```

Probably you are asking to yourself that the result is the same and it’s just changed a helper but there isn’t.
The helper has an interesting behavior binded to a property in the web.config. Inside system.web/compilation there is an attribute debug; if you set it to false the result is like the code shown above, otherwise it looks like that:

```html
<link href="/Content/themes/base/jquery.ui.resizable.css" rel="stylesheet" type="text/css" />
<link href="/Content/themes/base/jquery.ui.selectable.css" rel="stylesheet" type="text/css" />
<link href="/Content/themes/base/jquery.ui.accordion.css" rel="stylesheet" type="text/css" />
<link href="/Content/themes/base/jquery.ui.autocomplete.css" rel="stylesheet" type="text/css" />
<link href="/Content/themes/base/jquery.ui.button.css" rel="stylesheet" type="text/css" />
<link href="/Content/themes/base/jquery.ui.dialog.css" rel="stylesheet" type="text/css" />
<link href="/Content/themes/base/jquery.ui.slider.css" rel="stylesheet" type="text/css" />
<link href="/Content/themes/base/jquery.ui.tabs.css" rel="stylesheet" type="text/css" />
<link href="/Content/themes/base/jquery.ui.datepicker.css" rel="stylesheet" type="text/css" />
<link href="/Content/themes/base/jquery.ui.progressbar.css" rel="stylesheet" type="text/css" />
<link href="/Content/themes/base/jquery.ui.theme.css" rel="stylesheet" type="text/css" />
<link href="/Content/site.css" rel="stylesheet" type="text/css" />
<script src="/Scripts/modernizr-2.0.6-development-only.js" type="text/javascript"></script>
```

Now it’s really simple to debug our styles and Javascript functions.
If you had update your MVC Beta application with NuGet and you have the same problem, the solution is easy.

Remove <strong>Microsoft.Web.Optimization and install Microsoft.AspNet.Web.Optimization!</strong>
