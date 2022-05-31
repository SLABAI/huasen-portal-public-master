/*
 * @Autor: huasenjio
 * @Date: 2022-04-23 20:51:48
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-23 21:03:48
 * @Description: 下载文件链接
 */

export function downloadFile(url, filename) {
  let a = document.createElement('a');
  a.href = url;
  a.setAttribute('target', '_blank');
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click()
  document.body.removeChild(a);
}