/*
 * @Autor: huasenjio
 * @Date: 2021-08-25 01:53:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-21 00:31:26
 * @Description: 注册全局组件
 */

import Vue from 'vue'
import hljs from "highlight.js"
import 'highlight.js/styles/default.css';

// markdown代码高亮
Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})

Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中会获得焦点
    inserted: function (el) {
        // 聚焦元素
        el.focus()
    },
})

Vue.directive('randomColor', function (el) {
    let colors = ['#fd7e14', '#ffc107', '#33b86c', '#007bff', '#17a2b8', '#e83e8c']
    let tempIndex = Math.floor(Math.random() * 6)
    el.style.backgroundColor = colors[tempIndex];
})

Vue.directive('balance', {
    inserted: function (el) {
        el.style.display = "flex"
        el.style.flexWrap = "wrap"
        if (el.childElementCount != 0) {
            handleBalance(el)
        }
        addresize(el, handleBalance)
    },
    componentUpdated(el) {
        handleBalance(el)
    }
})

Vue.directive('autoScale', {
    inserted: function (el) {
        el.style.transformOrigin = "left top"
        // 执行立即缩放
        handleScale(el)
        // 增加缩放监听
        addresize(el, handleScale)
    },
    componentUpdated(el) {
        // 组件更新时缩放
        handleScale(el)
    }
})

// 指令辅助函数
function addresize(dom, fn) {
    var w = dom.offsetWidth,
        h = dom.offsetHeight,
        oldfn = window.onresize;
    if (oldfn) {
        window.onresize = function () {
            // 若resize回调存在，则调用绑定window上下午，直接执行一遍
            oldfn.call(window);
            if (dom.offsetWidth != w || dom.offsetHeight != h) {
                w = dom.offsetWidth;
                h = dom.offsetHeight;
                // 执行回调方法
                fn.call(dom, dom);
            }
        }
    } else {
        window.onresize = function () {
            if (dom.offsetWidth != w || dom.offsetHeight != h) {
                w = dom.offsetWidth;
                h = dom.offsetHeight;
                // 执行回调方法
                fn.call(dom, dom);
            }
        }
    }
}
function handleBalance(el) {
    if (el.childElementCount != 0) {
        let childs = [...el.childNodes]
        let pWidth = el.clientWidth
        let cWidth = childs[0].clientWidth
        if (pWidth <= cWidth) return
        let rowCount = 1
        while (cWidth * rowCount < pWidth) {
            rowCount++
        }
        let mLeft = (pWidth % cWidth) / rowCount
        childs.forEach(item => {
            item.style.marginLeft = `${mLeft}px`
        })
    }
}
function handleScale(el) {
    let width = document.body.clientWidth
    let height = document.body.clientHeight
    el.style.transform = `scale(${width / 1920}, ${height / 1080})`
}
