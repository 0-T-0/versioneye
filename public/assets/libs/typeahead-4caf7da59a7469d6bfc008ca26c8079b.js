/*!
 * typeahead.js 0.9.3
 * https://github.com/twitter/typeahead
 * Copyright 2013 Twitter, Inc. and other contributors; Licensed MIT
 */
!function(e){var t="0.9.3",i={isMsie:function(){var e=/(msie) ([\w.]+)/i.exec(navigator.userAgent);return e?parseInt(e[2],10):!1},isBlankString:function(e){return!e||/^\s*$/.test(e)},escapeRegExChars:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isArray:e.isArray,isFunction:e.isFunction,isObject:e.isPlainObject,isUndefined:function(e){return"undefined"==typeof e},bind:e.proxy,bindAll:function(t){var i;for(var n in t)e.isFunction(i=t[n])&&(t[n]=e.proxy(i,t))},indexOf:function(e,t){for(var i=0;i<e.length;i++)if(e[i]===t)return i;return-1},each:e.each,map:e.map,filter:e.grep,every:function(t,i){var n=!0;return t?(e.each(t,function(e,a){return(n=i.call(null,a,e,t))?void 0:!1}),!!n):n},some:function(t,i){var n=!1;return t?(e.each(t,function(e,a){return(n=i.call(null,a,e,t))?!1:void 0}),!!n):n},mixin:e.extend,getUniqueId:function(){var e=0;return function(){return e++}}(),defer:function(e){setTimeout(e,0)},debounce:function(e,t,i){var n,a;return function(){var r,s,o=this,l=arguments;return r=function(){n=null,i||(a=e.apply(o,l))},s=i&&!n,clearTimeout(n),n=setTimeout(r,t),s&&(a=e.apply(o,l)),a}},throttle:function(e,t){var i,n,a,r,s,o;return s=0,o=function(){s=new Date,a=null,r=e.apply(i,n)},function(){var l=new Date,u=t-(l-s);return i=this,n=arguments,0>=u?(clearTimeout(a),a=null,s=l,r=e.apply(i,n)):a||(a=setTimeout(o,u)),r}},tokenizeQuery:function(t){return e.trim(t).toLowerCase().split(/[\s]+/)},tokenizeText:function(t){return e.trim(t).toLowerCase().split(/[\s\-_]+/)},getProtocol:function(){return location.protocol},noop:function(){}},n=function(){var e=/\s+/;return{on:function(t,i){var n;if(!i)return this;for(this._callbacks=this._callbacks||{},t=t.split(e);n=t.shift();)this._callbacks[n]=this._callbacks[n]||[],this._callbacks[n].push(i);return this},trigger:function(t,i){var n,a;if(!this._callbacks)return this;for(t=t.split(e);n=t.shift();)if(a=this._callbacks[n])for(var r=0;r<a.length;r+=1)a[r].call(this,{type:n,data:i});return this}}}(),a=function(){function t(t){t&&t.el||e.error("EventBus initialized without el"),this.$el=e(t.el)}var n="typeahead:";return i.mixin(t.prototype,{trigger:function(e){var t=[].slice.call(arguments,1);this.$el.trigger(n+e,t)}}),t}(),r=function(){function e(e){this.prefix=["__",e,"__"].join(""),this.ttlKey="__ttl__",this.keyMatcher=new RegExp("^"+this.prefix)}function t(){return(new Date).getTime()}function n(e){return JSON.stringify(i.isUndefined(e)?null:e)}function a(e){return JSON.parse(e)}var r,s;try{r=window.localStorage,r.setItem("~~~","!"),r.removeItem("~~~")}catch(o){r=null}return s=r&&window.JSON?{_prefix:function(e){return this.prefix+e},_ttlKey:function(e){return this._prefix(e)+this.ttlKey},get:function(e){return this.isExpired(e)&&this.remove(e),a(r.getItem(this._prefix(e)))},set:function(e,a,s){return i.isNumber(s)?r.setItem(this._ttlKey(e),n(t()+s)):r.removeItem(this._ttlKey(e)),r.setItem(this._prefix(e),n(a))},remove:function(e){return r.removeItem(this._ttlKey(e)),r.removeItem(this._prefix(e)),this},clear:function(){var e,t,i=[],n=r.length;for(e=0;n>e;e++)(t=r.key(e)).match(this.keyMatcher)&&i.push(t.replace(this.keyMatcher,""));for(e=i.length;e--;)this.remove(i[e]);return this},isExpired:function(e){var n=a(r.getItem(this._ttlKey(e)));return i.isNumber(n)&&t()>n?!0:!1}}:{get:i.noop,set:i.noop,remove:i.noop,clear:i.noop,isExpired:i.noop},i.mixin(e.prototype,s),e}(),s=function(){function e(e){i.bindAll(this),e=e||{},this.sizeLimit=e.sizeLimit||10,this.cache={},this.cachedKeysByAge=[]}return i.mixin(e.prototype,{get:function(e){return this.cache[e]},set:function(e,t){var i;this.cachedKeysByAge.length===this.sizeLimit&&(i=this.cachedKeysByAge.shift(),delete this.cache[i]),this.cache[e]=t,this.cachedKeysByAge.push(e)}}),e}(),o=function(){function t(e){i.bindAll(this),e=i.isString(e)?{url:e}:e,l=l||new s,o=i.isNumber(e.maxParallelRequests)?e.maxParallelRequests:o||6,this.url=e.url,this.wildcard=e.wildcard||"%QUERY",this.filter=e.filter,this.replace=e.replace,this.ajaxSettings={type:"get",cache:e.cache,timeout:e.timeout,dataType:e.dataType||"json",beforeSend:e.beforeSend},this._get=(/^throttle$/i.test(e.rateLimitFn)?i.throttle:i.debounce)(this._get,e.rateLimitWait||300)}function n(){u++}function a(){u--}function r(){return o>u}var o,l,u=0,c={};return i.mixin(t.prototype,{_get:function(e,t){function i(i){var a=n.filter?n.filter(i):i;t&&t(a),l.set(e,i)}var n=this;r()?this._sendRequest(e).done(i):this.onDeckRequestArgs=[].slice.call(arguments,0)},_sendRequest:function(t){function i(){a(),c[t]=null,r.onDeckRequestArgs&&(r._get.apply(r,r.onDeckRequestArgs),r.onDeckRequestArgs=null)}var r=this,s=c[t];return s||(n(),s=c[t]=e.ajax(t,this.ajaxSettings).always(i)),s},get:function(e,t){var n,a,r=this,s=encodeURIComponent(e||"");return t=t||i.noop,n=this.replace?this.replace(this.url,s):this.url.replace(this.wildcard,s),(a=l.get(n))?i.defer(function(){t(r.filter?r.filter(a):a)}):this._get(n,t),!!a}}),t}(),l=function(){function n(t){i.bindAll(this),i.isString(t.template)&&!t.engine&&e.error("no template engine specified"),t.local||t.prefetch||t.remote||e.error("one of local, prefetch, or remote is required"),this.name=t.name||i.getUniqueId(),this.limit=t.limit||5,this.minLength=t.minLength||1,this.header=t.header,this.footer=t.footer,this.valueKey=t.valueKey||"value",this.template=a(t.template,t.engine,this.valueKey),this.local=t.local,this.prefetch=t.prefetch,this.remote=t.remote,this.itemHash={},this.adjacencyList={},this.storage=t.name?new r(t.name):null,this.allowDuplicates=t.allowDuplicates||!0}function a(e,t,n){var a,r;return i.isFunction(e)?a=e:i.isString(e)?(r=t.compile(e),a=i.bind(r.render,r)):a=function(e){return"<p>"+e[n]+"</p>"},a}var s={thumbprint:"thumbprint",protocol:"protocol",itemHash:"itemHash",adjacencyList:"adjacencyList"};return i.mixin(n.prototype,{_processLocalData:function(e){this._mergeProcessedData(this._processData(e))},_loadPrefetchData:function(n){function a(e){var t=n.filter?n.filter(e):e,a=f._processData(t),r=a.itemHash,o=a.adjacencyList;f.storage&&(f.storage.set(s.itemHash,r,n.ttl),f.storage.set(s.adjacencyList,o,n.ttl),f.storage.set(s.thumbprint,d,n.ttl),f.storage.set(s.protocol,i.getProtocol(),n.ttl)),f._mergeProcessedData(a)}var r,o,l,u,c,h,f=this,d=t+(n.thumbprint||"");return this.storage&&(r=this.storage.get(s.thumbprint),o=this.storage.get(s.protocol),l=this.storage.get(s.itemHash),u=this.storage.get(s.adjacencyList)),c=r!==d||o!==i.getProtocol(),n=i.isString(n)?{url:n}:n,n.ttl=i.isNumber(n.ttl)?n.ttl:864e5,l&&u&&!c?(this._mergeProcessedData({itemHash:l,adjacencyList:u}),h=e.Deferred().resolve()):h=e.getJSON(n.url).done(a),h},_transformDatum:function(e){var t=i.isString(e)?e:e[this.valueKey],n=e.tokens||i.tokenizeText(t),a={value:t,tokens:n};return i.isString(e)?(a.datum={},a.datum[this.valueKey]=e):a.datum=e,a.tokens=i.filter(a.tokens,function(e){return!i.isBlankString(e)}),a.tokens=i.map(a.tokens,function(e){return e.toLowerCase()}),a},_processData:function(e){var t=this,n={},a={};return i.each(e,function(e,r){var s=t._transformDatum(r),o=i.getUniqueId(s.value);n[o]=s,i.each(s.tokens,function(e,t){var n=t.charAt(0),r=a[n]||(a[n]=[o]);!~i.indexOf(r,o)&&r.push(o)})}),{itemHash:n,adjacencyList:a}},_mergeProcessedData:function(e){var t=this;i.mixin(this.itemHash,e.itemHash),i.each(e.adjacencyList,function(e,i){var n=t.adjacencyList[e];t.adjacencyList[e]=n?n.concat(i):i})},_getLocalSuggestions:function(e){var t,n=this,a=[],r=[],s=[];return i.each(e,function(e,t){var n=t.charAt(0);!~i.indexOf(a,n)&&a.push(n)}),i.each(a,function(e,i){var a=n.adjacencyList[i];return a?(r.push(a),(!t||a.length<t.length)&&(t=a),void 0):!1}),r.length<a.length?[]:(i.each(t,function(t,a){var o,l,u=n.itemHash[a];o=i.every(r,function(e){return~i.indexOf(e,a)}),l=o&&i.every(e,function(e){return i.some(u.tokens,function(t){return 0===t.indexOf(e)})}),l&&s.push(u)}),s)},initialize:function(){var t;return this.local&&this._processLocalData(this.local),this.transport=this.remote?new o(this.remote):null,t=this.prefetch?this._loadPrefetchData(this.prefetch):e.Deferred().resolve(),this.local=this.prefetch=this.remote=null,this.initialize=function(){return t},t},getSuggestions:function(e,t){function n(e){r=r.slice(0),i.each(e,function(e,t){var n,a=s._transformDatum(t);return n=s.allowDuplicates?!1:i.some(r,function(e){return a.value===e.value}),!n&&r.push(a),r.length<s.limit}),t&&t(r)}var a,r,s=this,o=!1;e.length<this.minLength||(a=i.tokenizeQuery(e),r=this._getLocalSuggestions(a).slice(0,this.limit),r.length<this.limit&&this.transport&&(o=this.transport.get(e,n)),!o&&t&&t(r))}}),n}(),u=function(){function t(t){var n=this;i.bindAll(this),this.specialKeyCodeMap={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"},this.$hint=e(t.hint),this.$input=e(t.input).on("blur.tt",this._handleBlur).on("focus.tt",this._handleFocus).on("keydown.tt",this._handleSpecialKeyEvent),i.isMsie()?this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function(e){n.specialKeyCodeMap[e.which||e.keyCode]||i.defer(n._compareQueryToInputValue)}):this.$input.on("input.tt",this._compareQueryToInputValue),this.query=this.$input.val(),this.$overflowHelper=a(this.$input)}function a(t){return e("<span></span>").css({position:"absolute",left:"-9999px",visibility:"hidden",whiteSpace:"nowrap",fontFamily:t.css("font-family"),fontSize:t.css("font-size"),fontStyle:t.css("font-style"),fontVariant:t.css("font-variant"),fontWeight:t.css("font-weight"),wordSpacing:t.css("word-spacing"),letterSpacing:t.css("letter-spacing"),textIndent:t.css("text-indent"),textRendering:t.css("text-rendering"),textTransform:t.css("text-transform")}).insertAfter(t)}function r(e,t){return e=(e||"").replace(/^\s*/g,"").replace(/\s{2,}/g," "),t=(t||"").replace(/^\s*/g,"").replace(/\s{2,}/g," "),e===t}return i.mixin(t.prototype,n,{_handleFocus:function(){this.trigger("focused")},_handleBlur:function(){this.trigger("blured")},_handleSpecialKeyEvent:function(e){var t=this.specialKeyCodeMap[e.which||e.keyCode];t&&this.trigger(t+"Keyed",e)},_compareQueryToInputValue:function(){var e=this.getInputValue(),t=r(this.query,e),i=t?this.query.length!==e.length:!1;i?this.trigger("whitespaceChanged",{value:this.query}):t||this.trigger("queryChanged",{value:this.query=e})},destroy:function(){this.$hint.off(".tt"),this.$input.off(".tt"),this.$hint=this.$input=this.$overflowHelper=null},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getQuery:function(){return this.query},setQuery:function(e){this.query=e},getInputValue:function(){return this.$input.val()},setInputValue:function(e,t){this.$input.val(e),!t&&this._compareQueryToInputValue()},getHintValue:function(){return this.$hint.val()},setHintValue:function(e){this.$hint.val(e)},getLanguageDirection:function(){return(this.$input.css("direction")||"ltr").toLowerCase()},isOverflow:function(){return this.$overflowHelper.text(this.getInputValue()),this.$overflowHelper.width()>this.$input.width()},isCursorAtEnd:function(){var e,t=this.$input.val().length,n=this.$input[0].selectionStart;return i.isNumber(n)?n===t:document.selection?(e=document.selection.createRange(),e.moveStart("character",-t),t===e.text.length):!0}}),t}(),c=function(){function t(t){i.bindAll(this),this.isOpen=!1,this.isEmpty=!0,this.isMouseOverDropdown=!1,this.$menu=e(t.menu).on("mouseenter.tt",this._handleMouseenter).on("mouseleave.tt",this._handleMouseleave).on("click.tt",".tt-suggestion",this._handleSelection).on("mouseover.tt",".tt-suggestion",this._handleMouseover)}function a(e){return e.data("suggestion")}var r={suggestionsList:'<span class="tt-suggestions"></span>'},s={suggestionsList:{display:"block"},suggestion:{whiteSpace:"nowrap",cursor:"pointer"},suggestionChild:{whiteSpace:"normal"}};return i.mixin(t.prototype,n,{_handleMouseenter:function(){this.isMouseOverDropdown=!0},_handleMouseleave:function(){this.isMouseOverDropdown=!1},_handleMouseover:function(t){var i=e(t.currentTarget);this._getSuggestions().removeClass("tt-is-under-cursor"),i.addClass("tt-is-under-cursor")},_handleSelection:function(t){var i=e(t.currentTarget);this.trigger("suggestionSelected",a(i))},_show:function(){this.$menu.css("display","block")},_hide:function(){this.$menu.hide()},_moveCursor:function(e){var t,i,n,r;if(this.isVisible()){if(t=this._getSuggestions(),i=t.filter(".tt-is-under-cursor"),i.removeClass("tt-is-under-cursor"),n=t.index(i)+e,n=(n+1)%(t.length+1)-1,-1===n)return this.trigger("cursorRemoved"),void 0;-1>n&&(n=t.length-1),r=t.eq(n).addClass("tt-is-under-cursor"),this._ensureVisibility(r),this.trigger("cursorMoved",a(r))}},_getSuggestions:function(){return this.$menu.find(".tt-suggestions > .tt-suggestion")},_ensureVisibility:function(e){var t=this.$menu.height()+parseInt(this.$menu.css("paddingTop"),10)+parseInt(this.$menu.css("paddingBottom"),10),i=this.$menu.scrollTop(),n=e.position().top,a=n+e.outerHeight(!0);0>n?this.$menu.scrollTop(i+n):a>t&&this.$menu.scrollTop(i+(a-t))},destroy:function(){this.$menu.off(".tt"),this.$menu=null},isVisible:function(){return this.isOpen&&!this.isEmpty},closeUnlessMouseIsOverDropdown:function(){this.isMouseOverDropdown||this.close()},close:function(){this.isOpen&&(this.isOpen=!1,this.isMouseOverDropdown=!1,this._hide(),this.$menu.find(".tt-suggestions > .tt-suggestion").removeClass("tt-is-under-cursor"),this.trigger("closed"))},open:function(){this.isOpen||(this.isOpen=!0,!this.isEmpty&&this._show(),this.trigger("opened"))},setLanguageDirection:function(e){var t={left:"0",right:"auto"},i={left:"auto",right:" 0"};"ltr"===e?this.$menu.css(t):this.$menu.css(i)},moveCursorUp:function(){this._moveCursor(-1)},moveCursorDown:function(){this._moveCursor(1)},getSuggestionUnderCursor:function(){var e=this._getSuggestions().filter(".tt-is-under-cursor").first();return e.length>0?a(e):null},getFirstSuggestion:function(){var e=this._getSuggestions().first();return e.length>0?a(e):null},renderSuggestions:function(t,n){var a,o,l,u,c,h="tt-dataset-"+t.name,f='<div class="tt-suggestion">%body</div>',d=this.$menu.find("."+h);0===d.length&&(o=e(r.suggestionsList).css(s.suggestionsList),d=e("<div></div>").addClass(h).append(t.header).append(o).append(t.footer).appendTo(this.$menu)),n.length>0?(this.isEmpty=!1,this.isOpen&&this._show(),l=document.createElement("div"),u=document.createDocumentFragment(),i.each(n,function(i,n){n.dataset=t.name,a=t.template(n.datum),l.innerHTML=f.replace("%body",a),c=e(l.firstChild).css(s.suggestion).data("suggestion",n),c.children().each(function(){e(this).css(s.suggestionChild)}),u.appendChild(c[0])}),d.show().find(".tt-suggestions").html(u)):this.clearSuggestions(t.name),this.trigger("suggestionsRendered")},clearSuggestions:function(e){var t=e?this.$menu.find(".tt-dataset-"+e):this.$menu.find('[class^="tt-dataset-"]'),i=t.find(".tt-suggestions");t.hide(),i.empty(),0===this._getSuggestions().length&&(this.isEmpty=!0,this._hide())}}),t}(),h=function(){function t(e){var t,n,r;i.bindAll(this),this.$node=a(e.input),this.datasets=e.datasets,this.dir=null,this.eventBus=e.eventBus,t=this.$node.find(".tt-dropdown-menu"),n=this.$node.find(".tt-query"),r=this.$node.find(".tt-hint"),this.dropdownView=new c({menu:t}).on("suggestionSelected",this._handleSelection).on("cursorMoved",this._clearHint).on("cursorMoved",this._setInputValueToSuggestionUnderCursor).on("cursorRemoved",this._setInputValueToQuery).on("cursorRemoved",this._updateHint).on("suggestionsRendered",this._updateHint).on("opened",this._updateHint).on("closed",this._clearHint).on("opened closed",this._propagateEvent),this.inputView=new u({input:n,hint:r}).on("focused",this._openDropdown).on("blured",this._closeDropdown).on("blured",this._setInputValueToQuery).on("enterKeyed tabKeyed",this._handleSelection).on("queryChanged",this._clearHint).on("queryChanged",this._clearSuggestions).on("queryChanged",this._getSuggestions).on("whitespaceChanged",this._updateHint).on("queryChanged whitespaceChanged",this._openDropdown).on("queryChanged whitespaceChanged",this._setLanguageDirection).on("escKeyed",this._closeDropdown).on("escKeyed",this._setInputValueToQuery).on("tabKeyed upKeyed downKeyed",this._managePreventDefault).on("upKeyed downKeyed",this._moveDropdownCursor).on("upKeyed downKeyed",this._openDropdown).on("tabKeyed leftKeyed rightKeyed",this._autocomplete)}function a(t){var i=e(s.wrapper),n=e(s.dropdown),a=e(t),r=e(s.hint);i=i.css(o.wrapper),n=n.css(o.dropdown),r.css(o.hint).css({backgroundAttachment:a.css("background-attachment"),backgroundClip:a.css("background-clip"),backgroundColor:a.css("background-color"),backgroundImage:a.css("background-image"),backgroundOrigin:a.css("background-origin"),backgroundPosition:a.css("background-position"),backgroundRepeat:a.css("background-repeat"),backgroundSize:a.css("background-size")}),a.data("ttAttrs",{dir:a.attr("dir"),autocomplete:a.attr("autocomplete"),spellcheck:a.attr("spellcheck"),style:a.attr("style")}),a.addClass("tt-query").attr({autocomplete:"off",spellcheck:!1}).css(o.query);try{!a.attr("dir")&&a.attr("dir","auto")}catch(l){}return a.wrap(i).parent().prepend(r).append(n)}function r(e){var t=e.find(".tt-query");i.each(t.data("ttAttrs"),function(e,n){i.isUndefined(n)?t.removeAttr(e):t.attr(e,n)}),t.detach().removeData("ttAttrs").removeClass("tt-query").insertAfter(e),e.remove()}var s={wrapper:'<span class="twitter-typeahead"></span>',hint:'<input class="tt-hint" type="text" autocomplete="off" spellcheck="off" disabled>',dropdown:'<span class="tt-dropdown-menu"></span>'},o={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none"},query:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},dropdown:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"}};return i.isMsie()&&i.mixin(o.query,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}),i.isMsie()&&i.isMsie()<=7&&(i.mixin(o.wrapper,{display:"inline",zoom:"1"}),i.mixin(o.query,{marginTop:"-1px"})),i.mixin(t.prototype,n,{_managePreventDefault:function(e){var t,i,n=e.data,a=!1;switch(e.type){case"tabKeyed":t=this.inputView.getHintValue(),i=this.inputView.getInputValue(),a=t&&t!==i;break;case"upKeyed":case"downKeyed":a=!n.shiftKey&&!n.ctrlKey&&!n.metaKey}a&&n.preventDefault()},_setLanguageDirection:function(){var e=this.inputView.getLanguageDirection();e!==this.dir&&(this.dir=e,this.$node.css("direction",e),this.dropdownView.setLanguageDirection(e))},_updateHint:function(){var e,t,n,a,r,s=this.dropdownView.getFirstSuggestion(),o=s?s.value:null,l=this.dropdownView.isVisible(),u=this.inputView.isOverflow();o&&l&&!u&&(e=this.inputView.getInputValue(),t=e.replace(/\s{2,}/g," ").replace(/^\s+/g,""),n=i.escapeRegExChars(t),a=new RegExp("^(?:"+n+")(.*$)","i"),r=a.exec(o),this.inputView.setHintValue(e+(r?r[1]:"")))},_clearHint:function(){this.inputView.setHintValue("")},_clearSuggestions:function(){this.dropdownView.clearSuggestions()},_setInputValueToQuery:function(){this.inputView.setInputValue(this.inputView.getQuery())},_setInputValueToSuggestionUnderCursor:function(e){var t=e.data;this.inputView.setInputValue(t.value,!0)},_openDropdown:function(){this.dropdownView.open()},_closeDropdown:function(e){this.dropdownView["blured"===e.type?"closeUnlessMouseIsOverDropdown":"close"]()},_moveDropdownCursor:function(e){var t=e.data;t.shiftKey||t.ctrlKey||t.metaKey||this.dropdownView["upKeyed"===e.type?"moveCursorUp":"moveCursorDown"]()},_handleSelection:function(e){var t="suggestionSelected"===e.type,n=t?e.data:this.dropdownView.getSuggestionUnderCursor();n&&(this.inputView.setInputValue(n.value),t?this.inputView.focus():e.data.preventDefault(),t&&i.isMsie()?i.defer(this.dropdownView.close):this.dropdownView.close(),this.eventBus.trigger("selected",n.datum,n.dataset))},_getSuggestions:function(){var e=this,t=this.inputView.getQuery();i.isBlankString(t)||i.each(this.datasets,function(i,n){n.getSuggestions(t,function(i){t===e.inputView.getQuery()&&e.dropdownView.renderSuggestions(n,i)})})},_autocomplete:function(e){var t,i,n,a,r;("rightKeyed"!==e.type&&"leftKeyed"!==e.type||(t=this.inputView.isCursorAtEnd(),i="ltr"===this.inputView.getLanguageDirection()?"leftKeyed"===e.type:"rightKeyed"===e.type,t&&!i))&&(n=this.inputView.getQuery(),a=this.inputView.getHintValue(),""!==a&&n!==a&&(r=this.dropdownView.getFirstSuggestion(),this.inputView.setInputValue(r.value),this.eventBus.trigger("autocompleted",r.datum,r.dataset)))},_propagateEvent:function(e){this.eventBus.trigger(e.type)},destroy:function(){this.inputView.destroy(),this.dropdownView.destroy(),r(this.$node),this.$node=null},setQuery:function(e){this.inputView.setQuery(e),this.inputView.setInputValue(e),this._clearHint(),this._clearSuggestions(),this._getSuggestions()}}),t}();!function(){var t,n={},r="ttView";t={initialize:function(t){function s(){var t,n=e(this),s=new a({el:n});t=i.map(o,function(e){return e.initialize()}),n.data(r,new h({input:n,eventBus:s=new a({el:n}),datasets:o})),e.when.apply(e,t).always(function(){i.defer(function(){s.trigger("initialized")})})}var o;return t=i.isArray(t)?t:[t],0===t.length&&e.error("no datasets provided"),o=i.map(t,function(e){var t=n[e.name]?n[e.name]:new l(e);return e.name&&(n[e.name]=t),t}),this.each(s)},destroy:function(){function t(){var t=e(this),i=t.data(r);i&&(i.destroy(),t.removeData(r))}return this.each(t)},setQuery:function(t){function i(){var i=e(this).data(r);i&&i.setQuery(t)}return this.each(i)}},jQuery.fn.typeahead=function(e){return t[e]?t[e].apply(this,[].slice.call(arguments,1)):t.initialize.apply(this,arguments)}}()}(window.jQuery);