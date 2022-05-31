<!--
 * @Autor: huasenjio
 * @Date: 2022-02-05 16:37:54
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-16 15:51:05
 * @Description: 
-->
<template>
  <div class="admin-list">
    <header>
      <el-row class="w-full px-10-px" :gutter="10">
        <el-col :span="8">
          <el-input v-model="nameKey" placeholder="请输入昵称"></el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="aidKey" placeholder="请输入账号"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button class="search-btn" type="primary" @click="getAdminByAidOrNameKey">
            查询
          </el-button>
          <el-button class="search-btn" type="success" @click="openAddAdminPanel">
            新增
          </el-button>
        </el-col>
      </el-row>
    </header>
    <main class="mt-px-20">
      <el-table class="news-table" height="660" border :data="adminData" style="width: 100%">
        <el-table-column prop="aid" label="账号" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column prop="password" label="密码" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="name" label="昵称" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column prop="headImg" label="头像" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.headImg || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="code" label="权限码" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="site" label="站点链接" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="toy" label="趣玩链接" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="resource" label="资源" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="config" label="配置" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="notice" label="公告" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="take" label="订阅数" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="takeAbled" label="开放订阅" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.takeAbled ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column width="180" label="操作">
          <template slot-scope="scope">
            <el-popconfirm
              @confirm="deleteAdminItem(scope)"
              popper-class="delete-popcomfirm"
              class="mr-px-5"
              title="您确定删除该表单项吗？"
            >
              <el-button slot="reference" size="mini" type="danger">删除</el-button>
            </el-popconfirm>
            <el-button
              class="p-px-10"
              size="mini"
              type="primary"
              @click="openEditAdminPanel(scope)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="flex justify-end my-px-10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        background
        :page-sizes="[10, 20, 50, 100]"
        :pageSize="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
        popper-class="page-size-popper"
      >
      </el-pagination>
    </main>
    <el-drawer
      class="drawer-group"
      :title="isAddMode ? '添加管理员' : '编辑管理员'"
      :visible.sync="openAdminPanelTag"
      direction="rtl"
      size="435px"
      @close="closeAdminPanel"
    >
      <div class="drawer-type-content px-px-10 pt-px-10">
        <el-form
          ref="adminForm"
          class="bg-white py-px-20 px-px-10"
          :rules="adminRules"
          :label-position="'top'"
          :model="adminForm"
        >
          <el-form-item label="账号" prop="aid">
            <el-input
              v-model="adminForm.aid"
              placeholder="请输入账号"
              clearable
              :disabled="isAddMode ? false : true"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="adminForm.password" placeholder="请输入密码" clearable></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="name">
            <el-input v-model="adminForm.name" placeholder="请输入昵称" clearable></el-input>
          </el-form-item>
          <el-form-item label="头像链接" prop="headImg">
            <el-input v-model="adminForm.headImg" placeholder="请输入头像链接" clearable></el-input>
          </el-form-item>
          <el-form-item label="权限码" prop="code">
            <el-select
              class="w-full"
              v-model="adminForm.code"
              popper-class="code-select"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in codeSelectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="站点链接" prop="site">
            <el-input v-model="adminForm.site" placeholder="JSON数组" clearable></el-input>
          </el-form-item>
          <el-form-item label="趣味" prop="toy">
            <el-input v-model="adminForm.toy" placeholder="JSON数组" clearable></el-input>
          </el-form-item>
          <el-form-item label="资源" prop="resource">
            <el-input v-model="adminForm.resource" placeholder="JSON数组" clearable></el-input>
          </el-form-item>
          <el-form-item label="配置" prop="config">
            <el-input v-model="adminForm.config" placeholder="JSON对象" clearable></el-input>
          </el-form-item>
          <el-form-item label="公告" prop="notice">
            <el-input
              type="textarea"
              autosize
              v-model="adminForm.notice"
              placeholder="请输入公告"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="订阅数" prop="take">
            <el-input
              type="number"
              v-model="adminForm.take"
              placeholder="请输入订阅数"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="开放订阅" prop="takeAbled">
            <el-select
              class="w-full"
              v-model="adminForm.takeAbled"
              popper-class="take-abled-select"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in takeAbledSelectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="submitAdmin">
              {{ isAddMode ? '确认添加' : '完成编辑' }}
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
  name: 'AdminList',
  data() {
    // 校验空值
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
    // 校验链接
    const checkUrl = (rule, value, cb) => {
      let vali = new Validator();
      vali.add(value, [
        {
          strategy: 'isUrl',
          errMsg: '请输入正确网址链接',
        },
      ]);
      let errText = vali.start();
      if (errText) cb(new Error(errText)); // 存在报错则输出报错
      cb(); // 正常放行
    };
    // 校验邮箱
    const checkEmail = (rule, value, cb) => {
      let vali = new Validator();
      vali.add(value, [
        {
          strategy: 'isNoEmpty',
          errMsg: '链接不能为空',
        },
        {
          strategy: 'isEmail',
          errMsg: '请输入正确邮箱地址',
        },
      ]);
      let errText = vali.start();
      if (errText) cb(new Error(errText)); // 存在报错则输出报错
      cb(); // 正常放行
    };
    // 校验昵称
    const checkName = (rule, value, cb) => {
      let vali = new Validator();
      vali.add(value, [
        {
          strategy: 'isNoEmpty',
          errMsg: '链接不能为空',
        },
        {
          strategy: 'minLength:2',
          errMsg: '不能少于2个字符',
        },
      ]);
      let errText = vali.start();
      if (errText) cb(new Error(errText)); // 存在报错则输出报错
      cb(); // 正常放行
    };
    // 校验JSON对象
    const checkJSONObject = (rule, value, cb) => {
      let vali = new Validator();
      vali.add(value, [
        {
          strategy: 'isJSONObject',
          errMsg: 'JSON格式示例：{"name": "花森", "age": 18}',
        },
      ]);
      let errText = vali.start();
      if (errText) cb(new Error(errText)); // 存在报错则输出报错
      cb(); // 正常放行
    };
    const checkJSONArray = (rule, value, cb) => {
      let vali = new Validator();
      vali.add(value, [
        {
          strategy: 'isJSONArray',
          errMsg: 'JSON格式示例：[{},{}]',
        },
      ]);
      let errText = vali.start();
      if (errText) cb(new Error(errText)); // 存在报错则输出报错
      cb(); // 正常放行
    };
    return {
      isAddMode: true,
      openAdminPanelTag: false,
      currentRowIndex: -1,
      // 模糊搜索相关
      nameKey: '',
      aidKey: '',
      // 管理员表格
      adminData: [],
      adminForm: {
        aid: '',
        password: '',
        name: '',
        headImg: '',
        config: '',
        site: '',
        toy: '',
        resource: '',
        code: 3,
        take: 0,
        notice: '',
        takeAbled: false,
      },
      adminRules: {
        aid: [
          { validator: checkEmpty, trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        password: [{ validator: checkEmpty, trigger: 'blur' }],
        name: [
          { validator: checkEmpty, trigger: 'blur' },
          { validator: checkName, trigger: 'blur' },
        ],
        notice: [{ validator: checkJSONArray, trigger: 'blur' }],
        headImg: [{ validator: checkUrl, trigger: 'blur' }],
        site: [{ validator: checkJSONArray, trigger: 'blur' }],
        config: [{ validator: checkJSONObject, trigger: 'blur' }],
        toy: [{ validator: checkJSONArray, trigger: 'blur' }],
        resource: [{ validator: checkJSONArray, trigger: 'blur' }],
      },
      takeAbledSelectOptions: [
        {
          value: true,
          label: '是',
        },
        {
          value: false,
          label: '否',
        },
      ],
      codeSelectOptions: [
        {
          value: 0,
          label: '0-普通用户',
        },
        {
          value: 1,
          label: '1-特权用户',
        },
        {
          value: 2,
          label: '2-管理用户',
        },
        {
          value: 3,
          label: '3-作者权限',
        },
      ],
      currentPage: 1,
      pageSize: 10,
      totalNum: 0,
    };
  },
  created() {
    this.queryAllAdminByPage();
  },
  methods: {
    openAddAdminPanel() {
      this.isAddMode = true;
      this.openAdminPanelTag = true;
    },
    openEditAdminPanel(scope) {
      this.isAddMode = false;
      this.openAdminPanelTag = true;
      this.currentRowIndex = scope.$index;
      // 防止form组件不能一键重置
      this.$nextTick(() => {
        this.adminForm = {
          ...scope.row,
        };
      });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.queryAllAdminByPage();
    },
    handleCurrentChange(pageId) {
      this.currentPage = pageId;
      this.queryAllAdminByPage();
    },
    closeAdminPanel() {
      this.currentRowIndex = -1;
      this.$refs.adminForm.resetFields();
    },
    deleteAdminItem(scope) {
      this.API.deleteAdmin({
        aid: scope.row.aid,
      }).then(res => {
        this.queryAllAdminByPage();
      });
    },
    getAdminByAidOrNameKey() {
      this.API.findAdminByAidOrNameKey({
        aidKey: this.aidKey,
        nameKey: this.nameKey,
      }).then(info => {
        this.adminData = info.data.data;
        this.totalNum = info.data.data.length;
      });
    },
    submitAdmin() {
      this.$refs.adminForm.validate(pass => {
        if (pass) {
          if (this.isAddMode) {
            // 添加
            let parmas = {
              ...this.adminForm,
            };
            // 添加用户
            this.API.register(parmas).then(res => {
              this.queryAllAdminByPage();
              this.openAdminPanelTag = false;
            });
          } else {
            // 编辑
            let parmas = {
              ...this.adminData[this.currentRowIndex],
              ...this.adminForm,
              oldPassword: this.adminData[this.currentRowIndex].password, // 用于新旧密码比对
            };
            this.API.updateAdmin(parmas).then(res => {
              this.queryAllAdminByPage();
              this.openAdminPanelTag = false;
            });
          }
        }
      });
    },
    queryAllAdminByPage() {
      this.API.findAllAdminByPage({
        pageId: this.currentPage,
        pageSize: this.pageSize,
      }).then(info => {
        this.adminData = info.data.data.lists;
        this.totalNum = info.data.data.countNum;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-list {
  .code-select {
    ::v-deep .el-select-dropdown {
      position: absolute !important;
      left: 0px !important;
      border: 1px solid #e5e5e5;
    }
  }
  .take-abled-select {
    ::v-deep .el-select-dropdown {
      position: absolute !important;
      left: 0px !important;
      border: 1px solid #e5e5e5;
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
