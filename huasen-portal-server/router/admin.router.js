/*
 * @Autor: huasenjio
 * @Date: 2021-10-07 18:33:45
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-05-01 20:54:01
 * @Description: 管理员接口路由
 */
const express = require("express");
const router = express.Router();

const commonM = require("../middleware/common.middleware.js")
const userM = require("../middleware/user.middleware.js")
const adminM = require("../middleware/admin.middleware.js")

const userS = require("../service/user.service.js")
const adminS = require("../service/admin.service.js")

// 管理员相关接口
router.get("/findAllFile", commonM.mergeParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, adminS.findAllFile)
router.get("/findAllByPage", commonM.mergeParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, adminS.findAllByPage)
router.get("/findAdminByAidOrNameKey", commonM.mergeParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, adminS.findAdminByAidOrNameKey);
router.post("/login", commonM.mergeParams, adminM.checkAdminAid, adminM.checkAdminPassword, commonM.encryptPassword, adminS.login)
router.post("/register", commonM.mergeParams, adminM.checkAdminAid, adminM.checkAdminPassword, commonM.encryptPassword, adminM.verifyAdminByToken, adminS.judgeAdminPower, adminS.judgeAdminExisted, commonM.handleHeadImg, adminS.insert)
router.post("/update", commonM.mergeParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, commonM.judgeSamePassword, adminS.update)
router.post("/delete", commonM.mergeParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, adminS.remove)
router.post("/upload", adminM.processAdminMixtureFile, commonM.mergeParams, adminS.upload)
router.post("/querySiteData", commonM.mergeParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, adminM.authToAid, adminS.queryDataByAid)
router.post("/updateSiteData", commonM.mergeParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, adminM.authToAid, adminS.update)
router.post("/deleteFile", commonM.mergeParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, adminS.deleteFile)

// 操作用户
router.get("/findAllUser", commonM.mergeParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, userS.findAll)
router.get("/findAllUserByPage", commonM.mergeParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, userS.findAllByPage)
router.get("/findUserByIdOrNameKey", commonM.mergeParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, userS.findUserByIdOrNameKey);
router.post("/insertUserById", commonM.mergeParams, userM.checkUserParams, commonM.encryptPassword, adminM.verifyAdminByToken, adminS.judgeAdminPower, userS.judgeUserExisted, commonM.handleHeadImg, userS.insert)
router.post("/deleteUserById", commonM.mergeParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, userS.remove)
router.post("/updateUserById", commonM.mergeParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, commonM.judgeSamePassword, userS.update)

module.exports = router