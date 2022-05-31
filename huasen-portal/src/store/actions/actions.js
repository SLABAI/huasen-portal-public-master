/*
 * @Autor: huasenjio
 * @Date: 2021-08-25 01:53:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-24 00:51:46
 * @Description: 
 */
import Vue from "vue"
import * as type from "../mutations/mutation-types"
const that = Vue.prototype
export default {
    // 解析本地缓存的用户配置，若不存在，则采用仓库默认设定值
    getLocalUserInfo(context, payload) {
        let user = that.STORAGE.getItem('userInfo')
        if (user) {
            context.commit(type.SAVE_USER_MUTATION, {
                id: user.id, // id
                name: user.name, // 昵称
                headImg: user.headImg, // 头像
                token: user.token, // token
                config: user.config, // 配置
                code: user.code, // 权限码
                record: user.record, // 收录的网站
                todoList: user.todoList, // 代办
            })
        }
    },
    // 根据传入用户信息，与当前状态下合并覆盖，并且本地缓存，更新用户信息
    updateLocalUserInfo(context, payload) {
        let temp = that.LODASH.merge(context.state.userInfo, payload)
        // 手动替换
        if (payload.record && Array.isArray(payload.record)) temp.record = payload.record
        if (payload.todoList && Array.isArray(payload.todoList)) temp.todoList = payload.todoList
        that.STORAGE.setItem('userInfo', temp)
        let deep = that.LODASH.cloneDeep(temp)

        // 更新配置信息
        context.commit(type.SAVE_USER_MUTATION, {
            id: deep.id,
            name: deep.name, // 昵称
            headImg: deep.headImg, // 头像
            token: deep.token, // token
            config: deep.config, // 配置
            code: deep.code, // 权限码
            record: deep.record, // 收录的网站
            todoList: deep.todoList, // 代办
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