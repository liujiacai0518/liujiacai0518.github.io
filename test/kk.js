const CACHE_NAME = 'offline-video-cache-v1';
const ASSETS_TO_CACHE = [];

// 安装阶段 - 缓存资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('正在缓存资源');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 激活阶段 - 清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('删除旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  console.log(6666, url)
  // 只处理视频请求
  if (event.request.url.includes('.mp4')) {
    event.respondWith(
      caches.match(event.request.url).then((cachedResponse) => {
        // 如果缓存中有，返回缓存
        console.log(3344, cachedResponse)
        if (cachedResponse) {
          console.log(9999);
          return cachedResponse;
        }
        // 否则从网络获取
        return fetch(event.request.url).then((response) => {
          // 缓存新获取的视频
          if (!response.ok) return response;
          const responseToCache = response.clone();
          console.log(1111, responseToCache);
          caches.open(CACHE_NAME).then((cache) => {
            console.log(444);
            cache.put(event.request.url, responseToCache).then(() => {
              console.log('成功');
            });
          });
          return response;
        });
      })
    );
  }
});
