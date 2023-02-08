"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6054],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>T});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),s=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=s(e.components);return r.createElement(l.Provider,{value:n},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(t),m=a,T=u["".concat(l,".").concat(m)]||u[m]||d[m]||o;return t?r.createElement(T,i(i({ref:n},p),{},{components:t})):r.createElement(T,i({ref:n},p))}));function T(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=m;var c={};for(var l in n)hasOwnProperty.call(n,l)&&(c[l]=n[l]);c.originalType=e,c[u]="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=t[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},6703:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var r=t(7462),a=(t(7294),t(3905));const o={slug:"2022-08-17-efcore-guide",title:"efcore \u4f7f\u7528\u4ecb\u7d39",authors:"rayhsu",tags:["efcore"]},i=void 0,c={permalink:"/en/blog/2022-08-17-efcore-guide",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2022-08-17-efcore-guide.md",source:"@site/blog/2022-08-17-efcore-guide.md",title:"efcore \u4f7f\u7528\u4ecb\u7d39",description:"EFCore \u5efa\u8b70\u5beb\u6cd5",date:"2022-08-17T00:00:00.000Z",formattedDate:"August 17, 2022",tags:[{label:"efcore",permalink:"/en/blog/tags/efcore"}],readingTime:6.915,truncated:!1,authors:[{name:"Ray Hsu",title:"C# \u5f8c\u7aef\u5de5\u7a0b\u5e2b",url:"https://github.com/reantoilpc",imageURL:"https://github.com/reantoilpc.png",key:"rayhsu"}],nextItem:{title:"Produces Attribute \u5168\u57df\u8a2d\u5b9a",permalink:"/en/blog/2022-08-02-global-produces-attribute"}},l={authorsImageUrls:[void 0]},s=[{value:"EFCore \u5efa\u8b70\u5beb\u6cd5",id:"efcore-\u5efa\u8b70\u5beb\u6cd5",children:[{value:"Repository \u56de\u50b3",id:"repository-\u56de\u50b3",children:[],level:3},{value:"Select \u5fc5\u8981\u6b04\u4f4d",id:"select-\u5fc5\u8981\u6b04\u4f4d",children:[],level:3},{value:"Like \u67e5\u8a62",id:"like-\u67e5\u8a62",children:[],level:3},{value:"Inner Join",id:"inner-join",children:[],level:3},{value:"Left Join",id:"left-join",children:[],level:3},{value:"Group By",id:"group-by",children:[],level:3},{value:"EFCore WithNoLock",id:"efcore-withnolock",children:[],level:3}],level:2},{value:"SaveChanges",id:"savechanges",children:[],level:2}],p={toc:s},u="wrapper";function d(e){let{components:n,...t}=e;return(0,a.kt)(u,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"efcore-\u5efa\u8b70\u5beb\u6cd5"},"EFCore \u5efa\u8b70\u5beb\u6cd5"),(0,a.kt)("h3",{id:"repository-\u56de\u50b3"},"Repository \u56de\u50b3"),(0,a.kt)("p",null,"Repository \u8a2d\u8a08\u6982\u5ff5\uff0c\u5e0c\u671b\u900f\u904e\u50b3\u5165\u689d\u4ef6\u503c\u7be9\u9078\u8cc7\u6599\u51fa\u4f86\u3002\u5982\u679c\u55ae\u7d14\u67e5\u8a62\u4e00\u500b\u8cc7\u6599\u8868\u9019\u6a23\u5beb\u6cd5\u6c92\u6709\u554f\u984c\uff0c\u4f46\u901a\u5e38\u5728\u986f\u793a\u6216\u662f\u8655\u7406\u8cc7\u6599\uff0c\u4e0d\u6703\u53ea\u6709\u67e5\u4e00\u500b\u8cc7\u6599\u8868\uff0c\u5f80\u5f80\u90fd\u8981\u67e5\u8a62\u597d\u5e7e\u500b\u8cc7\u6599\u8868\uff0c\u9032\u884c Join \u5f8c\u624d\u662f\u6211\u5011\u8981\u7684\u7d50\u679c\u3002"),(0,a.kt)("p",null,"\u5982\u679c Repository \u56de\u50b3\u662f IEnumerable\u3001List\u3001Array \u9019\u4e9b\u985e\u578b\uff0c\u7b49\u540c\u65bc\u7acb\u523b\u57f7\u884c\u4e00\u6bb5 SQL \u8a9e\u6cd5\uff0c\u610f\u601d\u5c31\u662f Join \u5e7e\u500b\u8cc7\u6599\u8868\u5c31\u57f7\u884c\u5e7e\u6b21 SQL \u8a9e\u6cd5\uff0c\u9019\u6a23\u5beb\u6cd5\u662f\u5f88\u6d88\u8017\u8cc7\u6599\u5eab\u6548\u80fd\uff0c\u800c\u4e14\u57f7\u884c\u6548\u7387\u4e5f\u6bd4\u8f03\u6162\uff0c\u56e0\u70ba\u662f\u5206\u5225 Query \u8cc7\u6599\u8868\u4e26\u6c92\u6709\u4f7f\u7528\u5230 SQL Join \u529f\u80fd\u3002"),(0,a.kt)("p",null,"\u5728 EFCore \u53ef\u4ee5\u4f7f\u7528 IQueryable \u9032\u884c\u5ef6\u9072\u57f7\u884c\u53d6\u5f97\u8cc7\u6599\uff0c\u610f\u601d\u5c31\u662f\u7121\u8ad6 Join \u5e7e\u500b\u8cc7\u6599\u8868\uff0c\u90fd\u9084\u4e0d\u6703Query \u8cc7\u6599\u8868\uff0c\u800c\u662f\u7b49\u5230 ToListAsync \uff0cEFCore \u624d\u6703\u7522\u751f\u76f8\u5c0d\u61c9\u7684 SQL \u8a9e\u6cd5\uff0c\u9019\u6642\u5019\u5c31\u6703\u7d44\u51fa SQL Join \u8a9e\u6cd5\uff0c\u597d\u8655\u5c31\u662f\u53ea\u5c0d\u8cc7\u6599\u5eab\u67e5\u8a62\u4e00\u6b21\u3001\u800c\u4e14\u662f\u7be9\u9078\u904e\u7684\u8cc7\u6599\uff0c\u5728\u7db2\u8def\u50b3\u8f38\u4e5f\u6703\u6bd4\u8f03\u5feb\u4e00\u4e9b\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-C#"},"    // Bad\n    public IEnumerable<EpkAccAccount> Find(Expression<Func<EpkAccAccount, bool>> expression)\n    {\n        return _context.EpkAccAccount.Where(expression);\n    }\n\n    // Good\n    public IQueryable<EpkAccAccount> FindAsync(Expression<Func<EpkAccAccount, bool>> expression)\n    {\n        return expression == null ? _context.EpkAccAccount : _context.EpkAccAccount.Where(expression);\n    }    \n")),(0,a.kt)("h3",{id:"select-\u5fc5\u8981\u6b04\u4f4d"},"Select \u5fc5\u8981\u6b04\u4f4d"),(0,a.kt)("p",null,"\u4f7f\u7528 SQL \u67e5\u8a62\uff0c\u5b98\u65b9\u4e0d\u5efa\u8b70 ",(0,a.kt)("inlineCode",{parentName:"p"},"select * from table")," \u67e5\u51fa\u6240\u6709\u6b04\u4f4d\uff0c\u53ea\u8981\u91dd\u5c0d\u9700\u8981\u6b04\u4f4d\u5c31\u53ef\u4ee5\u3002\u4f7f\u7528 EFCore \u4e5f\u662f\u5982\u6b64\uff0c\u5982\u679c\u4e0d\u6307\u5b9a\u6b04\u4f4d\uff0c\u76f4\u63a5\u56de\u50b3 Entity \u5c31\u6703\u628a\u6240\u6709\u6b04\u4f4d\u67e5\u8a62\u51fa\u4f86\u3002"),(0,a.kt)("p",null,"\u5efa\u8b70\u5728\u67e5\u8a62\u6642\u5019\uff0c\u91dd\u5c0d\u5fc5\u8981\u6b04\u4f4d\u67e5\u8a62\u5c31\u53ef\u4ee5\uff0c\u624d\u4e0d\u6703\u9020\u6210\u975e\u5fc5\u8981\u67e5\u8a62\u6548\u80fd\u6d6a\u8cbb\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-C#"},'\n    // Bad\n    var epkAccId = "6006746649";\n    IEnumerable<EpkAccAccount> epkAccAccount = _context.EpkAccAccount.Where(x => x.EpkAccId == epkAccId).ToListAsync();\n\n    // Good\n    var epkAccId = "6006746649";\n    IEnumerable<AccountDto> accountDto = _context.EpkAccAccount\n                                        .Where(x => x.EpkAccId == epkAccId)\n                                        .Select(x => new AccountDto \n                                        { \n                                            EpkAccId = x.EpkAccId, Lpr = x.Lpr, IdNo = x.IdNo \n                                        })\n                                        .ToListAsync();\n\n')),(0,a.kt)("h3",{id:"like-\u67e5\u8a62"},"Like \u67e5\u8a62"),(0,a.kt)("p",null,"\u5728 EFCore Link \u67e5\u8a62\uff0c\u4e0d\u5efa\u8b70\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"StartsWith"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"EndsWith"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"Contains")," \u9019\u5e7e\u500b\u95dc\u9375\u5b57\u67e5\u8a62\uff0cEFCore \u4e26\u4e0d\u6703\u8f49\u63db\u6210 SQL Like\uff0c\u53cd\u800c\u6703\u8f49\u63db\u4f7f\u7528 SQL \u51fd\u6578\u67e5\u8a62\uff0c\u96d6\u7136\u67e5\u8a62\u7d50\u679c\u4e00\u6a23\uff0c\u4f46\u7576\u8cc7\u6599\u91cf\u5927\u6642\uff0c\u67e5\u8a62\u7684\u6548\u7387\u5c31\u6703\u8b8a\u5dee\u3002"),(0,a.kt)("p",null,"\u5728 EFCore \u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"StartsWith"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"EndsWith"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"Contains")," \u95dc\u9375\u5b57\u67e5\u8a62\uff0c\u5c0d\u61c9\u7522\u751f SQL \u8a9e\u6cd5"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-SQL"},"\n    -- Contains\n    SELECT [traTx].[TRA_TX_ID], [traTx].[CHANNEL_CODE], [traTx].[TRANSACTION_TIME]\n    FROM [EPK_ACC_TRA_TX] AS [traTx]\n    WHERE CHARINDEX('P96', [traTx].[CHANNEL_CODE]) > 0 OR 'P96' = N''\n\n    -- StartsWith\n    SELECT [traTx].[TRA_TX_ID], [traTx].[CHANNEL_CODE], [traTx].[TRANSACTION_TIME]\n    FROM [EPK_ACC_TRA_TX] AS [traTx]\n    WHERE LEFT([traTx].[CHANNEL_CODE], LEN('P96')) = 'P96' OR 'P96' = N''\n\n    -- EndsWith\n    SELECT [traTx].[TRA_TX_ID], [traTx].[CHANNEL_CODE], [traTx].[TRANSACTION_TIME]\n    FROM [EPK_ACC_TRA_TX] AS [traTx]\n    WHERE RIGHT([traTx].[CHANNEL_CODE], LEN('P96')) = 'P96' OR 'P96' = N''\n\n")),(0,a.kt)("p",null,"\u5982\u679c\u8981 Like \u67e5\u8a62\uff0c\u8acb\u8981\u6539\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"EF.Functions")," \u4f86\u67e5\u8a62\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-C#"},'    // Bad\n    var channelCode = "P96";\n    _context.EpkAccTraTx.Where(x => x.ChannelCode.StartsWith(channelCode));\n\n    // Good\n    var channelCode = "P96";\n    _context.EpkAccTraTx.Where(x => EF.Functions.Like(x.ChannelCode, $"{channelCode}%"));   \n')),(0,a.kt)("h3",{id:"inner-join"},"Inner Join"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-C#"},'\n    var smsHistories = _context.EpkAccSmshistory;\n    var traTxs = _context.EpkAccTraTx;\n\n    var traNoticeViews = await\n    (\n        from sms in smsHistories join traTx in traTxs on sms.TraTxId equals traTx.TraTxId\n        where traTx.ServiceId == 6 && traTx.TransactionCode == "01" \n        select new TraNoticeView\n        {\n            ChannelCode = traTx.ChannelCode,\n            OpenFilter = sms.OpenFilter,\n            TransactionDate = traTx.TransactionTime.Date,\n            Filter = sms.Filter\n        }\n    ).ToListAsync();\n\n')),(0,a.kt)("h3",{id:"left-join"},"Left Join"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-C#"},'\n    var smsHistories = _context.EpkAccSmshistory;\n    var traTxs = _context.EpkAccTraTx;\n\n    var traNoticeViews = await\n    (\n        from sms in smsHistories join traTx in traTxs on sms.TraTxId equals traTx.TraTxId into histories\n        from sms in histories.DefaultIfEmpty()\n        where traTx.ServiceId == 6 && traTx.TransactionCode == "01" \n        select new TraNoticeView\n        {\n            ChannelCode = traTx.ChannelCode,\n            OpenFilter = sms.OpenFilter,\n            TransactionDate = traTx.TransactionTime.Date,\n            Filter = sms.Filter\n        }\n    ).ToListAsync();\n\n')),(0,a.kt)("h3",{id:"group-by"},"Group By"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-C#"},'    var smsHistories = _context.EpkAccSmshistory;\n    var traTxs = _context.EpkAccTraTx;\n\n    var traNoticeViews = await\n    (\n        from sms in smsHistories join traTx in traTxs on sms.TraTxId equals traTx.TraTxId into histories\n        from sms in histories.DefaultIfEmpty()\n        where traTx.ServiceId == 6 && traTx.TransactionCode == "01" \n        select new TraNoticeView\n        {\n            ChannelCode = traTx.ChannelCode,\n            OpenFilter = sms.OpenFilter,\n            TransactionDate = traTx.TransactionTime.Date,\n            Filter = sms.Filter\n        }\n    )\n    .GroupBy(x => new {x.TransactionDate, x.Filter})\n    .ToDictionaryAsync(x => x.Key, x => new TraNoticeArrivalCount\n    {\n        TransactionDate = x.Key.TransactionDate,\n        Filter = x.Key.Filter,\n        ArrivalCount = x.Count()\n    });\n                             \n')),(0,a.kt)("h3",{id:"efcore-withnolock"},"EFCore WithNoLock"),(0,a.kt)("p",null,"\u5728 MS SQL \u4e0b Select \u8a9e\u6cd5\uff0c\u901a\u5e38\u6703\u5efa\u8b70\u52a0\u4e0a",(0,a.kt)("inlineCode",{parentName:"p"},"WithNoLock"),"\uff0c\u907f\u514d Select \u8cc7\u6599\u8868\uff0c\u540c\u6642\u9593\u8a72\u8cc7\u6599\u6b63\u5728\u7570\u52d5\u4e2d\uff0c\u66ab\u6642\u6027\u7684 Lock \u7b49\u5f85\u4f5c\u696d\u5b8c\u6210\u671f\u9593\uff0c\u9020\u6210\u4f7f\u7528\u8005\u9023\u7dda Timeout \u7684\u554f\u984c\u3002"),(0,a.kt)("p",null,"\u96d6\u7136 EFCore \u4e0d\u652f\u63f4\u81ea\u52d5\u88dc\u4e0a WithNoLock \u7684\u8a9e\u6cd5\uff0c\u4f46\u53ef\u4ee5\u900f\u904e",(0,a.kt)("inlineCode",{parentName:"p"},"IsolationLevel"),"\uff08\u4ea4\u6613\u9694\u96e2\u7b49\u7d1a\uff09\u9054\u5230\u540c\u6a23\u7684\u6548\u679c\u3002"),(0,a.kt)("p",null,"\u9694\u96e2\u7b49\u7d1a\u6709\u5206\u9019\u5e7e\u7a2e\uff0c\u5404\u500b\u5dee\u7570\u5982\u4e0b\uff08\u9810\u8a2d\u70baReadCommitted\uff09\uff1a\n| \u9694\u96e2\u7b49\u7d1a | \u8aaa\u660e |\n| -- | -- |\n| Chaos | \u7121\u6cd5\u8986\u5beb\u4f86\u81ea\u9694\u96e2\u7a0b\u5ea6\u66f4\u6df1\u4e4b\u4ea4\u6613\u7684\u66ab\u6b62\u8b8a\u66f4 |\n| ReadCommitted | \u5728\u4ea4\u6613\u671f\u9593\u7121\u6cd5\u8b80\u53d6 Volatile \u8cc7\u6599\uff0c\u4f46\u53ef\u4ee5\u4fee\u6539\u8a72\u8cc7\u6599 |\n| ReadUncommitted | \u5728\u4ea4\u6613\u671f\u9593\u53ef\u4ee5\u8b80\u53d6\u548c\u4fee\u6539 Volatile \u8cc7\u6599\u3002 |\n| RepeatableRead | \u5728\u4ea4\u6613\u671f\u9593\u53ef\u4ee5\u8b80\u53d6 Volatile \u8cc7\u6599\uff0c\u4f46\u7121\u6cd5\u4fee\u6539\u8a72\u8cc7\u6599\u3002 \u5728\u4ea4\u6613\u671f\u9593\u53ef\u4ee5\u52a0\u5165\u65b0\u8cc7\u6599\u3002 |\n| Serializable | \u5728\u4ea4\u6613\u671f\u9593\u53ef\u4ee5\u8b80\u53d6 Volatile \u8cc7\u6599\uff0c\u4f46\u7121\u6cd5\u4fee\u6539\u8a72\u8cc7\u6599\uff0c\u4e14\u4e0d\u80fd\u52a0\u5165\u65b0\u8cc7\u6599\u3002 |\n| Snapshot | \u53ef\u4ee5\u8b80\u53d6 Volatile \u8cc7\u6599\u3002 \u4ea4\u6613\u6703\u5728\u4fee\u6539\u8cc7\u6599\u4e4b\u524d\uff0c\u5148\u9a57\u8b49\u5728\u6700\u521d\u8b80\u53d6\u8cc7\u6599\u5f8c\u662f\u5426\u6709\u53e6\u4e00\u500b\u4ea4\u6613\u5df2\u8b8a\u66f4\u8a72\u8cc7\u6599\u3002 \u5982\u679c\u8cc7\u6599\u5df2\u66f4\u65b0\uff0c\u5247\u6703\u5f15\u767c\u932f\u8aa4\uff0c \u5982\u6b64\u53ef\u5141\u8a31\u4ea4\u6613\u56de\u5230\u5148\u524d\u6240\u8a8d\u53ef\u7684\u8cc7\u6599\u503c\u3002\u7576\u60a8\u5347\u7d1a\u4f7f\u7528 Snapshot \u9694\u96e2\u5c64\u7d1a\u5efa\u7acb\u7684\u4ea4\u6613\u6642\uff0c\u6703\u64f2\u56de\u5177\u6709\u932f\u8aa4\u8a0a\u606f\u300c\u7121\u6cd5\u5347\u7d1a IsolationLevel \u70ba\u5feb\u7167\u7684\u4ea4\u6613\u300d\u7684 InvalidOperationException\u3002 |\n| Unspecified | \u4f7f\u7528\u8207\u6307\u5b9a\u4e0d\u540c\u7684\u9694\u96e2\u7b49\u7d1a\uff0c\u4f46\u7121\u6cd5\u5224\u65b7\u8a72\u7b49\u7d1a\u3002 \u5982\u679c\u8a2d\u5b9a\u9019\u500b\u503c\uff0c\u6703\u64f2\u56de\u4f8b\u5916\u72c0\u6cc1\u3002 |"),(0,a.kt)("p",null,"\u8981\u907f\u514d\u4e0a\u8ff0\u8a72\u554f\u984c\uff0c\u4e00\u822c\u6307\u5b9a\u9694\u96e2\u7b49\u7d1a\u70ba ReadUncommitted\u3002"),(0,a.kt)("p",null,"\u5728\u7a0b\u5f0f\u88e1\u8981\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"WithNoLock"),"\u529f\u80fd\uff0c\u8981\u5148\u5f9e\u4e0b\u8f09",(0,a.kt)("inlineCode",{parentName:"p"},"Fetc.Core.EntityFramewrokCore"),"\u5957\u4ef6\uff0c\u53ea\u8981\u56de\u50b3\u8cc7\u6599\u985e\u578b\u662f",(0,a.kt)("inlineCode",{parentName:"p"},"IQueryable"),"\u5c31\u53ef\u4ee5\u4f7f\u7528\uff0c\u4f7f\u7528\u7bc4\u4f8b\u5982\u4e0b\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-C#"},"\n    var repository = _epkUnitOfWork.GetRepository<EpkExcWhitelist>();\n    var epkWhitelistDtos = repository.GetAll(x => x.UploadDate > startDate && x.UploadDate <= endDate)\n                                     .ToListWithNoLock();\n\n")),(0,a.kt)("h2",{id:"savechanges"},"SaveChanges"),(0,a.kt)("p",null,"EFCore \u662f\u900f\u904e",(0,a.kt)("inlineCode",{parentName:"p"},"DbContext.DbSet<T>"),"\u5c0d\u8cc7\u6599\u9032\u884cAdd\u3001Update\u3001Remov\uff0c\u7576\u4e0b\u9084\u4e0d\u6703\u5beb\u5165\u8cc7\u6599\u5eab\uff0c\u800c\u662f\u5ef6\u9072\u5230",(0,a.kt)("inlineCode",{parentName:"p"},"SaveChanges"),"\u5f8c\u624d\u6703\u771f\u6b63\u5beb\u5165\u8cc7\u6599\u5eab\uff0c\u800c\u6bcf\u6b21\u547c\u53eb",(0,a.kt)("inlineCode",{parentName:"p"},"SaveChanges"),"\u6642\uff0c\u591a\u7b46\u8cc7\u6599\u7570\u52d5\u6307\u4ee4\u6703\u81ea\u52d5\u5305\u6210\u4e00\u500b Transaction\uff0c\u4efb\u4e00\u500b\u52d5\u4f5c\u5931\u6557\u5747\u6703\u89f8\u767c Rollback\u3002"))}d.isMDXComponent=!0}}]);