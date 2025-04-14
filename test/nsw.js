const CACHE_NAME = 'video-cache-v1';
const MAX_CACHE_SIZE = 200 * 1024 * 1024; // 200MB缓存限制

// 安装时缓存关键资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(['/test/cache.html', '/test/player.js']))
  );
});

// 缓存视频请求
self.addEventListener('fetch', (event) => {
  console.log(88888)
  const url = new URL(event.request.url);
  // 只处理视频请求
  if (!url.pathname.endsWith('.mp4')) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return new Promise((resolve) => {
        // 首先尝试从缓存获取
        cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            resolve(cachedResponse)
          }

          // 否则从网络获取并缓存
          try {
            fetch(event.request).then((response) => {
              // 检查缓存大小
              getCacheSize(cache).then((currentSize) => {
                const contentLength =
                  parseInt(response.headers.get('Content-Length')) || 0;

                if (currentSize + contentLength <= MAX_CACHE_SIZE) {
                  cache.put(event.request, response.clone());
                }

                return response;
                resolve(response)
              });
            });
          } catch (error) {
            console.error('获取失败:', error);
            throw error;
          }
        });
      });
    })
  );
});

// 清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 计算缓存大小
async function getCacheSize(cache) {
  return new Promise((resolve) => {
    cache.keys().then((requests) => {
      let totalSize = 0;
      for (const request of requests) {
        cache.match(request).then((response) => {
          if (response) {
            const contentLength = response.headers.get('Content-Length');
            if (contentLength) {
              totalSize += parseInt(contentLength);
            } else {
              // 如果没有Content-Length头，读取整个响应体计算大小
              response.blob().then((blob) => {
                totalSize += blob.size;
                resolve(totalSize);
              });
            }
          }
        });
      }
    });
  });
}
