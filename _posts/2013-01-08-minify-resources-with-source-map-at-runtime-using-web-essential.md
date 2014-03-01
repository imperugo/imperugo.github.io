---
layout: post
title: Minify resources with source map at runtime using Web Essential
categories:
- aspnetmvc
- WebDev
tags:
- bundle
- css
- javascript
- minification
- optimization
status: publish
type: post
published: true
comments: true
---
In one of the last versions of <strong>Web Essential Tools</strong>, Microsoft released one of my favorite features for the web development. I’m talking about the opportunity to create a bundle resource at runtime with the support of SourceMap.

The first step to try this cool feature is to install the Visual Studio plugin so, download it from <a title="Web Essential Tools download" href="http://visualstudiogallery.msdn.microsoft.com/07d54d12-7133-4e15-becb-6f451ea3bea6" target="_blank">here</a>

After the installation Visual Studio offers you new features that are not available in the standalone version. In fact, after right clicking on a web resource (css, js, etc) in the solution explorer, you have a new “item” named Web Essential:
<p style="text-align: center;"><a href="{{ siteurl }}/assets/2013/01/001.png"><img class="aligncenter size-medium wp-image-763" alt="001" src="{{ siteurl }}/assets/2013/01/001-300x179.png" width="300" height="179" /></a></p>
&nbsp;

What I love most in this extension is the easy way to create the combined and minified resources (really, I’m not in love with the web optimization packages included in ASP.NET MVC 4).

What does it give us?
<ul>
	<li>Javascript and Css minification with SourceMap;</li>
	<li>Javascript and Css bundle with SourceMap;</li>
</ul>
As you can see in both items there is the <b>SourceMap, but what is it</b>?
Source Map is a cool feature, actually supported just by Google Chrome, that allows you to understand the correct position (i.e. line of an error) in a Javascript file starting from a combined file.

I think that feature is a killer feature for frontend developers because some errors happened in production and, in some cases, you are not able to reproduce them during the tests.

The first things is to enable that features in chrome, so:
<p style="text-align: center;"><a href="{{ siteurl }}/assets/2013/01/002.png"><img class="aligncenter size-medium wp-image-768" alt="002" src="{{ siteurl }}/assets/2013/01/002-300x179.png" width="300" height="179" /></a></p>
&nbsp;
<p style="text-align: center;"><a href="{{ siteurl }}/assets/2013/01/003.png"><img class="aligncenter size-medium wp-image-769" alt="003" src="{{ siteurl }}/assets/2013/01/003-300x179.png" width="300" height="179" /></a></p>
&nbsp;

From now, everything is easier, select your javascript files, right click and, from WebEssential Items, select “<strong>Create Javascript Bundle File</strong>”.
<p style="text-align: center;"><a href="{{ siteurl }}/assets/2013/01/004.png"><img class="aligncenter size-medium wp-image-770" alt="004" src="{{ siteurl }}/assets/2013/01/004-300x187.png" width="300" height="187" /></a></p>
<p style="text-align: center;"><a href="{{ siteurl }}/assets/2013/01/005.png"><img class="aligncenter size-medium wp-image-771" alt="005" src="{{ siteurl }}/assets/2013/01/005-300x179.png" width="300" height="179" /></a></p>
<p style="text-align: center;"><a href="{{ siteurl }}/assets/2013/01/006.png"><img class="aligncenter size-medium wp-image-772" alt="006" src="{{ siteurl }}/assets/2013/01/006-300x179.png" width="300" height="179" /></a></p>
&nbsp;

Drag you bundle into your page, MyExampleJavascriptBundle.min.js in my example, and everything is ready.

From now, every time you change and save the files you selected for the bundle, Visual Studio will automatically update it; it means that minified and source map will always be up to date with the original resources without doing anything special (How f..ing cool is that?).

As you can see in the image below there are more files that I’ve included in my page (see previous screenshots).
<p style="text-align: center;"><a href="{{ siteurl }}/assets/2013/01/007.png"><img class="aligncenter size-medium wp-image-773" alt="007" src="{{ siteurl }}/assets/2013/01/007-300x179.png" width="300" height="179" /></a></p>
In fact, I didn’t added the files 001.js and 002.js but only the MyExampleJavascriptBundle.min.js.

How is it possible? The reason is really simple; inside the MyExampleJavascriptBundle.min.js, Visual Studio added a line with the path of Source Map that includes the original not combined files.

Chrome understands this behavior and shows you the source files (only if you use the developer tools bar).

If you like it and you want to understand more about Source Map, take a look <a href="http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/" target="_blank">here</a> and, if you like Web Essential like me you have to follow Mads on <a href="https://it.twitter.com/mkristensen" target="_blank">twitter</a>

Stay tuned!

&nbsp;
