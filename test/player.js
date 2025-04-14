class MultiVideoPlayer {
  constructor() {
    this.videoElement = document.getElementById('videoPlayer');
    this.loadingIndicator = document.getElementById('loadingIndicator');
    this.videoSegments = [
      {
        id: 'part1',
        url: 'https://assets.springserve.com/video_creatives/000/534/305/1241179_1280x720-4482558.mp4',
        preload: true,
      },
      {
        id: 'part2',
        url: 'https://assets.springserve.com/video_creatives/000/606/368/15s-naturesacpe-5001500.mp4',
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
    this.registerServiceWorker();
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        navigator.serviceWorker.register('/sw.js').then(() => {
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
      if (!('caches' in window)) resolve(null);

      try {
        caches.open('video-cache').then((cache) => {
          cache.match(videoUrl).then((response) => {
            if (response) {
              response.blob().then((blob) => {
                resolve(URL.createObjectURL(blob));
              });
            }
          });
        });
        resolve(null);
      } catch (error) {
        console.error('缓存访问失败:', error);
        resolve(null);
      }
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

      try {
        // 使用fetch API获取并缓存
        fetch(segment.url).then((response) => {
          if (response.ok) {
            if ('caches' in window) {
              caches.open('video-cache').then((cache) => {
                cache.put(segment.url, response.clone()).then(() => {
                  this.prefetchedSegments.set(segment.url, true);
                });
              });
            }
          }
        });
      } catch (error) {
        console.error('预加载失败:', segment.url, error);
      }
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
