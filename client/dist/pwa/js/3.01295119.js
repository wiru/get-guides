(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"2a82":function(t,e,i){t.exports=i.p+"img/GG1.b675d7bc.png"},"4ab8":function(t,e,i){t.exports=i.p+"img/GetGuides.8ea99062.png"},"713b":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-layout",{attrs:{view:"lHh Lpr lFf"}},[a("q-header",{attrs:{elevated:""}},["Login"!==this.$store.state.currentView?a("q-toolbar",["traveller"===this.$store.state.userType||"guide"===this.$store.state.userType||"admin"===this.$store.state.userType?a("q-btn",{attrs:{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu"},on:{click:function(e){t.leftDrawerOpen=!t.leftDrawerOpen}}}):t._e(),a("q-toolbar-title",[t._v("\n        "+t._s(this.$store.state.currentView)+"\n      ")]),"Messages"===this.$store.state.currentView||"SelectedProfile"===this.$store.state.currentView||"SearchResults"===this.$store.state.currentView?a("q-btn",{attrs:{dense:"",flat:"",icon:"arrow_back",label:"Back"},on:{click:t.goBack}}):t._e()],1):t._e()],1),a("q-drawer",{staticClass:"text-white",attrs:{color:"white","content-class":"bg-primary"},model:{value:t.leftDrawerOpen,callback:function(e){t.leftDrawerOpen=e},expression:"leftDrawerOpen"}},[a("q-list",[a("div",{staticClass:"flex column flex-center"},[a("q-img",{staticClass:"q-ma-lg",staticStyle:{"max-width":"40%",height:"auto"},attrs:{src:i("2a82")}}),a("q-img",{staticClass:"q-mb-lg",staticStyle:{"max-width":"60%",height:"auto"},attrs:{src:i("4ab8")}})],1),"traveller"===this.$store.state.userType?a("div",t._l(t.searchLinks,(function(e){return a("SearchLink",t._b({key:e.title,staticClass:"text-h6",on:{clicked:function(e){t.leftDrawerOpen=!t.leftDrawerOpen}}},"SearchLink",e,!1))})),1):t._e(),"guide"===this.$store.state.userType?a("div",t._l(t.profileLinks,(function(e){return a("ProfileLink",t._b({key:e.title,staticClass:"text-h6",on:{clicked:function(e){t.leftDrawerOpen=!t.leftDrawerOpen}}},"ProfileLink",e,!1))})),1):t._e(),t._l(t.essentialLinks,(function(e){return a("EssentialLink",t._b({key:e.title,staticClass:"text-h6",on:{clicked:function(e){t.leftDrawerOpen=!t.leftDrawerOpen}}},"EssentialLink",e,!1))})),!0===this.$store.state.loggedIn?a("EssentialLink",t._b({key:t.logoutData.title,staticClass:"text-h6"},"EssentialLink",t.logoutData,!1)):t._e()],2)],1),a("q-page-container",[a("router-view")],1)],1)},n=[],s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("q-item",{attrs:{clickable:"",tag:"span"},on:{click:function(e){return t.changeView(t.view)}}},[t.icon?i("q-item-section",{attrs:{avatar:""}},[i("q-icon",{attrs:{name:t.icon}})],1):t._e(),i("q-item-section",[i("q-item-label",[t._v(t._s(t.title))]),i("q-item-label",{staticClass:"text-white",attrs:{caption:""}},[t._v("\n      "+t._s(t.caption)+"\n    ")])],1)],1)},r=[],o={methods:{changeView(t){if(this.$store.commit("changeView",t),"Bookings"===t&&this.$store.dispatch("getBookings"),"Chats"===t){const e={id:this.$store.state.id,nextPage:t};"traveller"===this.$store.state.userType?this.$store.dispatch("getTravellerChats",e):this.$store.dispatch("getGuideChats",e),console.log("This is inside Essential Link, getchats",e)}}},name:"EssentialLink",props:{title:{type:String,required:!0},caption:{type:String,default:""},view:{type:String,default:""},icon:{type:String,default:""}}},c=o,l=i("2877"),u=i("66e5"),h=i("4074"),p=i("0016"),m=i("0170"),g=i("eebe"),w=i.n(g),f=Object(l["a"])(c,s,r,!1,null,null,null),d=f.exports;w()(f,"components",{QItem:u["a"],QItemSection:h["a"],QIcon:p["a"],QItemLabel:m["a"]});var k=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("q-item",{attrs:{clickable:"",tag:"span"},on:{click:function(e){return t.changeView(t.view)}}},[t.icon?i("q-item-section",{attrs:{avatar:""}},[i("q-icon",{attrs:{name:t.icon}})],1):t._e(),i("q-item-section",[i("q-item-label",[t._v(t._s(t.title))]),i("q-item-label",{staticClass:"text-white",attrs:{caption:""}},[t._v("\n      "+t._s(t.caption)+"\n    ")])],1)],1)},b=[],v={methods:{changeView(t){const e={id:this.$store.state.id,nextPage:t};this.$store.dispatch("getUser",e)}},name:"ProfileLink",props:{title:{type:String,required:!0},caption:{type:String,default:""},view:{type:String,default:""},icon:{type:String,default:""}}},_=v,q=Object(l["a"])(_,k,b,!1,null,null,null),y=q.exports;w()(q,"components",{QItem:u["a"],QItemSection:h["a"],QIcon:p["a"],QItemLabel:m["a"]});var L=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("q-item",{attrs:{clickable:"",tag:"span"},on:{click:function(e){return t.changeView(t.view)}}},[t.icon?i("q-item-section",{attrs:{avatar:""}},[i("q-icon",{attrs:{name:t.icon}})],1):t._e(),i("q-item-section",[i("q-item-label",[t._v(t._s(t.title))]),i("q-item-label",{staticClass:"text-white",attrs:{caption:""}},[t._v("\n      "+t._s(t.caption)+"\n    ")])],1)],1)},S=[],$={methods:{changeView(t){this.$store.commit("changeView",t)}},name:"SearchLink",props:{title:{type:String,required:!0},caption:{type:String,default:""},view:{type:String,default:""},icon:{type:String,default:""}}},x=$,Q=Object(l["a"])(x,L,S,!1,null,null,null),C=Q.exports;w()(Q,"components",{QItem:u["a"],QItemSection:h["a"],QIcon:p["a"],QItemLabel:m["a"]});const V={title:"Logout",caption:"Bye bye",icon:"logout",view:"Logout"},D=[{title:"My Profile",caption:"Show and edit your own Profile",icon:"person",view:"MyProfile"}],O=[{title:"Search",caption:"Search for Guides",icon:"search",view:"Search"}],I=[{title:"Bookings",caption:"Check your bookings",icon:"book_online",view:"Bookings"},{title:"How to",caption:"How to use the App",icon:"help_outline",view:"HowTo"},{title:"Chats",caption:"Your chats",icon:"message",view:"Chats"},{title:"About Us",caption:"The team behind Get Guides",icon:"favorite",view:"AboutUs"}];var T={name:"MainLayout",components:{EssentialLink:d,ProfileLink:y,SearchLink:C},data(){return{leftDrawerOpen:!1,essentialLinks:I,profileLinks:D,searchLinks:O,logoutData:V}},methods:{goBack(){"Messages"===this.$store.state.currentView?this.$store.commit("changeView","Chats"):"SearchResults"===this.$store.state.currentView?this.$store.commit("changeView","Search"):"SelectedProfile"===this.$store.state.currentView&&this.$store.commit("changeView","SearchResults")}}},P=T,E=(i("89d3"),i("4d5a")),B=i("e359"),G=i("65c6"),M=i("9c40"),H=i("6ac5"),j=i("9404"),A=i("1c1c"),R=i("068f"),U=i("09e3"),J=Object(l["a"])(P,a,n,!1,null,null,null);e["default"]=J.exports;w()(J,"components",{QLayout:E["a"],QHeader:B["a"],QToolbar:G["a"],QBtn:M["a"],QToolbarTitle:H["a"],QDrawer:j["a"],QList:A["a"],QImg:R["a"],QPageContainer:U["a"]})},"89d3":function(t,e,i){"use strict";i("e87e")},e87e:function(t,e,i){}}]);