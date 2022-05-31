<template>
  <div class="h-area">
    <div
      ref="areaContent"
      class="area-content"
      :class="{ 'full-active': anchors.length == 0 }"
      v-highlight
      v-html="htmlText"
    ></div>
    <ul
      v-if="anchors.length != 0"
      class="areaCatalog block md:hidden overflow-x-hidden overflow-y-auto"
    >
      <li v-for="(item, index) in anchors" :key="index" :style="handleStyle(item)">
        <i
          class="point"
          v-if="item.tagName == 'H1' || item.tagName == 'H2'"
          :class="{ h1Point: item.tagName == 'H1', h2Point: item.tagName == 'H2' }"
        >
        </i>
        <div class="anchor-title pointer" :title="item.value" @click="goAnchor(item.id)">
          {{ item.value }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
const showdownJS = require('showdown');
const converter = new showdownJS.Converter();
converter.setOption('tables', true);
converter.setOption('emoji', true);

export default {
  name: 'HArea',
  data() {
    return {
      anchors: [],
      htmlText: '',
    };
  },
  props: {
    value: {
      type: String,
      default: () => {
        return '';
      },
    },
  },
  watch: {
    value: {
      handler(nV, oV) {
        this.htmlText = converter.makeHtml(this.value);
        this.$nextTick(() => {
          this.collectAnchors();
        });
      },
    },
  },
  methods: {
    handleStyle(item) {
      if (item.tagName == 'H1') {
        return { paddingLeft: '0px', fontWeight: '500' };
      } else if (item.tagName == 'H2') {
        return { paddingLeft: '8px', color: '#6a6a6a' };
      } else if (item.tagName == 'H3') {
        return { paddingLeft: '16px', fontSize: '12px' };
      }
    },
    // 解析markdown文档，获取h1、h2、h3标签
    collectAnchors() {
      let contentDom = this.$refs.areaContent;
      let anchors = [...contentDom.querySelectorAll('h1, h2, h3, h4, h5, h6')].map(item => {
        return {
          id: item.id,
          tagName: item.nodeName,
          value: item.innerText,
        };
      });
      this.anchors = anchors.filter(item => {
        return item.tagName == 'H1' || item.tagName == 'H2' || item.tagName == 'H3';
      });
    },
    // 手动实现锚点跳转
    goAnchor(id) {
      let target = document.getElementById(id);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.h-area {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  ::v-deep .area-content {
    width: calc(100% - 150px);
    height: 100%;
    pre,
    code {
      font-size: 14px;
      font-family: Roboto, 'Courier New', Consolas, Inconsolata, Courier, monospace;
      margin: auto 5px;
    }

    code {
      white-space: pre-wrap;
      border-radius: 2px;
      display: inline;
    }

    pre {
      font-size: 15px;
      line-height: 1.4em;
      display: block !important;
      background-color: #f7f7f7;
      padding: 10px 5px;
      box-sizing: border-box;
    }

    pre code {
      white-space: pre;
      overflow: auto;
      border-radius: 3px;
      padding: 10px 5px;
      background-color: #fff;
      display: block !important;
    }

    strong,
    b {
      color: #bf360c;
    }

    em,
    i {
      color: #ff7f6c;
    }

    hr {
      border: 1px solid #bf360c;
      margin: 1.5em auto;
    }

    p {
      margin: 0 5px 1.5em 5px !important;
      img {
        width: 100%;
      }
    }

    table,
    pre,
    dl,
    blockquote,
    q,
    ul,
    ol {
      margin: 10px 5px;
    }
    ul,
    ol {
      padding-left: 15px;
    }
    ul li {
      list-style-type: disc !important;
    }
    ol li {
      list-style-type: decimal !important;
    }
    li {
      margin: 10px;
    }
    li p {
      margin: 0px 0 10px 0 !important;
    }

    ul ul,
    ul ol,
    ol ul,
    ol ol {
      margin: 0;
      padding-left: 10px;
    }
    dl {
      padding: 0;
    }
    dl dt {
      font-size: 1em;
      font-weight: bold;
      font-style: italic;
    }
    dl dd {
      margin: 0 0 10px;
      padding: 0 10px;
    }
    blockquote,
    q {
      border-left: 2px solid #ff7f6c;
      padding: 0 10px;
      color: #777777;
      quotes: none;
      margin-left: 1em;
    }

    blockquote::before,
    blockquote::after,
    q::before,
    q::after {
      content: none;
    }
    blockquote {
      margin: 10px 5px;
      padding: none;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 20px 0 10px;
      padding: 0;
      font-style: bold !important;
      color: #ff7f6c !important;
      text-align: left !important;
      margin: 1.5em 5px !important;
      padding: 0.5em 0em !important;
    }

    h1 {
      margin: 1.5em 5px !important;
      font-size: 24px !important;
      border-bottom: 1px solid #ddd !important;
    }

    h2 {
      margin: 1.2em 5px !important;
      font-size: 20px !important;
      border-bottom: 1px dashed #eee !important;
    }

    h3 {
      margin: 1em 5px !important;
      font-size: 18px;
      color: var(--font) !important;
    }

    h4 {
      margin: 0.8em 5px !important;
      font-size: 16px;
      color: var(--font) !important;
    }

    h5 {
      margin: 0.6em 5px !important;
      color: #5f6367 !important;
    }

    h6 {
      margin: 0.4em 5px !important;
      color: #777777 !important;
    }

    a {
      margin: 1em 5px !important;
      color: #92c8f0 !important;
    }

    table {
      width: 100%;
      padding: 0;
      border-collapse: collapse;
      border-spacing: 0;
      font-size: 1em;
      font: inherit;
      border: 0;
      margin: 0 auto;
    }

    tbody {
      margin: 0;
      padding: 0;
      border: 0;
    }

    table tr {
      border: 0;
      border-top: 1px solid #ccc;
      background-color: white;
      margin: 0;
      padding: 0;
    }

    table tr:nth-child(2n) {
      background-color: #f8f8f8;
    }

    table tr th,
    table tr td {
      font-size: 16px;
      border: 1px solid #ccc;
      margin: 0;
      padding: 5px 10px;
    }

    table tr th {
      font-weight: bold;
      color: #eee;
      border: 1px solid #ff7f6c;
      background-color: #ff7f6c;
    }
  }
  ::v-deep .full-active {
    width: 100%;
    height: 100%;
  }
  .areaCatalog {
    position: fixed;
    right: 2px;
    top: 50%;
    transform: translate(0, -50%);
    width: 150px;
    height: 480px;
    padding: 0 10px;
    border-left: 1px solid #dddddd;
    box-sizing: border-box;
    li {
      width: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      .h1Point {
        position: absolute;
        left: -3px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: red;
        z-index: 10;
      }
      .h2Point {
        position: absolute;
        left: -3px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: orange;
        z-index: 10;
      }
      .anchor-title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
      a {
        position: relative;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }
    }
  }
}
@media only screen and (max-width: 1024px) {
  ::v-deep .area-content {
    width: 100% !important;
  }
}
@media only screen and (max-height: 640px) {
  ::v-deep .area-content {
    width: 100% !important;
  }
  .areaCatalog {
    display: none !important;
  }
}
</style>
