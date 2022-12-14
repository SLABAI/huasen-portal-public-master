/*
 * @Autor: huasenjio
 * @Date: 2022-03-03 23:59:46
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-03-11 23:19:09
 * @Description: 用于判定是否图片链接或者是色值，用于设置css背景
 */

export function judageBgType(value) {
  let tag = undefined
  if (typeof value === "string") {
    if ((/^((https?:\/\/)|(www\.))((([0-9]{1,3}\.){3}[0-9]{1,3})|localhost|([a-zA-Z0-9]+\.[a-zA-Z0-9]+)+)((\/[a-zA-Z0-9]*)+|(:\d+\/)|(\/#\/))/.test(value)) || (/^\/img\//.test(value))) {
      tag = "imgUrl"
    } else if (/^#[0-9a-fA-F]+$/.test(value)) {
      tag = "color"
    } else if (/^data:image/.test(value)) {
      tag = "base64"
    }
  } else {
    tag = "module"
  }
  return tag
}