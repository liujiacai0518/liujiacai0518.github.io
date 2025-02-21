!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";var e,n,t,o,r,a;!function(e){e.VIDEO="zeasn-whale-player-video",e.CONTROL="zeasn-whale-player-control",e.RETREAT="retreat",e.ADVANCE="advance",e.RETROGRESS="retrogress",e.SPEED="speed",e.PLAY="play",e.PAUSE="pause",e.MUTE="mute",e.SOUND="sound",e.PRAISE="praise",e.TRAMPLE="trample",e.FULLSCREEN="fullscreen",e.CANCEL_FULLSCREEN="cancelFullscreen",e.PLAY_BTN="play-btn",e.MUTE_BTN="mute-btn",e.FULLSCREEN_BTN="fullscreen-btn",e.PROGRESS_BAR="progress-bar",e.CURRENT_TIME="current-time",e.TOTAL_TIME="total-time",e.SETTING="setting"}(e||(e={})),function(e){e.PLAY_STARTED="STARTED",e.PLAY_FINISHED="FINISHED",e.PLAY_ERRO="RERROR",e.AD_INSERTED="AD_INSERTED",e.AD_COMPLETED="AD_COMPLETED",e.PLAY_PAUSED="PAUSED",e.PLAY_RESUMED="RESUMED",e.PLAYER_INIT="PLAYER_INIT",e.LOADEDMETADATA="LOADEDMETADATA"}(n||(n={})),function(e){e[e.ENTER=13]="ENTER",e[e.LEFT=37]="LEFT",e[e.UP=38]="UP",e[e.RIGHT=39]="RIGHT",e[e.DOWN=40]="DOWN"}(t||(t={})),function(e){e.I_INIT_FINISH="iframeInitFinish",e.START="start",e.PLAY="play",e.PAUSE="pause",e.ADVANCE="advance",e.RETREAT="retreat",e.STOP="stop",e.DESTROY="destroy",e.SET_STEP="setStep",e.ON_PLAYING="playing",e.ON_PAUSE="pause",e.ON_ENDED="ended",e.ON_WAITING="waiting",e.ON_TIMEUPDATE="timeupdate",e.ON_LOADEDMETADATA="loadedmetadata",e.ON_ERROR="error",e.AD_INSERTED="AD_INSERTED",e.AD_COMPLETED="AD_COMPLETED"}(o||(o={})),function(e){e.NO_MEDIA="没有视频url",e.AD_ERROR="广告播放异常"}(r||(r={})),function(e){e[e.LOAD=0]="LOAD",e[e.AD=1]="AD",e[e.MEDIA=2]="MEDIA",e[e.ERROR=3]="ERROR",e[e.FINISH=4]="FINISH"}(a||(a={}));var i=function(){return i=Object.assign||function(e){for(var n,t=1,o=arguments.length;t<o;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},i.apply(this,arguments)};function c(e){var n,t=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(n=(document.cookie||window.localStorage&&window.localStorage.cookie||"").match(t))?unescape(n[2]):""}function l(e){return"object"==typeof localStorage?localStorage.getItem(e):null}function u(e,n,t,o,r,a){var i=e+"="+escape(n)+(t?";expires="+t.toGMTString():"");document.cookie=i}function s(e){var n=window.externalMacroParam;return n&&"object"==typeof n&&n.hasOwnProperty(e)?n[e]:""}"function"==typeof SuppressedError&&SuppressedError;var d={"[whale_ad_id]":function(){return function(){var e=c("WhaleADID");return null!=e&&""!=e&&null!=e&&e&&e.match(/-/g)&&4==e.match(/-/g).length?u("WhaleADID",e,new Date((new Date).getTime()+31536e6)):u("WhaleADID",e=function(){function e(e){var n=(Math.random().toString(16)+"000000000").substr(2,8);return e?"-"+n.substr(0,4)+"-"+n.substr(4,4):n}return e()+e(!0)+e(!0)+e()}(),new Date((new Date).getTime()+31536e6)),e}()},"[tv_brand]":function(){return function(){if(localStorage.getItem("brand"))return localStorage.getItem("brand");var e="others",n=navigator.userAgent.toLocaleLowerCase(),t=n.indexOf("titanos")>-1,o=n.indexOf("aoc")>-1,r=n.indexOf("philips")>-1,a=n.indexOf("tcl")>-1||n.indexOf("tbrowser")>-1,i=n.indexOf("moka")>-1,c=n.indexOf("skw")>-1,l=n.indexOf("tizen")>-1||n.indexOf("samsung")>-1||n.indexOf("smarthub")>-1,u=n.indexOf("webos")>-1||n.indexOf("lg")>-1||n.indexOf("web0s")>-1||n.indexOf("netcast")>-1,s=n.indexOf("vstvb")>-1;switch(!0){case t:e="Philips";break;case o:e="AOC";break;case r:e="Philips";break;case a:e="TCL";break;case i:e="MOKA";break;case c:e="Skyworth";break;case l:e="Samsung";break;case u:e="LG";break;case s:e="Vestel"}return e}()},"[cntry]":function(){return l("macro_cntry")},"[geo_ip_country]":function(){return l("macro_cntry")},"[platform_id]":function(){return(e=c("profileid")||c("profileId"))&&""!=e?e.split("_")[1]:"Unknown";var e},"[device_user_agent]":function(){var e=navigator.userAgent;return encodeURIComponent(e)},"[device_ip_address]":function(){return s("device_ip_address")},"[menu_language]":function(){var e=navigator.language;return e?e.length>2?e.slice(0,2):e:"un"},"[time_zone]":function(){return(new Date).getTimezoneOffset()}},p={"[whale_gdpr]":function(){return s("whale_gdpr")||("true"==c("relAdvert")?1:0)},"[whale_gdpr_consent]":function(){return c("tcString")||l("default_tcString")},"[relevant_ads]":function(){var e="false";return null==(navigator.userAgent.toUpperCase().indexOf("AOC"),e=c("relAdvert"))?"false":e},"[device_dnt]":function(){return s("device_dnt")||("true"==c("relAdvert")?0:1)},"[device_lmt]":function(){return"true"===c("relAdvert")?0:1},"[privacy_policy]":function(){}},E={"[rnd]":function(){return(new Date).getTime()},"[timestamp]":function(){return(new Date).getTime()},"[ad_sdk_ver]":function(){return""},"[google_pal]":function(){return!window.googleNonce&&c("googleNonce")?c("googleNonce"):(window.googleNonce&&u("googleNonce",window.googleNonce,new Date((new Date).getTime()+216e5)),window.googleNonce||"")}},f={"[device_id]":function(){return c("deviceid")||c("deviceId")},"[session_id]":function(){return window.session_id},"[usertag]":function(){return c("usertag")}},g=i(i(i(i(i(i({},{"[tv_domain]":function(){return document.domain},"[app_name]":function(){},"[bundle_id]":function(){},"[app_store_url]":function(){},"[src_page_url]":function(){return encodeURIComponent(location.origin||"".concat(location.protocol,"//").concat(location.host||location.hostname).concat(location.port))},"[player_height]":function(){},"[player_width]":function(){},"[placement]":function(){},"[app_store]":function(){return s("app_store")||"Zeasn"}}),{"[provider_id]":function(){},"[channel_no]":function(){},"[channel_category]":function(){},"[channel_name]":function(){},"[iab_category]":function(){},"[avod_id]":function(){},"[avod_genre]":function(){},"[avod_title]":function(){},"[oriented_age]":function(){},"[oriented_gender]":function(){},"[ssai_vendor]":function(){}}),d),p),E),f),_=function(){function e(){var e,n;this.params={},e=function(e){var n;n=e.iso_code,"object"==typeof localStorage&&localStorage.setItem("macro_cntry",n)},n=document.createElement("script"),window.zeasnIpapiCallback=function(t){e(t),document.body.removeChild(n)},n.src="".concat("https://ipapi.zeasn.com/ipapi/location","?callback=zeasnIpapiCallback"),document.body.appendChild(n)}return e.prototype.set=function(e){if(e)for(var n in e)e.hasOwnProperty(n)&&(this.params[n]=e[n]);else console.log("Invalid settings")},e.prototype.handle=function(e){return function(e,n){for(var t in g){var o=t.replace("[","\\[").replace("]","\\]"),r=t.replace("[","").replace("]","");e=e.replace(new RegExp(o,"g"),n[r]||g[t]()||"")}return a=/\[.*?\]/g,e.replace(a,"");var a}(e,this.params)},e}(),A=function(){function e(){var e=this;if(this.initiate=!1,"object"==typeof window.goog&&"object"==typeof window.goog.pal)this.init();else{var n=document.createElement("script");n.setAttribute("type","text/javascript"),n.setAttribute("src","https://imasdk.googleapis.com/pal/sdkloader/pal.js"),n.onload=function(){e.init(),e.initiate&&e.generateNonce()},n.onerror=function(){e.nonceUpdate({status:2,message:"pal sdk load error"})},document.head.appendChild(n)}}return e.prototype.init=function(){var e=new window.goog.pal.ConsentSettings;e.allowStorage=!1,this.nonceLoader=new window.goog.pal.NonceLoader(e)},e.prototype.generateNonce=function(){var e=this;if("object"==typeof window.goog&&"object"==typeof window.goog.pal){var n=new window.goog.pal.NonceRequest;n.adWillAutoPlay=!0,n.adWillPlayMuted=!1,n.continuousPlayback=!1,n.descriptionUrl="https://example.com",n.iconsSupported=!0,n.playerType="Sample Player Type",n.playerVersion="1.0",n.ppid="Sample PPID",n.sessionId="Sample SID",n.supportedApiFrameworks="2,7,9",n.url="https://developers.google.com/ad-manager/pal/html5",n.videoHeight=720,n.videoWidth=1280,this.nonceLoader.loadNonceManager(n).then((function(n){e.nonceManager=n,e.nonce=n.getNonce(),e.nonceUpdate({status:0,message:"Nonce generated",nonce:e.nonce})})).catch((function(n){e.nonceUpdate({status:1,message:n})}))}else this.initiate=!0},e.prototype.destroy=function(){this.params=null,this.nonceLoader=null,this.nonceManager=null,this.initiate=null},e}(),v=document.getElementById("loading"),T=document.getElementById("playerVideo"),m="",D="",O=function(){return v&&(v.style.display="block")},N=function(){return v&&(v.style.display="none")},S=new _;S.set({player_height:(null==T?void 0:T.clientHeight)||720,player_width:(null==T?void 0:T.clientWidth)||1280});var R=new A,w=function(){var e=document.querySelector("#videoadcontainer");e&&(e.style.display="none",e.innerHTML=""),e=null,I(o.SET_STEP,{step:a.LOAD}),D&&T?(O(),R.nonceUpdate=function(e){0===e.status&&S.set({google_pal:R.nonce}),T&&(T.src=S.handle(D),T.style.display="block")},R.generateNonce()):(I(o.ON_ERROR,{error:r.NO_MEDIA}),I(o.SET_STEP,{step:a.ERROR}))},y=function(){return null==T?void 0:T.pause()},I=function(e,n){window.parent.postMessage({type:e,message:n},"*")},h=function(e){var n=e.data.type,t=e.data.message;switch(n){case o.START:!function(e){var n=e.zoneId,t=e.media;if(m=n,D=t,I(o.SET_STEP,{step:a.LOAD}),m)try{var i=new SmartTV_VideoBanner(m,"videoadcontainer","","");"function"==typeof i.setIgnoreFocus&&i.setIgnoreFocus(!0),i.startAd()}catch(e){I(o.ON_ERROR,{error:r.AD_ERROR}),I(o.SET_STEP,{step:a.ERROR})}else w()}(t);break;case o.PLAY:null==T||T.play();break;case o.PAUSE:y();break;case o.ADVANCE:T&&(T.currentTime+=10);break;case o.RETREAT:T&&(T.currentTime-=10);break;case o.STOP:T&&(y(),T.style.display="none",T.currentTime=0,I(o.SET_STEP,{step:a.FINISH}));break;case o.DESTROY:Y()}},L=function(){console.log("==PlayStarted=="),N(),I(o.SET_STEP,{step:a.AD}),I(o.AD_INSERTED),window.nonceManager&&window.nonceManager.sendPlaybackStart()},P=function(){console.log("==PlayFinished=="),I(o.AD_COMPLETED),w()},b=function(){N(),I(o.ON_PLAYING)},M=function(){return I(o.ON_PAUSE)},k=function(){return I(o.ON_ENDED)},U=function(){var e=(null==T?void 0:T.muted)||!1,n=(null==T?void 0:T.duration)||0;N(),I(o.SET_STEP,{step:a.MEDIA}),I(o.ON_LOADEDMETADATA,{isMute:e,duration:n})},C=function(){var e=(null==T?void 0:T.currentTime)||0;I(o.ON_TIMEUPDATE,{currentTime:e})},x=function(){return I(o.ON_ERROR)},F=function(){O()},Y=function(){window.removeEventListener("message",h),document.removeEventListener("PlayStarted",L),document.removeEventListener("PlayFinished",P),null==T||T.removeEventListener(o.ON_PLAYING,b),null==T||T.removeEventListener(o.ON_PAUSE,M),null==T||T.removeEventListener(o.ON_ENDED,k),null==T||T.removeEventListener(o.ON_LOADEDMETADATA,U),null==T||T.removeEventListener(o.ON_TIMEUPDATE,C),null==T||T.removeEventListener(o.ON_ERROR,x),null==T||T.removeEventListener(o.ON_WAITING,F),T=null};window.addEventListener("message",h),document.addEventListener("PlayStarted",L),document.addEventListener("PlayFinished",P),null==T||T.addEventListener(o.ON_PLAYING,b),null==T||T.addEventListener(o.ON_PAUSE,M),null==T||T.addEventListener(o.ON_ENDED,k),null==T||T.addEventListener(o.ON_LOADEDMETADATA,U),null==T||T.addEventListener(o.ON_TIMEUPDATE,C),null==T||T.addEventListener(o.ON_ERROR,x),null==T||T.addEventListener(o.ON_WAITING,F),I(o.I_INIT_FINISH)}));
