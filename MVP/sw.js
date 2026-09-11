/* АРХИМЕД MVP · service worker (офлайн) */
/* Правило: код (html, js, css, данные) берём СНАЧАЛА ИЗ СЕТИ и только при офлайне — из кэша.
   Так на устройстве не может застрять старая сборка, из-за которой «не открываются страницы». */
const CACHE='arhimed-mvp-v442';
const ASSETS=['index.html','img/car.png','data/tasks.js','data/lessons.js',
 'js/core.js','js/engine.js','js/app.js','js/dashboard.js','js/lessons.js','js/legend.js','js/comic.js','js/simulator.js','js/duel.js',
 'manifest.webmanifest','../МОБ_ПРИЛОЖЕНИЕ/icons/icon-192.png'];

self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});

function netFirst(req, ms){
  return new Promise((resolve, reject)=>{
    const t=setTimeout(()=>reject(new Error('timeout')), ms||6000);
    fetch(req).then(r=>{ clearTimeout(t); resolve(r); }).catch(err=>{ clearTimeout(t); reject(err); });
  });
}
function isCode(url){
  return /\.(js|css|json|webmanifest|html)(\?|$)/.test(url) || /[?&]v=\d+/.test(url);
}
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const req=e.request;
  if(req.mode==='navigate' || isCode(req.url)){
    e.respondWith(
      netFirst(req,6000).then(res=>{
        const cp=res.clone();
        caches.open(CACHE).then(c=>c.put(req,cp)).catch(()=>{});
        return res;
      }).catch(()=>caches.match(req).then(hit=>{
        if(hit) return hit;
        if(req.mode==='navigate') return caches.match('index.html');
        return new Response('', {status:504, statusText:'offline'});
      }))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(hit=>hit || netFirst(req,6000).then(res=>{
      const cp=res.clone();
      caches.open(CACHE).then(c=>c.put(req,cp)).catch(()=>{});
      return res;
    }).catch(()=>new Response('', {status:504, statusText:'offline'})))
  );
});
