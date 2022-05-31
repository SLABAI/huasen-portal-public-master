<!--
 * @Autor: huasenjio
 * @Date: 2022-03-26 15:21:40
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-03-28 00:32:16
 * @Description: 
-->
<template>
  <div class="MemoryChart mx-auto" :id="chartId"></div>
</template>

<script>
export default {
  name: 'MemoryChart',
  data() {
    return {
      chart: null,
      chartId: this.TOOL.getUid(8, 8), // 生成不重复的id值
    };
  },
  props: {
    chartData: {
      type: [Number, String],
      default: () => 0,
    },
    chartName: {
      type: String,
      default: () => '',
    },
  },
  watch: {
    chartData: {
      handler(nV, oV) {
        if (nV !== oV) {
          this.$nextTick(() => {
            this.initChart();
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    initChart() {
      let option = {
        series: [
          {
            type: 'liquidFill', //水位图
            radius: '95%', //显示比例
            center: ['50%', '50%'], //中心点
            amplitude: 20, //水波振幅
            data: [0.5, 0.5, 0.5], // data个数代表波浪数
            color: [
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#446bf5',
                  },
                  {
                    offset: 1,
                    color: '#2ca3e2',
                  },
                ],
                globalCoord: false,
              },
            ], //波浪颜色
            backgroundStyle: {
              borderWidth: 3, //外边框
              borderColor: '#112165', //边框颜色
              color: 'RGBA(51, 66, 127, 0.7)', //边框内部填充部分颜色
            },
            label: {
              //标签设置
              position: ['50%', '45%'],
              formatter: p => {
                return ` {white| ${this.chartData}% } \n 内存利用率`;
              },
              textStyle: {
                fontSize: 24, //文本字号,
                color: '#fff',
                rich: {
                  white: {
                    fontSize: 20,
                    color: '#fff',
                    fontWeight: 'bold',
                    lineHeight: 30,
                  },
                },
              },
            },
          },
        ],
      };

      if (!this.chart) {
        this.chart = this.$echarts.init(document.getElementById(this.chartId));
      }
      this.chart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
.MemoryChart {
  width: 250px;
  height: 250px;
}
</style>
