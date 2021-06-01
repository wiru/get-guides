(function(e){function t(t){for(var r,o,s=t[0],l=t[1],c=t[2],u=0,d=[];u<s.length;u++)o=s[u],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);h&&h(t);while(d.length)d.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var s=n[o];0!==a[s]&&(r=!1)}r&&(i.splice(t--,1),e=l(l.s=n[0]))}return e}var r={},o={1:0},a={1:0},i=[];function s(e){return l.p+"js/"+({}[e]||e)+"."+{2:"344b6514",3:"d83a4557",4:"efd95bd9"}[e]+".js"}function l(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],n={2:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{2:"eca893ce",3:"31d6cfe0",4:"31d6cfe0"}[e]+".css",a=l.p+r,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var c=i[s],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===r||u===a))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){c=d[s],u=c.getAttribute("data-href");if(u===r||u===a)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var r=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[e],h.parentNode.removeChild(h),n(i)},h.href=a;var f=document.getElementsByTagName("head")[0];f.appendChild(h)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=i);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=s(e);var d=new Error;c=function(t){u.onerror=u.onload=null,clearTimeout(h);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,n[1](d)}a[e]=void 0}};var h=setTimeout((function(){c({type:"timeout",target:u})}),12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(t)},l.m=e,l.c=r,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(n,r,function(t){return e[t]}.bind(null,r));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="",l.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var h=u;i.push([0,0]),n()})({0:function(e,t,n){e.exports=n("2f39")},"2f39":function(e,t,n){"use strict";n.r(t);n("ddb0"),n("5319"),n("7d6e"),n("e54f"),n("985d"),n("31cd");var r=n("2b0e"),o=n("1f91"),a=n("42d2"),i=n("b05d");r["a"].use(i["a"],{config:{},lang:o["a"],iconSet:a["a"]});var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"q-app"}},[n("router-view")],1)},l=[],c={name:"App",mounted(){}},u=c,d=n("2877"),h=Object(d["a"])(u,s,l,!1,null,null,null),f=h.exports,p=n("2f62"),m=n("bc3a"),g=n.n(m);function w(e){return t=>{t.$socket=e,e.on("message",(e=>t.dispatch("receiveMessage",e)))}}var v=n("8e27"),y=n.n(v);const b=y()("http://localhost:5000",{transportOptions:{polling:{auth:123}}});b.on("connect",(()=>{console.log("connected now"),b.emit()})),b.on("disconnect",(()=>{console.log("disconnected now")})),b.on("authorized",(()=>{(void 0).$store.commit("changeView","HowTo")}));var k=b;r["a"].use(p["a"]);const P=w(k);var O=new p["a"].Store({state:{currentView:"Login",userType:"",userData:{uuid:911327098,name:"Simon Wensleydale",email:"cheese-enthusiast@email.com",location:"Utsunomiya",languages:[{English:5},{Japanese:3},{Burmese:2},{Xhosa:5}],rating:0,weekdays:["Monday","Friday"],blacklist:[],whitelist:[],completedTours:55,bio:"Wensleydale cheese was first made by French Cistercian monks from the Roquefort region, who had settled in Wensleydale. They built a monastery at Fors, but some years later the monks moved to Jervaulx in Lower Wensleydale. They brought with them a recipe for making cheese from sheep's milk. During the 14th century cows' milk began to be used instead, and the character of the cheese began to change. A little ewes' milk was still mixed in since it gave a more open texture, and allowed the development of the blue mould. At that time, Wensleydale was almost always blue with the white variety almost unknown."},filteredGuides:[]},plugins:[P],mutations:{changeView(e,t){this.state.currentView=t},setUserType(e,t){this.state.userType="traveller"},setFilteredGuides(e,t){this.state.filteredGuides=t}},actions:{search(e,t){e.commit("setFilteredGuides")},dispatchMessage(e,t){k.emit("Message",t),console.log("I SENT IT YOU PRICK")}}}),S=n("8c4f");const T=[{path:"/",component:()=>Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"713b")),children:[{path:"",component:()=>Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"8b24"))}]},{path:"*",component:()=>Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"e51e"))}];var j=T;r["a"].use(S["a"]);var x=function(){const e=new S["a"]({scrollBehavior:()=>({x:0,y:0}),routes:j,mode:"hash",base:""});return e},E=async function(){const e="function"===typeof O?await O({Vue:r["a"]}):O,t="function"===typeof x?await x({Vue:r["a"],store:e}):x;e.$router=t;const n={router:t,store:e,render:e=>e(f),el:"#q-app"};return{app:n,store:e,router:t}},_=n("9483");Object(_["a"])("service-worker.js",{registrationOptions:{scope:"./"},ready(){console.log("Service worker is active.")},registered(){console.log("Service worker has been registered in the file where it shouldnt.")},cached(){},updatefound(){},updated(){},offline(){},error(){}}),r["a"].prototype.$axios=g.a,/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream&&window.navigator.standalone&&n.e(0).then(n.t.bind(null,"a0db",7));const A="";async function C(){const{app:e,store:t,router:n}=await E();let o=!1;const a=e=>{o=!0;const t=Object(e)===e?n.resolve(e).route.fullPath:e;window.location.href=t},i=window.location.href.replace(window.location.origin,""),s=[void 0];for(let c=0;!1===o&&c<s.length;c++)if("function"===typeof s[c])try{await s[c]({app:e,router:n,store:t,Vue:r["a"],ssrContext:null,redirect:a,urlPath:i,publicPath:A})}catch(l){return l&&l.url?void(window.location.href=l.url):void console.error("[Quasar] boot error:",l)}!0!==o&&new r["a"](e)}C()},"31cd":function(e,t,n){}});