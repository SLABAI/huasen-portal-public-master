<!--
 * @Autor: huasenjio
 * @Date: 2022-02-05 11:45:47
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-02-22 23:50:38
 * @Description: 
-->
<template>
  <div class="UserManage">
    <el-tabs class="tab-group" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户列表" name="one"><UserList></UserList></el-tab-pane>
      <el-tab-pane label="管理列表" name="two"><AdminList></AdminList></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UserList from './child/UserList.vue';
import AdminList from './child/AdminList.vue';
export default {
  name: 'UserManage',
  data() {
    return {
      activeName: 'one',
    };
  },
  created() {},
  mounted() {},
  props: {},
  components: {
    UserList,
    AdminList,
  },
  methods: {
    handleClick(tab, event) {},
  },
};
</script>

<style lang="scss" scoped>
.UserManage {
  margin: 10px 0;
  padding: 0 10px;
  .tab-group {
    ::v-deep .el-tabs__item {
      font-size: 16px;
    }
  }
}
</style>
