---
layout: post
status: publish
published: true
title: Il metodo GetHashCode
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1623
wordpress_url: http://imperugo.tostring.it/blog/post/il-metodo-gethashcode/
date: 2009-06-11 03:00:33.000000000 +01:00
categories:
- .NET
tags:
- Object Orientation
- .NET
- Framework
- HashCode
- CLR
comments: true
---
<p>Ancora oggi noto come il metodo <strong>GetHashCode</strong> risulti un mistero per molte persone (nascerebbe la domanda: <em>Ma se non lo conosci perch&egrave; lo implementi?</em>).    <br />
Proprio ieri mi &egrave; capitato di leggere un articolo in rete e trovare al suo interno un'implementazione del metodo <strong>GetHashCode</strong>, come il seguente:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
public class Book
{
    public Book()
    {
        BookID = -1;
        BookTitle = string.Empty;
    }


    public int BookID { get; set; }
    public string BookTitle { get; set; }


    public override string ToString()
    {
        return BookTitle ?? string.Empty;
    }


    public override bool Equals(object obj)
    {
        var book = obj as Book;
        if (book != null)
            return (BookID == book.BookID);
        return false;
    }


    public override int GetHashCode()
    {
        return string.Format(&quot;{0}{1}&quot;, BookID, BookTitle).GetHashCode();
    }
}</pre>{% endraw %}
<p>Come dice il buon <a target="_blank" rel="nofollow" href="http://www.wintellect.com/cs/blogs/jeffreyr/default.aspx">Jeffrey Richter</a> (padre del CRL) in &quot;<a target="_blank" rel="nofollow" href="http://www.amazon.co.uk/CLR-Via-Applied-Framework-Programming/dp/0735621632/ref=sr_1_1?ie=UTF8&amp;s=books&amp;qid=1244704411&amp;sr=8-1">CLR via C#</a>&quot;, l&rsquo;<strong>HashCode</strong> &egrave; rappresentativo dell'oggetto e deve essere consistente con la relazione di uguaglianza.</p>
<p>Andando a ridefinire quest&rsquo;ultima tramite il metodo <strong>Equals</strong> &egrave; necessario fare lo stesso anche per il metodo <strong>GetHashCode</strong>, e di fatto il compilatore solleva un <strong>Warning</strong> se ci&ograve; non avviene.    <br />
Questo serve a garantire che due oggetti definiti uguali abbiano lo stesso <strong>HashCode</strong>, altrimenti alcuni classi (come l'<strong>Hashtable, HashSet&lt;T&gt;, Dictionary&lt;T,K&gt;</strong>, ecc) potrebbero non funzionare.</p>
<p>L'implementazione del metodo <strong>GetHashCode</strong> deve rispettera tre criteri:</p>
<p>- Se due oggetti dello stesso tipo rappresentano lo stesso valore, la funzione hash deve restituire lo stesso valore di costante per entrambi gli oggetti.</p>
<p>- Per ottenere le migliori prestazioni, una funzione hash deve generare una distribuzione casuale per tutti gli input.</p>
<p>- La funzione hash deve restituire esattamente lo stesso valore indipendentemente da qualsiasi modifica apportata all'oggetto.</p>
<p>Partendo da quest'ultimo punto, si pu&ograve; capire che l'implementazione andrebbe fatta in un <strong>ValueType</strong> o, al massimo, in una classe in cui i <strong>field utilizzati per il calcolo dell'Hash siano readonly e quindi immutabili</strong>.</p>
<p>Lo snippet seguente mostra come due classi aventi valori differenti risultino uguali al metodo <strong>Equals</strong> ma differenti al metodo <strong>GetHashCode</strong>, a causa dell'errata implementazione mostrata sopra:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
var b1 = new Book();
b1.BookID = 10;
b1.BookTitle = &quot;Titolo1&quot;;


var b2 = new Book();
b2.BookID = 10;
b2.BookTitle = &quot;Titolo2&quot;;


int hc1 = b1.GetHashCode();
int hc2 = b2.GetHashCode();


Console.WriteLine(hc1 == hc2); //ritorna false
Console.WriteLine(b1.Equals(b2)); //ritorna true</pre>{% endraw %}
<p>Anche se molti esempi in rete riportano l'utilizzo dell'operatore XOR (eXclusive OR) per il calcolo dell'<strong>HashCode</strong> della classe, io consiglio sempre l'implementazione mostrata da <a target="_blank" rel="nofollow" href="http://www.codemetropolis.com/">Marco</a> <a target="_blank" rel="nofollow" href="http://www.aspitalia.com/script/890/Limportanza-Definire-Metodo-GetHashCode.aspx">qui</a>, in quanto se si hanno due fields dello stesso tipo e si inverte il loro valore, l'<strong>HashCode</strong> restituito &egrave; sempre lo stesso, mentre non dovrebbe esserlo.    <br />
Ovviamente si potrebbe aggiungere che nel .NET Framework moltissime classi (Hashtable, Dictionary, ecc) fanno uso massiccio di questo metodo e ne consegue che invocare uno <strong>string.format</strong> ad ogni richiesta non &egrave; ottimale per l'applicaizone.</p>
<p>Per concludere, fate attenzione e soprattutto interrogatevi sulla reale necessit&agrave; di reimplementare Equals e GetHashCode.</p>
<p><br />
Ciauz</p>
