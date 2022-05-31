/*
 * @Autor: huasenjio
 * @Date: 2021-11-15 22:14:23
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-23 20:52:56
 * @Description: 
 */
import { handleURL } from "./handleURL"
import { copyObject } from "./copyObject"
import { copyTextToClip } from "./copyTextToClip"
import { exchangeArrayItem } from "./exchangeArrayItem"
import { getBase64 } from "./getBase64"
import { getCDN } from "./getCDN"
import { debounce } from "./debounce"
import { getUploadApi } from "./getUploadApi"
import { handleFileURL } from "./handleFileURL"
import { getUid } from './getUid'
import { downloadFile } from './downloadFile'
import { downloadFileByBlob } from './downloadFileByBlob'

export default {
  handleURL,
  copyObject,
  copyTextToClip,
  exchangeArrayItem,
  getBase64,
  getCDN,
  debounce,
  getUploadApi,
  handleFileURL,
  getUid,
  downloadFile,
  downloadFileByBlob
}