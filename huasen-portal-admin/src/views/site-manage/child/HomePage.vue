<!--
 * @Autor: huasenjio
 * @Date: 2022-01-27 21:38:23
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-05-01 18:25:01
 * @Description: 
-->
<template>
  <div class="home-page">
    <header>
      <span class="text-green-500" @click="openTypePanel(true)">
        添加栏目
      </span>
      <el-row :gutter="20">
        <el-col :span="4">网站名称</el-col>
        <el-col :span="4">网站链接</el-col>
        <el-col :span="7">网站描述</el-col>
        <el-col :span="4">网站图标</el-col>
        <el-col :span="5">操作</el-col>
      </el-row>
    </header>
    <main>
      <section
        class="flex justify-center py-px-50 text-gray-600"
        v-if="this.$store.state.userInfo.site.length == 0"
      >
        暂无数据
      </section>
      <section class="card">
        <div
          class="htable"
          v-for="(typeItem, index) in this.$store.state.userInfo.site"
          :key="`${typeItem.name}${index}`"
        >
          <div class="title flex items-center">
            <span class="w-px-80 text-ellipsis" :title="typeItem.typeName">{{
              typeItem.typeName
            }}</span>
            <i class="iconfont icon-tianjia text-green-500" @click="openSitePanel(true, index)"></i>
            <el-popconfirm
              @confirm="deleteTypeItem(index)"
              popper-class="delete-popcomfirm"
              title="您确定删除该项吗？"
            >
              <i slot="reference" class="iconfont icon-md-trash text-red-500"></i>
            </el-popconfirm>

            <i
              class="iconfont icon-a-edit2-line text-yellow-600"
              @click="openTypePanel(false, index)"
            >
            </i>
            <i
              class="iconfont icon-md-arrow-round-up text-gray-600"
              @click="moveTypeItem('up', index)"
            ></i>
            <i
              class="iconfont icon-md-arrow-round-down text-gray-800"
              @click="moveTypeItem('down', index)"
            >
            </i>
            <i class="iconfont icon-md-clipboard text-gray-800" @click="parteSiteToTypeItem(index)">
            </i>
          </div>
          <div class="hthead"></div>
          <div class="htbody">
            <el-row
              class="my-px-4"
              :gutter="20"
              v-for="(siteItem, k) in typeItem.sites"
              :key="`${siteItem.url}${k}`"
            >
              <el-col class="text-ellipsis" :span="4">{{ siteItem.name || '--' }}</el-col>
              <el-col :title="siteItem.url" class="text-ellipsis" :span="4">
                {{ siteItem.url || '--' }}
              </el-col>
              <el-col class="text-ellipsis" :span="7">{{ siteItem.describe || '--' }}</el-col>
              <el-col class="text-ellipsis" :span="4">{{ siteItem.imgClass || '--' }}</el-col>
              <el-col :span="5">
                <el-button size="mini" type="warning" @click="copySite(index, k)">
                  复制
                </el-button>
                <el-popconfirm
                  class="mx-px-4"
                  @confirm="deleteSiteItem(index, k)"
                  popper-class="delete-popcomfirm"
                  title="您确定删除该项吗？"
                >
                  <el-button slot="reference" size="mini" type="danger">删除</el-button>
                </el-popconfirm>
                <el-button size="mini" type="primary" @click="openSitePanel(false, index, k)">
                  编辑
                </el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </section>
    </main>
    <!-- 弹出层 -->
    <el-drawer
      class="drawer-group"
      :title="isAdd ? '添加栏目' : '编辑栏目'"
      :visible.sync="openTypePanelTag"
      direction="rtl"
      size="435px"
      @close="closeTypePanel"
    >
      <div class="drawer-type-content px-px-10 pt-px-10">
        <el-form
          ref="typeForm"
          class="bg-white py-px-20 px-px-10"
          :rules="typeRules"
          :label-position="'top'"
          :model="typeForm"
        >
          <el-form-item label="名称" prop="name">
            <el-input v-model="typeForm.name" placeholder="请输入栏目名" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="submitType">
              {{ isAdd ? '确认添加' : '完成编辑' }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    <el-drawer
      class="drawer-group"
      :title="isAddSite ? '添加网链' : '编辑网链'"
      :visible.sync="openSitePanelTag"
      direction="rtl"
      size="435px"
      @close="closeSitePanel"
    >
      <div class="drawer-type-content px-px-10 pt-px-10">
        <el-form
          ref="siteForm"
          class="bg-white py-px-20 px-px-10"
          :rules="siteRules"
          :label-position="'top'"
          :model="siteForm"
        >
          <el-form-item label="名称" prop="name">
            <el-input v-model="siteForm.name" placeholder="请输入网站名" clearable></el-input>
          </el-form-item>
          <el-form-item label="链接" prop="url">
            <el-input v-model="siteForm.url" placeholder="请输入网站链接" clearable></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="describe">
            <el-input v-model="siteForm.describe" placeholder="请输入网站描述" clearable></el-input>
          </el-form-item>
          <el-form-item label="图标名" prop="imgClass">
            <el-input
              v-model="siteForm.imgClass"
              placeholder="icon-hs-xxx格式的图标名"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="submitSite">
              {{ isAddSite ? '确认添加' : '完成编辑' }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { checkParamsByRules, Validator } from '@/plugin/strategy.js';
export default {
  name: 'HomePage',
  data() {
    // 检测是否为空
    const checkEmpty = (rule, value, cb) => {
      let vali = new Validator();
      vali.add(value, [
        {
          strategy: 'isNoEmpty',
          errMsg: '必填项',
        },
      ]);
      let errText = vali.start();
      if (errText) cb(new Error(errText)); // 存在报错则输出报错
      cb(); // 正常放行
    };
    // 检查链接是否合法
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
      // 当前编辑索引
      currentTypeIndex: -1,
      currentSiteIndex: -1,

      // 网链相关
      isAddSite: true,
      openSitePanelTag: false,
      siteForm: {
        name: '',
        url: '',
        describe: '',
        imgClass: '',
      },
      siteRules: {
        name: [{ validator: checkEmpty, trigger: 'blur' }],
        url: [{ validator: checkEmpty, trigger: 'blur' }],
        describe: [{ validator: checkEmpty, trigger: 'blur' }],
        imgClass: [{ validator: checkEmpty, trigger: 'blur' }],
      },
      // 栏目相关
      openTypePanelTag: false,
      isAdd: true,
      typeForm: {
        name: '',
      },
      typeRules: {
        name: [{ validator: checkEmpty, trigger: 'blur' }],
      },
    };
  },
  computed: {},
  methods: {
    // 删除网站条目
    deleteSiteItem(typeIndex, siteIndex) {
      let site = this.TOOL.copyObject(this.$store.state.userInfo.site);
      site[typeIndex].sites.splice(siteIndex, 1);
      this.API.updateSiteData({
        site: JSON.stringify(site),
      }).then(res => {
        this.$store.state.userInfo.site = site;
      });
    },
    // 删除栏目
    deleteTypeItem(index) {
      let site = this.TOOL.copyObject(this.$store.state.userInfo.site);
      site.splice(index, 1);
      this.API.updateSiteData({
        site: JSON.stringify(site),
      }).then(res => {
        this.$store.state.userInfo.site = site;
      });
    },
    // 上下移动栏目位置
    moveTypeItem(direction, typeIndex) {
      let site = this.TOOL.copyObject(this.$store.state.userInfo.site);
      let afterIndex = undefined;
      if (direction == 'up') {
        afterIndex = typeIndex == 0 ? site.length - 1 : typeIndex - 1;
      } else if (direction == 'down') {
        afterIndex = typeIndex == site.length - 1 ? 0 : typeIndex + 1;
      }
      this.TOOL.exchangeArrayItem(site, typeIndex, afterIndex);
      this.API.updateSiteData({
        site: JSON.stringify(site),
      }).then(res => {
        this.$store.state.userInfo.site = site;
      });
    },
    // 复制链接
    copySite(typeIndex, siteIndex) {
      let types = this.TOOL.copyObject(this.$store.state.userInfo.site);
      let temp = types[typeIndex].sites[siteIndex];
      this.TOOL.copyTextToClip(JSON.stringify(temp), '拷贝条目成功');
    },
    // 粘贴复制的网络条目
    async parteSiteToTypeItem(typeIndex) {
      let siteString = '';
      if (navigator.clipboard && window.isSecureContext) {
        // https、localhost、127.0.0.1状态下可用
        siteString = await navigator.clipboard.readText();
      } else {
        // 不安全状态下使用对话框形式
        siteString = prompt('粘贴网站条目'); // 弹出input框
      }
      if (!siteString) return;
      try {
        let siteItem = JSON.parse(siteString);
        if (!siteItem.hasOwnProperty('name')) {
          this.$tips('error', '网链名称解析错误', 'top-right', 1200);
          throw new Error();
        }
        if (!siteItem.hasOwnProperty('url')) {
          this.$tips('error', '链接解析错误', 'top-right', 1200);
          throw new Error();
        }
        let types = this.TOOL.copyObject(this.$store.state.userInfo.site);
        types[typeIndex].sites.push(siteItem);
        this.API.updateSiteData({
          site: JSON.stringify(types),
        }).then(() => {
          this.$store.state.userInfo.site = types;
        });
      } catch (err) {
        this.$tips('error', '数据解析异常', 'top-right', 1200);
      }
    },
    // 打开网链的弹出层
    openSitePanel(flag, typeIndex, siteIndex) {
      this.isAddSite = flag;
      this.openSitePanelTag = true;
      this.currentTypeIndex = typeIndex;
      this.currentSiteIndex = siteIndex;
      if (!flag) {
        // 编辑状态记录，并且填充
        let site = this.TOOL.copyObject(this.$store.state.userInfo.site);
        let target = site[typeIndex].sites[siteIndex];
        this.siteForm.name = target.name;
        this.siteForm.url = target.url;
        this.siteForm.describe = target.describe;
        this.siteForm.imgClass = target.imgClass;
      }
    },
    // 打开栏目的弹出层
    openTypePanel(flag, typeIndex) {
      this.isAdd = flag;
      this.openTypePanelTag = true;
      this.currentTypeIndex = typeIndex;
      if (!flag) {
        // 编辑状态下赋值
        let site = this.TOOL.copyObject(this.$store.state.userInfo.site);
        this.typeForm.name = site[typeIndex].typeName;
      }
    },
    closeTypePanel() {
      // 弹窗关闭时重置类型索引
      this.currentTypeIndex = -1;
      this.typeForm.name = '';
    },
    closeSitePanel() {
      // 重置相关内容
      this.currentTypeIndex = -1;
      this.currentSiteIndex = -1;
      this.siteForm.name = '';
      this.siteForm.url = '';
      this.siteForm.describe = '';
      this.siteForm.imgClass = '';
    },
    // 提交栏目数据
    submitType() {
      this.$refs.typeForm.validate(pass => {
        if (pass) {
          // 深拷贝用于上传
          let site = this.TOOL.copyObject(this.$store.state.userInfo.site);
          if (this.isAdd) {
            // 添加状态
            site.push({ typeName: this.typeForm.name, sites: [] });
          } else {
            // 编辑状态
            site[this.currentTypeIndex].typeName = this.typeForm.name;
          }
          this.API.updateSiteData({
            site: JSON.stringify(site),
          }).then(res => {
            this.$store.state.userInfo.site = site;
            this.openTypePanelTag = false;
          });
        }
      });
    },
    // 提交网链数据
    submitSite() {
      this.$refs.siteForm.validate(pass => {
        if (pass) {
          let site = this.TOOL.copyObject(this.$store.state.userInfo.site);
          if (this.isAddSite) {
            // 添加网站
            site[this.currentTypeIndex].sites.push({
              name: this.siteForm.name,
              url: this.siteForm.url,
              describe: this.siteForm.describe,
              imgClass: this.siteForm.imgClass,
            });
          } else {
            // 编辑网站
            site[this.currentTypeIndex].sites[this.currentSiteIndex] = {
              name: this.siteForm.name,
              url: this.siteForm.url,
              describe: this.siteForm.describe,
              imgClass: this.siteForm.imgClass,
            };
          }
          // 提交数据
          this.API.updateSiteData({
            site: JSON.stringify(site),
          }).then(res => {
            this.$store.state.userInfo.site = site;
            this.openSitePanelTag = false;
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-page {
  header {
    font-size: 16px;
    font-weight: 500;
    span {
      cursor: pointer;
    }
  }
  main {
    .card {
      .htable {
        margin-top: 20px;
        .title {
          font-size: 16px;
          font-weight: 500;
          color: #6f8cd7;
          i {
            margin-left: 8px;
            cursor: pointer;
          }
        }
        .hthead {
        }
        .htbody {
          margin-top: 10px;
        }
      }
    }
  }
  .drawer-group {
    ::v-deep .el-drawer__header {
      font-size: 18px;
    }
    ::v-deep .el-drawer__body {
      background-color: #f5f5f5;
    }
  }
}
</style>
