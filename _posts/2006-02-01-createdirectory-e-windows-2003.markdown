---
layout: post
status: publish
published: true
title: CreateDirectory e Windows 2003
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1665
wordpress_url: http://imperugo.tostring.it/blog/post/createdirectory-e-windows-2003/
date: 2006-02-01 01:00:00.000000000 +00:00
categories:
- .NET
tags:
- Windows Server 2003
- .NET
comments: true
---
<p><span>Ci sono delle cose che a volte proprio non capisco e che mi fanno imbufalire. Ho pubblicato un lavoro abbastanza semplice realizzato in .net 1.1 su un server web (tra quelli che vanno per la maggiore). Ma quando vado a provare l'applicazione mi trovo di fronte ad un bel errore nel create directory.<br />
Lo stack mi diceva che non avevo l'autorizzazione necessaria per la creazione della cartella; vado a controllare nel mio pannello di controllo ed era tutto ok; provo a resettare i permessi, ma niente. Preso dalla disperazione chiamo il provider chiedo un controllo, ma niente da fare l'errore persiste.<br />
Poi, cerca cerca su google trovo questo <a href="http://www.dotnet247.com/247reference/a.aspx?u=http://hatka.net/wlogdev/archive/2004/08/29/178.aspx">articolo</a> che mi risolve il problema, tranne per il fatto che se cerco di creare la cartella C:\Disney\Pluto e la cartella Disney non esiste lui va in errore.<br />
<br />
Il problema &egrave; facilmente risolvibile con questo codice: </span></p>
{% raw %}<pre title="code" class="brush: csharp; ruler: true;">
[DllImport(&quot;msvcrt.dll&quot;, SetLastError = true)] 
     
static extern int _mkdir(string path); 
  
static DirectoryInfo CreateDirectory(string path) 
     
{ 
    int returnCode = _mkdir(path); 
    
    if (returnCode == -1)       
    { 
        string[] percorsi = path.Split(new Char[] {'\\'} ); 
    
        if(percorsi.Length &gt; 1)         
        { 
            if(Directory.Exists(percorsi[0]))  
            { 
                string percorso = percorsi[0] + &quot;\\&quot;; 
 

                for (int i = 1; i &lt; percorsi.Length; i++) 
                { 
                    percorso += percorsi[i] + &quot;\\&quot;; 
               
                    if (!Directory.Exists(percorsi[i])) 
                         _mkdir(percorso); 
                } 
            } 
            else 
                throw new ApplicationException(&quot;Drive not found.&quot;); 
           
        } 
        else  
            throw new ApplicationException(&quot;String format error!&quot;); 
       
    } 
       
    else if (returnCode != 0) 
         
    throw new ApplicationException(&quot;Error calling [msvcrt.dll]:_wmkdir(&quot; + path + &quot;), error code: &quot; + returnCode.ToString()); 

    return new DirectoryInfo(path); 
     
} 
</pre>{% endraw %}
<p>La sintassi per la creazione della cartella rimane la stessa, ma viene intercettata la funzione CreateDirecotry e sostituita con la nostra.<br />
Un unica precisazione, all'interno del ciclo for utilizzo l'_mkdir per la creazione della cartella e non la mia funzione; faccio ci&ograve; per evitare la ricorsione.</p>
