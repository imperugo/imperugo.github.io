---
layout: post
status: publish
published: true
title: ConfORM, NHibernate, Oracle e gli Integration Test
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1449
wordpress_url: http://imperugo.tostring.it/blog/post/conform-nhibernate-oracle-e-gli-integration-test/
date: 2011-04-20 16:45:00.000000000 +01:00
categories:
- ORM
tags:
- Nhibernate
- Oracle
- ConfORM
comments: true
---
<p>In questi giorni sto lavorando parecchio ad un’applicazione che usa Oracle come repository e <a title="Posts su NHibernate" href="http://www.tostring.it/categories/archive/nhibernate/">NHibernate</a> come framework di persistenza. Essendo questa un’applicazione “delicata” ho necessità di creare una serie di integration test che mi “garantiscano” il corretto funzionamento, in modo da non avere spiacevoli sorprese in fase post deploy.</p>  <p>Letta così la questione non presenta particolari criticità, ma ho dovuto affrontare un nuovo scenario riguardante Oracle e la sua gestione degli indici.</p>  <p>Prima di entrare nel dettaglio tecnico vorrei puntualizzare che la soluzione da me adottata è la conseguenza di una totale inesperienza relativamente al mondo Oracle, potrebbe quindi esistere una strada migliore e più corretta per arrivare alla soluzione (magari se la conoscete, datemi qualche consiglio <img style="border-bottom-style: none; border-left-style: none; border-top-style: none; border-right-style: none" class="wlEmoticon wlEmoticon-openmouthedsmile" alt="Open-mouthed smile" src="http://www.tostring.it/UserFiles/imperugo/wlEmoticon-openmouthedsmile_2_1.png" />).</p>  <p>Fatta tale premessa provo a descrivere un po’ lo scenario. Nella mia installazione interna all’azienda ho un solo database engine di Oracle che contiene al suo interno l’applicazione di sviluppo, quella di test ed infine quella di quality assurance. Quindi, lato database, ho tre schema/utenti ben differenti denominati rispettivamente <strong>Dev</strong>, <strong>Test</strong> e <strong>QA</strong>, ed ognuno di questi ha le proprie tabelle con i propri dati, come mostrato dalla tabella seguente:</p>  <table border="0" cellspacing="0" cellpadding="2" width="400"><tbody>     <tr>       <td valign="top" width="133">         <p align="center"><strong>dev</strong></p>       </td>        <td valign="top" width="133">         <p align="center"><strong>test</strong></p>       </td>        <td valign="top" width="133">         <p align="center"><strong>QA</strong></p>       </td>     </tr>      <tr>       <td valign="top" width="133">         <p align="center"><em><font color="#666666" size="2">dev.users</font></em></p>       </td>        <td valign="top" width="133">         <p align="center"><em><font color="#666666" size="2">test.users</font></em></p>       </td>        <td valign="top" width="133">         <p align="center"><em><font color="#666666" size="2">qa.users</font></em></p>       </td>     </tr>      <tr>       <td valign="top" width="133">         <p align="center"><em><font color="#666666" size="2">dev.roles</font></em></p>       </td>        <td valign="top" width="133">         <p align="center"><em><font color="#666666" size="2">test.roles</font></em></p>       </td>        <td valign="top" width="133">         <p align="center"><em><font color="#666666" size="2">qa.roles</font></em></p>       </td>     </tr>      <tr>       <td valign="top" width="133">         <p align="center"><em><font color="#666666" size="2">dev.usersinroles</font></em></p>       </td>        <td valign="top" width="133">         <p align="center"><em><font color="#666666" size="2">test.usersinroles</font></em></p>       </td>        <td valign="top" width="133">         <p align="center"><em><font color="#666666" size="2">qa.usersinroles</font></em></p>       </td>     </tr>   </tbody></table>  <p>   <br />Essendo l’applicazione in uno stato di sviluppo più o meno avanzato, il database delle linea <i>dev</i> non subisce molti “restyling”, al contrario del database dei test che viene cancellato e ricreato ad ogni test.</p>  <p>Il mio problema è nato proprio durante la fase di “drop &amp; create” dello schema: questo viene creato correttamente, ma poi la procedura di NHibernate non completa correttamente il tutto perché, al contrario di quanto avviene per le tabelle, gli indici non sono legati ad uno specifico schema, sollevandomi una brutta eccezione del tipo “nome oggetto già utilizzato” (riferendosi all’indice che si stava cercando di creare).    <br />Se si riosserva la tabella riportata in precedenza si può facilmente intuire che l’univocità del nome della tabella è data dalla combinazione dello schema con il nome della tabella stessa. Purtroppo o per fortuna (direi più per fortuna) questa “combo” non esiste per gli indici, il che si traduce nel dover creare indici con nomi differenti per ogni “environment” in quanto trasversali all’interno del database engine.</p>  <p><strong>L’indice IX_ItemType non è dev.IX_ItemType!</strong>     <br />    <br />La mia configurazione di NHibernate creava automaticamente degli indici per alcuni scenari (nello specifico per il “Table Per Class Hierarchy”) in modo da aiutare il database nell’eseguire le query. Con il supporto del buon <a title="Fabio Maulo&#39;s blog" href="http://fabiomaulo.blogspot.com" rel="nofollow" target="_blank">Fabio</a> ho creato un Applier per <a title="ConfORM" href="http://tostring.it/tags/archive/conform" target="_blank">ConfORM</a> (in realtà ho fatto copia ed incolla di quello esistente) che mi permette di stabilire un prefisso per tutti gli indici, in modo da avere un risultato tipo il seguente: </p>  <ul>   <li>IX_MyIndex; </li>    <li>IX_Test_MyIndex; </li>    <li>IX_QA_MyIndex; </li> </ul>  <p>Una volta creato l’applier mi è bastato effettuare una merge dello stesso e, come per magia, tutti i test sono diventati verdi.    <br />Per chi fosse interessato posto il codice dell’applier di ConfORM</p>  {% highlight csharp %}
public class DiscriminatorIndexNameApplier : IPatternApplier<Type, IClassAttributesMapper> {
    private readonly IDomainInspector domainInspector;
    readonly string indexPrefix;

    public DiscriminatorIndexNameApplier ( IDomainInspector domainInspector, string indexPrefix ) {
        this.domainInspector = domainInspector;
        this.indexPrefix = indexPrefix;
    }

    #region IPatternApplier<Type,IClassAttributesMapper> Members

    public bool Match ( Type subject ) {
        return domainInspector.IsTablePerClassHierarchy ( subject );
    }

    public void Apply ( Type subject, IClassAttributesMapper applyTo ) {
        applyTo.Discriminator ( dm => dm.Column ( cm => cm.Index ( indexPrefix + subject.Name + "EntityType" ) ) );
    }

    #endregion
}
{% endhighlight %}
<p>&#160;</p>

<p>e per il suo utilizzo:</p>

{% highlight csharp %}
IPatternsAppliersHolder patternsAppliers = ( new ImperugoPatternsAppliersHolder ( orm , NHConfiguration.Instance.IndexPrefix ) )
    .Merge ( new ConfORM.DiscriminatorValueAsEnumValuePack <Person, PersonDiscriminatorMap> ( orm ) )
    .Merge ( new ConfORM.DiscriminatorValueAsEnumValuePack <View , ViewDiscriminatorMap> ( orm ))
    .Merge ( new ConfORM.DiscriminatorIndexNameApplier ( orm, NHConfiguration.Instance.IndexPrefix ) );
{% endhighlight %}
<br /><font face="Calibri">dove l’ultima riga cambia la naming convention degli indici leggendo il prefisso dal file di configurazione.</font> <font face="Calibri">Enjoy!</font>
