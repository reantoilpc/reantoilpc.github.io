---
title: Produces Attribute 全域設定
description: ""
pubDate: 2022-08-02
tags: [nuget, Produces, Attribute]
category: ASP.NET Core
lang: zh-TW
---

## Application model

Application Model 定義 MVC 應用中各種對象和行為，包含Application、Controller、Action、Parameter、Router、Page、Property、Filter等等，上述的功能可以透過`慣例`(convention)來擴充客製自己的需求，並設定全域或屬性來使用

ASP.NET Core MVC 透過 IApplicationModelProvider 定義擴充的類別來載入應用程式，官方建議沒有特別需求，盡量不使用`provider pattern`而是使用`conventions`進行功能擴充

## 實作 ProduceResponseTypeModelConvention

在網路上查到的程式範例都是繼承`IApplicationModelProvider`因此我改用`IApplicationModelConvention`來實作，範例如下

```C#

public class ProduceResponseTypeModelConvention : IApplicationModelConvention
{
    public void Apply(ApplicationModel application)
    {
        foreach (var controller in application.Controllers)
        {
            foreach (var action in controller.Actions)
            {
                Type? returnType = null;
                if (action.ActionMethod.ReturnType.GenericTypeArguments.Any())
                {
                    if (action.ActionMethod.ReturnType.GenericTypeArguments[0].GetGenericArguments().Any())
                    {
                        returnType = action.ActionMethod.ReturnType.GenericTypeArguments[0].GetGenericArguments()[0];
                    }
                }

                AddUniversalStatusCodes(action, returnType);
                
                var actionParametersExist = action.Parameters.Any();
                if (actionParametersExist)
                {
                    AddProducesResponseTypeAttribute(action, typeof(void), StatusCodes.Status404NotFound);
                }
            }
        }

        void AddUniversalStatusCodes(ActionModel action, Type? returnType)
        {
            AddProducesResponseTypeAttribute(action, returnType, StatusCodes.Status200OK);
            AddProducesResponseTypeAttribute(
                action, typeof(ExceptionResponse), StatusCodes.Status500InternalServerError);
        }

        void AddProducesResponseTypeAttribute(ActionModel action, Type? returnType, int statusCodeResult)
        {
            if (returnType != null)
            {
                action.Filters.Add(new ProducesResponseTypeAttribute(returnType, statusCodeResult));
            }
            else if (returnType is null)
            {
                action.Filters.Add(new ProducesResponseTypeAttribute(statusCodeResult));
            }
        }
    }
}

```

```C#

// 擴充功能注入
service.AddControllers(options =>
{
    options.Conventions.Add(new ProduceResponseTypeModelConvention());
})

```

## 參考資料來源

[官方文件說明](https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/application-model?view=aspnetcore-6.0)
[在Asp.Net Core中使用ModelConvention实现全局过滤器隔离](https://www.cnblogs.com/hohoa/p/12134019.html)
[Net Core API: Make ProducesResponseType Global Parameter or Automate](https://stackoverflow.com/questions/58047020/net-core-api-make-producesresponsetype-global-parameter-or-automate)
