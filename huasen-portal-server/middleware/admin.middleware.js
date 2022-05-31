const path = require("path");
const fs = require("fs")
const TOKENER = require("../plugin/jwt.js");
const RESPONSE = require("../utils/response-handle.js");
const { checkParamsByRules } = require("../utils/tool.js");
const MIXTUREUPLOAD = require("../plugin/mixture-upload.js");

// 校验账号是否合法
function checkAdminAid(req, res, next) {
  let { aid } = req.body;
  let errText = checkParamsByRules([
    {
      value: aid,
      rules: [
        {
          strategy: "minLength：5",
          errMsg: "账号请长度不小于5",
        },
        {
          strategy: "maxLength：20",
          errMsg: "账号请长度不大于20",
        },
        {
          strategy: "isEmail",
          errMsg: "账号请输入邮箱",
        },
      ],
    },
  ]);
  if (!errText) {
    next();
  } else {
    res.send(RESPONSE("OK", errText));
  }
}
// 校验密码是否合法
function checkAdminPassword(req, res, next) {
  let { password } = req.body;
  let errText = checkParamsByRules([
    {
      value: password,
      rules: [
        {
          strategy: "minLength：5",
          errMsg: "密码请长度不小于5",
        },
        {
          strategy: "maxLength：20",
          errMsg: "密码请长度不大于20",
        },
        {
          strategy: "isEnglish",
          errMsg: "密码不支持中文字符",
        },
      ],
    },
  ]);
  if (!errText) {
    next();
  } else {
    res.send(RESPONSE("OK", errText));
  }
}
// 校验token合法性，并且认证管理员身份
function verifyAdminByToken(req, res, next) {
  let token = req.headers.token
  TOKENER.verifyToken(token)
    .then((tokenInfo) => {
      req.body._auth = tokenInfo.data.key;
      req.body._authCode = tokenInfo.data.code;
      next();
    })
    .catch((err) => {
      if (err.tag == "TIMEOUT") {
        res.send(RESPONSE("UNAUTHORIZED", err.msg));
      } else if (err.tag == "ILLEGAL") {
        res.send(RESPONSE("FORBIDDEN", err.msg));
      } else {
        res.send(RESPONSE("ERROR", err.msg));
      }
    });
}
// 身份转账号，用于数据库操作
function authToAid(req, res, next) {
  req.body.aid = req.body._auth
  req.query = req.body;
  next()
}
// 普通文件多项上传
function processAdminMixtureFile(req, res, next) {
  const mixtrueUploader = new MIXTUREUPLOAD({
    req,
    res,
    next,
    acceptTypes: [
      "jpg",
      "jpeg",
      "png",
      "gif",
      'svg+xml'
    ],
    // 自定义名字
    fileName: function (file) {
      let ext = file.headers["content-type"] != "image/svg+xml" ? file.headers["content-type"].split(/[\/|\\]/)[1] : file.headers["content-type"].split(/[\/|\\]/)[1].split("+")[0]
      return `${Date.now()}.${ext}`;
    },
    // 文件过滤
    filesFilter: function (file) {
      return true // true不拦截 ｜ false拦截
    },
    // 检测错误（强烈推荐）
    onError: function (err) {
      if (err.tag == "CONFIG_ERROR") {
        res.send(RESPONSE("ERROE", err.msg, null, err));
      } else if (err.tag == "fileLength") {
        res.send(RESPONSE("ERROE", err.msg, null, err));
      } else if (err.tag == "maxFieldsSize") {
        res.send(RESPONSE("ERROE", err.msg, null, err));
      } else if (err.tag == "maxFields") {
        res.send(RESPONSE("ERROE", err.msg, null, err));
      } else {
        res.send(RESPONSE("ERROE", "上传模块异常", null, err));
      }
    },
    // 必须
    onSuccess: function (body, data) {
      next()
    }
  });
}

module.exports = {
  checkAdminAid,
  checkAdminPassword,
  verifyAdminByToken,
  processAdminMixtureFile,
  authToAid
};
