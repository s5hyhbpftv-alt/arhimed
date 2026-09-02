/* АРХИМЕД · Service Worker · офлайн-режим для всех островов */
const CACHE = 'arhimed-v2';
const ASSETS = [
  'МОБ_ПРИЛОЖЕНИЕ/index.html',
  'ПРОТОТИП_ВСЕЛЕННАЯ.html',
  'ПРОТОТИП_МАТЕМАТИКА_ТРЕНАЖЕР.html',
  'ПРОТОТИП_ФИЗИКА_ТРЕНАЖЕР.html',
  'ПРОТОТИП_ГЛАВА1_СИРАКУЗЫ.html',
  'ПРОТОТИП_ЛАБОРАТОРИЯ_МАЯТНИК.html',
  'ПРОТОТИП_ТИТРОВАНИЕ.html',
  'ПРОТОТИП_ХИМИЯ_ТРЕНАЖЕР.html',
  'ПРОТОТИП_ОНБОРДИНГ.html',
  'ХАБ_ПРОТОТИП.html',
  'МОБ_ПРИЛОЖЕНИЕ/icons/icon-192.png',
  'МОБ_ПРИЛОЖЕНИЕ/icons/icon-512.png',
  'manifest.webmanifest'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((hit) => {
      if (hit) return hit;
      return fetch(e.request).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        }
        return res;
      }).catch(() => caches.match('МОБ_ПРИЛОЖЕНИЕ/index.html'));
    })
  );
});
