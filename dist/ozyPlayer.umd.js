(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  //媒介播放器相关控件枚举
  var PLAYER_CONTROL;
  (function (PLAYER_CONTROL) {
    PLAYER_CONTROL["VIDEO"] = "zeasn-whale-player-video";
    PLAYER_CONTROL["CONTROL"] = "zeasn-whale-player-control";
    PLAYER_CONTROL["RETREAT"] = "retreat";
    PLAYER_CONTROL["ADVANCE"] = "advance";
    PLAYER_CONTROL["RETROGRESS"] = "retrogress";
    PLAYER_CONTROL["SPEED"] = "speed";
    PLAYER_CONTROL["PLAY"] = "play";
    PLAYER_CONTROL["PAUSE"] = "pause";
    PLAYER_CONTROL["MUTE"] = "mute";
    PLAYER_CONTROL["SOUND"] = "sound";
    PLAYER_CONTROL["FULLSCREEN"] = "fullscreen";
    PLAYER_CONTROL["CANCEL_FULLSCREEN"] = "cancelFullscreen";
    PLAYER_CONTROL["PLAY_BTN"] = "play-btn";
    PLAYER_CONTROL["MUTE_BTN"] = "mute-btn";
    PLAYER_CONTROL["FULLSCREEN_BTN"] = "fullscreen-btn";
    PLAYER_CONTROL["PROGRESS_BAR"] = "progress-bar";
    PLAYER_CONTROL["CURRENT_TIME"] = "current-time";
    PLAYER_CONTROL["TOTAL_TIME"] = "total-time";
    PLAYER_CONTROL["SETTING"] = "setting";
  })(PLAYER_CONTROL || (PLAYER_CONTROL = {}));
  //媒介播放事件媒介
  var MEDIA_EVENT;
  (function (MEDIA_EVENT) {
    MEDIA_EVENT["PLAY_STARTED"] = "STARTED";
    MEDIA_EVENT["PLAY_FINISHED"] = "FINISHED";
    MEDIA_EVENT["PLAY_ERRO"] = "RERROR";
    MEDIA_EVENT["AD_INSERTED"] = "AD_INSERTED";
    MEDIA_EVENT["AD_COMPLETED"] = "AD_COMPLETED";
    MEDIA_EVENT["PLAY_PAUSED"] = "PAUSED";
    MEDIA_EVENT["PLAY_RESUMED"] = "RESUMED";
    MEDIA_EVENT["PLAYER_INIT"] = "PLAYER_INIT";
    MEDIA_EVENT["LOADEDMETADATA"] = "LOADEDMETADATA";
  })(MEDIA_EVENT || (MEDIA_EVENT = {}));
  //拦截的按键事件keyCode枚举
  var CATCH_KEY_CODE_EVENT;
  (function (CATCH_KEY_CODE_EVENT) {
    CATCH_KEY_CODE_EVENT[CATCH_KEY_CODE_EVENT["ENTER"] = 13] = "ENTER";
    CATCH_KEY_CODE_EVENT[CATCH_KEY_CODE_EVENT["LEFT"] = 37] = "LEFT";
    CATCH_KEY_CODE_EVENT[CATCH_KEY_CODE_EVENT["UP"] = 38] = "UP";
    CATCH_KEY_CODE_EVENT[CATCH_KEY_CODE_EVENT["RIGHT"] = 39] = "RIGHT";
    CATCH_KEY_CODE_EVENT[CATCH_KEY_CODE_EVENT["DOWN"] = 40] = "DOWN";
  })(CATCH_KEY_CODE_EVENT || (CATCH_KEY_CODE_EVENT = {}));
  //父子页通信事件枚举
  var COMM_EVENT;
  (function (COMM_EVENT) {
    COMM_EVENT["I_INIT_FINISH"] = "iframeInitFinish";
    COMM_EVENT["START"] = "start";
    COMM_EVENT["PLAY"] = "play";
    COMM_EVENT["PAUSE"] = "pause";
    COMM_EVENT["ADVANCE"] = "advance";
    COMM_EVENT["RETREAT"] = "retreat";
    COMM_EVENT["STOP"] = "stop";
    COMM_EVENT["DESTROY"] = "destroy";
    COMM_EVENT["SET_STEP"] = "setStep";
    COMM_EVENT["ON_PLAYING"] = "playing";
    COMM_EVENT["ON_PAUSE"] = "pause";
    COMM_EVENT["ON_TIMEUPDATE"] = "timeupdate";
    COMM_EVENT["ON_LOADEDMETADATA"] = "loadedmetadata";
    COMM_EVENT["ON_ERROR"] = "error";
  })(COMM_EVENT || (COMM_EVENT = {}));
  //父子页通信异常类型
  var COMM_ERROR_TYPE;
  (function (COMM_ERROR_TYPE) {
    COMM_ERROR_TYPE["NO_MEDIA"] = "\u6CA1\u6709\u89C6\u9891url";
    COMM_ERROR_TYPE["AD_ERROR"] = "\u5E7F\u544A\u64AD\u653E\u5F02\u5E38";
  })(COMM_ERROR_TYPE || (COMM_ERROR_TYPE = {}));
  //播放器播放步骤
  var PLAY_STEP;
  (function (PLAY_STEP) {
    PLAY_STEP[PLAY_STEP["LOAD"] = 0] = "LOAD";
    PLAY_STEP[PLAY_STEP["AD"] = 1] = "AD";
    PLAY_STEP[PLAY_STEP["MEDIA"] = 2] = "MEDIA";
    PLAY_STEP[PLAY_STEP["ERROR"] = 3] = "ERROR";
  })(PLAY_STEP || (PLAY_STEP = {}));

  var loading = document.getElementById('loading');
  var playerVideo = document.getElementById('playerVideo');
  var vZone = '',
    mediaUrl = '';
  //创建正片媒介播放
  var createPlayerVideo = function createPlayerVideo() {
    var videoAd = document.querySelector('#videoadcontainer');
    videoAd && (videoAd.innerHTML = '');
    videoAd = null;
    send(COMM_EVENT.SET_STEP, {
      step: PLAY_STEP.LOAD
    });
    if (!!mediaUrl && playerVideo) {
      loading && (loading.style.display = 'block');
      playerVideo.src = mediaUrl;
      playerVideo.style.display = 'block';
    } else {
      send(COMM_EVENT.ON_ERROR, {
        error: COMM_ERROR_TYPE.NO_MEDIA
      });
      send(COMM_EVENT.SET_STEP, {
        step: PLAY_STEP.ERROR
      });
    }
  };
  //开始初始播放
  var start = function start(message) {
    var zoneId = message.zoneId,
      media = message.media;
    vZone = zoneId;
    mediaUrl = media;
    send(COMM_EVENT.SET_STEP, {
      step: PLAY_STEP.LOAD
    });
    if (!!vZone) {
      try {
        // @ts-ignore
        var videoAd = new SmartTV_VideoBanner(vZone, 'videoadcontainer', '', '');
        if (typeof videoAd.setNeedNonce == 'function') {
          videoAd.setNeedNonce(true); //等待nonce返回
        }
        videoAd.startAd();
      } catch (error) {
        send(COMM_EVENT.ON_ERROR, {
          error: COMM_ERROR_TYPE.AD_ERROR
        });
        send(COMM_EVENT.SET_STEP, {
          step: PLAY_STEP.ERROR
        });
      }
    } else {
      createPlayerVideo();
      play();
    }
  };
  //播放
  var play = function play() {
    return playerVideo === null || playerVideo === void 0 ? void 0 : playerVideo.play();
  };
  //暂停
  var pause = function pause() {
    return playerVideo === null || playerVideo === void 0 ? void 0 : playerVideo.pause();
  };
  //结束播放
  var stop = function stop() {
    pause();
    playerVideo && (playerVideo.currentTime = 0);
  };
  //前跳
  var advance = function advance() {
    return playerVideo && (playerVideo.currentTime += 10);
  };
  // 后跳
  var retreat = function retreat() {
    return playerVideo && (playerVideo.currentTime -= 10);
  };
  //发送消息
  var send = function send(type, message) {
    window.parent.postMessage({
      type: type,
      message: message
    }, '*');
  };
  //接收消息
  var message = function message(ev) {
    var type = ev.data.type;
    var message = ev.data.message;
    switch (type) {
      case COMM_EVENT.START:
        start(message);
        break;
      case COMM_EVENT.PLAY:
        play();
        break;
      case COMM_EVENT.PAUSE:
        pause();
        break;
      case COMM_EVENT.ADVANCE:
        advance();
        break;
      case COMM_EVENT.RETREAT:
        retreat();
        break;
      case COMM_EVENT.STOP:
        stop();
        break;
      case COMM_EVENT.DESTROY:
        destroy();
        break;
    }
  };
  //广告开始播放
  var adPlayStarted = function adPlayStarted() {
    console.log('==PlayStarted==');
    loading && (loading.style.display = 'none');
    send(COMM_EVENT.SET_STEP, {
      step: PLAY_STEP.AD
    });
    // @ts-ignore
    if (window.nonceManager) {
      // @ts-ignore
      window.nonceManager.sendPlaybackStart();
    }
  };
  //广告播放完成
  var adPlayFinished = function adPlayFinished() {
    console.log('==PlayFinished==');
    createPlayerVideo();
    play();
  };
  /**
   * 播放器监听事件处理函数
   * @returns
   */
  var successPlaying = function successPlaying() {
    return send(COMM_EVENT.ON_PLAYING);
  };
  var successPause = function successPause() {
    return send(COMM_EVENT.ON_PAUSE);
  };
  var successLoaded = function successLoaded() {
    loading && (loading.style.display = 'none');
    var isMute = (playerVideo === null || playerVideo === void 0 ? void 0 : playerVideo.muted) || false;
    var duration = (playerVideo === null || playerVideo === void 0 ? void 0 : playerVideo.duration) || 0;
    send(COMM_EVENT.SET_STEP, {
      step: PLAY_STEP.MEDIA
    });
    send(COMM_EVENT.ON_LOADEDMETADATA, {
      isMute: isMute,
      duration: duration
    });
  };
  var timeupdate = function timeupdate() {
    var currentTime = (playerVideo === null || playerVideo === void 0 ? void 0 : playerVideo.currentTime) || 0;
    send(COMM_EVENT.ON_TIMEUPDATE, {
      currentTime: currentTime
    });
  };
  var playError = function playError() {
    return send(COMM_EVENT.ON_ERROR);
  };
  //绑定相关事件
  var bindEvent = function bindEvent() {
    window.addEventListener('message', message);
    document.addEventListener('PlayStarted', adPlayStarted);
    document.addEventListener('PlayFinished', adPlayFinished);
    playerVideo === null || playerVideo === void 0 ? void 0 : playerVideo.addEventListener(COMM_EVENT.ON_PLAYING, successPlaying);
    playerVideo === null || playerVideo === void 0 ? void 0 : playerVideo.addEventListener(COMM_EVENT.ON_PAUSE, successPause);
    playerVideo === null || playerVideo === void 0 ? void 0 : playerVideo.addEventListener(COMM_EVENT.ON_LOADEDMETADATA, successLoaded);
    playerVideo === null || playerVideo === void 0 ? void 0 : playerVideo.addEventListener(COMM_EVENT.ON_TIMEUPDATE, timeupdate);
    playerVideo === null || playerVideo === void 0 ? void 0 : playerVideo.addEventListener(COMM_EVENT.ON_ERROR, playError);
  };
  //摧毁
  var destroy = function destroy() {
    window.removeEventListener('message', message);
    document.removeEventListener('PlayStarted', adPlayStarted);
    document.removeEventListener('PlayFinished', adPlayFinished);
    playerVideo === null || playerVideo === void 0 ? void 0 : playerVideo.removeEventListener(COMM_EVENT.ON_PLAYING, successPlaying);
    playerVideo === null || playerVideo === void 0 ? void 0 : playerVideo.removeEventListener(COMM_EVENT.ON_PAUSE, successPause);
    playerVideo === null || playerVideo === void 0 ? void 0 : playerVideo.removeEventListener(COMM_EVENT.ON_LOADEDMETADATA, successLoaded);
    playerVideo === null || playerVideo === void 0 ? void 0 : playerVideo.removeEventListener(COMM_EVENT.ON_TIMEUPDATE, timeupdate);
    playerVideo === null || playerVideo === void 0 ? void 0 : playerVideo.removeEventListener(COMM_EVENT.ON_ERROR, playError);
    playerVideo = null;
  };
  var init = function init() {
    bindEvent();
    send(COMM_EVENT.I_INIT_FINISH);
  };
  init();

}));
