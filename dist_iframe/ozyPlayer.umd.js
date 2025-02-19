!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";var e,n,t,r,o,i;!function(e){e.VIDEO="zeasn-whale-player-video",e.CONTROL="zeasn-whale-player-control",e.RETREAT="retreat",e.ADVANCE="advance",e.RETROGRESS="retrogress",e.SPEED="speed",e.PLAY="play",e.PAUSE="pause",e.MUTE="mute",e.SOUND="sound",e.FULLSCREEN="fullscreen",e.CANCEL_FULLSCREEN="cancelFullscreen",e.PLAY_BTN="play-btn",e.MUTE_BTN="mute-btn",e.FULLSCREEN_BTN="fullscreen-btn",e.PROGRESS_BAR="progress-bar",e.CURRENT_TIME="current-time",e.TOTAL_TIME="total-time",e.SETTING="setting"}(e||(e={})),function(e){e.PLAY_STARTED="STARTED",e.PLAY_FINISHED="FINISHED",e.PLAY_ERRO="RERROR",e.AD_INSERTED="AD_INSERTED",e.AD_COMPLETED="AD_COMPLETED",e.PLAY_PAUSED="PAUSED",e.PLAY_RESUMED="RESUMED",e.PLAYER_INIT="PLAYER_INIT",e.LOADEDMETADATA="LOADEDMETADATA"}(n||(n={})),function(e){e[e.ENTER=13]="ENTER",e[e.LEFT=37]="LEFT",e[e.UP=38]="UP",e[e.RIGHT=39]="RIGHT",e[e.DOWN=40]="DOWN"}(t||(t={})),function(e){e.I_INIT_FINISH="iframeInitFinish",e.START="start",e.PLAY="play",e.PAUSE="pause",e.ADVANCE="advance",e.RETREAT="retreat",e.STOP="stop",e.DESTROY="destroy",e.SET_STEP="setStep",e.ON_PLAYING="playing",e.ON_PAUSE="pause",e.ON_ENDED="ended",e.ON_TIMEUPDATE="timeupdate",e.ON_LOADEDMETADATA="loadedmetadata",e.ON_ERROR="error",e.AD_INSERTED="AD_INSERTED",e.AD_COMPLETED="AD_COMPLETED"}(r||(r={})),function(e){e.NO_MEDIA="没有视频url",e.AD_ERROR="广告播放异常"}(o||(o={})),function(e){e[e.LOAD=0]="LOAD",e[e.AD=1]="AD",e[e.MEDIA=2]="MEDIA",e[e.ERROR=3]="ERROR"}(i||(i={}));var a=function(){return a=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e},a.apply(this,arguments)};function c(e){var n,t=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(n=(document.cookie||window.localStorage&&window.localStorage.cookie||"").match(t))?unescape(n[2]):""}function u(e){var n=window.externalMacroParam;return n&&"object"==typeof n&&n.hasOwnProperty(e)?n[e]:""}"function"==typeof SuppressedError&&SuppressedError;var l={"[whale_ad_id]":function(){},"[tv_brand]":function(){return function(){if(localStorage.getItem("brand"))return localStorage.getItem("brand");var e=navigator.userAgent.toUpperCase();return e.indexOf("AOC")>-1?"aoc":e.indexOf("PHILIPS")>-1?"philips":"others"}()},"[cntry]":function(){},"[geo_ip_country]":function(){},"[platform_id]":function(){return(e=c("profileid")||c("profileId"))&&""!=e?e.split("_")[1]:"Unknown";var e},"[device_user_agent]":function(){var e=navigator.userAgent;return encodeURIComponent(e)},"[device_ip_address]":function(){return u("device_ip_address")},"[menu_language]":function(){var e=navigator.language;return e?e.length>2?e.slice(0,2):e:"un"},"[time_zone]":function(){return(new Date).getTimezoneOffset()}},d={"[whale_gdpr]":function(){return u("whale_gdpr")||("true"==c("relAdvert")?1:0)},"[whale_gdpr_consent]":function(){return c("tcString")||("object"==typeof localStorage?localStorage.getItem("default_tcString"):null)},"[relevant_ads]":function(){var e="false";return null==(navigator.userAgent.toUpperCase().indexOf("AOC"),e=c("relAdvert"))?"false":e},"[device_dnt]":function(){return u("device_dnt")||("true"==c("relAdvert")?0:1)},"[device_lmt]":function(){return"true"===c("relAdvert")?0:1},"[privacy_policy]":function(){}},E={"[rnd]":function(){return(new Date).getTime()},"[timestamp]":function(){return(new Date).getTime()},"[ad_sdk_ver]":function(){return""},"[google_pal]":function(){return!window.googleNonce&&c("googleNonce")?c("googleNonce"):(window.googleNonce&&(e=window.googleNonce,n=new Date((new Date).getTime()+216e5),t="googleNonce="+escape(e)+(n?";expires="+n.toGMTString():""),document.cookie=t),window.googleNonce||"");var e,n,t}},s={"[device_id]":function(){return c("deviceid")||c("deviceId")},"[session_id]":function(){return window.session_id},"[usertag]":function(){return c("usertag")}},_=a(a(a(a(a(a({},{"[tv_domain]":function(){return document.domain},"[app_name]":function(){},"[bundle_id]":function(){},"[app_store_url]":function(){},"[src_page_url]":function(){return encodeURIComponent(location.origin||"".concat(location.protocol,"//").concat(location.host||location.hostname).concat(location.port))},"[player_height]":function(){},"[player_width]":function(){},"[placement]":function(){},"[app_store]":function(){return u("app_store")||"Zeasn"}}),{"[provider_id]":function(){},"[channel_no]":function(){},"[channel_category]":function(){},"[channel_name]":function(){},"[iab_category]":function(){},"[avod_id]":function(){},"[avod_genre]":function(){},"[avod_title]":function(){},"[oriented_age]":function(){},"[oriented_gender]":function(){},"[ssai_vendor]":function(){}}),l),d),E),s),f=function(){function e(){this.params={}}return e.prototype.set=function(e){if(e)for(var n in e)e.hasOwnProperty(n)&&(this.params[n]=e[n]);else console.log("Invalid settings")},e.prototype.handle=function(e){return function(e,n){for(var t in _){var r=t.replace("[","\\[").replace("]","\\]"),o=t.replace("[","").replace("]","");e=e.replace(new RegExp(r,"g"),n[o]||_[t]()||"")}return i=/\[.*?\]/g,e.replace(i,"");var i}(e,this.params)},e}(),p=document.getElementById("loading"),A=document.getElementById("playerVideo"),T="",v="",g=new f;g.set({player_height:(null==A?void 0:A.clientHeight)||720,player_width:(null==A?void 0:A.clientWidth)||1280});var D=function(){var e=document.querySelector("#videoadcontainer");e&&(e.style.display="none",e.innerHTML=""),e=null,N(r.SET_STEP,{step:i.LOAD}),v&&A?(p&&(p.style.display="block"),A.src=g.handle(v),A.style.display="block"):(N(r.ON_ERROR,{error:o.NO_MEDIA}),N(r.SET_STEP,{step:i.ERROR}))},R=function(){return null==A?void 0:A.play()},O=function(){return null==A?void 0:A.pause()},N=function(e,n){window.parent.postMessage({type:e,message:n},"*")},S=function(e){var n=e.data.type,t=e.data.message;switch(n){case r.START:!function(e){var n=e.zoneId,t=e.media;if(T=n,v=t,N(r.SET_STEP,{step:i.LOAD}),T)try{var a=new SmartTV_VideoBanner(T,"videoadcontainer","","");"function"==typeof a.setIgnoreFocus&&a.setIgnoreFocus(!0),a.startAd()}catch(e){N(r.ON_ERROR,{error:o.AD_ERROR}),N(r.SET_STEP,{step:i.ERROR})}else D(),R()}(t);break;case r.PLAY:R();break;case r.PAUSE:O();break;case r.ADVANCE:A&&(A.currentTime+=10);break;case r.RETREAT:A&&(A.currentTime-=10);break;case r.STOP:O(),A&&(A.style.display="block",A.src="");break;case r.DESTROY:U()}},m=function(){console.log("==PlayStarted=="),p&&(p.style.display="none"),N(r.SET_STEP,{step:i.AD}),N(r.AD_INSERTED),window.nonceManager&&window.nonceManager.sendPlaybackStart()},L=function(){console.log("==PlayFinished=="),N(r.AD_COMPLETED),D(),R()},P=function(){return N(r.ON_PLAYING)},I=function(){return N(r.ON_PAUSE)},y=function(){return N(r.ON_ENDED)},w=function(){p&&(p.style.display="none");var e=(null==A?void 0:A.muted)||!1,n=(null==A?void 0:A.duration)||0;N(r.SET_STEP,{step:i.MEDIA}),N(r.ON_LOADEDMETADATA,{isMute:e,duration:n})},h=function(){var e=(null==A?void 0:A.currentTime)||0;N(r.ON_TIMEUPDATE,{currentTime:e})},M=function(){return N(r.ON_ERROR)},U=function(){window.removeEventListener("message",S),document.removeEventListener("PlayStarted",m),document.removeEventListener("PlayFinished",L),null==A||A.removeEventListener(r.ON_PLAYING,P),null==A||A.removeEventListener(r.ON_PAUSE,I),null==A||A.removeEventListener(r.ON_ENDED,y),null==A||A.removeEventListener(r.ON_LOADEDMETADATA,w),null==A||A.removeEventListener(r.ON_TIMEUPDATE,h),null==A||A.removeEventListener(r.ON_ERROR,M),A=null};window.addEventListener("message",S),document.addEventListener("PlayStarted",m),document.addEventListener("PlayFinished",L),null==A||A.addEventListener(r.ON_PLAYING,P),null==A||A.addEventListener(r.ON_PAUSE,I),null==A||A.addEventListener(r.ON_ENDED,y),null==A||A.addEventListener(r.ON_LOADEDMETADATA,w),null==A||A.addEventListener(r.ON_TIMEUPDATE,h),null==A||A.addEventListener(r.ON_ERROR,M),N(r.I_INIT_FINISH)}));
