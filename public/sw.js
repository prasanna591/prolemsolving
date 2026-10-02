/**
 * Service Worker for PSM - Static Export
 * Provides offline caching and performance improvements
 */

const CACHE_NAME = "psm-v1";
const STATIC_ASSETS = [
  "/",
  "/_next/static/css/",
  "/_next/static/chunks/",
];

const IMAGE_ASSETS = [
  "/_next/static/media/home-hero-background",
  "/_next/static/media/favicon",
  "/_next/static/media/logo_updated",
  "/_next/static/media/building",
  "/_next/static/media/product_hero_bg",
  "/_next/static/media/solution_hero",
  "/_next/static/media/founders_about",
  "/_next/static/media/employee_working",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/",
        "/_next/static/media/favicon.1lna_cgbt81b-.webp",
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET") return;

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  if (url.pathname.match(/\.(webp|png|jpg|jpeg|svg|woff2|woff)$/)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok && request.mode === "navigate") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});