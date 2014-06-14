---
layout: post
title: "Top Framework for .NET web developers"
date: 2014-06-09
description: "A list of the best framework for a web .net developer, included front end frameworks."
comments: true
categories:
- .NET
tags:
- .net
- webstack
- aspnet
- aspnetmvc
- webapi
- nancyFX
- signalr
- windsor
- xunit
- autofixture
- automapper
- cachecow
- servicestack
- redis
- azure
- sharptestsex
- quartz
- Saas
- Bootstrap
- Bower
- Grunt
- Yeoman
- AngularJS
- Karma
- Jasmine
---

The idea of this post is born talking with my colleague Antonio about the frameworks a .NET web developer should know (from my point of view of course). That's funny because the list is very long and I asked myself if there is something wrong with my idea of .NET web developer or something else.
From my point of view (and also for my company) there are two kind of web developers, Back End (server side code) and Front End (javascript, css and HTML).
Unfortunately, in Italy, these figures matches in only one person and the quality of the product obviously falls.

<br/>

##**Back End Developer**

<br/>

###**ASP.NET MVC**###
######Website: *[http://www.asp.net/mvc](http://www.asp.net/mvc)*<br/>
######Source code: *[http://aspnetwebstack.codeplex.com/](http://aspnetwebstack.codeplex.com/)*<br/>

Most of our application runs on top of ASP.NET MVC, so for me it's really important to know it.
Basically I think it's a good framework lot of extensibility points, good implementation of the MVC pattern and we use it in projects with heavy traffic without particular problems.
Of course there are few things I don't like of it (first of all System.Web), but fortunately the vNext will solve these "problems".

<br/>

###**ASP.NET WEBAPI**###
######Website: *[http://www.asp.net/web-api](http://www.asp.net/web-api)*<br/>
######Source code: *[http://aspnetwebstack.codeplex.com/](http://aspnetwebstack.codeplex.com/)*<br/>

ASP.NET Web API is probably the best solution if you know ASP.NET MVC and you don't have time to learn something else like NancyFx, NodeJs and so on;
The approach is very similar to MVC (Controller + Action). Fortunately it doesn't have the dependency to System.Web but it's a Framework totally separate from MVC and sometime you have to duplicate the same code on MVC and Web API because the same interface/class has a different namespace.

<br/>

###**SignalR**###
######Website: *[http://www.asp.net/signalr](http://www.asp.net/signalr)*<br/>
######Source code: *[https://github.com/SignalR/SignalR](https://github.com/SignalR/SignalR)*<br/>

I'm not sure if exist another Framework for real time applications in .NET world but surely SignalR it is the most famous and used. Build by the same team of ASP.NET MVC / Web API it offers several clients (iOS and Android with [Xamarin](http://xamarin.com/), Windows 8 and Windows Phone) and finally it supports old browsers (with fallback of course forever-frame, polling and son on).

<br/>

###**NancyFX**###
######Website: *[http://nancyfx.org/](http://nancyfx.org/)*<br/>
######Source code: *[https://github.com/NancyFx/Nancy](https://github.com/NancyFx/Nancy)*<br/>

Nancy is a lightweight framework for building HTTP based services on .Net and [Mono](http://mono-project.com/) (yes it runs on linux and OSX). The main difference between Nancy and Web API is the routing approach. It uses lambdas to identify relative paths and arguments. Really helpful if you can't deploy on a Windows Server.

<br/>

###**Common Logging**###
######Website: *[http://netcommon.sourceforge.net/](http://netcommon.sourceforge.net/)*<br/>
######Source code: *[https://github.com/net-commons/common-logging](https://github.com/net-commons/common-logging)*<br/>

I really like this library. Often I need to deploy my code side by side with another application or I've to use a specific logging framework. Common Logging is the perfect solution. basically it is an abstraction between different logging implementations like [Log4net](http://logging.apache.org/log4net/), [NLog](http://nlog-project.org/), [Enterprise library](http://msdn.microsoft.com/en-us/library/ff648951.aspx) or whatever you want (write your custom bridge).
Like many frameworks in the .NET world, this is a porting of a Java Framework ([here](http://commons.apache.org/proper/commons-logging/) more info). Really useful!

<br/>

###**Windsor Container**###
######Website: *[http://www.castleproject.org/](http://www.castleproject.org/)*<br/>
######Source code: *[https://github.com/castleproject/Windsor](https://github.com/castleproject/Windsor)*<br/>

Probably the first package I add in a new project. I'm really a Dependency Injection addicted and Castle Windsor fits very well with my needs. It's fast, easy to use, all needed lifecycle and offers lot of extension point (Interceptor, custom lifecycle, factories and so on).

<br/>

###**Automapper**###
######Website: *[http://automapper.org/](http://automapper.org/)*<br/>
######Source code: *[https://github.com/AutoMapper/AutoMapper](https://github.com/AutoMapper/AutoMapper)*<br/>

In my Italian blog I [wrote](http://imperugo.tostring.it/archive/2011/10/25/dominio-stai-lontano-dalle-mie-view/) about the importance to use a DTO for the views and the responses instead of the Domain Model. Automapper is absolutely the best framework to "copy" data from an entity to a DTO. Easy to use, fast and extensible it's the second package I install on a new project. A must.

<br/>

###**Service Stack**###
######Website: *[https://servicestack.net/](https://servicestack.net/)*<br/>
######Source code: *[https://github.com/ServiceStack](https://github.com/ServiceStack)*<br/>

Really an interesting set of Frameworks. It contains a Json serializer, ORM, Redis client and Service Clients. This set of Frameworks matches perfectly with those who are obsessed with performance. The tagline of the Framework is "Simplicity at Speed". [Here](http://www.slideshare.net/newmovie/what-istheservicestack-14819151?ref=https://servicestack.net/features) a good presentation about ServiceStack and performances in .NET application

<br/>

###**Quartz.NET**###
######Website: *[http://www.quartz-scheduler.net/](http://www.quartz-scheduler.net/)*<br/>
######Source code: *[https://github.com/quartznet/quartznet](https://github.com/quartznet/quartznet)*<br/>

Quartz.NET is a job scheduling system for small or large applications. Like Commong Logging also this, is a porting from a Java project ([here](http://quartz-scheduler.org/) more info). It offers several ways to run a job, from Cron pattern to special calendar, or whatever you like. The nice thing is you can have a storage for your jobs (configurable SQL, Mongo, MySql .....) very useful for scalable applications.

<br/>

###**Cache Cow**###
######Source code: *[https://github.com/aliostad/CacheCow](https://github.com/aliostad/CacheCow)*<br/>

Caching is really important, specially if you application must answer to lot of requests. The best way to keep performance acceptable is to reduce the number of operation, specially if request and response are the same for most of the total requests. Cache Cow is a Framework built by my Twitter friend [@aliostad](http://www.twitter.com/aliostad) and it offers an easy way to cache HTTP requests (both from client and server) using WEB API. With few line of code, you can have a good caching in your favorite storage (Redis, Azure Caching, Sql Server and so on).

<br/>

###**Redis**###
######Website: *[http://redis.io/](http://redis.io/)*<br/>
######Source code: *[https://github.com/antirez/redis](https://github.com/antirez/redis)*<br/>

Redis is an open source caching Framework that offers an advanced Dictionary (key/value) storage. Recently it's available (as preview) also on Windows Azure ([here](http://azure.microsoft.com/blog/2014/06/05/mvc-movie-app-with-azure-redis-cache-in-15-minutes/) a good article explains how to use redis with MVC and Azure). The most interesting thing about that is absolutely the performance. He's really really fast and also available on distributed infrastructures. If you go in a multi-server application probably is the best solution.

<br/>

###**XUnit**###
######Source code: *[https://github.com/xunit/xunit](https://github.com/xunit/xunit)*<br/>

Probably is the most active testing framework for .NET applications. It's used on lot of the Frameworks mentioned in this post (included MS Stack). It has support for [Resharper](http://www.jetbrains.com/resharper/), [CodeRush](https://www.devexpress.com/Products/CodeRush/) Test Runner and [Xamarin](xamarin.com) Test Runner.

<br/>

###**Autofixture**###
######Source code: *[https://github.com/AutoFixture/AutoFixture](https://github.com/AutoFixture/AutoFixture)*<br/>

It's a framework that helps developers to do Test-Driven Development by automating non-relevant Test Fixture Setup. Really I'm not a fan of TDD but Autofixture contains several features like Automock (helpful if you change frequently the constructor dependencies) and [AutoMoqData](http://blog.ploeh.dk/2010/10/08/AutoDataTheorieswithAutoFixture/) that can help all developers.

<br/>

###**Sharp Tests Ex**###
######Source code: *[http://sharptestex.codeplex.com/](http://sharptestex.codeplex.com/)*<br/>

It's a library born to wrap all testing framework using a fluent syntax. Usually I don't change often the testing framework but sometime I need to copy part or my code to an existing application that uses NUnit or MS-Test. In this case the only thing to do is change the Testing attribute in the test class.

##**Front End Developer**

###**Saas**###
######Website: *[http://sass-lang.com/](http://sass-lang.com/)*<br/>
######Source code: *[https://github.com/sass/sass](https://github.com/sass/sass)*<br/>

<br/>

###**Bootstrap**###
######Website: *[http://getbootstrap.com/](http://getbootstrap.com/)*<br/>
######Source code: *[https://github.com/twbs/bootstrap](https://github.com/twbs/bootstrap)*<br/>

<br/>

###**Bower**###
######Website: *[http://bower.io/](http://bower.io/)*<br/>

<br/>

###**Grunt**###
######Website: *[http://gruntjs.com/](http://gruntjs.com/)*<br/>
######Source code: *[https://github.com/gruntjs/](https://github.com/gruntjs/)*<br/>

<br/>

###**Yeoman**###
######Website: *[http://yeoman.io/](http://yeoman.io/)*<br/>
######Source code: *[https://github.com/yeoman/yeoman](https://github.com/yeoman/yeoman)*<br/>

<br/>

###**AngularJS**###
######Website: *[https://angularjs.org/](https://angularjs.org/)*<br/>
######Source code: *[https://github.com/angular/angular.js](https://github.com/angular/angular.js)*<br/>

<br/>

###**Karma**###
######Website: *[http://karma-runner.github.io/](http://karma-runner.github.io/)*<br/>
######Source code: *[https://github.com/karma-runner/karma/](https://github.com/karma-runner/karma/)*<br/>

<br/>

###**Jasmine**###
######Website: *[http://jasmine.github.io/](http://jasmine.github.io/)*<br/>
######Source code: *[https://github.com/pivotal/jasmine](https://github.com/pivotal/jasmine)*<br/>
