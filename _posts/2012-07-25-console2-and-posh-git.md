---
layout: post
title: Console2 and Posh-Git
categories:
- Various
tags:
- console2
- git
- gitposh
- poweshell
status: publish
type: post
published: true
comments: true
---
When I used for the first time <a title="GitHub web site" href="http://github.com">GitHub</a> for Windows I was really in love with it but, if you need to use git deeply, you have to continue to use the command version.

Moreover the GitHub client shown me for the first time an interesting feature in the Powershell called Posh-Git.

What Posh-Git gives you is really simple:

“The prompt within Git repositories can show the current branch and the state of files (additions, modifications, deletions) within”

And below a screenshot

<a href="http://tostring.it/wp-content/uploads/2012/07/1.png"><img class="size-medium wp-image-672 alignnone" title="1" src="http://tostring.it/wp-content/uploads/2012/07/1-300x124.png" alt="" width="300" height="124" /></a>

GitHub for Windows deploys Git-Posh for you but it doesn’t install it. The same happens for Git (it uses a portable version of git).

My problem is borne when I saw the speech by <a href="http://damianedwards.wordpress.com/">Damian Edwards</a> about SignalR. In that speech he uses a cool Powershell console that supports Tabs, Trasparency and other cool stuff, so I told to myself : “I need it … I want it”.

After a tweet Damian told me that the tool is Console2 and, <a href="http://www.hanselman.com/">Scott Hanselman</a>, wrote a cool post <a href="http://www.hanselman.com/blog/Console2ABetterWindowsCommandPrompt.aspx">here</a>. The problem to use an external tool instead of Powershell by GitHub for Windows was Git-Posh. In fact with Console2 it is missing.
If you like it there are few simple steps to enable it in Console2:
<ul>
	<li><strong>Clone the repository “git clone <a href="https://github.com/dahlbyk/posh-git.git">https://github.com/dahlbyk/posh-git.git</a>”</strong>;</li>
	<li><strong>Run Powershell as Administrator</strong>;</li>
	<li><strong>Run “Set-ExecutionPolicy unrestricted”</strong>;</li>
	<li><strong>Go to Posh-Git cloned repository</strong>;</li>
	<li><strong>Run “.install.ps1”</strong>;</li>
</ul>
That’s all and the result is this :

<a href="http://tostring.it/wp-content/uploads/2012/07/2.png"><img class="size-medium wp-image-673 alignnone" title="2" src="http://tostring.it/wp-content/uploads/2012/07/2-300x211.png" alt="" width="300" height="211" /></a>

Now it is perfect!
