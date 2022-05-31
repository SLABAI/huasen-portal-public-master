/*
 * @Autor: huasenjio
 * @Date: 2021-08-25 01:53:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-23 23:14:08
 * @Description: api接口
 */
import Mock from 'mockjs'
import { get, post } from './request'

const getMailCode = get("/mail/getCode") // 邮箱验证码

const login = post('/user/login') // 登陆
const register = post('/user/register') // 注册接口
const findTakeSource = get('/user/findTakeSource') // 获取订阅的网站资源
const backupData = post('/user/backup') // 备份当前状态至服务器
const syncData = get('/user/syncDataFromCloud') // 备份当前状态至服务器

const findAllNews = get('/news/findAll') // 查询全部新闻
const findNewsById = get('/news/findById') // 根据新闻的_id查看新闻

const mockTest = get("/mock/test", {
    code: 1,
    msg: "请求成功",
    data: {
        "lists|5-10": [
            {
                "name|1-6": "花",
                "status|1": true,
                "type|1": ["在线", "离线"],
                "headIcon|": Mock.Random.image("50x50", '#ec7168', "花森"),
                'key|+1': 1,
                "longitude|119.8": 1.36,
                "latitude|26.8": 1.03,
            }
        ]
    }

})
export default {
    login,
    register,
    getMailCode,
    mockTest,
    findTakeSource,
    backupData,
    findAllNews,
    findNewsById,
    syncData
}