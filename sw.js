use strict;
var C = ['Cache-V'];
var E = ['Cache-V'];
var U = [
'/manifest.json',
'/index.html',
'/icon-192.png'
]

//Service Worker installing & creating a cache whih predefined list above (on VAR U = ....)
self.addEventListener('install', e => {
  e.waitUntil(caches.open(C)
  .then(function(cache) {
     return cache.addAll(U);
     })
  );
});

// Service Worker activating & if there is any previous caches which is not necessary will be removed.
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
  .then(C => {
      return Promise.all(C.map(C => {
      if (!E.includes(C)) {
        return caches.delete(C);
  }}));}));});

//In every page request, Service Worker will try to find a match in cache, if match mound then it will serve from cache or else will fetch from network.  
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request)
  .then(function(r) {
  if (r) {return r;}
  return fetch(e.request);
}));});
