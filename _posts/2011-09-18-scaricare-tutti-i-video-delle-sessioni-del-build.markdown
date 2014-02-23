---
layout: post
status: publish
published: true
title: Scaricare tutti i video delle sessioni del Build
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1434
wordpress_url: http://imperugo.tostring.it/blog/post/scaricare-tutti-i-video-delle-sessioni-del-build/
date: 2011-09-18 20:37:51.000000000 +01:00
categories:
- Eventi
tags:
- Session
- Eventi
- Build
- Download
comments: true
---
<p>Per chi come me è in overflow da news tecnologiche, e non vuole perdersi neanche un minuto del Build, ecco gli step da seguire per scaricarsi tutte le sessioni:</p>  <ul>   <li>Creare una folder dove verranno scaricati i video (nell’esempio è chiamata build11); </li>    <li>Creare un file .ps1 (downloadall.ps1 nell’esempio) ed editarlo con il notepad incollando il seguente codice: </li> </ul>  <blockquote>   <p>cd &quot;C:\build11&quot;      <br />[Environment]::CurrentDirectory=(Get-Location -PSProvider FileSystem).ProviderPath       <br />$a = ([xml](new-object net.webclient).downloadstring(&quot;<a href="http://channel9.msdn.com/Events/BUILD/BUILD2011/RSS/wmvhigh">http://channel9.msdn.com/Events/BUILD/BUILD2011/RSS/wmvhigh</a><a href="http://feeds.feedburner.com/HanselminutesCompleteMP3%22))">&quot;))</a>       <br />$a.rss.channel.item | foreach{&#160; <br />&#160;&#160;&#160; $url = New-Object System.Uri($_.enclosure.url)       <br />&#160;&#160;&#160; $file = $url.Segments[-1]       <br />&#160;&#160;&#160; $file       <br />&#160;&#160;&#160; if (!(test-path $file))       <br />&#160;&#160;&#160; {       <br />&#160;&#160;&#160;&#160;&#160;&#160;&#160; (New-Object System.Net.WebClient).DownloadFile($url, $file)       <br />&#160;&#160;&#160; }       <br />}</p> </blockquote>  <ul>   <li>avviare Powershell e digitare <strong><em>Set-ExecutionPolicy unrestricted</em></strong> (necessario all’esecuzione dello script);</li>    <li>avviare lo script da powershell c:\build11\downloadall.ps1</li> </ul>  <p>&#160;</p>  <p>Il tutto è basato su questo <a href="http://geekswithblogs.net/mbcrump/archive/2011/09/15/download-all-the-build-videos-with-rss.aspx" rel="nofollow" target="_blank">post</a> che si appoggia a sua volta in un <a title="Download Podcasts with Powershell" href="http://www.hanselman.com/blog/DownloadPodcastsWithPowershell.aspx" rel="nofollow" target="_blank">post</a> di <a title="The Zen of Computers and Life in General" href="http://www.hanselman.com" rel="nofollow" target="_blank">Scott Hanselman</a>.</p>  <p>Buon download.</p>
