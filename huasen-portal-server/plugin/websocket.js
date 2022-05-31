/*
 * @Autor: huasenjio
 * @Date: 2022-03-24 22:42:23
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-01 01:07:13
 * @Description: 
 */
const WebSocketServer = require('ws').Server
const os = require('os');
const fs = require("fs")
const path = require('path')
const readline = require('readline');
const osUtils = require("os-utils");
const DiskInfo = require('node-disk-info')
const { readFileByLine } = require('../utils/tool.js')
const { wsConfig } = require('../config.js')
const moment = require('moment');
const Admin = require("../db/model/admin.js")
const TOKENER = require("../plugin/jwt.js")

let currCPU = 0

class WsServer {
  constructor() {
    this._ws = null // ws实例对象
    this._port = wsConfig.port
    this._interva = null
    this._intervalTime = wsConfig.interval

    this._server = null // websocket服务

    this.init()
    this.initCPUData()
  }
  init() {
    this._ws = new WebSocketServer({ port: this._port });
    this._ws.on('connection', (server, req) => {
      // 增加认证机制
      let token = req.url.split('?')[1].split('=')[1]
      TOKENER.verifyToken(token)
        .then((tokenInfo) => {
          Admin.find({ aid: tokenInfo.data.key })
            .then((lists) => {
              if (lists.length > 0) {
                // 定时器定时返回数据
                this._server = server
                this._interva = setInterval(() => {
                  this.sendData(server);
                }, this._intervalTime);
                server.on('close', () => {
                  clearInterval(this._interva);
                  this._server = null
                });
                server.on('error', () => {
                  clearInterval(this._interva);
                  this._server = null
                })
                server.on('message', (message) => {
                  this.receiveData(message)
                });
              }
            })
        })
        .catch((err) => {
          server.close()
        });
    })

  }
  // 发送消息
  async sendData(ws) {
    let data = await this.updater()
    ws.send(JSON.stringify(data))
  }
  async updater() {
    try {
      let data = {
        serverInfo: {}, // 服务器信息
        requestInfo: [] // 用户请求信息
      }
      // 系统信息
      let freeMem = os.freemem() / 1024 / 1024 / 1024;
      let totalMem = os.totalmem() / 1024 / 1024 / 1024;
      // 磁盘信息
      let disks = DiskInfo.getDiskInfoSync().map((item) => {
        return {
          diskUsage: item.capacity,
          diskName: item.mounted,
          diskUsed: item.used,
          diskFree: item.available,
          diskTotal: item.blocks
        }
      })
      data.serverInfo.cpuUsage = (currCPU * 100.0).toFixed(2) + "%" // cpu占有率
      data.serverInfo.freeMem = freeMem.toFixed(2) + "G" // 空闲内存
      data.serverInfo.usedMem = (totalMem - freeMem).toFixed(2) + "G" // 已使用的内容
      data.serverInfo.totalMem = totalMem.toFixed(2) + "G" // 总内存
      data.serverInfo.MemUsage = ((totalMem - freeMem) / totalMem * 100.0).toFixed(2) + "%" // 内存占有率
      data.serverInfo.disks = disks // 磁盘信息数组

      // 处理记录日志
      let filePath = path.resolve(process.cwd(), `./log/fatal.${moment().format('YYYYMMDD')}.log`)
      if (fs.existsSync(filePath)) {
        let lines = await readFileByLine(filePath)
        lines.map(line => {
          let temps = line.split(' [FATAL] fatal - ')
          let time = temps[0].replace(/(\[|\])/g, '')
          let paramsArr = temps[1].split(' ^_^ ')
          let param = {}
          paramsArr.map(item => {
            let p = item.split('=')
            param[p[0]] = p[1]
          })
          data.requestInfo.push({
            time,
            ...param
          })
        })
      }
      return data
    } catch (err) {
      console.error(err)
      return {
        serverInfo: {}, // 服务器信息
        requestInfo: [] // 用户请求信息
      }
    }
  }
  // 初始化cpu参数
  initCPUData() {
    setTimeout(() => {
      osUtils.cpuUsage((value) => {
        currCPU = value;
        this.initCPUData();
      });
    }, 0);
  }
  receiveData(msg) { }
}

module.exports = new WsServer()