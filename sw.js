/* =====================================================================
   sw.js — EngSpell Service Worker (MISSION 1 — PWA-01)
   Cache-first strategy for all app assets.
   INV-2: fully offline, no external network calls here.
   ===================================================================== */

var CACHE_NAME = 'engspell-v1';

var ASSETS = [
  './',
  './index.html',
  './src/data.js',
  './src/data2.js',
  './src/data3.js',
  './src/speech.js',
  './src/core.js',
  './src/views-a.js',
  './src/views-b.js',
  './src/views-c.js',
  './src/views-d.js',
  './src/views-e.js',
  './src/views-f.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

/* Install: pre-cache all assets */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

/* Activate: delete old caches */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; })
            .map(function (k) { return caches.delete(k); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

/* Fetch: cache-first, fall back to network */
self.addEventListener('fetch', function (event) {
  /* INV-8: pass Gemini API calls straight through — never cache them */
  if (event.request.url.indexOf('generativelanguage.googleapis.com') !== -1) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) { return cached; }
      return fetch(event.request).then(function (response) {
        /* Only cache successful same-origin responses */
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        var toCache = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, toCache);
        });
        return response;
      });
    }).catch(function () {
      /* Offline fallback: return cached index.html for navigation requests */
      if (event.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});
