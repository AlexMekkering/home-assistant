"use strict";function deleteAllCaches(){return caches.keys().then(function(e){return Promise.all(e.map(function(e){return caches.delete(e)}))})}var PrecacheConfig=[["/","c18e36573c1ffbf60f9539dcf140b1fc"],["/frontend/panels/dev-event-8f63a091246408228beebf276440c06e.html","8ff5aa2fc6949514399ddbfad500b8f1"],["/frontend/panels/dev-info-34e2df1af32e60fffcafe7e008a92169.html","7e939dc762dc0c0ec769db4ea76a4b09"],["/frontend/panels/dev-service-e24baccaed866b590f2a368dbda7e64b.html","48e5b1b46dca078f9d7dd14fe826822d"],["/frontend/panels/dev-state-be5221066c45aac6bf63f7871ebd0c20.html","26b71224269795796dd94af91c36fe19"],["/frontend/panels/dev-template-38373e06171b269a48bb8e2b09bfb565.html","21e9cc2a7155cea74c7240b928960bc5"],["/frontend/panels/map-39d4793bb67cedbbdbd1d79bdadc9c3f.html","67fde0ba390387969c2a603e52007aea"],["/static/core-fb9a1af0cf7d39f3041d3fa67e16e81c.js","76f71646ea7ddbb977fa5b5219f15e85"],["/static/frontend-fb24d923539bd6cf82a96b0a93b33aec.html","31c8fe27c776278a9762209c3eeded1e"],["/static/mdi-f6c6cc64c2ec38a80e91f801b41119b3.html","e010f32322ed6f66916c7c09dbba4acd"],["static/fonts/roboto/Roboto-Bold.ttf","d329cc8b34667f114a95422aaad1b063"],["static/fonts/roboto/Roboto-Light.ttf","7b5fb88f12bec8143f00e21bc3222124"],["static/fonts/roboto/Roboto-Medium.ttf","fe13e4170719c2fc586501e777bde143"],["static/fonts/roboto/Roboto-Regular.ttf","ac3f799d5bbaf5196fab15ab8de8431c"],["static/icons/favicon-192x192.png","419903b8422586a7e28021bbe9011175"],["static/icons/favicon.ico","04235bda7843ec2fceb1cbe2bc696cf4"],["static/images/card_media_player_bg.png","a34281d1c1835d338a642e90930e61aa"],["static/webcomponents-lite.min.js","b0f32ad3c7749c40d486603f31c9d8b1"]],CacheNamePrefix="sw-precache-v1--"+(self.registration?self.registration.scope:"")+"-",IgnoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},getCacheBustedUrl=function(e,t){t=t||Date.now();var a=new URL(e);return a.search+=(a.search?"&":"")+"sw-precache="+t,a.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},populateCurrentCacheNames=function(e,t,a){var n={},c={};return e.forEach(function(e){var r=new URL(e[0],a).toString(),o=t+r+"-"+e[1];c[o]=r,n[r]=o}),{absoluteUrlToCacheName:n,currentCacheNamesToAbsoluteUrl:c}},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},mappings=populateCurrentCacheNames(PrecacheConfig,CacheNamePrefix,self.location),AbsoluteUrlToCacheName=mappings.absoluteUrlToCacheName,CurrentCacheNamesToAbsoluteUrl=mappings.currentCacheNamesToAbsoluteUrl;self.addEventListener("install",function(e){e.waitUntil(Promise.all(Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function(e){return caches.open(e).then(function(t){return t.keys().then(function(a){if(0===a.length){var n=e.split("-").pop(),c=getCacheBustedUrl(CurrentCacheNamesToAbsoluteUrl[e],n),r=new Request(c,{credentials:"same-origin"});return fetch(r).then(function(a){return a.ok?t.put(CurrentCacheNamesToAbsoluteUrl[e],a):(console.error("Request for %s returned a response status %d, so not attempting to cache it.",c,a.status),caches.delete(e))})}})})})).then(function(){return caches.keys().then(function(e){return Promise.all(e.filter(function(e){return 0===e.indexOf(CacheNamePrefix)&&!(e in CurrentCacheNamesToAbsoluteUrl)}).map(function(e){return caches.delete(e)}))})}).then(function(){"function"==typeof self.skipWaiting&&self.skipWaiting()}))}),self.clients&&"function"==typeof self.clients.claim&&self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim())}),self.addEventListener("message",function(e){"delete_all"===e.data.command&&(console.log("About to delete all caches..."),deleteAllCaches().then(function(){console.log("Caches deleted."),e.ports[0].postMessage({error:null})}).catch(function(t){console.log("Caches not deleted:",t),e.ports[0].postMessage({error:t})}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t=stripIgnoredUrlParameters(e.request.url,IgnoreUrlParametersMatching),a=AbsoluteUrlToCacheName[t],n="index.html";!a&&n&&(t=addDirectoryIndex(t,n),a=AbsoluteUrlToCacheName[t]);var c="/";if(!a&&c&&e.request.headers.has("accept")&&e.request.headers.get("accept").includes("text/html")&&isPathWhitelisted(["^((?!(static|api|local|service_worker.js)).)*$"],e.request.url)){var r=new URL(c,self.location);a=AbsoluteUrlToCacheName[r.toString()]}a&&e.respondWith(caches.open(a).then(function(e){return e.keys().then(function(t){return e.match(t[0]).then(function(e){if(e)return e;throw Error("The cache "+a+" is empty.")})})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});