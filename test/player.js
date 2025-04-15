function isBlobUrlSupported() {
  try {
    const blob = new Blob(['test'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    URL.revokeObjectURL(url);
    return true;
  } catch (e) {
    return false;
  }
}

if (!isBlobUrlSupported()) {
  console.error('TV browser does not support blob URLs');
  // 使用备用方案
} else {
  console.log('支持');
}
const vData = {};
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
      if (vData[videoUrl]) {
        vData[videoUrl].blob().then((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          console.log(7799, blob);
          resolve(blobUrl);
        });
      } else {
        resolve(null);
      }
      // idbCache.match(videoUrl).then(function (cachedResponse) {
      //   // 如果缓存中有且未过期，直接返回
      //   if (cachedResponse) {
      //     cachedResponse.blob().then((blob) => {
      //       const blobUrl = URL.createObjectURL(blob);
      //       console.log(991199, blobUrl);
      //       resolve(blobUrl);
      //     });
      //   } else {
      //     resolve(null);
      //   }
      // });
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
            // idbCache.put(segment.url, clonedResponse).catch(function (err) {
            //   console.error('缓存失败:', err);
            // });
            vData[segment.url] = clonedResponse;
            console.log(2673, vData)
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
