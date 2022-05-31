/*
 * @Autor: huasenjio
 * @Date: 2021-08-21 21:07:58
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-18 01:07:27
 * @Description: 
 */

// 引入mongoose模块
const mongoose = require("mongoose");
let NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [4, "长度不小于4"],
    maxlength: [20, "长度不大于20"],
    required: true
  },
  // 发布者
  publisher: {
    type: String,
    required: true
  },
  // 权限码(0-3)
  code: {
    type: Number,
    required: true,
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
  // 文章标签
  tag: {
    type: String,
    validate: {
      validator: function (desc) {
        try {
          let temp = desc.split(/[\/|\\]/)
          return temp.every((item) => {
            return item !== ""
          })
        } catch (err) {
          return false
        }
      },
      message: '请输入a/b/c格式的字符',
    }
  },
  // 最后修改时间
  time: {
    type: String,
    default: "1970-01-01",
    validate: {
      validator: function (desc) {
        try {
          let t = new Date(desc)
          if (typeof t.getTime() == 'number') return true
        } catch (err) {
          return false
        }
      },
      message: '请输入大于0的订阅数',
    }
  },
  // 是否草稿
  isDraft: {
    type: Boolean,
    default: false
  },
  // 文章内容
  content: {
    type: String,
    default: ""
  },
  bannerImg: {
    type: String,
    default: ""
  },
});

const News = mongoose.model("news", NewsSchema);
module.exports = News;
