---
layout: post
status: publish
published: true
title: Gestire più files di configurazione con Visual Studio 2010 e XDT (Xml Data
  Trasformation)
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1542
wordpress_url: http://imperugo.tostring.it/blog/post/gestire-pi-and-ugrave-files-di-configurazione-con-visual-studio-2010-e-xdt-xml-data-trasformation/
date: 2009-11-04 18:30:00.000000000 +00:00
categories:
- .NET
tags:
- Visual Studio 2010
- Beta
- ASP.NET 4.0
comments: true
---
<p>
	Appena si crea una nuova Web Application con <a href="http://imperugo.tostring.it/blog/search?q=Visual+Studio&amp;searchButton=Go" target="_blank" title="Search Visual Studio">Visual Studio</a> 2010 la prima cosa che salta all&rsquo;occhio &egrave; l&rsquo;icona a forma di triangolo posta accanto al <strong><em>web.config</em></strong>, che fa intuire la presenza di alcune voci legate allo stesso; di fatto l&rsquo;immagine seguente mostra altri due files di configurazione oltre a quello principale:</p>
<p>
	<a href="http://imperugo.tostring.it/Content/Uploaded/image/001.jpg" rel="shadowbox"><img alt="001" border="0" height="244" src="http://imperugo.tostring.it/Content/Uploaded/image/001_thumb.jpg" style="border-bottom: 0px; border-left: 0px; margin: 0px 10px 0px 0px; display: inline; border-top: 0px; border-right: 0px" title="001" width="200" /></a></p>
<p>
	Per noi sviluppatori i files di configurazione rappresentano sempre una parte un po&rsquo; ostica, in quanto portano via tempo nella preparazione tra i diversi ambienti con cui siamo &ldquo;costretti&rdquo; a lavorare quotidianamente. Normalmente un&rsquo;applicazione web vive su tre ambienti ben distinti, dove ognuno di questi avr&agrave; differenti stringhe di connessione e diversi parametri:</p>
<ul>
	<li>
		Ambiente di <strong>sviluppo</strong>;</li>
	<li>
		Ambiente di <strong>test</strong>;</li>
	<li>
		Ambiente di <strong>produzione</strong>;</li>
</ul>
<p>
	Ovviamente questo numero pu&ograve; variare da applicazione ad applicazione, ma resta il fatto che ad ogni deploy &egrave; necessario cambiare la configurazione; oltre ci&ograve;, se i files di configurazione in questione sono particolarmente corposi e complessi si aggiunge anche un costo di gestione non indifferente, aumentando inoltre il rischio di errori. <br />
	Per capire meglio uno scenario come quello descritto precedentemente, si provi ad immaginare un file di configurazione di un&rsquo;applicazione web che ha centinaia di parametri, custom section, endpoint, stringhe di connessione, ecc: &egrave; pazzesco modificare manualmente ogni file di configurazione.</p>
<p>
	Fortunatamente con questa nuova release ci viene offerta la possibilit&agrave; di rendere indolore la gestione di pi&ugrave; ambienti grazie all&rsquo;<strong>XDT</strong> (<strong>Xml Data Trasformation</strong>)&nbsp; ma, per capire bene come sfruttarla, &egrave; necessario capire a cosa servono i differenti files e dove andare ad inserire le nostre informazioni.</p>
<p>
	Il file <strong><em>web.config</em></strong>, quello classico per intenderci, conterr&agrave; tutte le informazioni necessarie alla costruzione della configurazione finale, sia che queste informazioni siano uguali per tutti gli ambienti sia che debbano variare.</p>
<p>
	Sotto il web.config sono presenti due files, <strong><em>Web.Debug.config</em></strong> e <strong><em>Web.Release.config</em></strong>, che hanno il compito di contenere le informazioni che cambiano da ambiente ad ambiente; normalmente i due files creati dovrebbero corrispondere all&rsquo;ambiente di sviluppo e all&rsquo;ambiente di produzione, rispettivamente <strong>Debug</strong> e <strong>Release</strong>, ma &egrave; possibile specificare altri ambienti in base alle proprie esigenze tramite apposite voci, come mostrato dalla sequenza sottostante:</p>
<p>
	<a href="http://imperugo.tostring.it/Content/Uploaded/image/002_2.jpg" rel="shadowbox[ConfigurationManager]"><img alt="002" border="0" height="154" src="http://imperugo.tostring.it/Content/Uploaded/image/002_thumb.jpg" style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="002" width="244" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/003_2.jpg" rel="shadowbox[ConfigurationManager]"><img alt="003" border="0" height="154" src="http://imperugo.tostring.it/Content/Uploaded/image/003_thumb.jpg" style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="003" width="244" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/004_2.jpg" rel="shadowbox[ConfigurationManager]"><img alt="004" border="0" height="154" src="http://imperugo.tostring.it/Content/Uploaded/image/004_thumb.jpg" style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="004" width="244" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/005_2.jpg" rel="shadowbox[ConfigurationManager]"><img alt="005" border="0" height="154" src="http://imperugo.tostring.it/Content/Uploaded/image/005_thumb.jpg" style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="005" width="244" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/006_2.jpg" rel="shadowbox[ConfigurationManager]"><img alt="006" border="0" height="154" src="http://imperugo.tostring.it/Content/Uploaded/image/006_thumb.jpg" style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="006" width="244" /></a></p>
<p>
	Nell&rsquo;esempio seguente verr&agrave; mostrato un file di configurazione la cui stringa di connessione &egrave; differente tra i tre ambienti, <strong>Debug</strong>, <strong>Release</strong> e <strong>Test</strong>.</p>
<p>
	Come prima cosa &egrave; necessario aggiungere al file web.config l&rsquo;apposita voce nella sezione connectionStrings, come mostrato di seguito:</p>
{% raw %}<pre class="brush: xml; ruler: true;"><connectionstrings>
  <add connectionstring="Data Source=devserver;Initial Catalog=dexter;User Id=sa;Password=Password1;" name="dbConn" providername="System.Data.SqlClient">
</add></connectionstrings></pre>{% endraw %}
<p>
	La stringa presente in questo file coincide con quella dell&rsquo;ambiente di debug e verr&agrave; sostituita da <strong>Visual Studio</strong> in fase di deploy ma, per far ci&ograve;, &egrave; necessario andare ad inserire il valore corretto nei restanti files di configurazione, come mostrato di seguito:</p>
{% raw %}<pre class="brush: xml; ruler: true;"><!-- Dev (Web.Debug.Config) -->    
<connectionstrings>
  <add connectionstring="Data Source=devserver;Initial Catalog=devDB;User Id=sa;Password=Password1;" name="dbConn" xdt:locator="Match(name)" xdt:transform="SetAttributes">
</add></connectionstrings>

<!-- Production (Web.Release.Config) -->    
<connectionstrings>
    <add connectionstring="Data Source=productionServer;Initial Catalog=productionDB;User Id=sa;Password=Password1;" name="dbConn" xdt:locator="Match(name)" xdt:transform="SetAttributes">
</add></connectionstrings>


<!-- Test (Web.Testing.Config) -->    
<connectionstrings>
    <add connectionstring="Data Source=testServer;Initial Catalog=testDB;User Id=sa;Password=Password1;" name="dbConn" xdt:locator="Match(name)" xdt:transform="SetAttributes">
</add></connectionstrings></pre>{% endraw %}
<p>
	Il codice &egrave; piuttosto semplice, sono presenti due nuovi attributi <strong><em>xdt:Transform</em></strong> e <strong><em>xdt:Locator</em></strong>, dove <strong>xdt</strong> significa <strong>Xml Data Trasformation</strong>;&nbsp; il primo attributo indica cosa deve essere sostituito (in questo esempio tutti gli attributi), mentre il secondo indica la regola di Matching (in questo esempio il replace viene effettuato nel caso in cui l&rsquo;attributo &ldquo;name&rdquo; coincida tra i files di configurazione).</p>
<p>
	Ovviamente il numero di operazioni e condizioni disponibili va ben oltre il <strong>SetAttributes</strong> ed il <strong>Match</strong>; si ha infatti a disposizione un ricco set di operatori e trasformazioni che permettono di effettuare operazioni piuttosto complesse. Di seguito l&rsquo;elenco degli operatori ed operazioni utilizzabili:</p>
<p>
	Operatori:</p>
<ul>
	<li>
		<strong>Match</strong> &ndash; indica che la trasformazione avviene soltanto quando l&rsquo;attributo inserito all&rsquo;interno dell&rsquo;operatore coincide, come mostrato nel nostro esempio;</li>
	<li>
		<strong>Condition</strong> &ndash; molto simile alla condizione if, viene utilizzato per specificare i casi in cui la trasformazione deve avvenire (es: <em><strong>xdt:Locator=&quot;Condition(@name=&rsquo;Northwind or @providerName=&#39; System.Data.SqlClient&#39;)&quot;</strong></em> );</li>
	<li>
		<strong>XPath</strong> &ndash; la sezione da trasformare viene identificata tramite una query XPath(es: <em><strong>xdt:Transform=&quot;Replace&quot; xdt:Locator=&quot;XPath(//system.web)&quot;</strong></em>);</li>
</ul>
<p>
	Trasformazioni diponibili:</p>
<blockquote>
	<table border="0" cellpadding="0" cellspacing="0" width="100%">
		<tbody>
			<tr>
				<td valign="top" width="20%">
					<strong>Replace</strong></td>
				<td valign="top" width="40%">
					Effettua il replace dell&rsquo;intero nodo</td>
				<td valign="top" width="40%">
					<p>
						&lt;assemblies xdt:transform=&quot;Replace&quot;&gt;<br />
						&lt;add assembly=&quot;System.Core, Version=3.5.0.0, Culture=neutral, PublicKeyToken=B77A5C561934E089&quot;&gt; &lt;/add&gt;<br />
						&lt;/assemblies&gt;</p>
				</td>
			</tr>
			<tr>
				<td valign="top" width="20%">
					<strong>Remove</strong></td>
				<td valign="top" width="40%">
					Rimuove il nodo dal file di configurazione corrente</td>
				<td valign="top" width="40%">
					<p>
						&lt;assemblies xdt:transform=&quot;Remove&quot;&gt;&lt;/assemblies&gt;</p>
				</td>
			</tr>
			<tr>
				<td valign="top" width="20%">
					<strong>RemoveAll</strong></td>
				<td valign="top" width="40%">
					Rimuove tutti i nodi all&rsquo;interno della sezione</td>
				<td valign="top" width="40%">
					<p>
						&lt;connectionstrings&gt;<br />
						&lt;add xdt:transform=&quot;RemoveAll&quot;&gt; &lt;/add&gt;<br />
						&lt;/connectionstrings&gt;</p>
				</td>
			</tr>
			<tr>
				<td valign="top" width="20%">
					<strong>Insert</strong></td>
				<td valign="top" width="40%">
					Aggiunge un nuovo elemento alla sezione</td>
				<td valign="top" width="40%">
					<p>
						&lt;authorization&gt;<br />
						&lt;deny users=&quot;*&quot; xdt:transform=&quot;Insert&quot;&gt;&lt;/deny&gt;<br />
						&lt;/authorization&gt;</p>
				</td>
			</tr>
			<tr>
				<td valign="top" width="20%">
					<strong>SetAttributes</strong></td>
				<td valign="top" width="40%">
					Reimposta gli attributi specificati tra parentesi, separati dalla virgola; in caso di omissione degli attributi vengono sostituiti tutti.</td>
				<td valign="top" width="40%">
					<p>
						&lt;compilation batch=&quot;false&quot; &nbsp;xdt:Transform=&quot;SetAttributes(batch)&quot;&gt; &lt;/compilation&gt;</p>
				</td>
			</tr>
			<tr>
				<td valign="top" width="20%">
					<strong>RemoveAttributes</strong></td>
				<td valign="top" width="40%">
					Rimuove gli attributi specificati tra parentesi, separati dalla virgola; in caso di omissione degli attributi vengono rimossi tutti.</td>
				<td valign="top" width="40%">
					<p>
						&lt;compilation xdt:transform=&quot;RemoveAttributes(debug,batch)&quot;&gt; &lt;/compilation&gt;</p>
				</td>
			</tr>
			<tr>
				<td valign="top" width="20%">
					<strong>InsertAfter</strong></td>
				<td valign="top" width="40%">
					Inserisce l&rsquo;elemento dopo di un altro elemento tramite l&rsquo;utilizzo di XPath;</td>
				<td valign="top" width="40%">
					<p>
						<authorization><deny users="AName" xdt:transform="InsertAfter(/configuration/system.web/authorization/ allow[@roles='Admins']"> </deny></authorization></p>
				</td>
			</tr>
			<tr>
				<td valign="top" width="20%">
					<strong>InsertBefore</strong></td>
				<td valign="top" width="40%">
					Inserisce l&rsquo;elemento prima di un altro elemento tramite l&rsquo;utilizzo di XPath;</td>
				<td valign="top" width="40%">
					<p>
						&lt;authorization&gt;<br />
						&lt;allow roles=&quot; Admins&quot; xdt:transform=&quot;InsertBefore(/configuration/system.web/authorization/ deny[@users=&#39;*&#39;])&quot;&gt;&lt;/allow&gt;<br />
						&lt;/authorization&gt;</p>
				</td>
			</tr>
			<tr>
				<td valign="top" width="20%">
					<strong>XSLT</strong></td>
				<td valign="top" width="40%">
					Effettua la trasformazione tramite un file XSLT</td>
				<td valign="top" width="40%">
					<p>
						&lt;appsettings xdt:transform=&quot;XSLT(V:\MyProject\appSettings.xslt)&quot;&gt;&lt;/appsettings&gt;</p>
				</td>
			</tr>
		</tbody>
	</table>
</blockquote>
<p>
	Per poter provare la trasformazione &egrave; necessario effettuare un deploy dell&rsquo;applicazione cambiando l&rsquo;ambiente di destinazione, come mostrato dalla sequenza seguente:</p>
<p>
	<a href="http://imperugo.tostring.it/Content/Uploaded/image/007_2.jpg" rel="shadowbox[DeployWebSite]"><img alt="007" border="0" height="154" src="http://imperugo.tostring.it/Content/Uploaded/image/007_thumb.jpg" style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="007" width="244" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/008_2.jpg" rel="shadowbox[DeployWebSite]"><img alt="008" border="0" height="154" src="http://imperugo.tostring.it/Content/Uploaded/image/008_thumb.jpg" style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="008" width="244" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/009_2.jpg" rel="shadowbox[DeployWebSite]"><img alt="009" border="0" height="154" src="http://imperugo.tostring.it/Content/Uploaded/image/009_thumb.jpg" style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="009" width="244" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/010_2.jpg" rel="shadowbox[DeployWebSite]"><img alt="010" border="0" height="154" src="http://imperugo.tostring.it/Content/Uploaded/image/010_thumb.jpg" style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="010" width="244" /></a> <a href="http://imperugo.tostring.it/Content/Uploaded/image/011_2.jpg" rel="shadowbox[DeployWebSite]"><img alt="011" border="0" height="154" src="http://imperugo.tostring.it/Content/Uploaded/image/011_thumb.jpg" style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="011" width="244" /></a></p>
<p>
	Devo ammettere che l&rsquo;idea &egrave; fantastica e ben implementata, l&rsquo;unico neo che ho trovato &egrave; che, in fase di debug tramite <strong>Visual Studio</strong>, cambiando l&rsquo;ambiente di stage tramite l&#39;apposito menu a tendina,&nbsp; non viene effettuata la trasformazione mandando in play l&rsquo;applicazione, e questo riduce il raggio di utilizzo della trasformazione alla singola fase di deploy.</p>
<p>
	Enjoy VS2010!</p>
