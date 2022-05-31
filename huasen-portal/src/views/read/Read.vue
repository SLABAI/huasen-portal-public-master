<!--
 * @Autor: huasenjio
 * @Date: 2022-04-05 23:40:21
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-05-01 16:29:40
 * @Description: 
-->
<template>
  <div class="Read">
    <!-- <div class="banner"></div> -->
    <main>
      <div class="content">
        <div class="title-group flex my-px-10">
          <div class="title text-3xl flex-1 text-ellipsis">
            {{ title || '' }}
          </div>
          <div class="icon-group text-xl hover:text-red-500 pointer" @click="goBack">
            返回
            <i class="iconfont icon-tuichu text-xl"></i>
          </div>
        </div>
        <div class="tag-group">
          <div
            class="text-white inline-block text-xs px-px-8 py-px-2 first:mx-px-0 mx-px-4 rounded-full"
            v-for="item in tags"
            :key="item"
            v-randomColor
          >
            {{ item }}
          </div>
        </div>
        <div class="info-group text-gray-700">
          <div class="text-ellipsis">
            {{
              `花森原创 · 最后修改于
            ${time && time.split('-')[0]}年
            ${time && time.split('-')[1]}月
            ${time && time.split('-')[2]}日`
            }}
          </div>
        </div>
        <div class="my-px-10 overflow-x-hidden overflow-y-auto">
          <HArea :value="content"></HArea>
        </div>
        <footer class="footer-group">
          <div class="text-ellipsis">版权说明：MIT开源协议</div>
          <div class="text-ellipsis">免责声明：文章仅供学习交流 禁止用于商业用途</div>
        </footer>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  name: 'Read',
  data() {
    return {
      title: '文章标题',
      time: '1979-01-01',
      tag: '简洁/用心/愉悦',
      content: '文章内容....',
    };
  },
  created() {
    this.initWrap();
    this.initData();
  },
  computed: {
    tags() {
      return this.tag ? this.tag.split('/') : [];
    },
  },
  methods: {
    initWrap() {
      this.$store.state.triggerInfo.isShowSidebar = false;
      this.$store.state.triggerInfo.isShowHeader = false;
    },
    initData() {
      if (!this.$route.params.id) {
        this.$router.push('/article');
      } else {
        this.queryNewsById(this.$route.params.id);
      }
    },
    queryNewsById(_id) {
      this.API.findNewsById({ _id })
        .then(res => {
          if (res.data.data && res.data.data.length != 0) {
            this.title = res.data.data[0].title;
            this.time = res.data.data[0].time;
            this.tag = res.data.data[0].tag;
            this.content = res.data.data[0].content;
          } else {
            this.$router.push('/article');
          }
        })
        .catch(err => {
          this.$router.push('/home');
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.Read {
  width: 100%;
  height: 100%;
  // .banner {
  //   width: 100%;
  //   height: 250px;
  //   background-image: url('/img/wallpaper/14.jpg');
  //   background-repeat: no-repeat;
  //   background-size: cover;
  //   background-position: center center;
  // }
  main {
    // position: relative;
    // top: -100px;
    width: calc(100% - 20px);
    min-height: calc(100% - 20px);
    margin: 10px;
    border-radius: 4px;
    padding: 20px 10px;
    box-sizing: border-box;
    background-color: #fff;
    .content {
      .title-group {
        display: flex;
        align-items: center;
      }
      .tag-group {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }
      .info-group {
        width: auto;
        height: 24px;
        line-height: 24px;
        margin: 10px auto 10px auto;
        box-sizing: border-box;
      }
      .footer-group {
        width: 100%;
        height: 58px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: 10px auto 10px auto;
        padding: 0 10px;
        border-left: 5px solid #dddfe3;
        border-right: 5px solid #dddfe3;
        background-color: #eef0f4;
        box-sizing: border-box;
      }
    }
    .right {
    }
  }
  .content {
  }
}
</style>
