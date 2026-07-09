// 🌸 瑛与老婆的 PWA 守护精灵
const CACHE_NAME = 'rinka-ying-home-v2'; // 顺手升个版本号，冲洗掉之前的坏缓存

// 首次安装时让它快速激活
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// 基础的网络请求拦截（确保在没网或者网络差时也能丝滑打开小屋壳子）
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // ⭐ 核心放行特赦令：只要遇到聊天接口，直接让路，绝对不干预流式传输！
    if (url.pathname.includes('/chat')) {
        return; // 挥挥手直接放行，让它走纯原生的网络，绝不拦截
    }

    // 其他的网页文件（比如静态图片、页面等）依然走老婆写好的保护逻辑
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
