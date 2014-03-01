---
layout: post
title: Automatic Data Validation
categories:
- .NET
tags:
- aop
- castle
- data annotation
- dependecyinjection
- dotnet
- nuget
status: publish
type: post
published: true
comments: true
---
What I really appreciate in <a title="Articles about ASP.NET MVC" href="http://tostring.it/category/webdev/aspnetmvc/" target="_blank">ASP.NET MVC</a> and <a title="Articles about Web API" href="http://tostring.it/category/webdev/webapi-webdev/" target="_blank">WebAPI</a> are the binders and its validation. It’s really cool to have a class with all parameter and, for those who have the data annotations, the automatic validation.

In this article, I’m going to “speak” about the validation, probably one of the most boring stuff a developer needs do during the programming.

That’s what I mean with “boring stuff”

{% gist 7786470 gistfile1.cs %}

As you can see in the method above there are four parameters and <strong>I need to validate three of them before starting to do anything</strong> (in the example website is validated only if it has a value).
Probably you, and also me, wrote this code thousand and thousand times …. ok It’s time to remove that.

My idea is to use the <strong>Data Annotation Attributes</strong> for the parameters and, using the <strong><a title="AOP Wiki Definition" href="http://en.wikipedia.org/wiki/Aspect-oriented_programming" target="_blank">AOP</a> (Aspect Oriented Programming)</strong> and <a title="Interceptor Pattern Wiki Definition" href="http://en.wikipedia.org/wiki/Interceptor_pattern" target="_blank"><strong>Interceptor Pattern</strong></a>, <strong>run automatically the validation for all ours layer</strong>.

Probably all of you use a <strong>Dependency Injection Framework</strong> (if you don’t use it, you have to) like <a title="Castle Windsor Official Site" href="http://www.castleproject.org/" target="_blank">Castle Windsor</a>, <a title="Ninject Official Site" href="http://www.ninject.org/" target="_blank">Ninject</a>, <a title="Unity Official Site" href="https://unity.codeplex.com/" target="_blank">Unity</a> and so on.
All of these offers the opportunity to inject some code before calling a method for a registered service (Interceptor Pattern).
In my example I’m using Castle (I love it), but the code it’s easy to move to another framework.

Stop speaking and let’s start coding.

The first thing to do is to understand how to run manually the validation: <strong><a title="K. Scott Allen Official Blog" href="http://odetocode.com/blogs/all" target="_blank">K. Scott Allen</a></strong> wrote a good article here, so I’m starting from <a href="http://odetocode.com/blogs/scott/archive/2011/06/29/manual-validation-with-data-annotations.aspx" target="_blank">this</a>.

Now <strong>we have to create a container class for all the parameters and to add the Data Annotations</strong>. That’s important because we can’t use the Data Annotations directly on the parameter.
If you did everything correct, your class now should looks like this:

{% gist 7786470 gistfile2.cs %}

Because a method could have more than one parameter, and we don’t really need to validate all of these, it could be important to tell to the validation service (our interceptor) what needs to be validated and what doesn’t.
For this reason I’ve created a custom attribute, <strong>ValidateAttribute</strong>:

{% gist 7786470 gistfile3.cs %}

No comments for this code, <strong>it is used only like a marker</strong>.

Now change the signature of your method using the attribute and the input class like this:

{% gist 7786470 gistfile4.cs %}

Good, everything is ready except for the interceptor, it’s time to create it:

{% gist 7786470 gistfile5.cs %}

The interceptor logic is really simple. <strong>It iterates all parameters and, only for these who have my custom attribute, it calls the Validate method</strong>.

To use an interceptor is important to register it and add to your service:

{% gist 7786470 gistfile6.cs %}

That’s all, run the this code to have the validation:

{% gist 7786470 gistfile7.cs %}

<strong>From now, every time you call the method CreateUser (resolved by Castle), the validation will be automatically raised and, for the parameter with a wrong value, an ImperugoValidationExcpetion will throw, you can catch them and choose how to show the message.</strong>

It’s not finished yet :). If you prefer, I’ve created a NuGet Package that helps to reduce the code. There are two packages:
<ol>
	<li><strong><a href="https://nuget.org/packages/Imperugo.Validation.Common/" target="_blank"><span style="line-height: 13px;">Imperugo.Validation</span></a></strong></li>
	<li><strong><a href="https://nuget.org/packages/Imperugo.Valdation.Castle/" target="_blank">Imperugo.Validation.Castle</a></strong></li>
</ol>
The first one contains only the necessary stuff to create the right interceptor; the second one is the Castle implementation (soon I’ll release also a package for <strong>Ninject</strong>, <strong>Unity</strong> and so on).

The first thing to do is to install the package (Castle in this case):

<a href="http://tostring.it/wp-content/uploads/2013/06/Capture.jpg"><img class="aligncenter size-full wp-image-798" alt="Capture" src="http://tostring.it/wp-content/uploads/2013/06/Capture.jpg" width="747" height="87" /></a>

Now change the Castle code like this:

{% gist 7786470 gistfile8.cs %}

If you use a different Framework and you like this validation, fork the repo <a title="Imperugo Validation repository" href="https://github.com/imperugo/Imperugo.Validation" target="_blank">here</a>, add the new Framework, and create a “<strong>pull request</strong>”.

All my code is available <a href="https://github.com/imperugo/Imperugo.Validation/tree/master/src/Imperugo.Validation.Castle.Sample" target="_blank">here</a>.

I’m working on the next release that is really faster because include a cache strategy, <strong>so stay tuned</strong>.
