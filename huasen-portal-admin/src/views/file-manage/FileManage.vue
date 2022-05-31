<!--
 * @Autor: huasenjio
 * @Date: 2022-02-23 00:02:19
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-10 15:58:41
 * @Description: 文件管理页面
-->

<template>
  <div class="FileManage">
    <HsFileUpLoad @uploadSuccess="uploadSuccess"></HsFileUpLoad>
    <main>
      <ul>
        <li class="file-card" v-for="(item, index) in files" :key="index">
          <div class="content-panel">
            <div class="img-box" v-if="imgTag.indexOf(item.tag) != -1">
              <img :src="item.httpUrl" />
            </div>
          </div>
          <div class="shadow-panel">
            <span @click="copyUrl(item, index)">复制</span>
            <span @click="previewFile(item, index)">预览</span>
            <el-popconfirm
              @confirm="deleteFile(item, index)"
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
import HsFileUpLoad from '@/components/common/hs-file-upload/HsFileUpload.vue';
export default {
  name: 'FileManage',
  data() {
    return {
      files: [],
      imgTag: ['png', 'jpg', 'jpeg', 'gif', 'svg'],
    };
  },
  created() {
    this.queryAllFile();
  },
  components: {
    HsFileUpLoad,
  },
  methods: {
    deleteFile(item, index) {
      this.API.deleteFile({
        filePath: item.url,
      }).then(info => {
        this.queryAllFile();
      });
    },
    copyUrl(item, index) {
      this.TOOL.copyTextToClip(item.url, '拷贝成功');
    },
    uploadSuccess(result) {
      this.queryAllFile();
    },
    previewFile(item, index) {
      window.open(item.httpUrl);
    },
    queryAllFile() {
      this.API.findAllFile().then(info => {
        this.files = info.data.data.map(fileName => {
          let fileTemps = fileName.split('/');
          return {
            url: fileName,
            tag: fileTemps[fileTemps.length - 1].split('.')[1],
            httpUrl: this.TOOL.handleFileURL(fileName),
          };
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.FileManage {
  main {
    margin: 10px 0;
    ul {
      display: flex;
      flex-wrap: wrap;
      .file-card {
        position: relative;
        flex: 1;
        margin: 10px;
        .content-panel {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 4px 2px;
          box-sizing: border-box;
          .img-box {
            width: 210px;
            height: 140px;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
        }
        .shadow-panel {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          border-radius: 3px;
          background-color: rgba(30, 30, 30, 0.1);
          transition: 0.5s;
          span {
            font-weight: 500;
            color: #fff;
            cursor: pointer;
          }
          &:hover {
            background-color: rgba(30, 30, 30, 0.3);
          }
        }
      }
    }
  }
}
</style>
