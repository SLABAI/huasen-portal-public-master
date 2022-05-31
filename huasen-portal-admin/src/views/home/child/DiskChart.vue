<!--
 * @Autor: huasenjio
 * @Date: 2022-03-26 15:21:40
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-03-28 00:33:53
 * @Description: 
-->
<template>
  <div class="DiskChart mx-auto" :id="chartId"></div>
</template>

<script>
export default {
  name: 'DiskChart',
  data() {
    return {
      chart: null,
      chartId: this.TOOL.getUid(8, 8), // 生成不重复的id值
      chartCurrentItemIndex: 0,
    };
  },
  props: {
    chartData: {
      type: Array,
      default: () => [],
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
        title: {
          text: '磁盘分析',
          x: '50%',
          y: '45%',
          textAlign: 'center',
          textStyle: {
            fontSize: '18',
            fontWeight: '500',
            color: '#7c59c2',
            textAlign: 'center',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: p => {
            return `${p.seriesName}<br />盘符名：${p.data.name}<br />占用率：${p.data.usage}<br />盘容量：${p.data.value}`;
          },
        },
        series: [
          {
            name: this.chartName,
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['70%', '90%'],
            avoidLabelOverlap: false, //防止标签重叠关闭
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                formatter: p => {
                  return ` {white| ${p.data.usage} } \n ${p.data.name}`;
                },
                show: false,
                textStyle: {
                  fontSize: 12,
                  fontWeight: 'bold',
                  rich: {
                    white: {
                      fontSize: 16,
                      color: '#35b66c',
                      fontWeight: 'bold',
                      lineHeight: 30,
                    },
                  },
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: this.chartData,
          },
        ],
      };
      if (!this.chart) {
        this.chart = this.$echarts.init(document.getElementById(this.chartId));
        // this.chart.dispatchAction({
        //   type: 'highlight',
        //   dataIndex: 0,
        // });
        // this.chart.on('mouseover', params => {
        //   // this.chart.dispatchAction({
        //   //   type: 'downplay',
        //   //   dataIndex: 1,
        //   // });
        //   this.chart.dispatchAction({
        //     type: 'downplay',
        //     dataIndex: this.chartCurrentItemIndex,
        //   });
        //   this.chartCurrentItemIndex = params.dataIndex;
        //   this.chart.dispatchAction({
        //     type: 'highlight',
        //     dataIndex: params.dataIndex,
        //   });
        // });
      }
      this.chart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
.DiskChart {
  width: 250px;
  height: 250px;
}
</style>
