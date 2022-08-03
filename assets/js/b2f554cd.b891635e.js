"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1477],{10:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"2022-08-02-global-produces-attribute","metadata":{"permalink":"/blog/2022-08-02-global-produces-attribute","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2022-08-02-global-produces-attribute.md","source":"@site/blog/2022-08-02-global-produces-attribute.md","title":"Produces Attribute \u5168\u57df\u8a2d\u5b9a","description":"Application model","date":"2022-08-02T00:00:00.000Z","formattedDate":"2022\u5e748\u67082\u65e5","tags":[{"label":"nuget","permalink":"/blog/tags/nuget"},{"label":"Produces","permalink":"/blog/tags/produces"},{"label":"Attribute","permalink":"/blog/tags/attribute"}],"readingTime":1.45,"truncated":false,"authors":[{"name":"Ray Hsu","title":"C# \u5f8c\u7aef\u5de5\u7a0b\u5e2b","url":"https://github.com/reantoilpc","imageURL":"https://github.com/reantoilpc.png","key":"rayhsu"}],"nextItem":{"title":"Enums.NET \u4f7f\u7528","permalink":"/blog/2022-07-21-nuget-package-Enums.NET"}},"content":"## Application model\\n\\nApplication Model \u5b9a\u7fa9 MVC \u61c9\u7528\u4e2d\u5404\u7a2e\u5c0d\u8c61\u548c\u884c\u70ba\uff0c\u5305\u542bApplication\u3001Controller\u3001Action\u3001Parameter\u3001Router\u3001Page\u3001Property\u3001Filter\u7b49\u7b49\uff0c\u4e0a\u8ff0\u7684\u529f\u80fd\u53ef\u4ee5\u900f\u904e`\u6163\u4f8b`(convention)\u4f86\u64f4\u5145\u5ba2\u88fd\u81ea\u5df1\u7684\u9700\u6c42\uff0c\u4e26\u8a2d\u5b9a\u5168\u57df\u6216\u5c6c\u6027\u4f86\u4f7f\u7528\\n\\nASP.NET Core MVC \u900f\u904e IApplicationModelProvider \u5b9a\u7fa9\u64f4\u5145\u7684\u985e\u5225\u4f86\u8f09\u5165\u61c9\u7528\u7a0b\u5f0f\uff0c\u5b98\u65b9\u5efa\u8b70\u6c92\u6709\u7279\u5225\u9700\u6c42\uff0c\u76e1\u91cf\u4e0d\u4f7f\u7528`provider pattern`\u800c\u662f\u4f7f\u7528`conventions`\u9032\u884c\u529f\u80fd\u64f4\u5145\\n\\n## \u5be6\u4f5c ProduceResponseTypeModelConvention\\n\\n\u5728\u7db2\u8def\u4e0a\u67e5\u5230\u7684\u7a0b\u5f0f\u7bc4\u4f8b\u90fd\u662f\u7e7c\u627f`IApplicationModelProvider`\u56e0\u6b64\u6211\u6539\u7528`IApplicationModelConvention`\u4f86\u5be6\u4f5c\uff0c\u7bc4\u4f8b\u5982\u4e0b\\n\\n```C#\\n\\npublic class ProduceResponseTypeModelConvention : IApplicationModelConvention\\n{\\n    public void Apply(ApplicationModel application)\\n    {\\n        foreach (var controller in application.Controllers)\\n        {\\n            foreach (var action in controller.Actions)\\n            {\\n                Type? returnType = null;\\n                if (action.ActionMethod.ReturnType.GenericTypeArguments.Any())\\n                {\\n                    if (action.ActionMethod.ReturnType.GenericTypeArguments[0].GetGenericArguments().Any())\\n                    {\\n                        returnType = action.ActionMethod.ReturnType.GenericTypeArguments[0].GetGenericArguments()[0];\\n                    }\\n                }\\n\\n                AddUniversalStatusCodes(action, returnType);\\n                \\n                var actionParametersExist = action.Parameters.Any();\\n                if (actionParametersExist)\\n                {\\n                    AddProducesResponseTypeAttribute(action, typeof(void), StatusCodes.Status404NotFound);\\n                }\\n            }\\n        }\\n\\n        void AddUniversalStatusCodes(ActionModel action, Type? returnType)\\n        {\\n            AddProducesResponseTypeAttribute(action, returnType, StatusCodes.Status200OK);\\n            AddProducesResponseTypeAttribute(\\n                action, typeof(ExceptionResponse), StatusCodes.Status500InternalServerError);\\n        }\\n\\n        void AddProducesResponseTypeAttribute(ActionModel action, Type? returnType, int statusCodeResult)\\n        {\\n            if (returnType != null)\\n            {\\n                action.Filters.Add(new ProducesResponseTypeAttribute(returnType, statusCodeResult));\\n            }\\n            else if (returnType is null)\\n            {\\n                action.Filters.Add(new ProducesResponseTypeAttribute(statusCodeResult));\\n            }\\n        }\\n    }\\n}\\n\\n```\\n\\n```C#\\n\\n// \u64f4\u5145\u529f\u80fd\u6ce8\u5165\\nservice.AddControllers(options =>\\n{\\n    options.Conventions.Add(new ProduceResponseTypeModelConvention());\\n})\\n\\n```\\n\\n## \u53c3\u8003\u8cc7\u6599\u4f86\u6e90\\n\\n[\u5b98\u65b9\u6587\u4ef6\u8aaa\u660e](https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/application-model?view=aspnetcore-6.0)\\n[\u5728Asp.Net Core\u4e2d\u4f7f\u7528ModelConvention\u5b9e\u73b0\u5168\u5c40\u8fc7\u6ee4\u5668\u9694\u79bb](https://www.cnblogs.com/hohoa/p/12134019.html)\\n[Net Core API: Make ProducesResponseType Global Parameter or Automate](https://stackoverflow.com/questions/58047020/net-core-api-make-producesresponsetype-global-parameter-or-automate)"},{"id":"2022-07-21-nuget-package-Enums.NET","metadata":{"permalink":"/blog/2022-07-21-nuget-package-Enums.NET","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2022-07-21-nuget-package-Enums.NET.md","source":"@site/blog/2022-07-21-nuget-package-Enums.NET.md","title":"Enums.NET \u4f7f\u7528","description":"\u4f7f\u7528\u539f\u56e0","date":"2022-07-21T00:00:00.000Z","formattedDate":"2022\u5e747\u670821\u65e5","tags":[{"label":"nuget","permalink":"/blog/tags/nuget"},{"label":"unittest","permalink":"/blog/tags/unittest"},{"label":"Enums.NET","permalink":"/blog/tags/enums-net"}],"readingTime":2.065,"truncated":false,"authors":[{"name":"Ray Hsu","title":"C# \u5f8c\u7aef\u5de5\u7a0b\u5e2b","url":"https://github.com/reantoilpc","imageURL":"https://github.com/reantoilpc.png","key":"rayhsu"}],"prevItem":{"title":"Produces Attribute \u5168\u57df\u8a2d\u5b9a","permalink":"/blog/2022-08-02-global-produces-attribute"},"nextItem":{"title":"Postman \u74b0\u5883\u8b8a\u6578\u8a2d\u5b9a","permalink":"/blog/postman-environment-variable"}},"content":"## \u4f7f\u7528\u539f\u56e0\\n\\n\u6700\u8fd1\u5728\u5354\u52a9\u5718\u968a\u5728\u820a\u7684\u5c08\u6848\u5e95\u4e0b\u958b\u767c\u65b0 API \u529f\u80fd\uff0c\u8a72\u529f\u80fd\u662f\u5f9e\u8cc7\u6599\u5eab\u53d6\u5f97\u8cc7\u6599\u5f8c\uff0c\u7d93\u904e\u904e\u6ffe\u548c\u6574\u7406\u518d\u56de\u50b3\u524d\u7aef\u9801\u9762\u3002\\n\u76ee\u524d\u9047\u5230\u4e00\u500b\u5c0f\u554f\u984c\uff0c\u8a72\u8cc7\u6599\u7684\u67d0\u500b\u6b04\u4f4d\u5b58\u7684\u662f`A`\u3001`D`\u3001`U`\u5728\u524d\u7aef\u9801\u9762\u986f\u793a\u5206\u5225\u65b0\u589e\u3001\u522a\u9664\u3001\u4fee\u6539\uff0c\u5728\u986f\u793a\u4e0a\u90fd\u9700\u8981`HardCode`\u8655\u7406\uff0c\u9019\u6a23\u7684\u5beb\u6cd5\u9020\u6210\u7a0b\u5f0f\u78bc\u7684`\u58de\u5473\u9053\uff08Bad Smell\uff09`\u51fa\u73fe\u3002\\n\\n```C#\\n\\nif (actionStatus == \\"A\\") { retrun \\"\u65b0\u589e\\"; }\\nif (actionStatus == \\"D\\") { retrun \\"\u522a\u9664\\"; }\\nif (actionStatus == \\"U\\") { retrun \\"\u66f4\u65b0\\"; }\\n\\n```\\n\\n## \u58de\u5473\u9053\uff08Bad Smell\uff09\\n\\n\u70ba\u4ec0\u9ebcHardCode\u65b9\u5f0f\uff0c\u6703\u6709\u58de\u5473\u9053\uff08Bad Smell\uff09\u51fa\u73fe\u5462?\\n\u56e0\u70ba\u7576`actionStatus`\u53c8\u589e\u52a0\u4e00\u7a2e\u985e\u578b\uff0c\u4f8b\u5982`Q`\u67e5\u8a62\uff0c\u52e2\u5fc5\u5c31\u8981\u52a0\u4e00\u884c\u7a0b\u5f0f\uff0c\u9019\u6a23\u5c31\u9055\u53cd\u958b\u653e\u5c01\u9589\u539f\u5247\\n\\n## \u6539\u5584\u65b9\u5f0f\\n\\n\u5373\u7136\u8981\u89e3\u6c7aHardCode\u554f\u984c\uff0c\u5c31\u8981\u628a`A`\u3001`D`\u3001`U`\u7684\u5b9a\u7fa9\u8981\u79fb\u5230\u53e6\u4e00\u500bClass\u6216\u662fEnum\u4e0a\u9762\uff0c\u800c\u4e0d\u662f\u6563\u843d\u5728\u5404\u7a0b\u5f0f\u78bc\u88e1\u3002\u76ee\u524d\u60f3\u5230\u6709\u4e8c\u500b\u5957\u4ef6\uff0c\u53ef\u4ee5\u89e3\u6c7a\u6211\u7684\u554f\u984c\\n\\n1. [SmartEnum](https://github.com/ardalis/SmartEnum)\\n2. [Enums.NET](https://github.com/TylerBrinkley/Enums.NET)\\n\\n\u5f8c\u4f86\u6c7a\u5b9a\u4f7f\u7528Enums.NET\uff0c\u539f\u56e0\u662f\\n\\n- \u56e0\u70ba\u820a\u7684\u5c08\u6848\u5df2\u7d93\u5728\u4f7f\u7528Enum\uff0c\u5982\u679c\u5c0e\u5165`SmartEnum`\u65b0\u7684\u505a\u6cd5\u9020\u6210\u7dad\u8b77\u4e0a\u7684\u6df7\u4e82\u3002\\n- Enums.NET\u6bd4\u8f03\u985e\u4f3c\u539f\u6709\u7684Enum\u7684\u4f7f\u7528\u65b9\u5f0f\uff0c\u6bd4\u8f03\u5bb9\u6613\u7406\u89e3\u3002\\n\\n## \u5148\u5efa\u7acb`SymbolAttribute`\u548c`ActionStatusEnum`\\n\\n```C#\\n\\n// SymbolAttribute\\n[AttributeUsage(AttributeTargets.Field)]\\npublic class SymbolAttribute : Attribute\\n{\\n    public string Symbol { get; }\\n\\n    public SymbolAttribute(string symbol)\\n    {\\n        Symbol = symbol;\\n    }\\n}\\n\\n// ActionStatusEnum\\npublic enum ActionStatusEnum\\n{\\n    [Symbol(\\"A\\")]\\n    [Description(\\"\u65b0\u589e\\")]\\n    Add,\\n\\n    [Symbol(\\"D\\")]\\n    [Description(\\"\u522a\u9664\\")]\\n    Delete,\\n\\n    [Symbol(\\"U\\")]\\n    [Description(\\"\u66f4\u65b0\\")]\\n    Update\\n}\\n\\n```\\n\\n## \u4f7f\u7528`Enums.NET`\u53d6\u5f97\u6587\u5b57\u8aaa\u660e\\n\\n```C#\\n\\n// Get SymbolAttribute Format\\nvar symbolFormat = Enums.RegisterCustomEnumFormat(x => x.Attributes.Get<SymbolAttribute>()?.Symbol);\\n\\n// Return Description\\nif (Enums.TryParse<ActionStatusEnum>(actionStatus, false, out var status, symbolFormat))\\n{\\n    return status.AsString(EnumFormat.Description);\\n}\\n\\n```"},{"id":"postman-environment-variable","metadata":{"permalink":"/blog/postman-environment-variable","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2022-05-31-postman-set-environment-variable.md","source":"@site/blog/2022-05-31-postman-set-environment-variable.md","title":"Postman \u74b0\u5883\u8b8a\u6578\u8a2d\u5b9a","description":"Postman Environment Variable \u7c21\u4ecb","date":"2022-05-31T00:00:00.000Z","formattedDate":"2022\u5e745\u670831\u65e5","tags":[{"label":"Postman","permalink":"/blog/tags/postman"}],"readingTime":1.11,"truncated":false,"authors":[{"name":"Ray Hsu","title":"C# \u5f8c\u7aef\u5de5\u7a0b\u5e2b","url":"https://github.com/reantoilpc","image_url":"https://github.com/reantoilpc.png","imageURL":"https://github.com/reantoilpc.png"}],"prevItem":{"title":"Enums.NET \u4f7f\u7528","permalink":"/blog/2022-07-21-nuget-package-Enums.NET"},"nextItem":{"title":"Welcome","permalink":"/blog/welcome"}},"content":"## Postman Environment Variable \u7c21\u4ecb\\n\\nPostman \u662f\u4e00\u5957\u6e2c\u8a66 API \u5de5\u5177\uff0c\u85c9\u8457 Environment Variable \u7684\u8a2d\u5b9a\uff0c\u53ef\u4ee5\u5f88\u65b9\u4fbf\u5207\u63db\u74b0\u5883\uff0c\u9032\u884c API \u529f\u80fd\u9a57\u8b49\uff0c\u6982\u5ff5\u5f88\u50cf asp.net \u7684 appsettings\uff0c\u53ea\u8981\u8a2d\u5b9a\u597d\u8981\u7f6e\u63db\u7684\u5167\u5bb9\uff0c\u5c31\u53ef\u4ee5\u4f7f\u7528\u3002\\n\\n## Environment Variable \u8a2d\u5b9a\\n\\n- \u5728 Environment \u8a2d\u5b9a\u4e0d\u540c\u74b0\u5883\\n\\n![image](./pictures/2022-05-31/2022-05-31-environment-variable-01.png)\\n\\n- \u8a2d\u5b9a Variable Name \u548c Value\\n\\n![image](./pictures/2022-05-31/2022-05-31-environment-variable-02.png)\\n\\n- \u4f7f\u7528 Variable \u53d6\u4ee3\u539f\u672c Api Url\\n\\n![image](./pictures/2022-05-31/2022-05-31-environment-variable-03.png)\\n\\n## \u900f\u904e Response \u56de\u5beb Environment Variable\\n\\n\u4f7f\u7528 Postman \u6e2c\u8a66 API \u6703\u8981\u4f7f\u7528 AccessToken \u9032\u884c\u6b0a\u9650\u7684\u9a57\u8b49\uff0c\u56e0\u6b64\u5728\u6e2c\u8a66\u524d\u9700\u8981\u5148\u767b\u5165\u53d6\u5f97 AccessToken \u7136\u5f8c\u8907\u88fd\u8cbc\u4e0a Auth \u5c0d\u61c9\u6b04\u4f4d\uff0c\u6709\u5e7e\u652f API \u5c31\u8981\u8907\u88fd\u5e7e\u6b21\uff0c\u975e\u5e38\u9ebb\u7169\uff0c\u56e0\u6b64\u53ef\u4ee5\u900f\u904e Environment Variable \u7c21\u5316\u91cd\u8907\u8cbc\u4e0a\u7684\u52d5\u4f5c\u3002\\n\\n- \u5148\u8a2d\u5b9a AccessToken \u8b8a\u6578\uff0c\u653e\u5728 Auth \u5c0d\u61c9\u6b04\u4f4d\\n\\n![image](./pictures/2022-05-31/2022-05-31-environment-variable-04.png)\\n\\n- \u5728\u53d6\u5f97 AccessToken API \u7684 Tests \u88e1\u8f38\u5165 Javascript \u8a9e\u6cd5\uff0c\u7576\u6210\u529f\u53d6\u5f97 AccessToken \u56de\u5beb Environment Variable\\n\\n![image](./pictures/2022-05-31/2022-05-31-environment-variable-05.png)\\n\\n```javascript\\nvar jsonData = JSON.parse(responseBody);\\npm.environment.set(\\"AccessToken\\", jsonData);\\n```"},{"id":"welcome","metadata":{"permalink":"/blog/welcome","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2021-08-26-welcome/index.md","source":"@site/blog/2021-08-26-welcome/index.md","title":"Welcome","description":"Docusaurus blogging features are powered by the blog plugin.","date":"2021-08-26T00:00:00.000Z","formattedDate":"2021\u5e748\u670826\u65e5","tags":[{"label":"facebook","permalink":"/blog/tags/facebook"},{"label":"hello","permalink":"/blog/tags/hello"},{"label":"docusaurus","permalink":"/blog/tags/docusaurus"}],"readingTime":0.405,"truncated":false,"authors":[{"name":"S\xe9bastien Lorber","title":"Docusaurus maintainer","url":"https://sebastienlorber.com","imageURL":"https://github.com/slorber.png","key":"slorber"},{"name":"Yangshun Tay","title":"Front End Engineer @ Facebook","url":"https://github.com/yangshun","imageURL":"https://github.com/yangshun.png","key":"yangshun"}],"prevItem":{"title":"Postman \u74b0\u5883\u8b8a\u6578\u8a2d\u5b9a","permalink":"/blog/postman-environment-variable"},"nextItem":{"title":"MDX Blog Post","permalink":"/blog/mdx-blog-post"}},"content":"[Docusaurus blogging features](https://docusaurus.io/docs/blog) are powered by the [blog plugin](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog).\\n\\nSimply add Markdown files (or folders) to the `blog` directory.\\n\\nRegular blog authors can be added to `authors.yml`.\\n\\nThe blog post date can be extracted from filenames, such as:\\n\\n- `2019-05-30-welcome.md`\\n- `2019-05-30-welcome/index.md`\\n\\nA blog post folder can be convenient to co-locate blog post images:\\n\\n![Docusaurus Plushie](./docusaurus-plushie-banner.jpeg)\\n\\nThe blog supports tags as well!\\n\\n**And if you don\'t want a blog**: just delete this directory, and use `blog: false` in your Docusaurus config."},{"id":"mdx-blog-post","metadata":{"permalink":"/blog/mdx-blog-post","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2021-08-01-mdx-blog-post.mdx","source":"@site/blog/2021-08-01-mdx-blog-post.mdx","title":"MDX Blog Post","description":"Blog posts support Docusaurus Markdown features, such as MDX.","date":"2021-08-01T00:00:00.000Z","formattedDate":"2021\u5e748\u67081\u65e5","tags":[{"label":"docusaurus","permalink":"/blog/tags/docusaurus"}],"readingTime":0.175,"truncated":false,"authors":[{"name":"S\xe9bastien Lorber","title":"Docusaurus maintainer","url":"https://sebastienlorber.com","imageURL":"https://github.com/slorber.png","key":"slorber"}],"prevItem":{"title":"Welcome","permalink":"/blog/welcome"},"nextItem":{"title":"Long Blog Post","permalink":"/blog/long-blog-post"}},"content":"Blog posts support [Docusaurus Markdown features](https://docusaurus.io/docs/markdown-features), such as [MDX](https://mdxjs.com/).\\n\\n:::tip\\n\\nUse the power of React to create interactive blog posts.\\n\\n```js\\n<button onClick={() => alert(\'button clicked!\')}>Click me!</button>\\n```\\n\\n<button onClick={() => alert(\'button clicked!\')}>Click me!</button>\\n\\n:::"},{"id":"long-blog-post","metadata":{"permalink":"/blog/long-blog-post","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2019-05-29-long-blog-post.md","source":"@site/blog/2019-05-29-long-blog-post.md","title":"Long Blog Post","description":"This is the summary of a very long blog post,","date":"2019-05-29T00:00:00.000Z","formattedDate":"2019\u5e745\u670829\u65e5","tags":[{"label":"hello","permalink":"/blog/tags/hello"},{"label":"docusaurus","permalink":"/blog/tags/docusaurus"}],"readingTime":2.05,"truncated":true,"authors":[{"name":"Endilie Yacop Sucipto","title":"Maintainer of Docusaurus","url":"https://github.com/endiliey","imageURL":"https://github.com/endiliey.png","key":"endi"}],"prevItem":{"title":"MDX Blog Post","permalink":"/blog/mdx-blog-post"},"nextItem":{"title":"First Blog Post","permalink":"/blog/first-blog-post"}},"content":"This is the summary of a very long blog post,\\n\\nUse a `\x3c!--` `truncate` `--\x3e` comment to limit blog post size in the list view.\\n\\n\x3c!--truncate--\x3e\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"},{"id":"first-blog-post","metadata":{"permalink":"/blog/first-blog-post","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2019-05-28-first-blog-post.md","source":"@site/blog/2019-05-28-first-blog-post.md","title":"First Blog Post","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet","date":"2019-05-28T00:00:00.000Z","formattedDate":"2019\u5e745\u670828\u65e5","tags":[{"label":"hola","permalink":"/blog/tags/hola"},{"label":"docusaurus","permalink":"/blog/tags/docusaurus"}],"readingTime":0.12,"truncated":false,"authors":[{"name":"Gao Wei","title":"Docusaurus Core Team","url":"https://github.com/wgao19","image_url":"https://github.com/wgao19.png","imageURL":"https://github.com/wgao19.png"}],"prevItem":{"title":"Long Blog Post","permalink":"/blog/long-blog-post"}},"content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"}]}')}}]);