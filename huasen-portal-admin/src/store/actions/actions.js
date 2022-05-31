/*
 * @Autor: huasenjio
 * @Date: 2021-08-25 01:53:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-02-01 19:35:39
 * @Description: 
 */
import Vue from "vue"
import * as type from "../mutations/mutation-types"
export default {
    initUserInfo(context, payload) {
        let userInfo = Vue.prototype.STORAGE.getItem('userInfo')
        context.commit(type.INIT_USER_INFO, {
            token: userInfo ? userInfo.token : "",
            name: userInfo ? userInfo.name : "",
            id: userInfo ? userInfo.aid : "",
            code: userInfo ? userInfo.code : "000"
        })
    },
    initUserSiteData(context, payload) {
        context.commit(type.INIT_USER_SITE_DATA, {
            site: payload.site ? JSON.parse(payload.site) : [], // 主页网站数据
            toy: payload.toy ? JSON.parse(payload.toy) : [], // 趣味网站数据
            resource: payload.resource ? JSON.parse(payload.resource) : [], // 趣味网站数据
            config: payload.config ? JSON.parse(payload.config) : {}, // 网站配置数据
        })
    }
}

// import { mapActions } from 'vuex'
// export default {
//   methods: {
//     // 1.数组形式
//     ...mapActions([
//       'getUser', // 将 `this.getUser()` 映射为 `this.$store.dispatch('getUser')`
//       'getUser' // 将 `this.getUser(payload)` 映射为 `this.$store.dispatch('getUser', payload)`
//     ]),
//     // 2.对象形式
//     ...mapActions({
//       add: 'getUser' // 将 `this.add()` 映射为 `this.$store.dispatch('payload')`
//     })
//   }
// }