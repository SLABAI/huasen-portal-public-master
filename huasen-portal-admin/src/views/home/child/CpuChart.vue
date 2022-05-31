<!--
 * @Autor: huasenjio
 * @Date: 2022-03-26 15:21:40
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-03-28 00:35:24
 * @Description: 
-->
<template>
  <div class="CpuChart mx-auto" :id="chartId"></div>
</template>

<script>
export default {
  name: 'CpuChart',
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
        title: [
          {
            text: this.chartName,
            left: 'center',
            top: '90%',
            textStyle: {
              color: '#3488db',
              fontSize: 18,
              fontFamily: 'cuhei',
              fontWeight: 600,
            },
          },
        ],
        series: [
          {
            type: 'gauge',
            axisLine: {
              lineStyle: {
                width: 15,
                color: [
                  [0.2, '#42e4fb'],
                  [0.8, '#3488db'],
                  [1, '#f9387f'],
                ],
              },
            },
            radius: '90%',
            markPoint: {
              // 仪表盘指针圆
              animation: false,
              silent: true,
              data: [
                {
                  x: '50%',
                  y: '50%',
                  symbol: 'circle',
                  symbolSize: 40,
                  itemStyle: {
                    color: 'red',
                  },
                },
                {
                  x: '50%',
                  y: '50%',
                  symbol: 'circle',
                  symbolSize: 20,
                  itemStyle: {
                    color: '#7c59c2',
                  },
                },
              ],
            },
            pointer: {
              // 仪表盘指针
              // icon: 'none',
              width: 10,
              length: '60%',
              itemStyle: {
                color: 'auto',
              },
            },
            axisTick: {
              distance: 0,
              length: 5,
              lineStyle: {
                color: 'auto',
                width: 2,
              },
            },
            splitLine: {
              distance: 0,
              length: 15,
              lineStyle: {
                color: 'auto',
                width: 4,
              },
            },
            axisLabel: {
              color: '#3488db',
              distance: 30,
              fontSize: 10,
            },
            detail: {
              valueAnimation: true,
              formatter: '{value} %',
              fontSize: 18,
              offsetCenter: [0, '70%'],
              color: '#7c59c2',
            },
            data: [
              {
                value: this.chartData,
              },
            ],
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
.CpuChart {
  width: 250px;
  height: 250px;
}
</style>
