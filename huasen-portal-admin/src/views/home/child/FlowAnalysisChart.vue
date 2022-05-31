<!--
 * @Autor: huasenjio
 * @Date: 2022-03-26 15:21:40
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-28 01:15:43
 * @Description: 
-->
<template>
  <div class="FlowAnalysisChart">
    <div class="chart-container relative left-px-10" :id="chartId"></div>
    <h3 class="chart-title absolute left-px-10 top-px-10">{{ chartName }}</h3>
  </div>
</template>

<script>
export default {
  name: 'FlowAnalysisChart',
  data() {
    return {
      chart: null,
      chartId: this.TOOL.getUid(8, 8), // 生成不重复的id值
    };
  },
  props: {
    chartData: {
      type: Object,
      default: () => {},
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },
        color: ['#2db4f6', '#7c59c2', '#fac858', '#ee6666'],
        xAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value} 人次',
            },
          },
          // {
          //   type: 'value',
          //   axisLabel: {
          //     formatter: '{value} 次',
          //   },
          // },
        ],
        yAxis: [
          {
            type: 'category',
            data: this.chartData.times,
            axisPointer: {
              type: 'shadow',
            },
          },
        ],
        series: [
          {
            // 管理员
            name: '陌生人',
            type: 'bar',
            data: this.chartData.adminCounts,
          },
          {
            // 用户
            name: '注册用户',
            type: 'bar',
            data: this.chartData.userCounts,
          },
          {
            // 静态资源
            name: '其他',
            type: 'bar',
            data: this.chartData.otherCounts,
          },
          {
            name: '总和',
            type: 'line',
            // xAxisIndex: 1,
            data: this.chartData.totalCounts,
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
.FlowAnalysisChart {
  position: relative;
  width: 680px;
  height: 400px;
  .chart-title {
  }
  .chart-container {
    width: 100%;
    height: 100%;
  }
}
</style>
