(function(e){var t={};function s(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s="aec2")})({"0719":function(e,t,s){"use strict";try{self["workbox:core:5.1.4"]&&_()}catch(n){}},"6aa8":function(e,t,s){"use strict";try{self["workbox:strategies:5.1.4"]&&_()}catch(n){}},aec2:function(e,t,s){"use strict";s.r(t);s("c700");const n=[],r={get(){return n},add(e){n.push(...e)}};s("0719");const o={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!==typeof registration?registration.scope:""},c=e=>[o.prefix,e,o.suffix].filter((e=>e&&e.length>0)).join("-"),a=e=>{for(const t of Object.keys(o))e(t)},i={updateDetails:e=>{a((t=>{"string"===typeof e[t]&&(o[t]=e[t])}))},getGoogleAnalyticsName:e=>e||c(o.googleAnalytics),getPrecacheName:e=>e||c(o.precache),getPrefix:()=>o.prefix,getRuntimeName:e=>e||c(o.runtime),getSuffix:()=>o.suffix},h=e=>{const t=new URL(String(e),location.href);return t.href.replace(new RegExp(`^${location.origin}`),"")},u=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s},l=u;class f extends Error{constructor(e,t){const s=l(e,t);super(s),this.name=e,this.details=t}}const d=new Set;async function p(){for(const e of d)await e()}const g={filter:(e,t)=>e.filter((e=>t in e))},w=async({request:e,mode:t,plugins:s=[]})=>{const n=g.filter(s,"cacheKeyWillBeUsed");let r=e;for(const o of n)r=await o["cacheKeyWillBeUsed"].call(o,{mode:t,request:r}),"string"===typeof r&&(r=new Request(r));return r},m=async({request:e,response:t,event:s,plugins:n=[]})=>{let r=t,o=!1;for(const c of n)if("cacheWillUpdate"in c){o=!0;const t=c["cacheWillUpdate"];if(r=await t.call(c,{request:e,response:r,event:s}),!r)break}return o||(r=r&&200===r.status?r:void 0),r||null},y=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:r=[]})=>{const o=await self.caches.open(e),c=await w({plugins:r,request:t,mode:"read"});let a=await o.match(c,n);for(const i of r)if("cachedResponseWillBeUsed"in i){const t=i["cachedResponseWillBeUsed"];a=await t.call(i,{cacheName:e,event:s,matchOptions:n,cachedResponse:a,request:c})}return a},_=async({cacheName:e,request:t,response:s,event:n,plugins:r=[],matchOptions:o})=>{const c=await w({plugins:r,request:t,mode:"write"});if(!s)throw new f("cache-put-with-no-response",{url:h(c.url)});const a=await m({event:n,plugins:r,response:s,request:c});if(!a)return void 0;const i=await self.caches.open(e),u=g.filter(r,"cacheDidUpdate"),l=u.length>0?await y({cacheName:e,matchOptions:o,request:c}):null;try{await i.put(c,a)}catch(d){throw"QuotaExceededError"===d.name&&await p(),d}for(const h of u)await h["cacheDidUpdate"].call(h,{cacheName:e,event:n,oldResponse:l,newResponse:a,request:c})},v={put:_,match:y},R=async({request:e,fetchOptions:t,event:s,plugins:n=[]})=>{if("string"===typeof e&&(e=new Request(e)),s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const r=g.filter(n,"fetchDidFail"),o=r.length>0?e.clone():null;try{for(const t of n)if("requestWillFetch"in t){const n=t["requestWillFetch"],r=e.clone();e=await n.call(t,{request:r,event:s})}}catch(a){throw new f("plugin-error-request-will-fetch",{thrownError:a})}const c=e.clone();try{let r;r="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of n)"fetchDidSucceed"in e&&(r=await e["fetchDidSucceed"].call(e,{event:s,request:c,response:r}));return r}catch(i){0;for(const e of r)await e["fetchDidFail"].call(e,{error:i,event:s,originalRequest:o.clone(),request:c.clone()});throw i}},q={fetch:R};let U;function L(){if(void 0===U){const t=new Response("");if("body"in t)try{new Response(t.body),U=!0}catch(e){U=!1}U=!1}return U}async function T(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},r=t?t(n):n,o=L()?s.body:await s.blob();return new Response(o,r)}const x="__WB_REVISION__";function b(e){if(!e)throw new f("add-to-cache-list-unexpected-type",{entry:e});if("string"===typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new f("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(s,location.href),r=new URL(s,location.href);return n.searchParams.set(x,t),{cacheKey:n.href,url:r.href}}class N{constructor(e){this._cacheName=i.getPrecacheName(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const s of e){"string"===typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);const{cacheKey:e,url:n}=b(s),r="string"!==typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new f("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!==typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new f("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,s.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,r),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],r=await self.caches.open(this._cacheName),o=await r.keys(),c=new Set(o.map((e=>e.url)));for(const[h,u]of this._urlsToCacheKeys)c.has(u)?n.push(h):s.push({cacheKey:u,url:h});const a=s.map((({cacheKey:s,url:n})=>{const r=this._cacheKeysToIntegrities.get(s),o=this._urlsToCacheModes.get(n);return this._addURLToCache({cacheKey:s,cacheMode:o,event:e,integrity:r,plugins:t,url:n})}));await Promise.all(a);const i=s.map((e=>e.url));return{updatedURLs:i,notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const r of t)s.has(r.url)||(await e.delete(r),n.push(r.url));return{deletedURLs:n}}async _addURLToCache({cacheKey:e,url:t,cacheMode:s,event:n,plugins:r,integrity:o}){const c=new Request(t,{integrity:o,cache:s,credentials:"same-origin"});let a,i=await q.fetch({event:n,plugins:r,request:c});for(const u of r||[])"cacheWillUpdate"in u&&(a=u);const h=a?await a.cacheWillUpdate({event:n,request:c,response:i}):i.status<400;if(!h)throw new f("bad-precaching-response",{url:t,status:i.status});i.redirected&&(i=await T(i)),await v.put({event:n,plugins:r,response:i,request:e===t?c:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){const e=await self.caches.open(this._cacheName);return e.match(s)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new f("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(s){if(e)return fetch(t);throw s}}}createHandlerBoundToURL(e,t=!0){const s=this.getCacheKeyForURL(e);if(!s)throw new f("non-precached-url",{url:e});const n=this.createHandler(t),r=new Request(e);return()=>n({request:r})}}let C;const K=()=>(C||(C=new N),C);function O(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}function*P(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:r}={}){const o=new URL(e,location.href);o.hash="",yield o.href;const c=O(o,t);if(yield c.href,s&&c.pathname.endsWith("/")){const e=new URL(c.href);e.pathname+=s,yield e.href}if(n){const e=new URL(c.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:o});for(const t of e)yield t.href}}const M=(e,t)=>{const s=K(),n=s.getURLsToCacheKeys();for(const r of P(e,t)){const e=n.get(r);if(e)return e}},S=({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const r=i.getPrecacheName();self.addEventListener("fetch",(o=>{const c=M(o.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!c)return void 0;let a=self.caches.open(r).then((e=>e.match(c))).then((e=>e||fetch(c)));o.respondWith(a)}))};let k=!1;function W(e){k||(S(e),k=!0)}const E=e=>{const t=K(),s=r.get();e.waitUntil(t.install({event:e,plugins:s}).catch((e=>{throw e})))},j=e=>{const t=K();e.waitUntil(t.activate())};function F(e){const t=K();t.addToCacheList(e),e.length>0&&(self.addEventListener("install",E),self.addEventListener("activate",j))}function H(e,t){F(e),W(t)}s("e6d2");const I="GET",A=e=>e&&"object"===typeof e?e:{handle:e};class D{constructor(e,t,s=I){this.handler=A(t),this.match=e,this.method=s}}class B extends D{constructor(e,t,s){const n=({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)};super(n,t,s)}}class ${constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((e=>{"string"===typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const{params:n,route:r}=this.findMatchingRoute({url:s,request:e,event:t});let o=r&&r.handler;if(!o&&this._defaultHandler&&(o=this._defaultHandler),!o)return void 0;let c;try{c=o.handle({url:s,request:e,event:t,params:n})}catch(a){c=Promise.reject(a)}return c instanceof Promise&&this._catchHandler&&(c=c.catch((n=>this._catchHandler.handle({url:s,request:e,event:t})))),c}findMatchingRoute({url:e,request:t,event:s}){const n=this._routes.get(t.method)||[];for(const r of n){let n;const o=r.match({url:e,request:t,event:s});if(o)return n=o,(Array.isArray(o)&&0===o.length||o.constructor===Object&&0===Object.keys(o).length||"boolean"===typeof o)&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e){this._defaultHandler=A(e)}setCatchHandler(e){this._catchHandler=A(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new f("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new f("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let G;const J=()=>(G||(G=new $,G.addFetchListener(),G.addCacheListener()),G);function Q(e,t,s){let n;if("string"===typeof e){const r=new URL(e,location.href);0;const o=({url:e})=>e.href===r.href;n=new D(o,t,s)}else if(e instanceof RegExp)n=new B(e,t,s);else if("function"===typeof e)n=new D(e,t,s);else{if(!(e instanceof D))throw new f("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}const r=J();return r.registerRoute(n),n}s("6aa8");const V={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class z{constructor(e={}){if(this._cacheName=i.getRuntimeName(e.cacheName),e.plugins){const t=e.plugins.some((e=>!!e.cacheWillUpdate));this._plugins=t?e.plugins:[V,...e.plugins]}else this._plugins=[V];this._networkTimeoutSeconds=e.networkTimeoutSeconds||0,this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){const s=[];"string"===typeof t&&(t=new Request(t));const n=[];let r;if(this._networkTimeoutSeconds){const{id:o,promise:c}=this._getTimeoutPromise({request:t,event:e,logs:s});r=o,n.push(c)}const o=this._getNetworkPromise({timeoutId:r,request:t,event:e,logs:s});n.push(o);let c=await Promise.race(n);if(c||(c=await o),!c)throw new f("no-response",{url:t.url});return c}_getTimeoutPromise({request:e,logs:t,event:s}){let n;const r=new Promise((t=>{const r=async()=>{t(await this._respondFromCache({request:e,event:s}))};n=setTimeout(r,1e3*this._networkTimeoutSeconds)}));return{promise:r,id:n}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,event:n}){let r,o;try{o=await q.fetch({request:t,event:n,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(c){r=c}if(e&&clearTimeout(e),r||!o)o=await this._respondFromCache({request:t,event:n});else{const e=o.clone(),s=v.put({cacheName:this._cacheName,request:t,response:e,event:n,plugins:this._plugins});if(n)try{n.waitUntil(s)}catch(c){0}}return o}_respondFromCache({event:e,request:t}){return v.match({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins})}}console.log("Entering custom Service Worker."),H([{'revision':'5956a4de96d88901e360d3b7acfe040b','url':'css/2.bf9a9042.css'},{'revision':'06d7d820a879f26ce6ecac98b560340d','url':'css/3.360c1b89.css'},{'revision':'d41d8cd98f00b204e9800998ecf8427e','url':'css/app.0e433876.css'},{'revision':'0b1140aa45b2a739a552e785d13a84aa','url':'css/vendor.2a0d7296.css'},{'revision':'078194ddf03d0fec58899c36ed8b5f3c','url':'favicon.ico'},{'revision':'04b7fd97f88b82dccce5ec446ccc29e6','url':'fonts/KFOkCnqEu92Fr1MmgVxIIzQ.9391e6e2.woff'},{'revision':'da2721c68b4bc80db8d4c404f76b118c','url':'fonts/KFOlCnqEu92Fr1MmEU9fBBc-.ddd11dab.woff'},{'revision':'bf0f407102faf3a0b521d3b545f547a5','url':'fonts/KFOlCnqEu92Fr1MmSU5fBBc-.877b9231.woff'},{'revision':'68d6dabfe54e245e7d5d5c16c3c4b1a9','url':'fonts/KFOlCnqEu92Fr1MmWUlfBBc-.0344cc3c.woff'},{'revision':'64bba9c4e8156c152050c657e9d24bf1','url':'fonts/KFOlCnqEu92Fr1MmYUtfBBc-.b555d228.woff'},{'revision':'dc3e086fc0c5addc09702e111d2adb42','url':'fonts/KFOmCnqEu92Fr1Mu4mxM.9b78ea3b.woff'},{'revision':'6ea8adea6ad4538af5da228e8d5a201a','url':'fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.61bf3cad.woff'},{'revision':'aa7264f565de1c13e4b17ce96f0b58a7','url':'fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.72dc569a.woff2'},{'revision':'ad3b24acd50b711c492de49fd273368f','url':'icons/apple-icon-120x120.png'},{'revision':'4069588773d4c19d9595caf60386db58','url':'icons/apple-icon-152x152.png'},{'revision':'4e5bb89fe2157b43e75c5c23c4d1d761','url':'icons/apple-icon-167x167.png'},{'revision':'801267d9a1f978db580bab252f14bdf0','url':'icons/apple-icon-180x180.png'},{'revision':'24876839eb5e7c795e0db96158802788','url':'icons/apple-launch-1125x2436.png'},{'revision':'e8146402130c2acf302273f789f18990','url':'icons/apple-launch-1242x2208.png'},{'revision':'0608c1098ddb4612e83cf960bce44201','url':'icons/apple-launch-1242x2688.png'},{'revision':'78934c64906cc83e3827ec5a16b5f3ef','url':'icons/apple-launch-1536x2048.png'},{'revision':'25edc638f564954d3cadcd95911fca68','url':'icons/apple-launch-1668x2224.png'},{'revision':'b32042e233e88636b43fa180bebeac49','url':'icons/apple-launch-1668x2388.png'},{'revision':'ab1399ce402346c1b7f0c505377e8aec','url':'icons/apple-launch-2048x2732.png'},{'revision':'2b6f81eb3a7294ad4ca91606d4bcba59','url':'icons/apple-launch-640x1136.png'},{'revision':'0e2f17510f24c209fd42aafc0fc765d5','url':'icons/apple-launch-750x1334.png'},{'revision':'2464c87fd7e34ac0c423ea564c5c9a33','url':'icons/apple-launch-828x1792.png'},{'revision':'26a74fe7519df05023efaba4eafac436','url':'icons/favicon-128x128.png'},{'revision':'50ea8f7f5e0c106acc7094155424c3f1','url':'icons/favicon-16x16.png'},{'revision':'84880349e98ecc755670a577e8704d26','url':'icons/favicon-32x32.png'},{'revision':'e9c32a6acd88b5560ebdefa30ec6ea3d','url':'icons/favicon-96x96.png'},{'revision':'26a74fe7519df05023efaba4eafac436','url':'icons/icon-128x128.png'},{'revision':'3f1948d02051bdf8815ac1dbcad67987','url':'icons/icon-192x192.png'},{'revision':'af8091d42fa7cfe5a65ba6b2c5c7a998','url':'icons/icon-256x256.png'},{'revision':'d2ade618561d738365c8ab368c04071c','url':'icons/icon-384x384.png'},{'revision':'f31b169a63fd7e79df8b2dd2473b45dc','url':'icons/icon-512x512.png'},{'revision':'e780c26e71650e254a633cda5f83fa1a','url':'icons/ms-icon-144x144.png'},{'revision':'4e531d0a3fef9c18e39b12c45d2d409f','url':'icons/safari-pinned-tab.svg'},{'revision':'c26c43b72860955562f1332bb83f8004','url':'img/GG-white-red.c38a68e4.png'},{'revision':'84920ef7941e97313c34e3749546764c','url':'img/brushDiag.5f619837.png'},{'revision':'d6d87a267a6f6c97f952457641324595','url':'img/fuji.ad87449e.jpg'},{'revision':'c2c2099cafd35f59061d0de2b53f33c1','url':'index.html'},{'revision':'05f63be2e0c85a61b5bce1c4db25c46a','url':'js/2.f08a8225.js'},{'revision':'2f1669ce95b1725d10bd6b4e8bf1e771','url':'js/3.2bbf1a88.js'},{'revision':'26a66b7c99b1f1216a1762a93be2d2fc','url':'js/4.efd95bd9.js'},{'revision':'2e39f1608e821397e79ab14b4f9b342e','url':'js/app.631edbff.js'},{'revision':'4f2b3be5d151827417b5e546dffa84ab','url':'js/vendor.4a8b3b17.js'},{'revision':'3849f6f50b647430a40fbf06040cbdcc','url':'manifest.json'}]),Q((({url:e})=>e.href.startsWith("http")),new z)},c700:function(e,t,s){"use strict";try{self["workbox:precaching:5.1.4"]&&_()}catch(n){}},e6d2:function(e,t,s){"use strict";try{self["workbox:routing:5.1.4"]&&_()}catch(n){}}});