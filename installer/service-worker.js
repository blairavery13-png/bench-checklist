const CACHE="installer-thumb-v1";
self.addEventListener("install",e=>{
self.skipWaiting();
e.waitUntil(caches.open(CACHE).then(c=>c.addAll(["./","./index.html","./manifest.json"])));
});
self.addEventListener("activate",e=>{
e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));
self.clients.claim();
});
self.addEventListener("fetch",e=>{
e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
