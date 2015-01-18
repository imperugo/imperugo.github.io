---
layout: post
date: "2015-01-19"
title: Cookie Authentication Cross application (IIS and Self Hosted)
description: "Using the cookie authentication for ASP.NET MVC and WebAPI self hosted requires custume cookie encryption"
comments: true
categories:
- aspnet
tags:
- azure
- webapi
- owin
- katana
- iis
- mvc
---

Recently I worked on an applicaiton composed by several "actors" developed with several tecnologies; some of them are ASP.NET MVC applications, others Web API Self Host, SPA (always WEB API Self Hosted), Node and so on.

Everything here is hosted on Microsoft Azure using a good part of it (Cloud Service, Storage, Sql Azure, Service Bus, CDN and so on).

Each part of this application has a specific scope (front end application, backoffice, apis) and some of them require authentication to use some features.

Without go deeply into the application for this post is enough know that there is an MVC application with authentication, something lik authentication.mydomain.com, another one that's products.mydomain.com and the lastone that is administration.mydomain.com.

The first two are normal MVC application and the lastone is a single page application (SPA) hosted using Web API (pages are static files, and everything are created using angular).

Nothing extremely complicated except because we have to manage authentication among mvc and self host api using ASP.NET Identity.



