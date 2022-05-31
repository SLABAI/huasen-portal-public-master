<!-- 
  作者：花森酱
  时间：2020年09日14日
  联系企鹅：184820911
  @param {Number} interval 每隔几秒时间滚动 ms
  @param {Number} animationDuration 滚动动画时长 ms
  @param {Number} moveRatio 拖动距离 （0-1）
  @param {boolean}} showindicator 是否显示指示剂 
-->
<template>
  <div id="h-swiper">
    <!-- 绑定对应的事件 -->
    <div
      class="swiper"
      ref="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <!--插槽-->
      <slot></slot>
    </div>

    <!-- 手动左右切换 -->
    <div class="control-button">
      <span class="ml-px-10" @click="previous">
        <i class="iconfont icon-md-arrow-dropleft"></i>
      </span>
      <span class="mr-px-10" @click="next">
        <i class="iconfont icon-md-arrow-dropright"></i>
      </span>
    </div>

    <!-- 指示剂跑马灯 -->
    <div class="indicator">
      <slot name="indicator" v-if="showindicator && slideCount > 1">
        <div
          v-for="(item, index) in slideCount"
          class="indicator-item"
          :class="{ active: index === currentIndex - 1 }"
          :key="index"
          @mouseover="mouseIn(index)"
          @mouseout="mouseOut(index)"
        >
          {{ ++index }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  data: function() {
    return {
      slideCount: 0, // 滚动元素的数量
      slideWidth: 0, // 滑块元素的宽度
      swiperStyle: {}, // 轮播图的样式
      currentIndex: 1, // 当前轮播图片序号
      scrolling: false, // 是否正在滚动
    };
  },
  props: {
    // 滚动事件间隔
    interval: {
      type: Number,
      default: 3000,
    },
    // 滚动动画的时间
    animationDuration: {
      type: Number,
      default: 300,
    },
    // 大于拖拽的距离比才会发生滚动
    moveRatio: {
      type: Number,
      default: 0.35,
    },
    // 是否显示指示剂
    showindicator: {
      type: Boolean,
      default: true,
    },
  },
  mounted: function() {
    // 初始化轮播图
    this.handleDom();
    // 开启定时器
    this.startTimer();
    // 修复屏幕大小改变导致轮播图滚动异常
    window.addEventListener('resize', () => {
      let swiperEl = this.$refs.swiper;
      this.slideWidth = swiperEl.offsetWidth; // 修改滚动滑道的宽度
      this.swiperStyle = swiperEl.style; // 浅拷贝直接将获取的节点的样式对象地址
    });
  },
  methods: {
    startTimer: function() {
      // 开启定时任务
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.slideWidth); // 通过滑块的序号和滑块的宽度计算需要滚动的距离并进行滚动
      }, this.interval);
    },
    // 清除定时器
    stopTimer: function() {
      window.clearInterval(this.playTimer);
    },
    // 滚动滑块函数
    scrollContent: function(currentPosition) {
      // 标志现在正在滚动
      this.scrolling = true;
      // 开始滚动动画
      this.swiperStyle.transition = 'transform ' + this.animationDuration + 'ms'; // 设置动画时长
      this.setTransform(currentPosition); // 开始移动到正确位置
      // 判断滚动到的位置
      this.checkPosition();
      // 滚动完成
      this.scrolling = false;
    },
    // 校验滚动的位置
    checkPosition: function() {
      window.setTimeout(() => {
        // 1.校验正确的位置
        this.swiperStyle.transition = '0ms';
        // 滚动到尾部后重新开始滚动
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.slideWidth);
          // 向左边拖拽情况下currentIndex可以为负数
        } else if (this.currentIndex <= 0) {
          // 设置到尾部
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.slideWidth);
        }
        // 2.每次滚动后的回调函数并返回数组下标
        this.$emit('transitionEnd', this.currentIndex - 1);
      }, this.animationDuration);
    },
    //根据给定数值移动元素
    //@param {Number} position 移动数值
    setTransform: function(position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
    },
    handleDom: function() {
      // 1.获取要操作的元素
      let swiperEl = this.$refs.swiper;
      // 2.获取滑块节点对象
      let slideEls = swiperEl.getElementsByClassName('slide');
      // 3.保存滚动元素的个数
      this.slideCount = slideEls.length;
      // 4.实现拖拽效果的到时候，需要在轮播列表的头加上最后的一个元素，最后一个元素加上第一个元素。
      if (this.slideCount >= 1) {
        let cloneFirst = slideEls[0].cloneNode(true); // 克隆第一个元素
        let cloneLast = slideEls[this.slideCount - 1].cloneNode(true); // 克隆最后一个元素
        swiperEl.insertBefore(cloneLast, slideEls[0]);
        swiperEl.appendChild(cloneFirst);
        this.slideWidth = swiperEl.offsetWidth; // 计算滑道宽度
        this.swiperStyle = swiperEl.style; // 设置滑道宽度
      }
      // 5.上一步往列表的插了克隆一个最后元素，则开屏是最后一个元素，因为是根据下标*元素的宽度进行移动轮播图，所以第二秒的时候会直接移动到第二张元素。避免这种情况则定义开屏直接设置移动距离达到第开屏第一张的效果。
      this.setTransform(-this.slideWidth);
    },
    // 拖拽滚动
    touchStart: function(e) {
      // 1.正在滚动期间则不可以拖拽
      if (this.scrolling) return;
      // 2.停止定时器
      this.stopTimer();
      // 3.保存开始滚动的位置
      this.startX = e.touches[0].pageX;
    },
    // 移动端拖拽控制滑动
    touchMove: function(e) {
      // 1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      // 拿到当前轮播图的距离，自作跟随效果。
      let currentPosition = -this.currentIndex * this.slideWidth;
      let moveDistance = this.distance + currentPosition;
      // 2.设置当前的位置
      this.setTransform(moveDistance);
    },
    touchEnd: function() {
      // 1.获取移动的距离绝对值
      let currentMove = Math.abs(this.distance);
      // 2.判断最终的距离
      if (this.distance === 0) {
      } else if (this.distance > 0 && currentMove > this.slideWidth * this.moveRatio) {
        // 按住鼠标向右边移动超过设置的比例值时滚动序号自己减掉
        this.currentIndex--;
      } else if (this.distance < 0 && currentMove > this.slideWidth * this.moveRatio) {
        this.currentIndex++;
      }
      // 3.移动位置
      this.scrollContent(-this.currentIndex * this.slideWidth);
      // 4.移动完成开启定时器
      this.startTimer();
    },
    // 前一个
    previous: function() {
      this.changeItem(-1);
    },
    // 下一个
    next: function() {
      this.changeItem(1);
    },
    // 实现方法
    changeItem: function(num) {
      // 1.移除定时器
      this.stopTimer();
      // 2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.slideWidth);
      // 3.添加定时器
      this.startTimer();
    },
    // 通过底部指示剂轮播
    mouseIn: function(index) {
      this.stopTimer();
      this.currentIndex = index;
      this.scrollContent(-this.currentIndex * this.slideWidth);
    },
    mouseOut: function(index) {
      this.startTimer();
    },
  },
  destroyed() {},
};
</script>

<style lang="scss" scoped>
#h-swiper {
  width: 100%;
  min-height: 50px;
  overflow: hidden;
  position: relative;
  .swiper {
    display: flex;
  }
  .control-button {
    width: 100%;
    padding: 0 2px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    span {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      background-color: rgba(0, 0, 0, 0.3);
      i {
        font-size: 1.2rem;
        font-weight: 500;
      }
      &:hover {
        color: black;
        background-color: rgba(255, 255, 255, 0.5);
      }
    }
  }
  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 18px;
    z-index: 10;
    .indicator-item {
      width: 24px;
      height: 24px;
      padding: 3px;
      border-radius: 50%;
      text-align: center;
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      &:first-child {
        margin-left: 0;
      }
    }
    .indicator-item.active {
      background-color: rgba(212, 62, 46, 1);
    }
  }
}
</style>
