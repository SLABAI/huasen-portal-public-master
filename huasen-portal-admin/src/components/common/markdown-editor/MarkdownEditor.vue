<!--
 * @Autor: huasenjio
 * @Date: 2022-01-03 22:51:15
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-01-16 12:14:57
 * @Description: 
-->

<template>
  <div class="h-markdown-editor">
    <mavon-editor
      class="markdown-editor"
      :toolbars="this.toolbars"
      v-model="value"
      :scrollStyle="true"
      :transition="true"
      :placeholder="'开始记录点滴...'"
      :codeStyle="'code-github'"
      :editable="true"
      :ishljs="true"
      :tabSize="2"
      @save="save"
      @change="change"
    >
    </mavon-editor>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'; // 引入markdowm语法编辑器
import 'mavon-editor/dist/css/index.css'; // 编辑器风格样式文件

export default {
  name: 'MarkdownEditor',
  data() {
    return {
      value: '',
      // 工具栏配置
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        mark: false, // 标记
        superscript: false, // 上角标
        quote: true, // 引用
        ol: true, // 有序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        help: false, // 帮助
        code: true, // code
        subfield: true, // 是否需要分栏
        fullscreen: true, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        undo: true, // 上一步
        shortCut: false, // 启用快捷键
        trash: true, // 清空
        autofocus: false,
        save: true, // 保存（触发events中的save事件）
        navigation: false, // 导航目录
      },
      prop: {
        subfield: true, // 单双栏模式
        defaultOpen: 'preview', //edit： 默认展示编辑区域  preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true,
      },
    };
  },
  props: {
    markdownText: {
      type: String,
      default: () => {
        return '';
      },
    },
  },
  watch: {
    value: {
      handler(nV, oV) {
        this.$emit('sendMarkdownText', nV);
      },
      deep: true,
      immediate: true,
    },
    markdownText: {
      handler(nV, oV) {
        this.value = nV;
      },
    },
  },
  methods: {
    save(value, text) {
      this.$emit('doSave', value);
    },
    change(value, text) {
      this.$emit('doChange', value);
    },
  },
  components: {
    mavonEditor,
  },
};
</script>

<style lang="scss" scoped>
.h-markdown-editor {
  width: calc(100% - 20px);
  margin: 5px 10px;
  position: relative;
  z-index: 10;
  box-sizing: content-box;
  .markdown-editor {
    width: 100%;
    min-height: 500px;
    /*滚动条宽度*/
    ::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
