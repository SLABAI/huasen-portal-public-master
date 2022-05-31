/*
 * @Autor: huasenjio
 * @Date: 2021-08-25 01:53:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-02-01 19:37:12
 * @Description: 
 */
import * as type from "../mutations/mutation-types"
export default {
    [type.INIT_USER_INFO](state, payload) {
        state.userInfo.name = payload.name
        state.userInfo.id = payload.id
        state.userInfo.code = payload.code
        state.userInfo.token = payload.token

        state.statusInfo.isLogin = payload.token ? true : false
    },
    [type.INIT_USER_SITE_DATA](state, payload) {
        state.userInfo.site = payload.site
        state.userInfo.toy = payload.toy
        state.userInfo.resource = payload.resource
        state.userInfo.config = payload.config
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