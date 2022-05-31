<!--
 * @Autor: huasenjio
 * @Date: 2021-10-31 01:33:48
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-05-01 21:04:00
 * @Description: 文章展示页面
-->
<template>
  <div class="Article">
    <ul v-if="!showEmptyPanel" v-balance class="article-group overflow-x-hidden overflow-y-auto">
      <li
        class="article-item w-px-240 h-px-300 my-px-20 shadow-md overflow-hidden rounded-sm"
        v-for="item in articles"
        :key="item._id"
        @click="read(item)"
      >
        <div class="img-group overflow-hidden">
          <img class="w-full" :src="TOOL.handleFileURL(item.bannerImg)" />
        </div>
        <div class="text-group">
          <div class="w-full h-full bg-white relative z-10">
            <div class="title">{{ item.title }}</div>
            <div class="tag-group">
              <div class="tag">{{ item.tag }}</div>
              <div
                class="icon"
                :style="{ backgroundImage: `url(/img/article/${TOOL.randomInt(1, 10)}.png)` }"
              ></div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <section
      v-else
      class="empty-group flex justify-center items-center overflow-x-hidden overflow-y-auto"
    >
      <div class="icon w-px-200 h-px-200">
        <img class="w-full" :src="'/img/article/empty.png'" />
        <span class="w-full text-ellipsis text-center">空空如也</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data() {
    return {
      pageId: 0,
      showEmptyPanel: false,
      articles: [],
    };
  },
  mounted() {
    this.initWrap();
    this.queryAllNews();
  },
  methods: {
    // 初始化界面布局
    initWrap() {
      this.$store.state.triggerInfo.isShowSidebar = false;
      this.$store.state.triggerInfo.isShowHeader = false;
    },
    // 查询所有的新闻文章
    queryAllNews() {
      this.API.findAllNews().then(res => {
        if (res.data.data && res.data.data.length !== 0) {
          this.articles = res.data.data;
        } else {
          this.showEmptyPanel = true;
        }
      });
    },
    // 跳转至阅读页面
    read(articleItem) {
      this.$router.push({ path: `/read/${articleItem._id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.Article {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .article-group {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    margin: 10px;
    border-radius: 4px;
    background-color: #fff;
  }
  .article-item {
    .img-group {
      position: relative;
      width: 100%;
      height: calc(100% - 90px);
      img {
        transition: all 0.3s linear;
        &:hover {
          transform: scale(1.15);
        }
      }
      &::after {
        position: absolute;
        bottom: -50px;
        right: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 60px;
        display: block;
        background-color: rgba(255, 255, 255, 0.5);
        transform: skewY(-15deg);
      }
    }
    .text-group {
      position: relative;
      width: 100%;
      height: 90px;
      cursor: pointer;
      &::before {
        position: absolute;
        top: -18px;
        left: 0;
        right: 0;
        content: '';
        width: 100%;
        height: 80px;
        display: block;
        background-color: white;
        transform: skewY(8deg);
        z-index: 0;
      }
      .title {
        width: 100%;
        padding: 5px 10px;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 500;
        color: var(--font);
      }
      .tag-group {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 5px 10px;
        box-sizing: border-box;
        .tag {
          width: calc(100% - 32px);
          padding: 14px 10px;
          box-sizing: border-box;
          text-align: right;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          box-sizing: border-box;
          font-size: 12px;
          color: #5f5f5f;
        }
        .icon {
          width: 32px;
          height: 32px;
          border: 1px solid #eaeaea;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-position: center center;
        }
      }
    }
  }
  .empty-group {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    margin: 10px;
    border-radius: 4px;
    background-color: #fff;
  }
}
</style>
