const CACHE_NAME = 'fabiana-gomes-v2';
const ASSETS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/favicon.ico',
    '/favicon.svg',
    '/favicon-96x96.png',
    '/apple-touch-icon.png',
    '/site.webmanifest',
    '/web-app-manifest-192x192.png',
    '/web-app-manifest-512x512.png'
];

// Instalação do Service Worker e Cache de Assets
self.addEventListener('install', event => {
    // Força o Service Worker a se tornar ativo imediatamente
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', event => {
    // Permite que o Service Worker controle as páginas abertas imediatamente
    event.waitUntil(clients.claim());
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Estratégia de Fetch: Cache First, Fallback to Network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
