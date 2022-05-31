<!--
 * @Autor: huasenjio
 * @Date: 2021-12-08 23:24:34
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-05-22 14:05:05
 * @Description: 
-->
<template>
  <div class="web-site">
    <section
      :id="`site-anchor-${encodeURI(item.typeName)}`"
      v-for="(item, index) in this.$store.state.commonInfo.takeSource.site"
      :key="index"
    >
      <header>
        <i class="iconfont icon-tag"></i>
        <a class="title" :name="item.typeName">{{ item.typeName }}</a>
      </header>
      <main>
        <ul v-balance>
          <a
            class="site"
            v-for="(v, k) in item.sites"
            :key="k"
            :title="v.describe"
            :href="v.url"
            target="_blank"
          >
            <div class="site-card w-px-180 sm:w-px-150">
              <div class="img-group icon-hs w-px-100 h-px-100" :class="v.imgClass"></div>
              <div
                v-if="v.imgClass === 'icon-hs-default' || v.imgClass === ''"
                class="img-loading w-px-100 h-px-100"
              ></div>
              <div class="text-group">
                <div class="name">{{ v.name }}</div>
                <div class="describe">{{ v.describe }}</div>
              </div>
            </div>
          </a>
        </ul>
      </main>
    </section>
  </div>
</template>
<script>
export default {
  name: 'SiteBar',
  data() {
    return {
      websites: [
        {
          typeName: '常用推荐',
          sites: [
            {
              imgClass: 'icon-hs icon-hs-bilibili',
              name: 'bilibili',
              url: 'http://n.huasen.cc/',
              describe: '中国最大的二次元娱乐网站平台',
            },
          ],
        },
        {
          typeName: '在线工具',
          sites: [],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.web-site {
  width: calc(100% - 20px);
  margin: 10px auto;
  section {
    margin-top: 10px;
    padding: 10px;
    border-radius: 3px;
    background-color: #fff;
    header {
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        font-weight: 500;
      }
      .title {
        margin-left: 10px;
        font-size: 16px;
        font-weight: 500;
        color: var(--font);
      }
    }
    main {
      ul {
        display: flex;
        flex-wrap: wrap;
        .site {
          margin-top: 10px;
          .site-card {
            position: relative;
            height: 50px;
            padding: 5px;
            display: flex;
            align-items: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            border: 1px solid rgba(0, 0, 0, 0.03);
            border-radius: 3px;
            box-shadow: 0px 0px 20px -5px rgba(158, 158, 158, 0.2);
            transition: all 0.3s ease;
            .img-group {
              position: absolute;
              left: -18px;
              transform: scale(0.4, 0.4);
              z-index: 12;
            }
            .img-loading {
              position: absolute;
              left: -18px;
              transform: scale(0.4, 0.4);
              background-image: url('/img/loading/1.gif');
              background-repeat: no-repeat;
              background-size: contain;
              background-position: center center;
              z-index: 10;
            }
            .text-group {
              width: calc(100% - 50px);
              display: block;
              margin-left: 60px;
              .name {
                font-weight: 500;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
              }
              .describe {
                font-size: 12px;
                color: #888;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
              }
            }
            &:hover {
              transform: translateY(-3px);
              box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3);
            }
          }
        }
      }
    }
  }
  // 动态插入样式名，实现锚点效果
  .active-anchor {
    header {
      i {
        color: red !important;
      }
      a {
        color: red !important;
      }
    }
  }
}
</style>
