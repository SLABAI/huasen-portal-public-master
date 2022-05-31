<!--
 * @Autor: huasenjio
 * @Date: 2021-11-15 00:52:46
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-05-01 17:59:45
 * @Description: 
-->
<template>
  <div class="wallpaper">
    <section class="bg" :style="wallpaperStyle"></section>
    <div class="bg-shadow" :style="bgShadowStyle"></div>
    <div class="bg-fiiter" :style="bgFilterStyle"></div>
  </div>
</template>
<script>
export default {
  name: 'Wallpaper',
  computed: {
    wallpaperStyle() {
      let style = {};
      let userConfig = this.$store.state.userInfo.config;
      let tag = this.TOOL.judageBgType(userConfig.background);
      if (tag === 'imgUrl' || tag === 'module' || tag === 'base64') {
        style.backgroundImage = `url(${userConfig.background})`;
      } else if (tag === 'color') {
        style.backgroundColor = userConfig.background;
      }
      return style;
    },
    bgFilterStyle() {
      let style = {};
      let userConfig = this.$store.state.userInfo.config;
      style.backdropFilter = userConfig.bgFilter;
      return style;
    },
    bgShadowStyle() {
      return {
        opacity: this.$store.state.userInfo.config.bgOpacity,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.wallpaper {
  position: relative;
  width: 100%;
  height: 100%;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center 0;
    background-size: cover;
  }
  .bg-shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
  }
  .bg-fiiter {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>
