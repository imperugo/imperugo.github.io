---
layout: post
title: "Advanced logging with NodeJs"
date: 2014-06-23
description: "Advanced logging using NodeJS and Winston logging to have differents appenders, colored console and other cool features"
comments: true
imagePath: /assets/2014/06/Node-Consolelog-colored.png
categories:
- NodeJs
tags:
- node
- nodejs
- logging
- winston
---

As I wrote in my previous post [here](http://tostring.it/2014/06/03/how-to-configure-a-cluster-with-node-js/), [Node Js]({{ site.url }}/tag/#nodejs) is becoming a part of my dev life and today I'm gonna write about logging. 

Every good application must have a good logging and NodeJs, as all Frameworks, offers several ways to save information.

Unfortunately the most used is the classic ```console.log``` method that's a quick and dirty solution. For all people like me that usually use a robust Framework like [Log4Net](http://logging.apache.org/log4net/) or [NLog](http://nlog-project.org/), ```console.log``` doesn't fit so well with my requirements.

All these Frameworks offer the opportunity to add more than one Appender to the same logger instance.


##What's an appender?

Basically It's a simple way to have more than one output during logging. To be clearer let's try to think about an application where you want to see your logging in the console, but also in a file or an external service like [Raygun](https://raygun.io/).

In my [Node sample repository](https://github.com/imperugo/NodeJs-Sample) I created a demo of a simple web page (using [Express](http://expressjs.com/)) configuring the web server with the most needed middleware and some logs.

The result of the log is this:

![ConsoleLog]({{ site.url }}/assets/2014/06/Node-Consolelog.png)

As you can see there are just few lines of log but, when you do something more complex, the number of lines could be a lot and difficult to read.
The problem here is that lot of them are only debug log but some of them could be errors. Using the same color is difficult to understand what is the error and what is not.

A good solution is to use a logging framework that helps us to log into the console using different colors (red for errors, yellow for warnings and so on) and, in production, switch the log to a file or database.

[Winston](https://github.com/flatiron/winston) is the equivalent to Log4Net/Log4J/NLog in a NodeJs world. It offers the opportunity to use the Appenders and, in our case, colored console.

```bash
npm install winston --save
```

now it's enough to configure it. I've logger.js with its configuration

```javascript
var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
```

The most important thing is the ```transports``` section where you can specify your Appenders. In this example, I want to log into a file with verbosity level set to **info**, max 5 files and 5 MB for each and I want a complete full log (verbosity level **debug**) in the terminal but the different level should use different colors.

The result is pretty nice:

![ConsoleLog]({{ site.url }}/assets/2014/06/Node-Consolelog-colored.png)

and 

![ConsoleLog]({{ site.url }}/assets/2014/06/Node-Consolelog-fileappender.png)

for the file.

I think that's absolutely more readable if you have different colors in the console app. Another cool thing is that you can switch on/off some logging just changing the ```level``` property in the transport configuration.

In my example, I used Express as MVC framework to render HTML. It offers the opportunity to put you log to have some info about the HTTP Requests.

So, here is the code:

```javascript
var logger = require("../utils/logger");

var express = require("express");
var app = express();

logger.debug("Overriding 'Express' logger");
app.use(require('morgan')({ "stream": logger.stream }));
```

The only importat thing here is the middleware, ```app.use``` where ```logger.stream comes``` from the logger configuration file.

All my code is available on my Node Sample github repository available [here](https://github.com/imperugo/NodeJs-Sample)

>Express 4 moved some middleware outside of Express packages, so you have to install it manully (more ingo [here](https://github.com/senchalabs/connect#middleware)). If you are using an older version of Express my code needs some changes because of middleware.


