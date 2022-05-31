const User = require("../db/model/user.js");

const RESPONSE = require("../utils/response-handle.js");
const TOKENER = require("../plugin/jwt.js");

/**
 * 用户相关服务
 * @param {请求对象}  req
 * @param {响应对象}  res
 */
function loginUser(req, res, next) {
  let { id, password } = req.body;
  User.find({ id })
    .then(async (lists) => {
      let target = lists[0]
      if (lists.length != 0 && target.password == password) {
        let { name, headImg, config, code, record, todoList } = target
        let token = await TOKENER.createToken(id, { key: id, host: req.headers.host, code: code, tag: 'user' })
        res.send(RESPONSE("SUCCESS", "登陆成功", {
          id,
          name,
          headImg,
          config,
          code,
          record,
          todoList,
          token
        }));
        next()
      } else {
        res.send(RESPONSE("OK", "请检查账号密码"));
      }
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "登陆出错"));
    });
}
function registerUser(req, res, next) {
  let { id, password, headImg } = req.body;
  User.insertMany({ id, password, headImg })
    .then((lists) => {
      res.send(RESPONSE("SUCCESS", "添加成功", lists));
    })
    .catch((err) => {
      res.send(RESPONSE("OK", "添加出错"));
    });
}
function updateUser(req, res, next) {
  let { id, ...data } = req.body;
  // 防止恶意串改权限
  delete data.code;
  delete data.enabled;
  User.updateOne({ id }, { $set: data })
    .then((result) => {
      res.send(RESPONSE("SUCCESS", "更新成功"));
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "更新失败"));
    });
}

// 判断用户是否存在
function judgeUserExisted(req, res, next) {
  let { id } = req.body;
  User.find({ id })
    .then((lists) => {
      if (lists.length == 0) {
        next();
      } else {
        // 更新密码
        let { id, password } = req.body
        // 防止恶意串改用户信息
        req.body = {
          id,
          password
        }
        update(req, res, next)
      }
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "账号查询出错", null, err));
    });
}
function uploadUserFile(req, res, next) {
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
    res.send(RESPONSE("OK", "无法解析文件"));
  }
}

/**
 * 管理员相关服务
 * @param {请求对象}  req
 * @param {响应对象}  res
 */
function findAll(req, res, next) {
  User.find()
    .then((lists) => {
      res.send(RESPONSE("SUCCESS", "查询成功", lists));
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "查询出错"));
    });
}
function findAllByPage(req, res, next) {
  let { pageId = 1, pageSize = 10 } = req.body;
  // 跳过几条读几条
  User.find()
    .limit(Number(pageSize)) // 读几条
    .skip(Number(pageId - 1) * pageSize) // 跳几条
    .then((lists) => {
      User.find().countDocuments().then(countNum => {
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
function findUserByIdOrNameKey(req, res, next) {
  let { idKey, nameKey } = req.body;
  let regIdKey = new RegExp(idKey)
  let regNameKey = new RegExp(nameKey)
  User.find({ $and: [{ id: { $regex: regIdKey } }, { name: { $regex: regNameKey } }] }).then(lists => {
    res.send(RESPONSE("SUCCESS", "模糊查询成功", lists));
  }).catch(err => {
    res.send(RESPONSE("ERROR", "模糊查询出错"));
  })
}
function remove(req, res, next) {
  let { id } = req.body;
  User.deleteOne({ id })
    .then((result) => {
      res.send(RESPONSE("SUCCESS", "删除成功", result));
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "删除出错", null, err));
    });
}
function update(req, res, next) {
  let { id, ...data } = req.body;
  // 清除更新一些空值
  for (let key in data) {
    if (!data[key] && data[key] !== 0) {
      delete data[key]
    }
  }
  User.updateOne({ id }, { $set: data })
    .then((result) => {
      res.send(RESPONSE("SUCCESS", "更新成功", result));
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "更新出错", null, err));
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
  User.insertMany(req.body)
    .then((lists) => {
      res.send(RESPONSE("SUCCESS", "注册成功", lists));
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "注册出错", null, err));
    });
}

function backupData(req, res, next) {
  let { id, record, config } = req.body
  req.body = { id, record, config }
  update(req, res, next)
}
function syncData(req, res, next) {
  let { id } = req.body;
  User.find({ id })
    .then((lists) => {
      if (lists.length != 0) {
        let target = lists[0]
        let { name, headImg, config, code, record, todoList } = target
        res.send(RESPONSE("SUCCESS", "拉取同步成功", {
          id,
          name,
          headImg,
          config,
          code,
          record,
          todoList,
        }));
      } else {
        res.send(RESPONSE("FORBIDDEN", "身份异常", {}));
      }
    })
    .catch((err) => {
      console.log(err)
      res.send(RESPONSE("ERROR", "拉取同步出错"));
    });
}


module.exports = {
  loginUser,
  registerUser,
  judgeUserExisted,
  updateUser,
  uploadUserFile,
  backupData,
  syncData,

  findAll,
  findAllByPage,
  findUserByIdOrNameKey,
  remove,
  update,
  insert,
};
