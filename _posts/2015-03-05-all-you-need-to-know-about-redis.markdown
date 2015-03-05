---
layout: post
title: "All you need to know about Redis"
date: "2015-03-05"
description: "A set of resource if you want to use Redis in a .NET Application."
comments: true
categories:
- azure
tags:
- Redis
- azure
- cache
---

I know, the title is a bit provocative or presumptuous if you prefer, but I think that post could be useful if you wanna approach to Redis as cache server using .NET.
For all the people who don't know what [Redis](http://redis.io/) is, let me quote that definition: 

>Redis is an open source, BSD licensed, advanced key-value cache and store.

And why is it so cool? This is probably the best answer you can find on internet (source [here](http://redis.io/commands/KEYS)):

>Redis running on an entry level laptop can scan a 1 million key database in 40 milliseconds.

#Installation

Now that is clear why Redis is so cool and why lot of enterprise applications use it, we can see how to use it. First of all we have to download Redis from [here](https://raw.github.com/ServiceStack/redis-windows/master/downloads/redis64-latest.zip), unzip the file and run it locally

```
> redis-server.exe redis.conf
```

and the console output should be something like this:

![RedisConsole]({{ site.url }}/assets/2015/02/Redis-Console.png)

if you want to use Redis on Microsoft Azure, you can do it by creating your instance [here](http://portal.azure.com):

![Azure1]({{ site.url }}/assets/2015/02/AzureRedis1.png)

![Azure2]({{ site.url }}/assets/2015/02/AzureRedis2.png)

choose the best plan for you, the location, add your name in the proper field and create it. 

>creation could take a while and sometime you can get errors. The reason is that the portal is still in beta but don't worry, keep trying till you get the redis cache server up & running

![Azure3]({{ site.url }}/assets/2015/02/AzureRedis3.png)

![Azure4]({{ site.url }}/assets/2015/02/AzureRedis4.png)

#Configuration

Here we go, Redis is up & running on your dev machine and/or on Azure if you choose it.
Before to start writing code, it's important to choose the client library to use. The most used libraries are 

- [**StackExchange.Redis**](https://github.com/StackExchange/StackExchange.Redis)
- [**ServiceStack.Redis**](https://servicestack.net/redis)

The first one is free and opensource so, if you want to use it, you can do easily. The other one has a AGPL license (from 149$ to 249$).

>if you prefer ServiceStack.Redis you can downgrade to version 3.9.71 which was the last truly free

In this article I'm going to use **StackExchange.Redis** so, let's start to install it using NuGet

{% raw %}
<div class="nuget-badge">
    <code>PM&gt; Install-Package StackExchange.Redis</code>
</div>
{% endraw %}

>There is also a StrongName (StackExchange.Redis.StrongName) package if you need to use it into a signed library.

Now, it's time to write some good code:

```csharp
namespace imperugo.blog.redis
{
	class Program
	{
		private static ConnectionMultiplexer connectionMultiplexer;

		static void Main(string[] args)
		{
			Configure();
		}

		private static void Configure()
		{
			//use locally redis installation
			var connectionString = string.Format("{0}:{1}", "127.0.0.1", 6379);

			//use azure redi installation
			var azureConnectionString = string.Format("{0}:{1},ssl=true,password={2}",
									"imperugo-test.redis.cache.windows.net",
									6380,
									"Azure Primary Key");

			connectionMultiplexer = ConnectionMultiplexer.Connect(connectionString);
		}
	}
}
```

>For some plans, Redis on azure uses SSL by default. If you prefer a no-secure connection you can enable it via Azure Portal, in this case use 6379 and remove ```ssl=true``` from the connection string

#Add and Retrieve cache objects

StackExchange store data into Redis sending/retrieving a ```byte[]``` or so, whatever you are storing into Redis must be converted into a ```byte[]``` (string is automatically conveted by StackExchange.Redis implementation so we don't have to convert it).

Let's start with simple object like a string

```csharp
private static bool StoreData(string key, string value)
{
    var database = connectionMultiplexer.GetDatabase();
    return database.StringSet(key, value);
}

private static string GetData(string key)
{
    var database = connectionMultiplexer.GetDatabase();
    return database.StringGet(key);
}

private static void DeleteData(string key)
{
    var database = connectionMultiplexer.GetDatabase();
    database.KeyDelete(key);
}
```
and now we can use that methods

```csharp
static void Main(string[] args)
{
    Configure();

    bool stored = StoreData("MyKey","my first cache string");

    if (stored)
    {
        var cachedData = GetData("MyKey");

        bool isIt = cachedData == "my first cache string";
    }
}
```
That's pretty simple but what about store complex objects?
As I wrote above, **StackExchange.Redis** store only ```byte[]``` data so we have to serialize our complex object and convert it into a ```byte[]``` (there is an implicit conversion in case of string, for this reason we didn't converted the type ```string```to ```byte[]```)

The easiest (and probably the best) way to store complex object consists serilize the object into a string before to store the data into Redis.

Choose your favorite serialized ([NewtonSoft](http://www.newtonsoft.com/json) in my case ) and create some helpers like here

```csharp
public bool Add<T>(string key, T value, DateTimeOffset expiresAt) where T : class
{
   var serializedObject = JsonConvert.SerializeObject(value);
    var expiration = expiresAt.Subtract(DateTimeOffset.Now);

    return database.StringSet(key, serializedObject, expiration);
}

public T Get<T>(string key) where T : class
{
    var serializedObject = database.StringGet(key);

    return JsonConvert.DeserializeObject<T>(serializedObject)
}

```
 
 Now we are able to put and retrieve complex objects into Redis, next step remove it and check if the value exists
 
 ```csharp
 public bool Remove(string key)
{
    return database.KeyDelete(key);
}
        
public bool Exists(string key)
{
    return database.KeyExists(key);
}
 ```
 
 >if you need async methods, don't worry StackExchange.Redis has an async overload almost every method
 
#Resources

[**Redis Commands**](http://redis.io/commands) absolutety the best reference to understand how Redis works and what StackExchage.Redis does under the table.

[**StackExchage.Redis**](https://github.com/StackExchange/StackExchange.Redis) documentation is absolutely helpful if you choose this library as your wrapper.

[**StackExchange.Redis.Extensions**](https://github.com/imperugo/StackExchange.Redis.Extensions/) is a great library that wrap the common operation needed with StackExchange.Redis (basically you don't need to serialize objects or create helpers like I explained above):

- Add complex objects to Redis;
- Remove an object from Redis;
- Search Keys into Redis;
- Retrieve multiple object with a single roundtrip;
- Store multiple object with a single roundtrip;
- Async methods;
- Retrieve Redis Server status;
- Much more;

It uses **Json.Net** (NewtonSoft), **Jil** or **Message Pack CLI** to serialize objects into a ```byte[]```.
Anyway we'll see it with the next blog post.

#Dashboard

**Azure Dashboard**

![AzureRedis-Dashboard]({{ site.url }}/assets/2015/02/AzureRedis-Dashboard.png)

It offers basic stats but it's free when you use Redis with Microsoft Azure

[**Redismin**](https://redsmin.com/)

![Redismin-Dashboard]({{ site.url }}/assets/2015/02/Redismin-Dashboard.png)

Probably the most complete dashboard for Redis, offers a set of stats about your Redis servers, supports Azure and has a good prompt allowing you to run Redis command directly on the server without use C# or any other programming language. 
Unfortunately it is not free, [here](https://redsmin.com/plans) plans and pricing.

[**Redis Desktop Manager**](http://redisdesktop.com/)

![Redismin-Dashboard]({{ site.url }}/assets/2015/02/RedisDesktop-Dashboard.png)

Open Source tool for Windows, Mac and Linux hosted on Github [here](https://github.com/uglide/RedisDesktopManager/) (right now it the version 0.7.6) offers to run Redis commands into Redis like Redismin, but unfortunately it doesn't support Azure yet (there is an issue about that opened [here](https://github.com/uglide/RedisDesktopManager/issues/3312)).

[**Redis Live**](Real time dashboard for redis) 

![redis-live-Dashboard]({{ site.url }}/assets/2015/02/redis-live-Dashboard.png)

It's a real time dashboard for Redis written using Phyton.

#Conclusions

Redis is absolutely one of the best in memory database available right now. There is a wrapper for every language, it's got a good documentation and it's free.
If I were you I'd give it a look!

***staytuned!***
