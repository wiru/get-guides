(function(e){function t(t){for(var a,s,r=t[0],l=t[1],c=t[2],u=0,d=[];u<r.length;u++)s=r[u],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&d.push(n[s][0]),n[s]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);g&&g(t);while(d.length)d.shift()();return i.push.apply(i,c||[]),o()}function o(){for(var e,t=0;t<i.length;t++){for(var o=i[t],a=!0,s=1;s<o.length;s++){var r=o[s];0!==n[r]&&(a=!1)}a&&(i.splice(t--,1),e=l(l.s=o[0]))}return e}var a={},s={1:0},n={1:0},i=[];function r(e){return l.p+"js/"+({}[e]||e)+"."+{2:"71a13c8f",3:"cfbd0114",4:"efd95bd9",5:"bb9a7074"}[e]+".js"}function l(t){if(a[t])return a[t].exports;var o=a[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,l),o.l=!0,o.exports}l.e=function(e){var t=[],o={2:1};s[e]?t.push(s[e]):0!==s[e]&&o[e]&&t.push(s[e]=new Promise((function(t,o){for(var a="css/"+({}[e]||e)+"."+{2:"387b0b40",3:"31d6cfe0",4:"31d6cfe0",5:"31d6cfe0"}[e]+".css",n=l.p+a,i=document.getElementsByTagName("link"),r=0;r<i.length;r++){var c=i[r],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===a||u===n))return t()}var d=document.getElementsByTagName("style");for(r=0;r<d.length;r++){c=d[r],u=c.getAttribute("data-href");if(u===a||u===n)return t()}var g=document.createElement("link");g.rel="stylesheet",g.type="text/css",g.onload=t,g.onerror=function(t){var a=t&&t.target&&t.target.src||n,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete s[e],g.parentNode.removeChild(g),o(i)},g.href=n;var h=document.getElementsByTagName("head")[0];h.appendChild(g)})).then((function(){s[e]=0})));var a=n[e];if(0!==a)if(a)t.push(a[2]);else{var i=new Promise((function(t,o){a=n[e]=[t,o]}));t.push(a[2]=i);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=r(e);var d=new Error;c=function(t){u.onerror=u.onload=null,clearTimeout(g);var o=n[e];if(0!==o){if(o){var a=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+s+")",d.name="ChunkLoadError",d.type=a,d.request=s,o[1](d)}n[e]=void 0}};var g=setTimeout((function(){c({type:"timeout",target:u})}),12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(t)},l.m=e,l.c=a,l.d=function(e,t,o){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(l.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)l.d(o,a,function(t){return e[t]}.bind(null,a));return o},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="",l.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var g=u;i.push([0,0]),o()})({0:function(e,t,o){e.exports=o("2f39")},"2f39":function(e,t,o){"use strict";o.r(t);o("5319"),o("7d6e"),o("e54f"),o("985d"),o("31cd");var a=o("2b0e"),s=o("1f91"),n=o("42d2"),i=o("b05d");a["a"].use(i["a"],{config:{},lang:s["a"],iconSet:n["a"]});var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"q-app"}},[o("router-view")],1)},l=[],c={name:"App",mounted(){}},u=c,d=o("2877"),g=Object(d["a"])(u,r,l,!1,null,null,null),h=g.exports,p=(o("ddb0"),o("2f62")),m=o("bc3a"),f=o.n(m);function v(e){return t=>{t.$socket=e,e.on("authResult",(o=>{e.auth.token=o.id,e.disconnect().connect(),t.commit("setUserId",o.id),"Search"===o.path?t.commit("setUserType","traveller"):"SelectedProfile"===o.path&&t.commit("setUserType","guide"),t.commit("changeView",o.path),t.commit("loggedIn",o.loggedIn),console.log("payload path is: ",o.path),"Registration"===o.path&&(t.commit("setUserName",o.name),t.commit("setUserEmail",o.email),t.commit("setUsergid",o.gid))})),e.on("chatUpdate",(e=>t.commit("chatUpdate",e)))}}var y=o("6c23");a["a"].use(p["a"]);const b=v(y["a"]);var w=new p["a"].Store({state:{currentView:"Login",userType:"guide",id:"",name:"",email:"",gid:"",travellerPackage:{},guidePackage:{},currentChat:"",currentChatLog:[],typingStatus:!1,chatList:[],singleGuide:{},bookings:[],filteredGuides:[],somethingStupid:0,loggedIn:"false"},plugins:[b],mutations:{changeView(e,t){this.state.currentView=t},loggedIn(e,t){this.state.loggedIn=t},setUserType(e,t){console.log("setting user type to: ",t),this.state.userType=t},setUserId(e,t){this.state.id=t},setCurrentChat(e,t){this.state.currentChat=t,console.log(this.state.currentChat)},chatUpdate(e,t){for(message of t)this.state.currentChatLog.push(message)},setUserName(e,t){this.state.name=t},setUserEmail(e,t){this.state.email=t},setUsergid(e,t){this.state.gid=t},setTravellerPackage(e,t){this.state.travellerPackage=t},setGuidePackage(e,t){this.state.guidePackage=t},setFilteredGuides(e,t){this.state.filteredGuides=t,console.log("Setter's"),console.log(this.state.filteredGuides)},setSingleGuide(e,t){this.state.singleGuide.id=t._id,this.state.singleGuide.name=t.name,this.state.singleGuide.avatar=t.avatar,this.state.singleGuide.languages=t.languages,this.state.singleGuide.locations=t.locations,this.state.singleGuide.weekdays=t.weekdays,this.state.singleGuide.bio=t.bio,this.state.singleGuide.gallery=t.gallery,this.state.singleGuide.rate=t.rate,this.state.singleGuide.unavailableDates=t.unavailable_dates,console.log("setter function"),this.state.somethingStupid+=1,console.log("forced render",Date.now())},setChatList(e,t){console.log("setChatList payload: ",t),this.state.chatList=t,console.log("chat list is : ",this.state.chatList)},appendMessage(e,t){this.state.currentChatLog.push(t)},setTypingStatus(e,t){this.state.typingStatus=t}},actions:{login(e){this.$router.push("https://getguides.herokuapp.com/login")},async receiveMessage(e,t){console.log("this was received:",t)},async search(e,t){e.commit("setFilteredGuides")},async getFilteredGuides(e,t){console.log("Payload is: ",t);const o=t.location,a=t.language,s=t.date,n=t.meme,i=(await f.a.get(`https://getguides.herokuapp.com/api/guides/search/${o}/${a}/${s}/${n}`)).data;e.commit("setFilteredGuides",i)},async getSingleGuide(e,t){console.log("getSingleGuide called",t);try{const o=(await f.a.get(`https://getguides.herokuapp.com/api/guides/${t}`)).data;console.log(o),e.commit("setSingleGuide",o),console.log("state commit setSingleGuide happened")}catch(o){console.log(o)}},async getChatLog(e,t){const o=(await f.a.get(`https://getguides.herokuapp.com/api/conversations/${t}/messages`)).data;console.log("data: ",o),console.log("messages: ",o.messages),this.state.currentChatLog=o.messages,this.state.sendTo=o.traveller._id,console.log(this.state.sendTo)},async getTravellerChats(e,t){console.log("getTrav payload should be id: ",t);const o=(await f.a.get(`https://getguides.herokuapp.com/api/conversations/traveller/${t}`)).data;e.commit("setChatList",o)},async getGuideChats(e,t){const o=(await f.a.get(`https://getguides.herokuapp.com/api/conversations/guide/${t}`)).data;e.commit("setChatList",o)},async getBookings(e){const t=(await f.a.get(`https://getguides.herokuapp.com/api/bookings/${this.state.userType}/${this.state.id}`)).data;this.state.bookings=t,console.log(this.state)},async someShit(e,t){let o={traveller:"60b6326339b7417d0f2649ad",guide:"60b47b595c7aa6b557654a30",location:"your mom",date:"Tomorrow, I guess",start_time:"lol",end_time:"ecks Dee",meeting_location:"deez nuts",details:"I have ligma",status:"pending",conversation:"098123098312980"};f.a.post("https://getguides.herokuapp.com/api/bookings",o)},async travellerPackage(e,t){y["a"].emit("newTravellerRegistration",t),console.log("newTravellerRegistration on front")},async guidePackage(e,t){y["a"].emit("newGuideRegistration",t),console.log("newGuideRegistration on front")}}}),k=o("8c4f");const S=[{path:"/",component:()=>Promise.all([o.e(0),o.e(3)]).then(o.bind(null,"713b")),children:[{path:"",component:()=>Promise.all([o.e(0),o.e(2)]).then(o.bind(null,"8b24"))}]},{path:"https://getguides.herokuapp.com/authorized",component:()=>Promise.all([o.e(0),o.e(5)]).then(o.bind(null,"bd8c"))},{path:"https://getguides.herokuapp.com/login",name:"login",beforeEnter(){location.href="/login"}},{path:"*",component:()=>Promise.all([o.e(0),o.e(4)]).then(o.bind(null,"e51e"))}];var G=S;a["a"].use(k["a"]);var P=function(){const e=new k["a"]({scrollBehavior:()=>({x:0,y:0}),routes:G,mode:"hash",base:""});return e},C=async function(){const e="function"===typeof w?await w({Vue:a["a"]}):w,t="function"===typeof P?await P({Vue:a["a"],store:e}):P;e.$router=t;const o={router:t,store:e,render:e=>e(h),el:"#q-app"};return{app:o,store:e,router:t}};a["a"].prototype.$axios=f.a;const T="";async function L(){const{app:e,store:t,router:o}=await C();let s=!1;const n=e=>{s=!0;const t=Object(e)===e?o.resolve(e).route.fullPath:e;window.location.href=t},i=window.location.href.replace(window.location.origin,""),r=[void 0];for(let c=0;!1===s&&c<r.length;c++)if("function"===typeof r[c])try{await r[c]({app:e,router:o,store:t,Vue:a["a"],ssrContext:null,redirect:n,urlPath:i,publicPath:T})}catch(l){return l&&l.url?void(window.location.href=l.url):void console.error("[Quasar] boot error:",l)}!0!==s&&new a["a"](e)}L()},"31cd":function(e,t,o){},"6c23":function(e,t,o){"use strict";var a=o("8e27"),s=o.n(a);let n="blank";const i=s()("https://getguides.herokuapp.com",{auth:{token:n}});i.on("connect",(()=>{console.log("connected now")})),i.on("disconnect",(()=>{console.log("disconnected now")})),i.on("updateId",(e=>{console.log("id is currently: ",n),console.log("id arriving as: ",e),n=e,console.log("newId is: ",n)})),i.on("changeView",(()=>{console.log("store access here"),(void 0).$store.state.currentView="HowTo"})),i.on("relayMessage",(e=>{console.log("Message Arrived"),(void 0).$store.commit("appendMessage",e)})),i.on("typingStatus",(e=>{console.log("Typing Status Arrived"),(void 0).$store.commit("settypingStatus",e)})),t["a"]=i}});