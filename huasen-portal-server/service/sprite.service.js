/*
 * @Autor: huasenjio
 * @Date: 2022-02-03 17:42:34
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-23 21:03:36
 * @Description: 精灵图相关服务
 */
const path = require("path")
const fs = require("fs")
const compressing = require('compressing');
const RESPONSE = require("../utils/response-handle.js")
const { commandSpawn } = require("../utils/terminal")
const { streamPipe, unlinkFile, readFileByLine } = require("../utils/tool.js")

// 获取图标文件夹中的文件集合，解析sprite.css样式中的文件集合，取交集返回
function findAllSpriteIcon(req, res, next) {
  readFileByLine(path.resolve(process.cwd(), "./public/webapp/sprite.css")).then(async lines => {
    let cssFileNames = []
    lines.map(item => {
      let tag = item.match(/^\.icon-hs-[a-zA-Z0-9]+/)
      if (tag) {
        cssFileNames.push(`${tag[0].split("-")[2]}.png`)
      }
    })
    let files = await fs.promises.readdir(path.resolve(process.cwd(), "../huasen-public-icon"));
    let temp = new Set([...files].filter((item) => cssFileNames.includes(item))) // 交集
    res.send(RESPONSE("SUCCESS", "查询精灵图成功", [...temp]))
  }).catch(err => {
    res.send(RESPONSE("ERROR", "查询精灵图失败"))
  })
}
// 编译图标文件夹中的文件，输出sprite.css和sprite.png文件
function compileSpriteIcon(req, res, next) {
  let command = process.platform == 'win32' || process.platform == 'win64' ? 'npm.cmd' : 'npm'
  let dir = path.resolve(process.cwd(), "./")
  // npm run sprite
  commandSpawn(command, ['run', 'sprite'], { cwd: dir })
    .then(async result => {
      // 编译成功，整合样式图片
      let cssFile = path.resolve(process.cwd(), "./public/webapp/sprite.css")
      let pngFile = path.resolve(process.cwd(), "./public/webapp/sprite.png")
      // 开发环境
      await streamPipe(cssFile, path.resolve(process.cwd(), "../huasen-portal-admin/public/css/sprite/sprite.css"))
      await streamPipe(cssFile, path.resolve(process.cwd(), "../huasen-portal/public/css/sprite/sprite.css"))
      await streamPipe(pngFile, path.resolve(process.cwd(), "../huasen-portal-admin/public/css/sprite/sprite.png"))
      await streamPipe(pngFile, path.resolve(process.cwd(), "../huasen-portal/public/css/sprite/sprite.png"))
      // 生产环境
      await streamPipe(cssFile, path.resolve(process.cwd(), "./public/webapp/admin/css/sprite/sprite.css"))
      await streamPipe(cssFile, path.resolve(process.cwd(), "./public/webapp/portal/css/sprite/sprite.css"))
      await streamPipe(pngFile, path.resolve(process.cwd(), "./public/webapp/admin/css/sprite/sprite.png"))
      await streamPipe(pngFile, path.resolve(process.cwd(), "./public/webapp/portal/css/sprite/sprite.png"))
      res.send(RESPONSE("SUCCESS", "编译成功"))
    }).catch(err => {
      // 编译失败
      res.send(RESPONSE("ERROR", "编译成功"))
    })
}
// 上传图标文件
function uploadSpriteIcon(req, res, next) {
  let files = Object.values(req.files) // 获取上传文件的所有标识（键值对），值可能是对象也可能是数组
  if (files.length != 0) {
    // 扁平化数据
    let flatFiles = []
    files.forEach(item => {
      if (Array.isArray(item)) {
        flatFiles = [...flatFiles, ...item]
      } else {
        flatFiles.push(item)
      }
    });
    let resultFiles = flatFiles.map((item => {
      return {
        fieldName: item.fieldName,
        originalFilename: item.originalFilename,
        url: item.path,
        size: item.size,
        type: item.headers['content-type']
      }
    }))
    res.send(RESPONSE("SUCCESS", "上传成功", resultFiles));
  } else {
    res.send(RESPONSE("OK", "未捕获到文件信息"));
  }
}
// 删除图标文件中的文件
function deleteSpriteIcon(req, res, next) {
  let { filePath } = req.body
  let dirPath = path.resolve(process.cwd(), `../huasen-public-icon/${filePath}`)
  unlinkFile(dirPath).then(tips => {
    res.send(RESPONSE("SUCCESS", tips))
  }).catch(err => {
    res.send(RESPONSE("ERROR", err))
  })
}
// 压缩后下载全部图标
function downloadSpriteIcon(req, res, next) {
  let spriteIconPath = path.resolve(process.cwd(), '../huasen-public-icon')
  let spriteIconOutputPath = path.resolve(process.cwd(), './public/compress/spriteIcon.zip')
  compressing.zip.compressDir(spriteIconPath, spriteIconOutputPath).then(() => {
    res.send(RESPONSE("SUCCESS", '准备下载', 'public/compress/spriteIcon.zip'))
  }).catch((err) => {
    res.send(RESPONSE("ERROR", '压缩失败'))
  });
}
// 解压
function unconpressSpriteIcon(req, res, next) {
  let outputPath = path.resolve(process.cwd(), '../huasen-public-icon')
  let spriteIconEntryPath = path.resolve(process.cwd(), './public/compress/spriteIcon.zip')
  compressing.zip.uncompress(spriteIconEntryPath, outputPath).then(() => { }).catch(() => { });
}

module.exports = {
  findAllSpriteIcon,
  compileSpriteIcon,
  uploadSpriteIcon,
  deleteSpriteIcon,
  downloadSpriteIcon
}