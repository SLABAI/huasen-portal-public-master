(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eafb626c","chunk-49c84932","chunk-5387bdf9","chunk-0a97237a","chunk-198a6401"],{"08de":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"search-bar"},[a("ul",{staticClass:"menu",style:e.menuStyle},e._l(this.searchs,(function(t,s){return a("li",{key:s,staticClass:"xl:text-base",class:{active:e.activeSearchIndex==s},attrs:{"data-url":t.url,"data-keyword":t.key},on:{click:function(t){e.activeSearchIndex=s}}},[e._v(" "+e._s(t.name)+" ")])})),0),a("form",{on:{submit:function(t){return t.preventDefault(),e.doSearch.apply(null,arguments)}}},[a("div",{staticClass:"left"},[a("i",{class:e.currentSearch.iconClass})]),a("div",{staticClass:"center"},[a("el-input",{attrs:{placeholder:"搜索一下...",autofocus:!0,clearable:""},nativeOn:{keyup:function(t){return e.handleIdea.apply(null,arguments)}},model:{value:e.searchText,callback:function(t){e.searchText=t},expression:"searchText"}})],1),a("div",{staticClass:"right"},[a("i",{staticClass:"iconfont icon-md-search",on:{click:e.doSearch}})]),e.searchText&&0!=e.ideas.length?a("ul",{staticClass:"idea shadow"},e._l(e.ideas,(function(t,s){return a("li",{key:s,class:{active:s==e.activeIdeaIndex},on:{click:function(a){return e.doSearchByHover(t)}}},[e._v(" "+e._s(t)+" ")])})),0):e._e()])])},i=[],n=(a("b64b"),a("fb6a"),[{url:"https://www.baidu.com/s",key:"word",params:{},name:"百度",iconClass:"iconfont icon-baidu"},{url:"https://www.google.com/search",key:"q",params:{},name:"谷歌",iconClass:"iconfont icon-chrome"},{url:"https://cn.bing.com/search",key:"q",params:{},name:"必应",iconClass:"iconfont icon-yingyong"},{url:"https://dict.youdao.com/search",key:"q",params:{},name:"翻译",iconClass:"iconfont icon-translate"},{url:"https://xueshu.baidu.com/s",key:"wd",params:{},name:"学术",iconClass:"iconfont icon-md-school"},{url:"https://image.baidu.com/search/index",key:"word",params:{tn:"baiduimage"},name:"搜图",iconClass:"iconfont icon-md-image"},{url:"https://duckduckgo.com/",key:"q",params:{},name:"匿名",iconClass:"iconfont icon-md-cube"},{url:"https://quark.sm.cn/s",key:"q",params:{},name:"夸克",iconClass:"iconfont icon-md-planet"}]),c=n,o=a("b383"),r=a("d4ec"),l=a("bee2"),u=function(){function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;Object(r["a"])(this,e),this.delay=a,this.timer=null,this.previous=0,this.now=0,this.scope=t}return Object(l["a"])(e,[{key:"run",value:function(e,t){var a=this.scope;this.now=(new Date).getTime(),this.now-this.previous<this.delay&&clearTimeout(this.timer),this.timer=setTimeout(function(){e.call(a,t),this.timer=null}.bind(this),this.delay),this.previous=this.now}}]),e}(),d={name:"SearchBar",data:function(){return{af:new u(this,200),searchText:"",searchs:c,activeSearchIndex:0,activeIdeaIndex:-1,currentSearch:{},ideas:[]}},watch:{activeSearchIndex:{handler:function(e,t){this.currentSearch=this.searchs[e]},deep:!0,immediate:!0}},computed:{menuStyle:function(){return{color:this.$store.state.userInfo.config.headerFontColor}}},methods:{handleIdea:function(e){void 0!==this.searchText&&null!==this.searchText&&40!==e.keyCode&&38!==e.keyCode&&this.af.run(this.getIdea),40==e.keyCode&&0!==this.ideas.length&&(this.activeIdeaIndex=this.activeIdeaIndex==this.ideas.length-1?0:this.activeIdeaIndex+1,this.searchText=this.ideas[this.activeIdeaIndex]),38==e.keyCode&&0!==this.ideas.length&&(this.activeIdeaIndex=this.activeIdeaIndex>0?this.activeIdeaIndex-1:this.ideas.length-1,this.searchText=this.ideas[this.activeIdeaIndex])},doSearch:function(){if(this.searchText){var e={};e[this.currentSearch.key]=this.searchText,0!=Object.keys(this.currentSearch.params)&&(e=Object.assign(e,this.currentSearch.params));var t=this.TOOL.handleURL(this.currentSearch.url,e);window.open(t)}},doSearchByHover:function(e){this.searchText=e,this.doSearch()},getIdea:function(){var e=this;""!=this.searchText&&Object(o["b"])("https://www.baidu.com/su",{wd:this.searchText,cb:"handleSuggestion"}).then((function(t){e.ideas=t.s.slice(0,6)}))}}},h=d,p=(a("49b8"),a("2877")),f=Object(p["a"])(h,s,i,!1,null,"492b76be",null);t["default"]=f.exports},"0c8e":function(e,t,a){},"34a5":function(e,t,a){"use strict";a("bde9")},"35b1":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"web-site"},e._l(this.$store.state.commonInfo.takeSource.site,(function(t,s){return a("section",{key:s,attrs:{id:"site-anchor-"+encodeURI(t.typeName)}},[a("header",[a("i",{staticClass:"iconfont icon-tag"}),a("a",{staticClass:"title",attrs:{name:t.typeName}},[e._v(e._s(t.typeName))])]),a("main",[a("ul",{directives:[{name:"balance",rawName:"v-balance"}]},e._l(t.sites,(function(t,s){return a("a",{key:s,staticClass:"site",attrs:{title:t.describe,href:t.url,target:"_blank"}},[a("div",{staticClass:"site-card w-px-180 sm:w-px-150"},[a("div",{staticClass:"img-group icon-hs w-px-100 h-px-100",class:t.imgClass}),"icon-hs-default"===t.imgClass||""===t.imgClass?a("div",{staticClass:"img-loading w-px-100 h-px-100"}):e._e(),a("div",{staticClass:"text-group"},[a("div",{staticClass:"name"},[e._v(e._s(t.name))]),a("div",{staticClass:"describe"},[e._v(e._s(t.describe))])])])])})),0)])])})),0)},i=[],n={name:"SiteBar",data:function(){return{websites:[{typeName:"常用推荐",sites:[{imgClass:"icon-hs icon-hs-bilibili",name:"bilibili",url:"http://n.huasen.cc/",describe:"中国最大的二次元娱乐网站平台"}]},{typeName:"在线工具",sites:[]}]}}},c=n,o=(a("b9b7"),a("2877")),r=Object(o["a"])(c,s,i,!1,null,"6c6a213e",null);t["default"]=r.exports},"3f89":function(e,t,a){},4002:function(e,t,a){"use strict";a("eb9c")},4055:function(e,t,a){"use strict";a("0c8e")},"49b8":function(e,t,a){"use strict";a("3f89")},"53af":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"h-nav-bar"},[a("header"),a("main",[a("ul",{directives:[{name:"balance",rawName:"v-balance"}]},e._l(this.$store.state.commonInfo.takeSource.site,(function(t){return a("li",{key:t.typeName,staticClass:"record-item",on:{click:function(a){return e.changeAnchorPosition(t.typeName)}}},[a("div",{staticClass:"pointer"},[e._v(" "+e._s(t.typeName)+" ")])])})),0)])])},i=[],n=a("2909"),c=(a("d81d"),a("6f90")),o=a("934a"),r={name:"NavBar",methods:{changeAnchorPosition:function(e){var t=document.getElementById("site-anchor-".concat(encodeURI(e)));t.scrollIntoView({behavior:"smooth",block:"start"}),Object(n["a"])(t.parentNode.children).map((function(e){e.classList.remove("active-anchor")})),t.className=t.className+" active-anchor",this.$nextTick((function(){c["a"].pubEv(o["a"],t.offsetTop-84)}))}}},l=r,u=(a("34a5"),a("2877")),d=Object(u["a"])(l,s,i,!1,null,"229592e0",null);t["default"]=d.exports},"53d2":function(e,t,a){},"78c6":function(e,t,a){"use strict";a("53d2")},"8ecd":function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hs-card"},[a("div",{staticClass:"banner",class:{bannerSimple:this.$store.state.userInfo.config.simpleMode}},[e._t("banner")],2),a("div",{staticClass:"main",class:{mainSimple:this.$store.state.userInfo.config.simpleMode}},[e._t("main")],2)])},i=[],n={name:"Card",data:function(){return{}},methods:{}},c=n,o=(a("78c6"),a("2877")),r=Object(o["a"])(c,s,i,!1,null,"3554c3b8",null);t["a"]=r.exports},b297:function(e,t,a){},b3d7:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home"},[a("card",{scopedSlots:e._u([{key:"banner",fn:function(){return[a("div",{staticClass:"banner-group"},[a("ul",{staticClass:"tool"},[e.$store.state.userInfo.config.simpleMode?e._e():a("li",{on:{click:function(){return e.isOpenBannerSettingPopup=!e.isOpenBannerSettingPopup}}},[a("i",{staticClass:"iconfont icon-md-happy"})]),a("li",{on:{click:e.changeToFullScreen}},[a("i",{staticClass:"iconfont icon-md-qr-scanner"})])]),a("div",{staticClass:"wallpaper"},[a("hs-wallpaper")],1),a("div",{staticClass:"search xl:w-px-600 lg:w-px-400 sm:w-px-360 h-px-40",class:{searchSimple:e.$store.state.userInfo.config.simpleMode}},[a("hs-search-bar")],1)])]},proxy:!0},{key:"main",fn:function(){return[a("div",{staticClass:"main-group"},[a("hs-record"),a("hs-nav-bar"),a("hs-site"),a("hs-popup",{staticClass:"wallpaper-popup",attrs:{title:"封面编辑",isShow:e.isOpenBannerSettingPopup},on:{"update:isShow":function(t){e.isOpenBannerSettingPopup=t},"update:is-show":function(t){e.isOpenBannerSettingPopup=t}}},[a("el-collapse",{staticClass:"collapse",attrs:{accordion:""},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-collapse-item",{attrs:{name:"1"}},[a("template",{slot:"title"},[a("div",{staticClass:"title"},[e._v("纯色背景")])]),a("div",{staticClass:"collapse-content"},[a("ul",{staticClass:"pure"},e._l(e.pures,(function(t,s){return a("li",{key:s,style:{backgroundColor:t.background},on:{click:function(a){return e.changeBannerBg(t)}}},[e._v(" "+e._s(t.background)+" ")])})),0)])],2),a("el-collapse-item",{attrs:{name:"2"}},[a("template",{slot:"title"},[a("div",{staticClass:"title"},[e._v("图片背景")])]),a("div",{staticClass:"collapse-content"},[a("ul",{staticClass:"image"},e._l(e.wallpaperImages,(function(t,s){return a("li",{key:s,style:{backgroundImage:"url("+t.background+")"}},[a("div",{staticClass:"setting",on:{click:function(a){return e.changeBannerBg(t)}}},[e._v(" 立即设置 ")])])})),0)])],2),a("el-collapse-item",{attrs:{name:"3"}},[a("template",{slot:"title"},[a("div",{staticClass:"title"},[e._v("自定义上传")])]),a("div",{staticClass:"collapse-content flex justify-center items-center"},[a("el-upload",{staticClass:"upload py-px-10",attrs:{drag:"",accept:".png,.jpg,.git","before-upload":e.beforeUpload,action:""}},[a("i",{staticClass:"el-icon-upload"}),a("div",{staticClass:"el-upload__text"},[e._v("拖拽上传 · "),a("em",[e._v("点击上传")])])])],1)],2),a("el-collapse-item",{attrs:{name:"4"}},[a("template",{slot:"title"},[a("div",{staticClass:"title"},[e._v("其他")])]),a("div",{staticClass:"collapse-content"},[a("section",{staticClass:"other"},[a("div",[e._v("字体颜色")]),a("ul",[e._l(e.headerFontColors,(function(t,s){return a("li",{key:s,style:{backgroundColor:t},on:{click:function(a){return e.changeHeaderFontColor(t)}}})})),a("li",[a("el-color-picker",{attrs:{size:"mini"},on:{change:e.changeHeaderFontColor},model:{value:e.colorPickerValue,callback:function(t){e.colorPickerValue=t},expression:"colorPickerValue"}})],1)],2)]),a("section",{staticClass:"other"},[a("div",[e._v("背景模糊度")]),a("el-slider",{staticClass:"w-px-380 pl-px-8",attrs:{"show-tooltip":!1,min:0,max:10,step:.5},on:{change:e.changeBannerBgBlur},model:{value:e.sliderDimValue,callback:function(t){e.sliderDimValue=t},expression:"sliderDimValue"}})],1),a("section",{staticClass:"other"},[a("div",[e._v("遮罩浓度")]),a("el-slider",{staticClass:"w-px-380 pl-px-8",attrs:{"show-tooltip":!1,min:0,max:1,step:.1},on:{change:e.changeBannerBgShadow},model:{value:e.sliderShadowValue,callback:function(t){e.sliderShadowValue=t},expression:"sliderShadowValue"}})],1)])],2)],1)],1)],1)]},proxy:!0}])})],1)},i=[],n=(a("99af"),a("8ecd")),c=a("c22e"),o=a("b8fa"),r=a("08de"),l=a("90c2"),u=a("35b1"),d=a("53af"),h={name:"Home",components:{Card:n["a"],HsWallpaper:o["default"],HsPopup:c["a"],HsSearchBar:r["default"],HsRecord:l["default"],HsSite:u["default"],HsNavBar:d["default"]},data:function(){return{activeName:"4",isOpenBannerSettingPopup:!1,colorPickerValue:"#8e54e9",sliderDimValue:this.$store.state.userInfo.config.bgBlur,sliderShadowValue:this.$store.state.userInfo.config.bgOpacity,pures:[{headerFontColor:"#EEEEEE",background:"#66ae78"},{headerFontColor:"#232323",background:"#8e54e9"},{headerFontColor:"#FFFFFF",background:"#31c2e0"}],wallpaperImages:[{headerFontColor:"#525252",background:"/img/wallpaper/1.jpeg"},{headerFontColor:"#525252",background:"/img/wallpaper/2.jpeg"}],headerFontColors:["#dddddd","#8e54e9","#ff0000","#66ae78","#ff6b37","#31c2e0","#ffbc2e"]}},mounted:function(){this.initWrap()},watch:{"$store.state.commonInfo.takeSource":{handler:function(e,t){if(e.config){var a=e.config.wallpapers,s=e.config.pures;a&&Array.isArray(a)||(a=[]),s&&Array.isArray(s)||(s=[]),this.wallpaperImages=this.wallpaperImages.concat(a),this.pures=this.pures.concat(s)}},deep:!0,immediate:!0}},methods:{changeToFullScreen:function(){this.$store.dispatch("updateLocalUserInfo",{config:{simpleMode:!this.$store.state.userInfo.config.simpleMode}})},changeBannerBg:function(e){this.$store.dispatch("updateLocalUserInfo",{config:{headerFontColor:e.headerFontColor,background:e.background}})},changeHeaderFontColor:function(e){this.$store.dispatch("updateLocalUserInfo",{config:{headerFontColor:e}})},changeBannerBgBlur:function(e){this.$store.dispatch("updateLocalUserInfo",{config:{bgFilter:"blur(".concat(e,"px)")}})},changeBannerBgShadow:function(e){this.$store.dispatch("updateLocalUserInfo",{config:{bgOpacity:e}})},beforeUpload:function(e){var t=this;return e.size<=1048576?this.TOOL.getBase64(e,(function(e){t.$store.dispatch("updateLocalUserInfo",{config:{background:e}})})):this.$tips("error","图片大小已超过 1mb",null,2e3),!1},initWrap:function(){this.$store.state.triggerInfo.isShowLeft=!0,this.$store.state.triggerInfo.isShowHeader=!0,this.$store.state.triggerInfo.isShowSidebar=!0}}},p=h,f=(a("4055"),a("2877")),m=Object(f["a"])(p,s,i,!1,null,"5ef25e70",null);t["default"]=m.exports},b8fa:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"wallpaper"},[a("section",{staticClass:"bg",style:e.wallpaperStyle}),a("div",{staticClass:"bg-shadow",style:e.bgShadowStyle}),a("div",{staticClass:"bg-fiiter",style:e.bgFilterStyle})])},i=[],n={name:"Wallpaper",computed:{wallpaperStyle:function(){var e={},t=this.$store.state.userInfo.config,a=this.TOOL.judageBgType(t.background);return"imgUrl"===a||"module"===a||"base64"===a?e.backgroundImage="url(".concat(t.background,")"):"color"===a&&(e.backgroundColor=t.background),e},bgFilterStyle:function(){var e={},t=this.$store.state.userInfo.config;return e.backdropFilter=t.bgFilter,e},bgShadowStyle:function(){return{opacity:this.$store.state.userInfo.config.bgOpacity}}}},c=n,o=(a("4002"),a("2877")),r=Object(o["a"])(c,s,i,!1,null,"0a4db5b2",null);t["default"]=r.exports},b9b7:function(e,t,a){"use strict";a("b297")},bde9:function(e,t,a){},eb9c:function(e,t,a){}}]);