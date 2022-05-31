<template>
  <div class="home">
    <card>
      <template v-slot:banner>
        <div class="banner-group">
          <ul class="tool">
            <li
              v-if="!$store.state.userInfo.config.simpleMode"
              @click="() => (isOpenBannerSettingPopup = !isOpenBannerSettingPopup)"
            >
              <!-- 调整样式 -->
              <i class="iconfont icon-md-happy"></i>
            </li>
            <li @click="changeToFullScreen">
              <!-- 简洁模式 -->
              <i class="iconfont icon-md-qr-scanner"></i>
            </li>
          </ul>
          <div class="wallpaper">
            <hs-wallpaper></hs-wallpaper>
          </div>
          <div
            :class="{ searchSimple: $store.state.userInfo.config.simpleMode }"
            class="search xl:w-px-600 lg:w-px-400 sm:w-px-360 h-px-40"
          >
            <hs-search-bar></hs-search-bar>
          </div>
        </div>
      </template>
      <template v-slot:main>
        <div class="main-group">
          <hs-record></hs-record>
          <hs-nav-bar></hs-nav-bar>
          <hs-site></hs-site>
          <hs-popup
            class="wallpaper-popup"
            title="封面编辑"
            :isShow.sync="isOpenBannerSettingPopup"
          >
            <el-collapse class="collapse" v-model="activeName" accordion>
              <!-- 纯色背景 -->
              <el-collapse-item name="1">
                <template slot="title">
                  <div class="title">纯色背景</div>
                </template>
                <div class="collapse-content">
                  <ul class="pure">
                    <li
                      @click="changeBannerBg(item)"
                      v-for="(item, index) in pures"
                      :key="index"
                      :style="{ backgroundColor: item.background }"
                    >
                      {{ item.background }}
                    </li>
                  </ul>
                </div>
              </el-collapse-item>
              <!-- 图片背景 -->
              <el-collapse-item name="2">
                <template slot="title">
                  <div class="title">图片背景</div>
                </template>
                <div class="collapse-content">
                  <ul class="image">
                    <li
                      v-for="(item, index) in wallpaperImages"
                      :key="index"
                      :style="{ backgroundImage: `url(${item.background})` }"
                    >
                      <div class="setting" @click="changeBannerBg(item)">
                        立即设置
                      </div>
                    </li>
                  </ul>
                </div>
              </el-collapse-item>
              <!-- 自定义上传 -->
              <el-collapse-item name="3">
                <template slot="title">
                  <div class="title">自定义上传</div>
                </template>
                <div class="collapse-content flex justify-center items-center">
                  <el-upload
                    class="upload py-px-10"
                    drag
                    accept=".png,.jpg,.git"
                    :before-upload="beforeUpload"
                    action=""
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">拖拽上传 · <em>点击上传</em></div>
                  </el-upload>
                </div>
              </el-collapse-item>
              <!-- 字体 -->
              <el-collapse-item name="4">
                <template slot="title">
                  <div class="title">其他</div>
                </template>
                <div class="collapse-content">
                  <section class="other">
                    <div>字体颜色</div>
                    <ul>
                      <li
                        v-for="(item, index) in headerFontColors"
                        :key="index"
                        :style="{ backgroundColor: item }"
                        @click="changeHeaderFontColor(item)"
                      ></li>
                      <li>
                        <el-color-picker
                          v-model="colorPickerValue"
                          @change="changeHeaderFontColor"
                          size="mini"
                        >
                        </el-color-picker>
                      </li>
                    </ul>
                  </section>
                  <section class="other">
                    <div>背景模糊度</div>
                    <el-slider
                      :show-tooltip="false"
                      class="w-px-380 pl-px-8"
                      :min="0"
                      :max="10"
                      :step="0.5"
                      @change="changeBannerBgBlur"
                      v-model="sliderDimValue"
                    ></el-slider>
                  </section>
                  <section class="other">
                    <div>遮罩浓度</div>
                    <el-slider
                      :show-tooltip="false"
                      class="w-px-380 pl-px-8"
                      :min="0"
                      :max="1"
                      :step="0.1"
                      @change="changeBannerBgShadow"
                      v-model="sliderShadowValue"
                    ></el-slider>
                  </section>
                </div>
              </el-collapse-item>
            </el-collapse>
          </hs-popup>
        </div>
      </template>
    </card>
  </div>
</template>
<script>
import Card from '@/components/content/card/Card.vue';
import HsPopup from '@/components/common/popup/Popup.vue';

import HsWallpaper from './child/Wallpaper.vue';
import HsSearchBar from './child/SearchBar.vue';
import HsRecord from './child/RecordBar.vue';
import HsSite from './child/SiteBar.vue';
import HsNavBar from './child/NavBar.vue';

export default {
  name: 'Home',
  components: { Card, HsWallpaper, HsPopup, HsSearchBar, HsRecord, HsSite, HsNavBar },
  data() {
    return {
      activeName: '4',
      isOpenBannerSettingPopup: false,
      colorPickerValue: '#8e54e9', // 字体颜色选择器的默认颜色

      sliderDimValue: this.$store.state.userInfo.config.bgBlur, // 控制封面模糊度
      sliderShadowValue: this.$store.state.userInfo.config.bgOpacity, // 控制封面遮罩浓度
      // 封面颜色可选纯色系
      pures: [
        {
          headerFontColor: '#EEEEEE',
          background: '#66ae78',
        },
        {
          headerFontColor: '#232323',
          background: '#8e54e9',
        },
        {
          headerFontColor: '#FFFFFF',
          background: '#31c2e0',
        },
      ],
      // 壁纸
      wallpaperImages: [
        {
          headerFontColor: '#525252',
          background: '/img/wallpaper/1.jpeg',
        },
        {
          headerFontColor: '#525252',
          background: '/img/wallpaper/2.jpeg',
        },
      ],
      // 预设头部字体颜色
      headerFontColors: [
        '#dddddd',
        '#8e54e9',
        '#ff0000',
        '#66ae78',
        '#ff6b37',
        '#31c2e0',
        '#ffbc2e',
      ],
    };
  },
  mounted() {
    this.initWrap();
  },
  watch: {
    '$store.state.commonInfo.takeSource': {
      handler(nV, oV) {
        if (nV.config) {
          let wallpapers = nV.config.wallpapers;
          let pures = nV.config.pures;
          if (!wallpapers || !Array.isArray(wallpapers)) wallpapers = [];
          if (!pures || !Array.isArray(pures)) pures = [];
          this.wallpaperImages = this.wallpaperImages.concat(wallpapers);
          this.pures = this.pures.concat(pures);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 模式的切换
    changeToFullScreen() {
      this.$store.dispatch('updateLocalUserInfo', {
        config: {
          simpleMode: !this.$store.state.userInfo.config.simpleMode,
        },
      });
    },
    // 改变封面的背景
    changeBannerBg(item) {
      this.$store.dispatch('updateLocalUserInfo', {
        config: {
          headerFontColor: item.headerFontColor,
          background: item.background,
        },
      });
    },
    // 改变顶部字体颜色
    changeHeaderFontColor(color) {
      this.$store.dispatch('updateLocalUserInfo', {
        config: {
          headerFontColor: color,
        },
      });
    },
    // 改变模糊度
    changeBannerBgBlur(value) {
      this.$store.dispatch('updateLocalUserInfo', {
        config: {
          bgFilter: `blur(${value}px)`,
        },
      });
    },
    // 改变透明度
    changeBannerBgShadow(value) {
      this.$store.dispatch('updateLocalUserInfo', {
        config: {
          bgOpacity: value,
        },
      });
    },
    // 上传文件转换成base64进行保存
    beforeUpload(file) {
      // if (file.size <= 3145728) {
      if (file.size <= 1048576) {
        this.TOOL.getBase64(file, bs64 => {
          this.$store.dispatch('updateLocalUserInfo', {
            config: {
              background: bs64,
            },
          });
        });
      } else {
        this.$tips('error', '图片大小已超过 1mb', null, 2000);
      }
      return false; // 终止上传
    },
    // 调整页面布局
    initWrap() {
      this.$store.state.triggerInfo.isShowLeft = true;
      this.$store.state.triggerInfo.isShowHeader = true;
      this.$store.state.triggerInfo.isShowSidebar = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  .banner-group {
    .tool {
      position: absolute;
      right: 0;
      bottom: 0;
      margin: 0 18px 8px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
      li {
        margin-left: 10px;
        display: flex;
        align-items: center;
        font-size: 14px;
        cursor: pointer;
        i {
          font-size: 24px;
          margin-right: 3px;
        }
      }
    }
    .wallpaper {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .search {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
    }
    .searchSimple {
      top: 30%;
      transform: translate(-50%, -30%);
    }
  }
  .main-group {
    height: 1000px;
    .wallpaper-popup {
      .collapse {
        .title {
          padding-left: 10px;
          font-size: 14px;
        }
        .collapse-content {
          .pure {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            li {
              width: 120px;
              height: 60px;
              margin: 10px auto;
              border-radius: 3px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
          }
          .image {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            li {
              width: 200px;
              height: 120px;
              margin: 3px auto;
              border-radius: 3px;
              display: flex;
              justify-content: center;
              align-items: center;
              background-size: cover;
              background-repeat: no-repeat;
              .setting {
                width: 60px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 3px;
                background-color: rgba(255, 255, 255, 0.5);
                cursor: pointer;
              }
            }
          }
          .other {
            padding-left: 10px;
            margin-top: 10px;
            ul {
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              li {
                width: 28px;
                height: 28px;
                margin-left: 8px;
                margin-top: 8px;
                opacity: 0.8;
                border-radius: 8px;
                cursor: pointer;
                &:first-child {
                  margin-left: 0px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
