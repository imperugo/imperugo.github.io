---
layout: post
status: publish
published: true
title: VS2010 Beta 2 e WCF RIA Services - problemi di compilazione
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1532
wordpress_url: http://imperugo.tostring.it/blog/post/vs2010-beta-2-e-wcf-ria-services---problemi-di-compilazione/
date: 2009-12-10 03:22:13.000000000 +00:00
categories:
- .NET
tags:
- Windows Communication Foundation
- Visual Studio 2010
comments: true
---
<p>
	Dato che uno &egrave; in Beta (<a href="http://imperugo.tostring.it/blog/search?q=Visual+Studio&amp;searchButton=Go" target="_blank" title="Search Visual Studio">Visual Studio</a> 2010), l&rsquo;altro in preview (WCF <a href="http://it.wikipedia.org/wiki/Rich_Internet_application" rel="nofollow" target="_blank" title="Rich Internet Application">RIA</a> Services) non ho motivi per lamentarmi, ma se vi capita questo immenso stack di errore mentre cercate di compilare ...</p>
{% raw %}<pre class="brush: csharp; ruler: true;">Error    1    The &quot;CreateRiaClientFilesTask&quot; task failed unexpectedly.
System.Reflection.TargetInvocationException: Exception has been thrown by the target of an invocation. ---&gt; System.Resources.MissingManifestResourceException: Could not find any resources appropriate for the specified culture or the neutral culture.  Make sure &quot;Web.Resources.RegistrationDataResources.resources&quot; was correctly embedded or linked into assembly &quot;imperugo.CommunityTour.Catania.Silverlight.Web&quot; at compile time, or that all the satellite assemblies required are loadable and fully signed.
   at System.Resources.ManifestBasedResourceGroveler.HandleResourceStreamMissing(String fileName)
   at System.Resources.ManifestBasedResourceGroveler.GrovelForResourceSet(CultureInfo culture, Dictionary`2 localResourceSets, Boolean tryParents, Boolean createIfNotExists, StackCrawlMark&amp; stackMark)
   at System.Resources.ResourceManager.InternalGetResourceSet(CultureInfo requestedCulture, Boolean createIfNotExists, Boolean tryParents, StackCrawlMark&amp; stackMark)
   at System.Resources.ResourceManager.InternalGetResourceSet(CultureInfo culture, Boolean createIfNotExists, Boolean tryParents)
   at System.Resources.ResourceManager.GetString(String name, CultureInfo culture)
   at imperugo.CommunityTour.Catania.Silverlight.Web.Resources.RegistrationDataResources.get_SecurityAnswerLabel() in D:\Session\Community Tour Catania\imperugo.CommunityTour.Catania.Silverlight\imperugo.CommunityTour.Catania.Silverlight.Web\Resources\RegistrationDataResources.Designer.cs:line 128
   --- End of inner exception stack trace ---
   at System.RuntimeMethodHandle._InvokeMethodFast(IRuntimeMethodInfo method, Object target, Object[] arguments, SignatureStruct&amp; sig, MethodAttributes methodAttributes, RuntimeType typeOwner)
   at System.RuntimeMethodHandle.InvokeMethodFast(IRuntimeMethodInfo method, Object target, Object[] arguments, Signature sig, MethodAttributes methodAttributes, RuntimeType typeOwner)
   at System.Reflection.RuntimeMethodInfo.Invoke(Object obj, BindingFlags invokeAttr, Binder binder, Object[] parameters, CultureInfo culture, Boolean skipVisibilityChecks)
   at System.Reflection.RuntimeMethodInfo.Invoke(Object obj, BindingFlags invokeAttr, Binder binder, Object[] parameters, CultureInfo culture)
   at System.Reflection.RuntimePropertyInfo.GetValue(Object obj, BindingFlags invokeAttr, Binder binder, Object[] index, CultureInfo culture)
   at System.Reflection.RuntimePropertyInfo.GetValue(Object obj, Object[] index)
   at System.ComponentModel.DataAnnotations.LocalizableString.&lt;&gt;c__DisplayClass5.<getlocalizablevalue>b__2()
   at System.ComponentModel.DataAnnotations.LocalizableString.GetLocalizableValue()
   at Microsoft.RiaServices.Tools.DisplayCustomAttributeBuilder.GetAttributeDeclaration(Attribute attribute)
   at Microsoft.RiaServices.Tools.CustomAttributeGenerator.GenerateCustomAttributes(ClientProxyGenerator proxyGenerator, CodeTypeDeclaration referencingType, IEnumerable`1 attributes, CodeCommentStatementCollection comments, String customCommentHeader, Boolean forcePropagation)
   at Microsoft.RiaServices.Tools.CustomAttributeGenerator.GenerateCustomAttributes(ClientProxyGenerator proxyGenerator, CodeTypeDeclaration referencingType, IEnumerable`1 attributes, CodeAttributeDeclarationCollection outputCollection, CodeCommentStatementCollection comments, String customCommentHeader, Boolean forcePropagation)
   at Microsoft.RiaServices.Tools.EntityProxyGenerator.GenEntityProperty(CodeTypeDeclaration proxyClass, PropertyDescriptor propertyDescriptor, String propertyName)
   at Microsoft.RiaServices.Tools.EntityProxyGenerator.Generate()
   at Microsoft.RiaServices.Tools.ClientProxyGenerator.GenerateProxyClass(String&amp; generatedCode)
   at Microsoft.RiaServices.Tools.CreateRiaClientFilesTask.GenerateClientProxies()
   at Microsoft.RiaServices.Tools.CreateRiaClientFilesTask.ExecuteInternal()
   at Microsoft.RiaServices.Tools.RiaClientFilesTask.Execute()
   at Microsoft.Build.Framework.ITask.Execute()
   at Microsoft.Build.BackEnd.TaskExecutionHost.Microsoft.Build.BackEnd.ITaskExecutionHost.Execute()
   at Microsoft.Build.BackEnd.TaskBuilder.ExecuteInstantiatedTask(ITaskExecutionHost taskExecutionHost, TaskLoggingContext taskLoggingContext, TaskHost taskHost, ItemBucket bucket, TaskExecutionMode howToExecuteTask, Boolean&amp; taskResult)    imperugo.CommunityTour.Catania.Silverlight</getlocalizablevalue></pre>{% endraw %}
<p>
	...chiudete Visual Studio e riapritelo :).</p>
<p>
	Ciauz</p>
