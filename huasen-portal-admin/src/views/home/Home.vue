<!--
 * @Autor: huasenjio
 * @Date: 2021-08-25 01:53:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-01 00:52:29
 * @Description: 
-->
<template>
  <div class="home">
    <nav class="relative">
      <FlowAnalysisChart
        class="w-full"
        :chartData="flowAnalysisValue"
        :chartName="'数据分析表'"
      ></FlowAnalysisChart>
      <section>
        <div class="card">
          <div class="left">
            <i class="iconfont icon-badge-line"></i>
          </div>
          <div class="right">
            <p>注册了</p>
            <p>{{ userCount || '-' }}</p>
            <p>个用户</p>
          </div>
        </div>
        <div class="card">
          <div class="left">
            <i class="iconfont icon-pen-fill"></i>
          </div>
          <div class="right">
            <p>发表了</p>
            <p>{{ newsCount || '-' }}</p>
            <p>篇文章</p>
          </div>
        </div>
        <div class="card">
          <div class="left">
            <i class="iconfont icon-bug-fill"></i>
          </div>
          <div class="right">
            <p>上传了</p>
            <p>{{ fileCount || '-' }}</p>
            <p>个文件</p>
          </div>
        </div>
      </section>
    </nav>
    <main class="relative top-px-16">
      <section class="w-full flex justify-center">
        <MemoryChart :chartData="memoryValue" :chartName="'内存占用率'"></MemoryChart>
        <CpuChart :chartData="cpuValue" :chartName="'CPU占用率'"></CpuChart>
        <DiskChart :chartData="diskValue" :chartName="'磁盘分析'"></DiskChart>
      </section>
    </main>
  </div>
</template>
<script>
import CpuChart from './child/CpuChart.vue';
import MemoryChart from './child/MemoryChart.vue';
import DiskChart from './child/DiskChart.vue';
import FlowAnalysisChart from './child/FlowAnalysisChart.vue';
import moment from 'moment';
export default {
  name: 'Home',
  data() {
    return {
      userCount: '',
      newsCount: '',
      fileCount: '',
      cpuValue: 0,
      memoryValue: 0,
      diskValue: [],
      flowAnalysisValue: {
        adminCounts: [1, 2, 3, 4, 5],
        userCounts: [1, 2, 3, 4, 5],
        otherCounts: [1, 2, 3, 4, 5],
        times: ['88888888', '88888888', '88888888', '88888888', '88888888'],
        totalCounts: [3, 6, 9, 12, 15],
      },
      ws: null,
    };
  },
  components: {
    CpuChart,
    MemoryChart,
    DiskChart,
    FlowAnalysisChart,
  },
  mounted() {
    this.queryAllUser();
    this.queryAllNews();
    this.queryAllFile();
    // 初始化ws
    this.initWebSocket();
  },
  methods: {
    queryAllUser() {
      this.API.findAllUser().then(res => {
        if (res.data.data.length !== 0) {
          this.userCount = res.data.data.length;
        }
      });
    },
    queryAllNews() {
      this.API.getAllNews().then(res => {
        if (res.data.data.length !== 0) {
          this.newsCount = res.data.data.length;
        }
      });
    },
    queryAllFile() {
      this.API.findAllFile().then(info => {
        if (info.data.data.length !== 0) {
          this.fileCount = info.data.data.length;
        }
      });
    },
    initWebSocket() {
      let wsUrl =
        process.env.NODE_ENV == 'development'
          ? `ws://localhost:8181/connection?token=${this.STORAGE.getItem('userInfo').token}`
          : `ws://${location.host}/ws/connection?token=${this.STORAGE.getItem('userInfo').token}`;
      this.ws = new WebSocket(wsUrl);
      this.ws.onopen = function(e) {
        console.log('websocket已连接...');
      };
      this.ws.onmessage = info => {
        let data = JSON.parse(info.data);
        // console.log(data);
        // cpu数据整理
        this.cpuValue = Number(data.serverInfo.cpuUsage.replace('%', ''));
        // 内存数据整理
        this.memoryValue = Number(data.serverInfo.MemUsage.replace('%', ''));
        // 磁盘信息处理
        let disks = [];
        data.serverInfo.disks.map(item => {
          if (item.diskTotal) {
            disks.push({
              name:
                item.diskName
                  .split('/')
                  .slice(-1)
                  .join('') || '根目录',
              value: item.diskTotal,
              usage: item.diskUsage,
            });
          }
        });
        this.diskValue = disks;

        // 整理请求数据
        let a = 0;
        let u = 0;
        let o = 0;
        data.requestInfo.map(item => {
          if (/\/admin/.test(item.url)) {
            a++;
          } else if (/\/user/.test(item.url)) {
            u++;
          } else {
            o++;
          }
        });
        this.handleFlowAnalysisData({
          times: moment().format('MMDDmmss'),
          totalCounts: data.requestInfo.length,
          adminCounts: a,
          userCounts: u,
          otherCounts: o,
        });
      };
    },
    handleFlowAnalysisData(target) {
      // 复制
      let temp = this.TOOL.copyObject(this.flowAnalysisValue);
      Object.keys(target).map(key => {
        if (temp[key].length >= 6) temp[key].shift();
        temp[key].push(target[key]);
      });
      this.flowAnalysisValue = temp;
    },
  },
  destroyed() {
    this.ws.close();
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  nav {
    width: 100%;
    display: flex;
    section {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .card {
        width: calc(100% - 80px);
        padding: 10px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 3px;
        .left {
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          i {
            font-size: 28px !important;
            font-weight: 500px;
            color: #fff;
          }
        }
        .right {
          p {
            width: 100px;
            text-align: right;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            color: #fff;

            &:nth-of-type(2) {
              margin: 5px 0;
              font-weight: bold;
              font-size: 20px;
            }
          }
        }
        &:nth-of-type(1) {
          background-color: #2cb5f6;
        }
        &:nth-of-type(2) {
          background-color: #7d58c2;
        }
        &:nth-of-type(3) {
          background-color: #33b76c;
        }
      }
    }
  }
}
</style>
