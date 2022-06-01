"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[517],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(n),f=a,b=p["".concat(c,".").concat(f)]||p[f]||m[f]||o;return n?r.createElement(b,i(i({ref:t},s),{},{components:n})):r.createElement(b,i({ref:t},s))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=p;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},3527:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return m}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],l={slug:"postman-set-environment-variable",title:"Postman Environment Variable",authors:{name:"Ray Hsu",title:"C# \u5f8c\u7aef\u5de5\u7a0b\u5e2b",url:"https://github.com/reantoilpc"},tags:["Postman"]},c=void 0,u={permalink:"/blog/postman-set-environment-variable",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2022-05-31-postman-set-environment-variable.md",source:"@site/blog/2022-05-31-postman-set-environment-variable.md",title:"Postman Environment Variable",description:"Postman Environment Variable",date:"2022-05-31T00:00:00.000Z",formattedDate:"May 31, 2022",tags:[{label:"Postman",permalink:"/blog/tags/postman"}],readingTime:.395,truncated:!1,authors:[{name:"Ray Hsu",title:"C# \u5f8c\u7aef\u5de5\u7a0b\u5e2b",url:"https://github.com/reantoilpc"}],nextItem:{title:"Welcome",permalink:"/blog/welcome"}},s={authorsImageUrls:[void 0]},m=[{value:"Postman Environment Variable",id:"postman-environment-variable",children:[],level:2},{value:"Environment Variable \u8a2d\u5b9a",id:"environment-variable-\u8a2d\u5b9a",children:[],level:2}],p={toc:m};function f(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"postman-environment-variable"},"Postman Environment Variable"),(0,o.kt)("p",null,"Postman \u662f\u4e00\u5957\u6e2c\u8a66 API \u5de5\u5177\uff0c\u85c9\u8457 Environment Variable \u7684\u8a2d\u5b9a\uff0c\u53ef\u4ee5\u5f88\u65b9\u4fbf\u5207\u63db\u74b0\u5883\uff0c\u9032\u884c API \u529f\u80fd\u9a57\u8b49\uff0c\u6982\u5ff5\u5f88\u50cf asp.net \u7684 appsettings\uff0c\u53ea\u8981\u8a2d\u5b9a\u597d\u8981\u7f6e\u63db\u7684\u5167\u5bb9\uff0c\u5c31\u53ef\u4ee5\u4f7f\u7528\u3002"),(0,o.kt)("h2",{id:"environment-variable-\u8a2d\u5b9a"},"Environment Variable \u8a2d\u5b9a"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u8a2d\u5b9a\u4e0d\u540c\u74b0\u5883\uff0c\u4f7f\u7528\u76f8\u540c\u53c3\u6578\n","![image info]","(./pictures/2022-05-31-01-environment variable setting.png)")))}f.isMDXComponent=!0}}]);