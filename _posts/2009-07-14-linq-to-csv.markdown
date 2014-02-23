---
layout: post
status: publish
published: true
title: Linq To Csv
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1603
wordpress_url: http://imperugo.tostring.it/blog/post/linq-to-csv/
date: 2009-07-14 04:23:42.000000000 +01:00
categories:
- Various
tags:
- Linq
- LinqToCsv
- Framework
- Esportazione
- Csv
comments: true
---
<p>Non so da quanto tempo esista, ma &egrave; ormai almeno un mese che lo sto utilizzando in un progetto e devo dire che &egrave; veramente comodo e ben fatto.    <br />
L&rsquo;idea di potersi avvalere di Linq per effettuare query e manipolazioni di dati su diversi repository, che siano questi database, CSV o oggetti in memoria, &egrave; a dir poco fantastica.</p>
<p>L&rsquo;utilizzo &egrave; semplicissimo, basta decorare con gli appositi attributi la classe, specificare come si vuole utilizzare il CSV, se in scrittura o in lettura, e, in quest&rsquo;ultimo caso, &egrave; possibile eseguire la query Linq.</p>
<p>Lo Snippet seguente mostra un&rsquo;implementazione in lettura.</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
CsvFileDescription inputFileDescription = new CsvFileDescription
{
    SeparatorChar = ';',
    FirstLineHasColumnNames = true,
    FileCultureName = &quot;it-It&quot;
};

CsvContext cc = new CsvContext();

IEnumerable&lt;PersonCSV&gt; CsvPeople = cc.Read&lt;PersonCSV&gt;(@&quot;C:\Temp\mytestFile.csv&quot;, inputFileDescription);

foreach (PersonCSV p in CsvPeople)
{
    //TO DO SOMETHING
}

public class PersonCSV
{
    [CsvColumn(Name = &quot;Nome&quot;, FieldIndex = 1, CanBeNull = false)]
    public string FirstName { get; set; }

    [CsvColumn(Name = &quot;Cognome&quot;, FieldIndex = 2, CanBeNull = false)]
    public string LastName { get; set; }

    [CsvColumn(Name = &quot;NickName&quot;, FieldIndex = 3, CanBeNull=true)]
    public string Nickname { get; set; }
}</pre>{% endraw %}
<p>Ulteriori informazioni le trovate <a target="_blank" rel="nofollow" href="http://www.codeproject.com/KB/linq/LINQtoCSV.aspx" title="Linq To Csv">qui</a>.</p>
