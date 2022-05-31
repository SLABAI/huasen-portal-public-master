/*
 * @Autor: huasenjio
 * @Date: 2021-08-25 01:53:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-23 20:09:46
 * @Description: api接口
 */
import Mock from 'mockjs'
import { get, post, upload } from './request'

const getMailCode = get("/mail/getCode") // 邮箱验证码

// 操作登录账号
const login = post('/admin/login') // 登陆
const register = post('/admin/register') // 注册管理员接口
const getSiteData = post("/admin/querySiteData") // 查询网站数据
const updateSiteData = post("/admin/updateSiteData") // 更新站点数据
const deleteAdmin = post("/admin/delete") // 删除管理员
// 操作管理员
const findAllAdminByPage = get("/admin/findAllByPage") // 分页查询管理员
const findAdminByAidOrNameKey = get("/admin/findAdminByAidOrNameKey") // 根据账号和昵称进行模糊查询
const insertAdmin = post("/admin/register") // 添加管理员
const updateAdmin = post("/admin/update") // 更新管理员
// 操作用户
const findAllUser = get("/admin/findAllUser") // 查询所有用户
const findAllUserByPage = get("/admin/findAllUserByPage") // 分页查询用户
const findUserByIdOrNameKey = get("/admin/findUserByIdOrNameKey") // 根据账号和昵称进行模糊查询
const insertUser = post("/admin/insertUserById") // 添加用户
const deleteUser = post("/admin/deleteUserById") // 删除用户
const updateUser = post("/admin/updateUserById") // 更新用户
// 操作新闻
const publicNews = post("/news/insert") // 发布文章
const getAllNews = get("/news/findAll") // 获取全部的新闻
const getAllNewsByPage = get("/news/findAllByPage") // 获取全部的新闻
const updateNewsById = post("/news/updateById") // 获取全部的新闻
const deleteNewsById = post("/news/deleteById") // 获取全部的新闻
const findNewsByTitleOrTagKey = get("/news/findNewsByTitleOrTagKey") // 根据标题和发布者进行模糊查询
// 操作雪碧图
const findAllSpriteIcon = post("/sprite/findAll") // 获取所有的精灵图
const compileSpriteIcon = post("/sprite/compile") // 编译上传的精灵图
const deleteSpriteIcon = post("/sprite/delete") // 删除精灵图
const downloadSpriteIcon = post("/sprite/download") // 删除精灵图
// 操作文件
const findAllFile = get("/admin/findAllFile")
const deleteFile = post('/admin/deleteFile')
const uploadFile = upload('/admin/upload')


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
    getMailCode,

    login,
    register,
    findAllUser,
    findAllAdminByPage,
    findAllUserByPage,
    findUserByIdOrNameKey,
    findAdminByAidOrNameKey,
    getSiteData,
    updateSiteData,
    insertUser,
    insertAdmin,
    deleteAdmin,
    updateAdmin,
    deleteUser,
    updateUser,

    publicNews,
    getAllNews,
    getAllNewsByPage,
    updateNewsById,
    deleteNewsById,
    findNewsByTitleOrTagKey,

    findAllSpriteIcon,
    compileSpriteIcon,
    deleteSpriteIcon,
    downloadSpriteIcon,

    findAllFile,
    deleteFile,
    uploadFile,

    mockTest
}