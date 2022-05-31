/*
 * @Autor: huasenjio
 * @Date: 2022-02-27 18:06:03
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-03-18 01:47:38
 * @Description: 针对于el-upload组件的上传api
 */

/**
 * 处理el-upload组件的action属性接收的api
 * @param {String} api 上传接口，例如：'/admin/upload'
 * @returns String
 */
export function getUploadApi(api) {
  return process.env.NODE_ENV === 'development' ? `/dev${api}` : `/server${api}`;
}
