<!--
 * @Autor: huasenjio
 * @Date: 2021-12-05 20:23:00
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-24 00:31:39
 * @Description: 
-->
<template>
  <div class="h-record">
    <header>
      <div class="title">
        自定义网站
        <i class="iconfont icon-md-attach"></i>
      </div>
      <ul>
        <li :class="{ active: isEditMode }" @click="() => (isEditMode = !isEditMode)">
          <i class="iconfont icon-md-settings"></i>
          <span class="sm:hidden">编辑</span>
        </li>
        <li :class="{ active: isDeleteMode }" @click="() => (isDeleteMode = !isDeleteMode)">
          <i class="iconfont icon-md-trash"></i>
          <span class="sm:hidden">管理</span>
        </li>
        <li @click="backupRecordToCilpBroad">
          <i class="iconfont icon-md-cut"></i>
          <span class="sm:hidden">拷贝</span>
        </li>
        <li @click="openSitePanel(true)">
          <i class="iconfont icon-tianjia"></i>
          <span class="sm:hidden">添加</span>
        </li>
        <li @click="recoveryFromCilpBroad">
          <i class="iconfont icon-md-sync"></i>
          <span class="sm:hidden">恢复</span>
        </li>
      </ul>
    </header>
    <main>
      <ul v-balance>
        <li
          class="record-item"
          v-for="(item, index) in this.$store.state.userInfo.record"
          :key="index"
        >
          <a
            v-if="!isEditMode"
            :class="{ deleteActive: isDeleteMode }"
            :href="item.url"
            target="_blank"
          >
            {{ item.name }}
          </a>
          <a
            class="pointer"
            :class="{ editActive: isEditMode }"
            v-else
            @click="openSitePanel(false, item, index)"
          >
            点击编辑
          </a>
          <i
            v-if="isDeleteMode"
            class="iconfont icon-md-close-circle"
            @click="deleteRecordItem(index)"
          >
          </i>
        </li>
      </ul>
    </main>
    <HsPopup
      :isShow.sync="isShowPopup"
      @close="closePopup"
      :title="isAddMode ? '添加站点' : '编辑站点'"
    >
      <el-form
        class="site-popup"
        :model="siteForm"
        status-icon
        :rules="rules"
        ref="siteForm"
        :statusIcon="false"
      >
        <el-form-item label="站点名称" prop="name">
          <el-input v-model="siteForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="站点链接" prop="url">
          <el-input v-model="siteForm.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submitSite">
            {{ isAddMode ? '完成添加' : '完成编辑' }}
          </el-button>
        </el-form-item>
      </el-form>
    </HsPopup>
  </div>
</template>
<script>
import { Validator } from '@/plugin/strategy.js';
import HsPopup from '@/components/common/popup/Popup.vue';
export default {
  name: 'RecordBar',
  components: { HsPopup },
  data() {
    const checkName = (rule, value, cb) => {
      let vali = new Validator();
      vali.add(value, [
        {
          strategy: 'isNoEmpty',
          errMsg: '网站名称不能为空',
        },
        {
          strategy: 'isChinese',
          errMsg: '请输入字母汉字数字',
        },
      ]);
      let errText = vali.start();
      if (errText) cb(new Error(errText)); // 存在报错则输出报错
      cb(); // 正常放行
    };
    const checkUrl = (rule, value, cb) => {
      let vali = new Validator();
      vali.add(value, [
        {
          strategy: 'isNoEmpty',
          errMsg: '链接不能为空',
        },
        {
          strategy: 'isUrl',
          errMsg: '请输入正确的网址链接',
        },
      ]);
      let errText = vali.start();
      if (errText) cb(new Error(errText)); // 存在报错则输出报错
      cb(); // 正常放行
    };
    return {
      isAddMode: true,
      isEditMode: false,
      isDeleteMode: false,
      isShowPopup: false,
      // 记录当前编辑的索引
      currentIndex: -1,
      // 网站编辑的值
      siteForm: {
        name: '',
        url: '',
      },
      // 校验规则
      rules: {
        name: [{ validator: checkName, trigger: 'blur' }],
        url: [{ validator: checkUrl, trigger: 'blur' }],
      },
    };
  },
  methods: {
    openSitePanel(tag, item, index) {
      // 开启弹框
      this.isShowPopup = true;
      if (tag) {
        // 添加状态
        this.isAddMode = true;
      } else {
        // 编辑状态
        this.isAddMode = false;
        this.currentIndex = index;
        let cp = this.TOOL.copyObject(item);
        this.$nextTick(() => {
          this.siteForm = {
            ...cp,
          };
        });
      }
    },
    // 拷贝自定义的网站数据
    backupRecordToCilpBroad() {
      this.TOOL.copyTextToClip(
        JSON.stringify(this.$store.state.userInfo.record),
        '已复制至剪贴板 请尽快粘贴保存',
      );
    },
    // 还原自定义的网站数据
    async recoveryFromCilpBroad() {
      try {
        let textValue = null;
        if (navigator.clipboard && window.isSecureContext) {
          // https、localhost、127.0.0.1状态下可用
          textValue = await navigator.clipboard.readText();
        } else {
          // 不安全状态下使用对话框形式
          textValue = prompt('粘贴恢复的数据'); // 弹出input框
        }

        let records = JSON.parse(textValue);
        if (!Array.isArray(records)) throw new Error('请检查恢复数据的格式');
        if (records.length == 0) throw new Error('恢复的数据为空');
        if (!records.every(item => typeof item == 'object' && !Array.isArray(item)))
          new Error('请检查恢复数据的格式');
        // 数据校验合格
        let temps = records.map(item => {
          let { name, url } = item;
          if (!name || !url) {
            throw new Error();
          }
          return {
            name,
            url,
          };
        });
        this.$store.dispatch('updateLocalUserInfo', {
          record: temps,
        });
        this.$tips('success', '恢复数据成功', 'top-right');
      } catch (err) {
        this.$tips('error', '剪贴板数据解析失败', 'top-right');
      }
    },
    closePopup() {
      this.currentIndex = -1;
      this.$refs.siteForm.resetFields();
    },
    deleteRecordItem(index) {
      try {
        // 因为LODASH的merage方法会合并数组，导致删除失败，所以直接改动仓库
        let record = this.LODASH.cloneDeep(this.$store.state.userInfo.record);
        record.splice(index, 1);
        this.$store.dispatch('updateLocalUserInfo', {
          record,
        });
        this.$tips('success', '缓存成功');
      } catch (err) {
        console.log(err);
        this.$tips('error', '缓存失败');
      }
    },
    submitSite() {
      this.$refs.siteForm.validate(pass => {
        if (pass) {
          let record = this.LODASH.cloneDeep(this.$store.state.userInfo.record);
          if (this.isAddMode) {
            // 添加
            try {
              record.push({
                name: this.siteForm.name,
                url: this.siteForm.url,
              });
              this.$store.dispatch('updateLocalUserInfo', {
                record,
              });
              this.isShowPopup = false;
              this.$tips('success', '缓存成功');
            } catch (err) {
              this.$tips('error', '缓存失败');
            }
          } else {
            // 编辑
            try {
              record[this.currentIndex].name = this.siteForm.name;
              record[this.currentIndex].url = this.siteForm.url;
              this.$store.dispatch('updateLocalUserInfo', {
                record,
              });
              this.isShowPopup = false;
              this.$tips('success', '缓存成功');
            } catch (err) {
              this.$tips('error', '缓存失败');
            }
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.h-record {
  width: 100%;
  margin: 0 auto;
  padding: 10px 0 20px 0;
  background-color: #fff;
  header {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
      color: var(--font);
      i {
        font-size: 20px;
        font-weight: 500;
      }
    }
    ul {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
      color: var(--font);
      li {
        margin-left: 10px;
        cursor: pointer;
      }
      .active {
        color: red;
      }
    }
  }
  main {
    width: calc(100% - 40px);
    margin: 0 auto;
    border-radius: 3px;
    background-color: #fbfbfb;
    ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .record-item {
        position: relative;
        width: 110px;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        a {
          width: 80%;
          border: 1px solid transparent;
          border-radius: 3px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
        }
        .deleteActive {
          border: 1px solid #c5c5c5;
          border-radius: 3px;
        }
        .editActive {
          border: 1px solid red;
          border-radius: 3px;
          color: red;
        }
        i {
          position: absolute;
          top: 0px;
          right: 10px;
          color: red;
          cursor: pointer;
        }
      }
    }
  }
  .site-popup {
    padding: 10px;
    background-color: #fff;
  }
}
</style>
