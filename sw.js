// sw.js
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-app-cache').then(function(cache) {
      return cache.addAll([
        // alle Resourcen(Dateien) auf die zugegriffen werden soll
        'index.html',
        'manifest.json',
        'sw.js',
        'indexeddb_manager.js',
        'Hauptverarbeitung.js',
        'backup-restore.js',
        'Filter3-Radio.js',
        'Filter2-Radio.js',
        'Filter1-Selekt.js',
        'Filter-Edit.js',
        'Buch-192.png',
        'Buch-512.png',
        // weitere Ressourcen
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});