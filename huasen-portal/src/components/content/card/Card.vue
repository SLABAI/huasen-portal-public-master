<!--
 * @Autor: huasenjio
 * @Date: 2021-10-31 21:17:59
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-05 00:46:11
 * @Description: 
-->
<template>
  <div class="hs-card">
    <!-- 封面 -->
    <div class="banner" :class="{ bannerSimple: this.$store.state.userInfo.config.simpleMode }">
      <slot name="banner"></slot>
    </div>
    <!-- 内容 -->
    <div class="main" :class="{ mainSimple: this.$store.state.userInfo.config.simpleMode }">
      <slot name="main"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Card',
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.hs-card {
  width: 100%;
  height: 100%;
  .banner {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 285px;
  }
  .main {
    width: 100%;
    height: auto;
  }
  .bannerSimple {
    width: 100%;
    height: 100%;
  }
  .mainSimple {
    display: none;
  }
}
</style>
