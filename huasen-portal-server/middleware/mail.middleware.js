/*
 * @Autor: huasenjio
 * @Date: 2021-10-05 11:49:48
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-02-04 10:28:44
 * @Description: 邮箱验证码中间件
 */

const MAILER = require("../plugin/mail.js");
const { checkParamsByRules } = require("../utils/tool.js")
const RESPONSE = require("../utils/response-handle.js")

// 校验参数是否合法
function checkMailAddress(req, res, next) {
  let { mail } = req.body
  let errText = checkParamsByRules([
    {
      value: mail,
      rules: [
        {
          strategy: 'minLength：5', errMsg: '邮箱请长度不小于5'
        },
        {
          strategy: 'maxLength：20', errMsg: '邮箱请长度不大于20'
        },
        {
          strategy: 'isEmail', errMsg: '请输入邮箱'
        },
      ]
    }
  ])
  if (!errText) {
    next()
  } else {
    res.send(RESPONSE("OK", errText))
  }
}

function judgeMailCodeValidity(req, res, next) {
  // 解析邮箱
  let mail = req.baseUrl == "/user" ? req.body.id : req.body.aid
  // 解析验证码参数
  let mailCode = req.body.mailCode
  MAILER.findCodeByMail(mail).then(code => {
    // 判定验证码正确放行
    if (code && code == mailCode) {
      next();
    } else {
      res.send(RESPONSE("OK", "邮箱验证码不正确"));
    }
  }).catch(err => {
    res.send(RESPONSE("ERROR", "邮箱验证码容器出错"));
  });
}

module.exports = {
  checkMailAddress,
  judgeMailCodeValidity
}