"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3829],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),s=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(i.Provider,{value:t},e.children)},y="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,i=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),y=s(n),d=o,m=y["".concat(i,".").concat(d)]||y[d]||u[d]||l;return n?r.createElement(m,c(c({ref:t},p),{},{components:n})):r.createElement(m,c({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,c=new Array(l);c[0]=d;var a={};for(var i in t)hasOwnProperty.call(t,i)&&(a[i]=t[i]);a.originalType=e,a[y]="string"==typeof e?e:o,c[1]=a;for(var s=2;s<l;s++)c[s]=n[s];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9649:(e,t,n)=>{n.d(t,{N:()=>p,Z:()=>y});var r=n(7462),o=n(7294),l=n(6010),c=n(5999),a=n(3810);const i="anchorWithStickyNavbar_y2LR",s="anchorWithHideOnScrollNavbar_3ly5",p=e=>{let{...t}=e;return o.createElement("header",null,o.createElement("h1",(0,r.Z)({},t,{id:void 0}),t.children))},y=e=>{return"h1"===e?p:(t=e,e=>{let{id:n,...p}=e;const{navbar:{hideOnScroll:y}}=(0,a.LU)();return n?o.createElement(t,(0,r.Z)({},p,{className:(0,l.Z)("anchor",{[s]:y,[i]:!y}),id:n}),p.children,o.createElement("a",{className:"hash-link",href:`#${n}`,title:(0,c.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"\u200b")):o.createElement(t,p)});var t}},7707:(e,t,n)=>{n.d(t,{Z:()=>B});var r=n(7462),o=n(7294),l=n(2859),c=n(9960),a=n(6010);const i={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","atrule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]};var s={Prism:n(7410).default,theme:i};function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function y(){return y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},y.apply(this,arguments)}var u=/\r\n|\r|\n/,d=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},m=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},h=function(e,t){var n=e.plain,r=Object.create(null),o=e.styles.reduce((function(e,n){var r=n.languages,o=n.style;return r&&!r.includes(t)||n.types.forEach((function(t){var n=y({},e[t],o);e[t]=n})),e}),r);return o.root=n,o.plain=y({},n,{backgroundColor:null}),o};function g(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(n[r]=e[r]);return n}const f=function(e){function t(){for(var t=this,n=[],r=arguments.length;r--;)n[r]=arguments[r];e.apply(this,n),p(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?h(e.theme,e.language):void 0;return t.themeDict=n})),p(this,"getLineProps",(function(e){var n=e.key,r=e.className,o=e.style,l=y({},g(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),c=t.getThemeDict(t.props);return void 0!==c&&(l.style=c.plain),void 0!==o&&(l.style=void 0!==l.style?y({},l.style,o):o),void 0!==n&&(l.key=n),r&&(l.className+=" "+r),l})),p(this,"getStyleForToken",(function(e){var n=e.types,r=e.empty,o=n.length,l=t.getThemeDict(t.props);if(void 0!==l){if(1===o&&"plain"===n[0])return r?{display:"inline-block"}:void 0;if(1===o&&!r)return l[n[0]];var c=r?{display:"inline-block"}:{},a=n.map((function(e){return l[e]}));return Object.assign.apply(Object,[c].concat(a))}})),p(this,"getTokenProps",(function(e){var n=e.key,r=e.className,o=e.style,l=e.token,c=y({},g(e,["key","className","style","token"]),{className:"token "+l.types.join(" "),children:l.content,style:t.getStyleForToken(l),key:void 0});return void 0!==o&&(c.style=void 0!==c.style?y({},c.style,o):o),void 0!==n&&(c.key=n),r&&(c.className+=" "+r),c})),p(this,"tokenize",(function(e,t,n,r){var o={code:t,grammar:n,language:r,tokens:[]};e.hooks.run("before-tokenize",o);var l=o.tokens=e.tokenize(o.code,o.grammar,o.language);return e.hooks.run("after-tokenize",o),l}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,r=e.code,o=e.children,l=this.getThemeDict(this.props),c=t.languages[n];return o({tokens:function(e){for(var t=[[]],n=[e],r=[0],o=[e.length],l=0,c=0,a=[],i=[a];c>-1;){for(;(l=r[c]++)<o[c];){var s=void 0,p=t[c],y=n[c][l];if("string"==typeof y?(p=c>0?p:["plain"],s=y):(p=m(p,y.type),y.alias&&(p=m(p,y.alias)),s=y.content),"string"==typeof s){var h=s.split(u),g=h.length;a.push({types:p,content:h[0]});for(var f=1;f<g;f++)d(a),i.push(a=[]),a.push({types:p,content:h[f]})}else c++,t.push(p),n.push(s),r.push(0),o.push(s.length)}c--,t.pop(),n.pop(),r.pop(),o.pop()}return d(a),i}(void 0!==c?this.tokenize(t,r,c,n):[r]),className:"prism-code language-"+n,style:void 0!==l?l.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(o.Component);var b=n(5999),v=n(3810);const k={plain:{color:"#bfc7d5",backgroundColor:"#292d3e"},styles:[{types:["comment"],style:{color:"rgb(105, 112, 152)",fontStyle:"italic"}},{types:["string","inserted"],style:{color:"rgb(195, 232, 141)"}},{types:["number"],style:{color:"rgb(247, 140, 108)"}},{types:["builtin","char","constant","function"],style:{color:"rgb(130, 170, 255)"}},{types:["punctuation","selector"],style:{color:"rgb(199, 146, 234)"}},{types:["variable"],style:{color:"rgb(191, 199, 213)"}},{types:["class-name","attr-name"],style:{color:"rgb(255, 203, 107)"}},{types:["tag","deleted"],style:{color:"rgb(255, 85, 114)"}},{types:["operator"],style:{color:"rgb(137, 221, 255)"}},{types:["boolean"],style:{color:"rgb(255, 88, 116)"}},{types:["keyword"],style:{fontStyle:"italic"}},{types:["doctype"],style:{color:"rgb(199, 146, 234)",fontStyle:"italic"}},{types:["namespace"],style:{color:"rgb(178, 204, 214)"}},{types:["url"],style:{color:"rgb(221, 221, 221)"}}]};var E=n(5350);const O=()=>{const{prism:e}=(0,v.LU)(),{isDarkTheme:t}=(0,E.Z)(),n=e.theme||k,r=e.darkTheme||n;return t?r:n},T={codeBlockContainer:"codeBlockContainer_J+bg",codeBlockContent:"codeBlockContent_csEI",codeBlockTitle:"codeBlockTitle_oQzk",codeBlock:"codeBlock_rtdJ",copyButton:"copyButton_M3SB",codeBlockLines:"codeBlockLines_1zSZ"};function Z(e){let{children:t,className:n,metastring:l,title:c}=e;const{prism:i}=(0,v.LU)(),[p,y]=(0,o.useState)(!1),[u,d]=(0,o.useState)(!1);(0,o.useEffect)((()=>{d(!0)}),[]);const m=(0,v.bc)(l)||c,h=O(),g=Array.isArray(t)?t.join(""):t,k=(0,v.Vo)(n)??i.defaultLanguage,{highlightLines:E,code:Z}=(0,v.nZ)(g,l,k),N=()=>{!function(e,t){let{target:n=document.body}=void 0===t?{}:t;const r=document.createElement("textarea"),o=document.activeElement;r.value=e,r.setAttribute("readonly",""),r.style.contain="strict",r.style.position="absolute",r.style.left="-9999px",r.style.fontSize="12pt";const l=document.getSelection();let c=!1;l.rangeCount>0&&(c=l.getRangeAt(0)),n.append(r),r.select(),r.selectionStart=0,r.selectionEnd=e.length;let a=!1;try{a=document.execCommand("copy")}catch{}r.remove(),c&&(l.removeAllRanges(),l.addRange(c)),o&&o.focus()}(Z),y(!0),setTimeout((()=>y(!1)),2e3)};return o.createElement(f,(0,r.Z)({},s,{key:String(u),theme:h,code:Z,language:k}),(e=>{let{className:t,style:l,tokens:c,getLineProps:i,getTokenProps:s}=e;return o.createElement("div",{className:(0,a.Z)(T.codeBlockContainer,n,v.kM.common.codeBlock)},m&&o.createElement("div",{style:l,className:T.codeBlockTitle},m),o.createElement("div",{className:(0,a.Z)(T.codeBlockContent,k)},o.createElement("pre",{tabIndex:0,className:(0,a.Z)(t,T.codeBlock,"thin-scrollbar"),style:l},o.createElement("code",{className:T.codeBlockLines},c.map(((e,t)=>{1===e.length&&"\n"===e[0].content&&(e[0].content="");const n=i({line:e,key:t});return E.includes(t)&&(n.className+=" docusaurus-highlight-code-line"),o.createElement("span",(0,r.Z)({key:t},n),e.map(((e,t)=>o.createElement("span",(0,r.Z)({key:t},s({token:e,key:t}))))),o.createElement("br",null))})))),o.createElement("button",{type:"button","aria-label":(0,b.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),className:(0,a.Z)(T.copyButton,"clean-btn"),onClick:N},p?o.createElement(b.Z,{id:"theme.CodeBlock.copied",description:"The copied button label on code blocks"},"Copied"):o.createElement(b.Z,{id:"theme.CodeBlock.copy",description:"The copy button label on code blocks"},"Copy"))))}))}var N=n(9649);const C={details:"details_h+cY"},P="alert alert--info";function j(e){let{...t}=e;return o.createElement(v.PO,(0,r.Z)({},t,{className:(0,a.Z)(P,C.details,t.className)}))}const B={head:e=>{const t=o.Children.map(e.children,(e=>function(e){if(e?.props?.mdxType&&e?.props?.originalType){const{mdxType:t,originalType:n,...r}=e.props;return o.createElement(e.props.originalType,r)}return e}(e)));return o.createElement(l.Z,e,t)},code:e=>{const{children:t}=e;return(0,o.isValidElement)(t)?t:t.includes("\n")?o.createElement(Z,e):o.createElement("code",e)},a:e=>o.createElement(c.Z,e),pre:e=>{const{children:t}=e;return(0,o.isValidElement)(t)&&(0,o.isValidElement)(t?.props?.children)?t.props.children:o.createElement(Z,(0,o.isValidElement)(t)?t?.props:{...e})},details:e=>{const t=o.Children.toArray(e.children),n=t.find((e=>"summary"===e?.props?.mdxType)),l=o.createElement(o.Fragment,null,t.filter((e=>e!==n)));return o.createElement(j,(0,r.Z)({},e,{summary:n}),l)},h1:(0,N.Z)("h1"),h2:(0,N.Z)("h2"),h3:(0,N.Z)("h3"),h4:(0,N.Z)("h4"),h5:(0,N.Z)("h5"),h6:(0,N.Z)("h6")}}}]);