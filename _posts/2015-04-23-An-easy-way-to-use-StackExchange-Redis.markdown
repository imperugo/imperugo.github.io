---
layout: post
title: "An easy way to use StackExchange.Redis"
date: "2015-04-23"
description: "With StackExchange.Redis.Extension is possible to use easily some cool features of Redis, starting from storing and reading multiple object in a single roundtrip to check the server status"
comments: true
categories:
- various
tags:
- Redis
- azure
- cache
---

In the previous post (you can read it [here](http://tostring.it/2015/03/05/all-you-need-to-know-about-redis/)) I wrote about how cool is Redis as cache server and I showed the basic steps to run Redis on premise or on Microsoft Azure if you prefer.

In this post I wanna introduce an small package available on NuGet that complete one of the best library actually available for Redis in a .NET environement.

The package is **[StackExchange.Redis.Extensions](https://github.com/imperugo/StackExchange.Redis.Extensions)** and, as you can imagine from the name, it offers a set of useful helper.


###What can we do easily with StackExchange.Redis.Extensions?

In the previous post I wrote that you have to serialize and deserialize a class if you wanna store it into Redis because the library stores a byte[] and the value could be sent via network.
Using this library you don't have to worry about that, it does that for you.
Right now it can use three different serialization libraries :

- **JSON.Net by NewtonSoft** [![NuGet Status](http://img.shields.io/nuget/v/StackExchange.Redis.Extensions.Newtonsoft.svg?style=flat)](https://www.nuget.org/packages/StackExchange.Redis.Extensions.Newtonsoft/)
- **Jil** [![NuGet Status](http://img.shields.io/nuget/v/StackExchange.Redis.Extensions.Jil.svg?style=flat)](https://www.nuget.org/packages/StackExchange.Redis.Extensions.Jil/)
- **Message Pack CLI** [![NuGet Status](http://img.shields.io/nuget/v/StackExchange.Redis.Extensions.MsgPack.svg?style=flat)](https://www.nuget.org/packages/StackExchange.Redis.Extensions.MsgPack/)

>If you need to use another serializazion library you can easily do it by creating an implementation  of [ISerialize](https://github.com/imperugo/StackExchange.Redis.Extensions/blob/master/src/StackExchange.Redis.Extensions.Core/ISerializer.cs). Of course in this case a Pull Request is welcome

In the example below I'm going to use JSON.Net but the code is the same for the other librarys, just the Nuget Package changes.

First step is to install it on our project so:

{% raw %}
<div class="nuget-badge">
    <code>PM&gt; Install-Package StackExchange.Redis.Extensions.Newtonsoft</code>
</div>
{% endraw %}

It contains all you need to use Redis, so you don't have to add StackExchange.Redis because it has the right dependency to it.

Now that we are ready, it's enough to create our ```ICacheHelper``` instance

```csharp
var serializer = new NewtonsoftSerializer();
var cacheClient = new StackExchangeRedisCacheClient(serializer);
```

The constructor of ```StackExchangeRedisCacheClient```has different overloads offering you the opportunity to specify your custom serializer, database, connection string or, if you have it, your instance of ```ConnectionMultiplex```.

If you use the code above is enough the add the following code to your configuration file replacing the right values (host, port, ssl and so on):

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
    <configSections>
        <section name="redisCacheClient"
               type="StackExchange.Redis.Extensions.Core.Configuration.RedisCachingSectionHandler, StackExchange.Redis.Extensions.Core" />
    </configSections>

    <redisCacheClient allowAdmin="true" ssl="false" connectTimeout="5000" database="0">
        <hosts>
            <add host="127.0.0.1" cachePort="6379"/>
        </hosts>
    </redisCacheClient>
</configuration>
```



>If you use a dependency injection framework, probably it's better to register it as singleton

From now we have a set of useful methods for the following scenarios:

###How can I store a complex object into Redis?

```csharp
var user = new User()
{
    Firstname = "Ugo",
    Lastname = "Lattanzi",
    Twitter = "@imperugo"
    Blog = "http://tostring.it"
}

bool added = myCacheClient.Add("my cache key", user, DateTimeOffset.Now.AddMinutes(10));
```

###How can I retrieve an object into Redis?

```csharp
var cachedUser = cacheClient.Get<User>("my cache key");
```

###How can I retrieve multiple objects with single roundtrip?

That's one of my favorite features because It's very helpful in case you have to retrieve several objects in the same time. 

```csharp
var cachedUsers = myCacheClient.GetAll<User>(new {"key1","key2","key3"});
```

###How can I add multiple objects with single roundtrip?

```csharp
IList<User> values = new List<User>();

var user1 = new User()
{
    Firstname = "Ugo",
    Lastname = "Lattanzi",
    Twitter = "@imperugo"
    Blog = "http://tostring.it"
}

var user2 = new User()
{
    Firstname = "Simone",
    Lastname = "Chiaretta",
    Twitter = "@simonech"
    Blog = "http://codeclimber.net.nz/"
}

var user3 = new User()
{
    Firstname = "Matteo",
    Lastname = "Pagani",
    Twitter = "@qmatteoq"
    Blog = "http://qmatteoq.com/"
}

values.Add(user1);
values.Add(user2);
values.Add(user3);

bool added = sut.AddAll(values);
```

###Can I search keys into Redis?

Yes that's possible using a specific pattern.
If you want to search all keys that start with ```myCacheKey```:

```csharp
var keys = myCacheClient.SearchKeys("myCacheKey*");
```

If you want to search all keys that contain with ```myCacheKey```:

```csharp
var keys = myCacheClient.SearchKeys("*myCacheKey*");
```

If you want to search all keys that end with ```myCacheKey```:

```csharp
var keys = myCacheClient.SearchKeys("*myCacheKey");
```

## Can I use a Redis method directly from ICacheClient without adding another dependency to my class?

Of course you can. ```ICacheClient``` exposes a readonly property named ```Database``` that is the implementation of IDatabase by [StackExchange.Redis](https://github.com/StackExchange/StackExchange.Redis)


## How can I get server information?
```ICacheClient``` has a method ```GetInfo``` and ```GetInfoAsync``` for that:

```csharp
var info = myCacheClient.GetInfo();
```

That's what the library does right now and I've to say thanks to [ziyasal](https://github.com/ziyasal), [ppanyukov](https://github.com/ppanyukov) and [rajasekarshanmugam](https://github.com/rajasekarshanmugam) for the contribution.

The project is available on Github **[here](https://github.com/imperugo/StackExchange.Redis.Extensions)**
