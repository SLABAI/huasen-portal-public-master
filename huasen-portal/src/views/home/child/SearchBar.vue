<template>
  <div class="search-bar">
    <ul class="menu" :style="menuStyle">
      <li
        v-for="(item, index) in this.searchs"
        :key="index"
        :data-url="item.url"
        :data-keyword="item.key"
        class="xl:text-base"
        :class="{ active: activeSearchIndex == index }"
        @click="activeSearchIndex = index"
      >
        {{ item.name }}
      </li>
    </ul>
    <form @submit.prevent="doSearch">
      <!-- 搜索引擎下拉菜单 -->
      <div class="left">
        <i :class="currentSearch.iconClass"></i>
      </div>
      <!-- 搜索输入框 -->
      <div class="center">
        <el-input
          v-model="searchText"
          placeholder="搜索一下..."
          :autofocus="true"
          clearable
          @keyup.native="handleIdea"
        >
        </el-input>
      </div>
      <div class="right">
        <i class="iconfont icon-md-search" @click="doSearch"></i>
      </div>
      <ul class="idea shadow" v-if="searchText && ideas.length != 0">
        <li
          v-for="(item, index) in ideas"
          :key="index"
          @click="doSearchByHover(item)"
          :class="{ active: index == activeIdeaIndex }"
        >
          {{ item }}
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import searchs from '@/config/search.config.js';
import { jsonp } from '@/network/http.js';
import { AF } from '@/plugin/AF.js';
export default {
  name: 'SearchBar',
  data() {
    return {
      af: new AF(this, 200),
      searchText: '',
      searchs,
      activeSearchIndex: 0,
      activeIdeaIndex: -1,
      currentSearch: {},
      ideas: [],
    };
  },
  watch: {
    activeSearchIndex: {
      handler(newV, oldV) {
        this.currentSearch = this.searchs[newV];
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    menuStyle() {
      return {
        color: this.$store.state.userInfo.config.headerFontColor,
      };
    },
  },
  methods: {
    // 处理键盘按下事件
    handleIdea(event) {
      if (
        this.searchText !== undefined &&
        this.searchText !== null &&
        event.keyCode !== 40 &&
        event.keyCode !== 38
      ) {
        this.af.run(this.getIdea);
      }
      if (event.keyCode == 40 && this.ideas.length !== 0) {
        this.activeIdeaIndex =
          this.activeIdeaIndex == this.ideas.length - 1 ? 0 : this.activeIdeaIndex + 1;
        this.searchText = this.ideas[this.activeIdeaIndex];
      }
      if (event.keyCode == 38 && this.ideas.length !== 0) {
        this.activeIdeaIndex =
          this.activeIdeaIndex > 0 ? this.activeIdeaIndex - 1 : this.ideas.length - 1;
        this.searchText = this.ideas[this.activeIdeaIndex];
      }
    },
    // 进行搜索
    doSearch() {
      if (this.searchText) {
        let params = {};
        params[this.currentSearch.key] = this.searchText;
        if (Object.keys(this.currentSearch.params) != 0) {
          params = Object.assign(params, this.currentSearch.params);
        }
        let url = this.TOOL.handleURL(this.currentSearch.url, params);
        window.open(url);
      }
    },
    // 查询通过hover
    doSearchByHover(value) {
      this.searchText = value;
      this.doSearch();
    },
    // 获取热词
    getIdea() {
      if (this.searchText == '') return;
      jsonp('https://www.baidu.com/su', {
        wd: this.searchText,
        cb: 'handleSuggestion',
      }).then(res => {
        this.ideas = res.s.slice(0, 6);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  background-color: rgba(255, 255, 255, 0.5);
  form {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-self: center;
    align-items: center;
    .left {
      position: relative;
      width: 50px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        font-size: 24px;
        font-weight: 500;
        cursor: pointer;
      }
    }
    .center {
      width: calc(100% - 100px);
      height: 100%;
      ::v-deep .el-input__inner {
        border-radius: 0;
        border: none;
        background: transparent;
        &::placeholder {
          color: #555;
        }
      }
      ::v-deep .el-input__suffix {
        i {
          font-size: 16px;
          font-weight: 500;
          color: #555;
        }
      }
    }
    .right {
      width: 50px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        font-size: 24px;
        font-weight: 500;
      }
    }
    .idea {
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      max-height: 180px;
      border-radius: 3px;
      background-color: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(8px);
      // border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: rgba(142, 142, 142, 0.2) 0px 6px 15px 0px;
      border-radius: 4px;
      color: #555;
      li {
        padding: 5px 10px;
        border-radius: 3px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        cursor: pointer;
        &:hover {
          color: #000;
          background-color: rgba(255, 255, 255, 0.3);
        }
      }
      .active {
        color: #000;
        background-color: rgba(255, 255, 255, 0.3);
        cursor: pointer;
      }
    }
  }
  .menu {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    li {
      position: relative;
      margin-top: 5px;
      cursor: pointer;
      // color: #a8a8a8;
      &:first-child {
        margin-left: 0;
      }
    }
    .active {
      &::after {
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        display: block;
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: greenyellow;
      }
    }
  }
}
</style>
