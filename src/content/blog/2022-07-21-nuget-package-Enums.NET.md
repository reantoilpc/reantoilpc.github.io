---
title: Enums.NET 使用
description: ""
pubDate: 2022-07-21
tags: [nuget, unittest, Enums.NET]
lang: zh-TW
---

## 使用原因

最近在協助團隊在舊的專案底下開發新 API 功能，該功能是從資料庫取得資料後，經過過濾和整理再回傳前端頁面。
目前遇到一個小問題，該資料的某個欄位存的是`A`、`D`、`U`在前端頁面顯示分別新增、刪除、修改，在顯示上都需要`HardCode`處理，這樣的寫法造成程式碼的`壞味道（Bad Smell）`出現。

```C#

if (actionStatus == "A") { retrun "新增"; }
if (actionStatus == "D") { retrun "刪除"; }
if (actionStatus == "U") { retrun "更新"; }

```

## 壞味道（Bad Smell）

為什麼HardCode方式，會有壞味道（Bad Smell）出現呢?
因為當`actionStatus`又增加一種類型，例如`Q`查詢，勢必就要加一行程式，這樣就違反開放封閉原則

## 改善方式

即然要解決HardCode問題，就要把`A`、`D`、`U`的定義要移到另一個Class或是Enum上面，而不是散落在各程式碼裡。目前想到有二個套件，可以解決我的問題

1. [SmartEnum](https://github.com/ardalis/SmartEnum)
2. [Enums.NET](https://github.com/TylerBrinkley/Enums.NET)

後來決定使用Enums.NET，原因是

- 因為舊的專案已經在使用Enum，如果導入`SmartEnum`新的做法造成維護上的混亂。
- Enums.NET比較類似原有的Enum的使用方式，比較容易理解。

## 先建立`SymbolAttribute`和`ActionStatusEnum`

```C#

// SymbolAttribute
[AttributeUsage(AttributeTargets.Field)]
public class SymbolAttribute : Attribute
{
    public string Symbol { get; }

    public SymbolAttribute(string symbol)
    {
        Symbol = symbol;
    }
}

// ActionStatusEnum
public enum ActionStatusEnum
{
    [Symbol("A")]
    [Description("新增")]
    Add,

    [Symbol("D")]
    [Description("刪除")]
    Delete,

    [Symbol("U")]
    [Description("更新")]
    Update
}

```

## 使用`Enums.NET`取得文字說明

```C#

// Get SymbolAttribute Format
var symbolFormat = Enums.RegisterCustomEnumFormat(x => x.Attributes.Get<SymbolAttribute>()?.Symbol);

// Return Description
if (Enums.TryParse<ActionStatusEnum>(actionStatus, false, out var status, symbolFormat))
{
    return status.AsString(EnumFormat.Description);
}

```
