"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3374],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>g});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),i=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=i(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},k=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,c=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),p=i(n),k=a,g=p["".concat(c,".").concat(k)]||p[k]||m[k]||l;return n?r.createElement(g,s(s({ref:t},u),{},{components:n})):r.createElement(g,s({ref:t},u))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,s=new Array(l);s[0]=k;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o[p]="string"==typeof e?e:a,s[1]=o;for(var i=2;i<l;i++)s[i]=n[i];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}k.displayName="MDXCreateElement"},9407:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>m,frontMatter:()=>l,metadata:()=>o,toc:()=>i});var r=n(7462),a=(n(7294),n(3905));const l={slug:"2023-03-25-lens-with-k8s",title:"\u4f7f\u7528 Lens IDE \u7ba1\u7406 Azure K8s",authors:"rayhsu",tags:["lens","k8s"]},s=void 0,o={permalink:"/en/blog/2023-03-25-lens-with-k8s",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2023-03-25-lens-with-k8s.md",source:"@site/blog/2023-03-25-lens-with-k8s.md",title:"\u4f7f\u7528 Lens IDE \u7ba1\u7406 Azure K8s",description:"\u8d77\u56e0",date:"2023-03-25T00:00:00.000Z",formattedDate:"March 25, 2023",tags:[{label:"lens",permalink:"/en/blog/tags/lens"},{label:"k8s",permalink:"/en/blog/tags/k-8-s"}],readingTime:1.72,truncated:!1,authors:[{name:"Ray Hsu",title:"C# \u5f8c\u7aef\u5de5\u7a0b\u5e2b",url:"https://github.com/reantoilpc",imageURL:"https://github.com/reantoilpc.png",key:"rayhsu"}],nextItem:{title:"\u5efa\u7acb visual studio multiple project template",permalink:"/en/blog/2023-02-22-Create-Multiple-Project-Template"}},c={authorsImageUrls:[void 0]},i=[{value:"\u8d77\u56e0",id:"\u8d77\u56e0",children:[],level:2},{value:"Lens \u5de5\u5177",id:"lens-\u5de5\u5177",children:[],level:2}],u={toc:i},p="wrapper";function m(e){let{components:t,...l}=e;return(0,a.kt)(p,(0,r.Z)({},u,l,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"\u8d77\u56e0"},"\u8d77\u56e0"),(0,a.kt)("p",null,"\u6700\u8fd1\u516c\u53f8\u958b\u59cb\u5c0e\u5165\u5fae\u670d\u52d9\u6982\u5ff5\u5f8c\uff0c\u5de5\u4f5c\u4e0a\u7684\u7dad\u904b\u4e5f\u958b\u59cb\u6709\u4e9b\u8f49\u8b8a\uff0c\u7cfb\u7d71\u7684\u4f48\u7f72\u5f9e\u539f\u672c\u7684\u5730\u7aef\u6539\u6210Azure\u96f2\u7aef\uff0c\u4e26\u4e14\u6253\u5305\u6210",(0,a.kt)("inlineCode",{parentName:"p"},"Container"),"\u4f48\u7f72\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"k8s"),"\u4e0a\uff0c\u56e0\u6b64\u5c31\u9700\u8981\u64f4\u5145\u5de5\u4f5c\u4e0a\u7684\u6280\u80fd\u5305\uff0c\u6700\u5148\u8981\u63d0\u5347\u5c31\u662fk8s\u89c0\u5ff5\u53ca\u5982\u4f55\u7dad\u904b\u5728k8s\u4e0a\u904b\u884c\u7684\u5c08\u6848\u3002"),(0,a.kt)("p",null,"\u6240\u4ee5\u8981\u600e\u9ebc\u900f\u904e\u5de5\u5177\u9023\u5230",(0,a.kt)("inlineCode",{parentName:"p"},"Azure k8s"),"\u5c31\u8b8a\u6210\u5f88\u91cd\u8981\u3002"),(0,a.kt)("h2",{id:"lens-\u5de5\u5177"},"Lens \u5de5\u5177"),(0,a.kt)("p",null,"Step1\n\u5148\u8a3b\u518a\u5e33\u865f\uff0c\u4e26\u4e0b\u8f09 ",(0,a.kt)("a",{parentName:"p",href:"https://k8slens.dev/"},"Lens")),(0,a.kt)("p",null,"Setp2\n\u7531\u65bc k8s \u662f\u5b89\u88dd Azure \u670d\u52d9\u4e0a\uff0c\u56e0\u6b64\u53ef\u4ee5\u900f\u904e\u4e0b\u6307\u4ee4\u65b9\u5f0f\u5c0d Azure \u670d\u52d9\u64cd\u4f5c\uff0c\u4e0b\u8f09\u5b89\u88dd ",(0,a.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/zh-tw/cli/azure/"},"Azure CLI")),(0,a.kt)("p",null,"Setp3\n\u7531\u65bc\u8981\u900f\u904e IDE \u9023\u7dda k8s cluster \u5c31\u5fc5\u9700\u8981\u6709 k8s config \u5167\u5305\u542b Cluster\u3001User\u3001Namespace \u8207\u8eab\u5206\u8a8d\u8b49\u76f8\u95dc\u8cc7\u8a0a\uff0c\u56e0\u6b64\u8981\u900f\u904e Azure CLI \u9032\u884c k8s config \u532f\u51fa"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u958b\u8d77 PowserSell \u4e0b Azure CLI \u6307\u4ee4")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"\n# step 1 \u767b\u5165 Azure\naz login\n\n# step 2 \u53d6\u5f97\u6191\u8b49\uff0c\u6703\u4e0b\u8f09\u6191\u8b49\u8a2d\u5b9a\uff0cAzure \u5df2\u7522\u751f\u597d\u8a9e\u6cd5\uff0c\u53ea\u8981\u53c3\u8003\u4e0b\u5716\uff0c\u8907\u88fd\u6307\u4ee4\u57f7\u884c\u5c31\u53ef\u4ee5\naz aks get-credentials --resource-group <resource group name> --name <k8s name>\n\n")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"image",src:n(4324).Z})),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u532f\u51fa k8s config \u6a94\u6848\u6703\u653e\u81f3 ",(0,a.kt)("inlineCode",{parentName:"li"},"C:\\Users\\{User}\\.kube"),"\uff0c\u683c\u5f0f\u5927\u81f3\u5982\u4e0b")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml"},"apiVersion: v1\nclusters:\n- cluster:\n    certificate-authority-data: <ca-data-here>\n    server: https://your-k8s-cluster.com\n  name: <cluster-name>\ncontexts:\n- context:\n    cluster:  <cluster-name>\n    user:  <cluster-name-user>\n  name:  <cluster-name>\ncurrent-context:  <cluster-name>\nkind: Config\npreferences: {}\nusers:\n- name:  <cluster-name-user>\n  user:\n    token: <secret-token-here>\n")),(0,a.kt)("p",null,"Setp4"),(0,a.kt)("p",null,"Lens \u8b80\u53d6 k8s config"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"image",src:n(9617).Z})),(0,a.kt)("p",null,"\u8b80\u53d6\u6210\u529f\u756b\u9762"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"image",src:n(1965).Z})),(0,a.kt)("p",null,"\u627e\u5230\u7cfb\u7d71\u4f48\u7f72\u7684Pods"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"image",src:n(5580).Z})))}m.isMDXComponent=!0},4324:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/download-k8s-config-8449a4ee79d1a9cc35584edbe994c70e.png"},1965:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/lens-connection-k8s-c0beba068be557de2fe561b920b4bc1f.png"},9617:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/lens-import-config-3aad3042bb29ae4e5dc394c46896fe74.png"},5580:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/lens-with-pods-6d0e756740f1cf77c13723a3025de13c.png"}}]);