---
layout: post
title: "Log your application into Slack"
date: "2015-11-23"
description: ""
comments: true
categories:
- various
tags:
- slack
- serilog
- logging
---

In our company we use [Slack](https://slack.com/) as communication tool (probably since it was released years ago) for about everything.
It is becoming a relly important tool because our teams are located throughout Europe with different timezones so, a good communication tools is mandatory.
It means also the client is alway open on our computers, phones and tablets.

We use it in different ways, to talk one to one, share funny things or for projects. Usually for a project we have more than a sigle private channels this because there are different teams for the project and because we use a channels as application alerts.

Here an example for one of our customers:

- bmw-ux (UX and Art stuff)
- bmw-dev (dev, quality assurance, github integration, trello and other tech stuff)
- bmw-alerts (alerts by the application)

The last channel is the most important for this post, because we use it to log information when something goes wrong into the application.
Before to see how to use it, let me explain our logging workflow.

The application is built partially on .NET hosted on Azure and we use Serilog as logging framework. It's a relly good logging framework and it offers several appenders.
We store all logs into ElastichSearch and use Kibana as dashboard to see the log, reports and other cool stuff. The output of our dashbord looks more or less like this:

![Kibana-Dashboard]({{ site.url }}/assets/2015/11/SlackLog/Kibana.png)

The usage is really simple

```csharp

ILogger log = new LoggerConfiguration()
	.Enrich.With<ExceptionDataEnricher>()
	.Enrich.With<MachineNameEnricher>()
	.Enrich.With<HttpRequestClientHostIpEnricher>()
	.Enrich.With<HttpRequestUrlEnricher>()
	.Enrich.With<HttpRequestUrlReferrerEnricher>()
	.Enrich.With<UserNameEnricher>()
	.Enrich.With<ThreadIdEnricher>()
	.Enrich.With(
						new EnvironmentIdEnricher("Production"), 
						new ApplicationIdEnricher(applicationName))
	
	.MinimumLevel.Error()
	.WriteTo.Email(new EmailConnectionInfo
	{
		EmailSubject = $"[BMW {applicationName}] Something went wrong",
		EnableSsl = smtpConfig.EnableSsl,
		FromEmail = smtpConfig.From,
		NetworkCredentials = new NetworkCredential(smtpConfig.Username, smtpConfig.Password),
		Port = smtpConfig.Port,
		ToEmail = emailConfiguration.SupportEmail,
		MailServer = smtpConfig.Host,
	})
	//https://github.com/serilog/serilog/wiki/Configuration-Basics
	.WriteTo.Logger(lc => lc
								.Filter.ByExcluding(le => le.RenderMessage().StartsWith("....myStuff")
								.WriteTo.Elasticsearch(new ElasticsearchSinkOptions(elasticSearchConfiguration.Url))
	)
	.CreateLogger();
	
```

As you can see in the code above, we use also to send the error via email for me is not the best way to have an important notification.
All people could write you an email and you need a notification everytime you get an email so it's difficult to enphatize an log message is tons of email.
For this reason we chosed to use a private channel on Slack to log important errors.
I think it's pretty easy to do that with any logger but for sure it is using Serilog.

First thing to do is to configure Slack integration services:

Image 1:
![Slack-001]({{ site.url }}/assets/2015/11/SlackLog/001.jpg)
Image 2:
![Slack-002]({{ site.url }}/assets/2015/11/SlackLog/002.jpg)
Image 3:
![Slack-003]({{ site.url }}/assets/2015/11/SlackLog/003.jpg)
Image 4:
![Slack-004]({{ site.url }}/assets/2015/11/SlackLog/004.jpg)

Now save and create your Serilog Slack Sink

```csharp
namespace Gaia.Bmw.Logging.Serilog.Sinks
{
	using System.Net.Http;
	using Enrichers;
	using global::Serilog.Core;
	using global::Serilog.Events;

	public class SlackSink : ILogEventSink
	{
		private const string SlackWebhookUrl = "here the url you copied from the image 2";
		private readonly string applicationId;
		private readonly string environmentType;


		public void Emit(LogEvent logEvent)
		{
			this.applicationId = "";			//read the application identifier from your configuration
			this.environmentType = ""; 		//read the environment type from your configuration
			
			string color;

			switch (logEvent.Level)
			{
				case LogEventLevel.Error:
				case LogEventLevel.Fatal:
					color = "danger";
					break;
				case LogEventLevel.Warning:
					color = "warning";
					break;
				default:
					color = "good";
					break;
			}

			//handlse some scenarios, this probably is not needed in your application
			var title = logEvent.Exception != null
								? logEvent.RenderMessage()
								: "New error occured";

			var exceptinon = logEvent.Exception != null
								? logEvent.Exception.ToString()
								: logEvent.RenderMessage();

			var obj = new
			{
				attachments = new[]
				{
					new
					{
						fallback = $"[{this.applicationId}] [{this.environmentType}] An error occurred.",
                        color = color,
						title = title,
						text = exceptinon,
						fields = new[]
						{
							new
							{
								title = "Project",
								value = this.applicationId,
								@short = "true"
							},
							new
							{
								title = "Environment",
								value = this.environmentType,
								@short = "true"
							}
						}
					}
				}
			};

			HttpClient client = new HttpClient();

			client.PostAsJsonAsync(SlackWebhookUrl, obj).Wait();
		}
	}
}
```

Now that you have everything ready, it's time to register the Sink into Serilog so

```csharp

.MinimumLevel.Error()
.WriteTo.Sink<SlackSink>()
.CreateLogger();

```
The output on slack should be like this:

![Slack-005]({{ site.url }}/assets/2015/11/SlackLog/005.jpg)

If you want to customize the output message take a look [here](https://api.slack.com/incoming-webhooks)
Enjoy








