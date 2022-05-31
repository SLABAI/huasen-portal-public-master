/*
 * @Autor: huasenjio
 * @Date: 2021-10-07 18:40:04
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-23 23:05:58
 * @Description: 管理员服务器
 */
const path = require("path")
const fs = require("fs")

const Admin = require("../db/model/admin.js")

const MAILER = require("../plugin/mail.js")
const RESPONSE = require("../utils/response-handle.js")
const TOKENER = require("../plugin/jwt.js")
const { readDirectory, unlinkFile } = require("../utils/tool.js")

function login(req, res, next) {
  let { aid, password } = req.body
  Admin.find({ aid })
    .then(async (lists) => {
      let target = lists[0]
      if (lists.length != 0 && target.password == password) {
        let { name, code } = target
        let token = await TOKENER.createToken(aid, { key: aid, host: req.headers.host, code: code, tag: 'admin' })
        res.send(RESPONSE("SUCCESS", "登陆成功", { token, name, aid, code }))
      } else {
        res.send(RESPONSE("OK", "密码不正确"))
      }
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "登陆出错", null, err, req, res))
    });
}

function insert(req, res, next) {
  for (let key in req.body) {
    if (!req.body[key]) {
      delete req.body[key]
    }
  }
  delete req.body._id;
  delete req.body._v;
  Admin.insertMany(req.body)
    .then(lists => {
      res.send(RESPONSE("SUCCESS", "注册成功", lists))
    }).catch(err => {
      res.send(RESPONSE("ERROR", "注册出错", null, err))
    })
}

function update(req, res, next) {
  let { aid, ...data } = req.body
  Admin.updateOne({ aid }, { $set: data })
    .then((result) => {
      res.send(RESPONSE("SUCCESS", "更新成功", result))
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "更新出错"))
    });
}

function remove(req, res, next) {
  let { aid } = req.body
  Admin.deleteOne({ aid })
    .then((result) => {
      res.send(RESPONSE("SUCCESS", "删除成功", result));
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "删除出错"));
    });
}

function judgeAdminPower(req, res, next) {
  let { _auth } = req.body
  Admin.find({ aid: _auth })
    .then((lists) => {
      if (lists.length != 0) {
        next()
      } else {
        res.send(RESPONSE("OK", "权限不足！"))
      }
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "鉴别管理员身份出错", null, err))
    });
}

function upload(req, res, next) {
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
        url: item.path.split('/').slice(-3).join('/'),
        size: item.size,
        type: item.headers['content-type']
      }
    }))
    res.send(RESPONSE("SUCCESS", "上传成功", resultFiles));
  } else {
    res.send(RESPONSE("ERROR", "未解析到文件"));
  }
}

function queryDataByAid(req, res, next) {
  let { aid } = req.body
  Admin.find({ aid })
    .then((lists) => {
      if (lists.length != 0) {
        res.send(RESPONSE("SUCCESS", "查询成功", lists))
      } else {
        res.send(RESPONSE("OK", "查询失败"))
      }
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "查询出错", null, err))
    });
}

function findAllByPage(req, res, next) {
  let { pageId = 1, pageSize = 10 } = req.body;
  // 跳过几条读几条
  Admin.find()
    .limit(Number(pageSize)) // 读几条
    .skip(Number(pageId - 1) * pageSize) // 跳几条
    .then((lists) => {
      Admin.find().countDocuments().then(countNum => {
        res.send(RESPONSE("SUCCESS", "分页查询成功", {
          lists,
          countNum
        }));
      })
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "分页查询出错"));
    });
}

function findAdminByAidOrNameKey(req, res, next) {
  let { aidKey, nameKey } = req.body;
  let regAidKey = new RegExp(aidKey)
  let regNameKey = new RegExp(nameKey)
  Admin.find({ $and: [{ aid: { $regex: regAidKey } }, { name: { $regex: regNameKey } }] }).then(lists => {
    res.send(RESPONSE("SUCCESS", "模糊查询成功", lists));
  }).catch(err => {
    res.send(RESPONSE("ERROR", "模糊查询出错"));
  })
}

function judgeAdminExisted(req, res, next) {
  let { aid } = req.body;
  Admin.find({ aid })
    .then((lists) => {
      if (lists.length == 0) {
        next();
      } else {
        res.send(RESPONSE("OK", "账号已存在"));
      }
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "账号查询出错"));
    });
}
function updateAdminById(req, res, next) {
  let { aid } = req.body;
  Admin.find({ aid })
    .then((lists) => {
      if (lists.length == 0) {
        next();
      } else {
        res.send(RESPONSE("OK", "账号已存在"));
      }
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "账号查询出错"));
    });
}

function update(req, res, next) {
  let { aid, ...data } = req.body
  Admin.updateOne({ aid }, { $set: data })
    .then((result) => {
      res.send(RESPONSE("SUCCESS", "更新成功", result))
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "更新出错"))
    });
}

function findAllFile(req, res, next) {
  try {
    let files = readDirectory(path.resolve(process.cwd(), "../huasen-public-static"))
    files = files.map(item => {
      return item.split("/").slice(-3).join('/')
    })
    files = files.filter(fileName => {
      let name = fileName.split("/").slice(-1)
      return /^\./.test(name) || !/\.(png|jpg|jpeg|svg)$/.test(name) ? false : true
    })
    res.send(RESPONSE("SUCCESS", "文件扫描成功", files))
  } catch (err) {
    res.send(RESPONSE("ERROR", "文件扫描出错", null, err))
  }
}

function deleteFile(req, res, next) {
  let { filePath } = req.body
  let dirPath = path.resolve(process.cwd(), `../${filePath}`)
  unlinkFile(dirPath).then(tips => {
    res.send(RESPONSE("SUCCESS", "文件删除成功", null))
  }).catch(err => {
    res.send(RESPONSE("ERROR", err))
  })
}

function findTakeSource(req, res, next) {
  Admin.find()
    .then((lists) => {
      let temp = lists.filter(item => {
        return item.takeAbled
      })
      temp.sort((a, b) => {
        return a['take'] - b['take']
      })
      let takes = temp.map(item => {
        return {
          aid: item.aid,
          name: item.name,
          site: JSON.parse(item.site),
          config: JSON.parse(item.config),
          take: item.take
        }
      })
      res.send(RESPONSE("SUCCESS", "查询成功", takes));
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "查询出错"));
    });
}

module.exports = {
  login,
  insert,
  update,
  remove,
  upload,
  queryDataByAid,
  findAllByPage,
  judgeAdminPower,
  findAdminByAidOrNameKey,
  judgeAdminExisted,
  updateAdminById,
  findAllFile,
  deleteFile,
  findTakeSource
}