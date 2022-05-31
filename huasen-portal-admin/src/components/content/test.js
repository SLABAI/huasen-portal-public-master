/*
 * @Autor: huasenjio
 * @Date: 2021-12-12 21:55:06
 * @LastEditors: huasenjio
 * @LastEditTime: 2021-12-12 23:28:59
 * @Description:
 */

let a = /(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(\/)?(:\d+)*(\/\w+\.\w+)*([\\?&]\w+=\w*)*(\/)?$/.test("https://n.huasen.cc/aaa.do?a=11&b=22")
console.log(a)