---
layout: post
status: publish
published: true
title: Comprimere una cartella e tutte le sue sottodirectory
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1657
wordpress_url: http://imperugo.tostring.it/blog/post/comprimere-una-cartella-e-tutte-le-sue-sottodirectory/
date: 2006-11-09 01:00:00.000000000 +00:00
categories:
- .NET
tags:
- .NET
comments: true
---
<p><span>Volevo farne uno script ma mi sembrava troppo lungo, ma troppo corto per un articolo, insomma non sapevo dove metterlo e alla fine ho deciso di piazzarlo qui, in caso il <a onclick="blankUrl(this.href); return false;" href="http://blogs.aspitalia.com/daniele/">boss</a> mi dir&agrave;. </span></p>
<p>Cmq sono un'insieme di metodi che comprimono una cartella e tutto il suo contenuto in un unico file zip mantenendo la struttura.</p>
{% raw %}<pre title="code" class="brush: csharp; ruler: true;">
public static void ZipFolder(string path, string path2Save, string name, bool recursive) 
{ 
Crc32 crc = new Crc32(); if (String.IsNullOrEmpty(name)) 
name = new DirectoryInfo(path).Name; if (!name.EndsWith(&quot;.zip&quot;)) 
name += &quot;.zip&quot; if (!Directory.Exists(path2Save)) 
Directory.CreateDirectory(path2Save); try 
{ 
using (ZipOutputStream s = new ZipOutputStream(File.Create(path2Save + name))) 
{ 
s.SetLevel(6); 
string basepath = path.Replace(new DirectoryInfo(path).Name, String.Empty); if (basepath.EndsWith(&quot;\\\\&quot;)) 
basepath = basepath.Replace(&quot;\\\\&quot;, &quot;\\&quot;); 
AddToZip(path, s, crc, basepath, recursive); s.Finish(); 
s.Close(); 
} 
} 
catch (Exception e) 
{ 
File.Delete(path2Save + name); 
throw e; 
} 
} 
 private static void AddToZip(string path, ZipOutputStream s, Crc32 crc, string basepath, bool recursive) 
{ 
foreach (string srcFileName in Directory.GetFiles(path)) 
{ 
string filepath = path + @&quot;\&quot; + new DirectoryInfo(srcFileName).Name; 
AddFile(s, filepath, crc, basepath); 
} foreach (string strSrcSubDirectory in Directory.GetDirectories(path)) 
AddFolder(s, strSrcSubDirectory, crc, basepath); if (recursive) 
foreach (string strSrcSubDirectory in Directory.GetDirectories(path)) 
{ 
path += @&quot;\&quot; + new DirectoryInfo(strSrcSubDirectory).Name; 
AddToZip(strSrcSubDirectory, s, crc, basepath, recursive); 
} 
} private static void AddFile(ZipOutputStream s, string file, Crc32 crc, string basepath) 
{ 
using (FileStream fs = File.OpenRead(file)) 
{ 
byte[] buffer = new byte[fs.Length]; 
fs.Read(buffer, 0, buffer.Length); ZipEntry entry; if (string.IsNullOrEmpty(basepath)) 
entry = new ZipEntry(file.Replace(basepath, String.Empty).ToLower()); 
else 
entry = new ZipEntry(file); entry.DateTime = DateTime.Now; 
entry.Size = fs.Length; crc.Reset(); 
crc.Update(buffer); entry.Crc = crc.Value; 
s.PutNextEntry(entry); 
s.Write(buffer, 0, buffer.Length); 
} 
} private static void AddFolder(ZipOutputStream s, string file, Crc32 crc, string basepath) 
{ 
ZipEntry entry; if (string.IsNullOrEmpty(basepath)) 
entry = new ZipEntry(file.Replace(basepath, String.Empty).ToLower()); 
else 
entry = new ZipEntry(file); entry.DateTime = DateTime.Now; crc.Reset(); entry.Crc = crc.Value; 
s.PutNextEntry(entry); 
}
</pre>{% endraw %}
<p><span>Va sistemata un po, per gestire bene le eccezzioni e perch&egrave; l'ho solo provata al volo ma sicuramente il codice pu&ograve; essere ottimiccato, per&ograve; in linea di massima funziona</span></p>
<p>&nbsp;</p>
