/*
 * @Autor: huasenjio
 * @Date: 2021-08-21 21:07:58
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-03-19 20:18:31
 * @Description: 
 */
const mongoose = require("mongoose"); // 引入数据库模块
const config = require('../config.js') // 配置文件
mongoose.set("useCreateIndex", true); // 配置设置
// 连接配置
mongoose.connect(
  `mongodb://${config.dbConfig.name}:${config.dbConfig.password}@${config.dbConfig.ip}:${config.dbConfig.port}/${config.dbConfig.dbName}?authSource=${config.dbConfig.dbName}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.on("error", (err) => {
  console.log("数据库连接错误", err);
});
db.once("open", () => {
  console.log("mongodb   --> 27017");
});
