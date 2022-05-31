/*
 * @Autor: huasenjio
 * @Date: 2021-10-08 00:21:44
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-02-21 01:32:27
 * @Description: 
 */
const mongoose = require("mongoose");
// 创建schema实例表对象
let AdminSchema = new mongoose.Schema({
  // 登陆邮箱
  aid: {
    type: String,
    required: [true, "必需项"],
    minlength: [5, "账号长度不小于5"],
    maxlength: [20, "账号长度不大于20"],
    trim: [true, "剔除前后空格"],
    unique: [true, "唯一"],
  },
  // 密码
  password: {
    type: String,
    required: true,
    minlength: [5, "密码长度不小于5"],
    maxlength: [50, "密码长度不大于20"],
    trim: [true, "剔除前后空格"],
  },
  // 昵称
  name: {
    type: String,
    default: "花酱罐",
    minlength: [2, "昵称长度不小于2"],
    maxlength: [20, "昵称长度不大于10"],
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
  // 导航
  site: {
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
  // 权限码(0-3)
  code: {
    type: Number,
    default: 3,
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
  // 趣物
  toy: {
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
  // 资源
  resource: {
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
  // 公告
  notice: {
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
  // 订阅数
  take: {
    type: Number,
    default: 0,
    validate: {
      validator: function (desc) {
        try {
          if (!Number.isInteger(desc)) false
          if (desc < 0) {
            return false
          } else {
            return true
          }
        } catch (err) {
          return false
        }
      },
      message: '请输入大于0的订阅数',
    }
  },
  takeAbled: {
    type: Boolean,
    default: false,
  }

});

const Admin = mongoose.model("admins", AdminSchema);
module.exports = Admin;
