"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[131],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return b}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),p=c(n),b=i,I=p["".concat(s,".").concat(b)]||p[b]||u[b]||a;return n?r.createElement(I,l(l({ref:t},m),{},{components:n})):r.createElement(I,l({ref:t},m))}));function b(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,l=new Array(a);l[0]=p;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var c=2;c<a;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},4048:function(e,t,n){n.r(t),n.d(t,{assets:function(){return m},contentTitle:function(){return s},default:function(){return b},frontMatter:function(){return o},metadata:function(){return c},toc:function(){return u}});var r=n(7462),i=n(3366),a=(n(7294),n(3905)),l=["components"],o={slug:"postman-environment-variable",title:"Postman \u74b0\u5883\u8b8a\u6578\u8a2d\u5b9a",authors:{name:"Ray Hsu",title:"C# \u5f8c\u7aef\u5de5\u7a0b\u5e2b",url:"https://github.com/reantoilpc",image_url:"https://github.com/reantoilpc.png"},tags:["Postman"]},s=void 0,c={permalink:"/blog/postman-environment-variable",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2022-05-31-postman-set-environment-variable.md",source:"@site/blog/2022-05-31-postman-set-environment-variable.md",title:"Postman \u74b0\u5883\u8b8a\u6578\u8a2d\u5b9a",description:"Postman Environment Variable \u7c21\u4ecb",date:"2022-05-31T00:00:00.000Z",formattedDate:"2022\u5e745\u670831\u65e5",tags:[{label:"Postman",permalink:"/blog/tags/postman"}],readingTime:1.11,truncated:!1,authors:[{name:"Ray Hsu",title:"C# \u5f8c\u7aef\u5de5\u7a0b\u5e2b",url:"https://github.com/reantoilpc",image_url:"https://github.com/reantoilpc.png",imageURL:"https://github.com/reantoilpc.png"}],nextItem:{title:"Welcome",permalink:"/blog/welcome"}},m={authorsImageUrls:[void 0]},u=[{value:"Postman Environment Variable \u7c21\u4ecb",id:"postman-environment-variable-\u7c21\u4ecb",children:[],level:2},{value:"Environment Variable \u8a2d\u5b9a",id:"environment-variable-\u8a2d\u5b9a",children:[],level:2},{value:"\u900f\u904e Response \u56de\u5beb Environment Variable",id:"\u900f\u904e-response-\u56de\u5beb-environment-variable",children:[],level:2}],p={toc:u};function b(e){var t=e.components,o=(0,i.Z)(e,l);return(0,a.kt)("wrapper",(0,r.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"postman-environment-variable-\u7c21\u4ecb"},"Postman Environment Variable \u7c21\u4ecb"),(0,a.kt)("p",null,"Postman \u662f\u4e00\u5957\u6e2c\u8a66 API \u5de5\u5177\uff0c\u85c9\u8457 Environment Variable \u7684\u8a2d\u5b9a\uff0c\u53ef\u4ee5\u5f88\u65b9\u4fbf\u5207\u63db\u74b0\u5883\uff0c\u9032\u884c API \u529f\u80fd\u9a57\u8b49\uff0c\u6982\u5ff5\u5f88\u50cf asp.net \u7684 appsettings\uff0c\u53ea\u8981\u8a2d\u5b9a\u597d\u8981\u7f6e\u63db\u7684\u5167\u5bb9\uff0c\u5c31\u53ef\u4ee5\u4f7f\u7528\u3002"),(0,a.kt)("h2",{id:"environment-variable-\u8a2d\u5b9a"},"Environment Variable \u8a2d\u5b9a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5728 Environment \u8a2d\u5b9a\u4e0d\u540c\u74b0\u5883")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"image",src:n(3643).Z})),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u8a2d\u5b9a Variable Name \u548c Value")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"image",src:n(4471).Z})),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u4f7f\u7528 Variable \u53d6\u4ee3\u539f\u672c Api Url")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"image",src:n(1724).Z})),(0,a.kt)("h2",{id:"\u900f\u904e-response-\u56de\u5beb-environment-variable"},"\u900f\u904e Response \u56de\u5beb Environment Variable"),(0,a.kt)("p",null,"\u4f7f\u7528 Postman \u6e2c\u8a66 API \u6703\u8981\u4f7f\u7528 AccessToken \u9032\u884c\u6b0a\u9650\u7684\u9a57\u8b49\uff0c\u56e0\u6b64\u5728\u6e2c\u8a66\u524d\u9700\u8981\u5148\u767b\u5165\u53d6\u5f97 AccessToken \u7136\u5f8c\u8907\u88fd\u8cbc\u4e0a Auth \u5c0d\u61c9\u6b04\u4f4d\uff0c\u6709\u5e7e\u652f API \u5c31\u8981\u8907\u88fd\u5e7e\u6b21\uff0c\u975e\u5e38\u9ebb\u7169\uff0c\u56e0\u6b64\u53ef\u4ee5\u900f\u904e Environment Variable \u7c21\u5316\u91cd\u8907\u8cbc\u4e0a\u7684\u52d5\u4f5c\u3002"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5148\u8a2d\u5b9a AccessToken \u8b8a\u6578\uff0c\u653e\u5728 Auth \u5c0d\u61c9\u6b04\u4f4d")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"image",src:n(7264).Z})),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5728\u53d6\u5f97 AccessToken API \u7684 Tests \u88e1\u8f38\u5165 Javascript \u8a9e\u6cd5\uff0c\u7576\u6210\u529f\u53d6\u5f97 AccessToken \u56de\u5beb Environment Variable")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"image",src:n(1899).Z})),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},'var jsonData = JSON.parse(responseBody);\npm.environment.set("AccessToken", jsonData);\n')))}b.isMDXComponent=!0},3643:function(e,t,n){t.Z=n.p+"assets/images/2022-05-31-environment-variable-01-7c9909d4b00655ce220f728fdbb493c4.png"},4471:function(e,t,n){t.Z=n.p+"assets/images/2022-05-31-environment-variable-02-ee9398cb1a66ad17cb0bf24fb2981b5b.png"},1724:function(e,t){t.Z="data:image/png;base64,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qkzUH9OzFlWFh+UMCU3psgqwJ8FcP9esJ6j7ELQTcZPU/kdnykUGYoJRW1WEw/ZZAZpQLkwQg2BlDtt9JufwK9mODS7bwEa5YEEEAr4pkyeWuSD2RS8Co8ntfrSObpAe2mMmWNrals28jkob6HqZYXasV+bDHSfivTqPLREReZPXgm298MEYERsCfH0C75nYc/Fr4blgGwjjI0sQc/5VLH77tG38tiIyBbmTe6Lslb9g7XeyzkF4t5sR5i8+S12+gDJ3V45tkRbGGYsQ/cVqzNr3jawDDPcvwSjN23h4W6mskfTLMfOlAaiYk461LkObey4vPtAMw3PbMPpKPqZmtXb8bEtiMGdNFiJOpiM959f1d+q5tkxE5o5sjEYxsv5bTm2mDKlYsRCJfsXIuHee9y7VS0REKu8HW/pV8lywBUL6pCArdSC6XinF/hfyYfumvCcenfY44m/1x7eH1+CP7zcET4/oORKvzLgHN1lP4tCfN+F1NTzHImuRAeH+36D89dVY8ZW6phPblcfarq3Blton3cSVyJ2XCJ2m4QprsFQg/5lULHea7oyIiLyBwZa8wpPBVtUpEAOCOqP6ogWOw7OVntnQKxdw/EdZ4Skun88fMd274KdLFpT/LKsaudpgS75EDslQQu13VSg64G5ACREReRqDLXmFx4NtB8FgS0REdP147wINRERERETXEHtsySv+nR5bIiIioqvBHlu6bm7wkRsRERG1D+yxJa9orsd2sNWKdIsFPX52cwZWB/MPPz/kaLU40bmzrCEiIqLrgT22dM099N13PhNqFbfU1SGVwy6IiIiuOwZbuuZcfkXQwfniMREREXU0DLZ0zb3RrRtqOnWC0mfrC7dzfn746403intERER0PXGMLXkFZ0UgIiKia409tkRERETkExhsiYiIiMgnNBtsb7iBs3QSERERUcfgNtheuXIF/v7+skRERERE1L65DbY//PADAgMD0akTRysQERERUfvnNrVaLBb88ssvuPHGG9G5c2cOSyAiIiKids3tdF92Wq0WXbp04bAEapO6ujr4+fnJEhEREZH3tRhsiYiIiIg6Ag6gJSIiIiKfwGBLRERERD6BwZaIiIiIfAKDLRERERH5BAZbIiIiIvIJDLZERERE5BMYbImIiIjIBwD/DwqnhkSfVgu5AAAAAElFTkSuQmCC"},7264:function(e,t,n){t.Z=n.p+"assets/images/2022-05-31-environment-variable-04-a90033c4ccb91826946c5c9ca645c45a.png"},1899:function(e,t,n){t.Z=n.p+"assets/images/2022-05-31-environment-variable-05-cf3a5169a53c9034a887be1a788dc4c3.png"}}]);