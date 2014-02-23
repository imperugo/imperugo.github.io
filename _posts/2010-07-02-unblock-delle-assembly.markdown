---
layout: post
status: publish
published: true
title: Unblock delle assembly
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1483
wordpress_url: http://imperugo.tostring.it/blog/post/unblock-delle-assembly/
date: 2010-07-02 16:45:00.000000000 +01:00
categories:
- .NET
tags:
- ASP.NET
- Exception
comments: true
---
<p>Oggi mi è capitato un errore alquanto curioso che, se non si sta molto attenti, può portare via parecchio tempo; ma partiamo con ordine.</p>  <p>Il buon <a title="Mauro Servienti&#39;s Blog" href="http://topics.it/" rel="nofollow" target="_blank">Mauro</a> mi ha passato un set di librerie da utilizzare in un applicativo interno che avevo necessità di aggiornare, ed il trasferimento (per puri motivi di pigrizia) è avvenuto via messenger.&#160; Ovviamente, senza pensarci su troppo, ho copiato le nuove librerie all’interno della bin in modo da aggiornare l’applicazione all’ultima versione ma, dopo il primo avvio, ricevevo la seguente eccezione:</p>  <blockquote>   <p>Security Exception</p>    <p>Description: The application attempted to perform an operation not allowed by the security policy.&#160; To grant this application the required permission please contact your system administrator or change the application's trust level in the configuration file. </p>    <p>Exception Details: System.Security.SecurityException: Request for the permission of type 'System.Web.AspNetHostingPermission, System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089' failed.</p>    <p>Source Error: </p>    <p>An unhandled exception was generated during the execution of the current web request. Information regarding the origin and location of the exception can be identified using the exception stack trace below.</p>    <p>Stack Trace: </p>    <p>     <br />[SecurityException: Request for the permission of type 'System.Web.AspNetHostingPermission, System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089' failed.]      <br />&#160;&#160; System.Reflection.Assembly._GetType(String name, Boolean throwOnError, Boolean ignoreCase) +0      <br />&#160;&#160; System.Reflection.Assembly.GetType(String name, Boolean throwOnError, Boolean ignoreCase) +42      <br />&#160;&#160; System.Web.UI.Util.GetTypeFromAssemblies(ICollection assemblies, String typeName, Boolean ignoreCase) +145      <br />&#160;&#160; System.Web.UI.TemplateParser.GetType(String typeName, Boolean ignoreCase, Boolean throwOnError) +73      <br />&#160;&#160; System.Web.UI.TemplateParser.ProcessInheritsAttribute(String baseTypeName, String codeFileBaseTypeName, String src, Assembly assembly) +111      <br />&#160;&#160; System.Web.UI.TemplateParser.PostProcessMainDirectiveAttributes(IDictionary parseData) +279</p> </blockquote>  <p>Il messaggio era alquanto preoccupante e, dopo vari check della configurazione (full trust mode, etc), ho trovato la soluzione nell’unblock del file; di fatto, essendo questi arrivati da una fonte non sicura, Windows ha giustamente pensato di impedirne l’utilizzo salvo previa autorizzazione dell’utente stesso, che può essere effettuata tramite la finestra delle proprietà, come da screenshot seguente:</p>  <p><a href="http://tostring.it/UserFiles/imperugo/SNAGHTML55018f8.png" rel="shadowbox"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="SNAGHTML55018f8" border="0" alt="SNAGHTML55018f8" src="http://tostring.it/UserFiles/imperugo/SNAGHTML55018f8_thumb.png" width="283" height="384" /></a></p>
