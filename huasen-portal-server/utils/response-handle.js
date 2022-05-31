/*
 * @Autor: huasenjio
 * @Date: 2021-10-04 19:54:31
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-05-01 15:48:17
 * @Description: 统一处理请求返回，记录错误日志
 */

const type = require('./response-type');

module.exports = (tag = "SUCCESS", msg = "", data = null, log) => {
  let responseBody = {
    tag,
    msg,
    data
  }
  switch (tag) {
    // 1
    case "SUCCESS":
      responseBody.code = type[tag];
      responseBody.msg = "操作成功" + " · " + msg
      break;
    // 0
    case "ERROR":
      responseBody.code = type[tag];
      responseBody.msg = "请求错误" + " · " + msg
      if (log) console.error(log)
      break;
    // 403
    case "FORBIDDEN":
      responseBody.code = type[tag];
      responseBody.msg = "请求禁止" + " · " + msg
      if (log) console.warn(log)
      break;
    // 401
    case "UNAUTHORIZED":
      responseBody.code = type[tag];
      responseBody.msg = "请求失效" + " · " + msg
      if (log) console.warn(log)
      break;
    // 204
    case "OK":
      responseBody.code = type[tag];
      responseBody.msg = "请求受理" + " · " + msg
      if (log) console.warn(log)
  }

  return responseBody
}
