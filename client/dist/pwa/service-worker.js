if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return i[e]||(c=new Promise(async c=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=c}else importScripts(e),c()})),c.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},c=(c,i)=>{Promise.all(c.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(c)};self.define=(c,n,f)=>{i[c]||(i[c]=Promise.resolve().then(()=>{let i={};const s={uri:location.origin+c.slice(1)};return Promise.all(n.map(c=>{switch(c){case"exports":return i;case"module":return s;default:return e(c)}})).then(e=>{const c=f(...e);return i.default||(i.default=c),i})}))}}define("./service-worker.js",["./workbox-e170c028"],(function(e){"use strict";e.setCacheNameDetails({prefix:"get-guides"}),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"css/2.c45ae643.css",revision:"b7b274adf9a15c9ae742a853dc5f394e"},{url:"css/app.0e433876.css",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"css/vendor.2a0d7296.css",revision:"0b1140aa45b2a739a552e785d13a84aa"},{url:"favicon.ico",revision:"2a8261c0116ec989e73fe37e8a41ffc4"},{url:"fonts/KFOkCnqEu92Fr1MmgVxIIzQ.9391e6e2.woff",revision:"04b7fd97f88b82dccce5ec446ccc29e6"},{url:"fonts/KFOlCnqEu92Fr1MmEU9fBBc-.ddd11dab.woff",revision:"da2721c68b4bc80db8d4c404f76b118c"},{url:"fonts/KFOlCnqEu92Fr1MmSU5fBBc-.877b9231.woff",revision:"bf0f407102faf3a0b521d3b545f547a5"},{url:"fonts/KFOlCnqEu92Fr1MmWUlfBBc-.0344cc3c.woff",revision:"68d6dabfe54e245e7d5d5c16c3c4b1a9"},{url:"fonts/KFOlCnqEu92Fr1MmYUtfBBc-.b555d228.woff",revision:"64bba9c4e8156c152050c657e9d24bf1"},{url:"fonts/KFOmCnqEu92Fr1Mu4mxM.9b78ea3b.woff",revision:"dc3e086fc0c5addc09702e111d2adb42"},{url:"fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.61bf3cad.woff",revision:"6ea8adea6ad4538af5da228e8d5a201a"},{url:"fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.72dc569a.woff2",revision:"aa7264f565de1c13e4b17ce96f0b58a7"},{url:"icons/apple-icon-120x120.png",revision:"8561577d1b3be6cde50ffe15b115ab05"},{url:"icons/apple-icon-152x152.png",revision:"d820acc363f3eb8434869cfeb37fd77a"},{url:"icons/apple-icon-167x167.png",revision:"5af7b1c657c103a626c9cfc7453505fe"},{url:"icons/apple-icon-180x180.png",revision:"8fea6ddb29a02c3662c4a6178ad1984f"},{url:"icons/apple-launch-1125x2436.png",revision:"77cd2b565994d955159eb9bd70b59ff5"},{url:"icons/apple-launch-1242x2208.png",revision:"726557c25c5722040c0d767ba23a8bd3"},{url:"icons/apple-launch-1242x2688.png",revision:"57226927a0e49108a445a460f7dd1de9"},{url:"icons/apple-launch-1536x2048.png",revision:"da2074fc71f8ec88aa09f00b1dca2234"},{url:"icons/apple-launch-1668x2224.png",revision:"62195a239032b46d60c39f98671bc388"},{url:"icons/apple-launch-1668x2388.png",revision:"ff64a27ff2963769989e4fb0e7d6e205"},{url:"icons/apple-launch-2048x2732.png",revision:"19d1869a632881276f91809b6ec8f2f0"},{url:"icons/apple-launch-640x1136.png",revision:"7e8eaa032e5145bc48bdd33958147578"},{url:"icons/apple-launch-750x1334.png",revision:"e8efd53b270f81a7f657a555d9fdc255"},{url:"icons/apple-launch-828x1792.png",revision:"a4e7bd5eae805c15b369f847c1863998"},{url:"icons/favicon-128x128.png",revision:"ffdc2792819dcdd63257c36807e4d49c"},{url:"icons/favicon-16x16.png",revision:"f93d425c44a6da3c97d03b394eecaab8"},{url:"icons/favicon-32x32.png",revision:"286b0579ff62f26ea1c5f126fc5409bb"},{url:"icons/favicon-96x96.png",revision:"faf25ec8db7f7645a461e566dca8b1a1"},{url:"icons/icon-128x128.png",revision:"ffdc2792819dcdd63257c36807e4d49c"},{url:"icons/icon-192x192.png",revision:"61b3400e86348f33ea0f790a2940a360"},{url:"icons/icon-256x256.png",revision:"c7646ee522c0fe21fb1be99771969325"},{url:"icons/icon-384x384.png",revision:"d9f5efc3057ba322896f55b18048a096"},{url:"icons/icon-512x512.png",revision:"1c07de305d985c03ffdc1449f3f503b8"},{url:"icons/ms-icon-144x144.png",revision:"17710c2a5f9d86bc22cf482eb61d27fe"},{url:"icons/safari-pinned-tab.svg",revision:"a8e42fd84a5d6c1c2d283f01c9c9a95c"},{url:"index.html",revision:"6ec3480788489734571fb58520f85e7c"},{url:"js/2.1fd561b4.js",revision:"c69aa90e89178bb62768a3f21f07b862"},{url:"js/3.d83a4557.js",revision:"352f8ae58257b15d1b7b99e4adcce6d8"},{url:"js/4.efd95bd9.js",revision:"26a66b7c99b1f1216a1762a93be2d2fc"},{url:"js/5.bb9a7074.js",revision:"6d93d440fb25759f7731f270bad35512"},{url:"js/app.a15b0583.js",revision:"154308cc86bd67c781a530b558359153"},{url:"js/vendor.bd59606d.js",revision:"dccf093e8d821cb9124d644fe39c0820"},{url:"manifest.json",revision:"3849f6f50b647430a40fbf06040cbdcc"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/service-worker\.js$/,/workbox-(.)*\.js$/]}))}));
