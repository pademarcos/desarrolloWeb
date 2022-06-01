/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function () {

  if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    };
  }


  function jpLog(label, input) {
    if(!JP_CONFIG.debug) {
      return;
    }

    if(typeof input === "undefined"){
      input = "";
    }

    console.log("%c "+label+": "+input+" ", 'background: #222; color: #bada55');
  }

  var JP_URL = 'https://es.ads.justpremium.com/adserve/client/?zone=67906&debug=1';
  var JP_SCRIPTS = [];
  var JP_CONFIG = {"debug":false,"adEndpoint":"https://es.ads.justpremium.com/adserve/client/?zone=67906&debug=1","rid":"r-7db083f6-2bc4-4346-b658-b85edef017c8-49115-67259547","sid":"r-5a4ee8ab-bd08-4452-8d1f-c7a9ebb946b7-49115-67275861","uid":"r-99094ddc-6c37-47aa-b3c3-a54c6cf48b87-49115-67295629","version":"v2.22.460","siteWidth":null,"appName":"2.3.4","vpc":"eu-central-1","zoneId":67906,"delayTcf":false,"subDomain":"","trackingUrl":"//tracking.justpremium.com/tracking.gif","jpxLib":"//cdn.justpremium.com/js/v2.22.460/jpx.js","jpxLibPolyfill":"//cdn.justpremium.com/js/v2.22.460/jpxp.js","isEu":false,"usPrivacy":"","ias":"{\"ias\":{\"riskIP\":\"\",\"riskHref\":[\"NO_DATA\"],\"content\":[\"NO_DATA\"]}}","toLoad":null};
  JP_CONFIG.dTcf = false;
  JP_CONFIG.debug = JP_CONFIG.debug || false;

  var iframe = null;

  var cross = false;
  var scope = window;

  var excludedZones = [
    10386,
    25709,
    25710,
    28835,
    28836,
    28837,
    28838,
    33306,
    33310,
    33707,
    39822,
    39823,
    39824,
    39827,
    40642,
    40644,
    40645,
    43943,
    34698,
    34699,
    34700,
    34701,
    34704,
    34705,
    34706,
    34707
  ];

  var excludedUrls = [
    'adnxs.net'
  ];

  try {
    var head = window.top.head;
  } catch (e) {
    cross = true;
  }
  ;

  if (!cross) {
    scope = window.top;
  }

  var uspData = "";
  try {
    if (typeof window.top.__uspapi === "function") {
      __uspapi("getUSPData", 1, function (usp, success) {
        if (success) {
          uspData = usp.uspString;
        }
      })
    }
  } catch (e) {
  }

  var getTrackingData = function () {
    var obj = {
      rid: JP_CONFIG.rid,
      sid: JP_CONFIG.sid,
      uid: JP_CONFIG.uid,
      vr: JP_CONFIG.version,
      ru: getReffererUrl(),
      tt: new Date().getTime(),
      siw: 0,
      sh: scope.screen.height,
      sw: scope.screen.width,
      wh: scope.innerHeight,
      ww: scope.innerWidth,
      an: JP_CONFIG.appName,
      vn: JP_CONFIG.vpc,
      sd: '',
      _c: Math.floor((Math.random() * Math.pow(2, 32)) + 1).toString(),
      et: '',
      aid: '',
      said: '',
      ei: '',
      fc: '',
      sp: '',
      at: 'adserver',
      cid: 0,
      ist: '',
      mg: '',
      dl: '',
      dlt: '',
      ev: '',
      vt: '',
      zid: JP_CONFIG.zoneId,
      dr: 0,
      di: '',
      pr: '',
      cw: '',
      ch: '',
      nt: '',
      st: '',
      jp: JP_CONFIG.ias || {},
      ty: 'ta'
    };

    return obj;
  };

  try {
    try {
      if (JP_CONFIG.appName && JP_CONFIG.appName === 'rls1') {
        console.info("%c JPX Release server", 'background: #555; color: #bada55; font-size: 14px;');
      }
    } catch (e) {
    }

    function prepareHiddenIframe(globals, callback) {
      callback = callback || function () {
      };
      var id = "jpx_0" + "x000000_caller_window";
      var iframeId = 'jpx_0_pd';
      var d = scope.document;
      var b = d.body;
      var gdpr = globals.cmp && globals.cmp.eu ? 1 : 0,
        gdprConsent = globals.cmp && globals.cmp.eu ? globals.cmp.consentString : "";
      var ccpa = '';

      if (JP_CONFIG.usPrivacy && JP_CONFIG.usPrivacy !== '${US_PRIVACY}') {
        ccpa = JP_CONFIG.usPrivacy;
      } else if (uspData) {
        ccpa = uspData;
      }

      if (d.getElementById(iframeId)) {
        return;
      }

      var el;
      // check if exists
      el = d.getElementById(id);


      var src = 'https://pre.ads.justpremium.com/v/1.0/t/sync?';

      if (gdpr && gdprConsent) {
        src = src + '&consentString=' + encodeURIComponent(gdprConsent);
      }

      if (ccpa) {
        src = src + '&usPrivacy=' + encodeURIComponent(ccpa)
      }

      var iframe = d.createElement('iframe');
      iframe.id = iframeId;
      iframe.height = 0;
      iframe.width = 0;
      iframe.border = '0px';
      iframe.hspace = '0';
      iframe.vspace = '0px';
      iframe.frameBorder = '0';
      iframe.style.visibility = 'hidden';
      iframe.style.overflow = 'hidden';
      iframe.style.left = '-9999px';
      iframe.style.position = 'absolute';
      iframe.style.height = '0';
      iframe.style.width = '0';
      iframe.src = src;
      iframe.onload = function (e) {
        callback(e);
      };

      if (el) {
        el.appendChild(iframe);
      } else {
        b.appendChild(iframe);
      }
    }

    function onSyncFrameLoaded() {
      var jPAM = scope.jPAM = scope.jPAM || window.jPAM || {};
      jPAM.cmd = jPAM.cmd || [];

      jPAM.cmd.push(
        function () {
          try {
            var jPAM = scope.jPAM = scope.jPAM || window.jPAM || {};
            var adserver = jPAM.getPlugin('adserver');
            if (adserver) {
              adserver.notifyAboutSyncFrame();
            }
          } catch (e) {
            throw e;
          }

        }
      );

      if (jPAM.processCmd) {
        jPAM.processCmd();
      }

    }

    function isBodyReady() {
      return scope && scope.document && scope.document.body && scope.document.body.appendChild;
    }

    var objectToUrlParams = function (obj) {
      var str = "";
      for (var key in obj) {
        if (str != "") {
          str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
      }

      return str;
    };

    var getQueryParams = function (qs) {
      qs = qs.split('+').join(' ');

      var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

      while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
      }

      return params;
    };

    var shouldDelayTcf = function() {
      if(JP_CONFIG.delayTcf) {
        return true;
      }
      return false;
    }

    var getGGExtQueryParams = function () {
      var ggExt = '';
      var params = getQueryParams(scope.document.location.search) || {};
      if(params.hasOwnProperty("gg_eadbuyid")){
        ggExt += "&gg_eadbuyid=" + params.gg_eadbuyid;
      }
      if(params.hasOwnProperty("gg_adbuyid")){
        ggExt += "&gg_adbuyid=" + params.gg_adbuyid;
      }
      if(params.hasOwnProperty("gg_dealid")){
        ggExt += "&gg_dealid=" + params.gg_dealid;
      }
      return ggExt
    }


    var isPublisherTest = function () {
      var params = getQueryParams(scope.document.location.search) || {};
      if (params.hasOwnProperty("google_preview")) {
        if (params.google_preview.length > 10) {
          if (!params.hasOwnProperty("creativeId")) return false;
          if (!params.hasOwnProperty("lineItemId")) return false;
          return true;
        } else {
          return false;
        }
      } else {
        return false

      }
    };

    function pixelTracking(trackingObject) {

      trackingObject.ru = decodeURIComponent(trackingObject.ru);
      if (isPublisherTest()) {
        trackingObject.ist = 2;
      }
      var url = (JP_CONFIG.trackingUrl ? JP_CONFIG.trackingUrl + '?' : "//tracking.justpremium.com/tracking.gif?") + objectToUrlParams(trackingObject);
      var imgPixel = window.document.createElement("img");
      imgPixel.style.position = "fixed";
      imgPixel.style.left = "-9999px";
      imgPixel.style.top = "-9999px";
      imgPixel.style.width = "1px";
      imgPixel.style.height = "1px";
      imgPixel.src = url;

      if (isBodyReady()) {
        scope.document.body.appendChild(imgPixel);
      } else {
        scope.addEventListener('load', function () {
          window.document.body.appendChild(imgPixel);
        })
      }

    }


    var getReffererUrl = function () {
      return encodeURIComponent(scope.document.location.protocol + "//" + scope.document.location.host.replace(':8082', '') + "" + scope.document.location.pathname + ((typeof scope.document.location.search !== "undefined") ? scope.document.location.search : ""));
    };

    var JP_PARAMS = getTrackingData();
    window.jp_conf_debug = JP_PARAMS;

    if (cross) {
      var erObject = getTrackingData();
      erObject.ty = 'er';
      erObject.mg = 217;
      erObject.st = 'Blocked cross-origin frame';
      pixelTracking(erObject);

      return;
    }

    var loadScript = function (src, callback, async) {

      async = async || false;
      callback = callback || function () {
      };
      var script = document.createElement('script');
      if (async) {
        script.async = true;
      }

      if (src.substring(0, 2) == '//') {
        src = scope.document.location.protocol + src;
      }

      script.src = src;
      script.onload = function (e) {
        callback(e);
      };

      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script);
    };

    var downloadJpLib = function (callback) {
      callback = callback || function () {
      };

      var createIframe = function () {
        iframe = document.createElement('iframe');
        iframe.setAttribute('frameborder', 0);
        iframe.setAttribute('style', 'width:0; height:0; position: fixed; left:-9999px; top: -9999px;');
        iframe.setAttribute('id', 'jpx-isolated-scope');

        if (isBodyReady()) {
          scope.document.body.appendChild(iframe);
          writeIframe();
        } else {
          scope.addEventListener('load', function () {
            window.document.body.appendChild(iframe);
            writeIframe();
          });
        }
      };

      var oldJsVersion = function () {
        var isPromisse = typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1;

        var isWeakMap = typeof WeakMap !== "undefined" && WeakMap.toString().indexOf("[native code]") !== -1;

        return (!Array.prototype.find || !Array.prototype.sort || !Array.prototype.map || !Array.prototype.filter || !Array.prototype.keys || !isPromisse || !isWeakMap);
      };

      var jpxLib = JP_CONFIG.jpxLib;


      if (oldJsVersion()) {
        jpxLib = JP_CONFIG.jpxLibPolyfill;
      }

      if (jpxLib) {
        JP_SCRIPTS.unshift(jpxLib);
      }


      var writeIframe = function () {
        var win = iframe.contentWindow;
        var doc = iframe.contentDocument || win && win.document;
        var toLoad = '';

        win.$cJPX = createJAdManagerInstance;

        while (JP_SCRIPTS.length > 0) {

          toLoad += '<script src="' + JP_SCRIPTS.shift() + '"></script>';

        }

        toLoad += '<script>window.$cJPX();</script>';

        doc.open();
        doc.write('<html><head><style type="text/css">html,body{padding:0;margin:0;background-color:transparent;overflow:hidden;}</style></head><body>' + toLoad + '</body></html>');
        doc.close();

      };

      var onLoad = function () {
        if (callback) callback();
      };

      var loadResources = function () {
        if (JP_SCRIPTS.length > 0) {
          loadScript(JP_SCRIPTS.shift(), loadResources);
        } else {
          onLoad();
        }
      };

      var nativeBind = function () {

        return /\{\s+\[native code\]/.test(Function.prototype.toString.call(Function['bind']));

      };


      if (nativeBind()) {
        loadResources();
      } else {
        createIframe();
      }

    };

    var getConsentsString = function () {
      return JP_PARAMS.cs || '';
    }

    var jpGetPageParams = function () {
      var ccpa = '', screenshot = '', ggExt = '';
      if (JP_CONFIG.usPrivacy && JP_CONFIG.usPrivacy !== '${US_PRIVACY}') {
        ccpa = '&us_privacy=' + encodeURIComponent(JP_CONFIG.usPrivacy);
      } else if (uspData) {
        ccpa = '&us_privacy=' + encodeURIComponent(uspData);
      }

      if(JP_CONFIG.appName === "screenshot") {
        screenshot='&screenshot=1'
      }

      ggExt = getGGExtQueryParams();

      return (
        '&ru=' + encodeURIComponent(JP_PARAMS.ru) +
        '&sw=' + JP_PARAMS.sw +
        '&sh=' + JP_PARAMS.sh +
        '&ww=' + JP_PARAMS.ww +
        '&wh=' + JP_PARAMS.wh +
        '&ui=' + JP_CONFIG.uid +
        //masterid ?
        '&tt=' + new Date().getTime()
        + '&rid=' + JP_CONFIG.rid
        + (isPublisherTest() ? '&test=1' : '')
        + (JP_CONFIG.impTag ? '&impTag=' + encodeURIComponent(JP_CONFIG.impTag) : '')
        + '&eu=' + (JP_CONFIG.isEu ? '1' : '0')
        + '&cs=' + getConsentsString()
        + ccpa
        + screenshot
        + ggExt
      );
    };

    var requestZoneData = function (callback) {
      callback = callback || function () {
      };

      function requestSources() {
        return jpGetPageParams();
      }

      function onError(e) {
        if (callback) callback(e);
      }

      var url = JP_URL += requestSources();
      var req = new XMLHttpRequest();

      req.open('GET', url);
      req.withCredentials = true;
      req.onload = function () {
        if (req.status == 200) {

          if (callback) callback(req.responseText);

        } else {
          console.error(req.statusText);
        }
      };

      req.onerror = function (e) {
        console.error("Ads fetching error");
        console.error(e);
        var trObject = getTrackingData();
        trObject.ty = 'er';
        trObject.mg = 216;
        trObject.st = e.message;
        pixelTracking(trObject);
      };

      req.send();

    };


    var createJAdManagerInstance = function (callback) {
      try {
        callback = callback || function () {
        };

        var Jpx = iframe && iframe.contentWindow && iframe.contentWindow.Jpx || window.Jpx;

        window.jPAM = scope.jPAM = Jpx.JAM.instance({
          di: {
            window: scope
          },
          plugins: ['adserver']
        });

        callback();

      } catch (e) {


        var trObject = getTrackingData();
        trObject.ty = 'er';
        trObject.mg = 212;
        trObject.st = e.message;

        pixelTracking(trObject);
      }
    };

    var pushTaskToQueue = function (responseData, callback) {
      callback = callback || function () {
      };

      var jPAM = scope.jPAM = scope.jPAM || window.jPAM || {};
      jPAM.cmd = jPAM.cmd || [];

      jPAM.cmd.push(
        function () {
          try {
            var jPAM = scope.jPAM = scope.jPAM || window.jPAM || {};
            var adsData = JSON.parse(responseData);
            var adserver = jPAM.getPlugin('adserver');
            adserver.loadTag(adsData);
          } catch (e) {
            throw e;
          }

        }
      );

      if (jPAM.processCmd) {
        jPAM.processCmd();
      }

    };

    var jpStart = function () {

      jpLog('Running Justpremium', true)

      var settings = {
        cmp: {
          eu: JP_CONFIG.isEu,
          consentString: getConsentsString()
        }
      };

      var zoneId = JP_CONFIG.zoneId,
        inExcludedZones = excludedZones.indexOf(parseInt(zoneId)) > -1,
        inExcludedUrls = excludedUrls.find(function (url) {
          return scope.document.location.hostname.indexOf(url) > -1;
        });


      if (!inExcludedZones && !inExcludedUrls) {
        if (isBodyReady()) {
          prepareHiddenIframe(settings, onSyncFrameLoaded);
        } else {
          scope.addEventListener('load', function () {
            prepareHiddenIframe(settings, onSyncFrameLoaded);
          })
        }
      } else {
        onSyncFrameLoaded();
      }


      requestZoneData(function (result) {
        pushTaskToQueue(result);
      });
    }


    downloadJpLib(
      function () {
        createJAdManagerInstance()
      }
    );


    jpLog('is EU', JP_CONFIG.isEu)
    jpLog('Should delay TCF loading: ', shouldDelayTcf())


    if (JP_CONFIG.isEu) {
      var alreadyInGo = false;
      var delayTimeout = 2000;

      if(shouldDelayTcf()){
        delayTimeout = 3100;
      }

      var _checkCmpExist = setInterval(function () {
        jpLog('Checking TCF or CMP', true)
        if (typeof (scope['__tcfapi']) === 'function') {

          scope['__tcfapi']('getTCData', 2, function (tcData, success) {

            if(!shouldDelayTcf()){
              clearInterval(_checkCmpExist);
            }

            if (success && tcData.tcString !== "") {
              JP_PARAMS.cs = tcData.tcString || "";
            } else if(shouldDelayTcf()) {
              jpLog('.')
              return;
            }

            jpLog('TCF success', success)
            jpLog('TCF consent', tcData.tcString)

            clearInterval(_checkCmpExist);
            if (!alreadyInGo) {
              jpLog('TCF', 'ready')
              alreadyInGo = true;
              jpStart();
            }
          });
        } else if (typeof (scope['__cmp']) === 'function') {
          jpLog('CMP', 'detected')
          clearInterval(_checkCmpExist);
          scope['__cmp']('getConsentData', null, function () {
            var a = arguments[0] || {};
            a.consentData = a.consentData || "";
            JP_PARAMS.cs = a.consentData;
            if (!alreadyInGo) {
              alreadyInGo = true;
              jpStart();
            }
          });
        }
      }, 100);

      setTimeout(function () {
        if (!alreadyInGo) {
          jpLog('Timeout delay exited', Math.round(delayTimeout/1000) + 'sec')
          clearInterval(_checkCmpExist);
          alreadyInGo = true;
          jpStart();
        }
      }, delayTimeout);
    } else {
      jpStart();
    }

    pixelTracking(JP_PARAMS);

  } catch (e) {
    var trObject = getTrackingData();
    trObject.ty = 'er';
    trObject.mg = 208;
    trObject.st = e.message;
    pixelTracking(trObject);
  }

})();


/***/ })
/******/ ]);