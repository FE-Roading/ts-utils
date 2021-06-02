/**
 * 比较好对第三方库
 * https://github.com/lancedikson/bowser
 * https://github.com/mumuy/browser
 */
const userAgent = navigator.userAgent;

export function isIOS() {
  var iosQuirkPresent = function () {
    var audio = new Audio();

    audio.volume = 0.5;
    return audio.volume === 1;   // volume cannot be changed from "1" on iOS 12 and below
  };

  var isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
  var isAppleDevice = navigator.userAgent.includes('Macintosh');
  var isTouchScreen = navigator.maxTouchPoints >= 1;   // true for iOS 13 (and hopefully beyond)

  return isIos || (isAppleDevice && (isTouchScreen || iosQuirkPresent()));
}

export function getIOSVersion() {
  if (isIOS()) { // <-- Use the one here above
    if (window.indexedDB) { return 'iOS 8 and up'; }
    if (window.SpeechSynthesisUtterance) { return 'iOS 7'; }
    if (window.webkitAudioContext) { return 'iOS 6'; }
    // @ts-ignore
    if (window.matchMedia) { return 'iOS 5'; }
    if (window.history && 'pushState' in window.history) { return 'iOS 4'; }
    return 'iOS 3 or earlier';
  }

  return null;
}

export function isMobile() {
  return (
    userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1 ||
    isIOS()
  )
}

export function isPC() {
  return !isMobile()
}

export function getIEVersion() {
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6;//IE版本<=7
    }
  } else if (isEdge) {
    return 'edge';//edge
  } else if (isIE11) {
    return 11; //IE11  
  } else {
    return -1;//不是ie浏览器
  }
}

export function getBrowserType() {
  const ieVersion = getIEVersion()
  if (ieVersion !== -1) return "IE "+ieVersion

  const isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
  const isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
  const isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
  const isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
  const isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

  if (isFF) return "FF";
  if (isOpera) return "Opera";
  if (isEdge) return "Edge";
  if (isSafari) return "Safari";
  if (isChrome) return "Chrome";

  return null
}
