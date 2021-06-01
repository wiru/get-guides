if (!self.define) {
  const e = e => {
      "require" !== e && (e += ".js");
      let c = Promise.resolve();
      return (
        i[e] ||
          (c = new Promise(async c => {
            if ("document" in self) {
              const i = document.createElement("script");
              (i.src = e), document.head.appendChild(i), (i.onload = c);
            } else importScripts(e), c();
          })),
        c.then(() => {
          if (!i[e]) throw new Error(`Module ${e} didn’t register its module`);
          return i[e];
        })
      );
    },
    c = (c, i) => {
      Promise.all(c.map(e)).then(e => i(1 === e.length ? e[0] : e));
    },
    i = { require: Promise.resolve(c) };
  self.define = (c, n, f) => {
    i[c] ||
      (i[c] = Promise.resolve().then(() => {
        let i = {};
        const s = { uri: location.origin + c.slice(1) };
        return Promise.all(
          n.map(c => {
            switch (c) {
              case "exports":
                return i;
              case "module":
                return s;
              default:
                return e(c);
            }
          })
        ).then(e => {
          const c = f(...e);
          return i.default || (i.default = c), i;
        });
      }));
  };
}
define("./service-worker.js", ["./workbox-e170c028"], function(e) {
  "use strict";
  e.setCacheNameDetails({ prefix: "get-guides" }),
    self.addEventListener("message", e => {
      e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
    }),
    e.precacheAndRoute(
      [
        {
          url: "css/2.ba5a7335.css",
          revision: "545df32462841586be9eaee6fc305297"
        },
        {
          url: "css/app.0e433876.css",
          revision: "d41d8cd98f00b204e9800998ecf8427e"
        },
        {
          url: "css/vendor.44f307f7.css",
          revision: "63f81220bf3434e1ac6f10dcd215a909"
        },
        { url: "favicon.ico", revision: "8b9eb314ff597f6f7c7bf8c7a5f717ec" },
        {
          url: "fonts/KFOkCnqEu92Fr1MmgVxIIzQ.9391e6e2.woff",
          revision: "04b7fd97f88b82dccce5ec446ccc29e6"
        },
        {
          url: "fonts/KFOlCnqEu92Fr1MmEU9fBBc-.ddd11dab.woff",
          revision: "da2721c68b4bc80db8d4c404f76b118c"
        },
        {
          url: "fonts/KFOlCnqEu92Fr1MmSU5fBBc-.877b9231.woff",
          revision: "bf0f407102faf3a0b521d3b545f547a5"
        },
        {
          url: "fonts/KFOlCnqEu92Fr1MmWUlfBBc-.0344cc3c.woff",
          revision: "68d6dabfe54e245e7d5d5c16c3c4b1a9"
        },
        {
          url: "fonts/KFOlCnqEu92Fr1MmYUtfBBc-.b555d228.woff",
          revision: "64bba9c4e8156c152050c657e9d24bf1"
        },
        {
          url: "fonts/KFOmCnqEu92Fr1Mu4mxM.9b78ea3b.woff",
          revision: "dc3e086fc0c5addc09702e111d2adb42"
        },
        {
          url: "fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.61bf3cad.woff",
          revision: "6ea8adea6ad4538af5da228e8d5a201a"
        },
        {
          url: "fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.72dc569a.woff2",
          revision: "aa7264f565de1c13e4b17ce96f0b58a7"
        },
        {
          url: "icons/apple-icon-120x120.png",
          revision: "c9920835d2adb9f6ab6a79a27f220a3a"
        },
        {
          url: "icons/apple-icon-152x152.png",
          revision: "9df9e65a1d2c6df3bd9143666b0e8c63"
        },
        {
          url: "icons/apple-icon-167x167.png",
          revision: "4300c6c136c06abcd781aa18644dd7a3"
        },
        {
          url: "icons/apple-icon-180x180.png",
          revision: "88dbf3d9e8269f1298486d103e22a57c"
        },
        {
          url: "icons/favicon-128x128.png",
          revision: "1be07e62226c8f6a7086f132d9be1642"
        },
        {
          url: "icons/favicon-16x16.png",
          revision: "df5ff7f4728c4ef4b951d46b4136906f"
        },
        {
          url: "icons/favicon-32x32.png",
          revision: "64aa9e88dd6545f64226c1e2230f66cc"
        },
        {
          url: "icons/favicon-96x96.png",
          revision: "d22664397060743b24e8956a5a3fcdec"
        },
        {
          url: "icons/icon-128x128.png",
          revision: "1be07e62226c8f6a7086f132d9be1642"
        },
        {
          url: "icons/icon-192x192.png",
          revision: "a1b423855a450ae7adbd9d2a782e0dfb"
        },
        {
          url: "icons/icon-256x256.png",
          revision: "9f33ebc999e51d0dc2975fc573d53a0b"
        },
        {
          url: "icons/icon-384x384.png",
          revision: "a126be0d50ed682c3129e0b8b31f680a"
        },
        {
          url: "icons/icon-512x512.png",
          revision: "02abd24e7c8638e848d96a6bf78d2c27"
        },
        {
          url: "icons/ms-icon-144x144.png",
          revision: "f256ec55be616f32ae486ab7571eb936"
        },
        {
          url: "icons/safari-pinned-tab.svg",
          revision: "de8107bed7f087fb443d8e36855e7467"
        },
        { url: "index.html", revision: "6cc663c578adb607bd26ddcf483e8592" },
        {
          url: "js/2.c295f25f.js",
          revision: "0087d7eebca3bf3113dd2e3d5ad17bac"
        },
        {
          url: "js/3.d83a4557.js",
          revision: "352f8ae58257b15d1b7b99e4adcce6d8"
        },
        {
          url: "js/4.efd95bd9.js",
          revision: "26a66b7c99b1f1216a1762a93be2d2fc"
        },
        {
          url: "js/app.b1bed149.js",
          revision: "ae723cbb2ca10f19d318b649fffa1a2d"
        },
        {
          url: "js/vendor.b8260056.js",
          revision: "327b498b0cf032e02c1a8a252a53da42"
        },
        { url: "manifest.json", revision: "9ddbabf65122d2c4dc4a663f46b8cfac" }
      ],
      {}
    ),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("index.html"), {
        denylist: [/service-worker\.js$/, /workbox-(.)*\.js$/]
      })
    );
});
