<!--
 * @Autor: huasenjio
 * @Date: 2021-08-25 01:53:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-17 02:11:56
 * @Description: 
-->
<template>
  <div id="app">
    <wrap>
      <keep-alive :include="'Home'">
        <router-view></router-view>
      </keep-alive>
    </wrap>
  </div>
</template>
<script>
import Wrap from './components/content/wrap/Wrap.vue';

export default {
  name: 'App',
  data() {
    return {
      screenScale: {
        scaleX: 1,
        scaleY: 1,
      },
    };
  },
  components: { Wrap },
  computed: {
    // 等比例缩放
    scaleStyle() {
      return {
        transform: `scale(${this.screenScale.scaleX}, ${this.screenScale.scaleY})`,
      };
    },
  },
  mounted() {
    this.$store.dispatch('initUserInfo');
    // this.scale();
    // window.addEventListener('resize', this.scale);
    // this.$once('hook:beforeDestory', () => {
    //   window.removeEventListener('resize', this.scale);
    // });
  },
  methods: {
    scale() {
      let width = document.body.clientWidth;
      let height = document.body.clientHeight;
      this.screenScale.scaleX = width / 1920;
      this.screenScale.scaleY = height / 1080;
    },
  },
};
</script>

<style lang="scss">
@import url('./assets/css/index.css');
#app {
  // transform-origin: left top;
  position: relative;
  width: 100vw;
  height: 100vh;
  // width: 1920px;
  // height: 1080px;
  min-width: 1280px;
  min-height: 800px;
  overflow-x: hidden;
  overflow-y: hidden;
}

// 针对el-popconfirm组件插入body的情况
// .delete-popcomfirm {
//   .el-popconfirm {
//     .el-popconfirm__main {
//       padding: 10px 0;
//     }
//   }
// }
</style>
