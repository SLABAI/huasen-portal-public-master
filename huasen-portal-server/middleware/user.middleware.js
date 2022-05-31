const path = require("path");

const MAILER = require("../plugin/mail.js");
const TOKENER = require("../plugin/jwt.js");
const RESPONSE = require("../utils/response-handle.js");
const MIXTUREUPLOAD = require("../plugin/mixture-upload.js");
const { checkParamsByRules } = require("../utils/tool.js");

// 校验参数是否合法
function checkUserParams(req, res, next) {
  let errText = checkParamsByRules([
    {
      value: req.body.id,
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
    {
      value: req.body.password,
      rules: [
        {
          strategy: "minLength：5",
          errMsg: "请密码长度不小于5",
        },
        {
          strategy: "maxLength：20",
          errMsg: "请密码长度不大于20",
        },
        {
          strategy: "isEnglish",
          errMsg: "密码不支持中文字符",
        },
      ],
    }
  ]);
  if (!errText) {
    next();
  } else {
    res.send(RESPONSE("OK", errText));
  }
}

// 判断验证码是否正确
function judgeUserMailCode(req, res, next) {
  let mail = req.body.id
  let mailCode = req.body.mailCode
  MAILER.findCodeByMail(mail).then(code => {
    if (code && code == mailCode) {
      next();
    } else {
      res.send(RESPONSE("OK", "邮箱验证码不正确"));
    }
  }).catch(err => {
    res.send(RESPONSE("ERROR", "邮箱验证码容器出错"));
  });
}

// token校验并解析身份获得id
function verifyUserByToken(req, res, next) {
  let token = req.headers.token
  TOKENER.verifyToken(token)
    .then((data) => {
      req.body.id = data.data.key
      next();
    })
    .catch((err) => {
      res.send(RESPONSE("OK", err.msg, null, err));
    });
}

// 多项上传
function processUserMixtureFile(req, res, next) {
  const mixtrueUploader = new MIXTUREUPLOAD({
    req,
    res,
    next,
    // 自定义上传路径
    uploadPath: path.resolve(process.cwd(), "../huasen-public-static/user"),
    // 自定义名字
    fileName: function (file) {
      return `${Date.now()}.${file.headers["content-type"].split(/[\/|\\]/)[1]}`;
    },
    // 文件过滤
    filesFilter: function (file) {
      return true // true不拦截 ｜ false拦截
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
  checkUserParams,
  judgeUserMailCode,
  verifyUserByToken,
  processUserMixtureFile,
};
