/*
 * @Autor: huasenjio
 * @Date: 2021-08-21 21:07:58
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-02-15 21:12:22
 * @Description: 用户表
 */
const mongoose = require("mongoose");
// 创建schema实例表对象
let UserSchema = new mongoose.Schema({
  // 登陆邮箱
  id: {
    type: String,
    required: [true, "必需项"],
    minlength: [5, "账号长度不小于5"],
    maxlength: [20, "账号长度不大于50"],
    trim: [true, "剔除前后空格"],
    unique: [true, "唯一"],
  },
  // 登陆密码
  password: {
    type: String,
    required: true,
    minlength: [5, "密码长度不小于5"],
    maxlength: [50, "密码长度不大于50"],
    trim: [true, "剔除前后空格"],
  },
  // 昵称
  name: {
    type: String,
    default: "酱粉",
    minlength: [2, "昵称长度不小于2"],
    maxlength: [20, "昵称长度不大于20"],
  },
  // 头像
  headImg: {
    type: String,
    default: "",
  },
  // 配置
  config: {
    type: String,
    default: "{}",
    validate: {
      validator: function (desc) {
        try {
          let temp = JSON.parse(desc)
          if (typeof temp == "object" && !Array.isArray(temp)) {
            return true
          }
        } catch (err) {
          return false
        }
      },
      message: '请输入{}格式的JSON',
    }
  },
  // 权限码(0-3)
  code: {
    type: Number,
    default: 0,
    validate: {
      validator: function (desc) {
        try {
          if (!Number.isInteger(desc)) false
          if (desc > 3 || desc < -1) return false
          return true
        } catch (err) {
          return false
        }
      },
      message: '请输入0-3范围的权限码',
    }
  },
  // 收录的网站
  record: {
    type: String,
    default: "[]",
    validate: {
      validator: function (desc) {
        if (desc === "") return false
        try {
          let temp = JSON.parse(desc)
          if (!Array.isArray(temp)) {
            return false
          } else {
            return temp.every((item) => {
              return typeof item == 'object' && !Array.isArray(item)
            })
          }

        } catch (err) {
          return false
        }
      },
      message: '请输入[{},{}]格式的JSON',
    }
  },
  // 账号是否可用
  enabled: {
    type: Boolean,
    default: true
  },
  // 代办事宜
  todoList: {
    type: String,
    default: "[]",
    validate: {
      validator: function (desc) {
        if (desc === "") return false
        try {
          let temp = JSON.parse(desc)
          if (!Array.isArray(temp)) {
            return false
          } else {
            return temp.every((item) => {
              return typeof item == 'object' && !Array.isArray(item)
            })
          }

        } catch (err) {
          return false
        }
      },
      message: '请输入[{},{}]格式的JSON',
    }
  },
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
