(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{117:function(e,t,n){},118:function(e,t,n){},138:function(e,t,n){},140:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n.n(c),r=n(15),s=n.n(r),a=(n(65),n(66),n(2)),o=n(3),l=(n(99),n(14)),j=n(53),d=n(1);var b=function(e){var t=e.anchorList;return Object(d.jsx)("nav",{children:t.map((function(e){return"hash"===e.type?Object(d.jsx)(j.a,{smooth:!0,to:e.link,children:Object(d.jsx)(a.Button,{bg:"info700",hoverBg:"info600",cursor:"pointer",rounded:"md",children:e.name})},e.id):"new-tab"===e.type?Object(d.jsx)(a.Anchor,{href:e.link,target:"_blank",children:Object(d.jsx)(a.Button,{bg:"info700",hoverBg:"info600",cursor:"pointer",rounded:"md",children:e.name})},e.id):Object(d.jsx)(l.b,{to:e.link,children:Object(d.jsx)(a.Button,{bg:"info700",hoverBg:"info600",cursor:"pointer",rounded:"md",children:e.name})},e.id)}))})},x=n(4),m=n(55),h=n.n(m);n(117),n(118);var u=function(e){var t=e.list,n=e.flktyOption,i=e.cellOption,r=Object(c.useState)(void 0),s=Object(x.a)(r,2),o=s[0],l=s[1];Object(c.useEffect)((function(){void 0!==o&&o.on("settle",(function(){console.log("current index is ".concat(o.selectedIndex))}))}),[o]);var j=t.map((function(e){return"recommend-skins"===i.type?Object(d.jsx)("a",{to:"/skins/".concat(e.id),children:Object(d.jsx)(a.Div,{className:"carousel-cell",bg:"transparent",m:{r:{xs:"0.5rem",md:"2rem"}},h:{xs:"210px",md:"350px"},w:{xs:"390px",md:"650px"},children:Object(d.jsx)("img",{src:e.full_image_url,alt:e.name,title:e.name})})},e.id):"champion-skins"===i.type?Object(d.jsx)("a",{href:"/skins/".concat(e.id),children:Object(d.jsx)(a.Div,{className:"carousel-cell",bg:"transparent",m:{r:{xs:"0.5rem",md:"2rem"}},h:{xs:"336px",md:"336px"},w:{xs:"185px",md:"185px"},border:"2px solid",borderColor:"gold",children:Object(d.jsx)("img",{src:e.trimmed_image_url,alt:e.name,title:e.name})})},e.id):Object(d.jsx)(d.Fragment,{})}));return Object(d.jsx)(a.Div,{p:{b:"30px"},children:Object(d.jsx)(h.a,{className:"carousel",options:n,flickityRef:function(e){l(e)},children:j})})},O=n(37),p=n.n(O),f=n(56),g=n(17),v=n(57),k=n.n(v);function y(e,t){switch(t.type){case"FETCH_INIT":return Object(g.a)(Object(g.a)({},e),{},{isLoading:!0,isError:!1});case"FETCH_SUCCESS":return{isLoading:!1,isError:!1,data:t.payload};case"FETCH_FAILURE":return Object(g.a)(Object(g.a)({},e),{},{isLoading:!1,isError:!0});default:throw new Error}}var E=function(e,t){var n=Object(c.useState)(e),i=Object(x.a)(n,2),r=i[0],s=i[1],a=Object(c.useReducer)(y,{isLoading:!1,isError:!1,data:t}),o=Object(x.a)(a,2),l=o[0],j=o[1];return Object(c.useEffect)((function(){var e=!1;return"initialUrl"!==r&&function(){var t=Object(f.a)(p.a.mark((function t(){var n;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return j({type:"FETCH_INIT"}),t.prev=1,t.next=4,k()(r);case 4:n=t.sent,e||j({type:"FETCH_SUCCESS",payload:n.data}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),e||j({type:"FETCH_FAILURE"});case 11:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(){return t.apply(this,arguments)}}()(),function(){e=!0}}),[r]),[l,s]};var w=function(){var e=E("/api/recommendations",[]),t=Object(x.a)(e,2),n=t[0],c=n.isLoading,i=n.isError,r=n.data;return t[1],Object(d.jsx)(d.Fragment,{children:c?Object(d.jsx)("p",{children:" is loading... "}):i?Object(d.jsx)("p",{children:" something error "}):Object(d.jsx)(a.Div,{maxW:"100%",children:Object(d.jsx)(u,{list:r,flktyOption:{initialIndex:1,wrapAround:!0,autoPlay:3e3},cellOption:{type:"recommend-skins"}})})})};n(138);var C=function(){var e=Object(c.useState)(0),t=Object(x.a)(e,2),n=t[0],i=t[1],r=E("/api/champions",[]),s=Object(x.a)(r,2),o=s[0],l=o.isLoading,j=o.isError,b=o.data,m=(s[1],Object(c.useState)(!1)),h=Object(x.a)(m,2),O=h[0],p=h[1],f=E("initialUrl",[]),g=Object(x.a)(f,2),v=g[0],k=v.isLoading,y=v.isError,w=v.data,C=g[1];Object(c.useEffect)((function(){O&&C("/api/champions/".concat(n,"/skins"))}),[O,n,C]),Object(c.useEffect)((function(){console.log(w)}),[w]),Object(c.useEffect)((function(){console.log(b)}),[b]);var F=b.map((function(e){return Object(d.jsx)(a.Div,{p:"0.5rem",cursor:"pointer",children:Object(d.jsx)("img",{className:"champion-icon",src:e.icon_url,alt:e.name,title:e.name,onClick:function(){p(!0),i(e.id)}})},e.id)}));return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(a.Div,{d:"flex",justify:"space-evenly",flexWrap:"wrap",p:"0.5rem",children:l?Object(d.jsx)("p",{children:" is loading... "}):j?Object(d.jsx)("p",{children:" something error "}):F}),Object(d.jsx)(a.Div,{className:"transition-slide"+(O?" in":""),maxW:"100%",children:O?k?Object(d.jsx)("p",{children:" is loading... "}):y?Object(d.jsx)("p",{children:" something error "}):Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(a.Button,{pos:"absolute",right:"0.5rem",top:"0.5rem",h:"2.5rem",w:"2.5rem",bg:"warning700",hoverBg:"warning600",rounded:"circle",shadow:"2",hoverShadow:"4",onClick:function(){return p(!1)},children:Object(d.jsx)(a.Icon,{name:"Cross",size:"20px",color:"white"})}),Object(d.jsx)(u,{list:w,flktyOption:{initialIndex:0,cellAlign:"left",contain:"true"},cellOption:{type:"champion-skins"}})]}):Object(d.jsx)(d.Fragment,{})})]})};var F=function(){return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(a.Div,{d:"flex",h:{xs:"150px",md:"400px"},align:"center",justify:"center",flexDir:"column",children:Object(d.jsx)(a.Text,{p:{l:"0.5rem",r:"0.5rem"},textSize:"display3",textAlign:"center",children:"LOL PRICE TRACKER"})}),Object(d.jsxs)(a.Div,{className:"content-container",children:[Object(d.jsx)(a.Div,{className:"content-background",bg:"black600"}),Object(d.jsx)("div",{className:"hash-link",id:"recommend-skins"}),Object(d.jsx)("div",{className:"content-title",children:Object(d.jsx)(a.Text,{textSize:{xs:"1rem",md:"1.5rem"},children:"Recommend Skins"})}),Object(d.jsx)(w,{}),Object(d.jsx)("div",{className:"hash-link",id:"champions"}),Object(d.jsx)("div",{className:"content-title",children:Object(d.jsx)(a.Text,{textSize:{xs:"1rem",md:"1.5rem"},children:"Champion List"})}),Object(d.jsx)(C,{})]})]})},N=n(6),S=n(29);var D=function(){var e=Object(o.g)("/skins/:skinId").params;Object(c.useEffect)((function(){s("/api/skins/".concat(e.skinId))}),[e]);var t=E("/api/skins/".concat(e.skinId),{}),n=Object(x.a)(t,2),i=n[0],r=(i.isLoading,i.isError,i.data),s=n[1],l=Object(c.useRef)(null);Object(c.useEffect)((function(){var e=l.current.getContext("2d");S.a.register.apply(S.a,Object(N.a)(S.b));var t=r.price_history||[];console.log(t),t.sort();var n={labels:t.map((function(e){return e.date})),datasets:[{label:"My First Dataset",data:t.map((function(e){return e.price})),fill:!1,borderColor:"rgb(75, 192, 192)",tension:0}]},c=new S.a(e,{type:"line",data:n,options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,stackWeight:1}}}});return console.log(c),function(){console.log("chart destroy..."),c.destroy()}}),[r]);var j=E("initialUrl",[]),b=Object(x.a)(j,2),m=b[0].data,h=b[1];return Object(c.useEffect)((function(){void 0!==r.champion_id&&h("/api/champions/".concat(r.champion_id,"/skins"))}),[r]),Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(a.Div,{pos:"fixed",w:"100%",h:"100%",minW:"700px",children:Object(d.jsx)(a.Image,{src:r.full_image_url,w:"100%"})}),Object(d.jsx)(a.Div,{p:"200px"}),Object(d.jsxs)(a.Div,{className:"content-container",bg:"transparent",children:[Object(d.jsx)(a.Div,{className:"content-background",bg:"black600"}),Object(d.jsx)("div",{className:"content-title",children:Object(d.jsx)(a.Text,{textSize:{xs:"1rem",md:"1.5rem"},children:r.name})}),Object(d.jsx)("div",{className:"chart-container",children:Object(d.jsx)("canvas",{ref:l})}),Object(d.jsx)("div",{className:"content-title",children:Object(d.jsx)(a.Text,{textSize:{xs:"1rem",md:"1.5rem"},children:"\ucc54\ud53c\uc5b8\uc758 \ub2e4\ub978 \uc2a4\ud0a8\ub4e4"})}),Object(d.jsx)(a.Div,{p:{y:"1rem"},children:Object(d.jsx)(u,{list:m,flktyOption:{initialIndex:0,cellAlign:"left",contain:"true"},cellOption:{type:"champion-skins"}})})]})]})};var I=function(){return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(a.Div,{className:"main-background"}),Object(d.jsx)("header",{className:"main-header",children:Object(d.jsx)(b,{anchorList:[{id:0,name:"\ud648",link:"/home",type:"link"},{id:1,name:"\ucd94\ucc9c \uc2a4\ud0a8",link:"#recommend-skins",type:"hash"},{id:2,name:"\ucc54\ud53c\uc5b8 \ubaa9\ub85d",link:"#champions",type:"hash"},{id:3,name:"\uc0c8 \ud398\uc774\uc9c0",link:"/skins",type:"new-tab"},{id:4,name:"\uc2a4\ud0a8",link:"/skins",type:"link"}]})}),Object(d.jsxs)(o.d,{children:[Object(d.jsx)(o.b,{exact:!0,path:"/",children:Object(d.jsx)(o.a,{to:"/home"})}),Object(d.jsx)(o.b,{exact:!0,path:"/home",children:Object(d.jsx)(F,{})}),Object(d.jsx)(o.b,{exact:!0,path:"/skins/:skinId",children:Object(d.jsx)(D,{})}),Object(d.jsx)(o.b,{exect:!0,path:"/skins",children:Object(d.jsx)("p",{children:"skin page"})}),Object(d.jsx)(o.b,{path:"/",children:Object(d.jsx)("p",{children:"404 error"})})]})]})},L=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,141)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),i(e),r(e),s(e)}))},T=n(11),_=new(n(59).a);s.a.render(Object(d.jsx)(i.a.StrictMode,{children:Object(d.jsx)(T.Provider,{value:_,debug:undefined,debugAfterHydration:!0,children:Object(d.jsxs)(a.ThemeProvider,{theme:{colors:{primary:"tomato",accent:"yellow"}},children:[Object(d.jsx)(a.StyleReset,{}),Object(d.jsx)(l.a,{children:Object(d.jsx)(I,{})})]})})}),document.getElementById("root")),L()},65:function(e,t,n){},66:function(e,t,n){},99:function(e,t,n){}},[[140,1,2]]]);
//# sourceMappingURL=main.dfb333f7.chunk.js.map