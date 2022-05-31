<!--
 * @Autor: huasenjio
 * @Date: 2021-10-30 18:17:36
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-02-23 00:05:15
 * @Description: 
-->
<template>
  <div class="hs-wrap">
    <div class="left" v-if="!foldLeft">
      <div class="logo"><span>花森后台管理</span></div>
      <nav>
        <ul>
          <router-link
            :to="item.path"
            v-for="item in this.navs"
            :key="item.path"
            custom
            v-slot="{ navigate }"
          >
            <li
              :class="{ routerActive: getRouterLinkActive(item) }"
              @click="navigate"
              @keypress.enter="navigate"
              role="link"
            >
              <i :class="item.iconClass"></i>
              <div class="name">{{ item.name }}</div>
            </li>
          </router-link>
        </ul>
      </nav>
    </div>
    <div class="right" :class="{ full: foldLeft }">
      <header>
        <div class="fold-box" @click="() => (foldLeft = !foldLeft)">
          <i class="iconfont icon-a-unfoldcross-line"></i>
        </div>
        <div class="status-box">
          <i
            class="iconfont icon-a-usereditor-line"
            v-if="this.$store.state.statusInfo.isLogin"
            @click="() => (openPersonPanel = !openPersonPanel)"
          >
          </i>
          <i class="iconfont icon-a-useradd-line" v-else @click="goLogin"></i>
        </div>
      </header>
      <main>
        <div class="content">
          <div class="title">{{ this.$route.meta.title }}</div>
          <div class="view-body">
            <slot></slot>
          </div>
          <div class="footer">
            森 酱 后 台 管 理 由 腾 讯 云 强 力 驱 动 · 2021 年 2 月 3 日
          </div>
        </div>
      </main>
    </div>
    <hs-popup title="个人中心" :isShow.sync="openPersonPanel">
      <hs-person></hs-person>
    </hs-popup>
  </div>
</template>
<script>
import HsPopup from '@/components/common/popup/Popup.vue';
import HsPerson from '@/components/content/person/Person.vue';
export default {
  name: 'Wrap',
  data() {
    return {
      foldLeft: false,
      openPersonPanel: false,
      navs: [
        {
          name: '数据表盘',
          path: '/home',
          iconClass: 'iconfont icon-md-planet',
        },
        {
          name: '发布新闻',
          path: '/public',
          iconClass: 'iconfont icon-a-edit2-line',
        },
        {
          name: '新闻管理',
          path: '/news-manage',
          iconClass: 'iconfont icon-md-stats',
        },
        {
          name: '网链管理',
          path: '/site-manage',
          iconClass: 'iconfont icon-a-smartrobot-fill',
        },
        {
          name: '人员管理',
          path: '/user-manage',
          iconClass: 'iconfont icon-md-happy',
        },
        {
          name: '文件管理',
          path: '/file-manage',
          iconClass: 'iconfont icon-a-documentationupload-line',
        },
      ],
    };
  },
  components: { HsPopup, HsPerson },
  computed: {
    handleLoginStatus() {
      return {};
    },
  },
  mounted() {},
  methods: {
    getRouterLinkActive(item) {
      if (this.$route.path == item.path) {
        return true;
      } else {
        return false;
      }
    },
    goLogin() {
      this.$router.push('/sign');
    },
  },
};
</script>

<style lang="scss" scoped>
.hs-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .left {
    width: 200px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #30353f;
    .logo {
      width: 100%;
      height: 60px;
      text-align: center;
      line-height: 60px;
      background-color: #eeeeee;
      background-image: url('~@/assets/img/logo/favicon.svg');
      background-position: 18px center;
      background-size: 38px 38px;
      background-repeat: no-repeat;
      span {
        font-size: 20px;
        position: relative;
        left: 20px;
        top: 5px;
      }
    }
    nav {
      ul {
        li {
          display: flex;
          align-items: center;
          padding: 15px 0;
          color: #a7b1c2;
          cursor: pointer;
          i {
            margin-left: 20px;
            font-size: 24px;
          }
          .name {
            margin-left: 10px;
            font-size: 16px;
          }
          &:first-of-type {
            margin-top: 0;
          }
          &:hover {
            color: #fff;
            background-color: #272c35;
          }
        }
        .routerActive {
          color: #fff;
          background-color: #272c35;
        }
      }
    }
  }
  .right {
    width: calc(100% - 200px);
    height: 100%;
    header {
      width: 100%;
      height: 60px;
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      // box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
      i {
        font-size: 28px;
        font-weight: 500;
        color: var(--font);
        cursor: pointer;
      }
    }
    main {
      width: 100%;
      height: calc(100% - 60px);
      padding: 0 15px;
      background-color: #f1f1f1;
      .content {
        width: calc(100% - 30px);
        height: 100%;
        .title {
          width: 100%;
          height: 50px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          font-size: 18px;
          color: #fff;
          background-color: #6e8bd7;
          box-sizing: border-box;
        }
        .view-body {
          width: 100%;
          height: calc(100% - 80px);
          // padding: 0 10px;
          overflow-x: hidden;
          overflow-y: auto;
          background-color: #fff;
          box-sizing: border-box;
        }
        .footer {
          width: 100%;
          height: 30px;
          padding: 0 10px;
          line-height: 30px;
          background-color: #fff;
          box-sizing: border-box;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
        }
      }
    }
  }
  .full {
    width: 100%;
  }
}
</style>
