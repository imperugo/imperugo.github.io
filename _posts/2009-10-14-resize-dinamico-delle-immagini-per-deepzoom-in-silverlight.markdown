---
layout: post
status: publish
published: true
title: Resize dinamico delle immagini per DeepZoom in Silverlight
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1553
wordpress_url: http://imperugo.tostring.it/blog/post/resize-dinamico-delle-immagini-per-deepzoom-in-silverlight/
date: 2009-10-14 17:30:00.000000000 +01:00
categories:
- SILVERLIGHT
tags:
- Silverlight
- DeepZoom
comments: true
---
<p>
	Da alcuni giorni ho cominciato a lavorare ad una applicazione sviluppata in <a href="http://silverlight.net/" rel="nofollow" target="_blank">Silverlight</a> che fa uso di DeepZoom. Nello specifico viene data la possibilit&agrave; agli utenti di caricare foto in alta risoluzione che automaticamente finiscono nel wall. <br />
	Oltre alla parte pi&ugrave; ovvia e scontata dell&rsquo;upload della foto da parte dell&rsquo;utente, ci&ograve; che risulta sicuramente interessante &egrave; la parte di resize dinamico delle immagini per DeepZoom, che pu&ograve; sembrare piuttosto complessa. <br />
	In un primo step avevo approcciato ad un sistema come quello spiegato <a href="http://www.silverlightshow.net/items/Deep-zooming-on-the-fly.aspx" rel="nofollow" target="_blank" title="Deep zooming on the fly">qui</a>, ma senza l&rsquo;utilizzo dell&rsquo;HttpHandler. Successivamente, grazie al preparatissimo <a href="http://blogs.aspitalia.com/novecento/" rel="nofollow friend met co-worker colleague" target="_new">Alessio</a>, ho cambiato metodo andando ad utilizzare l&rsquo;apposita libreria messa a disposizione da <strong><em>DeepZoom Composer,</em></strong> che possiamo trovare in &ldquo;<em>C:\Program Files\Microsoft Expression\Deep Zoom Composer</em>&rdquo; con il nome di <strong><em>DeepZoomTools.dll. <br />
	<br />
	</em></strong>Questa libreria (totalmente managed) mette gi&agrave; a disposizione tutti i metodi necessari ad effettuare il resize e la creazione del file contenente la collection di foto rendendo semplice la parte di resize. Di fatto, una volta referenziata la libreria nel nostro progetto web, &egrave; semplicissimo effettuare il resize, come mostrato dagli snippet seguenti:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">public void Image(string sourceFile, string targetFolder)
    {
        ImageCreator ic = new ImageCreator
                            {
                                TileSize = 256,
                                TileFormat = ImageFormat.Jpg,
                                ImageQuality = 0.95,
                                TileOverlap = 0
                            };

        string target = string.Concat(targetFolder, &quot;\\output_images\\&quot;, Path.GetFileNameWithoutExtension(sourceFile));

        ic.Create(sourceFile, target);
    }

    public void Batch(string sourcePath, string targetFolder, bool generateCollectionFile)
    {
        List<string> images = GetImagesInDirectory(sourcePath);
        List<string> data = new List<string>();

        foreach (string image in images)
        {
            Image(image, targetFolder);

            string target = string.Concat(targetFolder, &quot;\\output_images\\&quot;, Path.GetFileNameWithoutExtension(image));
            data.Add(Path.ChangeExtension(target, &quot;.xml&quot;));
        }

        if (generateCollectionFile)
        {
            CollectionCreator cc = new CollectionCreator
                                    {
                                        TileSize = 256,
                                        TileFormat = ImageFormat.Jpg,
                                        MaxLevel = 8,
                                        ImageQuality = 0.95
                                    };

            cc.Create(data, string.Concat(targetFolder, &quot;\\output&quot;));
        }
    }

    private static List<string> GetImagesInDirectory(string path)
    {
        return GetImagesInDirectory(new DirectoryInfo(path));
    }

    private static List<string> GetImagesInDirectory(DirectoryInfo di)
    {
        List<string> images = new List<string>();

        // get all the images in this directory first
        foreach (FileInfo fi in di.GetFiles(&quot;*.jpg&quot;))
            images.Add(fi.FullName);

        // get all the directories with their images
        foreach (DirectoryInfo sub in di.GetDirectories())
            images.AddRange(GetImagesInDirectory(sub));

        return images;
    }</pre>{% endraw %}
<p>
	Un grazie ad <a href="http://blogs.aspitalia.com/novecento/" rel="nofollow friend met co-worker colleague" target="_new">Alessio</a> per l&rsquo;ottima info.</p>
