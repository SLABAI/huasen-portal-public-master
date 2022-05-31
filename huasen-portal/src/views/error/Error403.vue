<!--
 * @Autor: huasenjio
 * @Date: 2021-08-25 01:53:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-27 23:39:26
 * @Description: 
-->
<template>
  <div class="error">
    <card>
      <template v-slot:banner> </template>
      <template v-slot:main
        ><div class="main">
          <img src="~@/assets/img/error/403.svg" />
          <h2>无权访问页面</h2>
        </div>
      </template>
    </card>
  </div>
</template>
<script>
import Card from '@/components/content/card/Card.vue';
export default {
  name: 'Error403',
  components: { Card },
  data() {
    return {};
  },
  mounted() {
    this.initWrap();
  },
  methods: {
    initWrap() {
      this.$store.state.triggerInfo.isShowSidebar = false;
      this.$store.state.triggerInfo.isShowHeader = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.error {
  width: 100%;
  height: 100%;
  position: relative;
  .main {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%);
    h2 {
      text-align: center;
      margin-top: 30px;
      padding: 5px 10px;
    }
    img {
      width: 200px;
    }
  }
}
</style>
