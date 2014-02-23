---
layout: post
status: publish
published: true
title: Recuperare il content type
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1458
wordpress_url: http://imperugo.tostring.it/blog/post/recuperare-il-content-type/
date: 2011-02-07 17:30:00.000000000 +00:00
categories:
- ASP.NET
tags:
- Extension Methods
- HttpHandler
comments: true
---
<p>Stufo dei soliti switch per recuperare il content type di un file, mi sono deciso a dare una sbirciata in rete per verificare se esistesse un qualcosa che mi potesse restituire il content type dato un file name.    <br />Ovviamente, come quasi sempre in questi casi, qualcun’altro si è posto la mia stessa domanda ed ha trovato una soluzione a tale problema <img style="border-bottom-style: none; border-left-style: none; border-top-style: none; border-right-style: none" class="wlEmoticon wlEmoticon-smile" alt="Smile" src="http://www.tostring.it/UserFiles/imperugo/wlEmoticon-smile_2_2.png" />.</p>  <p>Di fatto, nel <a title=".NET Framework psots" href="http://www.tostring.it/tags/archive/.net" target="_blank">.NET Framework</a> è possibile utilizzare la classe Registry per andare a recuperare la nostra informazione, come mostrato dall’extension method seguente:</p>  {% highlight csharp %}
/// <summary>
///     Retrieve the mimetype for the specified filename.
/// </summary>
/// <param name = "fileName">Name of the file.</param>
/// <returns></returns>
public static string GetMimeType (this string fileName ) {
    string mime = "application/octetstream";
    string ext = Path.GetExtension ( fileName ).ToLower ( );
    RegistryKey rk = Registry.ClassesRoot.OpenSubKey ( ext );
    if ( rk != null && rk.GetValue ( "Content Type" ) != null ) {
        mime = rk.GetValue ( "Content Type" ).ToString ( );
    }
    return mime;
}
{% endhighlight %}
<p>Ciauz</p>

<p>FONTE : <a href="http://petrocel.wordpress.com/2008/01/09/how-to-get-the-content-typemimetype-of-a-file-c/">http://petrocel.wordpress.com/2008/01/09/how-to-get-the-content-typemimetype-of-a-file-c/</a></p>
