const CACHE_NAME = "personalgallery-v2"
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/author.html",
  "/pages/contact.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/main.js",
  "/icon.png",
  "/img/avatar.png",
  "/img/underwater.svg",
  "/img/gmail.svg",
  "/img/linkedin.svg",
  "/img/github-512.png",
  "/img/artwork/girl.jpg",
  "/img/artwork/light.jpg",
  "/img/artwork/pevita.jpg",
  "/img/artwork/procrastinator.jpg",
  "/img/artwork/raja_justin_jadi.jpg",
  "/img/artwork/underwater.jpg",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  )
})

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});