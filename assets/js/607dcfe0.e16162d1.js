"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2036],{3905:(A,e,t)=>{t.d(e,{Zo:()=>m,kt:()=>v});var a=t(7294);function n(A,e,t){return e in A?Object.defineProperty(A,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):A[e]=t,A}function l(A,e){var t=Object.keys(A);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(A);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(A,e).enumerable}))),t.push.apply(t,a)}return t}function r(A){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?l(Object(t),!0).forEach((function(e){n(A,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(A,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(e){Object.defineProperty(A,e,Object.getOwnPropertyDescriptor(t,e))}))}return A}function p(A,e){if(null==A)return{};var t,a,n=function(A,e){if(null==A)return{};var t,a,n={},l=Object.keys(A);for(a=0;a<l.length;a++)t=l[a],e.indexOf(t)>=0||(n[t]=A[t]);return n}(A,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(A);for(a=0;a<l.length;a++)t=l[a],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(A,t)&&(n[t]=A[t])}return n}var u=a.createContext({}),o=function(A){var e=a.useContext(u),t=e;return A&&(t="function"==typeof A?A(e):r(r({},e),A)),t},m=function(A){var e=o(A.components);return a.createElement(u.Provider,{value:e},A.children)},f="mdxType",c={inlineCode:"code",wrapper:function(A){var e=A.children;return a.createElement(a.Fragment,{},e)}},d=a.forwardRef((function(A,e){var t=A.components,n=A.mdxType,l=A.originalType,u=A.parentName,m=p(A,["components","mdxType","originalType","parentName"]),f=o(t),d=n,v=f["".concat(u,".").concat(d)]||f[d]||c[d]||l;return t?a.createElement(v,r(r({ref:e},m),{},{components:t})):a.createElement(v,r({ref:e},m))}));function v(A,e){var t=arguments,n=e&&e.mdxType;if("string"==typeof A||n){var l=t.length,r=new Array(l);r[0]=d;var p={};for(var u in e)hasOwnProperty.call(e,u)&&(p[u]=e[u]);p.originalType=A,p[f]="string"==typeof A?A:n,r[1]=p;for(var o=2;o<l;o++)r[o]=t[o];return a.createElement.apply(null,r)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},5492:(A,e,t)=>{t.r(e),t.d(e,{assets:()=>u,contentTitle:()=>r,default:()=>c,frontMatter:()=>l,metadata:()=>p,toc:()=>o});var a=t(7462),n=(t(7294),t(3905));const l={slug:"2023-02-22-Create-Multiple-Project-Template",title:"\u5efa\u7acb visual studio multiple project template",authors:"rayhsu",tags:["visual studio","template"]},r=void 0,p={permalink:"/blog/2023-02-22-Create-Multiple-Project-Template",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2023-02-22-Create-Multiple-Project-Template.md",source:"@site/blog/2023-02-22-Create-Multiple-Project-Template.md",title:"\u5efa\u7acb visual studio multiple project template",description:"\u8d77\u56e0",date:"2023-02-22T00:00:00.000Z",formattedDate:"2023\u5e742\u670822\u65e5",tags:[{label:"visual studio",permalink:"/blog/tags/visual-studio"},{label:"template",permalink:"/blog/tags/template"}],readingTime:2.205,truncated:!1,authors:[{name:"Ray Hsu",title:"C# \u5f8c\u7aef\u5de5\u7a0b\u5e2b",url:"https://github.com/reantoilpc",imageURL:"https://github.com/reantoilpc.png",key:"rayhsu"}],nextItem:{title:"miniProfiler \u4f7f\u7528\u4ecb\u7d39",permalink:"/blog/2022-12-29-miniProfiler-guide"}},u={authorsImageUrls:[void 0]},o=[{value:"\u8d77\u56e0",id:"\u8d77\u56e0",children:[],level:2},{value:"\u5c08\u6848\u532f\u51fa",id:"\u5c08\u6848\u532f\u51fa",children:[],level:2},{value:"\u8a2d\u5b9a template \u8a2d\u5b9a",id:"\u8a2d\u5b9a-template-\u8a2d\u5b9a",children:[],level:2},{value:"\u5efa\u7acb\u7cfb\u7d71\u7bc4\u672c",id:"\u5efa\u7acb\u7cfb\u7d71\u7bc4\u672c",children:[],level:2}],m={toc:o},f="wrapper";function c(A){let{components:e,...l}=A;return(0,n.kt)(f,(0,a.Z)({},m,l,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"\u8d77\u56e0"},"\u8d77\u56e0"),(0,n.kt)("p",null,"\u96a8\u8457\u5de5\u4f5c\u7684\u7d93\u9a57\u589e\u52a0\uff0c\u63a5\u624b\u7684\u6848\u5b50\u4e5f\u8d8a\u4f86\u8d8a\u591a\uff0c\u6bcf\u500b\u6848\u5b50\u4f7f\u7528\u7cfb\u7d71\u7684\u67b6\u69cb\u5927\u540c\u5c0f\u7570\uff0c\u4f46\u6bcf\u6b21\u958b\u4e00\u500b\u65b0\u7684\u6848\u5b50\uff0c\u90fd\u9700\u8981\u91cd\u65b0\u8a2d\u5b9a\u6216\u662f\u91cd\u65b0\u5b89\u88dd\u5957\u4ef6\uff0c\u96d6\u7136\u53ea\u6709\u4e00\u958b\u59cb\u624d\u9700\u8981\u8a2d\u5b9a\uff0c\u4f46\u5e7e\u6b21\u4e0b\u4f86\u4e5f\u662f\u82b1\u4e86\u4e0d\u5c11\u6642\u9593\u3002"),(0,n.kt)("p",null,"\u56e0\u6b64\u9019\u6b21\u6253\u7b97\u4f7f\u7528 visual studio \u532f\u51fa\u5c08\u6848\u529f\u80fd\u4f86\u5efa\u7acb\u7cfb\u7d71\u7bc4\u672c\uff0c\u4f7f\u7528\u7bc4\u672c\u53ef\u4ee5\u5927\u5927\u6e1b\u5c11\u521d\u59cb\u7cfb\u7d71\u7684\u8a2d\u5b9a\u548c\u5b89\u88dd\u5957\u4ef6\u7684\u6642\u9593\u3002"),(0,n.kt)("h2",{id:"\u5c08\u6848\u532f\u51fa"},"\u5c08\u6848\u532f\u51fa"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u5148\u5efa\u7acb\u8981\u4f7f\u7528\u7684\u7cfb\u7d71\u67b6\u69cb\uff0c\u4e26\u5b89\u88dd\u76f8\u95dc\u5957\u4ef6")),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"image",src:t(4742).Z})),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u8f49\u63db\u6210\u5c08\u6848\u7bc4\u672c\uff0cnamespace \u8981\u4f7f\u7528\u7cfb\u7d71\u540d\u7a31")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-CSharp"},"\n// \u539f\u672c\u7684 namepspace\nnamespace PMP.EdgeService.Api.Controllers;\n\n// \u4f7f\u7528\u7bc4\u672c\u547d\u540d \nnamespace $ext_safeprojectname$.Controllers;\n\n")),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/en-us/visualstudio/ide/template-parameters?view=vs-2022"},"\u53c3\u6578\u76f8\u95dc\u8a2d\u5b9a")),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"image",src:t(2344).Z})),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u9078\u64c7\u5c08\u6848\u532f\u51fa\u7bc4\u672c")),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"image",src:t(4634).Z})),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"image",src:t(4514).Z})),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u9810\u8a2d Automatically Import the template into visual studio \u6253\u52fe\u8981\u53d6\u6d88\uff0c\u4e0d\u8981\u6253\u52fe")),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"image",src:t(3108).Z})),(0,n.kt)("p",null,"\u532f\u51fa\u7684 zip \u6a94\uff0c\u9810\u8a2d\u8def\u5f91\u70ba ",(0,n.kt)("inlineCode",{parentName:"p"},"C:\\Users\\{\u4f7f\u7528\u8005\u540d\u7a31}\\Documents\\Visual Studio 2022\\Templates\\ProjectTemplates")),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"image",src:t(4864).Z})),(0,n.kt)("h2",{id:"\u8a2d\u5b9a-template-\u8a2d\u5b9a"},"\u8a2d\u5b9a template \u8a2d\u5b9a"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u65b0\u589e\u4e00\u500b\u8cc7\u6599\u593e\uff0c\u628a\u532f\u51fa\u5404\u5225\u5c08\u6848\u7bc4\u672c zip \u6a94\u89e3\u58d3\u7e2e\u5f8c\u653e\u7f6e\u9032\u53bb\u3002"),(0,n.kt)("li",{parentName:"ul"},"\u5efa\u7acb\u7cfb\u7d71\u7bc4\u672c\u7684\u8a2d\u5b9a\u6a94\uff0c\u526f\u6a94\u540d\u70ba",(0,n.kt)("inlineCode",{parentName:"li"},"vstemplate"))),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"image",src:t(7317).Z})),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u7cfb\u7d71\u7bc4\u672c\u7684\u8a2d\u5b9a\u6a94\u5167\u5bb9\u5982\u4e0b")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-xml"},'\n<VSTemplate xmlns="http://schemas.microsoft.com/developer/vstemplate/2005" Version="3.0.0" Type="ProjectGroup">\n    <TemplateData>\n        <Name>Web Template</Name>\n        <Description>Project template creating ASP.NET 6 web apps and web APIs for windows, Lunix, macOS </Description>\n        <ProjectType>CSharp</ProjectType>\n        <LanguageTag>C#</LanguageTag>\n        <PlatformTag>Windows</PlatformTag>\n        <ProjectTypeTag>Web</ProjectTypeTag>\n        <CreateNewFolder>true</CreateNewFolder>\n        <LocationField>Enabled</LocationField>\n    </TemplateData>\n    <TemplateContent>\n        <ProjectCollection>\n            <SolutionFolder Name="Src">\n                <ProjectTemplateLink ProjectName="$projectname$.Api" CopyParameters="true">Template.Api\\MyTemplate.vstemplate</ProjectTemplateLink>\n                <ProjectTemplateLink ProjectName="$projectname$.Application" CopyParameters="true">Template.Application\\MyTemplate.vstemplate</ProjectTemplateLink>                \n            </SolutionFolder>            \n        </ProjectCollection>\n    </TemplateContent>\n</VSTemplate>\n\n')),(0,n.kt)("h2",{id:"\u5efa\u7acb\u7cfb\u7d71\u7bc4\u672c"},"\u5efa\u7acb\u7cfb\u7d71\u7bc4\u672c"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u628a\u5c08\u6848\u7684\u8cc7\u6599\u593e\u548c\u7cfb\u7d71\u7bc4\u672c\u7684\u8a2d\u5b9a\u6a94\u4e00\u8d77\u58d3\u7e2e\u6210\u4e00\u500b zip \u6a94"),(0,n.kt)("li",{parentName:"ul"},"\u628a zip \u653e\u7f6e visual studio \u8b80\u53d6\u7bc4\u672c\u7684\u8def\u5f91\u4f4d\u7f6e"),(0,n.kt)("li",{parentName:"ul"},"\u4e0d\u77e5\u9053\u8def\u5f91\u53ef\u4ee5\u5728 tools > options > projects and solutions > locations \u627e\u5230\u5c0d\u61c9\u8def\u5f91 User project template location")),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"image",src:t(3543).Z})),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u78ba\u8a8d\u7cfb\u7d71\u7bc4\u672c")),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"image",src:t(4216).Z})))}c.isMDXComponent=!0},4742:(A,e,t)=>{t.d(e,{Z:()=>a});const a=t.p+"assets/images/2023-02-22-create-project-dd913ab013c9e6ae303e06fdf7454fd3.png"},7317:(A,e,t)=>{t.d(e,{Z:()=>a});const a="data:image/png;base64,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"},4634:(A,e,t)=>{t.d(e,{Z:()=>a});const a=t.p+"assets/images/2023-02-22-export-project-3e3392dadd467d5bc30e2cd927c602ec.png"},3543:(A,e,t)=>{t.d(e,{Z:()=>a});const a=t.p+"assets/images/2023-02-22-find-template-path-ec291b5ba4d091b4cc4fee7355e9e25e.png"},4514:(A,e,t)=>{t.d(e,{Z:()=>a});const a=t.p+"assets/images/2023-02-22-select-project-8a358d275e8bd890a44939eff49639d6.png"},2344:(A,e,t)=>{t.d(e,{Z:()=>a});const a=t.p+"assets/images/2023-02-22-setting-namespace-acc9f557399eaa09e82a4f6cab87c016.png"},3108:(A,e,t)=>{t.d(e,{Z:()=>a});const a=t.p+"assets/images/2023-02-22-setting-template-39023f19d45f94c144a87f128e201159.png"},4216:(A,e,t)=>{t.d(e,{Z:()=>a});const a="data:image/png;base64,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"},4864:(A,e,t)=>{t.d(e,{Z:()=>a});const a=t.p+"assets/images/2023-02-22-template-path-a67c7d89687be474beea2a67bfccbd45.png"}}]);