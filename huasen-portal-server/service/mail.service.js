/*
 * @Autor: huasenjio
 * @Date: 2021-10-05 12:01:03
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-24 23:32:58
 * @Description: 发送邮箱验证码
 */
const MAILER = require("../plugin/mail.js")
const RESPONSE = require("../utils/response-handle.js")

// 发送邮箱验证码
function sendMailCode(req, res, next) {
  let { mail } = req.body
  MAILER.findCodeByMail(mail).then(mailCode => {
    if (mailCode) {
      res.send(RESPONSE("SUCCESS", "发送成功", mailCode))
    } else {
      let code = Math.floor(Math.random() * (10000 - 1)) + 1
      MAILER.sendCode(mail, code).then(data => {
        res.send(RESPONSE("SUCCESS", "发送成功", null))
      }).catch(err => {
        res.send(RESPONSE("ERROR", "发送失败"))
      })
    }
  }).catch(err => {
    res.send(RESPONSE("ERROR", "邮箱验证码容器出错"))
  })
}

module.exports = {
  sendMailCode
}