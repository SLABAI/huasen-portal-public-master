/*
 * @Autor: huasenjio
 * @Date: 2021-08-25 01:53:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-05-01 18:04:44
 * @Description: 数据状态树
 */
export default {
    userInfo: {
        id: '',
        name: "",
        headImg: "",
        token: "",
        config: {
            // 主题配置
            // background: "#8e54e9", // 色值｜图片链接| base64
            background: "http://a.huasen.cc/server/huasen-public-static/admin/1651395053333.jpeg", // 色值｜图片链接| base64
            bgFilter: "none",
            bgOpacity: 0, // 背景透明度
            headerFontColor: "black", // header顶栏的字体颜色
            headerFilter: "blur(0px)", // header栏过滤
            headerBackgroundColor: "transparent", // 背景颜色

            // 模式配置
            simpleMode: false, // 精简模式
        },
        code: 4, // 权限码
        record: [], // 收录的网站
        todoList: [], // 代办  
    },
    triggerInfo: {
        openSignPanel: false,
        isShowLeft: true,
        isShowSidebar: true,
        isShowHeader: true
    },
    commonInfo: {
        takeSource: {} // 当前展示的链接
    }

}