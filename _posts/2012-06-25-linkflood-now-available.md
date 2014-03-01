---
layout: post
title: Linkflood now available
categories:
- Various
tags:
- aspnetmvc
- html5
- linkflood
- nodejs
- windows8
status: publish
type: post
published: true
comments: true
---
My followers know my passion to share news on twitter. Almost every day I tweet dozens and dozens info about <strong>HTML5</strong>, <strong>MVC</strong>, <strong>NodeJS</strong>, <strong>Windows 8</strong>, <strong>Mobile</strong>, <strong>Apple</strong> and so on.
The idea is to save and categorize these information inside my blog; for this reason I’ve created a category called <a title="Linkflood" href="http://tostring.it/linkflood/">Linkflood</a> and a specific “plugin” for the digest tweets.
Unluckily I’m not a guru of php, in fact I didn’t find an easy way to create a scheduled job inside Wordpress.
My solution is based on <a title="ASP.NET MVC" href="http://www.asp.net/mvc" target="_blank">ASP.NET MVC</a> and <a title="Quartz.NET" href="http://quartznet.sourceforge.net/" target="_blank">Quartz.NET</a>. The first one is a simple host for my jobs, the second one is the scheduler framework that I used for this “plugin”.

The linkflood news is available from the menu in the top. I removed it from the main feed but, if you like to follow it by RSS, you can subscribe this specific <a title="Linkflood RSS" href="http://feeds.feedburner.com/Linkflood" target="_blank">feed</a>.

The plugin is available on <a title="Me on Github" href="https://github.com/imperugo/" target="_blank">github</a> <a title="Github linkflood" href="https://github.com/imperugo/Spike/tree/master/Linkflood" target="_blank">here</a>, it is not complete and must be evolved but it works!
If you like it and you want to use this plugin make a fork!
