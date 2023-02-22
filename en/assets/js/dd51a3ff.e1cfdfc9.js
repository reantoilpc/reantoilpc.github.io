"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9864],{3905:(e,r,n)=>{n.d(r,{Zo:()=>c,kt:()=>d});var t=n(7294);function i(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function o(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function l(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?o(Object(n),!0).forEach((function(r){i(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function a(e,r){if(null==e)return{};var n,t,i=function(e,r){if(null==e)return{};var n,t,i={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(i[n]=e[n]);return i}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=t.createContext({}),u=function(e){var r=t.useContext(p),n=r;return e&&(n="function"==typeof e?e(r):l(l({},r),e)),n},c=function(e){var r=u(e.components);return t.createElement(p.Provider,{value:r},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},f=t.forwardRef((function(e,r){var n=e.components,i=e.mdxType,o=e.originalType,p=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),s=u(n),f=i,d=s["".concat(p,".").concat(f)]||s[f]||m[f]||o;return n?t.createElement(d,l(l({ref:r},c),{},{components:n})):t.createElement(d,l({ref:r},c))}));function d(e,r){var n=arguments,i=r&&r.mdxType;if("string"==typeof e||i){var o=n.length,l=new Array(o);l[0]=f;var a={};for(var p in r)hasOwnProperty.call(r,p)&&(a[p]=r[p]);a.originalType=e,a[s]="string"==typeof e?e:i,l[1]=a;for(var u=2;u<o;u++)l[u]=n[u];return t.createElement.apply(null,l)}return t.createElement.apply(null,n)}f.displayName="MDXCreateElement"},201:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>p,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>a,toc:()=>u});var t=n(7462),i=(n(7294),n(3905));const o={slug:"2022-12-29-miniProfiler-guide",title:"miniProfiler \u4f7f\u7528\u4ecb\u7d39",authors:"rayhsu",tags:["miniProfiler"]},l=void 0,a={permalink:"/en/blog/2022-12-29-miniProfiler-guide",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2022-12-29-miniProfiler-guide.md",source:"@site/blog/2022-12-29-miniProfiler-guide.md",title:"miniProfiler \u4f7f\u7528\u4ecb\u7d39",description:"\u4f7f\u7528\u539f\u56e0",date:"2022-12-29T00:00:00.000Z",formattedDate:"December 29, 2022",tags:[{label:"miniProfiler",permalink:"/en/blog/tags/mini-profiler"}],readingTime:2.375,truncated:!1,authors:[{name:"Ray Hsu",title:"C# \u5f8c\u7aef\u5de5\u7a0b\u5e2b",url:"https://github.com/reantoilpc",imageURL:"https://github.com/reantoilpc.png",key:"rayhsu"}],prevItem:{title:"\u5efa\u7acb visual studio multiple project template",permalink:"/en/blog/2023-02-22-Create-Multiple-Project-Template"},nextItem:{title:"github unitofwork \u4f7f\u7528\u4ecb\u7d39",permalink:"/en/blog/2022-11-02-github-unitofwork"}},p={authorsImageUrls:[void 0]},u=[{value:"\u4f7f\u7528\u539f\u56e0",id:"\u4f7f\u7528\u539f\u56e0",children:[],level:2},{value:"MiniProfiler \u4ecb\u7d39",id:"miniprofiler-\u4ecb\u7d39",children:[],level:2},{value:"\u5982\u4f55\u4f7f\u7528",id:"\u5982\u4f55\u4f7f\u7528",children:[],level:2},{value:"\u7528\u6cd5",id:"\u7528\u6cd5",children:[],level:2},{value:"\u4f7f\u7528\u5957\u4ef6",id:"\u4f7f\u7528\u5957\u4ef6",children:[],level:2}],c={toc:u},s="wrapper";function m(e){let{components:r,...n}=e;return(0,i.kt)(s,(0,t.Z)({},c,n,{components:r,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"\u4f7f\u7528\u539f\u56e0"},"\u4f7f\u7528\u539f\u56e0"),(0,i.kt)("p",null,"\u6700\u8fd1\u5354\u52a9\u5718\u968a\u512a\u5316\u6392\u7a0b\u57f7\u884c\u6548\u7387\uff0c\u60f3\u8981\u89e3\u6c7a\u57f7\u884c\u6548\u7387\u4e0d\u597d\u554f\u984c\uff0c\u5c31\u9700\u8981\u77e5\u9053\u554f\u984c\u51fa\u5728\u90a3\u500b\u74b0\u7bc0\u624d\u80fd\u9032\u884c\u4fee\u6b63\u3002\u904e\u53bb\u5728\u8655\u7406\u9019\u985e\u554f\u984c\uff0c\u90fd\u662f\u7528\u8089\u773c\u770b\u7a0b\u5f0f\u78bc\u548c\u7d93\u9a57\u4f86\u5224\u65b7\uff0c\u800c\u9019\u6a23\u65b9\u5f0f\u5f88\u6c92\u6709\u6548\u7387\uff0c\u800c\u4e14\u4e0d\u4e00\u5b9a\u6539\u5c0d\u65b9\u5411\uff0c\u53cd\u800c\u82b1\u5927\u91cf\u6642\u9593\u537b\u6c92\u6709\u89e3\u6c7a\u771f\u6b63\u554f\u984c\u3002"),(0,i.kt)("p",null,"\u70ba\u4e86\u6709\u6548\u7387\u7684\u627e\u51fa\u554f\u984c\u9ede\u5728\u90a3\u88e1\uff0c\u5c0e\u5165",(0,i.kt)("inlineCode",{parentName:"p"},"miniProfiler"),"\u8a72\u5957\u4ef6\uff0c\u8a72\u5957\u4ef6\u4e0d\u6b62\u53ef\u4ee5\u6709\u6548\u8a18\u9304\u7a0b\u5f0f\u57f7\u884c\u6240\u82b1\u8cbb\u6642\u9593\uff0c\u66f4\u53ef\u4ee5\u8a18\u9304SQL\u57f7\u884c\u82b1\u8cbb\u6642\u9593\u53ca\u7522\u751f\u76f8\u5c0d\u7684\u8a9e\u6cd5\uff0c\u65b9\u4fbf\u8abf\u6574SQL\u8a9e\u6cd5\u3002"),(0,i.kt)("h2",{id:"miniprofiler-\u4ecb\u7d39"},"MiniProfiler \u4ecb\u7d39"),(0,i.kt)("p",null,"MiniProfiler \u662f\u4e00\u500b\u5c08\u9580\u5206\u6790\u61c9\u7528\u7cfb\u7d71\u548cUI\u4ecb\u9762\u7684\u5de5\u5177\uff0c\u900f\u904e\u5de5\u5177\u53ef\u4ee5\u89e3\u6790\u51fa\u7a0b\u5f0f\u6240\u82b1\u8cbb\u6642\u9593\uff0c\u4ee5\u53ca\u57f7\u884c\u90a3\u4e9b\u7a0b\u5f0f\u78bc\uff0c\u6709\u9019\u4e9b\u5167\u5bb9\u53ef\u4ee5\u5e6b\u52a9\u6211\u5011\u8abf\u6574\u512a\u5316\u7cfb\u7d71\u6548\u80fd\u3002"),(0,i.kt)("h2",{id:"\u5982\u4f55\u4f7f\u7528"},"\u5982\u4f55\u4f7f\u7528"),(0,i.kt)("p",null,"\u5b89\u88dd\u76f8\u95dc\u5957\u4ef6"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"MiniProfiler.AspNetCore"),(0,i.kt)("li",{parentName:"ul"},"MiniProfiler.AspNetCore.Mvc"),(0,i.kt)("li",{parentName:"ul"},"MiniProfiler.EntityFrameworkCore")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://localhost:64137/profiler/results-index"},"\u76e3\u63a7\u8def\u5f91")),(0,i.kt)("p",null,"Startup.cs \u8a2d\u5b9a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-C#"},'\n    services.AddMiniProfiler(options =>\n    {\n        //\u8a2a\u554f\u5730\u5740\u8def\u7531\u6839\u76ee\u9304\uff1b\u9810\u8a2d\u70ba\uff1a/mini-profiler-resources\n        options.RouteBasePath = "/profiler";\n        //\u8cc7\u6599\u5feb\u53d6\u6642\u9593\n        (options.Storage as MemoryCacheStorage).CacheDuration = TimeSpan.FromMinutes(3);\n        //sql\u683c\u5f0f\u5316\u8a2d\u5b9a\n        options.SqlFormatter = new InlineFormatter();\n        //\u8ddf\u8e64\u9023\u7dda\u958b\u555f\u95dc\u9589\n        options.TrackConnectionOpenClose = true;\n        //\u4ecb\u9762\u4e3b\u984c\u984f\u8272\u65b9\u6848;\u9810\u8a2d\u6dfa\u8272\n        options.ColorScheme = ColorScheme.Dark;\n        //.net core 3.0\u4ee5\u4e0a\uff1a\u5c0dMVC\u904e\u6ffe\u5668\u9032\u884c\u5206\u6790\n        // options.EnableMvcFilterProfiling = true;\n        //\u5c0d\u6aa2\u8996\u9032\u884c\u5206\u6790\n        // options.EnableMvcViewProfiling = true;\n\n        //\u63a7\u5236\u8a2a\u554f\u9801\u9762\u6388\u6b0a\uff0c\u9810\u8a2d\u6240\u6709\u4eba\u90fd\u80fd\u8a2a\u554f\n        //options.ResultsAuthorize;\n        //\u8981\u63a7\u5236\u5206\u6790\u54ea\u4e9b\u8acb\u6c42\uff0c\u9810\u8a2d\u8aaa\u6709\u8acb\u6c42\u90fd\u5206\u6790\n        //options.ShouldProfile;\n\n        //\u5167\u90e8\u7570\u5e38\u8655\u7406\n        //options.OnInternalError = e => MyExceptionLogger(e);\n        options.IgnorePath("/health");\n        options.IgnorePath("/swagger");\n\n    }).AddEntityFramework();\n    \n    \n    app.UseMiniProfiler();\n\n')),(0,i.kt)("h2",{id:"\u7528\u6cd5"},"\u7528\u6cd5"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-C#"},'    var miniProfiler = MiniProfiler.StartNew("\u66f4\u65b0\u670d\u52d9\u7684\u652f\u4ed8\u5de5\u5177");\n    using (miniProfiler.Step("RefreshSubscribedService"))\n    {\n        // \u76e3\u63a7\u7684\u7a0b\u5f0f\u78bc\n    }\n    miniProfiler.Stop();\n')),(0,i.kt)("h2",{id:"\u4f7f\u7528\u5957\u4ef6"},"\u4f7f\u7528\u5957\u4ef6"),(0,i.kt)("p",null,"\u4f7f\u7528 AOP \u5957\u4ef6\u5efa\u7acb MiniProfiler.Extensions \u5957\u4ef6"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-C#"},'\n    [Profiler("Test","RefreshSubscribedService")]\n    public async Task<bool> RefreshSubscribedService(string Id)\n    {\n        \n    }\n\n')))}m.isMDXComponent=!0}}]);