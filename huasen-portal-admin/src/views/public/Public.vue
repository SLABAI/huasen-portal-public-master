<!--
 * @Autor: huasenjio
 * @Date: 2021-12-17 22:03:15
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-05-06 01:15:26
 * @Description: 
-->
<template>
  <div class="public">
    <el-form
      ref="newsForm"
      class="news-info-group"
      :model="newsForm"
      status-icon
      :rules="rules"
      :label-position="'top'"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="newsForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="封面链接" prop="bannerImg">
        <el-input v-model="newsForm.bannerImg" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="发布作者" prop="publisher">
        <el-input disabled v-model="newsForm.publisher" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="内容标签">
        <ul class="tag-group overflow-x-auto nowrap">
          <li v-for="(item, index) in tags" :key="index">
            {{ item }}
            <i class="iconfont icon-md-close-circle" v-if="item" @click="deleteTag(index)"></i>
          </li>
        </ul>
        <el-input
          v-model="tagItem"
          autocomplete="off"
          @keyup.enter.native="handleTag"
          placeholder="回车添加标签"
        ></el-input>
      </el-form-item>
      <el-form-item label="访问权限">
        <el-select
          class="w-full"
          v-model="newsForm.code"
          popper-class="code-select"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in codeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否草稿">
        <el-select
          class="w-full"
          v-model="newsForm.isDraft"
          popper-class="draft-select"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in draftOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <h-markdown-editor
      :markdownText="newsForm.markdownText"
      @sendMarkdownText="getMarkdownText"
    ></h-markdown-editor>
    <div class="upload-img-group">
      <el-upload
        class="upload-box"
        drag
        accept=".png,.jpg,.git"
        :action="this.TOOL.getUploadApi('/news/upload')"
        :headers="{
          token: this.STORAGE.getItem('userInfo').token,
        }"
        :file-list="imgFiles"
        list-type="picture"
        :on-error="uploadImgError"
        :on-success="uploadImgSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">拖拽上传 · <em>点击上传</em></div>
      </el-upload>
    </div>
    <div class="submit-group">
      <div class="time">{{ getTime }}</div>
      <div class="btn-group">
        <el-button type="primary" @click="cancelPublish">取消发布</el-button>
        <el-button type="danger" @click="submitNews">
          {{ this.editItem ? '完成编辑' : '立即发布' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { checkParamsByRules, Validator } from '@/plugin/strategy.js';
import HMarkdownEditor from '@/components/common/markdown-editor/MarkdownEditor.vue';
export default {
  name: 'Public',
  data() {
    const checkEmpty = (rule, value, cb) => {
      let vali = new Validator();
      vali.add(value, [
        {
          strategy: 'isNoEmpty',
          errMsg: '必填项',
        },
      ]);
      let errText = vali.start();
      if (errText) cb(new Error(errText)); // 存在报错则输出报错
      cb(); // 正常放行
    };
    return {
      editItem: null, // 如果是编辑模式，则等于编辑的对象
      newsForm: {
        title: '',
        code: 0,
        bannerImg: '',
        publisher: this.$store.state.userInfo.id,
        tag: '',
        isDraft: false,
        markdownText: '',
      },
      draftOptions: [
        {
          value: true,
          label: '是',
        },
        {
          value: false,
          label: '否',
        },
      ],
      codeOptions: [
        {
          value: 0,
          label: '0-普通用户',
        },
        {
          value: 1,
          label: '1-特权用户',
        },
        {
          value: 2,
          label: '2-管理用户',
        },
        {
          value: 3,
          label: '3-作者权限',
        },
      ],
      rules: {
        title: [{ validator: checkEmpty, trigger: 'blur' }],
        bannerImg: [{ validator: checkEmpty, trigger: 'blur' }],
        publisher: [{ validator: checkEmpty, trigger: 'blur' }],
      },
      tags: [],
      tagItem: '',
      imgFiles: [
        // {
        //   name: 'test',
        //   url: 'http://n.huasenjio.top/static/img/logo/logo.png',
        // },
      ],
    };
  },
  watch: {
    tags: {
      handler(nV, oV) {
        let tagStr = this.tags.join('/');
        this.newsForm.tag = tagStr;
        this.$forceUpdate();
      },
      deep: true,
      immediate: true,
    },
    'newsForm.bannerImg': {
      handler(nV, oV) {
        if (!nV) {
          this.imgFiles = [];
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    // 判断现在是否是编辑操作
    if (Object.keys(this.$route.params).length != 0) {
      // 修改标题
      // this.$route.meta.title = '编辑文章';
      // this.$forceUpdate;
      this.editItem = this.$route.params;
      this.newsForm.title = this.editItem.title;
      this.newsForm.publisher = this.editItem.publisher;
      this.newsForm.code = this.editItem.code;
      this.newsForm.tag = this.editItem.tag;
      // 处理标签的内容
      this.tags = [];
      this.editItem.tag.split('/').map(item => {
        if (item) {
          this.tags.push(item);
        }
      });
      this.newsForm.isDraft = this.editItem.isDraft;
      this.newsForm.markdownText = this.editItem.content;
      this.newsForm.bannerImg = this.editItem.bannerImg;
      // 链接是否有效，有效则显示
      if (this.TOOL.handleFileURL(this.editItem.bannerImg)) {
        this.imgFiles.push({
          name: this.editItem.bannerImg,
          url: this.TOOL.handleFileURL(this.editItem.bannerImg),
        });
      }
    }
  },
  components: {
    HMarkdownEditor,
  },
  computed: {
    getTime() {
      let t = new Date();
      let year = t.getFullYear();
      let month = t.getMonth() + 1;
      let day = t.getDate();
      let timeStr = `${year}-${month}-${day}`;
      return timeStr;
    },
  },

  methods: {
    // 处理标签
    handleTag() {
      if (!this.tagItem) return;
      this.tags.push(this.tagItem.trim());
      this.tagItem = '';
    },
    // 点击删除标签小按钮
    deleteTag(index) {
      this.tags.splice(index, 1);
    },
    // 取消发布后跳转新闻管理
    cancelPublish() {
      this.$router.push('/news-manage');
    },
    // 上传图片成功回调，清空图片展示列表，然后放入最新的上传图片
    uploadImgSuccess(res) {
      if (res.code == 1) {
        this.$tips('success', '封面上传成功', 'top-right', 1200);
        debugger;
        this.imgFiles = [];
        this.imgFiles.push({
          name: res.data[0].originalFilename,
          url: this.TOOL.handleFileURL(res.data[0].url),
        });
        this.newsForm.bannerImg = res.data[0].url;
      } else {
        this.$tips('error', res.msg);
      }
    },
    uploadImgError() {
      this.$tips('error', '传输出了点小差错');
    },
    // 获得markdown编辑器的值
    getMarkdownText(value) {
      this.newsForm.markdownText = value;
    },
    // 提交新闻信息
    submitNews() {
      this.$refs.newsForm.validate(valid => {
        if (valid) {
          // 表单校验通过
          let errText = checkParamsByRules([
            {
              value: this.newsForm.markdownText,
              rules: [
                {
                  strategy: 'isNoEmpty',
                  errMsg: '文章内容不能为空',
                },
              ],
            },
          ]);
          if (!errText) {
            let params = {
              title: this.newsForm.title,
              publisher: this.newsForm.publisher,
              code: this.newsForm.code,
              tag: this.newsForm.tag,
              time: this.getTime,
              isDraft: this.newsForm.isDraft,
              content: this.newsForm.markdownText,
              bannerImg: this.newsForm.bannerImg,
            };
            if (this.editItem) {
              // 编辑新闻需要通过_id索引进行更新
              params._id = this.editItem._id;
              this.API.updateNewsById(params)
                .then(res => {
                  this.$router.push('/news-manage');
                })
                .catch(err => {});
            } else {
              // 发布
              this.API.publicNews(params)
                .then(res => {
                  this.$router.push('/news-manage');
                })
                .catch(err => {});
            }
          } else {
            this.$notify({
              title: '发布失败',
              message: errText,
              type: 'error',
              position: 'top-left',
              duration: 2000,
            });
          }
        } else {
          // 表单校验不通过
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.public {
  .news-info-group {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    ::v-deep .el-form-item {
      position: relative;
      width: calc(50% - 20px);
      .el-select-dropdown {
        position: absolute !important;
        left: 0px !important;
        border: 1px solid #e5e5e5;
      }
    }
    .tag-group {
      position: absolute;
      top: -30px;
      width: 100%;
      white-space: nowrap;
      // overflow-x: scroll;
      // white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // word-break: break-all;
      li {
        display: inline-block;
        margin-left: 10px;
        font-size: 12px;
        color: #6e8ad7;
        &:first-of-type {
          margin-left: 0;
        }
        i {
          position: relative;
          left: -3px;
          color: red;
          font-size: 10px;
          cursor: pointer;
        }
      }
    }
  }
  .upload-img-group {
    padding: 15px 10px;
    .upload-box {
      ::v-deep .el-upload {
        width: 100%;
        .el-upload-dragger {
          width: 100%;
          height: 200px;
          background-color: #fbfbfb;
        }
      }
      ::v-deep .el-upload-list__item {
        display: flex;
        align-items: center;
        height: auto !important;
      }
      ::v-deep .el-upload-list__item-thumbnail {
        height: auto !important;
      }
    }
  }
  .submit-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .time {
      font-weight: 400;
    }
  }
}
</style>
