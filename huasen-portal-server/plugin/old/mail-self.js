/*
 * @Autor: huasenjio
 * @Date: 2022-02-03 12:12:09
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-02-03 16:58:46
 * @Description: 利用内存存储邮箱验证码，存在当服务刷新后验证码将会丢失的弊端，所以采用redis缓存的方式
 */
const nodemailer = require("nodemailer");
const config = require("../config.js")

const transporter = nodemailer.createTransport(config.qqMailConfig); // 创建发送邮箱对象
class Mailer {
  constructor() {
    this.mailBox = [] // 利用存储邮箱验证码
  }
  // 保存
  saveCode(mail, code) {
    // 判断是否存在
    let isExt = this.mailBox.find(item => {
      return item.mail == mail
    })
    // 添加验证码
    if (!isExt) {
      this.mailBox.push({
        mail,
        code,
        time: Date.now() // 当前时间戳
      })
    }
  }
  // 发送邮箱验证码
  sendCode(mail, code) {
    return new Promise((resolve, reject) => {
      transporter.sendMail(
        {
          from: `花森提示 <${config.qqMailConfig.auth.user}>`, // 发送方信息
          to: mail, // 接受者QQ邮箱地址
          subject: "花森主页：n.huasen.cc", // 标题
          text: `邮箱验证码：${code}`, // 文本信息或者html信息
        },
        (err, data) => {
          if (!err) {
            this.saveCode(mail, code) // 存储验证码
            resolve(data);
          } else {
            reject(err);
          }
        }
      );
    });
  }
  // 删除验证码
  removeCodeByMail(mail) {
    this.mailBox.map((item, index) => {
      if (item.mail == mail) {
        this.mailBox.splice(index, 1) // 删除邮箱验证码
      }
    })
  }

  // 查找验证码
  findCodeByMail(mail) {
    let targetObj = this.mailBox.find(item => {
      return item.mail == mail
    })
    return targetObj
  }
  // 每隔一分钟扫描过期的验证码
  mailTask() {
    if (this.mailBox.length != 0) {
      let isOut = Date.now() - this.mailBox[0].time;
      // 是否已经超过5分钟有效期
      if (isOut >= 300000) {
        this.mailBox.shift()
      }
    }
  }
}

module.exports = new Mailer();
