<!--
 * @Autor: huasenjio
 * @Date: 2022-01-19 00:38:51
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-02-21 01:17:22
 * @Description: 
-->
<template>
  <div class="SiteManage">
    <el-tabs class="tab-group" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="主页网址" name="one">
        <home-page></home-page>
      </el-tab-pane>
      <el-tab-pane label="精灵图库" name="two"><SpriteIconPage></SpriteIconPage></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import HomePage from './child/HomePage.vue';
import SpriteIconPage from './child/SpriteIconPage.vue';

export default {
  name: 'SiteManage',
  data() {
    return {
      activeName: 'one',
    };
  },
  created() {
    this.querySiteDataByToken();
  },
  mounted() {},
  props: {},
  components: {
    HomePage,
    SpriteIconPage,
  },
  methods: {
    handleClick(tab, event) {},
    querySiteDataByToken() {
      this.API.getSiteData().then(lists => {
        let target = lists.data.data[0];
        this.$store.dispatch('initUserSiteData', {
          site: target.site,
          toy: target.resource,
          config: target.config,
          resource: target.resource,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.SiteManage {
  margin: 10px 0;
  padding: 0 10px;
  .tab-group {
    ::v-deep .el-tabs__item {
      font-size: 16px;
    }
  }
}
</style>
