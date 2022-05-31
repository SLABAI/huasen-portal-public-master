/*
 * @Autor: huasenjio
 * @Date: 2022-02-03 17:37:16
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-03-21 15:40:37
 * @Description: 精灵图中间件
 */
const path = require("path");
const fs = require("fs")
const MIXTUREUPLOAD = require("../plugin/mixture-upload.js");
const RESPONSE = require("../utils/response-handle.js");


async function processSpriteIconFile(req, res, next) {
  // 查找图标文件夹下所有的图片
  let fileNames = await fs.promises.readdir(path.resolve(process.cwd(), "../huasen-public-icon"))
  const mixtrueUploader = new MIXTUREUPLOAD({
    req,
    res,
    next,
    uploadPath: path.resolve(process.cwd(), "../huasen-public-icon"),
    acceptTypes: [
      "png",
    ],
    // 自定义名字
    fileName: function (file) {
      // 使用原始文件原始名字
      return file.originalFilename
    },
    // 文件过滤
    filesFilter: function (file) {
      // 判断是否已经存在同名图标
      if (fileNames.includes(file.originalFilename)) {
        res.send(RESPONSE("ERROE", "已存在同名图标"));
        return false
      } else {
        return true
      }
    },
    // 检测错误（强烈推荐）
    onError: function (err) {
      if (err.tag == "CONFIG_ERROR") {
        res.send(RESPONSE("ERROE", err.msg));
      } else if (err.tag == "fileLength") {
        res.send(RESPONSE("ERROE", err.msg));
      } else if (err.tag == "maxFieldsSize") {
        res.send(RESPONSE("ERROE", err.msg));
      } else if (err.tag == "maxFields") {
        res.send(RESPONSE("ERROE", err.msg));
      } else {
        console.log(err)
      }
    },
    // 必须
    onSuccess: function (body, files) {
      next()
    }
  });
}

module.exports = {
  processSpriteIconFile
}
