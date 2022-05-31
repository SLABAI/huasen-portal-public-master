/*
 * @Autor: huasenjio
 * @Date: 2021-08-25 01:53:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2021-11-27 19:20:12
 * @Description: 配置请求方法
 */

import Mock from 'mockjs'
import { http } from "./http.js"
let isGlobalMock = process.env.NODE_ENV == "development" // 开发环境默认开启拦截

export function get(url, mock, FSW = true) {
    if (isGlobalMock && (typeof mock == "object" || typeof mock == 'function') && FSW) {
        let u = url
        let regExpText = u.replace(/\//g, "\\/")
        Mock.mock(new RegExp(regExpText), mock)
    }
    return function (params, option = {}) {
        return http({
            url,
            params,
            ...option,
            method: 'get',
        })
    }
}

export function post(url, mock, FSW = true) {
    if (isGlobalMock && (typeof mock == "object" || typeof mock == 'function') && FSW) {
        let u = url
        let regExpText = u.replace(/\//g, "\\/")
        Mock.mock(new RegExp(regExpText), mock)
    }
    return function (data, option = {}) {
        return http({
            url,
            data,
            ...option,
            method: 'post',
        })
    }
}

export function upload(url) {
    return function (data, option = {}) {
        return http({
            url,
            data,
            ...option,
            method: 'post',
            // 配置axios的参数
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRF': 'GvzB3ilhlgadishmascacsilreclherl'
            }
        })
    }
}
