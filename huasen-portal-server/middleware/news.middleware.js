/*
 * @Autor: huasenjio
 * @Date: 2021-10-27 22:00:47
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-18 01:07:45
 * @Description: 
 */

const path = require('path')
const { checkParamsByRules } = require("../utils/tool.js")
const RESPONSE = require("../utils/response-handle.js");
const MIXTUREUPLOAD = require("../plugin/mixture-upload.js");

// 校验参数是否合法
function checkNewsParams(req, res, next) {
  let { title, publisher, code } = req.body
  let errText = checkParamsByRules([
    {
      value: title,
      rules: [
        {
          strategy: 'isNotEmpty', errMsg: '请输入标题'
        },
        {
          strategy: 'minLength：4', errMsg: '标题请长度不小于4'
        },
        {
          strategy: 'maxLength：20', errMsg: '标题请长度不大于20'
        },
      ]
    },
    {
      value: publisher,
      rules: [
        {
          strategy: 'isNotEmpty', errMsg: '请输入发布者'
        }
      ]
    },
    {
      value: code,
      rules: [
        {
          strategy: 'isNotEmpty', errMsg: '请输入发布者'
        },
        {
          strategy: 'isNumber', errMsg: '访问权限码必须是数字'
        }
      ]
    }
  ])

  if (!errText) {
    next()
  } else {
    res.send(RESPONSE("OK", errText))
  }
}

module.exports = {
  checkNewsParams,
}