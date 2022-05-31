/*
 * @Autor: huasenjio
 * @Date: 2022-04-23 20:29:45
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-23 20:47:33
 * @Description: 下载文件链接
 */

export function downloadFileByBlob(content, filename) {
  let a = document.createElement('a');
  const blob = new Blob([content]);
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}