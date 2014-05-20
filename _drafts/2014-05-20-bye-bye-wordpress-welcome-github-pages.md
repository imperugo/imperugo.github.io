---
layout: post
title: "Bye bye Wordpress, welcome Github pages"
description: "Moving your blog from Wordpress to Jekyll hosted by Github Pages"
date: 2014-05-20
categories:
- Various
tags:
- github
- github pages
- jekyll
- octopress
- wordpress
- dexter
---

In the latest year I used Wordpress for my blog, but really I never liked it. There are several reason that I try to explain here:

- Maintenance;
- Hosting;
- Updates;
- Backup;
- Test environment;
- Performance;

I'm not saying that Wordpress is not good, I'm saying that it doesn't match my requirements.
From my point of view (now) a blog engine is something where I can write in an easy way.

Moreover, in the past years I created a blog engine (never completed) based on .NET technologies, its name is **Dexter** and it's available on Github [here](https://github.com/imperugo/Dexter-Blog-Engine).
IMHO it was better than Wordpress, but with many of the problems mentioned above (my mistake).

Some weeks ago, [David Ebbo](https://twitter.com/davidebbo) synthesised in this [post](http://blog.davidebbo.com/2014/01/moving-to-github-pages.html)  my idea of blog engine (**for a nerd of course**)

So, everything has started from that post and I migrated first my [italian blog](http://imperugo.tostring.it), than this blog.

**Why [Jekyll](http://jekyllrb.com/)?**

It offers important advantages; the most important is that it doesn't require server side code :thumbsup:

Finally it's easy to use for a developer. The setup guide is available [here](http://jekyllrb.com/docs/installation/) (if you are running Windows I suggest to follow [this](http://yizeng.me/2013/05/10/setup-jekyll-on-windows/) guide.)

Basically it's built on ruby and it generates static files (simple .html files) with the correct folder structure for pagination, custom pages, permalinks and so on.

![image]({{ site.url }}/assets/2014/05/Jekyll-folder-structure.png)

Of course you can't do some stuff like comments and search, but this is not a problem because **there are several external services that offer for free search and comments ([Facebook](https://developers.facebook.com/docs/plugins/comments), [Google](https://www.google.com/cse/) and [Disqus](http://disqus.com/) in my case).**

Moreover there is another cool advantage to moving your blog to Jekyll, and it's [Github Pages](https://pages.github.com/).

Github offers for all its users the opportunity to have a free hosting for static files creating a repository named yourgithubusername.github.io.

Once you have created the repository it's just necessary to push your static files into it and navitate to http://yourgithubusername.github.io

That's all!

Here the problem could be that Jekyll generates static files only after a compilation, so you should compile and then push.
Fortunately there is a solution also for this, Github Pages offers the Jekyll compilation and you don't have to do that ([here](https://help.github.com/articles/using-jekyll-with-pages) a complete guide).

So, now you have **free hosting**, amazing **performance** (your HTML is hosted on Github CDN), everything is managed by a **Git repository** (so you have the history of all posts ([here](https://github.com/imperugo/imperugo.github.io/commits/master/_posts/2014-03-04-how-to-use-CORS-with-ASPNET-WebAPI-2.md) an example)) and you can use your **[custom domain](https://help.github.com/categories/20/articles)**.

To be synthetic:

- Create a new Markdown file into _posts folders;
- Write the post;
- Push on github repo

Do you wanna know how fast & reliable is Github with Jekyll?
Take a look to this report (remember that my skin is not optimized, lot of requests):

![image]({{ site.url }}/assets/2014/05/Pingdom-Report.png)

If I convinced you to use Github, below some advice:

- To migrate your posts use [this](http://import.jekyllrb.com/docs/home/) (it supports several sources like wordpress, xml, rss and so on);
- If you add the license on github, you can also create/modify/delete posts directly for Github website, so you don't have to setup your environment. Read [this](https://github.com/blog/1327-creating-files-on-github) post;
- Enable some cool Gems like I did [here](https://github.com/imperugo/imperugo.github.io/blob/master/_config.yml#L48-L52);
- To render the **emoji** (the point above is mandatory) remember the [right syntax](http://www.emoji-cheat-sheet.com/);
- Be careful with the redirect if you change the url permalink (take a look [here](https://help.github.com/articles/redirects-on-github-pages)).
- If [Atom](http://www.atom.io) is your favorite Markdown editor, install [this](https://github.com/arcath/jekyll-atom) package;
- If you wanna create your custom skin, I suggest to start with **Jekyll Bootstrap** available [here](http://jekyllbootstrap.com/).

> If you want something with more features, but you like the speed and the idea of static files, take a look to [Octopress](http://octopress.org/).

Enjoy it!
