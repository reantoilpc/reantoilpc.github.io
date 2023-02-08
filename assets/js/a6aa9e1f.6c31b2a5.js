"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3089],{8665:(e,t,a)=>{a.d(t,{Z:()=>c});var l=a(7294),r=a(6010),n=a(7019),i=a(9960);const s={sidebar:"sidebar_q+wC",sidebarItemTitle:"sidebarItemTitle_9G5K",sidebarItemList:"sidebarItemList_6T4b",sidebarItem:"sidebarItem_cjdF",sidebarItemLink:"sidebarItemLink_zyXk",sidebarItemLinkActive:"sidebarItemLinkActive_wcJs"};var m=a(5999);function o(e){let{sidebar:t}=e;return 0===t.items.length?null:l.createElement("nav",{className:(0,r.Z)(s.sidebar,"thin-scrollbar"),"aria-label":(0,m.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},l.createElement("div",{className:(0,r.Z)(s.sidebarItemTitle,"margin-bottom--md")},t.title),l.createElement("ul",{className:s.sidebarItemList},t.items.map((e=>l.createElement("li",{key:e.permalink,className:s.sidebarItem},l.createElement(i.Z,{isNavLink:!0,to:e.permalink,className:s.sidebarItemLink,activeClassName:s.sidebarItemLinkActive},e.title))))))}const c=function(e){const{sidebar:t,toc:a,children:i,...s}=e,m=t&&t.items.length>0;return l.createElement(n.Z,s,l.createElement("div",{className:"container margin-vert--lg"},l.createElement("div",{className:"row"},m&&l.createElement("aside",{className:"col col--3"},l.createElement(o,{sidebar:t})),l.createElement("main",{className:(0,r.Z)("col",{"col--7":m,"col--9 col--offset-1":!m}),itemScope:!0,itemType:"http://schema.org/Blog"},i),a&&l.createElement("div",{className:"col col--2"},a))))}},2754:(e,t,a)=>{a.r(t),a.d(t,{default:()=>g});var l=a(7294),r=a(2263),n=a(8665),i=a(8561),s=a(9960),m=a(5999);const o=function(e){const{metadata:t}=e,{previousPage:a,nextPage:r}=t;return l.createElement("nav",{className:"pagination-nav","aria-label":(0,m.I)({id:"theme.blog.paginator.navAriaLabel",message:"Blog list page navigation",description:"The ARIA label for the blog pagination"})},l.createElement("div",{className:"pagination-nav__item"},a&&l.createElement(s.Z,{className:"pagination-nav__link",to:a},l.createElement("div",{className:"pagination-nav__label"},"\xab"," ",l.createElement(m.Z,{id:"theme.blog.paginator.newerEntries",description:"The label used to navigate to the newer blog posts page (previous page)"},"Newer Entries")))),l.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},r&&l.createElement(s.Z,{className:"pagination-nav__link",to:r},l.createElement("div",{className:"pagination-nav__label"},l.createElement(m.Z,{id:"theme.blog.paginator.olderEntries",description:"The label used to navigate to the older blog posts page (next page)"},"Older Entries")," ","\xbb"))))};var c=a(3810);const g=function(e){const{metadata:t,items:a,sidebar:s}=e,{siteConfig:{title:m}}=(0,r.Z)(),{blogDescription:g,blogTitle:d,permalink:p}=t,u="/"===p?m:d;return l.createElement(n.Z,{title:u,description:g,wrapperClassName:c.kM.wrapper.blogPages,pageClassName:c.kM.page.blogListPage,searchMetadata:{tag:"blog_posts_list"},sidebar:s},a.map((e=>{let{content:t}=e;return l.createElement(i.Z,{key:t.metadata.permalink,frontMatter:t.frontMatter,assets:t.assets,metadata:t.metadata,truncated:t.metadata.truncated},l.createElement(t,null))})),l.createElement(o,{metadata:t}))}},8561:(e,t,a)=>{a.d(t,{Z:()=>v});var l=a(7294),r=a(6010),n=a(3905),i=a(5999),s=a(9960),m=a(4996),o=a(3810),c=a(7707),g=a(6753);const d={blogPostTitle:"blogPostTitle_d4p0",blogPostData:"blogPostData_-Im+",blogPostDetailsFull:"blogPostDetailsFull_xD8n"};var p=a(62);const u={image:"image_9q7L"};const b=function(e){let{author:t}=e;const{name:a,title:r,url:n,imageURL:i}=t;return l.createElement("div",{className:"avatar margin-bottom--sm"},i&&l.createElement(s.Z,{className:"avatar__photo-link avatar__photo",href:n},l.createElement("img",{className:u.image,src:i,alt:a})),a&&l.createElement("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person"},l.createElement("div",{className:"avatar__name"},l.createElement(s.Z,{href:n,itemProp:"url"},l.createElement("span",{itemProp:"name"},a))),r&&l.createElement("small",{className:"avatar__subtitle",itemProp:"description"},r)))},E={authorCol:"authorCol_8c0z"};function h(e){let{authors:t,assets:a}=e;return 0===t.length?null:l.createElement("div",{className:"row margin-top--md margin-bottom--sm"},t.map(((e,t)=>l.createElement("div",{className:(0,r.Z)("col col--6",E.authorCol),key:t},l.createElement(b,{author:{...e,imageURL:a.authorsImageUrls[t]??e.imageURL}})))))}const v=function(e){const t=function(){const{selectMessage:e}=(0,o.c2)();return t=>{const a=Math.ceil(t);return e(a,(0,i.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:a}))}}(),{withBaseUrl:a}=(0,m.C)(),{children:u,frontMatter:b,assets:E,metadata:v,truncated:_,isBlogPostPage:N=!1}=e,{date:Z,formattedDate:f,permalink:k,tags:P,readingTime:T,title:I,editUrl:w,authors:L}=v,C=E.image??b.image,y=!N&&_,M=P.length>0;return l.createElement("article",{className:N?void 0:"margin-bottom--xl",itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting"},(()=>{const e=N?"h1":"h2";return l.createElement("header",null,l.createElement(e,{className:d.blogPostTitle,itemProp:"headline"},N?I:l.createElement(s.Z,{itemProp:"url",to:k},I)),l.createElement("div",{className:(0,r.Z)(d.blogPostData,"margin-vert--md")},l.createElement("time",{dateTime:Z,itemProp:"datePublished"},f),void 0!==T&&l.createElement(l.Fragment,null," \xb7 ",t(T))),l.createElement(h,{authors:L,assets:E}))})(),C&&l.createElement("meta",{itemProp:"image",content:a(C,{absolute:!0})}),l.createElement("div",{className:"markdown",itemProp:"articleBody"},l.createElement(n.Zo,{components:c.Z},u)),(M||_)&&l.createElement("footer",{className:(0,r.Z)("row docusaurus-mt-lg",{[d.blogPostDetailsFull]:N})},M&&l.createElement("div",{className:(0,r.Z)("col",{"col--9":y})},l.createElement(p.Z,{tags:P})),N&&w&&l.createElement("div",{className:"col margin-top--sm"},l.createElement(g.Z,{editUrl:w})),y&&l.createElement("div",{className:(0,r.Z)("col text--right",{"col--3":M})},l.createElement(s.Z,{to:v.permalink,"aria-label":`Read more about ${I}`},l.createElement("b",null,l.createElement(i.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More"))))))}},6753:(e,t,a)=>{a.d(t,{Z:()=>c});var l=a(7294),r=a(5999),n=a(7462),i=a(6010);const s={iconEdit:"iconEdit_mS5F"};const m=function(e){let{className:t,...a}=e;return l.createElement("svg",(0,n.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,i.Z)(s.iconEdit,t),"aria-hidden":"true"},a),l.createElement("g",null,l.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))};var o=a(3810);function c(e){let{editUrl:t}=e;return l.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:o.kM.common.editThisPage},l.createElement(m,null),l.createElement(r.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}},7774:(e,t,a)=>{a.d(t,{Z:()=>s});var l=a(7294),r=a(6010),n=a(9960);const i={tag:"tag_WK-t",tagRegular:"tagRegular_LXbV",tagWithCount:"tagWithCount_S5Zl"};const s=function(e){const{permalink:t,name:a,count:s}=e;return l.createElement(n.Z,{href:t,className:(0,r.Z)(i.tag,{[i.tagRegular]:!s,[i.tagWithCount]:s})},a,s&&l.createElement("span",null,s))}},62:(e,t,a)=>{a.d(t,{Z:()=>m});var l=a(7294),r=a(6010),n=a(5999),i=a(7774);const s={tags:"tags_NBRY",tag:"tag_F03v"};function m(e){let{tags:t}=e;return l.createElement(l.Fragment,null,l.createElement("b",null,l.createElement(n.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),l.createElement("ul",{className:(0,r.Z)(s.tags,"padding--none","margin-left--sm")},t.map((e=>{let{label:t,permalink:a}=e;return l.createElement("li",{key:a,className:s.tag},l.createElement(i.Z,{name:t,permalink:a}))}))))}}}]);