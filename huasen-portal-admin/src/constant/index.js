/*
 * @Autor: huasenjio
 * @Date: 2021-08-25 01:53:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-03-18 01:23:41
 * @Description: 
 */

export default {
    baseURL:
        process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:3000/'
            : '/server/', // : 'http://1.15.56.137:3000/',

}
