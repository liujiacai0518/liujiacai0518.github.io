const videoSegments = [
  {
    id: 'part1',
    url: 'https://liujiacai0518.github.io/test/movie.mp4',
    preload: true,
  },
  {
    id: 'part2',
    url: 'https://assets.springserve.com/video_creatives/000/606/368/15s-naturesacpe-5001500.mp4',
    preload: true,
  },
];
let currentSegmentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  const cacheBtn = document.getElementById('cacheBtn');
  const playBtn = document.getElementById('playBtn');
  const clearBtn = document.getElementById('clearBtn');
  const videoPlayer = document.getElementById('videoPlayer');
  const statusDiv = document.getElementById('status');

  // 检查Service Worker支持
  if ('serviceWorker' in navigator) {
    // 注册Service Worker
    navigator.serviceWorker
      .register('/test/kk.js?v=3')
      .then((registration) => {
        console.log('ServiceWorker 注册成功:', registration.scope);
        updateStatus('Service Worker已注册');
      })
      .catch((error) => {
        console.log('ServiceWorker 注册失败:', error);
        updateStatus('Service Worker注册失败', false);
      });
  } else {
    updateStatus('您的浏览器不支持Service Worker', false);
  }

  // 缓存视频按钮点击事件
  cacheBtn.addEventListener('click', () => {
    updateStatus('正在缓存视频...');

    // 通过fetch触发Service Worker缓存
    fetch('https://liujiacai0518.github.io/test/movie.mp4')
      .then(() => {
        updateStatus('视频已缓存，现在可以离线播放');
      })
      .catch((error) => {
        updateStatus('缓存视频失败: ' + error.message, false);
      });
  });

  // 播放视频按钮点击事件 - 直接使用缓存
  playBtn.addEventListener('click', () => {
    updateStatus('尝试播放视频...');

    // 直接设置视频源，Service Worker会处理缓存
    videoPlayer.src = 'https://liujiacai0518.github.io/test/movie.mp4';

    // 添加错误处理
    videoPlayer.onerror = () => {
      updateStatus('视频播放失败，可能未缓存', false);
    };

    videoPlayer.oncanplay = () => {
      videoPlayer.play();
      updateStatus('正在播放视频');
    };
  });

  // 清除缓存按钮点击事件
  clearBtn.addEventListener('click', () => {
    updateStatus('正在清除缓存...');

    // 清除缓存
    caches
      .delete('offline-video-cache-v1')
      .then(() => {
        updateStatus('缓存已清除');
        videoPlayer.src = '';
      })
      .catch((error) => {
        updateStatus('清除缓存失败: ' + error.message, false);
      });
  });

  // 更新网络状态
  window.addEventListener('online', () => {
    updateStatus('您已恢复在线状态');
  });

  window.addEventListener('offline', () => {
    updateStatus('您已离线，可以尝试播放已缓存的视频', false);
  });

  // 初始网络状态检查
  if (!navigator.onLine) {
    updateStatus('您当前处于离线状态', false);
  }

  // 更新状态显示的函数
  function updateStatus(message, isSuccess = true) {
    statusDiv.textContent = message;
    statusDiv.className = 'status ' + (isSuccess ? 'online' : 'offline');
    console.log(message);
  }

  function ch() {
    console.log(9888);
    for (const segment of videoSegments) {
      // 使用fetch API获取并缓存
      fetch(segment.url)
        .then((response) => {
          console.log(22245, response.ok);
        })
        .catch((error) => {
          console.error('预加载失败:', segment.url, error);
        });
    }
  }

  function playNextSegment() {
    videoPlayer.src = videoSegments[currentSegmentIndex].url;
    videoPlayer.play();
    if (currentSegmentIndex < videoSegments.length - 1) {
      currentSegmentIndex++
    } else {
      console.log('所有视频段播放完毕');
    }
  }

  videoPlayer.addEventListener('ended', () => playNextSegment());

  document.addEventListener('keydown', (event) => {
    console.log(1111, event.keyCode);
    event.keyCode === 13 && playNextSegment();
    event.keyCode === 49 && ch();
  });
});
