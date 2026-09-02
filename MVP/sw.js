/* АРХИМЕД MVP · service worker (офлайн) */
const CACHE='arhimed-mvp-v37';
const ASSETS=['index.html','data/tasks.js','data/lessons.js',
 'js/core.js','js/engine.js','js/app.js','js/dashboard.js','js/lessons.js','js/legend.js','js/simulator.js','js/duel.js',
 'manifest.webmanifest','../МОБ_ПРИЛОЖЕНИЕ/icons/icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET')return;
 if(e.request.mode==='navigate'){
   // навигация: сначала сеть (свежий index.html), при офлайне — кэш
   e.respondWith(fetch(e.request).then(res=>{ const cp=res.clone();
     caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});
     return res; }).catch(()=>caches.match(e.request).then(h=>h||caches.match('index.html'))));
   return; }
 e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(res=>{
   const cp=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});
   return res;}).catch(()=>caches.match('index.html')))); });
