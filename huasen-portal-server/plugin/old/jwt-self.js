/*
 * @Autor: huasenjio
 * @Date: 2022-02-03 12:12:14
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-02-03 16:59:01
 * @Description: 基于内存自制token缓存管理，存在当服务刷新后token将会丢失的弊端，所以采用redis缓存的方式
 */
const jwt = require("jsonwebtoken"); // 引入JWT模块
const config = require("../config.js")

class Jwter {
  constructor() {
    this.tokenBox = [] // 利用内存存储token
  }
  // 创建token
  createToken(payload) {
    let tokenObj = this.tokenBox.find(item => {
      return item.id == payload.id
    })
    if (tokenObj) {
      return tokenObj.token
    } else {
      let token = jwt.sign(payload, config.jwtConfig.screat)
      this.tokenBox.push({ token, id: payload.id, outTime: Date.now() })
      return token;
    }
  }
  // 校验token并且自动延长过期时间
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      // 1.判断token是否合法性
      jwt.verify(token, config.jwtConfig.screat, (err, data) => {
        if (!err) {
          // 2.判断是否可用
          let tokenObjIndex = undefined;
          let tokenObj = this.tokenBox.find((item, index) => {
            if (item.token == token) {
              tokenObjIndex = index
              return true
            }
          })
          if (tokenObj) {
            this.tokenBox[tokenObjIndex].outTime = Date.now()
            resolve({
              tag: "SUCCESS",
              code: 1,
              msg: "校验通过",
              data
            });
          } else {
            reject({
              tag: "TIMEOUT",
              code: 0,
              msg: "token已经过期",
              data: null
            });
          }
        } else {
          reject({
            tag: "ERROR",
            code: 0,
            msg: "token异常",
            data: null
          });
        }
      });
    });
  }
  tokenTask() {
    if (this.tokenBox.length != 0) {
      this.tokenBox.sort((a, b) => {
        return b.outTime - a.outTime
      })
      let isOutTime = Date.now() - this.tokenBox[0].outTime;
      // 是否已经超过60分钟有效期
      if (isOutTime >= 1000 * 60 * 5) {
        this.tokenBox.shift()
      }
    }
  }

}

module.exports = new Jwter();
