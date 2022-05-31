<template>
  <div class="hs-file-upload">
    <!-- <nav>
      <span>文件上传</span>
    </nav> -->
    <main>
      <div class="content">
        <div class="left" @click="fileClick">
          <img src="./img/upload.png" />
        </div>
        <div
          class="right"
          @drop="drop($event)"
          @dragenter="dragenter($event)"
          @dragover="dragover($event)"
        >
          将文件拖到此处上传
        </div>
      </div>
      <footer>
        <div class="text">
          <div @click="limitClick(1)">
            <i class="iconfont icon-md-link"></i>
            开启限制文件上传 {{ limit ? `· ${limit}` : '' }}
          </div>
          <div @click="limitClick(0)">
            <i class="iconfont icon-md-sync"></i>
            禁用限制文件功能
          </div>
          <div>
            <i class="iconfont icon-a-documentationupload-line"></i>
            选中{{ imgList.length }}文件总共 {{ bytesToSize(this.size) }}
          </div>
        </div>
        <input
          @change="fileChange($event)"
          type="file"
          id="upload-file"
          multiple
          style="display: none"
        />
        <div class="img-box" v-show="imgList.length != 0">
          <div
            class="item"
            v-for="(item, index) in imgList"
            v-dragging="{ item: item, list: imgList, group: 'color' }"
            :key="index"
          >
            <div class="top">
              <div class="title">
                <i class="iconfont icon-tianjia" @click="uploadFile(index)"></i>
              </div>
              <img src="./img/delete.png" class="icon" @click="fileDel(index)" />
            </div>
            <img :src="item.file.src" />
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HsFileUpLoad',
  data() {
    return {
      fileIcon: require('./img/file.png'),
      imgList: [],
      size: 0,
      limit: undefined,
    };
  },
  methods: {
    // 点击上传
    uploadFile(index) {
      let formdata = new FormData();
      formdata.append('file', this.imgList[index].file);
      this.API.uploadFile(formdata).then(info => {
        this.imgList.splice(index, 1);
        this.$emit('uploadSuccess', info);
      });
    },
    //设置上传文件个数
    limitClick(state) {
      this.imgList = [];
      if (state) this.limit = 10;
      else this.limit = undefined;
    },
    // 点击上传图标
    fileClick() {
      document.getElementById('upload-file').click();
    },
    fileChange(el) {
      if (!el.target.files[0].size) return;
      this.fileList(el.target);
      el.target.value = '';
    },
    fileList(fileList) {
      let files = fileList.files;
      for (let i = 0; i < files.length; i++) {
        //判断是否为文件夹
        if (files[i].type != '') {
          this.fileAdd(files[i]);
        } else {
          //文件夹处理
          this.folders(fileList.items[i]);
        }
      }
    },
    //文件夹处理
    folders(files) {
      let _this = this;
      //判断是否为原生file
      if (files.kind) {
        files = files.webkitGetAsEntry();
      }
      files.createReader().readEntries(function(file) {
        for (let i = 0; i < file.length; i++) {
          if (file[i].isFile) {
            _this.foldersAdd(file[i]);
          } else {
            _this.folders(file[i]);
          }
        }
      });
    },
    foldersAdd(entry) {
      let _this = this;
      entry.file(function(file) {
        _this.fileAdd(file);
      });
    },
    fileAdd(file) {
      if (this.limit !== undefined) this.limit--;
      if (this.limit !== undefined && this.limit < 0) return;
      //总大小
      this.size = this.size + file.size;
      //判断是否为图片文件
      if (file.type.indexOf('image') == -1) {
        file.src = this.fileIcon;
        this.imgList.push({
          file,
        });
      } else {
        let reader = new FileReader();
        let image = new Image();
        let _this = this;
        reader.readAsDataURL(file);
        reader.onload = function() {
          file.src = this.result;
          image.onload = function() {
            let width = image.width;
            let height = image.height;
            file.width = width;
            file.height = height;
            _this.imgList.push({
              file,
            });
          };
          image.src = file.src;
        };
      }
    },
    fileDel(index) {
      this.size = this.size - this.imgList[index].file.size; //总大小
      this.imgList.splice(index, 1);
      if (this.limit !== undefined) this.limit = this.imgList.length;
    },
    bytesToSize(bytes) {
      if (bytes === 0) return '0 B';
      let k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    },
    dragenter(el) {
      el.stopPropagation();
      el.preventDefault();
    },
    dragover(el) {
      el.stopPropagation();
      el.preventDefault();
    },
    drop(el) {
      el.stopPropagation();
      el.preventDefault();
      this.fileList(el.dataTransfer);
    },
  },
};
</script>
<style lang="scss" scoped>
.hs-file-upload {
  width: 100%;
  border-radius: 3px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  nav {
    width: 100%;
    height: 50px;
    font-size: 1.2rem;
    padding-left: 25px;
    display: flex;
    align-items: center;
    color: white;
    background-color: var(--blue);
    section {
      display: flex;
      justify-content: center;
      div {
        padding: 8px 16px;
      }
    }
  }
  main {
    flex: 1;
    .content {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      height: 200px;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed #999999;
      }
      .left {
        border-radius: 10px;
        width: 30%;
        float: left;
      }
      .right {
        border-radius: 10px;
        width: 68%;
        float: right;
      }
    }
    footer {
      padding: 10px 20px;
      .text {
        margin-left: 5px;
      }
      .img-box {
        margin: 10px 0px;
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 150px;
          height: 100px;
          padding: 3px 0px;
          margin: 3px 5px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
          .top {
            padding: 5px 3px;
            position: absolute;
            top: 0px;
            right: 0px;
            left: 0px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
            background-color: rgba(0, 0, 0, 0.4);
            .title {
              width: 90%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .icon {
              width: 20px;
            }
          }
          img {
            max-width: 100%;
            max-height: 100%;
            vertical-align: middle;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      ul {
        margin-left: 5px;
        li {
          margin: 3px 0;
        }
      }
    }
  }
}
</style>
