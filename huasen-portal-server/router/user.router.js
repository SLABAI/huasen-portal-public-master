/*
 * @Autor: huasenjio
 * @Date: 2021-08-21 21:07:58
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-23 23:26:54
 * @Description: 
 */
const express = require("express");
const router = express.Router();

const commonM = require("../middleware/common.middleware.js")
const userM = require("../middleware/user.middleware.js")

const userS = require('../service/user.service.js')
const adminS = require('../service/admin.service.js')

router.get("/syncDataFromCloud", userM.verifyUserByToken, userS.syncData)
router.get("/findTakeSource", adminS.findTakeSource)
router.post("/backup", commonM.mergeParams, userM.verifyUserByToken, userS.backupData)

router.post("/login", commonM.mergeParams, userM.checkUserParams, commonM.encryptPassword, userS.loginUser)
router.post("/register", commonM.mergeParams, commonM.encryptPassword, userM.judgeUserMailCode, userS.judgeUserExisted, commonM.handleHeadImg, userS.registerUser);
router.post("/update", commonM.mergeParams, userM.verifyUserByToken, userM.checkUserParams, commonM.encryptPassword, userS.updateUser)
// router.post("/upload", userM.processUserMixtureFile, userM.checkUserParams, userS.uploadUserFile)






module.exports = router;
