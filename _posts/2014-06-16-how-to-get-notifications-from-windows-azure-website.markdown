---
layout: post
title: How to get notifications from a Windows Azure website
date: 2014-06-16 18:37:42
description: "Get up to date with Windows Azure and Zapier. In this post we'll see how to get notification from your client application using a third party service."
categories:
- azure
tags:
- azure
- zapier
- github
---

In my [company](http://gaia.is.it/) we switched from [Team Foundation Server](http://www.visualstudio.com/en-us/products/tfs-overview-vs.aspx) to [Github](http://www.github.com) more than one year ago and we are really happy. In the same period we switched all our server to [Windows Azure](http://azure.microsoft.com/en-us/) ([Virtual Machine](http://azure.microsoft.com/en-us/services/virtual-machines/), [Web Sites](http://azure.microsoft.com/en-us/services/web-sites/) and [Cloud Services](http://azure.microsoft.com/en-us/services/cloud-services/)) and we are equally happy.

The Azure team works very well and I love to deploy my web sites using Github (there are sevaral providers so, if you don't use github don't worry, you'll find the solution that fits best your needs).

>If you are intersted in how to push your code to Azure website using Git, [here](http://azure.microsoft.com/en-us/documentation/articles/web-sites-publish-source-control/) there is a cool post and [here](https://github.com/projectkudu/kudu) there's also an engine used for the deploy based on [NodeJs](http://tostring.it/tag/#nodejs)

The problem about this approach is that I need to be notified when someone of the team deploy something, especially if the deploy fails.
Unfortunately right now Windows Azure doesn't send you any notification about a deploy procedure, so you have to remind yourself to go in the administration portal and check the deploy status (see the image below).

![Windows Azure Management Portal]({{ site.url }}/assets/2014/06/windows-azure-management-portal.png)

[Zapier](https://zapier.com) is the solution to this problem. It allows you to select from many sources, to select an event and to attach an action. 
In my case it means something like "For each failed Azure Website deploy call my phone and read me the report" (You can get a email, sms or whatever you want).

Here the workflow to configure Zapier:

**Select the services** ([here](https://zapier.com/zapbook/) the complete list of the available services)

![Windows Azure Management Portal]({{ site.url }}/assets/2014/06/Zapier-Trigger.png)

**Write your condition**

![Windows Azure Management Portal]({{ site.url }}/assets/2014/06/Zapier-Trigger-Options1.png)

**Compose the message**

![Windows Azure Management Portal]({{ site.url }}/assets/2014/06/Zapier-Trigger-Options.png)

How f...ing cool is that?