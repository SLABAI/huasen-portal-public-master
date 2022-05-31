import Vue from 'vue'
Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中会获得焦点
    inserted: function(el) {
        // 聚焦元素
        el.focus()
    },
})


