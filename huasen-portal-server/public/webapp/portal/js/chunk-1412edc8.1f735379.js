(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1412edc8"],{"0ee9":function(t,i,e){},4461:function(t,i,e){"use strict";e("0ee9")},a9a8:function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"Read"},[e("main",[e("div",{staticClass:"content"},[e("div",{staticClass:"title-group flex my-px-10"},[e("div",{staticClass:"title text-3xl flex-1 text-ellipsis"},[t._v(" "+t._s(t.title||"")+" ")]),e("div",{staticClass:"icon-group text-xl hover:text-red-500 pointer",on:{click:t.goBack}},[t._v(" 返回 "),e("i",{staticClass:"iconfont icon-tuichu text-xl"})])]),e("div",{staticClass:"tag-group"},t._l(t.tags,(function(i){return e("div",{directives:[{name:"randomColor",rawName:"v-randomColor"}],key:i,staticClass:"text-white inline-block text-xs px-px-8 py-px-2 first:mx-px-0 mx-px-4 rounded-full"},[t._v(" "+t._s(i)+" ")])})),0),e("div",{staticClass:"info-group text-gray-700"},[e("div",{staticClass:"text-ellipsis"},[t._v(" "+t._s("花森原创 · 最后修改于 "+(t.time&&t.time.split("-")[0])+"年 "+(t.time&&t.time.split("-")[1])+"月 "+(t.time&&t.time.split("-")[2])+"日")+" ")])]),e("div",{staticClass:"my-px-10 overflow-x-hidden overflow-y-auto"},[e("HArea",{attrs:{value:t.content}})],1),t._m(0)])])])},s=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("footer",{staticClass:"footer-group"},[e("div",{staticClass:"text-ellipsis"},[t._v("版权说明：MIT开源协议")]),e("div",{staticClass:"text-ellipsis"},[t._v("免责声明：文章仅供学习交流 禁止用于商业用途")])])}],n=(e("ac1f"),e("1276"),{name:"Read",data:function(){return{title:"文章标题",time:"1979-01-01",tag:"简洁/用心/愉悦",content:"文章内容...."}},created:function(){this.initWrap(),this.initData()},computed:{tags:function(){return this.tag?this.tag.split("/"):[]}},methods:{initWrap:function(){this.$store.state.triggerInfo.isShowSidebar=!1,this.$store.state.triggerInfo.isShowHeader=!1},initData:function(){this.$route.params.id?this.queryNewsById(this.$route.params.id):this.$router.push("/article")},queryNewsById:function(t){var i=this;this.API.findNewsById({_id:t}).then((function(t){t.data.data&&0!=t.data.data.length?(i.title=t.data.data[0].title,i.time=t.data.data[0].time,i.tag=t.data.data[0].tag,i.content=t.data.data[0].content):i.$router.push("/article")})).catch((function(t){i.$router.push("/home")}))},goBack:function(){this.$router.go(-1)}}}),o=n,r=(e("4461"),e("2877")),c=Object(r["a"])(o,a,s,!1,null,"6a748a16",null);i["default"]=c.exports}}]);