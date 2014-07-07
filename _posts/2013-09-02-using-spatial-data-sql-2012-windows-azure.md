---
layout: post
title: Using Spatial Data With Sql 2012 and Windows Azure
categories:
- .NET
- Azure
tags:
- azure
- deploy
- entity framework
status: publish
type: post
published: true
comments: true
---
<span style="line-height: 1.5em;">In the last few weeks, I worked about some APIs using <a title="Web API Posts" href="http://tostring.it/category/webdev/webapi-webdev/" target="_blank">ASPNET Web Api</a> and, for the data storage, Entity Framework and Sql Server; everything hosted on <a title="Windows Azure" href="http://www.windowsazure.com/" target="_blank">Azure</a></span>.

Nothing sensational! make a rest call, read the data and return a json. The only new thing (for me) was the <a title="Spatial Data Wiki" href="http://en.wikipedia.org/wiki/Spatial_database" target="_blank">Spatial Data</a>.

Thinking about this great <a title="Am I really a developer or just a good googler?" href="http://www.hanselman.com/blog/AmIReallyADeveloperOrJustAGoodGoogler.aspx" target="_blank">post</a> by <a title="Scott Hanselman on Twitter" href="https://twitter.com/shanselman" target="_blank">Scott Hanselman</a>, in this case I chose to be a Googler :D so, I started to learn Spatial Data with Entity Framework from this <a title="Basic Spatial Data with SQL Server and Entity Framework 5.0" href="http://www.west-wind.com/weblog/posts/2012/Jun/21/Basic-Spatial-Data-with-SQL-Server-and-Entity-Framework-50" target="_blank">post</a> by <a title="Rick Strahl on Twitter" href="https://twitter.com/RickStrahl" target="_blank">Rick Strahl</a>.

Such as all posts by Rick, also this one is awesome. It explains very well all you need to start with Spatial Data and everything worked right at first try.

<strong>So, where is the reason of this post?</strong> The deploy.
In my local environment, I was able to execute all Spatial Queries but, in the production environment, Iwas getting this strange message “The method or operation is not implemented.” In this line of code:

```csharp
DbGeography.PointFromText(text, 4326);
```
Keep looking on Google I found the reason. DefaultSpatialServices in Entity Framework are using SqlGeography and SqlGeometry types as backing types. These are a part of Microsoft.SqlServer.Types.dll that is not included in the .NET Framework.

On my local installation it works because I've installed SQL Server and it register that assembly into the GAC (Global Assembly Cache) during the setup procedure. Fortunately Azure Web Site and Cloud Service don't have Sql Server installed so the assembly is missing.

The solution is to copy the assembly directly in your bin folder.

<strong>Now, where is the assembly <strong>located</strong>?</strong>

Not easy to find, anyway it’s here <strong>C:Program Files (x86)\Microsoft SQL Server\100\SDK\Assemblies</strong>

Stay Tuned!
