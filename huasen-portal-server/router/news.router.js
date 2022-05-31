/*
 * @Autor: huasenjio
 * @Date: 2021-10-27 22:26:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-10 13:12:22
 * @Description: 
 */
const express = require("express");
const router = express.Router();

const commonM = require("../middleware/common.middleware.js")
const newsM = require("../middleware/news.middleware.js")
const adminM = require("../middleware/admin.middleware")

const newsS = require("../service/news.service.js")
const adminS = require("../service/admin.service.js")

router.get("/findAll", commonM.mergeParams, newsS.findAll);
router.get("/findAllByPage", commonM.mergeParams, newsS.findAllByPage);
router.get("/findById", commonM.mergeParams, newsS.findById);
router.get("/findNewsByTitleOrTagKey", commonM.mergeParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, newsS.findNewsByTitleOrTagKey);
router.post("/deleteById", commonM.mergeParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, newsS.deleteById);
router.post("/updateById", commonM.mergeParams, newsM.checkNewsParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, newsS.updateById);
router.post("/insert", commonM.mergeParams, newsM.checkNewsParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, newsS.insert);
router.post("/upload", commonM.mergeParams, adminM.verifyAdminByToken, adminS.judgeAdminPower, adminM.processAdminMixtureFile, adminS.upload);

module.exports = router;