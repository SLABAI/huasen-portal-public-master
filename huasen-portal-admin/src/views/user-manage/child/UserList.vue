<!--
 * @Autor: huasenjio
 * @Date: 2022-02-05 16:37:02
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-16 15:51:38
 * @Description: 
-->
<template>
  <div class="user-list">
    <header>
      <el-row class="w-full px-10-px" :gutter="10">
        <el-col :span="8">
          <el-input v-model="nameKey" placeholder="请输入昵称"></el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="idKey" placeholder="请输入账号"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button class="search-btn" type="primary" @click="getUserByIdOrNameKey">
            查询
          </el-button>
          <el-button class="search-btn" type="success" @click="openAddUserPanel">
            新增
          </el-button>
        </el-col>
      </el-row>
    </header>
    <main class="mt-px-20">
      <el-table class="news-table" height="660" border :data="userData" style="width: 100%">
        <el-table-column prop="id" label="账号" :show-overflow-tooltip="true"> </el-table-column>
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
        <el-table-column prop="record" label="收录网站" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="config" label="配置" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="todoList" label="待办" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="enabled" label="是否禁用" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.enabled ? '否' : '是' }}
          </template>
        </el-table-column>
        <el-table-column width="180" label="操作">
          <template slot-scope="scope">
            <el-popconfirm
              @confirm="deleteUserItem(scope)"
              popper-class="delete-popcomfirm"
              class="mr-px-5"
              title="您确定删除该表单项吗？"
            >
              <el-button slot="reference" size="mini" type="danger">删除</el-button>
            </el-popconfirm>
            <el-button class="p-px-10" size="mini" type="primary" @click="openEditUserPanel(scope)">
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
      :title="isAddMode ? '添加用户' : '编辑用户'"
      :visible.sync="openUserPanelTag"
      direction="rtl"
      size="435px"
      @close="closeUserPanel"
    >
      <div class="drawer-type-content px-px-10 pt-px-10">
        <el-form
          ref="userForm"
          class="bg-white py-px-20 px-px-10"
          :rules="userRules"
          :label-position="'top'"
          :model="userForm"
        >
          <el-form-item label="账号" prop="id">
            <el-input
              v-model="userForm.id"
              placeholder="请输入账号"
              clearable
              :disabled="isAddMode ? false : true"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="userForm.password" placeholder="请输入密码" clearable></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="name">
            <el-input v-model="userForm.name" placeholder="请输入昵称" clearable></el-input>
          </el-form-item>
          <el-form-item label="头像链接" prop="headImg">
            <el-input v-model="userForm.headImg" placeholder="请输入头像链接" clearable></el-input>
          </el-form-item>
          <el-form-item label="权限码" prop="code">
            <el-select
              class="w-full"
              v-model="userForm.code"
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
          <el-form-item label="收录站点" prop="record">
            <el-input
              v-model="userForm.record"
              placeholder="输入JSON字符串收录信息"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="配置" prop="config">
            <el-input
              v-model="userForm.config"
              placeholder="输入JSON字符串配置信息"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="待办列表" prop="todoList">
            <el-input
              v-model="userForm.todoList"
              placeholder="输入JSON字符串待办信息"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="是否禁用" prop="enabled">
            <el-select
              class="w-full"
              v-model="userForm.enabled"
              popper-class="enabled-select"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in enabledSelectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="submitUser">
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
  name: 'UserList',
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
      openUserPanelTag: false,
      currentRowIndex: -1,
      nameKey: '',
      idKey: '',
      userData: [],
      userForm: {
        id: '',
        password: '',
        name: '',
        headImg: '',
        code: 0,
        record: '',
        config: '',
        todoList: '',
        enabled: true,
      },
      userRules: {
        id: [
          { validator: checkEmpty, trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        password: [{ validator: checkEmpty, trigger: 'blur' }],
        name: [
          { validator: checkEmpty, trigger: 'blur' },
          { validator: checkName, trigger: 'blur' },
        ],
        headImg: [{ validator: checkUrl, trigger: 'blur' }],
        record: [{ validator: checkJSONArray, trigger: 'blur' }],
        config: [{ validator: checkJSONObject, trigger: 'blur' }],
        todoListe: [{ validator: checkJSONArray, trigger: 'blur' }],
      },
      enabledSelectOptions: [
        {
          value: true,
          label: '否',
        },
        {
          value: false,
          label: '是',
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
    this.queryAllUserByPage();
  },
  methods: {
    deleteUserItem(scope) {
      this.API.deleteUser({
        id: scope.row.id,
      }).then(res => {
        this.userData.splice(scope.$index, 1);
      });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.queryAllUserByPage();
    },
    handleCurrentChange(pageId) {
      this.currentPage = pageId;
      this.queryAllUserByPage();
    },
    openEditUserPanel(scope) {
      this.isAddMode = false;
      this.openUserPanelTag = true;
      this.currentRowIndex = scope.$index;
      // 防止form组件不能一键重置
      this.$nextTick(() => {
        this.userForm = {
          ...scope.row,
        };
      });
    },
    openAddUserPanel() {
      this.isAddMode = true;
      this.openUserPanelTag = true;
    },
    closeUserPanel() {
      // 重置表单项
      this.currentRowIndex = -1;
      this.$refs.userForm.resetFields();
    },
    submitUser() {
      this.$refs.userForm.validate(pass => {
        if (pass) {
          if (this.isAddMode) {
            let parmas = {
              ...this.userForm,
            };
            // 添加用户
            this.API.insertUser(parmas).then(res => {
              this.queryAllUserByPage();
              this.openUserPanelTag = false;
            });
          } else {
            // 编辑用户
            let parmas = {
              ...this.userData[this.currentRowIndex],
              ...this.userForm,
              oldPassword: this.userData[this.currentRowIndex].password, // 用于新旧密码比对
            };
            this.API.updateUser(parmas).then(res => {
              this.queryAllUserByPage();
              this.openUserPanelTag = false;
            });
          }
        }
      });
    },
    getUserByIdOrNameKey() {
      this.API.findUserByIdOrNameKey({
        idKey: this.idKey,
        nameKey: this.nameKey,
      }).then(info => {
        this.userData = info.data.data;
        this.totalNum = info.data.data.length;
      });
    },
    queryAllUserByPage() {
      this.API.findAllUserByPage({
        pageId: this.currentPage,
        pageSize: this.pageSize,
      }).then(info => {
        this.userData = info.data.data.lists;
        this.totalNum = info.data.data.countNum;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-list {
  .code-select {
    ::v-deep .el-select-dropdown {
      position: absolute !important;
      left: 0px !important;
      border: 1px solid #e5e5e5;
    }
  }
  .enabled-select {
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
