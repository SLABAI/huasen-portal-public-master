/*
 * @Autor: huasenjio
 * @Date: 2021-08-21 21:07:58
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-01 00:09:33
 * @Description: 程序入口文件
 */
const express = require("express");
const path = require("path");

const app = express(); // 初始化后台服务
const db = require("./db/db.js"); // 数据库连接
const ws = require('./plugin/websocket.js') // websocket
const { MODE } = require("./config.js")
const schedule = require("./schedule/task.js") // 定时任务

// 增添session和cookie机制
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(session({
  secret: "huasenjio",
  cookie: { maxAge: 60 * 60 * 1000 * 24 * 7 },
  resave: true,
  saveUninitialized: false,
}));

// log日志
const log4js = require('log4js');
const log4jsConfig = require("./log4js.config.js")
// 传入配置对象
log4js.configure(log4jsConfig)
// 获得日志对象
const loggerOfInfo = log4js.getLogger('info')
const loggerOfError = log4js.getLogger('error')
const loggerOfWarn = log4js.getLogger('warn')
const loggerOfFatal = log4js.getLogger('fatal')
// 绑定console对象的方法
console.info = loggerOfInfo.info.bind(loggerOfInfo) // 项目中任何地方输入console.info输出的内容将会被日志捕获，并输出于log/run.xxx.log
console.error = loggerOfError.error.bind(loggerOfError) // 项目中任何地方输入console.error输出的内容将会被日志捕获，并输出于log/error.log
console.warn = loggerOfWarn.warn.bind(loggerOfWarn) // 项目中任何地方输入console.error输出的内容将会被日志捕获，并输出于log/warn.log
app.use(log4js.connectLogger(loggerOfInfo, { level: 'info' }))
app.use(log4js.connectLogger(loggerOfError, { level: 'error' }))
app.use(log4js.connectLogger(loggerOfWarn, { level: 'warn' }))
app.use(log4js.connectLogger(loggerOfFatal, { level: 'fatal' }))

// 解决cors跨域问题
const cors = require("cors"); // cors跨域插件
app.use(cors());

// 请求体解析器
const bodyparser = require("body-parser");
app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: false }));


// 引入用户路由
const userRouter = require("./router/user.router");
const mailRouter = require("./router/mail.router")
const adminRouter = require("./router/admin.router")
const newsRouter = require("./router/news.router")
const spriteRouter = require("./router/sprite.router")
// 全局拦截
app.use("/", (req, res, next) => {
  loggerOfFatal.fatal(`method=${req.method} ^_^ url=${req._parsedUrl.pathname} ^_^ ip=${req.headers['x-forwarded-for']} ^_^ host=${req.headers['x-forwarded-host']} ^_^ referer=${req.headers.referer}`)
  next()
})
app.use("/user", userRouter);
app.use("/mail", mailRouter);
app.use("/admin", adminRouter);
app.use("/news", newsRouter);
app.use("/sprite", spriteRouter);

// 配置静态资源目录
app.use("/public", express.static(path.join(__dirname, "./public")));
app.use("/huasen-public-static", express.static(path.join(__dirname, "../huasen-public-static")));

app.listen(3000, () => {
  console.log("express   --> 3000");
});

process.on('uncaughtException', function (err) {
  if (err && err.code == 'ECONNREFUSED') {
    console.error("连接拒绝", err);
  } else {
    process.exit(1);
  }
  console.error("未捕获的异常", err);
});