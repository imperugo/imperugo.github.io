---
layout: post
title: Customize Json result in Web API
categories:
- Various
- WebAPI
- WebDev
tags:
- aspnetmvc
- json
- webapi
status: publish
type: post
published: true
comments: true
---
In my previous <a title="Do we really need Web API instead of ASP.NET MVC?" href="http://tostring.it/2012/07/03/do-we-really-need-web-api-instead-of-asp-net-mvc/" target="_blank">post</a> I wrote about <a title="More posts about Web API" href="http://tostring.it/category/webdev/web-api/" target="_blank">Web API</a> and the content negotiation. In this post I’d like to describe how it’s easy to change the Json serialization.

The most important improvement from the Beta to the RC in the Web API is about the serialization, in fact now the framework is using Json.Net for the serialization.
For all people who don’t know what <a title="Json.NET Site" href="http://james.newtonking.com/projects/json-net.aspx" target="_blank">Json.Net</a> is I can say, to make the definition easily, <strong>Json.Net is the best serializer in the .NET world</strong>.

It's cool for many reasons, especially because it's flexible and easy to setup. In this post I’d like to show the principals and useful settings that you probably want to change in your application, or can be helpful for you in the future.

Before to start, we have to make our Web API project easy to debug so, I’m going to remove the XML formatter.
I’m doing that because I’m in a test project and I’d like to see the response in the browser. The easily way to force the response to Json for all Web API requests is to remove the XML. Obviously you shouldn't do it in production.

NOTE: All code in this post,except the last one, must be located into the global.asax.cs

```csharp
var formatters = GlobalConfiguration.Configuration.Formatters;

formatters.Remove(formatters.XmlFormatter);
```

Now we can start change the setting for all Json responses accessing to <em><strong>GlobalConfiguration.Configuration.Formatters.JsonFormatter</strong></em>.

In the following examples I’ll use always the class below:

```csharp
public class User
{
  public string Firstname { get; set; }
  public string Lastname { get; set; }
  public string Username { get; set; }
  public DateTime Birthdate { get; set; }
  public Uri Website { get; set; }
  public int Age { get; set; }
  public double Salary { get; set; }

  [JsonIgnore]
  public string IgnoreProperty { get; set; }
}
```

<strong>How can we indent the json response?</strong>

```csharp
var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;

json.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
```

<strong>How can we change the case in the response?</strong>

```csharp
var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;

json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
```

<strong>How can we manage the null in the response?</strong>

```csharp
var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;

json.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
```

<strong>How can we change the DateTime format?</strong>

```csharp
var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;

json.SerializerSettings.DateFormatHandling = Newtonsoft.Json.DateFormatHandling.MicrosoftDateFormat;
```

<strong>How can we change the TimeZone format?</strong>

```csharp
var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;

json.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc;
```

<strong>How can we change the Culture of the serializer?</strong>

```csharp
var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;

json.SerializerSettings.Culture = new CultureInfo("it-IT");
```

Another cool feature of Web API is to opportunity to override the configuration for a single response.
You can use all of the previous setting directly in the single action like explained in the code below:

```csharp
public HttpResponseMessage Get(){
  IList<User> result = new List<User>();
  result.Add(new User
               {
                 Age = 34,
                 Birthdate = DateTime.Now,
                 Firstname = "Ugo",
                 Lastname = "Lattanzi",
                 IgnoreProperty = "This text should not appear in the reponse",
                 Salary = 1000,
                 Username = "imperugo",
                 Website = new Uri("http://www.tostring.it")
               });

  var formatter = new JsonMediaTypeFormatter();
  var json =formatter.SerializerSettings;

  json.DateFormatHandling = Newtonsoft.Json.DateFormatHandling.MicrosoftDateFormat;
  json.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc;
  json.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
  json.Formatting = Newtonsoft.Json.Formatting.Indented;
  json.ContractResolver = new CamelCasePropertyNamesContractResolver();
  json.Culture = new CultureInfo("it-IT");

  return Request.CreateResponse(HttpStatusCode.OK, result, formatter);
}
```

Such as ASP.NET MVC, Web API are really flexible ... and ROCKS!
