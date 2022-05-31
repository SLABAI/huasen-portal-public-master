/*
 * @Autor: huasenjio
 * @Date: 2021-10-04 15:09:29
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-23 21:39:08
 * @Description: 基于redis的token管理器
 */
const jwt = require("jsonwebtoken"); // 引入JWT模块
const config = require("../config.js")
const { redisClient, setRedisItem, getRedisItem, delRedisItem } = require("./redis.js")

class Jwter {
  constructor() {
    this.expire = config.jwtConfig.expiresIn // token生存时间 
  }
  /**
   * 注册token，重复生成仅仅会覆盖token，不会延长token的生存时间
   * @param   {String}  key     存入redis的键
   * @param   {Object}  payload 包含id的参数
   * @returns {String}  token   生成的token    
   */
  createToken(key, payload = {}) {
    return new Promise((resolve, reject) => {
      if (!key && typeof key != "string") reject()
      // 注册token
      let token = jwt.sign(payload, config.jwtConfig.screat)
      setRedisItem(key, token, this.expire).then(status => {
        resolve(token)
      }).catch(err => {
        reject({
          tag: "ERROR",
          code: 0,
          msg: "身份校验池异常",
          data: err
        })
      })
    })
  }
  /**
   * 校验token合法性
   * @param {Sting} token 
   * @returns 
   */
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      // 1.校验token合法性
      // 2.判断token是否过期
      // 3.成功解析后延长token生存时间
      jwt.verify(token, config.jwtConfig.screat, (err, data) => {
        if (!err) {
          // token合法
          let key = data.key
          // 若token已过期，则返回null，未过期则重置生存时间
          getRedisItem(key, this.expire).then(val => {
            if (val) {
              resolve({
                tag: "SUCCESS",
                code: 1,
                msg: "身份校验合格",
                data
              });
            } else {
              reject({
                tag: "TIMEOUT",
                code: 0,
                msg: "身份已过期",
                data: null
              });
            }
          }).catch(err => {
            reject({
              tag: "ERROR",
              code: 0,
              msg: "身份校验池异常",
              data: err
            });
          })
        } else {
          // 不合法
          reject({
            tag: "ILLEGAL",
            code: 0,
            msg: "身份非法",
            data: err
          });
        }
      });
    });
  }
}

module.exports = new Jwter();
