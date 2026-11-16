/* Aether Meteo – service worker: offline app shell + last weather data */
const VERSION = 'aether-v6';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];
const LIBS = /cdnjs\.cloudflare\.com|fonts\.(googleapis|gstatic)\.com/;
const DATA = /open-meteo\.com|api\.rainviewer\.com|raw\.githubusercontent\.com|api\.github\.com/;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== VERSION + '-data').map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = req.url;
  /* app pages: network first, fall back to cache */
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req.url, {cache:'no-cache', credentials:'same-origin'}).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  /* libraries and fonts: cache first */
  if (url.startsWith(self.location.origin) && /\/(index\.html)?$/.test(new URL(url).pathname)) {
    e.respondWith(fetch(url, {cache:'no-cache'}).catch(() => caches.match('./index.html')));
    return;
  }
  if (LIBS.test(url) || url.startsWith(self.location.origin)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return r; })));
    return;
  }
  /* weather data: network first, keep the last answer for offline use */
  if (DATA.test(url)) {
    e.respondWith(fetch(req).then(r => { if (r.ok) { const copy = r.clone(); caches.open(VERSION + '-data').then(c => c.put(req, copy)); } return r; })
      .catch(() => caches.open(VERSION + '-data').then(c => c.match(req)).then(hit => hit || Response.error())));
  }
  /* map tiles and everything else: browser default */
});
