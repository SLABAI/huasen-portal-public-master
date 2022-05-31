/*
 * @Autor: huasenjio
 * @Date: 2022-05-25 00:48:00
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-06-01 00:09:52
 * @Description: 对称加密
 */
const crypto = require('crypto');

const key = "0123456789012345"; // 16位共享值
const iv = "0123456789012345"; // 初始偏移量

// const key = crypto.randomBytes(16); // 16位共享值
// const iv = crypto.randomBytes(16) // 初始偏移量

/**
 * 解密
 * @param dataStr {string}
 * @return {string}
 */
function decrypt(dataStr) {
  let cipherChunks = [];
  let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  decipher.setAutoPadding(true);
  cipherChunks.push(decipher.update(dataStr, 'base64', 'utf8'));
  cipherChunks.push(decipher.final('utf8'));
  return cipherChunks.join('');
}

/**
 * 加密
 * @param dataStr {string}
 * @return {string}
 */
function encrypt(dataStr) {
  let cipherChunks = [];
  let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  cipher.setAutoPadding(true);
  cipherChunks.push(cipher.update(dataStr, 'utf8', 'base64'));
  cipherChunks.push(cipher.final('base64'));
  return cipherChunks.join('');
}

module.exports = {
  decrypt,
  encrypt
};
