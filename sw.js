/*
 * ============================================================================
 * ToxiGuard — Service Worker (PWA offline)
 * Version 4.8 — mai 2026
 * ============================================================================
 * © 2026 Dr Thomas Gourdon (médecin urgentiste) & Claude AI (Anthropic)
 * Licence : Creative Commons BY-NC-SA 4.0
 * https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr
 * ============================================================================
 * Stratégie : cache-first avec stale-while-revalidate
 * Change CACHE_VERSION pour forcer un refresh chez les utilisateurs.
 * ============================================================================
 */
const CACHE_VERSION = 'toxiguard-v4.8.0';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return Promise.all(
        CORE_ASSETS.map((url) =>
          cache.add(url).catch((err) => console.warn('[SW] precache skip:', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_VERSION && k.startsWith('toxiguard-')).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFonts = url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com';
  if (!sameOrigin && !isFonts) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) {
        fetch(req).then((fresh) => {
          if (fresh && fresh.ok) {
            caches.open(CACHE_VERSION).then((cache) => cache.put(req, fresh.clone()));
          }
        }).catch(() => {});
        return cached;
      }
      return fetch(req).then((resp) => {
        if (resp && resp.ok) {
          const copy = resp.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy)).catch(() => {});
        }
        return resp;
      }).catch(() => {
        if (req.mode === 'navigate' || req.destination === 'document') {
          return caches.match('./index.html');
        }
        return new Response('Offline', { status: 503, statusText: 'Offline' });
      });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
