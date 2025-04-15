// db-promise.js
function IDBCache(dbName, storeName) {
  this.dbName = dbName || 'http-cache';
  this.storeName = storeName || 'responses';
  this.db = null;
}

// 打开/初始化数据库
IDBCache.prototype.open = function () {
  var self = this;
  return new Promise(function (resolve, reject) {
    var request = indexedDB.open(self.dbName, 1);

    request.onupgradeneeded = function (event) {
      var db = event.target.result;
      if (!db.objectStoreNames.contains(self.storeName)) {
        db.createObjectStore(self.storeName, { keyPath: 'url' });
      }
    };

    request.onsuccess = function (event) {
      self.db = event.target.result;
      resolve(self.db);
    };

    request.onerror = function (event) {
      reject('IndexedDB打开失败: ' + event.target.error);
    };
  });
};

// 存储响应
IDBCache.prototype.put = function (url, response) {
  var self = this;

  return new Promise(function (resolve, reject) {
    // 确保数据库已打开
    var openPromise = self.db ? Promise.resolve(self.db) : self.open();

    openPromise
      .then(function () {
        return self._responseToStorable(response);
      })
      .then(function (storableData) {
        return new Promise(function (innerResolve, innerReject) {
          var transaction = self.db.transaction(self.storeName, 'readwrite');
          var store = transaction.objectStore(self.storeName);

          var request = store.put(Object.assign({ url: url }, storableData));

          request.onsuccess = function () {
            innerResolve();
          };
          request.onerror = function (event) {
            innerReject(event.target.error);
          };
        });
      })
      .then(resolve)
      .catch(reject);
  });
};

// 获取响应
IDBCache.prototype.match = function (url) {
  var self = this;

  return new Promise(function (resolve, reject) {
    var openPromise = self.db ? Promise.resolve(self.db) : self.open();

    openPromise
      .then(function () {
        return new Promise(function (innerResolve, innerReject) {
          var transaction = self.db.transaction(self.storeName, 'readonly');
          var store = transaction.objectStore(self.storeName);
          var request = store.get(url);

          request.onsuccess = function (event) {
            innerResolve(event.target.result);
          };
          request.onerror = function (event) {
            innerReject(event.target.error);
          };
        });
      })
      .then(function (data) {
        if (!data) {
          resolve(undefined);
          return;
        }
        return self._storableToResponse(data).then(resolve);
      })
      .catch(reject);
  });
};

// 删除缓存项
IDBCache.prototype.delete = function (url) {
  var self = this;

  return new Promise(function (resolve, reject) {
    var openPromise = self.db ? Promise.resolve(self.db) : self.open();

    openPromise
      .then(function () {
        return new Promise(function (innerResolve, innerReject) {
          var transaction = self.db.transaction(self.storeName, 'readwrite');
          var store = transaction.objectStore(self.storeName);
          var request = store.delete(url);

          request.onsuccess = function () {
            innerResolve();
          };
          request.onerror = function (event) {
            innerReject(event.target.error);
          };
        });
      })
      .then(resolve)
      .catch(reject);
  });
};

// 清空缓存
IDBCache.prototype.clear = function () {
  var self = this;

  return new Promise(function (resolve, reject) {
    var openPromise = self.db ? Promise.resolve(self.db) : self.open();

    openPromise
      .then(function () {
        return new Promise(function (innerResolve, innerReject) {
          var transaction = self.db.transaction(self.storeName, 'readwrite');
          var store = transaction.objectStore(self.storeName);
          var request = store.clear();

          request.onsuccess = function () {
            innerResolve();
          };
          request.onerror = function (event) {
            innerReject(event.target.error);
          };
        });
      })
      .then(resolve)
      .catch(reject);
  });
};

// 将Response对象转换为可存储格式
IDBCache.prototype._responseToStorable = function (response) {
  var headers = {};
  response.headers.forEach(function (value, key) {
    headers[key] = value;
  });

  return response.arrayBuffer().then(function (body) {
    return {
      status: response.status,
      statusText: response.statusText,
      headers: headers,
      body: body,
      timestamp: Date.now(),
    };
  });
};

// 将存储的数据转换回Response对象
IDBCache.prototype._storableToResponse = function (data) {
  return Promise.resolve(
    new Response(data.body, {
      status: data.status,
      statusText: data.statusText,
      headers: data.headers,
    })
  );
};

var CACHE_NAME = 'app-cache-v1';
var idbCache = new IDBCache(CACHE_NAME);

class MultiVideoPlayer {
  constructor() {
    this.videoElement = document.getElementById('videoPlayer');
    this.loadingIndicator = document.getElementById('loadingIndicator');
    this.videoSegments = [
      {
        id: 'part1',
        url: 'https://assets.springserve.com/video_creatives/000/606/368/15s-naturesacpe-5001500.mp4',
        preload: true,
      },
      {
        id: 'part2',
        url: 'https://assets.springserve.com/video_creatives/000/534/305/1241179_1280x720-4482558.mp4',
        preload: true,
      },
      {
        id: 'part3',
        url: 'https://assets.springserve.com/video_creatives/000/723/173/WOOLRICH-5809681.mp4',
        preload: true,
      },
    ];
    this.currentSegmentIndex = 0;
    this.isPlaying = false;
    this.prefetchedSegments = new Map();

    this.initPlayer();
    // this.registerServiceWorker();
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        // navigator.serviceWorker.getRegistrations().then((registrations) => {
        //   console.log(888, registrations)
        //   for (let registration of registrations) {
        //     registration.unregister(); // 注销所有 SW
        //     console.log('已卸载:', registration.scope);
        //   }
        // });
        navigator.serviceWorker.register('/test/sw.js').then(() => {
          console.log('Service Worker注册成功');
        });
      } catch (error) {
        console.error('Service Worker注册失败:', error);
      }
    }
  }

  initPlayer() {
    // 设置初始视频源
    this.playCurrentSegment();

    // 监听视频结束事件
    this.videoElement.addEventListener('ended', () => this.playNextSegment());

    // 监听缓冲事件
    this.videoElement.addEventListener('waiting', () => this.showLoading());
    this.videoElement.addEventListener('playing', () => this.hideLoading());

    // 预加载后续视频段
    console.log(111);
    this.prefetchNextSegments();
  }

  playCurrentSegment() {
    const segment = this.videoSegments[this.currentSegmentIndex];

    try {
      // 尝试从Service Worker缓存获取
      this.getCachedVideoUrl(segment.url).then((cachedUrl) => {
        this.videoElement.src = cachedUrl || segment.url;
        console.log(99999911, this.isPlaying);
        // 如果用户之前已经在播放，继续播放
        if (this.isPlaying) {
          this.videoElement.play();
        }
      });
    } catch (error) {
      console.error('播放失败:', error);
      this.videoElement.src = segment.url;
    }
  }

  getCachedVideoUrl(videoUrl) {
    return new Promise((resolve) => {
      // if (!('caches' in window)) resolve(null);

      // try {
      //   caches.open('video-cache').then((cache) => {
      //     cache.match(videoUrl).then((response) => {
      //       console.log(1111, videoUrl, response);
      //       if (response) {
      //         response.blob().then((blob) => {
      //           resolve(URL.createObjectURL(blob));
      //         });
      //       } else {
      //         resolve(null);
      //       }
      //     });
      //   });
      // } catch (error) {
      //   console.error('缓存访问失败:', error);
      //   resolve(null);
      // }
      idbCache.match(videoUrl).then(function (cachedResponse) {
        // 如果缓存中有且未过期，直接返回
        if (cachedResponse) {
          cachedResponse.blob().then((blob) => {
            const blobUrl = URL.createObjectURL(blob);
            console.log(991199, blobUrl);
            resolve(blobUrl);
          });
        } else {
          resolve(null);
        }
      });
    });
  }

  playNextSegment() {
    if (this.currentSegmentIndex < this.videoSegments.length - 1) {
      this.currentSegmentIndex++;
      this.playCurrentSegment();

      // 继续预加载后续段
      this.prefetchNextSegments();
    } else {
      console.log('所有视频段播放完毕');
    }
  }

  prefetchNextSegments() {
    // 预加载接下来的2段视频
    const nextIndex = this.currentSegmentIndex + 1;
    const segmentsToPrefetch = this.videoSegments.slice(
      nextIndex,
      nextIndex + 2
    );
    for (const segment of segmentsToPrefetch) {
      if (!segment.preload || this.prefetchedSegments.has(segment.url))
        continue;

      // 使用fetch API获取并缓存
      fetch(segment.url, { mode: 'cors' })
        .then((response) => {
          console.log(22245, response.ok);
          const clonedResponse = response.clone();
          if (response.ok) {
            idbCache.put(segment.url, clonedResponse).catch(function (err) {
              console.error('缓存失败:', err);
            });
            // if ('caches' in window) {
            //   caches.open('video-cache').then((cache) => {
            //     cache.put(segment.url, clonedResponse).catch((error) => {
            //       console.error('PUT 失败:', error);
            //     });
            //   });

            // }
          }
        })
        .catch((error) => {
          console.error('预加载失败:', segment.url, error);
        });
    }
  }

  showLoading() {
    this.loadingIndicator.style.display = 'block';
  }

  hideLoading() {
    this.isPlaying = true;
    this.loadingIndicator.style.display = 'none';
  }

  // 用户交互方法
  play() {
    this.isPlaying = true;
    return this.videoElement.play();
  }

  pause() {
    this.isPlaying = false;
    return this.videoElement.pause();
  }
}

// 初始化播放器
document.addEventListener('DOMContentLoaded', () => {
  window.videoPlayer = new MultiVideoPlayer();
});

document.addEventListener('keydown', (event) => {
  console.log(1111, event.keyCode);
  event.keyCode === 13 && window.videoPlayer.play();
});
