const fs = require("fs");
const events = require('events');
const path = require("path");

const multiparty = require("./multiparty");
const createError = require("http-errors");
const onFinished = require("on-finished");
const qs = require("qs");
const config = require("../config.js"); // 配置参数
const { createDirSync } = require("../utils/tool.js")

class HsError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name;
  }
}
class FsError extends HsError {
  constructor(message, tips) {
    super(message)
    this.tips = tips
  }
}
class MultipartError extends HsError {
  constructor(message, tips) {
    super(message)
    this.tips = tips
  }
}

class MixtureUpload {
  constructor(options = {}) {
    this._req = options.req || false;
    this._res = options.res || false;
    this._next = options.next || false;

    this._data = {}; // 存储表单项数据
    this._files = {}; // 存储文件数据
    this._isFinished = false; // 控制表单是否处理完成

    this._uploadDir = options.uploadPath || config.fileConfig.uploadPath;
    this._acceptTypes = options.acceptTypes || config.fileConfig.acceptTypes; // 允许类型
    this._encoding = options.encoding || config.fileConfig.encoding; // formdata的数据编码格式模式utf-8
    this._maxFilesSize = options.maxFilesSize || config.fileConfig.maxFilesSize; // 文件上传的最大值
    this._maxFieldsSize = options.maxFieldsSize || config.fileConfig.maxFieldsSize; // 表单字段项的最大值
    this._maxFields = options.maxFields || config.fileConfig.maxFields; // 允许字段的最大个数
    this._autoFiles = options.autoFiles || config.fileConfig.autoFiles; // 是否允许上传文件

    this._onError = options.onError || function (err) { };
    this._onSuccess = options.onSuccess || function (body, files) { };
    this._fileName = options.fileName || false;
    this._filesFilter = options.filesFilter || function (file) { return true };
    this.initUploader()
    this.uploader()

    this._emitter = new events.EventEmitter()
    this._emitter.addListener('error', (err) => {
      // 统一处理异常
      if (err instanceof FsError) {
        if (err.tips.tag == "UNLINK") {
          this._onError({
            tag: "UNLINK_ERROR",
            msg: `解除${err.tips.value}文件错误`,
            originError: err
          })
        } else if (err.tips.tag == "RENAME") {
          this._onError({
            tag: "RENAME_ERROR",
            msg: `重命名文件错误`,
            originError: err,
          })
        }
      } else if (err instanceof MultipartError) {
        this._onError({
          tag: "MULTIPART_ERROR",
          msg: `网络数据解析器内部错误，请联系管理员！`,
          originError: err,
        })
      } else {
        throw new Error("程序内部错误，请检查传入的配置参数！")
      }
    });
  }
  initUploader() {
    // 如果传入的目录不存在则，创建目录
    if (!fs.existsSync(this._uploadDir)) {
      createDirSync(this._uploadDir)
    }
  }
  // 整合表单
  handleFormData(name, value, data) {
    if (Array.isArray(data[name])) {
      data[name].push(value);
    } else if (data[name]) {
      data[name] = [data[name], value];
    } else {
      data[name] = value;
    }
  }
  // 控制上传文件的类型，若传入文件的类型不允许，则删除
  handleFileType(file) {
    try {
      if (!file.headers["content-type"] || this._acceptTypes.indexOf(file.headers["content-type"].split(/[\/|\\]/)[1]) == -1) {
        fs.unlinkSync(file.path)
      } else {
        return true;
      }
    } catch (err) {
      this._emitter.emit('error', new FsError(`fs：${file.path}文件路径删除失败`, {
        tag: "UNLINK_ERROR",
        value: file.path,
        originError: err
      }));
    }
  }
  uploader() {
    try {
      if (!this._req) this._onError({
        tag: "CONFIG_ERROR",
        msg: "请传入request请求对象！",
        originError: null
      })
      if (!this._res) this._onError({
        tag: "CONFIG_ERROR",
        msg: "请传入response响应对象！",
        originError: null
      })
      if (!this._next) this._onError({
        tag: "CONFIG_ERROR",
        msg: "请传入next对象！",
        originError: null
      })

      if (this._req.isMixtureUploadProcessed) this._next()
      if (this._req.method === "GET" || this._req.method === "HEAD") this._next()
      if (!this._req.is("multipart/form-data")) this._next()

      this._req.body = this._req.body || {};
      this._req.files = this._req.files || {};
      this._req.isMixtureUploadProcessed = true;
      const form = new multiparty.Form({
        encoding: this._encoding,
        maxFieldsSize: this._maxFieldsSize,
        maxFields: this._maxFields,
        maxFilesSize: this._maxFilesSize,
        autoFiles: this._autoFiles,
      });
      form.parse(this._req)
      // 监听上传的类型为text类型的表单项
      form.on("field", (name, value) => {
        this.handleFormData(name, value, this._data);
        this._isFinished = true
      });
      // 监听上传的文件类型的表单项
      form.on("file", (name, file) => {
        if (this._filesFilter(file)) {
          // 判断文件是否可以上传
          if (this.handleFileType(file)) {
            // 判断文件名字是否有重命名
            if (this._fileName) {
              let newFileName = this._fileName(file);
              let newFilePath = path.resolve(this._uploadDir, `${newFileName}`);
              fs.renameSync(file.path, newFilePath)
              file.path = newFilePath;
              this.handleFormData(name, file, this._files);
            } else {
              // 无需自定义文件名称，直接从缓存中将文件本地化
              let fileName = file.path.split(/[\/|\\]/).pop()
              let filePath = path.resolve(this._uploadDir, fileName)
              fs.renameSync(file.path, filePath)
              file.path = filePath;
              this.handleFormData(name, file, this._files);
            }
          }
        } else {
          fs.unlinkSync(file.path)
        }
        this._isFinished = true
      });

      form.on("error", (err) => {
        if (err.tag == "length") {
          i
          this._onError({
            tag: "fileLength",
            msg: `上传文件超过${(this._maxFilesSize / (1024 * 1024)).toFixed(2)} M！`,
            originError: err.toString(),
          });
        } else if (err.tag == "maxFieldsSize") {
          this._onError({
            tag: "maxFieldsSize",
            msg: `maxFieldsSize：字段的内容超过${(this._maxFieldsSize / (1024 * 1024)).toFixed(2)} M！`,
            originError: err.toString(),
          });
        } else if (err.tag == "maxFields") {
          this._onError({
            tag: "maxFields",
            msg: `maxFields：字段数量超过${this._maxFields} 个！`,
            originError: err.toString(),
          });
        } else {
          this._emitter.emit('error', new MultipartError("Multipart：发生未知错误", {
            tag: "MULTIPART_UNKNOW_ERROR",
            originError: err
          }));
        }
      });
      // 监听表单处理完成自动关闭
      form.on("close", () => {
        if (this._isFinished) {
          this._req.body = qs.parse(this._data, { allowDots: true });
          this._req.files = qs.parse(this._files, { allowDots: true });
          this._onSuccess(this._req.body, this._req.files)
        }
      });
    } catch (err) {
      throw new Error("程序内部错误，请检查传入的配置参数！")
    }

  }
}
module.exports = MixtureUpload;
