/*
 * @Autor: huasenjio
 * @Date: 2021-08-25 01:53:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-03-26 00:24:27
 * @Description: 
 */
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import 'plugin/directive.js'
import 'plugin/element.js'
import 'plugin/echarts.js'

import i18n from 'config/i18n.config.js'
import tool from 'utils/index.js'
import constant from 'constant/index.js'
import api from 'network/api.js'
import storage from 'plugin/storage.js'

Vue.prototype.TOOL = tool;
Vue.prototype.CONSTANT = constant;
Vue.prototype.API = api;
Vue.prototype.STORAGE = storage

import VueDND from 'awe-dnd'
Vue.use(VueDND)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
