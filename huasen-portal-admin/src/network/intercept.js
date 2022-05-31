/*
 * @Autor: huasenjio
 * @Date: 2021-08-25 01:53:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-05-01 14:33:26
 * @Description: 
 */

import Vue from "vue"
const that = Vue.prototype

function requestIntercept(config) {
    // 请求头中植入token
    if (that.STORAGE.getItem('userInfo')) config.headers.token = that.STORAGE.getItem('userInfo').token // 本地存储中获取token，每次请求均携带
    // 开启遮罩
    that.$startLoading()
    return config
}
function requestError(error) {
    // 发生错误时关闭遮罩
    that.$resetLoading()
    return Promise.reject(error)
}

function responseIntercept(result) {
    // 关闭遮罩
    that.$stopLoading()
    if (result.status === 200 && result.data.code === 1) {
        // 请求成功
        that.$tips("success", result.data.msg, "top-right", 1200)
        // 判断如果是登陆接口，存储token
        if (result.config.url === '/admin/login') {
            // 登陆成功保存token，保存登陆的用户信息
            let { name, aid, code, token } = result.data.data
            that.STORAGE.setItem("userInfo", { token, name, aid, code })
        }
        return result
    } else if (result.data.code === 0) {
        // 请求出错
        that.$tips("error", result.data.msg, "top-right", 1200)
    } else if (result.data.code === 204) {
        // 请求受理但无返回
        that.$tips("warning", result.data.msg, "top-right", 1200)
    } else if (result.data.code === 401 || result.data.code === 403) {
        // 重新认证
        that.$tips("warning", result.data.msg, "top-right", 1200, () => {
            that.STORAGE.setItem('userInfo', undefined);
            window.location.reload()
        })
    }
    return Promise.reject(result)
}
function responseError(error) {
    // 发生错误时关闭遮罩
    that.$resetLoading()
    if (!navigator.onLine) {
        that.$tips("error", "请检查网络是否连接", "top-right", 2000)
    } else {
        that.$tips("error", "服务器已经崩溃了", "top-right", 2000)
    }
    return Promise.reject(error)
}

export default {
    requestIntercept,
    responseIntercept,
    requestError,
    responseError
}

