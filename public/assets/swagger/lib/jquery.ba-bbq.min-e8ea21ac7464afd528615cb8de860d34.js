/*
 * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
!function(e,t){function n(e){return"string"==typeof e}function i(e){var t=v.call(arguments,1);return function(){return e.apply(this,t.concat(v.call(arguments)))}}function r(e){return e.replace(/^[^#]*#?(.*)$/,"$1")}function a(e){return e.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function s(i,r,a,s,o){var l,c,f,d,p;return s!==u?(f=a.match(i?/^([^#]*)\#?(.*)$/:/^([^#?]*)\??([^#]*)(#?.*)/),p=f[3]||"",2===o&&n(s)?c=s.replace(i?A:j,""):(d=h(f[2]),s=n(s)?h[i?C:k](s):s,c=2===o?s:1===o?e.extend({},s,d):e.extend({},d,s),c=y(c),i&&(c=c.replace(g,b))),l=f[1]+(i?"#":c||!f[1]?"?":"")+c+p):l=r(a!==u?a:t[E][M]),l}function o(e,t,i){return t===u||"boolean"==typeof t?(i=t,t=y[e?C:k]()):t=n(t)?t.replace(e?A:j,""):t,h(t,i)}function l(t,i,r,a){return n(r)||"object"==typeof r||(a=r,r=i,i=u),this.each(function(){var n=e(this),s=i||m()[(this.nodeName||"").toLowerCase()]||"",o=s&&n.attr(s)||"";n.attr(s,y[t](o,r,a))})}var u,c,h,f,d,p,m,g,v=Array.prototype.slice,b=decodeURIComponent,y=e.param,w=e.bbq=e.bbq||{},_=e.event.special,x="hashchange",k="querystring",C="fragment",S="elemUrlAttr",E="location",M="href",T="src",j=/^.*\?|#.*$/g,A=/^.*\#/,D={};y[k]=i(s,0,a),y[C]=c=i(s,1,r),c.noEscape=function(t){t=t||"";var n=e.map(t.split(""),encodeURIComponent);g=new RegExp(n.join("|"),"g")},c.noEscape(",/"),e.deparam=h=function(t,n){var i={},r={"true":!0,"false":!1,"null":null};return e.each(t.replace(/\+/g," ").split("&"),function(t,a){var s,o=a.split("="),l=b(o[0]),c=i,h=0,f=l.split("]["),d=f.length-1;if(/\[/.test(f[0])&&/\]$/.test(f[d])?(f[d]=f[d].replace(/\]$/,""),f=f.shift().split("[").concat(f),d=f.length-1):d=0,2===o.length)if(s=b(o[1]),n&&(s=s&&!isNaN(s)?+s:"undefined"===s?u:r[s]!==u?r[s]:s),d)for(;d>=h;h++)l=""===f[h]?c.length:f[h],c=c[l]=d>h?c[l]||(f[h+1]&&isNaN(f[h+1])?{}:[]):s;else e.isArray(i[l])?i[l].push(s):i[l]=i[l]!==u?[i[l],s]:s;else l&&(i[l]=n?u:"")}),i},h[k]=i(o,0),h[C]=f=i(o,1),e[S]||(e[S]=function(t){return e.extend(D,t)})({a:M,base:M,iframe:T,img:T,input:T,form:"action",link:M,script:T}),m=e[S],e.fn[k]=i(l,k),e.fn[C]=i(l,C),w.pushState=d=function(e,i){n(e)&&/^#/.test(e)&&i===u&&(i=2);var r=e!==u,a=c(t[E][M],r?e:{},r?i:2);t[E][M]=a+(/#/.test(a)?"":"#")},w.getState=p=function(e,t){return e===u||"boolean"==typeof e?f(e):f(t)[e]},w.removeState=function(t){var n={};t!==u&&(n=p(),e.each(e.isArray(t)?t:arguments,function(e,t){delete n[t]})),d(n,2)},_[x]=e.extend(_[x],{add:function(t){function n(e){var t=e[C]=c();e.getState=function(e,n){return e===u||"boolean"==typeof e?h(t,e):h(t,n)[e]},i.apply(this,arguments)}var i;return e.isFunction(t)?(i=t,n):(i=t.handler,t.handler=n,void 0)}})}(jQuery,this),/*
 * jQuery hashchange event - v1.2 - 2/11/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
function(e,t,n){function i(e){return e=e||t[s][l],e.replace(/^[^#]*#?(.*)$/,"$1")}var r,a=e.event.special,s="location",o="hashchange",l="href",u=e.browser,c=document.documentMode,h=u.msie&&(c===n||8>c),f="on"+o in t&&!h;e[o+"Delay"]=100,a[o]=e.extend(a[o],{setup:function(){return f?!1:(e(r.start),void 0)},teardown:function(){return f?!1:(e(r.stop),void 0)}}),r=function(){function n(){u=c=function(e){return e},h&&(a=e('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow,c=function(){return i(a.document[s][l])},(u=function(e,t){if(e!==t){var n=a.document;n.open().close(),n[s].hash="#"+e}})(i()))}var r,a,u,c,f={};return f.start=function(){if(!r){var a=i();u||n(),function h(){var n=i(),f=c(a);n!==a?(u(a=n,f),e(t).trigger(o)):f!==a&&(t[s][l]=t[s][l].replace(/#.*/,"")+"#"+f),r=setTimeout(h,e[o+"Delay"])}()}},f.stop=function(){a||(r&&clearTimeout(r),r=0)},f}()}(jQuery,this);