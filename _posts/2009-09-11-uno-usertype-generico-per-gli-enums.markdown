---
layout: post
status: publish
published: true
title: Uno UserType generico per gli Enums
author: imperugo
author_login: imperugo
author_email: imperugo@gmail.com
wordpress_id: 1564
wordpress_url: http://imperugo.tostring.it/blog/post/uno-usertype-generico-per-gli-enums/
date: 2009-09-11 22:30:32.000000000 +01:00
categories:
- ORM
tags:
- Nhibernate
- NHibernateFluent
- Mapping
comments: true
---
<p>NHibernate tende a mappare gli <em>Enums</em> come stringhe nel database; questo a volte pu&ograve; non essere un problema, ma personalmente preferisco memorizzarli in un intero, o ancora meglio un <em>tynint</em>, infatti con questo tipo di formato si ha un netto risparmio di spazio, ma anche un vantaggio per eventuali query.</p>
<p>NHibernate permette di cambiare il modo di persistere un tipo di oggetto del nostro domain model sul database tramite delle apposite classi; tradotto pi&ugrave; semplicemente permette di avere una classe sulla propria entity e un semplice campo nel database (ad esempio un intero o un varchar), come potrebbe essere il <em>CultureInfo</em> che, in una classe come quella mostrata di seguito, &egrave; un oggetto, mentre sul database una semplice string tipo &ldquo;en-US&rdquo;.</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
public class Comment : EntityBase
{
    public virtual Item Item { get; set; }
    public virtual DateTime CommentDate { get; set; }
    public virtual string Message { get; set; }
    public virtual string Name { get; set; }
    public virtual string Email { get; set; }
    public virtual bool Notify { get; set; }
    public virtual string WebSite { get; set; }
    public virtual bool Approved { get; set; }
    public virtual bool IsSpam { get; set; }
    public virtual System.Globalization.CultureInfo Culture { get; set; }
}</pre>{% endraw %}
<p>Lo stesso approccio pu&ograve; essere utilizzato per gli <em>Enums</em>, quindi un <em>enum</em> come il seguente:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
public enum BlogRollFriendType : short 
{
    Nothing = 0,
    Contact = 1,
    Friend = 2,
    Acquaintance = 3
}</pre>{% endraw %}
<p>pu&ograve; essere persistito come un tinyint sul database grazie ad uno UserType come quello mostrato di seguito:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
public class GenericEnumMapper&lt;T&gt; : IUserType
{
    #region IUserType Members

    public new bool Equals(object x, object y)
    {
        if (ReferenceEquals(x, y)) return true;
        if (x == null || y == null) return false;
        return x.Equals(y);
    }

    public int GetHashCode(object x)
    {
        return x.GetHashCode();
    }

    public object NullSafeGet(IDataReader rs, string[] names, object owner)
    {
        object obj = NHibernateUtil.Int16.NullSafeGet(rs, names[0]);

        if (obj == null)
            return null;

        return (T) obj;
    }

    public void NullSafeSet(IDbCommand cmd, object value, int index)
    {
        if (value == null)
            ((IDataParameter) cmd.Parameters[index]).Value = DBNull.Value;
        else
            ((IDataParameter) cmd.Parameters[index]).Value = (short) value;
    }

    public object DeepCopy(object value)
    {
        return value;
    }

    public object Replace(object original, object target, object owner)
    {
        return original;
    }

    public object Assemble(object cached, object owner)
    {
        return cached;
    }

    public object Disassemble(object value)
    {
        return value;
    }

    public SqlType[] SqlTypes
    {
        get { return new[] {new SqlType(DbType.Int16)}; }
    }

    public Type ReturnedType
    {
        get { return typeof (T); }
    }

    public bool IsMutable
    {
        get { return false; }
    }

    #endregion
}</pre>{% endraw %}
<p>L&rsquo;implementazione &egrave; piuttosto semplice, l&rsquo;unica accortezza che bisogna avere per poter persistere l&rsquo;enum come tinyint &egrave; specificare lo usertype nel mapping, come mostrato di seguito:</p>
{% raw %}<pre class="brush: csharp; ruler: true;">
public BlogRoll()
{
    Table(&quot;BlogsRoll&quot;);
    DynamicUpdate();
    LazyLoad();
    Cache.NonStrictReadWrite();

    Id(x =&gt; x.ID)
        .GeneratedBy.Identity();

    Map(x =&gt; x.Name)
        .Not.Nullable()
        .Length(100);

    Map(x =&gt; x.Link)
        .Not.Nullable()
        .Length(100);

    Map(x =&gt; x.IsMyBlog);
    Map(x =&gt; x.FriendType)
        .CustomType(typeof(Dexter.NHibernate.Helpers.UserTypes.GenericEnumMapper&lt;BlogRollFriendType&gt;));

    Map(x =&gt; x.GeographicalType)
        .CustomType(typeof (Dexter.NHibernate.Helpers.UserTypes.GenericEnumMapper&lt;BlogRollGeographicalType&gt;));
}</pre>{% endraw %}
<p>Lo screenshot seguente mostra la struttura della tabella:   <br />
<a href="http://imperugo.tostring.it/Content/Uploaded/image/table._2.gif" rel="shadowbox[Uno-UserType-generico-per-gli-Enums];options={counterType:'skip',continuous:true,animSequence:'sync'}"><img SinglelineIgnoreCase singlelineignorecase="" style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="table." border="0" alt="table." width="294" height="339" src="http://imperugo.tostring.it/Content/Uploaded/image/table._thumb.gif" /></a></p>
