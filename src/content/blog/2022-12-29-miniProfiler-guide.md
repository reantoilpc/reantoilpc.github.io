---
title: miniProfiler 使用介紹
description: ""
pubDate: 2022-12-29
tags: [miniProfiler]
lang: zh-TW
---

## 使用原因

最近協助團隊優化排程執行效率，想要解決執行效率不好問題，就需要知道問題出在那個環節才能進行修正。過去在處理這類問題，都是用肉眼看程式碼和經驗來判斷，而這樣方式很沒有效率，而且不一定改對方向，反而花大量時間卻沒有解決真正問題。

為了有效率的找出問題點在那裡，導入`miniProfiler`該套件，該套件不止可以有效記錄程式執行所花費時間，更可以記錄SQL執行花費時間及產生相對的語法，方便調整SQL語法。

## MiniProfiler 介紹

MiniProfiler 是一個專門分析應用系統和UI介面的工具，透過工具可以解析出程式所花費時間，以及執行那些程式碼，有這些內容可以幫助我們調整優化系統效能。

## 如何使用

安裝相關套件

- MiniProfiler.AspNetCore
- MiniProfiler.AspNetCore.Mvc
- MiniProfiler.EntityFrameworkCore

[監控路徑](https://localhost:64137/profiler/results-index)

Startup.cs 設定

```C#

    services.AddMiniProfiler(options =>
    {
        //訪問地址路由根目錄；預設為：/mini-profiler-resources
        options.RouteBasePath = "/profiler";
        //資料快取時間
        (options.Storage as MemoryCacheStorage).CacheDuration = TimeSpan.FromMinutes(3);
        //sql格式化設定
        options.SqlFormatter = new InlineFormatter();
        //跟蹤連線開啟關閉
        options.TrackConnectionOpenClose = true;
        //介面主題顏色方案;預設淺色
        options.ColorScheme = ColorScheme.Dark;
        //.net core 3.0以上：對MVC過濾器進行分析
        // options.EnableMvcFilterProfiling = true;
        //對檢視進行分析
        // options.EnableMvcViewProfiling = true;

        //控制訪問頁面授權，預設所有人都能訪問
        //options.ResultsAuthorize;
        //要控制分析哪些請求，預設說有請求都分析
        //options.ShouldProfile;

        //內部異常處理
        //options.OnInternalError = e => MyExceptionLogger(e);
        options.IgnorePath("/health");
        options.IgnorePath("/swagger");

    }).AddEntityFramework();
    
    
    app.UseMiniProfiler();

```

## 用法

```C#
    var miniProfiler = MiniProfiler.StartNew("更新服務的支付工具");
    using (miniProfiler.Step("RefreshSubscribedService"))
    {
        // 監控的程式碼
    }
    miniProfiler.Stop();
```

## 使用套件

使用 AOP 套件建立 MiniProfiler.Extensions 套件

```C#

    [Profiler("Test","RefreshSubscribedService")]
    public async Task<bool> RefreshSubscribedService(string Id)
    {
        
    }

```
