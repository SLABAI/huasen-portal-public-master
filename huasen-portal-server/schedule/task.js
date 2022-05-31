/*
 * @Autor: huasenjio
 * @Date: 2021-10-05 23:31:56
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-02-03 15:55:04
 * @Description: 定时任务
 */
const config = require("../config.js")

const MAILER = require("../plugin/mail.js")

!function () {
  console.log(`task      --> ${config.taskConfig.interval}ms`)
  setInterval(() => {

  }, config.taskConfig.interval)
}();