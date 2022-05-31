/*
 * @Autor: huasenjio
 * @Date: 2022-02-03 17:29:24
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-05-01 20:44:43
 * @Description: 精灵图路由
 */
const express = require("express");
const router = express.Router();

const commonM = require("../middleware/common.middleware.js")
const adminM = require("../middleware/admin.middleware.js")
const spriteM = require("../middleware/sprite.middleware.js")

const spriteS = require("../service/sprite.service.js")
const adminS = require("../service/admin.service.js")

router.post("/findAll", adminM.verifyAdminByToken, adminS.judgeAdminPower, spriteS.findAllSpriteIcon)
router.post("/compile", adminM.verifyAdminByToken, adminS.judgeAdminPower, spriteS.compileSpriteIcon)
router.post("/upload", adminM.verifyAdminByToken, adminS.judgeAdminPower, spriteM.processSpriteIconFile, spriteS.uploadSpriteIcon)
router.post("/delete", commonM.mergeParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, spriteS.deleteSpriteIcon)
router.post('/download', adminM.verifyAdminByToken, adminS.judgeAdminPower, spriteS.downloadSpriteIcon)

module.exports = router;
