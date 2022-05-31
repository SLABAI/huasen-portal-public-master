/*
 * @Autor: huasenjio
 * @Date: 2021-08-25 01:53:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-23 22:39:55
 * @Description: 
 */
import { SAVE_USER_MUTATION } from './mutation-types'
export default {
    [SAVE_USER_MUTATION](state, payload) {
        // 存入仓库
        state.userInfo.id = payload.id
        state.userInfo.name = payload.name
        state.userInfo.headImg = payload.headImg
        state.userInfo.token = payload.token
        state.userInfo.config = payload.config
        state.userInfo.code = payload.code
        state.userInfo.record = payload.record
        state.userInfo.todoList = payload.todoList
        // 持久化存储
    }
}


// vue组件中使用实例
// import { mapMutations } from 'vuex'
// export default {
//   methods: {
//     // 1.数组形式
//     ...mapMutations([
//       'SAVE_USER_MUTATION', // 将 `this.SAVE_USER_MUTATION()` 映射为 `this.$store.commit('SAVE_USER_MUTATION')`
//       'SAVE_USER_MUTATION' // 将 `this.SAVE_USER_MUTATION(payload)` 映射为 `this.$store.commit('SAVE_USER_MUTATION', payload)`
//     ]),
//     // 2.对象形式
//     ...mapMutations({
//       add: 'SAVE_USER_MUTATION' // 将 `this.add()` 映射为 `this.$store.commit('SAVE_USER_MUTATION')`
//     })
//   }
// }