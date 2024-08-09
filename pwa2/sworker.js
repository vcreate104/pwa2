
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            // Define the array of URLs to cache
            const urlsToCache = [
                "./",
                "style.css",
                "images/logo64.png"
            ];

            // Remove duplicates by converting to a Set
            const uniqueUrls = Array.from(new Set(urlsToCache));

            // Add the unique URLs to the cache
            return cache.addAll(uniqueUrls);
        }).catch(error => {
            console.error('Failed to cache assets:', error);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
