/*
 * @Autor: huasenjio
 * @Date: 2021-08-25 01:53:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-05-01 14:30:35
 * @Description: 
 */
import Vue from 'vue'
const that = Vue.prototype
import Router from 'vue-router'
import routes from 'config/router.config.json'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

// 创建路由节点
const createRoute = (routes) => {
    return routes.reduce((processedRoutes, currentRoute) => {
        processedRoutes.push(processRouteObj(currentRoute))
        return processedRoutes
    }, [])
}

// 传入对象作为参数，并且经过对象解构的方式获得变量。
const processRouteObj = ({ menuCode, children, component, title, ...args }) => {
    return Object.assign(
        {
            meta: { menuCode, children, title },
            // 引入路由对应的组件
            component: () =>
                import(/* webpackInclude: /\.(js|vue)$/ */ `@/views/${component}`),
            // 通过递归调用的方式进行都子路由的处理
            children: children ? createRoute(children) : [],
        },
        args
    )
}

// 创建路由实例对象
const router = new Router({
    mode: 'hash',
    routes: createRoute(routes),
})

// 数组扁平化
function flatten(arr, parentPath) {
    let res = []
    arr.map(item => {
        if (item.children && item.children.length != 0) {
            // 有子路由
            item.path = parentPath ? `${parentPath}/${item.path}` : item.path
            res.push(item.path)
            res = res.concat(flatten(item.children, item.path));
        } else {
            if (parentPath) {
                res.push(`${parentPath}/${item.path}`)
            } else {
                res.push(item.path)
            }

        }
    })
    return res;
}
const routePaths = flatten(router.options.routes)

// 路由前置守卫
router.beforeEach((to, form, next) => {
    // 开启进度条
    Nprogress.start()
    document.title = to.meta.title ? to.meta.title : "huasen-template"; // 将路由中的属性赋值到title中
    let userCode = that.STORAGE.getItem('userInfo') ? that.STORAGE.getItem('userInfo').code : "000"
    // 判断权限
    if (!routePaths.includes(to.path)) {
        next({ path: '/error404' }) // 页面不存在
    } else if (Number(to.meta.menuCode) <= 0) {
        next()
    } else if (!Number(userCode)) {
        next({ path: '/sign' }) // 用户未登录
    } else if (Number(userCode) < Number(to.meta.menuCode)) {
        next({ path: '/error403' }) // 没有权限
    } else {
        next() //无异常情况放行
    }
})
// 路由后置守卫
router.afterEach((to, from) => {
    Nprogress.done()
})

export default router