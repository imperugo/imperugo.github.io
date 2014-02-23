---
layout: post
status: publish
published: true
title: DTO, IL e Reflection nelle nostre applicazioni.
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1639
wordpress_url: http://imperugo.tostring.it/blog/post/dto-il-e-reflection-nelle-nostre-applicazioni/
date: 2009-04-21 15:09:54.000000000 +01:00
categories:
- ASP.NET
tags:
- Windows Communication Foundation
- Nhibernate
- ORM
- Linq
- IL
- Reflection
- .NET
- Architettura
- Framework
- DTO
comments: true
---
<p>
	&nbsp;</p>
<p>
	Pur essendo io un fan dei <strong>DTO (Data Transfer Object)</strong> anche in ambienti non service oriented, trovo alquanto noiosa la parte di idratazione dalla entity di DTO mediante &ldquo;copia&rdquo; dei dati dalla entity di dominio utilizzata per la persistenza.</p>
<p>
	Se ci si trova a lavorare con i servizi, le motivazioni per cui una entity di dominio non dovrebbe <strong>MAI</strong> essere restituita dal servizio possono essere molteplici, alcune delle quali elencate qui di seguito:</p>
<ul>
	<li>
		La entity di dominio potrebbe <strong>non essere serializzabile</strong>;</li>
	<li>
		La entity di dominio potrebbe <strong>avere relazioni</strong> unidirezionali e bidirezionali verso altre entit&agrave;;</li>
	<li>
		La entity di dominio potrebbe <strong>contenere informazioni necessarie alla sua persistenza o informazioni che nascono e muoiono all&rsquo;interno del servizio</strong>;</li>
	<li>
		<strong>Restituire informazioni non necessarie all&rsquo;esterno di un servizio va ad influire sulle performance dello stesso</strong>, in quanto le informazioni che deve restituire e serializzare sono maggiori di quelle realmente necessarie causando cos&igrave; rallentamenti nella fase di serializzazione/deserializzazione e trasporto dei dati;</li>
	<li>
		<strong>Un servizio deve vivere di vita propria</strong>: non deve quindi necessitare di nessun altro servizio per poter svolgere il suo lavoro e non deve divulgare verso l&rsquo;esterno informazioni come eccezioni e dominio;</li>
</ul>
<p>
	Ora, se si prova ad analizzare il grafo di dominio riportato qui di seguito e si immagina un metodo che restituisca un&rsquo;istanza di <em>User</em>, ci si render&agrave; subito conto che si entra in conflitto con tutti i punti elencati poc&rsquo;anzi.</p>
<p>
	<a href="http://imperugo.tostring.it/Content/Uploaded/image/Dominio_4.png" rel="shadowbox[DTO-IL-e-Reflection-nelle-nostre-applicazioni];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img alt="Dominio" border="0" height="277" singleline="" src="http://imperugo.tostring.it/Content/Uploaded/image/Dominio_thumb_1.png" style="border-bottom: 0px; border-left: 0px; border-top: 0px; border-right: 0px; xxxxxxxxxxxxxxxx: " title="Dominio" width="594" /></a></p>
<p>
	&nbsp;</p>
<p>
	In un&rsquo;applicazione perfetta il servizio dovrebbe restituire un&rsquo;istanza di un oggetto differente da quella di dominio, <strong>contenente solo le informazioni necessarie all&rsquo;esterno</strong>, come il suo <em>ID</em>, <em>Nome</em>, <em>Cognome</em> ed <em>Username</em>, come per la entity seguente:</p>
<p>
	<a href="http://imperugo.tostring.it/Content/Uploaded/image/dto_2.png" rel="shadowbox[DTO-IL-e-Reflection-nelle-nostre-applicazioni];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img alt="dto" border="0" height="182" singleline="" src="http://imperugo.tostring.it/Content/Uploaded/image/dto_thumb.png" style="border-bottom: 0px; border-left: 0px; border-top: 0px; border-right: 0px; xxxxxxxxxxxxxxxx: " title="dto" width="182" /></a></p>
<p>
	Andando a guardare il lato implementativo si dovrebbe avere un metodo che, in base ai parametri forniti dal client, recupera un&rsquo;istanza della entity di dominio <em>User</em>, dalla quale verranno poi prese le informazioni necessarie per idratare la entity di dominio <em>UserDTO</em>, che verr&agrave; restituita dal servizio in quanto rispetta tutti i punti sopra elencati (&egrave; snella, &egrave; serializzabile, non contiene informazioni futili esternamente al servizio, ecc).</p>
<p>
	Sicuramente una soluzione ottimale sarebbe quella di prelevare dal repository (un database per esempio) solo le informazioni necessarie ad idratare la entity di DTO, ma questo spesso pu&ograve; risultare un lavoro dispendioso, in quanto si rischia di avere poco riutilizzo di codice; oppure ci si pu&ograve; trovare nella condizione in cui si dispone di un&rsquo;intera entity in cache e l&rsquo;andare a recuperare l&rsquo;intera entity dalla memoria pu&ograve; risultare meno dispendioso del recupero delle singole informazioni dal repository.<br />
	Con l&rsquo;avvento degli O/RM l&rsquo;utilizzo dei DTO si &egrave; semplificato di parecchio, come mostrato negli snippet seguenti:</p>
<p>
	<strong>Nhibernate:</strong></p>
{% raw %}<pre class="brush: csharp; ruler: true;" title="code">using(Isession session = SessionHelper.GetSession())
{
    ICriteria myCriteria = session.CreateCriteria(typeof (User));
    myCriteria.Restrictions.Add(&quot;Name&quot;, name);

    myCriteria.SetProjection(
          Projections.ProjectionList()
            .Add(Projections.Property(&quot;Firstname&quot;), &quot;Firstname&quot;)
            .Add(Projections.Property(&quot;ID&quot;), &quot;ID&quot;)
            .Add(Projections.Property(&quot;Lastname&quot;), &quot;Lastname&quot;)
                .Add(Projections.Property(&quot;Username&quot;), &quot;Username&quot;));    
    
    myCriteria.SetResultTransformer(NHibernate.Transform.Transformers.AliasToBean(typeof(UserDTO))); 
    return myCriteria.List<userdto>();
}</userdto></pre>{% endraw %}
<p>
	<strong>Linq:</strong></p>
{% raw %}<pre class="brush: csharp; ruler: true;" title="code">var q = from u in Users where u.ID = 1 select new UserDTO { ID = u.ID, Firstname = u.Firstname, Lastname = u.Lastname, Username = u.Username };
q.ToList<userdto>();</userdto></pre>{% endraw %}
<p>
	<strong>Entity Idratata manualmente: </strong></p>
{% raw %}<pre class="brush: csharp; ruler: true;" title="code">User usr = //recupero la entity dal database o dalla cache

UserDTO userDto = new UserDTO();
userDto.ID = usr.ID;
userDto.Firstname = usr.Firstname;
userDto.Lastname = usr.Lastname;
userDto.Username = usr.Username;</pre>{% endraw %}
<p>
	Come si potr&agrave; intuire, finch&egrave; si parla di poche propriet&agrave; per poche entities la cosa &egrave; fattibile, ma quando si tratta di applicazioni complesse l&rsquo;utilizzo dei DTO pu&ograve; incidere in maniera pesante sulle tempistiche e sui costi di sviluppo, specie se ci si trova con una entity gi&agrave; idratata.</p>
<p>
	Il problema potrebbe essere facilmente risolto se ci fosse qualcosa che svolge il lavoro di &ldquo;trasbordo&rdquo; dei dati per noi, ad esempio la <a href="http://en.wikipedia.org/wiki/.NET_metadata#Reflection" target="_blank">Reflection</a>.<br />
	Purtroppo, come &egrave; stato detto in numerosi articoli e blog, questa non &egrave; propriamente la soluzione migliore, in quanto a compile time non si conoscono n&eacute; tipi n&eacute; i membri in azione.<br />
	Per poter ovviare a questo problema si pu&ograve; generare codice <a href="http://en.wikipedia.org/wiki/Common_Intermediate_Language" target="_blank">IL (Intermediate Language)</a> ad hoc per il nostro scopo ed avere le &ldquo;stesse performance&rdquo; del codice compilato (per chi fosse interessato all&rsquo;argomento pu&ograve; avere maggiori info <a href="http://blogs.aspitalia.com/ricciolo/post2332/Reflection-Migliorare-Performance.aspx" target="_blank">qui</a>).</p>
<p>
	<br />
	Con l&rsquo;aiuto di <a href="http://blogs.aspitalia.com/ricciolo" target="_blank">Ricciolo</a> ho creato degli <a href="http://en.wikipedia.org/wiki/Extension_method" target="_blank">Extension Methods</a> che generano IL a runtime ed effettuano il &ldquo;trasbordo&rdquo; dei dati dalla entity di dominio alla entity di DTO, senza avere un decadimento delle performance e senza violare i principi esposti precedentemente.<br />
	Per prima cosa si realizza l&rsquo;Extension Method che legger&agrave; tutte le propriet&agrave; della entity di Dominio, e questa operazione viene fatta tramite la reflection (se pur la reflection sia lenta, quanta questa operazione verr&agrave; effettuata solo alla prima richiesta ed il risultato viene &ldquo;cachato&ldquo; in una hashtable statica) .</p>
<p>
	&nbsp;</p>
<p>
	Come si pu&ograve; notare, all&rsquo;interno del metodo vengono invocati altri due Extension Methods (FastCreateInstance e FastCopyValue), che hanno il compito di generare l&rsquo;IL necessario al nostro scopo.<br />
	Il metodo FastCreateInstance ha lo scopo di creare una nuova istanza: per ottimizzare le performance viene &ldquo;cachato&rdquo; il delegate in una hashtable.</p>
{% raw %}<pre class="brush: csharp; ruler: true;" title="code">private static readonly Hashtable createInstanceInvokers = new Hashtable();
private delegate object CreateInstanceInvoker();

private static object FastCreateInstance(this Type type)
{
    if (type == null)
        throw new ArgumentNullException(&quot;type&quot;);

    var invoker = (CreateInstanceInvoker)createInstanceInvokers[type];
    if (invoker == null)
    {
        LambdaExpression e = Expression.Lambda(typeof(CreateInstanceInvoker), Expression.New(type), null);
        invoker = (CreateInstanceInvoker)e.Compile();
        createInstanceInvokers[type] = invoker;

    }
    return invoker();
}
</pre>{% endraw %}
<p>
	Per il metodo FastCopyValues il discorso &egrave; pi&ugrave; o meno lo stesso, si ha un&rsquo;hashtable per il caching del delegate ed il codice IL necessario a copiare i valori:</p>
{% raw %}<pre class="brush: csharp; ruler: true;" title="code">private static readonly Hashtable getAndSetValuesInvokers = new Hashtable();
private delegate void GetSetValuesInvoker(object source, object target);

private static void FastCopyValues(this IEnumerable<propertyinfo> property, object source, object target)
{
    if (property == null)
        throw new ArgumentNullException(&quot;property&quot;);

    if (source == null)
        throw new ArgumentNullException(&quot;source&quot;);

    if (target == null)
        throw new ArgumentNullException(&quot;target&quot;);

    GetSetValuesInvoker invoker = GetGetAndSetCachedInvoker(property, source.GetType(), target.GetType());
    invoker(source, target);
}

private static GetSetValuesInvoker GetGetAndSetCachedInvoker(IEnumerable<propertyinfo> properties, Type sourceType, Type targetType)
{
    var invoker = (GetSetValuesInvoker)getAndSetValuesInvokers[properties];
    if (invoker == null)
    {
        var method = new DynamicMethod(&quot;test&quot;, null, new[] { typeof(object), typeof(object) }, typeof(object), true);
        ILGenerator il = method.GetILGenerator();
        il.DeclareLocal(sourceType);
        il.DeclareLocal(targetType);

        il.Emit(OpCodes.Nop);
        il.Emit(OpCodes.Ldarg_0);
        if (sourceType.IsClass)
            il.Emit(OpCodes.Castclass, sourceType);
        else
            il.Emit(OpCodes.Unbox_Any, sourceType);
        il.Emit(OpCodes.Stloc_0);

        il.Emit(OpCodes.Ldarg_1);
        if (targetType.IsClass)
            il.Emit(OpCodes.Castclass, targetType);
        else
            il.Emit(OpCodes.Unbox_Any, targetType);
        il.Emit(OpCodes.Stloc_1);

        foreach (PropertyInfo property in properties)
        {
            PropertyInfo sourceProperty = sourceType.GetProperty(property.Name, BindingFlags.Instance | BindingFlags.FlattenHierarchy | BindingFlags.NonPublic | BindingFlags.Public | BindingFlags.SetProperty);
            PropertyInfo targetProperty = targetType.GetProperty(property.Name, BindingFlags.Instance | BindingFlags.FlattenHierarchy | BindingFlags.NonPublic | BindingFlags.Public | BindingFlags.SetProperty);

            if (sourceProperty != null &amp;&amp; targetProperty != null)
            {
                il.Emit(OpCodes.Ldloc_1);
                il.Emit(OpCodes.Ldloc_0);
                il.EmitCall(OpCodes.Callvirt, sourceProperty.GetGetMethod(true), null);
                il.EmitCall(OpCodes.Callvirt, targetProperty.GetSetMethod(true), null);
                il.Emit(OpCodes.Nop);
            }
        }
        il.Emit(OpCodes.Ret);

        invoker = (GetSetValuesInvoker)method.CreateDelegate(typeof(GetSetValuesInvoker));
        getAndSetValuesInvokers[properties] = invoker;
    }

    return invoker;
}
</propertyinfo></propertyinfo></pre>{% endraw %}
<p>
	Come si pu&ograve; vedere dal codice precedente, spesso viene utilizzata un hashtable per il caching dei delegate e delle propriet&agrave; da copiare. Seppure ad ogni lettura viene effettuato un cast, l&rsquo;hashtable risulta molto pi&ugrave; adatta rispetto ad un Dictionary tipizzato, in quanto &egrave; gi&agrave; thread-safe, evitando cos&igrave; l&rsquo;inserimento di vari lock nel codice.<br />
	Se a prima vista pu&ograve; sembrare complesso, baster&agrave; guardare il codice seguente per capire la sua semplicit&agrave; di utilizzo.</p>
{% raw %}<pre class="brush: csharp; ruler: true;" title="code">User item = new User
                {
                    ID = 45, 
                    Username = &quot;imperugo&quot;, 
                    Firstname = &quot;Ugo&quot;, 
                    Lastname = &quot;Lattanzi&quot;, 
                    CreationDate = DateTime.Now, 
                    LastLoginDate = DateTime.Now.AddDays(-5)
                };


UserDTO returnItem = item.CopySameValues<userdto>();
</userdto></pre>{% endraw %}
<p>
	L&rsquo;unica accortezza che bisogna avere riguarda le propriet&agrave; che si vogliono copiare tra le due entit&agrave;, che devono avere lo stesso nome ed essere dello stesso tipo, per il resto &egrave; semplicissimo.</p>
