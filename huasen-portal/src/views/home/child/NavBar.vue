<!--
 * @Autor: huasenjio
 * @Date: 2021-12-05 20:23:00
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-05-22 13:59:51
 * @Description: 锚点导航组件
-->
<template>
  <div class="h-nav-bar">
    <header></header>
    <main>
      <ul v-balance>
        <li
          class="record-item"
          v-for="item in this.$store.state.commonInfo.takeSource.site"
          :key="item.typeName"
          @click="changeAnchorPosition(item.typeName)"
        >
          <div class="pointer">
            {{ item.typeName }}
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
import Bus from '@/plugin/event-bus.js';
import * as BusType from '@/plugin/event-type.js';

export default {
  name: 'NavBar',

  methods: {
    // 修复锚点定位不准确，hash影响路由的异常
    changeAnchorPosition(typeName) {
      let target = document.getElementById(`site-anchor-${encodeURI(typeName)}`);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // 遍历所有锚点，取消高亮
      [...target.parentNode.children].map(item => {
        item.classList.remove('active-anchor');
      });
      // 设置活跃的锚点的样式名
      target.className = target.className + ' ' + 'active-anchor';
      this.$nextTick(() => {
        Bus.pubEv(BusType.UPDATE_SITE_POSITION, target.offsetTop - 84);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.h-nav-bar {
  width: calc(100% - 20px);
  margin: 10px auto;
  padding: 10px 0;
  background-color: #fff;
  main {
    width: calc(100% - 20px);
    margin: 0 auto;
    border-radius: 3px;
    background-color: #fbfbfb;
    ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .record-item {
        position: relative;
        width: 110px;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        a {
          width: 80%;
          border: 1px solid transparent;
          border-radius: 3px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
        }
        .deleteActive {
          border: 1px solid #c5c5c5;
          border-radius: 3px;
        }
        .editActive {
          border: 1px solid red;
          border-radius: 3px;
          color: red;
        }
        i {
          position: absolute;
          top: 0px;
          right: 10px;
          color: red;
          cursor: pointer;
        }
      }
    }
  }
  .site-popup {
    padding: 10px;
    background-color: #fff;
  }
}
</style>
