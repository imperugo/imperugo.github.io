---
layout: post
title: "Introducing Event Starter Kit"
date: 2014-09-02
description: "Event Starter Kit is an open source project that helps people to organize conferences offering all that's needed (website, blog, launch page and mobile app)"
imagePath: /assets/2014/09/We-Want-You.png
comments: true
categories:
- Open Source
tags:
- nodejs
- xamarin
- github
- opensource
- event
- mongodb
---

<p style="text-align:center">
	<img src="{{ site.url }}/assets/2014/09/We-Want-You.png" style="text-align:center" />
</p>

One month ago we announced ([here](http://blog.webnextconf.eu/2014/07/28/announcing-second-web-european-conference/) more info) the next edition of [Web European Conference](http://webnextconf.eu).

We tried this year to replicate the conference but we got some problems with the venue. This time it seems it's going better; we don't have the venue confirmed yet, but we have good feeling about that.

Anyway, with the conference an important Open Source project is borning, we ([Simone](climber.net.nz) and I) called it **[Event Starter Kit](https://github.com/imperugo/Event-Starter-Kit)** (ESK).

The idea is to create something that helps people to organise a conference with a small effort. In our case, the conference is a tech one, but of course, you can use ESK for all kind of conferences.

For this reason we are working on several repositories in the same time:

- **Launch page**;
- **Blog**;
- **Web site**;
- **Mobile app** (iOS, Android and Windows Phone);

of course we didn't complete everything yet except for the Launch Page and the blog. We planned to complete the project with the Conference, so spring 2015, but of course part of the project must be completed early (like the website).

For this reason we need help :heart_eyes: 

If you wanna collaborate, contact me or send a PR (see the complete documentation about the project [here](https://github.com/imperugo/Event-Starter-Kit)).

Website and APIs are written using [NodeJs](http://nodejs.org) + [Mongo](http://mongodb.org) and, for the mobile apps, we are using [Xamarin](https://xamarin.com).

Work on ESK is really funny because we are also integrating several external services with our application like:

* [Twitter](http://www.twitter.com) (for login/registration and sharing)
* [Facebook](http://www.facebook.com) (for login/registration and sharing)
* [Github](http://github.com) (for login because we are nerd);
* [Mailchimp](http://mailchimp.com/) (for newsletter);
* [Eventbrite](https://www.eventbrite.com/) (for event registration)
* [Disqus](http://disqus.com) (for comments)
* [Slideshare](http://www.slideshare.net/) (for presentation slides)
* [Vimeo](http://vimeo.com) (for video sessions)
* [Paypal](http://paypal.com) (for donations)

Why Node and Xamarin?

I would like to do this using ASP.NET vNext but it seems we have to wait a bit before we can use it on a production environment.
So Node is the perfect solution because we don't want to impose the choice of server so, if you wanna go on Linux you can, same for Windows (right now we are using [Microsoft Azure](https://azure.microsoft.com))

About Xamarin I think it's almost clear, same code with 3 different output (iOS, Android and Windows Phone).

We created a Github organization with all repositories (see it [here](https://github.com/Event-Starter-Kit)) and other info about the project are available [here](https://github.com/Event-Starter-Kit/docs).

We are looking for several roles, starting from Front-end developer (compass, bootstrap, angular and so on) till backend (nodejs, mongodb).

What are you waiting for? Join us [here](https://github.com/Event-Starter-Kit)







