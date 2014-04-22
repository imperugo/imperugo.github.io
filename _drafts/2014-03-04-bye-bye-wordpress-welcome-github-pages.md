---
layout: post
title: "Bye bye Wordpress, welcome Github pages"
description: "Moving your blog from Wordpress to Jekyll hosted by Github Pages"
date: 2014-03-04 01:00:00.000000000 +01:00
categories:
- Various
tags:
- github
- github pages
- jekyll
- octopress
---

In the latest year I used Wordpress for my blog, but really I never liked it. There are several reason, it was too slow, sometimes the update fails, plugin updates, server backup and so on.

I'm not saying that Wordpress is not good, I'm saying that it doesn't match my requirements.

In the past year I created a blog engine (never completed) based on .NET technologies, it's name is Dexter and i available on Github [here](https://github.com/imperugo/Dexter-Blog-Engine).
From my point of view it was better than Wordpress, but with many of the problems mentioned above.

Some weeks ago, David Ebbo synthesized in this [post](http://blog.davidebbo.com/2014/01/moving-to-github-pages.html)  my idea of blog engine (**for a nerd of course**)

So, everything is started from that post, so i migrated first my [italian blog](http://imperugo.tostring.it), than this blog.

Why Jekyll?

Because it's easy, super fast and you can write your posts using Markdown.

Basically it's built on ruby and it generates static files (simple .html files) with the correct folder structure for pagination, custom pages, permalinks and so on.

Of course you can'd do some stuff like comments and search, but I don't think that's a problem.

**There are several external services that offers for free search and comments ([Google](https://www.google.com/cse/) and [Disqus](http://disqus.com/) in my case).**

In a first step, i was using [Octopress](http://octopress.org/) that is built on top of jekyll but with more features.

Unfortunately it requires a web servers for this and a "complex" installation on your computer.

Github offers for all its users a free hosting for jekyll pages.

It means you can use some of the features that Octopress offers, but it's completely free and you don't have to pay the hosting, just the domain.

Github is my chose, because is free, fast, and I can use git commands to publish a post.

In my case for a new post I follow these steps:

- Create a new Markdown file into _posts folders;
- Write the post;
- Push on github repo

Is it easy?

Of course the post must contain some info like tags, categories, publish date and so on, but you can create easily a rake taks like I did [here](https://github.com/imperugo/imperugo.github.io/blob/master/Rakefile).

So, just run this command from prompt:

{% gist  11178701 rake.rb %}

