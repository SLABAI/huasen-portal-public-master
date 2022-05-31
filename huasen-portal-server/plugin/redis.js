/*
 * @Autor: huasenjio
 * @Date: 2022-02-02 20:06:32
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-04 00:42:15
 * @Description:
 */

const redis = require("redis")
const { redisConfig } = require("../config.js")
const redisOptions = {
  socket: {
    port: redisConfig.port,
    host: redisConfig.host
  },
  password: redisConfig.password,
  retry_strategy: function (options) {
    if (options.error.code === 'ECONNREFUSED') { }
    if (options.times_connected > 10) { }
    return Math.max(options.attempt * 100, 3000);
  }
}

let redisClient = redis.createClient(redisOptions)
redisClient.connect().then((msg) => {
  console.log(`redis     --> ${redisConfig.port}`)
})
redisClient.on("error", function (err) {
  console.log(err)
  throw err
});

// 初始化redis连接
function initRedis() {
  return new Promise((resolve, reject) => {
    try {
      let redisEx = redis.createClient(redisOptions)
      redisEx.connect().then((msg) => {
        resolve(redisEx)
      })
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * 封装拓展redis的set方法
 * @param {String}  key     键
 * @param {}        value   值（对象｜字符串）
 * @param {Number}  expire  过期时间（60 = 60秒）
 */
function setRedisItem(key, value, expire) {
  return new Promise((resolve, reject) => {
    if (!key) reject()
    if (typeof key != "string") reject()
    if (!value) reject()
    let val = typeof value == "string" || typeof value == "number" ? value : JSON.stringify(value)
    if (expire && Number.isInteger(expire)) {
      redisClient.set(key, val).then(info => {
        redisClient.expire(key, expire).then(result => {
          resolve(true)
        }).catch(error => {
          reject(error)
        })
      }).catch(err => {
        reject()
      })
    } else {
      // 没有设置时间
      redisClient.set(key, val).then(res => {
        resolve(true)
      }).catch(err => {
        reject(err)
      })
    }
  })
}

/**
 * 获取redis中的键值对
 * @param {String} key    键
 * @param {String} expire 更新生存时间
 */
function getRedisItem(key, expire) {
  return new Promise((resolve, reject) => {
    if (!key) reject()
    if (typeof key != "string") reject()
    redisClient.get(key).then(value => {
      try {
        resolve(JSON.parse(value))
      } catch (err) {
        resolve(value)
      } finally {
        if (value && expire && Number.isInteger(expire)) {
          // 更新生存时间
          redisClient.expire(key, expire)
        }
      }
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 删除redis中的键
 * @param {String} key 键
 */
function delRedisItem(key) {
  return new Promise((resolve, reject) => {
    if (!key) reject()
    if (typeof key != "string") reject()
    redisClient.del(key).then(count => {
      resolve(count)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = {
  redisClient,
  initRedis,
  setRedisItem,
  getRedisItem,
  delRedisItem
}