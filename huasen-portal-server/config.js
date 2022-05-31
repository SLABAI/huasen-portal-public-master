/*
 * @Autor: huasenjio
 * @Date: 2021-10-04 11:39:03
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-06-01 00:08:05
 * @Description: 后端服务配置文件
 */

const path = require("path")

// 环境变量 dev | pro
let MODE = process.argv.find((row) => {
  return /^MODE=/.test(row)
}).split("=")[1]

// Mongodb数据库连接配置
const dbConfig = {
  name: "name", // 用户名
  password: "password", // 用户密码
  ip: "127.0.0.1", // 数据库地址
  port: 27017, // 端口
  dbName: "huasen" // 数据库名
}

// websocket配置
const wsConfig = {
  port: 9191, // 启动端口
  interval: 10000 // 10秒发送一次数据
}

// redis配置
const redisConfig = {
  port: 6379,
  host: "127.0.0.1",
  password: 'redis密码'
}

// QQ邮箱配置
const qqMailConfig = {
  host: "smtp.qq.com", // QQ邮箱厂商
  port: 465,
  secure: true,
  auth: {
    user: "932397243@qq.com", // 发送方邮箱地址
    pass: "", //  mtp的通行码
  },
}
// 网易邮箱配置
const wyMailConfig = {
  host: "smtp.163.com",
  port: 465,
  secure: true,
  auth: {
    user: "",
    pass: "",
  },
}

// token配置
const jwtConfig = {
  screat: "12345678", // jwt加密密钥
  expiresIn: 604800, // 7天失效时间
}

// 文件上传配置
const fileConfig = {
  // 文件默认允许的类型
  acceptTypes: [
    "jpg",
    "jpeg",
    "json",
    "png",
    "mp4",
    "mp3",
    "pdf",
    "gif",
    "text",
    "html",
    "js",
    "css",
    "java",
    "dmg",
    "exe",
    'svg+xml'
  ],
  fileSize: 1024 * 1024 * 10, // 限制10m大小
  target: "file", // 获取前端上传文件的key值
  encoding: "utf-8", // 传输的编码格式
  maxFieldsSize: 1024 * 1024 * 2, // 传输类型为text的字段的大小默认不超过2m
  maxFields: 1000, // 默认支持1000个字段的解析
  maxFilesSize: 1024 * 1024 * 10, // 传输类型为file文件的大小不超过5m
  autoFiles: true, //控制是否可以上传文件
  uploadPath: path.resolve(__dirname, "../huasen-public-static/admin")// 默认上传文件路径
}

// task配置
const taskConfig = {
  interval: 10000 // 任务执行的时间间隔
}

module.exports = {
  MODE,
  dbConfig,
  redisConfig,
  qqMailConfig,
  wyMailConfig,
  jwtConfig,
  fileConfig,
  taskConfig,
  wsConfig
}