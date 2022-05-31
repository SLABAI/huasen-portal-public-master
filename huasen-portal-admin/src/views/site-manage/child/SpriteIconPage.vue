<!--
 * @Autor: huasenjio
 * @Date: 2022-01-30 13:04:02
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-23 21:05:51
 * @Description: 精灵图标tab
-->
<template>
  <div class="sprite-icon-page">
    <header class="flex justify-start">
      <el-upload
        class="upload-box"
        accept=".png"
        multiple
        :file-list="imgFiles"
        :action="this.TOOL.getUploadApi('/sprite/upload')"
        :headers="{ token: this.STORAGE.getItem('userInfo').token }"
        :on-error="uploadImgError"
        :on-success="uploadImgSuccess"
      >
        <el-button size="small" type="primary">上传图标</el-button>
        <el-button size="small" type="success" @click.stop="compileSpriteIcon">立即编译</el-button>
        <el-button size="small" type="warning" @click.stop="downloaSpriteIcon">下载全部</el-button>
        <div class="el-upload__tip" slot="tip">
          tips：图标仅支持上传.png文件！
        </div>
      </el-upload>
    </header>
    <main>
      <ul>
        <li v-for="(item, index) in iconNames" :key="index">
          <div class="icon-hs" :class="handleSpriteIconName(item)"></div>
          <div class="shadow-panel">
            <span @click="copyIconName(item)">复制</span>
            <el-popconfirm
              @confirm="deleteSpriteIcon(item, index)"
              popper-class="delete-popcomfirm"
              title="您确定删除该项吗？"
            >
              <span slot="reference">删除</span>
            </el-popconfirm>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
export default {
  name: 'SpriteIconPage',
  data() {
    return {
      iconNames: null,
      imgFiles: [],
    };
  },
  mounted() {
    this.queryAllSpriteIcon();
  },
  methods: {
    uploadImgSuccess(res) {
      this.$notify({
        title: res.data ? '上传成功' : '上传失败',
        message: res.msg,
        type: res.data ? 'success' : 'error',
        position: 'top-left',
        duration: 2000,
      });
      if (!res.data) this.imgFiles = [];
    },
    uploadImgError(err) {
      this.imgFiles = [];
    },
    // 编译精灵图
    compileSpriteIcon() {
      this.API.compileSpriteIcon().then(info => {
        window.location.reload();
      });
    },
    downloaSpriteIcon() {
      this.API.downloadSpriteIcon().then(res => {
        let url = this.TOOL.handleFileURL(res.data.data);
        this.TOOL.downloadFile(url, 'spriteIcons.zip');
      });
    },
    queryAllSpriteIcon() {
      this.API.findAllSpriteIcon().then(res => {
        // 过滤出图片文件名
        this.iconNames = res.data.data.filter(item => {
          return /\.png$/.test(item);
        });
      });
    },
    // 处理图标
    handleSpriteIconName(name) {
      return `icon-hs-${name.split('.')[0]}`;
    },
    // 根据名字删除图片
    deleteSpriteIcon(name, index) {
      this.API.deleteSpriteIcon({
        filePath: name,
      }).then(res => {
        this.iconNames.splice(index, 1);
      });
    },
    copyIconName(fileName) {
      this.TOOL.copyTextToClip(`icon-hs-${fileName.split('.')[0]}`, '拷贝成功');
    },
  },
};
</script>

<style lang="scss" scoped>
.sprite-icon-page {
  header {
    .upload-box {
      width: 100%;
      ::v-deep .el-upload {
        .el-upload-dragger {
          width: 100%;
        }
      }
    }
  }
  main {
    ul {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        flex: 1;
        position: relative;
        margin: 8px 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        .shadow-panel {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          border-radius: 6px;
          background-color: rgba(30, 30, 30, 0.1);
          transition: 0.5s;
          &:hover {
            background-color: rgba(30, 30, 30, 0.3);
          }
          span {
            font-weight: 500;
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
