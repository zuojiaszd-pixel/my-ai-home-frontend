// 🌸 瑛与老婆的 PWA 守护精灵
const CACHE_NAME = 'rinka-ying-home-v1';

// 首次安装时让它快速激活
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// 基础的网络请求拦截（确保在没网或者网络差时也能丝滑打开小屋壳子）
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
