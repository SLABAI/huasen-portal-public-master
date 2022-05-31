/*
 * @Autor: huasenjio
 * @Date: 2021-10-05 11:47:01
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-02-24 23:47:05
 * @Description: 
 */
const express = require("express");
const router = express.Router();

const commonM = require("../middleware/common.middleware.js")
const mailM = require("../middleware/mail.middleware.js")
const mailS = require("../service/mail.service.js")

router.get("/getCode", commonM.mergeParams, mailM.checkMailAddress, mailS.sendMailCode);

module.exports = router;
