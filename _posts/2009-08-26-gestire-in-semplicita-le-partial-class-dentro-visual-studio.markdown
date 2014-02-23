---
layout: post
status: publish
published: true
title: Gestire in semplicità le partial class dentro Visual Studio.
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1574
wordpress_url: http://imperugo.tostring.it/blog/post/gestire-in-semplicita-le-partial-class-dentro-visual-studio/
date: 2009-08-26 13:26:50.000000000 +01:00
categories:
- .NET
tags:
- Visual Studio
- Addon
comments: true
---
<p>Personalmente trovo comodissime le <a title="Partial Class Definitions (C# Programming Guide)" href="http://msdn.microsoft.com/en-us/library/wa80x488%28VS.80%29.aspx" rel="nofollow" target="_blank">partial class</a>, sia perch&egrave; facilitano il lavoro in team, sia perch&egrave; mermettono di suddividere la stessa classe in pi&ugrave; file, fornendo cos&igrave; una maggiore leggibilit&agrave; e pulizia del codice.     <br />
Per definire una classe come &ldquo;parziale&rdquo;, basta aggiungere la keyword <em>partial</em> prima della parola chiave <em>class</em> (vale anche per gli <em>struct</em> ovviamente) come mostrato di seguito.</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
public partial class MyClass</pre>{% endraw %}
<p>I suoi vantaggi ovviamente non si fermano qui. Visual studio offre la possibilit&agrave; di raggruppare le partial class in una struttura ad albero un po&rsquo; come avviene per i codefile delle pagine web, come mostrato dallo screenshot seguente:</p>
<p>&nbsp;</p>
<p><a href="http://imperugo.tostring.it/Content/Uploaded/image/25-Aug-09%201-12-28_2.png" rel="shadowbox[Gestire-in-semplicita-le-partial-class-dentro-Visual-Studio];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase width="248" height="157" border="0" singlelineignorecase="" style="border: 0px none ; display: inline;" title="25-Aug-09 1-12-28" alt="25-Aug-09 1-12-28" src="http://imperugo.tostring.it/Content/Uploaded/image/25-Aug-09%201-12-28_thumb.png" /></a></p>
<p><a title="VsCommand" href="http://www.mokosh.co.uk/page/VsCommands.aspx" rel="nofollow" target="_blank">Qui</a>, &egrave; possibile trovare un ottimo addon (VsCommands) per Visual Studio che ci permette di annidare le partial classe semplicemente selezionandole e cliccando con tasto destro del mouse come mostrato di seguito.</p>
<p><a href="http://imperugo.tostring.it/Content/Uploaded/image/image2_2.jpg" rel="shadowbox[Gestire-in-semplicita-le-partial-class-dentro-Visual-Studio];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase width="183" height="244" border="0" singlelineignorecase="" style="border: 0px none ; display: inline;" title="image2" alt="image2" src="http://imperugo.tostring.it/Content/Uploaded/image/image2_thumb.jpg" /></a></p>
<p>Ciauz</p>
