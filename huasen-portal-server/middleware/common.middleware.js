/*
 * @Autor: huasenjio
 * @Date: 2021-10-08 16:30:57
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-08 00:53:23
 * @Description: 公共中间价
 */
const Validator = require("../utils/strategy.js")
const fs = require('fs')
const path = require("path")

const { decrypt, encrypt } = require("../utils/aes.js")

const MAILER = require("../plugin/mail.js")
const TOKENER = require("../plugin/jwt.js")
const RESPONSE = require("../utils/response-handle.js")

// 合并query和body的参数
function mergeParams(req, res, next) {
  req.body = Object.assign(req.body, req.query)
  req.query = req.body;
  next()
}

// 密码加密
function encryptPassword(req, res, next) {
  let { password } = req.body
  req.body.password = typeof password == "string" ? encrypt(req.body.password) : req.body.password
  next()
}

// 新旧密码比对，若密码变动，则加密入库
function judgeSamePassword(req, res, next) {
  let { password, oldPassword } = req.body
  req.body.password = password === oldPassword ? password : encrypt(req.body.password)
  next()
}

// 随机生成头像
async function handleHeadImg(req, res, next) {
  let { headImg } = req.body
  if (!headImg) {
    let files = await fs.promises.readdir(path.resolve(process.cwd(), "./public/default/headImg"));
    let headImgs = files.filter(item => {
      return /\.png$/.test(item)
    })
    let readomIndex = Math.round(Math.random() * (headImgs.length - 1)) // 0-10
    req.body.headImg = `public/default/headImg/${headImgs[readomIndex]}`
  }
  next()
}

module.exports = {
  mergeParams,
  encryptPassword,
  judgeSamePassword,
  handleHeadImg
}