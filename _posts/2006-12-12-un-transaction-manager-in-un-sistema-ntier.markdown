---
layout: post
status: publish
published: true
title: Un Transaction Manager in un sistema nTier
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1656
wordpress_url: http://imperugo.tostring.it/blog/post/un-transaction-manager-in-un-sistema-ntier/
date: 2006-12-12 01:00:00.000000000 +00:00
categories:
- .NET
tags:
- .NET
- Architettura
comments: true
---
<p><span>Ormai &egrave; un po' di tempo che sto realizzando una piccola applicazione con architettura a tre livelli, e mi si &egrave; posto subito un problema, ossia gestire una transazione tra pi&ugrave; entity. </span></p>
<p>Per capirci, io ho la mia entity Fattura che al suo interno ha una collection di righeFattura, la entity Cliente e la entity Fornitore (direi che per l'esempio bastano).<br />
Quando devo persistere la mia entity (con le rispettive sottoentity) devo avere la certezza che tutto sia andato a buon fine e nel caso si verifichi un errore si deve ripristinare la situazione originale e avvertire l'utente che qualcosa &egrave; andatao storto.</p>
<p>Per risolvere la il problema ho deciso di implementare questa soluzione:</p>
<ol>
    <li>Ogni classe di persistenza del DAL deve esporre un'interfaccia <strong>ITransactionable</strong>;</li>
    <li>Il DAL deve esporre una classe che implementa un'interfaccia <strong>ITransactionManager</strong>;</li>
</ol>
<p>&nbsp;</p>
<p>I seguenti diagrammi mostrano le interfacce nel dettaglio:</p>
<p><img width="211" height="113" alt="" src="/content/Uploaded/image/itransactionable_thumb1.jpg" />&nbsp;<br />
<br />
<img width="187" height="332" alt="" src="/content/Uploaded/image/itransactionmanager_thumb.jpg" /><span class="Apple-style-span" style="color: rgb(0, 0, 238); text-decoration: underline;"><br />
</span></p>
<p>&nbsp;</p>
<p>Ora all'interno delle nostre classi di persistenza dove esponiamo <strong>ITransactionable</strong> prima della chiamata di update, delete, ecc dobbiamo verificare se l'oggetto transazionale &egrave; instanziato oppure no, lo possiamo fare con una semplice if.</p>
{% raw %}<pre title="code" class="brush: csharp">
public bool Update(Fattura item)
{
int rowsAffected;

if (Transaction == null)
{
rowsAffected = SqlHelper.ExecuteNonQuery(
ProviderHelper.ConnectionString,
CommandType.StoredProcedure,
&quot;sp_Fattura_Update&quot;, CreateParameter(true, item));
}
else
{
rowsAffected = SqlHelper.ExecuteNonQuery(
Transaction,
CommandType.StoredProcedure,
&quot;sp_Fattura_Update&quot;, CreateParameter(true, item));

}

if (rowsAffected &lt;= 0)
throw new Domain.Exception.ConcurrencyException(Resource.Res.GetString(&quot;ConcurrencyException&quot;));
else
return true;
} </pre>{% endraw %}
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><strong>Transaction</strong> non &egrave; l'implementazione del'interfaccia <strong>ITransactionable</strong> ma un suo cast a <strong>SqlTransaction</strong>.</p>
<p>Il nostro Transaction Manager presente nel DAL sar&agrave; pittusto semplice quindi una roba tipo questa:&nbsp;</p>
{% raw %}<pre title="code" class="brush: csharp">
private SqlConnection conn;
private SqlTransaction transaction;
private List coll;


public TransactionManager()
{
coll = new List();
}

 

public void Add(ITransactionable transactionObject)
{
coll.Add(transactionObject);
}


public void Remove(ITransactionable transactionObject)
{

transactionObject.ExternalTransaction = null;
coll.Remove(transactionObject);
}


public void StartTransaction()
{
conn = new SqlConnection(ProviderHelper.ConnectionString);
conn.Open();
transaction = conn.BeginTransaction();

for (int i = 0; i &lt; coll.Count; i++)
coll[i].ExternalTransaction = transaction;


}


public void Commit()
{
transaction.Commit();
}


public void Rollback()
{
transaction.Rollback();
}

public void Dispose()
{
if(conn.State == ConnectionState.Open)
conn.Close();
for (int i = 0; i &lt; coll.Count; i++)
{
coll[i].ExternalTransaction = null;
coll.RemoveAt(i);
}
transaction.Dispose();
} </pre>{% endraw %}
<p>&nbsp;</p>
<p><span>Dal Business Layer vado ad utilizzare il Transaction Manager in questo modo:&nbsp;</span></p>
{% raw %}<pre title="code" class="brush: csharp">
using (ITransactionManager manager = AbstractFactory.ProviderFactory.TransactionManager)
{

IFatturaDataProvider aProvider = AbstractFactory.ProviderFactory.FatturaProvider;
IFornitoreDataProvider fProvider = AbstractFactory.ProviderFactory.FornitoreProvider;
IClienteDataProvider cProvider = AbstractFactory.ProviderFactory.ClienteProvider;

 

manager.Add(provider);
manager.Add(fProvider);
manager.Add(cProvider);

manager.StartTransaction();

try
{
provider.Update(item);
cProvider.Update(item.Cliente);
fProvider.Update(item.Fornitore);

manager.Commit();
}
catch
{
manager.Rollback();
throw;
}

}</pre>{% endraw %}
<p>&nbsp;</p>
<p><span>Secondo voi l'implementazione &egrave; quella corretta?</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
