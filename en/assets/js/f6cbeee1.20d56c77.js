"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3836],{4641:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"2022-08-17-efcore-guide","metadata":{"permalink":"/en/blog/2022-08-17-efcore-guide","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2022-08-17-efcore-guide.md","source":"@site/blog/2022-08-17-efcore-guide.md","title":"efcore \u4f7f\u7528\u4ecb\u7d39","description":"EFCore \u5efa\u8b70\u5beb\u6cd5","date":"2022-08-17T00:00:00.000Z","formattedDate":"August 17, 2022","tags":[{"label":"efcore","permalink":"/en/blog/tags/efcore"}],"readingTime":6.915,"truncated":false,"authors":[{"name":"Ray Hsu","title":"C# \u5f8c\u7aef\u5de5\u7a0b\u5e2b","url":"https://github.com/reantoilpc","imageURL":"https://github.com/reantoilpc.png","key":"rayhsu"}],"nextItem":{"title":"Produces Attribute \u5168\u57df\u8a2d\u5b9a","permalink":"/en/blog/2022-08-02-global-produces-attribute"}},"content":"## EFCore \u5efa\u8b70\u5beb\u6cd5\\n\\n### Repository \u56de\u50b3\\n\\nRepository \u8a2d\u8a08\u6982\u5ff5\uff0c\u5e0c\u671b\u900f\u904e\u50b3\u5165\u689d\u4ef6\u503c\u7be9\u9078\u8cc7\u6599\u51fa\u4f86\u3002\u5982\u679c\u55ae\u7d14\u67e5\u8a62\u4e00\u500b\u8cc7\u6599\u8868\u9019\u6a23\u5beb\u6cd5\u6c92\u6709\u554f\u984c\uff0c\u4f46\u901a\u5e38\u5728\u986f\u793a\u6216\u662f\u8655\u7406\u8cc7\u6599\uff0c\u4e0d\u6703\u53ea\u6709\u67e5\u4e00\u500b\u8cc7\u6599\u8868\uff0c\u5f80\u5f80\u90fd\u8981\u67e5\u8a62\u597d\u5e7e\u500b\u8cc7\u6599\u8868\uff0c\u9032\u884c Join \u5f8c\u624d\u662f\u6211\u5011\u8981\u7684\u7d50\u679c\u3002\\n\\n\u5982\u679c Repository \u56de\u50b3\u662f IEnumerable\u3001List\u3001Array \u9019\u4e9b\u985e\u578b\uff0c\u7b49\u540c\u65bc\u7acb\u523b\u57f7\u884c\u4e00\u6bb5 SQL \u8a9e\u6cd5\uff0c\u610f\u601d\u5c31\u662f Join \u5e7e\u500b\u8cc7\u6599\u8868\u5c31\u57f7\u884c\u5e7e\u6b21 SQL \u8a9e\u6cd5\uff0c\u9019\u6a23\u5beb\u6cd5\u662f\u5f88\u6d88\u8017\u8cc7\u6599\u5eab\u6548\u80fd\uff0c\u800c\u4e14\u57f7\u884c\u6548\u7387\u4e5f\u6bd4\u8f03\u6162\uff0c\u56e0\u70ba\u662f\u5206\u5225 Query \u8cc7\u6599\u8868\u4e26\u6c92\u6709\u4f7f\u7528\u5230 SQL Join \u529f\u80fd\u3002\\n\\n\u5728 EFCore \u53ef\u4ee5\u4f7f\u7528 IQueryable \u9032\u884c\u5ef6\u9072\u57f7\u884c\u53d6\u5f97\u8cc7\u6599\uff0c\u610f\u601d\u5c31\u662f\u7121\u8ad6 Join \u5e7e\u500b\u8cc7\u6599\u8868\uff0c\u90fd\u9084\u4e0d\u6703Query \u8cc7\u6599\u8868\uff0c\u800c\u662f\u7b49\u5230 ToListAsync \uff0cEFCore \u624d\u6703\u7522\u751f\u76f8\u5c0d\u61c9\u7684 SQL \u8a9e\u6cd5\uff0c\u9019\u6642\u5019\u5c31\u6703\u7d44\u51fa SQL Join \u8a9e\u6cd5\uff0c\u597d\u8655\u5c31\u662f\u53ea\u5c0d\u8cc7\u6599\u5eab\u67e5\u8a62\u4e00\u6b21\u3001\u800c\u4e14\u662f\u7be9\u9078\u904e\u7684\u8cc7\u6599\uff0c\u5728\u7db2\u8def\u50b3\u8f38\u4e5f\u6703\u6bd4\u8f03\u5feb\u4e00\u4e9b\u3002\\n\\n```C#\\n    // Bad\\n    public IEnumerable<EpkAccAccount> Find(Expression<Func<EpkAccAccount, bool>> expression)\\n    {\\n        return _context.EpkAccAccount.Where(expression);\\n    }\\n\\n    // Good\\n    public IQueryable<EpkAccAccount> FindAsync(Expression<Func<EpkAccAccount, bool>> expression)\\n    {\\n        return expression == null ? _context.EpkAccAccount : _context.EpkAccAccount.Where(expression);\\n    }    \\n```\\n\\n### Select \u5fc5\u8981\u6b04\u4f4d\\n\\n\u4f7f\u7528 SQL \u67e5\u8a62\uff0c\u5b98\u65b9\u4e0d\u5efa\u8b70 `select * from table` \u67e5\u51fa\u6240\u6709\u6b04\u4f4d\uff0c\u53ea\u8981\u91dd\u5c0d\u9700\u8981\u6b04\u4f4d\u5c31\u53ef\u4ee5\u3002\u4f7f\u7528 EFCore \u4e5f\u662f\u5982\u6b64\uff0c\u5982\u679c\u4e0d\u6307\u5b9a\u6b04\u4f4d\uff0c\u76f4\u63a5\u56de\u50b3 Entity \u5c31\u6703\u628a\u6240\u6709\u6b04\u4f4d\u67e5\u8a62\u51fa\u4f86\u3002\\n\\n\u5efa\u8b70\u5728\u67e5\u8a62\u6642\u5019\uff0c\u91dd\u5c0d\u5fc5\u8981\u6b04\u4f4d\u67e5\u8a62\u5c31\u53ef\u4ee5\uff0c\u624d\u4e0d\u6703\u9020\u6210\u975e\u5fc5\u8981\u67e5\u8a62\u6548\u80fd\u6d6a\u8cbb\u3002\\n\\n```C#\\n\\n    // Bad\\n    var epkAccId = \\"6006746649\\";\\n    IEnumerable<EpkAccAccount> epkAccAccount = _context.EpkAccAccount.Where(x => x.EpkAccId == epkAccId).ToListAsync();\\n\\n    // Good\\n    var epkAccId = \\"6006746649\\";\\n    IEnumerable<AccountDto> accountDto = _context.EpkAccAccount\\n                                        .Where(x => x.EpkAccId == epkAccId)\\n                                        .Select(x => new AccountDto \\n                                        { \\n                                            EpkAccId = x.EpkAccId, Lpr = x.Lpr, IdNo = x.IdNo \\n                                        })\\n                                        .ToListAsync();\\n\\n```\\n\\n### Like \u67e5\u8a62\\n\\n\u5728 EFCore Link \u67e5\u8a62\uff0c\u4e0d\u5efa\u8b70\u4f7f\u7528 `StartsWith`, `EndsWith`, `Contains` \u9019\u5e7e\u500b\u95dc\u9375\u5b57\u67e5\u8a62\uff0cEFCore \u4e26\u4e0d\u6703\u8f49\u63db\u6210 SQL Like\uff0c\u53cd\u800c\u6703\u8f49\u63db\u4f7f\u7528 SQL \u51fd\u6578\u67e5\u8a62\uff0c\u96d6\u7136\u67e5\u8a62\u7d50\u679c\u4e00\u6a23\uff0c\u4f46\u7576\u8cc7\u6599\u91cf\u5927\u6642\uff0c\u67e5\u8a62\u7684\u6548\u7387\u5c31\u6703\u8b8a\u5dee\u3002\\n\\n\u5728 EFCore \u4f7f\u7528 `StartsWith`, `EndsWith`, `Contains` \u95dc\u9375\u5b57\u67e5\u8a62\uff0c\u5c0d\u61c9\u7522\u751f SQL \u8a9e\u6cd5\\n\\n```SQL\\n\\n    -- Contains\\n    SELECT [traTx].[TRA_TX_ID], [traTx].[CHANNEL_CODE], [traTx].[TRANSACTION_TIME]\\n    FROM [EPK_ACC_TRA_TX] AS [traTx]\\n    WHERE CHARINDEX(\'P96\', [traTx].[CHANNEL_CODE]) > 0 OR \'P96\' = N\'\'\\n\\n    -- StartsWith\\n    SELECT [traTx].[TRA_TX_ID], [traTx].[CHANNEL_CODE], [traTx].[TRANSACTION_TIME]\\n    FROM [EPK_ACC_TRA_TX] AS [traTx]\\n    WHERE LEFT([traTx].[CHANNEL_CODE], LEN(\'P96\')) = \'P96\' OR \'P96\' = N\'\'\\n\\n    -- EndsWith\\n    SELECT [traTx].[TRA_TX_ID], [traTx].[CHANNEL_CODE], [traTx].[TRANSACTION_TIME]\\n    FROM [EPK_ACC_TRA_TX] AS [traTx]\\n    WHERE RIGHT([traTx].[CHANNEL_CODE], LEN(\'P96\')) = \'P96\' OR \'P96\' = N\'\'\\n\\n```\\n\\n\u5982\u679c\u8981 Like \u67e5\u8a62\uff0c\u8acb\u8981\u6539\u7528 `EF.Functions` \u4f86\u67e5\u8a62\u3002\\n\\n```C#\\n    // Bad\\n    var channelCode = \\"P96\\";\\n    _context.EpkAccTraTx.Where(x => x.ChannelCode.StartsWith(channelCode));\\n\\n    // Good\\n    var channelCode = \\"P96\\";\\n    _context.EpkAccTraTx.Where(x => EF.Functions.Like(x.ChannelCode, $\\"{channelCode}%\\"));   \\n```\\n\\n### Inner Join\\n\\n```C#\\n\\n    var smsHistories = _context.EpkAccSmshistory;\\n    var traTxs = _context.EpkAccTraTx;\\n\\n    var traNoticeViews = await\\n    (\\n        from sms in smsHistories join traTx in traTxs on sms.TraTxId equals traTx.TraTxId\\n        where traTx.ServiceId == 6 && traTx.TransactionCode == \\"01\\" \\n        select new TraNoticeView\\n        {\\n            ChannelCode = traTx.ChannelCode,\\n            OpenFilter = sms.OpenFilter,\\n            TransactionDate = traTx.TransactionTime.Date,\\n            Filter = sms.Filter\\n        }\\n    ).ToListAsync();\\n\\n```\\n\\n### Left Join\\n\\n```C#\\n\\n    var smsHistories = _context.EpkAccSmshistory;\\n    var traTxs = _context.EpkAccTraTx;\\n\\n    var traNoticeViews = await\\n    (\\n        from sms in smsHistories join traTx in traTxs on sms.TraTxId equals traTx.TraTxId into histories\\n        from sms in histories.DefaultIfEmpty()\\n        where traTx.ServiceId == 6 && traTx.TransactionCode == \\"01\\" \\n        select new TraNoticeView\\n        {\\n            ChannelCode = traTx.ChannelCode,\\n            OpenFilter = sms.OpenFilter,\\n            TransactionDate = traTx.TransactionTime.Date,\\n            Filter = sms.Filter\\n        }\\n    ).ToListAsync();\\n\\n```\\n\\n### Group By\\n\\n```C#\\n    var smsHistories = _context.EpkAccSmshistory;\\n    var traTxs = _context.EpkAccTraTx;\\n\\n    var traNoticeViews = await\\n    (\\n        from sms in smsHistories join traTx in traTxs on sms.TraTxId equals traTx.TraTxId into histories\\n        from sms in histories.DefaultIfEmpty()\\n        where traTx.ServiceId == 6 && traTx.TransactionCode == \\"01\\" \\n        select new TraNoticeView\\n        {\\n            ChannelCode = traTx.ChannelCode,\\n            OpenFilter = sms.OpenFilter,\\n            TransactionDate = traTx.TransactionTime.Date,\\n            Filter = sms.Filter\\n        }\\n    )\\n    .GroupBy(x => new {x.TransactionDate, x.Filter})\\n    .ToDictionaryAsync(x => x.Key, x => new TraNoticeArrivalCount\\n    {\\n        TransactionDate = x.Key.TransactionDate,\\n        Filter = x.Key.Filter,\\n        ArrivalCount = x.Count()\\n    });\\n                             \\n```\\n\\n### EFCore WithNoLock\\n\\n\u5728 MS SQL \u4e0b Select \u8a9e\u6cd5\uff0c\u901a\u5e38\u6703\u5efa\u8b70\u52a0\u4e0a`WithNoLock`\uff0c\u907f\u514d Select \u8cc7\u6599\u8868\uff0c\u540c\u6642\u9593\u8a72\u8cc7\u6599\u6b63\u5728\u7570\u52d5\u4e2d\uff0c\u66ab\u6642\u6027\u7684 Lock \u7b49\u5f85\u4f5c\u696d\u5b8c\u6210\u671f\u9593\uff0c\u9020\u6210\u4f7f\u7528\u8005\u9023\u7dda Timeout \u7684\u554f\u984c\u3002\\n\\n\u96d6\u7136 EFCore \u4e0d\u652f\u63f4\u81ea\u52d5\u88dc\u4e0a WithNoLock \u7684\u8a9e\u6cd5\uff0c\u4f46\u53ef\u4ee5\u900f\u904e`IsolationLevel`\uff08\u4ea4\u6613\u9694\u96e2\u7b49\u7d1a\uff09\u9054\u5230\u540c\u6a23\u7684\u6548\u679c\u3002\\n\\n\u9694\u96e2\u7b49\u7d1a\u6709\u5206\u9019\u5e7e\u7a2e\uff0c\u5404\u500b\u5dee\u7570\u5982\u4e0b\uff08\u9810\u8a2d\u70baReadCommitted\uff09\uff1a\\n| \u9694\u96e2\u7b49\u7d1a | \u8aaa\u660e |\\n| -- | -- |\\n| Chaos | \u7121\u6cd5\u8986\u5beb\u4f86\u81ea\u9694\u96e2\u7a0b\u5ea6\u66f4\u6df1\u4e4b\u4ea4\u6613\u7684\u66ab\u6b62\u8b8a\u66f4 |\\n| ReadCommitted | \u5728\u4ea4\u6613\u671f\u9593\u7121\u6cd5\u8b80\u53d6 Volatile \u8cc7\u6599\uff0c\u4f46\u53ef\u4ee5\u4fee\u6539\u8a72\u8cc7\u6599 |\\n| ReadUncommitted | \u5728\u4ea4\u6613\u671f\u9593\u53ef\u4ee5\u8b80\u53d6\u548c\u4fee\u6539 Volatile \u8cc7\u6599\u3002 |\\n| RepeatableRead | \u5728\u4ea4\u6613\u671f\u9593\u53ef\u4ee5\u8b80\u53d6 Volatile \u8cc7\u6599\uff0c\u4f46\u7121\u6cd5\u4fee\u6539\u8a72\u8cc7\u6599\u3002 \u5728\u4ea4\u6613\u671f\u9593\u53ef\u4ee5\u52a0\u5165\u65b0\u8cc7\u6599\u3002 |\\n| Serializable | \u5728\u4ea4\u6613\u671f\u9593\u53ef\u4ee5\u8b80\u53d6 Volatile \u8cc7\u6599\uff0c\u4f46\u7121\u6cd5\u4fee\u6539\u8a72\u8cc7\u6599\uff0c\u4e14\u4e0d\u80fd\u52a0\u5165\u65b0\u8cc7\u6599\u3002 |\\n| Snapshot | \u53ef\u4ee5\u8b80\u53d6 Volatile \u8cc7\u6599\u3002 \u4ea4\u6613\u6703\u5728\u4fee\u6539\u8cc7\u6599\u4e4b\u524d\uff0c\u5148\u9a57\u8b49\u5728\u6700\u521d\u8b80\u53d6\u8cc7\u6599\u5f8c\u662f\u5426\u6709\u53e6\u4e00\u500b\u4ea4\u6613\u5df2\u8b8a\u66f4\u8a72\u8cc7\u6599\u3002 \u5982\u679c\u8cc7\u6599\u5df2\u66f4\u65b0\uff0c\u5247\u6703\u5f15\u767c\u932f\u8aa4\uff0c \u5982\u6b64\u53ef\u5141\u8a31\u4ea4\u6613\u56de\u5230\u5148\u524d\u6240\u8a8d\u53ef\u7684\u8cc7\u6599\u503c\u3002\u7576\u60a8\u5347\u7d1a\u4f7f\u7528 Snapshot \u9694\u96e2\u5c64\u7d1a\u5efa\u7acb\u7684\u4ea4\u6613\u6642\uff0c\u6703\u64f2\u56de\u5177\u6709\u932f\u8aa4\u8a0a\u606f\u300c\u7121\u6cd5\u5347\u7d1a IsolationLevel \u70ba\u5feb\u7167\u7684\u4ea4\u6613\u300d\u7684 InvalidOperationException\u3002 |\\n| Unspecified | \u4f7f\u7528\u8207\u6307\u5b9a\u4e0d\u540c\u7684\u9694\u96e2\u7b49\u7d1a\uff0c\u4f46\u7121\u6cd5\u5224\u65b7\u8a72\u7b49\u7d1a\u3002 \u5982\u679c\u8a2d\u5b9a\u9019\u500b\u503c\uff0c\u6703\u64f2\u56de\u4f8b\u5916\u72c0\u6cc1\u3002 |\\n\\n\u8981\u907f\u514d\u4e0a\u8ff0\u8a72\u554f\u984c\uff0c\u4e00\u822c\u6307\u5b9a\u9694\u96e2\u7b49\u7d1a\u70ba ReadUncommitted\u3002\\n\\n\u5728\u7a0b\u5f0f\u88e1\u8981\u4f7f\u7528`WithNoLock`\u529f\u80fd\uff0c\u8981\u5148\u5f9e\u4e0b\u8f09`Fetc.Core.EntityFramewrokCore`\u5957\u4ef6\uff0c\u53ea\u8981\u56de\u50b3\u8cc7\u6599\u985e\u578b\u662f`IQueryable`\u5c31\u53ef\u4ee5\u4f7f\u7528\uff0c\u4f7f\u7528\u7bc4\u4f8b\u5982\u4e0b\u3002\\n\\n```C#\\n\\n    var repository = _epkUnitOfWork.GetRepository<EpkExcWhitelist>();\\n    var epkWhitelistDtos = repository.GetAll(x => x.UploadDate > startDate && x.UploadDate <= endDate)\\n                                     .ToListWithNoLock();\\n\\n```\\n\\n## SaveChanges\\n\\nEFCore \u662f\u900f\u904e`DbContext.DbSet<T>`\u5c0d\u8cc7\u6599\u9032\u884cAdd\u3001Update\u3001Remov\uff0c\u7576\u4e0b\u9084\u4e0d\u6703\u5beb\u5165\u8cc7\u6599\u5eab\uff0c\u800c\u662f\u5ef6\u9072\u5230`SaveChanges`\u5f8c\u624d\u6703\u771f\u6b63\u5beb\u5165\u8cc7\u6599\u5eab\uff0c\u800c\u6bcf\u6b21\u547c\u53eb`SaveChanges`\u6642\uff0c\u591a\u7b46\u8cc7\u6599\u7570\u52d5\u6307\u4ee4\u6703\u81ea\u52d5\u5305\u6210\u4e00\u500b Transaction\uff0c\u4efb\u4e00\u500b\u52d5\u4f5c\u5931\u6557\u5747\u6703\u89f8\u767c Rollback\u3002"},{"id":"2022-08-02-global-produces-attribute","metadata":{"permalink":"/en/blog/2022-08-02-global-produces-attribute","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2022-08-02-global-produces-attribute.md","source":"@site/blog/2022-08-02-global-produces-attribute.md","title":"Produces Attribute \u5168\u57df\u8a2d\u5b9a","description":"Application model","date":"2022-08-02T00:00:00.000Z","formattedDate":"August 2, 2022","tags":[{"label":"nuget","permalink":"/en/blog/tags/nuget"},{"label":"Produces","permalink":"/en/blog/tags/produces"},{"label":"Attribute","permalink":"/en/blog/tags/attribute"}],"readingTime":1.45,"truncated":false,"authors":[{"name":"Ray Hsu","title":"C# \u5f8c\u7aef\u5de5\u7a0b\u5e2b","url":"https://github.com/reantoilpc","imageURL":"https://github.com/reantoilpc.png","key":"rayhsu"}],"prevItem":{"title":"efcore \u4f7f\u7528\u4ecb\u7d39","permalink":"/en/blog/2022-08-17-efcore-guide"},"nextItem":{"title":"Enums.NET \u4f7f\u7528","permalink":"/en/blog/2022-07-21-nuget-package-Enums.NET"}},"content":"## Application model\\n\\nApplication Model \u5b9a\u7fa9 MVC \u61c9\u7528\u4e2d\u5404\u7a2e\u5c0d\u8c61\u548c\u884c\u70ba\uff0c\u5305\u542bApplication\u3001Controller\u3001Action\u3001Parameter\u3001Router\u3001Page\u3001Property\u3001Filter\u7b49\u7b49\uff0c\u4e0a\u8ff0\u7684\u529f\u80fd\u53ef\u4ee5\u900f\u904e`\u6163\u4f8b`(convention)\u4f86\u64f4\u5145\u5ba2\u88fd\u81ea\u5df1\u7684\u9700\u6c42\uff0c\u4e26\u8a2d\u5b9a\u5168\u57df\u6216\u5c6c\u6027\u4f86\u4f7f\u7528\\n\\nASP.NET Core MVC \u900f\u904e IApplicationModelProvider \u5b9a\u7fa9\u64f4\u5145\u7684\u985e\u5225\u4f86\u8f09\u5165\u61c9\u7528\u7a0b\u5f0f\uff0c\u5b98\u65b9\u5efa\u8b70\u6c92\u6709\u7279\u5225\u9700\u6c42\uff0c\u76e1\u91cf\u4e0d\u4f7f\u7528`provider pattern`\u800c\u662f\u4f7f\u7528`conventions`\u9032\u884c\u529f\u80fd\u64f4\u5145\\n\\n## \u5be6\u4f5c ProduceResponseTypeModelConvention\\n\\n\u5728\u7db2\u8def\u4e0a\u67e5\u5230\u7684\u7a0b\u5f0f\u7bc4\u4f8b\u90fd\u662f\u7e7c\u627f`IApplicationModelProvider`\u56e0\u6b64\u6211\u6539\u7528`IApplicationModelConvention`\u4f86\u5be6\u4f5c\uff0c\u7bc4\u4f8b\u5982\u4e0b\\n\\n```C#\\n\\npublic class ProduceResponseTypeModelConvention : IApplicationModelConvention\\n{\\n    public void Apply(ApplicationModel application)\\n    {\\n        foreach (var controller in application.Controllers)\\n        {\\n            foreach (var action in controller.Actions)\\n            {\\n                Type? returnType = null;\\n                if (action.ActionMethod.ReturnType.GenericTypeArguments.Any())\\n                {\\n                    if (action.ActionMethod.ReturnType.GenericTypeArguments[0].GetGenericArguments().Any())\\n                    {\\n                        returnType = action.ActionMethod.ReturnType.GenericTypeArguments[0].GetGenericArguments()[0];\\n                    }\\n                }\\n\\n                AddUniversalStatusCodes(action, returnType);\\n                \\n                var actionParametersExist = action.Parameters.Any();\\n                if (actionParametersExist)\\n                {\\n                    AddProducesResponseTypeAttribute(action, typeof(void), StatusCodes.Status404NotFound);\\n                }\\n            }\\n        }\\n\\n        void AddUniversalStatusCodes(ActionModel action, Type? returnType)\\n        {\\n            AddProducesResponseTypeAttribute(action, returnType, StatusCodes.Status200OK);\\n            AddProducesResponseTypeAttribute(\\n                action, typeof(ExceptionResponse), StatusCodes.Status500InternalServerError);\\n        }\\n\\n        void AddProducesResponseTypeAttribute(ActionModel action, Type? returnType, int statusCodeResult)\\n        {\\n            if (returnType != null)\\n            {\\n                action.Filters.Add(new ProducesResponseTypeAttribute(returnType, statusCodeResult));\\n            }\\n            else if (returnType is null)\\n            {\\n                action.Filters.Add(new ProducesResponseTypeAttribute(statusCodeResult));\\n            }\\n        }\\n    }\\n}\\n\\n```\\n\\n```C#\\n\\n// \u64f4\u5145\u529f\u80fd\u6ce8\u5165\\nservice.AddControllers(options =>\\n{\\n    options.Conventions.Add(new ProduceResponseTypeModelConvention());\\n})\\n\\n```\\n\\n## \u53c3\u8003\u8cc7\u6599\u4f86\u6e90\\n\\n[\u5b98\u65b9\u6587\u4ef6\u8aaa\u660e](https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/application-model?view=aspnetcore-6.0)\\n[\u5728Asp.Net Core\u4e2d\u4f7f\u7528ModelConvention\u5b9e\u73b0\u5168\u5c40\u8fc7\u6ee4\u5668\u9694\u79bb](https://www.cnblogs.com/hohoa/p/12134019.html)\\n[Net Core API: Make ProducesResponseType Global Parameter or Automate](https://stackoverflow.com/questions/58047020/net-core-api-make-producesresponsetype-global-parameter-or-automate)"},{"id":"2022-07-21-nuget-package-Enums.NET","metadata":{"permalink":"/en/blog/2022-07-21-nuget-package-Enums.NET","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2022-07-21-nuget-package-Enums.NET.md","source":"@site/blog/2022-07-21-nuget-package-Enums.NET.md","title":"Enums.NET \u4f7f\u7528","description":"\u4f7f\u7528\u539f\u56e0","date":"2022-07-21T00:00:00.000Z","formattedDate":"July 21, 2022","tags":[{"label":"nuget","permalink":"/en/blog/tags/nuget"},{"label":"unittest","permalink":"/en/blog/tags/unittest"},{"label":"Enums.NET","permalink":"/en/blog/tags/enums-net"}],"readingTime":2.065,"truncated":false,"authors":[{"name":"Ray Hsu","title":"C# \u5f8c\u7aef\u5de5\u7a0b\u5e2b","url":"https://github.com/reantoilpc","imageURL":"https://github.com/reantoilpc.png","key":"rayhsu"}],"prevItem":{"title":"Produces Attribute \u5168\u57df\u8a2d\u5b9a","permalink":"/en/blog/2022-08-02-global-produces-attribute"},"nextItem":{"title":"Postman \u74b0\u5883\u8b8a\u6578\u8a2d\u5b9a","permalink":"/en/blog/postman-environment-variable"}},"content":"## \u4f7f\u7528\u539f\u56e0\\n\\n\u6700\u8fd1\u5728\u5354\u52a9\u5718\u968a\u5728\u820a\u7684\u5c08\u6848\u5e95\u4e0b\u958b\u767c\u65b0 API \u529f\u80fd\uff0c\u8a72\u529f\u80fd\u662f\u5f9e\u8cc7\u6599\u5eab\u53d6\u5f97\u8cc7\u6599\u5f8c\uff0c\u7d93\u904e\u904e\u6ffe\u548c\u6574\u7406\u518d\u56de\u50b3\u524d\u7aef\u9801\u9762\u3002\\n\u76ee\u524d\u9047\u5230\u4e00\u500b\u5c0f\u554f\u984c\uff0c\u8a72\u8cc7\u6599\u7684\u67d0\u500b\u6b04\u4f4d\u5b58\u7684\u662f`A`\u3001`D`\u3001`U`\u5728\u524d\u7aef\u9801\u9762\u986f\u793a\u5206\u5225\u65b0\u589e\u3001\u522a\u9664\u3001\u4fee\u6539\uff0c\u5728\u986f\u793a\u4e0a\u90fd\u9700\u8981`HardCode`\u8655\u7406\uff0c\u9019\u6a23\u7684\u5beb\u6cd5\u9020\u6210\u7a0b\u5f0f\u78bc\u7684`\u58de\u5473\u9053\uff08Bad Smell\uff09`\u51fa\u73fe\u3002\\n\\n```C#\\n\\nif (actionStatus == \\"A\\") { retrun \\"\u65b0\u589e\\"; }\\nif (actionStatus == \\"D\\") { retrun \\"\u522a\u9664\\"; }\\nif (actionStatus == \\"U\\") { retrun \\"\u66f4\u65b0\\"; }\\n\\n```\\n\\n## \u58de\u5473\u9053\uff08Bad Smell\uff09\\n\\n\u70ba\u4ec0\u9ebcHardCode\u65b9\u5f0f\uff0c\u6703\u6709\u58de\u5473\u9053\uff08Bad Smell\uff09\u51fa\u73fe\u5462?\\n\u56e0\u70ba\u7576`actionStatus`\u53c8\u589e\u52a0\u4e00\u7a2e\u985e\u578b\uff0c\u4f8b\u5982`Q`\u67e5\u8a62\uff0c\u52e2\u5fc5\u5c31\u8981\u52a0\u4e00\u884c\u7a0b\u5f0f\uff0c\u9019\u6a23\u5c31\u9055\u53cd\u958b\u653e\u5c01\u9589\u539f\u5247\\n\\n## \u6539\u5584\u65b9\u5f0f\\n\\n\u5373\u7136\u8981\u89e3\u6c7aHardCode\u554f\u984c\uff0c\u5c31\u8981\u628a`A`\u3001`D`\u3001`U`\u7684\u5b9a\u7fa9\u8981\u79fb\u5230\u53e6\u4e00\u500bClass\u6216\u662fEnum\u4e0a\u9762\uff0c\u800c\u4e0d\u662f\u6563\u843d\u5728\u5404\u7a0b\u5f0f\u78bc\u88e1\u3002\u76ee\u524d\u60f3\u5230\u6709\u4e8c\u500b\u5957\u4ef6\uff0c\u53ef\u4ee5\u89e3\u6c7a\u6211\u7684\u554f\u984c\\n\\n1. [SmartEnum](https://github.com/ardalis/SmartEnum)\\n2. [Enums.NET](https://github.com/TylerBrinkley/Enums.NET)\\n\\n\u5f8c\u4f86\u6c7a\u5b9a\u4f7f\u7528Enums.NET\uff0c\u539f\u56e0\u662f\\n\\n- \u56e0\u70ba\u820a\u7684\u5c08\u6848\u5df2\u7d93\u5728\u4f7f\u7528Enum\uff0c\u5982\u679c\u5c0e\u5165`SmartEnum`\u65b0\u7684\u505a\u6cd5\u9020\u6210\u7dad\u8b77\u4e0a\u7684\u6df7\u4e82\u3002\\n- Enums.NET\u6bd4\u8f03\u985e\u4f3c\u539f\u6709\u7684Enum\u7684\u4f7f\u7528\u65b9\u5f0f\uff0c\u6bd4\u8f03\u5bb9\u6613\u7406\u89e3\u3002\\n\\n## \u5148\u5efa\u7acb`SymbolAttribute`\u548c`ActionStatusEnum`\\n\\n```C#\\n\\n// SymbolAttribute\\n[AttributeUsage(AttributeTargets.Field)]\\npublic class SymbolAttribute : Attribute\\n{\\n    public string Symbol { get; }\\n\\n    public SymbolAttribute(string symbol)\\n    {\\n        Symbol = symbol;\\n    }\\n}\\n\\n// ActionStatusEnum\\npublic enum ActionStatusEnum\\n{\\n    [Symbol(\\"A\\")]\\n    [Description(\\"\u65b0\u589e\\")]\\n    Add,\\n\\n    [Symbol(\\"D\\")]\\n    [Description(\\"\u522a\u9664\\")]\\n    Delete,\\n\\n    [Symbol(\\"U\\")]\\n    [Description(\\"\u66f4\u65b0\\")]\\n    Update\\n}\\n\\n```\\n\\n## \u4f7f\u7528`Enums.NET`\u53d6\u5f97\u6587\u5b57\u8aaa\u660e\\n\\n```C#\\n\\n// Get SymbolAttribute Format\\nvar symbolFormat = Enums.RegisterCustomEnumFormat(x => x.Attributes.Get<SymbolAttribute>()?.Symbol);\\n\\n// Return Description\\nif (Enums.TryParse<ActionStatusEnum>(actionStatus, false, out var status, symbolFormat))\\n{\\n    return status.AsString(EnumFormat.Description);\\n}\\n\\n```"},{"id":"postman-environment-variable","metadata":{"permalink":"/en/blog/postman-environment-variable","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2022-05-31-postman-set-environment-variable.md","source":"@site/blog/2022-05-31-postman-set-environment-variable.md","title":"Postman \u74b0\u5883\u8b8a\u6578\u8a2d\u5b9a","description":"Postman Environment Variable \u7c21\u4ecb","date":"2022-05-31T00:00:00.000Z","formattedDate":"May 31, 2022","tags":[{"label":"Postman","permalink":"/en/blog/tags/postman"}],"readingTime":1.11,"truncated":false,"authors":[{"name":"Ray Hsu","title":"C# \u5f8c\u7aef\u5de5\u7a0b\u5e2b","url":"https://github.com/reantoilpc","image_url":"https://github.com/reantoilpc.png","imageURL":"https://github.com/reantoilpc.png"}],"prevItem":{"title":"Enums.NET \u4f7f\u7528","permalink":"/en/blog/2022-07-21-nuget-package-Enums.NET"},"nextItem":{"title":"Welcome","permalink":"/en/blog/welcome"}},"content":"## Postman Environment Variable \u7c21\u4ecb\\n\\nPostman \u662f\u4e00\u5957\u6e2c\u8a66 API \u5de5\u5177\uff0c\u85c9\u8457 Environment Variable \u7684\u8a2d\u5b9a\uff0c\u53ef\u4ee5\u5f88\u65b9\u4fbf\u5207\u63db\u74b0\u5883\uff0c\u9032\u884c API \u529f\u80fd\u9a57\u8b49\uff0c\u6982\u5ff5\u5f88\u50cf asp.net \u7684 appsettings\uff0c\u53ea\u8981\u8a2d\u5b9a\u597d\u8981\u7f6e\u63db\u7684\u5167\u5bb9\uff0c\u5c31\u53ef\u4ee5\u4f7f\u7528\u3002\\n\\n## Environment Variable \u8a2d\u5b9a\\n\\n- \u5728 Environment \u8a2d\u5b9a\u4e0d\u540c\u74b0\u5883\\n\\n![image](./pictures/2022-05-31/2022-05-31-environment-variable-01.png)\\n\\n- \u8a2d\u5b9a Variable Name \u548c Value\\n\\n![image](./pictures/2022-05-31/2022-05-31-environment-variable-02.png)\\n\\n- \u4f7f\u7528 Variable \u53d6\u4ee3\u539f\u672c Api Url\\n\\n![image](./pictures/2022-05-31/2022-05-31-environment-variable-03.png)\\n\\n## \u900f\u904e Response \u56de\u5beb Environment Variable\\n\\n\u4f7f\u7528 Postman \u6e2c\u8a66 API \u6703\u8981\u4f7f\u7528 AccessToken \u9032\u884c\u6b0a\u9650\u7684\u9a57\u8b49\uff0c\u56e0\u6b64\u5728\u6e2c\u8a66\u524d\u9700\u8981\u5148\u767b\u5165\u53d6\u5f97 AccessToken \u7136\u5f8c\u8907\u88fd\u8cbc\u4e0a Auth \u5c0d\u61c9\u6b04\u4f4d\uff0c\u6709\u5e7e\u652f API \u5c31\u8981\u8907\u88fd\u5e7e\u6b21\uff0c\u975e\u5e38\u9ebb\u7169\uff0c\u56e0\u6b64\u53ef\u4ee5\u900f\u904e Environment Variable \u7c21\u5316\u91cd\u8907\u8cbc\u4e0a\u7684\u52d5\u4f5c\u3002\\n\\n- \u5148\u8a2d\u5b9a AccessToken \u8b8a\u6578\uff0c\u653e\u5728 Auth \u5c0d\u61c9\u6b04\u4f4d\\n\\n![image](./pictures/2022-05-31/2022-05-31-environment-variable-04.png)\\n\\n- \u5728\u53d6\u5f97 AccessToken API \u7684 Tests \u88e1\u8f38\u5165 Javascript \u8a9e\u6cd5\uff0c\u7576\u6210\u529f\u53d6\u5f97 AccessToken \u56de\u5beb Environment Variable\\n\\n![image](./pictures/2022-05-31/2022-05-31-environment-variable-05.png)\\n\\n```javascript\\nvar jsonData = JSON.parse(responseBody);\\npm.environment.set(\\"AccessToken\\", jsonData);\\n```"},{"id":"welcome","metadata":{"permalink":"/en/blog/welcome","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2021-08-26-welcome/index.md","source":"@site/blog/2021-08-26-welcome/index.md","title":"Welcome","description":"Docusaurus blogging features are powered by the blog plugin.","date":"2021-08-26T00:00:00.000Z","formattedDate":"August 26, 2021","tags":[{"label":"facebook","permalink":"/en/blog/tags/facebook"},{"label":"hello","permalink":"/en/blog/tags/hello"},{"label":"docusaurus","permalink":"/en/blog/tags/docusaurus"}],"readingTime":0.405,"truncated":false,"authors":[{"name":"S\xe9bastien Lorber","title":"Docusaurus maintainer","url":"https://sebastienlorber.com","imageURL":"https://github.com/slorber.png","key":"slorber"},{"name":"Yangshun Tay","title":"Front End Engineer @ Facebook","url":"https://github.com/yangshun","imageURL":"https://github.com/yangshun.png","key":"yangshun"}],"prevItem":{"title":"Postman \u74b0\u5883\u8b8a\u6578\u8a2d\u5b9a","permalink":"/en/blog/postman-environment-variable"},"nextItem":{"title":"MDX Blog Post","permalink":"/en/blog/mdx-blog-post"}},"content":"[Docusaurus blogging features](https://docusaurus.io/docs/blog) are powered by the [blog plugin](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog).\\n\\nSimply add Markdown files (or folders) to the `blog` directory.\\n\\nRegular blog authors can be added to `authors.yml`.\\n\\nThe blog post date can be extracted from filenames, such as:\\n\\n- `2019-05-30-welcome.md`\\n- `2019-05-30-welcome/index.md`\\n\\nA blog post folder can be convenient to co-locate blog post images:\\n\\n![Docusaurus Plushie](./docusaurus-plushie-banner.jpeg)\\n\\nThe blog supports tags as well!\\n\\n**And if you don\'t want a blog**: just delete this directory, and use `blog: false` in your Docusaurus config."},{"id":"mdx-blog-post","metadata":{"permalink":"/en/blog/mdx-blog-post","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2021-08-01-mdx-blog-post.mdx","source":"@site/blog/2021-08-01-mdx-blog-post.mdx","title":"MDX Blog Post","description":"Blog posts support Docusaurus Markdown features, such as MDX.","date":"2021-08-01T00:00:00.000Z","formattedDate":"August 1, 2021","tags":[{"label":"docusaurus","permalink":"/en/blog/tags/docusaurus"}],"readingTime":0.175,"truncated":false,"authors":[{"name":"S\xe9bastien Lorber","title":"Docusaurus maintainer","url":"https://sebastienlorber.com","imageURL":"https://github.com/slorber.png","key":"slorber"}],"prevItem":{"title":"Welcome","permalink":"/en/blog/welcome"},"nextItem":{"title":"Long Blog Post","permalink":"/en/blog/long-blog-post"}},"content":"Blog posts support [Docusaurus Markdown features](https://docusaurus.io/docs/markdown-features), such as [MDX](https://mdxjs.com/).\\n\\n:::tip\\n\\nUse the power of React to create interactive blog posts.\\n\\n```js\\n<button onClick={() => alert(\'button clicked!\')}>Click me!</button>\\n```\\n\\n<button onClick={() => alert(\'button clicked!\')}>Click me!</button>\\n\\n:::"},{"id":"long-blog-post","metadata":{"permalink":"/en/blog/long-blog-post","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2019-05-29-long-blog-post.md","source":"@site/blog/2019-05-29-long-blog-post.md","title":"Long Blog Post","description":"This is the summary of a very long blog post,","date":"2019-05-29T00:00:00.000Z","formattedDate":"May 29, 2019","tags":[{"label":"hello","permalink":"/en/blog/tags/hello"},{"label":"docusaurus","permalink":"/en/blog/tags/docusaurus"}],"readingTime":2.05,"truncated":true,"authors":[{"name":"Endilie Yacop Sucipto","title":"Maintainer of Docusaurus","url":"https://github.com/endiliey","imageURL":"https://github.com/endiliey.png","key":"endi"}],"prevItem":{"title":"MDX Blog Post","permalink":"/en/blog/mdx-blog-post"},"nextItem":{"title":"First Blog Post","permalink":"/en/blog/first-blog-post"}},"content":"This is the summary of a very long blog post,\\n\\nUse a `\x3c!--` `truncate` `--\x3e` comment to limit blog post size in the list view.\\n\\n\x3c!--truncate--\x3e\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"},{"id":"first-blog-post","metadata":{"permalink":"/en/blog/first-blog-post","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2019-05-28-first-blog-post.md","source":"@site/blog/2019-05-28-first-blog-post.md","title":"First Blog Post","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet","date":"2019-05-28T00:00:00.000Z","formattedDate":"May 28, 2019","tags":[{"label":"hola","permalink":"/en/blog/tags/hola"},{"label":"docusaurus","permalink":"/en/blog/tags/docusaurus"}],"readingTime":0.12,"truncated":false,"authors":[{"name":"Gao Wei","title":"Docusaurus Core Team","url":"https://github.com/wgao19","image_url":"https://github.com/wgao19.png","imageURL":"https://github.com/wgao19.png"}],"prevItem":{"title":"Long Blog Post","permalink":"/en/blog/long-blog-post"}},"content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"}]}')}}]);