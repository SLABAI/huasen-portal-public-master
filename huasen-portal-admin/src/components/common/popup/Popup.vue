<template>
  <transition name="fade">
    <div class="h-popup" v-if="isShow" @click="closePopup">
      <div class="popup-main" @click.stop="() => {}">
        <header>
          <div class="title">{{ title }}</div>
          <div class="close"><i class="iconfont icon-md-close" @click="closePopup"></i></div>
        </header>
        <main>
          <slot></slot>
        </main>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Popup',
  data() {
    return {};
  },
  watch: {
    isShow: {
      handler(nv, ov) {
        if (nv) {
          this.$hShade.show();
        } else {
          this.$hShade.close();
          this.$emit('close');
        }
      },
      deep: true,
    },
  },
  props: {
    isShow: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    title: {
      type: String,
      default: () => {
        return '';
      },
    },
  },
  methods: {
    closePopup() {
      this.$emit('update:isShow', false);
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.h-popup {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  .popup-main {
    position: absolute;
    top: 0;
    right: 0;
    width: 435px;
    height: 100%;
    background-color: #f5f5f5;
    header {
      height: 60px;
      padding: 0px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
      color: var(--dark);
      background-color: #fff;
      .title {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        font-size: 18px;
      }
      .close {
        width: 24px;
        i {
          font-size: 26px;
          cursor: pointer;
        }
      }
    }
    main {
      width: calc(100% - 20px);
      height: calc(100% - 80px);
      margin: 10px auto;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
