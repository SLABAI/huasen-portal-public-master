<!--
 * @Autor: huasenjio
 * @Date: 2021-08-25 01:53:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-17 01:56:03
 * @Description: 
-->
<template>
  <div id="app">
    <div v-if="!isSupport" class="ie-tips-panel">
      <div class="icon-group"></div>
      <div class="link-group">
        <div class="title">为了您更好的使用体验 请点击图标升级浏览器</div>
        <a :href="item.url" target="_blank" v-for="item in tips" :key="item.name">
          <div class="img-box w-full"><img class="w-full" :src="item.img" /></div>
          <div class="name-box w-full">{{ item.name }}</div>
        </a>
      </div>
    </div>
    <wrap v-else>
      <router-view></router-view>
    </wrap>
  </div>
</template>

<script>
import watermark from './plugin/watermark.js';
import Wrap from './components/content/wrap/Wrap.vue';

export default {
  name: 'App',
  data() {
    return {
      tips: [
        {
          name: 'chrome',
          img: require('@/assets/img/browser/chrome.png'),
          url: 'https://www.google.com/intl/zh-CN/chrome/',
        },
        {
          name: 'edge',
          img: require('@/assets/img/browser/edge.png'),
          url: 'https://www.microsoft.com/zh-cn/edge',
        },
        {
          name: 'firefox',
          img: require('@/assets/img/browser/firefox.png'),
          url: 'http://www.firefox.com.cn/',
        },
        {
          name: 'safari',
          img: require('@/assets/img/browser/safari.png'),
          url: 'https://support.apple.com/zh_CN/downloads/safari',
        },
      ],
    };
  },
  components: { Wrap },
  computed: {
    isSupport() {
      let temp = this.TOOL.juadgeIE();
      console.log('浏览器信息：' + temp);
      if (temp === -1 || temp === 'edge') {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    // 处理用户信息
    this.$store.dispatch('getLocalUserInfo');
    if (document.getElementById('Loading')) {
      document.body.removeChild(document.getElementById('Loading')); // vue实例挂载后移除加载爱心加载效果
    }
  },
};
</script>

<style lang="scss">
@import url('./assets/css/index.css');
#app {
  position: relative;
  min-width: 435px;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  .ie-tips-panel {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon-group {
      width: 200px;
      height: 200px;
      background-image: url('~@/assets/img/error/no-support.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
    }
    .link-group {
      position: relative;
      top: 40px;
      width: 400px;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        position: absolute;
        top: -30px;
        left: 0;
        right: 0;
        text-align: center;
      }
      a {
        display: block;
        cursor: pointer;
        .img-box {
          width: 60px;
          height: 60px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name-box {
          text-align: center;
        }
      }
    }
  }
}
</style>
