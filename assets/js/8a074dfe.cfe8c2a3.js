"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8146],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),m=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=m(e.components);return r.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,u=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),c=m(n),d=a,b=c["".concat(u,".").concat(d)]||c[d]||p[d]||l;return n?r.createElement(b,i(i({ref:t},s),{},{components:n})):r.createElement(b,i({ref:t},s))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,i=new Array(l);i[0]=c;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var m=2;m<l;m++)i[m]=n[m];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},6686:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>p,frontMatter:()=>l,metadata:()=>o,toc:()=>m});var r=n(7462),a=(n(7294),n(3905));const l={slug:"2022-07-21-nuget-package-Enums.NET",title:"Enums.NET \u4f7f\u7528",authors:"rayhsu",tags:["nuget","unittest","Enums.NET"]},i=void 0,o={permalink:"/blog/2022-07-21-nuget-package-Enums.NET",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2022-07-21-nuget-package-Enums.NET.md",source:"@site/blog/2022-07-21-nuget-package-Enums.NET.md",title:"Enums.NET \u4f7f\u7528",description:"\u4f7f\u7528\u539f\u56e0",date:"2022-07-21T00:00:00.000Z",formattedDate:"2022\u5e747\u670821\u65e5",tags:[{label:"nuget",permalink:"/blog/tags/nuget"},{label:"unittest",permalink:"/blog/tags/unittest"},{label:"Enums.NET",permalink:"/blog/tags/enums-net"}],readingTime:2.065,truncated:!1,authors:[{name:"Ray Hsu",title:"C# \u5f8c\u7aef\u5de5\u7a0b\u5e2b",url:"https://github.com/reantoilpc",imageURL:"https://github.com/reantoilpc.png",key:"rayhsu"}],nextItem:{title:"Postman \u74b0\u5883\u8b8a\u6578\u8a2d\u5b9a",permalink:"/blog/postman-environment-variable"}},u={authorsImageUrls:[void 0]},m=[{value:"\u4f7f\u7528\u539f\u56e0",id:"\u4f7f\u7528\u539f\u56e0",children:[],level:2},{value:"\u58de\u5473\u9053\uff08Bad Smell\uff09",id:"\u58de\u5473\u9053bad-smell",children:[],level:2},{value:"\u6539\u5584\u65b9\u5f0f",id:"\u6539\u5584\u65b9\u5f0f",children:[],level:2},{value:"\u5148\u5efa\u7acb<code>SymbolAttribute</code>\u548c<code>ActionStatusEnum</code>",id:"\u5148\u5efa\u7acbsymbolattribute\u548cactionstatusenum",children:[],level:2},{value:"\u4f7f\u7528<code>Enums.NET</code>\u53d6\u5f97\u6587\u5b57\u8aaa\u660e",id:"\u4f7f\u7528enumsnet\u53d6\u5f97\u6587\u5b57\u8aaa\u660e",children:[],level:2}],s={toc:m};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"\u4f7f\u7528\u539f\u56e0"},"\u4f7f\u7528\u539f\u56e0"),(0,a.kt)("p",null,"\u6700\u8fd1\u5728\u5354\u52a9\u5718\u968a\u5728\u820a\u7684\u5c08\u6848\u5e95\u4e0b\u958b\u767c\u65b0 API \u529f\u80fd\uff0c\u8a72\u529f\u80fd\u662f\u5f9e\u8cc7\u6599\u5eab\u53d6\u5f97\u8cc7\u6599\u5f8c\uff0c\u7d93\u904e\u904e\u6ffe\u548c\u6574\u7406\u518d\u56de\u50b3\u524d\u7aef\u9801\u9762\u3002\n\u76ee\u524d\u9047\u5230\u4e00\u500b\u5c0f\u554f\u984c\uff0c\u8a72\u8cc7\u6599\u7684\u67d0\u500b\u6b04\u4f4d\u5b58\u7684\u662f",(0,a.kt)("inlineCode",{parentName:"p"},"A"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"D"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"U"),"\u5728\u524d\u7aef\u9801\u9762\u986f\u793a\u5206\u5225\u65b0\u589e\u3001\u522a\u9664\u3001\u4fee\u6539\uff0c\u5728\u986f\u793a\u4e0a\u90fd\u9700\u8981",(0,a.kt)("inlineCode",{parentName:"p"},"HardCode"),"\u8655\u7406\uff0c\u9019\u6a23\u7684\u5beb\u6cd5\u9020\u6210\u7a0b\u5f0f\u78bc\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"\u58de\u5473\u9053\uff08Bad Smell\uff09"),"\u51fa\u73fe\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-C#"},'\nif (actionStatus == "A") { retrun "\u65b0\u589e"; }\nif (actionStatus == "D") { retrun "\u522a\u9664"; }\nif (actionStatus == "U") { retrun "\u66f4\u65b0"; }\n\n')),(0,a.kt)("h2",{id:"\u58de\u5473\u9053bad-smell"},"\u58de\u5473\u9053\uff08Bad Smell\uff09"),(0,a.kt)("p",null,"\u70ba\u4ec0\u9ebcHardCode\u65b9\u5f0f\uff0c\u6703\u6709\u58de\u5473\u9053\uff08Bad Smell\uff09\u51fa\u73fe\u5462?\n\u56e0\u70ba\u7576",(0,a.kt)("inlineCode",{parentName:"p"},"actionStatus"),"\u53c8\u589e\u52a0\u4e00\u7a2e\u985e\u578b\uff0c\u4f8b\u5982",(0,a.kt)("inlineCode",{parentName:"p"},"Q"),"\u67e5\u8a62\uff0c\u52e2\u5fc5\u5c31\u8981\u52a0\u4e00\u884c\u7a0b\u5f0f\uff0c\u9019\u6a23\u5c31\u9055\u53cd\u958b\u653e\u5c01\u9589\u539f\u5247"),(0,a.kt)("h2",{id:"\u6539\u5584\u65b9\u5f0f"},"\u6539\u5584\u65b9\u5f0f"),(0,a.kt)("p",null,"\u5373\u7136\u8981\u89e3\u6c7aHardCode\u554f\u984c\uff0c\u5c31\u8981\u628a",(0,a.kt)("inlineCode",{parentName:"p"},"A"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"D"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"U"),"\u7684\u5b9a\u7fa9\u8981\u79fb\u5230\u53e6\u4e00\u500bClass\u6216\u662fEnum\u4e0a\u9762\uff0c\u800c\u4e0d\u662f\u6563\u843d\u5728\u5404\u7a0b\u5f0f\u78bc\u88e1\u3002\u76ee\u524d\u60f3\u5230\u6709\u4e8c\u500b\u5957\u4ef6\uff0c\u53ef\u4ee5\u89e3\u6c7a\u6211\u7684\u554f\u984c"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/ardalis/SmartEnum"},"SmartEnum")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/TylerBrinkley/Enums.NET"},"Enums.NET"))),(0,a.kt)("p",null,"\u5f8c\u4f86\u6c7a\u5b9a\u4f7f\u7528Enums.NET\uff0c\u539f\u56e0\u662f"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u56e0\u70ba\u820a\u7684\u5c08\u6848\u5df2\u7d93\u5728\u4f7f\u7528Enum\uff0c\u5982\u679c\u5c0e\u5165",(0,a.kt)("inlineCode",{parentName:"li"},"SmartEnum"),"\u65b0\u7684\u505a\u6cd5\u9020\u6210\u7dad\u8b77\u4e0a\u7684\u6df7\u4e82\u3002"),(0,a.kt)("li",{parentName:"ul"},"Enums.NET\u6bd4\u8f03\u985e\u4f3c\u539f\u6709\u7684Enum\u7684\u4f7f\u7528\u65b9\u5f0f\uff0c\u6bd4\u8f03\u5bb9\u6613\u7406\u89e3\u3002")),(0,a.kt)("h2",{id:"\u5148\u5efa\u7acbsymbolattribute\u548cactionstatusenum"},"\u5148\u5efa\u7acb",(0,a.kt)("inlineCode",{parentName:"h2"},"SymbolAttribute"),"\u548c",(0,a.kt)("inlineCode",{parentName:"h2"},"ActionStatusEnum")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-C#"},'\n// SymbolAttribute\n[AttributeUsage(AttributeTargets.Field)]\npublic class SymbolAttribute : Attribute\n{\n    public string Symbol { get; }\n\n    public SymbolAttribute(string symbol)\n    {\n        Symbol = symbol;\n    }\n}\n\n// ActionStatusEnum\npublic enum ActionStatusEnum\n{\n    [Symbol("A")]\n    [Description("\u65b0\u589e")]\n    Add,\n\n    [Symbol("D")]\n    [Description("\u522a\u9664")]\n    Delete,\n\n    [Symbol("U")]\n    [Description("\u66f4\u65b0")]\n    Update\n}\n\n')),(0,a.kt)("h2",{id:"\u4f7f\u7528enumsnet\u53d6\u5f97\u6587\u5b57\u8aaa\u660e"},"\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"h2"},"Enums.NET"),"\u53d6\u5f97\u6587\u5b57\u8aaa\u660e"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-C#"},"\n// Get SymbolAttribute Format\nvar symbolFormat = Enums.RegisterCustomEnumFormat(x => x.Attributes.Get<SymbolAttribute>()?.Symbol);\n\n// Return Description\nif (Enums.TryParse<ActionStatusEnum>(actionStatus, false, out var status, symbolFormat))\n{\n    return status.AsString(EnumFormat.Description);\n}\n\n")))}p.isMDXComponent=!0}}]);