---
layout: post
title: Use Less, Sass and Compass with ASP.NET MVC
categories:
- Various
tags:
- aspnetmvc
- compass
- css
- less
- msbuild
- ruby
- sass
status: publish
type: post
published: true
comments: true
---
<span style="line-height: 1.5em;">In my last project, with my team, we chose to use <a title="Compass CSS" href="http://compass-style.org/" target="_blank">Compass</a> with <a title="Sass Css" href="http://sass-lang.com/" target="_blank">SASS</a> as <strong>CSS Authoring Framework</strong>.  Initially we was unsecure about that, the choice was very hard, the classic CSS allows you to find several guys who know it and it doesn’t require compilation unlike with Sass and <a title="Less Css" href="http://lesscss.org/" target="_blank">Less</a></span>.

I’m not a front end developer so my part in this adventure is to manage the project and to make easy the integration of Less/Sass with an ASP.NET MVC application.

My first question was something like - “<strong>Which is the best way to integrate Less or SaaS in an ASP.NET MVC application?</strong>” -

If you choose Less everything is easy, you can install “dotless” from nuget and create that bundle (this example is for MVC 4) transformation:

{% gist 7786552 gistfile1.cs %}

About Compass? …. mmmmm What is Compass? :)

Compass is another framework built using Sass: if you want to use Compass you need Sass, so my first problem was to integrate Sass into my MVC application.
In my previous <a title="The best extensions for Visual Studio 2012" href="http://tostring.it/2012/08/22/my-favorite-extensions-for-visual-studio-2012/" target="_blank">post</a> "Schmulik Raskin” suggested me <a title="Mindscape Web Workbench" href="http://www.mindscapehq.com/products/web-workbench" target="_blank">Mindscape's Web Workbench</a>, a cool extension that offers you some features like Syntax Highlighting, Intellisense and Compilation not only for Sass but also for Less and CoffeeScript. That’s awesome.

Unfortunately after few hours I choose to use Web Workbench only like an editor and I disabled the compilationL.

Right now the extension doesn’t include some features that I need, like Compass support and output path customization. In spite of all, if you don’t need these features, probably Web Workbench still remains the best solution for .NET developer.

How did I sort out the problem?
Using ruby and MS-Build together of course. If you want to do the same, follow the step below:
<ul>
	<li>Download and install the latest version of Ruby and add it to your environment path (I suggest you to use Ruby Installer, it has a wizard and asks you if you prefer to add ruby to your paths – say yes).</li>
	<li>From a new prompt window check ruby installation: type “ruby –v” (in my case I got ruby 1.9.3p194 (2012-04-20) [i386-mingw32]);</li>
	<li>Type “gem install compass” (it download compass and its dependencies);</li>
	<li>Disable Web Workbench in your project “Menu =&gt; Mindscape =&gt; Web Workbench Settings” and uncheck your .scss files;</li>
	<li>Right click on your ASP.NET MVC application and “Unload Project”;</li>
	<li>Right click again on the unload project “Edit projectname.csproj”;</li>
</ul>
Under Project section add the follows code:

{% gist 7786552 gistfile2.xml %}

<ul>
	<li>Right click on the project for the last time and push “Reload Project”;</li>
</ul>
Here we go! Your application is ready to use Ruby with Compass and Sass. How to use it? Just compile your website, MS-Build creates your “.css” from Compass for you.

The first part of the code (debug condition) just create a css file, the second one also minify the file (--output-style compressed --force).
Moreover if you need to customize the compilation path and other stuff you can add a file config.rb into your project root and ruby will use that configuration for Compass.
My file looks like that:

{% gist 7786552 gistfile3.rb %}

Amazing! You have the power of Compass inside a .NET application without using command line for compiling.
