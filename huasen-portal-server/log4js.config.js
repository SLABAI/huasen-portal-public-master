/*
 * @Autor: huasenjio
 * @Date: 2021-10-30 12:42:11
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-01 00:08:52
 * @Description: 
 */
module.exports = {
  // 输出配置
  appenders: {
    consoleOut: {
      "type": "console",
    },
    infoFileOut: {
      type: "dateFile",
      filename: "log/run",
      pattern: "yyyyMMdd.log",
      encoding: 'utf-8',
      alwaysIncludePattern: true,
    },
    errorFileOut: {
      type: 'file',
      filename: "log/error.log",
      encoding: 'utf-8',
      maxLogSize: 1024 * 1024 * 8, //最大文件大小，按字节计算 1024 * 1024 * 8 = 8M 
      backups: 10, //文件保留数量 
      keepFileExt: true,
      compress: false
    },
    warnFileOut: {
      type: 'file',
      filename: "log/warn.log",
      encoding: 'utf-8',
      maxLogSize: 1024 * 1024 * 8, //最大文件大小，按字节计算 1024 * 1024 * 8 = 8M 
      backups: 10, //文件保留数量 
      keepFileExt: true,
      compress: false
    },
    fatalFileOut: {
      type: 'dateFile',
      filename: "log/fatal",
      pattern: "yyyyMMdd.log",
      encoding: 'utf-8',
      alwaysIncludePattern: true,
    }
  },
  // 日志分类，level设置日志记录级别，记录当前级别及以后 ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF。调试时可以设置为all，线上可设置为INFO
  "categories": {
    default: { appenders: ['consoleOut'], level: 'all' },
    info: { appenders: ['infoFileOut'], level: 'info' },
    error: { appenders: ['errorFileOut'], level: 'error' },
    warn: { appenders: ['warnFileOut'], level: 'warn' },
    fatal: { appenders: ['fatalFileOut'], level: 'fatal' },
  },
  // 若您的 app 使用了 pm2，则这里必须设置为true，否则日志将不会工作（另外您还得下载 pm2-intercom作为 pm2模块: pm2 install pm2-intercom）
  "pm2": true,
  // "pm2InstanceVar": 'INSTANCE_ID', // (默认 ‘NODE_APP_INSTANCE’)：// 如果您使用pm2并更改了默认名称，则这里必须要设置
  // "disableClustering": true,  // 使用的 log4js 忽略集群环境（clustered environments）或者你在 pm2 日志中遇到了麻烦。每一个工作进程都将进行自己的日志记录，请小心使用这里如果你要把日志记录输出到文件
};