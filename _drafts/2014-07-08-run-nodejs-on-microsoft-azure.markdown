---
layout: post
title: "Run NodeJs on Microsoft Azure"
date: 2014-07-08
description: "How to run NodeJs on Microsoft Azure"
comments: true
categories:
- NodeJs
tags:
- nodejs
- azure
- iis
---

Microsoft Azure offers the opportunity to use your favorite programming language and deploy it. 
Yesterday I spent some times to understand a problem during a deploy of a NodeJs application, to be quickly my code was a simple web application built on top of Express and the code was something like this:

```javascript
var express = require("express");
var app = express();

.... configure express

var port = Number(process.env.port || 5000);

app.listen(port, function() {
    logger.info("Listening on " + port);
});
```

Running locally the code works very well and also if you run it on your servers but not on Microsoft Azure Websites. But Why?

Adding some log I identified the problem on the port environment, basically it was not a number but a string (to be precise it was **\\\\.\\pipe\\e289ed7e-b57b-46bb-8bba-ad8cd1f1529c**) and consequently converting it to a number produced a *NaN* value.

The solution is easy, do not try to convert it to a number but pass it as is to node:

```javascript

var port = process.env.port || 5000;

app.listen(port, function() {
    logger.info("Listening on " + port);
});
```

The reason is that Node is mapped under IIS using [IISNode](https://github.com/tjanczuk/iisnode) with a wildcard on an HTTP Handler, all using named pipe to be faster as dimostrated in the web.config below:

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

To ahve a confirm, I wrote to [David Ebbo](http://blog.davidebbo.com/) via twitter:

![Confirmation](/assets/07/NodeJs-IIS.png)

