<!--
 * @Autor: huasenjio
 * @Date: 2021-12-05 16:10:46
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-03-21 18:40:32
 * @Description: 
-->
<template>
  <div class="h-person">
    <header class="information">
      <div class="head-icon"></div>
      <div class="name text-ellipsis">{{ this.$store.state.userInfo.name }}</div>
      <i class="iconfont icon-tuichu" @click="exit"></i>
    </header>
    <main>
      <ul>
        <li>
          <div class="left">
            <div class="title">清空数据</div>
            <div class="detail">账号将被重置并且所有数据将会销毁</div>
          </div>
          <div class="right">
            <i class="iconfont icon-md-trash"></i>
          </div>
        </li>
        <li>
          <div class="left">
            <div class="title">初始化空间</div>
            <div class="detail">同步克隆根节点中所有的网站内容</div>
          </div>
          <div class="right">
            <i class="iconfont icon-md-sync"></i>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
export default {
  name: 'HPerson',
  data() {
    return {};
  },
  methods: {
    exit() {
      this.STORAGE.setItem('userInfo', undefined);
      this.$tips('warning', '退出成功', null, 2000, () => {
        window.location.reload();
      });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.h-person {
  width: 350px;
  padding: 10px;
  margin: 0 auto;
  border-radius: 3px;
  background-color: white;
  .information {
    width: 90%;
    height: 80px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    border-bottom: 1px #dddfe6 solid;
    .head-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-image: url('~@/assets/img/head/0.png');
      background-size: 100% 100%;
    }
    .name {
      flex: 1;
      font-size: 18px;
      font-weight: 500;
      color: var(--font);
      margin-left: 20px;
    }
    i {
      font-size: 18px;
      color: var(--font);
      cursor: pointer;
    }
  }
  main {
    width: 90%;
    margin: 10px auto;
    ul {
      li {
        margin-top: 10px;
        display: flex;
        align-items: center;
        .left {
          flex: 1;
          .title {
            font-size: 14px;
          }
          .detail {
            font-size: 10px;
            color: #888;
          }
        }
        .right {
          i {
            font-size: 20px;
            color: var(--font);
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
