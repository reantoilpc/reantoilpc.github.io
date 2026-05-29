---
title: efcore 使用介紹
description: ""
pubDate: 2022-08-17
tags: [efcore]
category: Entity Framework
lang: zh-TW
---

## EFCore 建議寫法

### Repository 回傳

Repository 設計概念，希望透過傳入條件值篩選資料出來。如果單純查詢一個資料表這樣寫法沒有問題，但通常在顯示或是處理資料，不會只有查一個資料表，往往都要查詢好幾個資料表，進行 Join 後才是我們要的結果。

如果 Repository 回傳是 IEnumerable、List、Array 這些類型，等同於立刻執行一段 SQL 語法，意思就是 Join 幾個資料表就執行幾次 SQL 語法，這樣寫法是很消耗資料庫效能，而且執行效率也比較慢，因為是分別 Query 資料表並沒有使用到 SQL Join 功能。

在 EFCore 可以使用 IQueryable 進行延遲執行取得資料，意思就是無論 Join 幾個資料表，都還不會Query 資料表，而是等到 ToListAsync ，EFCore 才會產生相對應的 SQL 語法，這時候就會組出 SQL Join 語法，好處就是只對資料庫查詢一次、而且是篩選過的資料，在網路傳輸也會比較快一些。

```C#
    // Bad
    public IEnumerable<EpkAccAccount> Find(Expression<Func<EpkAccAccount, bool>> expression)
    {
        return _context.EpkAccAccount.Where(expression);
    }

    // Good
    public IQueryable<EpkAccAccount> FindAsync(Expression<Func<EpkAccAccount, bool>> expression)
    {
        return expression == null ? _context.EpkAccAccount : _context.EpkAccAccount.Where(expression);
    }    
```

### Select 必要欄位

使用 SQL 查詢，官方不建議 `select * from table` 查出所有欄位，只要針對需要欄位就可以。使用 EFCore 也是如此，如果不指定欄位，直接回傳 Entity 就會把所有欄位查詢出來。

建議在查詢時候，針對必要欄位查詢就可以，才不會造成非必要查詢效能浪費。

```C#

    // Bad
    var epkAccId = "6006746649";
    IEnumerable<EpkAccAccount> epkAccAccount = _context.EpkAccAccount.Where(x => x.EpkAccId == epkAccId).ToListAsync();

    // Good
    var epkAccId = "6006746649";
    IEnumerable<AccountDto> accountDto = _context.EpkAccAccount
                                        .Where(x => x.EpkAccId == epkAccId)
                                        .Select(x => new AccountDto 
                                        { 
                                            EpkAccId = x.EpkAccId, Lpr = x.Lpr, IdNo = x.IdNo 
                                        })
                                        .ToListAsync();

```

### Like 查詢

在 EFCore Link 查詢，不建議使用 `StartsWith`, `EndsWith`, `Contains` 這幾個關鍵字查詢，EFCore 並不會轉換成 SQL Like，反而會轉換使用 SQL 函數查詢，雖然查詢結果一樣，但當資料量大時，查詢的效率就會變差。

在 EFCore 使用 `StartsWith`, `EndsWith`, `Contains` 關鍵字查詢，對應產生 SQL 語法

```SQL

    -- Contains
    SELECT [traTx].[TRA_TX_ID], [traTx].[CHANNEL_CODE], [traTx].[TRANSACTION_TIME]
    FROM [EPK_ACC_TRA_TX] AS [traTx]
    WHERE CHARINDEX('P96', [traTx].[CHANNEL_CODE]) > 0 OR 'P96' = N''

    -- StartsWith
    SELECT [traTx].[TRA_TX_ID], [traTx].[CHANNEL_CODE], [traTx].[TRANSACTION_TIME]
    FROM [EPK_ACC_TRA_TX] AS [traTx]
    WHERE LEFT([traTx].[CHANNEL_CODE], LEN('P96')) = 'P96' OR 'P96' = N''

    -- EndsWith
    SELECT [traTx].[TRA_TX_ID], [traTx].[CHANNEL_CODE], [traTx].[TRANSACTION_TIME]
    FROM [EPK_ACC_TRA_TX] AS [traTx]
    WHERE RIGHT([traTx].[CHANNEL_CODE], LEN('P96')) = 'P96' OR 'P96' = N''

```

如果要 Like 查詢，請要改用 `EF.Functions` 來查詢。

```C#
    // Bad
    var channelCode = "P96";
    _context.EpkAccTraTx.Where(x => x.ChannelCode.StartsWith(channelCode));

    // Good
    var channelCode = "P96";
    _context.EpkAccTraTx.Where(x => EF.Functions.Like(x.ChannelCode, $"{channelCode}%"));   
```

### Inner Join

```C#

    var smsHistories = _context.EpkAccSmshistory;
    var traTxs = _context.EpkAccTraTx;

    var traNoticeViews = await
    (
        from sms in smsHistories join traTx in traTxs on sms.TraTxId equals traTx.TraTxId
        where traTx.ServiceId == 6 && traTx.TransactionCode == "01" 
        select new TraNoticeView
        {
            ChannelCode = traTx.ChannelCode,
            OpenFilter = sms.OpenFilter,
            TransactionDate = traTx.TransactionTime.Date,
            Filter = sms.Filter
        }
    ).ToListAsync();

```

### Left Join

```C#

    var smsHistories = _context.EpkAccSmshistory;
    var traTxs = _context.EpkAccTraTx;

    var traNoticeViews = await
    (
        from sms in smsHistories join traTx in traTxs on sms.TraTxId equals traTx.TraTxId into histories
        from sms in histories.DefaultIfEmpty()
        where traTx.ServiceId == 6 && traTx.TransactionCode == "01" 
        select new TraNoticeView
        {
            ChannelCode = traTx.ChannelCode,
            OpenFilter = sms.OpenFilter,
            TransactionDate = traTx.TransactionTime.Date,
            Filter = sms.Filter
        }
    ).ToListAsync();

```

### Group By

```C#
    var smsHistories = _context.EpkAccSmshistory;
    var traTxs = _context.EpkAccTraTx;

    var traNoticeViews = await
    (
        from sms in smsHistories join traTx in traTxs on sms.TraTxId equals traTx.TraTxId into histories
        from sms in histories.DefaultIfEmpty()
        where traTx.ServiceId == 6 && traTx.TransactionCode == "01" 
        select new TraNoticeView
        {
            ChannelCode = traTx.ChannelCode,
            OpenFilter = sms.OpenFilter,
            TransactionDate = traTx.TransactionTime.Date,
            Filter = sms.Filter
        }
    )
    .GroupBy(x => new {x.TransactionDate, x.Filter})
    .ToDictionaryAsync(x => x.Key, x => new TraNoticeArrivalCount
    {
        TransactionDate = x.Key.TransactionDate,
        Filter = x.Key.Filter,
        ArrivalCount = x.Count()
    });
                             
```

### EFCore WithNoLock

在 MS SQL 下 Select 語法，通常會建議加上`WithNoLock`，避免 Select 資料表，同時間該資料正在異動中，暫時性的 Lock 等待作業完成期間，造成使用者連線 Timeout 的問題。

雖然 EFCore 不支援自動補上 WithNoLock 的語法，但可以透過`IsolationLevel`（交易隔離等級）達到同樣的效果。

隔離等級有分這幾種，各個差異如下（預設為ReadCommitted）：
| 隔離等級 | 說明 |
| -- | -- |
| Chaos | 無法覆寫來自隔離程度更深之交易的暫止變更 |
| ReadCommitted | 在交易期間無法讀取 Volatile 資料，但可以修改該資料 |
| ReadUncommitted | 在交易期間可以讀取和修改 Volatile 資料。 |
| RepeatableRead | 在交易期間可以讀取 Volatile 資料，但無法修改該資料。 在交易期間可以加入新資料。 |
| Serializable | 在交易期間可以讀取 Volatile 資料，但無法修改該資料，且不能加入新資料。 |
| Snapshot | 可以讀取 Volatile 資料。 交易會在修改資料之前，先驗證在最初讀取資料後是否有另一個交易已變更該資料。 如果資料已更新，則會引發錯誤， 如此可允許交易回到先前所認可的資料值。當您升級使用 Snapshot 隔離層級建立的交易時，會擲回具有錯誤訊息「無法升級 IsolationLevel 為快照的交易」的 InvalidOperationException。 |
| Unspecified | 使用與指定不同的隔離等級，但無法判斷該等級。 如果設定這個值，會擲回例外狀況。 |

要避免上述該問題，一般指定隔離等級為 ReadUncommitted。

在程式裡要使用`WithNoLock`功能，要先從下載`Fetc.Core.EntityFramewrokCore`套件，只要回傳資料類型是`IQueryable`就可以使用，使用範例如下。

```C#

    var repository = _epkUnitOfWork.GetRepository<EpkExcWhitelist>();
    var epkWhitelistDtos = repository.GetAll(x => x.UploadDate > startDate && x.UploadDate <= endDate)
                                     .ToListWithNoLock();

```

## SaveChanges

EFCore 是透過`DbContext.DbSet<T>`對資料進行Add、Update、Remov，當下還不會寫入資料庫，而是延遲到`SaveChanges`後才會真正寫入資料庫，而每次呼叫`SaveChanges`時，多筆資料異動指令會自動包成一個 Transaction，任一個動作失敗均會觸發 Rollback。
