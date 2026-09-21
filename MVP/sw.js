/* АРХИМЕД MVP · service worker
   HTML/JS всегда с сети. В Cache API не кладём код — иначе залипает старый урок.
   Картинки можно из кэша. */
const CACHE='arhimed-mvp-v772';
/* В кэш кладём только то, что реально есть в репозитории.
   Раньше здесь был путь вне MVP (../МОБ_ПРИЛОЖЕНИЕ/...), его на сервере нет —
   addAll падал, и service worker вообще не устанавливался. */
const ASSETS=[
  'img/car.png','img/archimedes.jpg','manifest.webmanifest',
  /* вариации Архимеда владельца: пять выражений лица и фигура в рост */
  'img/arch_smile.jpg','img/arch_wow.jpg','img/arch_think.jpg','img/arch_laugh.jpg','img/arch_sad.jpg',
  'img/arch_body.png',
  'img/pykh.png',
  'img/icons/student-192.png','img/icons/student-512.png','img/icons/student-apple.png',
  'img/icons/parent-192.png','img/icons/parent-512.png','img/icons/parent-apple.png',
  'img/icons/favicon-student.svg','img/icons/favicon-parent.svg'
];
function precache(c){
  return Promise.all(ASSETS.map(function(u){
    return c.add(u).catch(function(){ return null; });   // одна ошибка не ломает установку
  }));
}

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(precache).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

function netFirst(req, ms){
  return new Promise((resolve, reject)=>{
    const t=setTimeout(()=>reject(new Error('timeout')), ms||6000);
    fetch(req, {cache:'no-store'}).then(r=>{ clearTimeout(t); resolve(r); }).catch(err=>{ clearTimeout(t); reject(err); });
  });
}
function isCode(url){
  return /\.(js|css|json|webmanifest|html)(\?|$)/.test(url) || /[?&]v=\d+/.test(url) || /[?&]b=\d+/.test(url);
}
/* Признак «оболочку отдали из кэша». Пока он стоит, файлы кода тоже берём
   из кэша: иначе браузер получит старую страницу и новый урок — вёрстка и
   разметка разойдутся, подписи налезут друг на друга, текст на кнопках
   обрежется. Так версия страницы и версия кода всегда совпадают. */
let оболочкаИзКэша=false;
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const req=e.request;
  if(req.mode==='navigate' || isCode(req.url)){
    e.respondWith(
      netFirst(req, 2500).catch(()=>caches.match(req).then(hit=>{
        if(hit && (req.mode==='navigate' || /\.html(\?|$)/.test(req.url))) оболочкаИзКэша=true;
        if(hit) return hit;
        if(req.mode==='navigate'){
          /* без сети: приложение ребёнка — из кэша, страницы родителя — честное сообщение,
             иначе родитель увидел бы чужой экран */
          try{
            const p=new URL(req.url).pathname;
            if(/(\/MVP)?\/?$/.test(p)) return caches.match('index.html');
          }catch(e){}
          return new Response('<meta charset="utf-8"><body style="font-family:Georgia;background:#0b1712;color:#e8e0cc;padding:24px">Нет сети. Откройте страницу ещё раз, когда появится интернет.</body>',
            {status:200, headers:{'Content-Type':'text/html; charset=utf-8'}});
        }
        return new Response('', {status:504, statusText:'offline'});
      }))
    );
    return;
  }
  if(оболочкаИзКэша && isCode(req.url)){
    /* страница из кэша — код берём из того же кэша, без сети */
    e.respondWith(caches.match(req).then(hit=>hit || netFirst(req,2500).catch(()=>new Response('',{status:504}))));
    return;
  }
  e.respondWith(
    caches.match(req).then(hit=>hit || netFirst(req,2500).then(res=>{
      const cp=res.clone();
      caches.open(CACHE).then(c=>c.put(req,cp)).catch(()=>{});
      return res;
    }).catch(()=>new Response('', {status:504, statusText:'offline'})))
  );
});
