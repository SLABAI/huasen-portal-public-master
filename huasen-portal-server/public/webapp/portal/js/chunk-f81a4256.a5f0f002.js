(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f81a4256"],{"335e":function(t,e,r){"use strict";r("fb5b")},"90c2":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"h-record"},[r("header",[t._m(0),r("ul",[r("li",{class:{active:t.isEditMode},on:{click:function(){return t.isEditMode=!t.isEditMode}}},[r("i",{staticClass:"iconfont icon-md-settings"}),r("span",{staticClass:"sm:hidden"},[t._v("编辑")])]),r("li",{class:{active:t.isDeleteMode},on:{click:function(){return t.isDeleteMode=!t.isDeleteMode}}},[r("i",{staticClass:"iconfont icon-md-trash"}),r("span",{staticClass:"sm:hidden"},[t._v("管理")])]),r("li",{on:{click:t.backupRecordToCilpBroad}},[r("i",{staticClass:"iconfont icon-md-cut"}),r("span",{staticClass:"sm:hidden"},[t._v("拷贝")])]),r("li",{on:{click:function(e){return t.openSitePanel(!0)}}},[r("i",{staticClass:"iconfont icon-tianjia"}),r("span",{staticClass:"sm:hidden"},[t._v("添加")])]),r("li",{on:{click:t.recoveryFromCilpBroad}},[r("i",{staticClass:"iconfont icon-md-sync"}),r("span",{staticClass:"sm:hidden"},[t._v("恢复")])])])]),r("main",[r("ul",{directives:[{name:"balance",rawName:"v-balance"}]},t._l(this.$store.state.userInfo.record,(function(e,n){return r("li",{key:n,staticClass:"record-item"},[t.isEditMode?r("a",{staticClass:"pointer",class:{editActive:t.isEditMode},on:{click:function(r){return t.openSitePanel(!1,e,n)}}},[t._v(" 点击编辑 ")]):r("a",{class:{deleteActive:t.isDeleteMode},attrs:{href:e.url,target:"_blank"}},[t._v(" "+t._s(e.name)+" ")]),t.isDeleteMode?r("i",{staticClass:"iconfont icon-md-close-circle",on:{click:function(e){return t.deleteRecordItem(n)}}}):t._e()])})),0)]),r("HsPopup",{attrs:{isShow:t.isShowPopup,title:t.isAddMode?"添加站点":"编辑站点"},on:{"update:isShow":function(e){t.isShowPopup=e},"update:is-show":function(e){t.isShowPopup=e},close:t.closePopup}},[r("el-form",{ref:"siteForm",staticClass:"site-popup",attrs:{model:t.siteForm,"status-icon":"",rules:t.rules,statusIcon:!1}},[r("el-form-item",{attrs:{label:"站点名称",prop:"name"}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:t.siteForm.name,callback:function(e){t.$set(t.siteForm,"name",e)},expression:"siteForm.name"}})],1),r("el-form-item",{attrs:{label:"站点链接",prop:"url"}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:t.siteForm.url,callback:function(e){t.$set(t.siteForm,"url",e)},expression:"siteForm.url"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.submitSite}},[t._v(" "+t._s(t.isAddMode?"完成添加":"完成编辑")+" ")])],1)],1)],1)],1)},o=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"title"},[t._v(" 自定义网站 "),r("i",{staticClass:"iconfont icon-md-attach"})])}],i=r("53ca");r("d3b7");function a(t,e,r,n,o,i,a){try{var s=t[i](a),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(n,o)}function s(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function s(t){a(i,n,o,s,c,"next",t)}function c(t){a(i,n,o,s,c,"throw",t)}s(void 0)}))}}var c=r("5530"),u=(r("96cf"),r("d81d"),r("b0c0"),r("a434"),r("dc92")),l=r("c22e"),h={name:"RecordBar",components:{HsPopup:l["a"]},data:function(){var t=function(t,e,r){var n=new u["a"];n.add(e,[{strategy:"isNoEmpty",errMsg:"网站名称不能为空"},{strategy:"isChinese",errMsg:"请输入字母汉字数字"}]);var o=n.start();o&&r(new Error(o)),r()},e=function(t,e,r){var n=new u["a"];n.add(e,[{strategy:"isNoEmpty",errMsg:"链接不能为空"},{strategy:"isUrl",errMsg:"请输入正确的网址链接"}]);var o=n.start();o&&r(new Error(o)),r()};return{isAddMode:!0,isEditMode:!1,isDeleteMode:!1,isShowPopup:!1,currentIndex:-1,siteForm:{name:"",url:""},rules:{name:[{validator:t,trigger:"blur"}],url:[{validator:e,trigger:"blur"}]}}},methods:{openSitePanel:function(t,e,r){var n=this;if(this.isShowPopup=!0,t)this.isAddMode=!0;else{this.isAddMode=!1,this.currentIndex=r;var o=this.TOOL.copyObject(e);this.$nextTick((function(){n.siteForm=Object(c["a"])({},o)}))}},backupRecordToCilpBroad:function(){this.TOOL.copyTextToClip(JSON.stringify(this.$store.state.userInfo.record),"已复制至剪贴板 请尽快粘贴保存")},recoveryFromCilpBroad:function(){var t=this;return s(regeneratorRuntime.mark((function e(){var r,n,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,r=null,!navigator.clipboard||!window.isSecureContext){e.next=8;break}return e.next=5,navigator.clipboard.readText();case 5:r=e.sent,e.next=9;break;case 8:r=prompt("粘贴恢复的数据");case 9:if(n=JSON.parse(r),Array.isArray(n)){e.next=12;break}throw new Error("请检查恢复数据的格式");case 12:if(0!=n.length){e.next=14;break}throw new Error("恢复的数据为空");case 14:n.every((function(t){return"object"==Object(i["a"])(t)&&!Array.isArray(t)}))||new Error("请检查恢复数据的格式"),o=n.map((function(t){var e=t.name,r=t.url;if(!e||!r)throw new Error;return{name:e,url:r}})),t.$store.dispatch("updateLocalUserInfo",{record:o}),t.$tips("success","恢复数据成功","top-right"),e.next=23;break;case 20:e.prev=20,e.t0=e["catch"](0),t.$tips("error","剪贴板数据解析失败","top-right");case 23:case"end":return e.stop()}}),e,null,[[0,20]])})))()},closePopup:function(){this.currentIndex=-1,this.$refs.siteForm.resetFields()},deleteRecordItem:function(t){try{var e=this.LODASH.cloneDeep(this.$store.state.userInfo.record);e.splice(t,1),this.$store.dispatch("updateLocalUserInfo",{record:e}),this.$tips("success","缓存成功")}catch(r){console.log(r),this.$tips("error","缓存失败")}},submitSite:function(){var t=this;this.$refs.siteForm.validate((function(e){if(e){var r=t.LODASH.cloneDeep(t.$store.state.userInfo.record);if(t.isAddMode)try{r.push({name:t.siteForm.name,url:t.siteForm.url}),t.$store.dispatch("updateLocalUserInfo",{record:r}),t.isShowPopup=!1,t.$tips("success","缓存成功")}catch(n){t.$tips("error","缓存失败")}else try{r[t.currentIndex].name=t.siteForm.name,r[t.currentIndex].url=t.siteForm.url,t.$store.dispatch("updateLocalUserInfo",{record:r}),t.isShowPopup=!1,t.$tips("success","缓存成功")}catch(n){t.$tips("error","缓存失败")}}}))}}},f=h,p=(r("335e"),r("2877")),d=Object(p["a"])(f,n,o,!1,null,"478dfbbf",null);e["default"]=d.exports},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(P){c=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),a=new O(n||[]);return i._invoke=k(t,r,a),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(P){return{type:"throw",arg:P}}}t.wrap=u;var h="suspendedStart",f="suspendedYield",p="executing",d="completed",m={};function v(){}function y(){}function g(){}var w={};c(w,i,(function(){return this}));var b=Object.getPrototypeOf,x=b&&b(b($([])));x&&x!==r&&n.call(x,i)&&(w=x);var E=g.prototype=v.prototype=Object.create(w);function L(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){function r(o,i,a,s){var c=l(t[o],t,i);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"===typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,a,s)}),(function(t){r("throw",t,a,s)})):e.resolve(h).then((function(t){u.value=t,a(u)}),(function(t){return r("throw",t,a,s)}))}s(c.arg)}var o;function i(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}this._invoke=i}function k(t,e,r){var n=h;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===d){if("throw"===o)throw i;return M()}r.method=o,r.arg=i;while(1){var a=r.delegate;if(a){var s=F(a,r);if(s){if(s===m)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var c=l(t,e,r);if("normal"===c.type){if(n=r.done?d:f,c.arg===m)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=d,r.method="throw",r.arg=c.arg)}}}function F(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,F(t,r),"throw"===r.method))return m;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var o=l(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,m;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,m):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function C(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function $(t){if(t){var r=t[i];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){while(++o<t.length)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:M}}function M(){return{value:e,done:!0}}return y.prototype=g,c(E,"constructor",g),c(g,"constructor",y),y.displayName=c(g,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,c(t,s,"GeneratorFunction")),t.prototype=Object.create(E),t},t.awrap=function(t){return{__await:t}},L(_.prototype),c(_.prototype,a,(function(){return this})),t.AsyncIterator=_,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new _(u(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},L(E),c(E,s,"Generator"),c(E,i,(function(){return this})),c(E,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=$,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(C),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return s.type="throw",s.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),C(r),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;C(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:$(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),m}},t}(t.exports);try{regeneratorRuntime=n}catch(o){"object"===typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}},fb5b:function(t,e,r){}}]);