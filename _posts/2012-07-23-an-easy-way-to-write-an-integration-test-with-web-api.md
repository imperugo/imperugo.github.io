---
layout: post
title: An easy way to write an integration test with Web API
categories:
- WebAPI
tags:
- integrationtest
- sharptestsex
- unittest
- webapi
- xunit
status: publish
type: post
published: true
comments: true
---
In my previous <a title="Self-Host with Web API" href="http://tostring.it/2012/07/16/self-host-with-web-api/" target="_blank">post</a> I wrote about the Self-Host in <a title="More posts about Web API" href="http://tostring.it/tag/webapi/" target="_blank">Web API</a> and why this features is so cool. In this I’d like to show how easy is to create an integration test with Web API (with my base class of course :)).

Before to proceed is important to understand because it’s important to create an integration test.
I think this is a good point and the answer is not so easy but I’ll try to explain my point of view.

In most environments (including <a title="More posts about ASP.NET MVC" href="http://tostring.it/tag/aspnetmvc/">ASP.NET MVC</a>) integration tests are expensive because you need a webserver, configure it for each test and so on.

With Web API you don’t have this issue, there is the Self Host that helps you. A good point for the integration test is that you can replicate a real situation and, for the Web API, you can test the content negotiation, authentication and other important features.

The recipe for this test includes:
<ul>
	<li><a title="xUnit Official Site" href="http://xunit.codeplex.com/" target="_blank">xUnit</a> (is not mandatory but actually it’s my favorite test framework);</li>
	<li><a title="SharpTestsEx Official Site" href="http://sharptestex.codeplex.com/" target="_blank">SharpTestEx</a> (is an incredible cool library wrote by my friend <a title="Fabio Maulo's blog" href="http://fabiomaulo.blogspot.it/" target="_blank">Fabio Maulo</a>);</li>
</ul>
The problem of the integration test is the repetitiveness code, in fact you have to create the server, configure it, make a request and so on.

For this reason I created a base class that helps us for this job and the result is pretty awesome.
In this example I want to test the Action below:

```csharp
public class ValuesController : ApiController
{
  public IEnumerable<string> Get()
  {
    return new[]
             {
               "http://tostring.it",
             "http://imperugo.tostring.it",
             "http://twitter.com/imperugo",
             "http://www.linkedin.com/in/imperugo"
             };
  }
}
```
And the unit test should be like that:

```csharp
[Fact]
public void ValueController_WithGetMethos_ShouldReturnValidData()
{
  HttpSelfHostConfiguration configuration = new HttpSelfHostConfiguration("http://localhost:8080");
  configuration.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always;
  configuration.Services.Replace(typeof(IAssembliesResolver), new WebApiClassBase.TestAssemblyResolver(typeof(ValuesController)));
  configuration.Routes.MapHttpRoute("Default", "{controller}", new { controller = "Home" });

  HttpSelfHostServer server = new HttpSelfHostServer(configuration);
  try
  {
    server.OpenAsync().Wait();

    var request = new HttpRequestMessage();

    request.RequestUri = new Uri("http://localhost:8080");

    request.Method = HttpMethod.Get;

    var client = new HttpClient(server);
    using (HttpResponseMessage response = client.SendAsync(request).Result)
    {
      response.Should().Not.Be.Null();
      response.IsSuccessStatusCode.Should().Be.True();

      string[] result = response.Content.ReadAsAsync<string[]>().Result;

      result.Length.Should().Be.EqualTo(4);
      result[0].Should().Be.EqualTo("http://tostring.it");
      result[1].Should().Be.EqualTo("http://imperugo.tostring.it");
      result[2].Should().Be.EqualTo("http://twitter.com/imperugo");
      result[3].Should().Be.EqualTo("http://www.linkedin.com/in/imperugo");
    }
  }
  finally
  {
    configuration.Dispose();
    server.Dispose();
  }
}
```

This code has several problems; the code is not so easy to read, not maintainable, it’s repetitive, etc.
I wrote a base class that reduce and improve the test dramatically and the result is this:

```csharp
public class ValuesControllerTest : WebApiClassBase
{
  public ValuesControllerTest() : base("localhost", 8080, typeof (ValuesController)) { }

  [Fact]
  public void ValueController_WithGetMethos_ShouldReturnValidData()
  {
    base.Start();

    var response = base.CreateRequest("/Values", HttpMethod.Get);

    response.Should().Not.Be.Null();
    response.IsSuccessStatusCode.Should().Be.True();

    string[] result = response.Content.ReadAsAsync<string[]>().Result;

    result.Length.Should().Be.EqualTo(4);
    result[0].Should().Be.EqualTo("http://tostring.it");
    result[1].Should().Be.EqualTo("http://imperugo.tostring.it");
    result[2].Should().Be.EqualTo("http://twitter.com/imperugo");
    result[3].Should().Be.EqualTo("http://www.linkedin.com/in/imperugo");
  }
}
```

I replicated the same test but in a more elegant way. The only important things to remember are in the constructors:
The first parameter is the host, the second one the port and the last one is the type of the controller to test.

Obviously the class is not complete and more features will come, but now you can override the configuration so you can configure the Routing and other important parameters.
If you like this approach and you want to use or extend my base class, you’re welcome to do it <a title="WebAPI Base test class" href="https://github.com/imperugo/Spike/blob/master/imperugo.webapi.selfhost/imperugo.webapi.integrationTest/WebApiClassBase.cs" target="_blank">here</a>!
