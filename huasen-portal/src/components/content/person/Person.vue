<!--
 * @Autor: huasenjio
 * @Date: 2021-12-05 16:10:46
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-24 00:51:33
 * @Description: 
-->
<template>
  <div class="h-person">
    <header class="information">
      <div class="head-icon" :style="headImgStyle"></div>
      <div class="name text-ellipsis">{{ $store.state.userInfo.name }}</div>
      <i class="iconfont icon-tuichu" @click="exit"></i>
    </header>
    <main>
      <ul>
        <li>
          <div class="left">
            <div class="title">备份到云</div>
            <div class="detail">上传本地数据并且覆盖云端内容</div>
          </div>
          <div class="right" @click="backupData">
            <i class="iconfont icon-md-clipboard"></i>
          </div>
        </li>
        <li>
          <div class="left">
            <div class="title">同步云端</div>
            <div class="detail">拉取云端数据更新到本地</div>
          </div>
          <div class="right" @click="syncData">
            <i class="iconfont icon-md-sync"></i>
          </div>
        </li>
        <!-- <li>
          <div class="left">
            <div class="title">清空数据</div>
            <div class="detail">账号将被重置并且所有数据将会销毁</div>
          </div>
          <div class="right">
            <i class="iconfont icon-md-trash"></i>
          </div>
        </li> -->
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
  computed: {
    headImgStyle() {
      let style = {};
      let img = this.$store.state.userInfo.headImg
        ? this.TOOL.handleFileURL(this.$store.state.userInfo.headImg)
        : require('@/assets/img/head/0.png');
      style.backgroundImage = `url(${img})`;
      return style;
    },
  },
  methods: {
    exit() {
      this.$tips('success', '退出成功', null, 2000, () => {
        this.STORAGE.setItem('userInfo', undefined);
        window.location.reload();
      });
    },
    backupData() {
      let userInfo = this.STORAGE.getItem('userInfo');
      this.API.backupData({
        config: JSON.stringify(userInfo.config),
        record: JSON.stringify(userInfo.record),
      });
    },
    syncData() {
      this.API.syncData()
        .then(result => {
          let { id, name, headImg, config, code, record, todoList } = result.data.data;
          this.$store.dispatch('updateLocalUserInfo', {
            id,
            name,
            headImg,
            code,
            record: JSON.parse(record),
            todoList: JSON.parse(todoList),
            config: JSON.parse(config),
          });
        })
        .catch(err => {
          this.$tips('warning', '请重新登陆账号', 'top-right', 1200);
          this.STORAGE.setItem('userInfo', undefined);
          window.location.reload();
        });
    },
  },
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
      // background-image: url('~@/assets/img/head/0.png');
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
