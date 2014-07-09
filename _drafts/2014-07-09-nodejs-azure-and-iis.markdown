---
layout: post
title: "NodeJs, Azure and IIS"
date: 2014-07-09
description: "How to run NodeJs on IIS and check the port environment gettinga guid instead of a port number"
imagePath: /assets/2014/07/NodeJs-IIS.png
comments: true
categories:
- NodeJs
tags:
- nodejs
- azure
- iis
---

Yesterday I spent some time to understand a problem with a [Node Js](http://tostring.it/tag/#nodejs) application on [Microsoft Azure](http://tostring.it/tag/#azure).
To be quick, my code was a simple web application built on top of [Express](http://expressjs.com/) and the code was something like this:

```javascript
var express = require("express");
var app = express();

.... configure express

var port = Number(process.env.port || 5000);

app.listen(port, function() {
    logger.info("Listening on " + port);
});
```

Running locally the code works very well both if you run it on your dev environment or a server. Unfortunately it doesn't if you try to run it on Microsoft Azure Website. But Why?

Adding some log I identified the problem on the port environment, basically process.env.port returns a string instead of a number (to be precise it was **\\\\.\\pipe\\e289ed7e-b57b-46bb-8bba-ad8cd1f1529c**) and consequently converting it to a number produced a *NaN* value.

The solution is easy, do not try to convert it to a number but pass it as is to node:

```javascript

var port = process.env.port || 5000;

app.listen(port, function() {
    logger.info("Listening on " + port);
});
```

The reason is that Node is not running on its process like on local machine (```node app.js``` to be clear), but is mapped under IIS using [IISNode](https://github.com/tjanczuk/iisnode) with a wildcard on an HTTP Handler using [named pipe](http://en.wikipedia.org/wiki/Named_pipe)

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
    <system.webServer>         
      <handlers>
           <add name="iisnode" path="app.js" verb="*" modules="iisnode"/>
     </handlers>
      <rewrite>
           <rules>
                <rule name="StaticContent">
                     <action type="Rewrite" url="public{REQUEST_URI}"/>
                </rule>
                <rule name="DynamicContent">
                     <conditions>
                          <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
                     </conditions>
                     <action type="Rewrite" url="app.js"/>
                </rule>
           </rules>
      </rewrite>
    <iisnode 
      debuggingEnabled="false"
      logDirectory="..\..\LogFiles\nodejs" 
      watchedFiles="*.js;iisnode.yml;node_modules\*;views\*.jade;views\*.ejb;routes\*.js;views\*.vash" />
   </system.webServer>
 </configuration>
```

To have a confirm, I wrote to [David Ebbo](http://blog.davidebbo.com/) via twitter getting this answer:

![Confirmation]({{ site.url }}/assets/2014/07/NodeJs-IIS.png)

Unfortunately (or not), right now there is no way to run Node outside of IIS on Azure Websites but maybe it's not a problem, it works :smirk:

