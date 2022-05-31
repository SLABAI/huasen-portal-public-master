<!--
 * @Autor: huasenjio
 * @Date: 2021-11-28 01:32:34
 * @LastEditors: huasenjio
 * @LastEditTime: 2021-12-05 16:02:21
 * @Description: 
-->
<template>
  <div class="h-shade" v-show="isShow"></div>
</template>

<script>
export default {
  name: "Shade",
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    show() {
      this.$data.isShow = true;
    },
    close() {
      this.$data.isShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.h-shade {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
