// /*
//  * This file (which will be your service worker)
//  * is picked up by the build system ONLY if
//  * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
//  */

// New try, following https://www.youtube.com/watch?v=ULP8vaS_pJs
console.log("Entering custom Service Worker.")
// Imports

import {precacheAndRoute} from "workbox-precaching"

// Config

precacheAndRoute(self.__WB_MANIFEST);








































/// Old version


// console.log('I hate workbox')
// //import { register } from 'register-service-worker'
// const staticCacheName = 'site-static';
// const assets = [
//   '/',
//   'index.html',
//   'vendor.js',
//   'app.js',
// ];

// self.addEventListener('register', evt => {
//   console.log('service worker registered in the right file')
// })



// // // install event
// // self.addEventListener('install', evt => {
// //     console.log('service worker installed')
// //         caches.open(staticCacheName).then(cache => {
// //         cache.addAll(assets)
// //         console.log("cache is:", staticCacheName)
// //       })
// //   });


// // install event
// self.addEventListener('install', evt => {
//   //console.log('service worker installed');
//   evt.waitUntil(
//     caches.open(staticCacheName).then((cache) => {
//       console.log('caching shell assets');
//       cache.addAll(assets);
//     })
//   );
// });

// // activate event
// self.addEventListener('activate', evt => {
//   console.log('service worker activated');
//   self.clients.claim()
// });


// // fetch event
// self.addEventListener('fetch', evt => {
//   console.log('fetch event', evt);
//   evt.respondWith(
//     console.log('respond with here ', evt.request),
//     caches.match(evt.request).then(cacheRes => {
//       return cacheRes || fetch(evt.request);
//     })
//   );
// });

// self.addEventListener('offline', evt => {
//   console.log('No internet connection found. App is running in offline mode.')
// });

// self.addEventListener('error', evt => {
//   console.error('Error during service worker registration:', err)
// });

// self.addEventListener('cached', evt => {
//   console.error('Caching found:', evt)
// });





// self.__WB_MANIFEST