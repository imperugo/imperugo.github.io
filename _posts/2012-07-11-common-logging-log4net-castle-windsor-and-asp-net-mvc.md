---
layout: post
title: Common Logging, Log4Net, Castle Windsor and ASP.NET MVC
categories:
- .NET
- aspnetmvc
tags:
- aspnetmvc
- castle
- log4net
- windsor
status: publish
type: post
published: true
comments: true
---
It sounds like a cocktail and really it is! One of the first things I noticed in <a title="ASP.NET MVC Tags" href="http://tostring.it/tag/aspnetmvc/" target="_blank">ASP.NET MVC</a> 4 is the package Common.Logging.

This package is available on NuGet (thanks again for Nuget) and includes a library; the library name is the same of the package and is an abstraction of the principal logging frameworks.

Why is so useful this library?
The answer is really simple, because your packages don’t have the reference to Log4Net, NLog, Elmah and Enterprise Library. It is really important because makes you able to change or update the log framework without recompile all your projects.
Really I did the same thing in Dexter as you can see <a href="http://dexterblogengine.codeplex.com/SourceControl/changeset/view/9ce9e69eeb13#trunk%2fsrc%2fProjects%2fDexter.Logger%2fContracts%2fILogger.cs">here</a> the contract and <a href="http://dexterblogengine.codeplex.com/SourceControl/changeset/view/9ce9e69eeb13#trunk%2fsrc%2fProjects%2fDexter.Logger.Log4Net%2fLog4NetLogger.cs">here</a> the concrete implementation using Log4Net.

If you like that approach, whether or not you're using ASP.NET MVC, you have to install the package running that command:

<a href="{{ site.url }}/assets/2012/07/common-logging-package.jpg"><img class="alignnone size-full wp-image-602" title="common-logging-package" src="{{ site.url }}/assets/2012/07/common-logging-package.jpg" alt="" width="752" height="86" /></a>

and, in the “host” project you have to reference the concrete implementation you prefer:
<ul>
	<li><strong>Log4net</strong> (<a href="http://nuget.org/packages/Common.Logging.Log4Net">http://nuget.org/packages/Common.Logging.Log4Net</a>);</li>
	<li><strong>NLog</strong> (<a href="http://nuget.org/packages/Common.Logging.NLog/2.0.0">http://nuget.org/packages/Common.Logging.NLog/2.0.0</a>);</li>
	<li><strong>Elmah</strong> (<a href="http://nuget.org/packages/Common.Logging.Elmah">http://nuget.org/packages/Common.Logging.Elmah</a>);</li>
	<li><strong>Enterprise Library</strong> (<a href="http://nuget.org/packages/Common.Logging.EntLib">http://nuget.org/packages/Common.Logging.EntLib</a>);</li>
</ul>
From now, everywhere you want to log something, you have to create the logger and then use it:
```csharp
using Common.Logging;
...
ILog log = LogManager.GetCurrentClassLogger();
log.Debug("hello world");
```
The problem of this code is the repetitiveness. In every class you have to create the logger before use it. Ok it could be static but is already boring.
Fortunately ASP.NET MVC has a good architecture and allows us to use the dependency injection (DI from now), so we can inject the logger into the constructor of our controllers:

```csharp
public class HomeController : ControllerBase {
	ILog logger;
	public HomeController(ILog logger){
		this.logger = logger;
	}
}
```

The next step I want to analyze in this post is the registration of ILog. Typically, in the most DI frameworks for a registration, want the interface, the implementation and the lifecycle, so something like this:
```csharp
public class DiRegister{
  public void Register(){
    //.....
    container.Register(typeof(ILog), LogManager.GetCurrentClassLogger(), LifeCycle.Singleton);
  }
}
```

The problem of that approach is in <em>LogManager.GetCurrentClassLogger()</em>.This method returns an instance of <em>ILog</em> for the current class, which is the class where you are registering your dependency: for this reason, this is a wrong behavior.

<strong>What does it mean?</strong>
It’s simple. If you got an error inside the <em>HomeController</em> and you catch and Log it, you like to see that this error comes from the <em>HomeController</em> and not from the DI registration class.

The class LogManager has <em>LogManager.GetLogger()</em> method that accept also the logger name. You have to create a class that retrieves the correct name (<em>HomeController</em> in our example) and injects the Logger using the right name.

With Castle Windsor you have to create and register a SubDependencyResolver (you can do the same with the most DI frameworks) implementing the interface ISubDependencyResolver like in the code below:

```csharp
public class LoggerSubDependencyResolver : ISubDependencyResolver
{
  public bool CanResolve(CreationContext context, ISubDependencyResolver contextHandlerResolver, ComponentModel model,DependencyModel dependency)
  {
    return dependency.TargetType == typeof (ILog);
  }


public object Resolve(CreationContext context, ISubDependencyResolver contextHandlerResolver, ComponentModel model,DependencyModel dependency)
  {
    if (CanResolve(context, contextHandlerResolver, model, dependency))
    {
      if (dependency.TargetType == typeof (ILog))
      {
        return LogManager.GetLogger(model.Implementation);
      }
    }
    return null;
  }
}
```

Now you have to register your SubDependencyResolver in Castle Container and test it:

```csharp
container.Kernel.Resolver.AddSubResolver(new LoggerSubDependencyResolver());
```

Summarizing, you can inject a Log without dependencies, only using NuGet and few c# code lines.
No Dependency, No new() keyword.

That’s awesome!
