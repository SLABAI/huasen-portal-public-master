<template>
  <div class="hs-wrap">
    <div class="left" v-if="showLeft">
      <div class="logo">
        <img src="~@/assets/img/logo/favicon.svg" />
      </div>
      <ul class="navbar">
        <router-link :to="item.path" v-for="(item, index) in this.navs" :key="index">
          <el-tooltip effect="dark" :content="item.name" placement="right">
            <li>
              <i :class="item.iconClass"> </i>
            </li>
          </el-tooltip>
        </router-link>
      </ul>
    </div>
    <div
      class="right"
      :class="{
        rightSimple:
          $store.state.userInfo.config.simpleMode || !$store.state.triggerInfo.isShowLeft,
      }"
    >
      <header v-if="showHeader" :style="headerStyle" :class="{ unFoldStatus: isHeaderClass }">
        <!-- 折叠 -->
        <section class="fold">
          <i class="iconfont icon-md-barcode" @click="foldLeft"></i>
        </section>
        <!-- 菜单按钮 -->
        <section class="trigger" @click="() => (isFoldLink = !isFoldLink)">
          <i class="iconfont icon-md-menu"></i>
        </section>
        <!-- 链接内容 -->
        <section class="collapse" v-if="!isFoldLink">
          <ul class="links">
            <li @click="() => TOOL.openPage('http://huasen.cc/')">
              <i class="iconfont icon-md-home"></i> 花森小窝
            </li>
            <li
              @click="
                () =>
                  TOOL.jumpToRead(
                    this,
                    this.$store.state.commonInfo.takeSource.config.updateArticle,
                  )
              "
            >
              <i class="iconfont icon-md-stats"> </i>
              更新日志
            </li>
            <li
              @click="
                () =>
                  TOOL.jumpToRead(this, this.$store.state.commonInfo.takeSource.config.aboutArticle)
              "
            >
              <i class="iconfont icon-md-at"></i>
              关于我们
            </li>
          </ul>
        </section>
        <!-- 天气 -->
        <section class="weather">
          <div class="clock"><hs-clock></hs-clock></div>
          <div class="weather-pupop"><hs-weather></hs-weather></div>
        </section>
        <!-- 选择模版 -->
        <section class="take" v-if="!isFoldLink">
          <el-dropdown
            class="dropdown"
            trigger="click"
            v-if="takeResouces.length !== 0"
            @command="selectTake"
          >
            <span class="el-dropdown-link text-gray-500 pointer" :style="takeStyle">
              {{ takeLabel }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in takeResouces" :key="item.aid" :command="item">
                {{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </section>
        <!-- 登陆注册 -->
        <section class="login" v-if="!isFoldLink">
          <span
            class="pointer"
            v-if="!this.$store.state.userInfo.id"
            @click="() => (isOpenSignPanel = true)"
          >
            登陆注册
          </span>
          <span class="pointer" v-else @click="() => (isOpenPersonPanel = true)">
            {{ this.$store.state.userInfo.name || '花森粉酱' }}
          </span>
        </section>
      </header>
      <main ref="content" id="wrap-content">
        <slot></slot>
      </main>
    </div>
    <!-- 左侧浮框 -->
    <div
      class="sidebar"
      v-if="
        this.$store.state.triggerInfo.isShowSidebar && !this.$store.state.userInfo.config.simpleMode
      "
    >
      <ul>
        <li v-if="isShowRocket" class="shadow">
          <i class="iconfont icon-md-rocket" @click="goTop(0)"></i>
        </li>
        <li class="shadow">
          <i class="iconfont icon-weixin"></i>
          <div></div>
        </li>
        <li
          class="shadow"
          @click="
            () => TOOL.jumpToRead(this, this.$store.state.commonInfo.takeSource.config.helpArticle)
          "
        >
          <i class="iconfont icon-md-help-circle"></i>
        </li>
      </ul>
    </div>
    <!-- 登陆面板 -->
    <hs-popup title="登陆注册" :isShow.sync="isOpenSignPanel">
      <hs-sign></hs-sign>
    </hs-popup>
    <hs-popup title="个人中心" :isShow.sync="isOpenPersonPanel">
      <hs-person></hs-person>
    </hs-popup>
  </div>
</template>
<script>
import navs from '@/config/nav.config.js';
import HsWeather from '@/components/common/weather/Weather';
import HsClock from '@/components/common/clock/Clock';
import HsSign from '@/components/content/sign/Sign';
import HsPopup from '@/components/common/popup/Popup.vue';
import HsPerson from '@/components/content/person/Person.vue';
import Bus from '@/plugin/event-bus.js';
import * as BusType from '@/plugin/event-type.js';

export default {
  name: 'Wrap',

  components: { HsWeather, HsClock, HsSign, HsPopup, HsPerson },

  data() {
    return {
      navs,
      isFoldLink: document.body.clientWidth > 1024 ? false : true,
      isShowRocket: false,
      isOpenSignPanel: false,
      isOpenPersonPanel: false,
      isHeaderClass: false,
      headerFontColor: '',
      headerFilter: '',
      backgroundColor: '',
      takeLabel: '默认订阅',
      takeResouces: [],
    };
  },

  watch: {
    '$store.state.userInfo.config': {
      handler(nV, oV) {
        this.headerFontColor = nV.headerFontColor;
        this.backgroundColor = nV.backgroundColor;
        this.headerFilter = nV.headerFilter;
      },
      deep: true,
      immediate: true,
    },
    '$store.state.userInfo.config.simpleMode': {
      handler(nV, oV) {
        if (!nV) {
          this.$nextTick(() => {
            this.initScrollEvent();
          });
        }
      },
      deep: true,
    },
    isFoldLink: {
      handler(nV, oV) {
        if (nV) {
          this.isHeaderClass = false;
        } else {
          if (document.body.clientWidth > 1024) {
            this.isHeaderClass = false;
          } else {
            this.isHeaderClass = true;
          }
        }
      },
      immediate: true,
    },
  },

  computed: {
    // 头部的样式
    headerStyle() {
      return {
        color: this.headerFontColor,
        filter: this.headerFilter,
        backgroundColor: this.backgroundColor,
      };
    },
    // 订阅的样式
    takeStyle() {
      return {
        color: this.headerFontColor,
      };
    },
    showLeft() {
      return (
        this.$store.state.triggerInfo.isShowLeft && !this.$store.state.userInfo.config.simpleMode
      );
    },
    showHeader() {
      return (
        this.$store.state.triggerInfo.isShowHeader && !this.$store.state.userInfo.config.simpleMode
      );
    },
  },

  mounted() {
    this.initScrollEvent();
    this.initResizeEvent();
    this.queryTakeResouce();
    Bus.subEv(BusType.UPDATE_SITE_POSITION, y => {
      this.$refs.content.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    });
  },

  destroyed() {
    Bus.unSubEv(BusType.UPDATE_SITE_POSITION);
  },

  methods: {
    // 初始化滚动事件，滚动距离大于100，则调整样式，显示回到顶部的火箭按钮
    initScrollEvent() {
      let debounce = this.TOOL.debounce(event => {
        if (event.target.scrollTop > 180) {
          this.isShowRocket = true;
          this.headerFontColor = '#555';
          this.backgroundColor = `rgba(255, 255, 255, 1)`;
        } else if (event.target.scrollTop > 30) {
          this.isShowRocket = true;
          this.headerFontColor = '#555';
          this.backgroundColor = `rgba(255, 255, 255, 0.8)`;
        } else {
          this.isShowRocket = false;
          this.headerFontColor = this.$store.state.userInfo.config.headerFontColor;
          this.backgroundColor = this.$store.state.userInfo.config.headerBackgroundColor;
        }
      }, 10);
      this.$refs.content.addEventListener('scroll', debounce);
      this.$once('hook:beforeDestory', () => {
        this.$refs.content.removeEventListener('scroll', debounce);
      });
    },
    // 根据窗口宽度大于1024，则关闭折叠
    initResizeEvent() {
      let debounce = this.LODASH.debounce(
        () => {
          if (document.body.clientWidth > 1024) {
            this.isFoldLink = false;
          } else {
            this.isFoldLink = true;
          }
        },
        100,
        {
          leading: true,
          trailing: true,
        },
      );
      window.addEventListener('resize', debounce);
      this.$once('hook:beforeDestory', () => {
        window.removeEventListener('resize', debounce);
      });
    },
    // 回到顶部
    goTop(y) {
      this.$refs.content.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    },
    // 获取订阅信息
    queryTakeResouce() {
      this.API.findTakeSource().then(res => {
        this.takeResouces = res.data.data;
        // 发送订阅数据时间
        if (res.data.data.length != 0) {
          this.takeLabel = res.data.data[0].name;
          this.$store.state.commonInfo.takeSource = res.data.data[0];
        }
      });
    },
    // 对应的订阅源
    selectTake(take) {
      this.takeLabel = take.name;
      this.$store.state.commonInfo.takeSource = take;
    },
    // 折叠左栏
    foldLeft() {
      this.$store.state.triggerInfo.isShowLeft = !this.$store.state.triggerInfo.isShowLeft;
    },
  },
};
</script>

<style lang="scss" scoped>
.hs-wrap {
  width: 100%;
  height: 100%;
  min-width: 435px;
  display: flex;
  align-items: center;
  .left {
    width: 60px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    overflow-y: scroll;
    .logo {
      width: 100%;
      height: 75px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        position: relative;
        left: 3px;
        width: 40px;
        height: 40px;
      }
    }
    .navbar {
      flex: 1;
      display: flex;
      flex-direction: column;
      li {
        width: 32px;
        height: 32px;
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 28px;
        }
      }
      .router-link-active {
        color: red;
      }
    }
  }
  .right {
    position: relative;
    width: calc(100% - 60px);
    height: 100%;
    header {
      position: absolute;
      top: 0;
      width: 100%;
      height: 75px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      color: #c5c5c5;
      background-color: transparent;
      z-index: 100;
      .fold {
        width: 75px;
        height: 75px;
        display: flex;
        justify-content: center;
        align-items: center;
        order: 1;
        i {
          font-size: 28px;
          cursor: pointer;
        }
      }
      .trigger {
        display: none;
        order: 4;
        i {
          cursor: pointer;
        }
      }
      .take {
        order: 5;
        z-index: 5;
      }
      .login {
        order: 6;
        max-width: 100px;
        margin: 0 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        span {
          margin-left: 3px;
        }
      }
      .collapse {
        order: 2;
        .links {
          display: flex;
          align-items: center;
          li {
            margin-left: 12px;
            cursor: pointer;
            &:first-of-type {
              margin-left: 0;
            }
          }
        }
      }
      .weather {
        order: 3;
        display: flex;
        align-items: center;
        margin-left: 12px;
        margin-right: auto;
        z-index: 10;
      }
    }
    .unFoldStatus {
      background-color: rgba(255, 255, 255, 0.8) !important;
      color: #555 !important;
      .take {
        .el-dropdown-link {
          color: #555 !important;
        }
        .el-icon-arrow-down {
          visibility: hidden;
        }
      }
    }
    main {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: #f9f9f9;
    }
  }
  .rightSimple {
    width: 100% !important;
  }
  .sidebar {
    position: absolute;
    right: 0;
    bottom: 50px;
    z-index: 100;
    ul {
      li {
        width: 40px;
        height: 40px;
        display: flex;
        margin: 10px 20px;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: #eee;
        opacity: 0.8;
        i {
          font-size: 24px;
          font-weight: bold;
          color: #777;
        }
        div {
          position: absolute;
          left: -100px;
          display: none;
          width: 100px;
          height: 100px;
          padding: 5px;
          background-color: #777;
          background-image: url('~@/assets/img/logo/weixin.png');
          background-size: 90% 90%;
          background-position: center center;
          background-repeat: no-repeat;
          &::after {
            content: '';
            border-width: 8px;
            border-color: transparent;
            border-left-color: #777;
            border-style: solid;
            position: absolute;
            top: calc(50% - 8px);
            right: -16px;
          }
        }
        &:hover {
          div {
            display: block;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 1024px) {
  .hs-wrap {
    .right {
      header {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .login {
          max-width: 68px;
          order: 4;
          margin: 0;
          margin-top: 10px;
          margin-left: 34px;
          display: block;
          span {
            margin: 0;
          }
        }
        .take {
          width: 100%;
          order: 5;
          margin: 0;
          margin-top: 10px;
          margin-bottom: 10px;
          margin-left: 34px;
          display: block;
        }
        .fold {
          display: none;
        }
        .weather {
          order: 1;
          height: 75px;
          margin-left: 6px;
          .clock {
            order: 2;
          }
          .weather-pupop {
            max-width: 185px;
            overflow: hidden;
            order: 1;
          }
        }
        .trigger {
          order: 2;
          display: block;
          margin: 0 6px;
          i {
            font-size: 24px;
          }
        }
        .collapse {
          width: 100%;
          order: 3;
          .links {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0px 15px;
            li {
              width: 100%;
              margin-top: 10px;
              margin-left: 0px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.8);
            }
          }
        }
      }
    }
  }
}
</style>
