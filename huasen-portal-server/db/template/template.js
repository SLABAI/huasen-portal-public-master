const Tool = require("../../utils/tool");

/**
 * 相异增加操作
 * @param {Object} data   包含数据对象
 * @param {Object} result 响应对象
 * @param {Object} model  操作表对象
 * @param {String} tips   操作名称
 * @param {Object} clip   主键对象
 */
function insertTemplate(data, result, model, tips, clip) {
  if (Tool.checkParams(Object.values(data))) {
    model
      .find(clip)
      .then((lists) => {
        if (lists.length == 0) {
          model
            .insertMany(data)
            .then((res) => {
              result.send({ statusCode: 1, msg: `${tips}成功` });
            })
            .catch((err) => {
              result.send({ statusCode: 0, msg: `${tips}失败` });
            });
        } else {
          result.send({ statusCode: 0, msg: `条目已存在` });
        }
      })
      .catch((err) => {
        result.send({ statusCode: 0, msg: `${tips}似乎发生错误` });
      });
  } else {
    result.send({ statusCode: 0, msg: "参数解析出错" });
  }
}

/**
 * 通过关键词删除操作
 * @param {Object} clip   包含主键对象
 * @param {Object} result 响应对象
 * @param {Object} model  操作表对象
 * @param {String} tips   操作名称
 */
function deleteByKeyTemplate(clip, result, model, tips) {
  if (Tool.checkParams(Object.values(clip))) {
    model
      .find(clip)
      .then((lists) => {
        if (lists.length == 0) {
          result.send({ statusCode: 0, msg: "条目不存在" });
        } else {
          model
            .deleteOne(clip)
            .then((res) => {
              result.send({ statusCode: 1, msg: `${tips}成功` });
            })
            .catch((err) => {
              result.send({ statusCode: 0, msg: `${tips}失败` });
            });
        }
      })
      .catch((err) => {
        result.send({ statusCode: 0, msg: `${tips}似乎发生错误` });
      });
  } else {
    result.send({ statusCode: 0, msg: "参数解析出错" });
  }
}

/**
 * 通过关键词更新操作
 * @param {Object} clip   包含主键对象
 * @param {Object} data   包含数据对象
 * @param {Object} result 响应对象
 * @param {Object} model  操作表对象
 * @param {String} tips   操作名称
 */
function updateByKeyTemplate(clip, data, result, model, tips) {
  // 判断参数是否合法
  if (Tool.checkParams(Object.values(data))) {
    model
      .find(clip)
      .then((lists) => {
        if (lists.length == 0) {
          result.send({ statusCode: 0, msg: "条目不存在" });
        } else {
          model
            .updateOne(clip, { $set: data })
            .then((res) => {
              result.send({ statusCode: 1, msg: `${tips}成功` });
            })
            .catch((err) => {
              result.send({ statusCode: 0, msg: `${tips}失败` });
            });
        }
      })
      .catch((err) => {
        result.send({ statusCode: 0, msg: `${tips}似乎发生错误` });
      });
  } else {
    result.send({ statusCode: 0, msg: "参数解析出错" });
  }
}

/**
 * 查询全部操作
 * @param {Object} result 响应对象
 * @param {Object} model  操作表对象
 * @param {String} tips   操作名称
 */
function findAllTemplate(result, model, tips) {
  model
    .find()
    .then((body) => {
      result.send({ statusCode: 1, msg: `${tips}成功`, data: body });
    })
    .catch((err) => {
      result.send({ statusCode: 0, msg: `${tips}失败` });
    });
}

/**
 * 分页查询操作
 * @param {Number} pageId     页号
 * @param {Number} pageSize   页长
 * @param {Object} model      操作表对象
 * @param {String} tips       操作名称
 */
function findByPage(pageId, pageSize, model, tips) {
  model
    .find()
    .limit(Number(pageSize))
    .skip(Number(pageId - 1) * pageSize)
    .then((body) => {
      result.send({ statusCode: 1, msg: `${tips}成功`, data: body });
    })
    .catch((err) => {
      result.send({ statusCode: 0, msg: `${tips}失败` });
    });
}

module.exports = {
  insertTemplate,
  deleteByKeyTemplate,
  updateByKeyTemplate,
  findAllTemplate,
  findByPage,
};
