<!--
 * @Autor: huasenjio
 * @Date: 2022-01-15 21:36:31
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-16 15:51:07
 * @Description: 
-->
<template>
  <div class="NewsManage">
    <header>
      <el-row class="w-full px-10-px" :gutter="10">
        <el-col :span="8">
          <el-input v-model="titleKey" placeholder="请输入文章标题"></el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="publisherKey" placeholder="请输入文章作者"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button class="search-btn" type="success" @click="getNewsByTitleOrPublisherKey">
            查询
          </el-button>
        </el-col>
      </el-row>
    </header>
    <main>
      <el-table class="news-table" height="720" border :data="newsData" style="width: 100%">
        <el-table-column prop="title" label="标题" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column prop="publisher" label="发布者" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="code" label="访问码" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ handleNewsCode(scope.row.code) || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="tag" label="标签" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.tag || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="time" label="日期" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column prop="isDraft" label="是否草稿" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.isDraft ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.content || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="bannerImg" label="封面链接" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.bannerImg || '-' }}
          </template>
        </el-table-column>
        <el-table-column width="180" label="操作">
          <template slot-scope="scope">
            <el-popconfirm
              @confirm="deleteNewsItem(scope)"
              popper-class="delete-popcomfirm"
              class="mr-px-5"
              title="您确定删除该表单项吗？"
            >
              <el-button slot="reference" size="mini" type="danger">删除</el-button>
            </el-popconfirm>
            <el-button class="p-px-10" size="mini" type="primary" @click="editNews(scope.row)">
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
  </div>
</template>

<script>
export default {
  name: 'NewsManage',
  data() {
    return {
      newsData: [],
      currentPage: 1,
      pageSize: 10,
      totalNum: 0,
      publisherKey: '',
      titleKey: '',
    };
  },
  created() {
    this.getAllNewsDataByPage();
  },
  methods: {
    // 获取全部的新闻数据
    getAllNewsDataByPage(pageId) {
      this.API.getAllNewsByPage({
        pageId: this.pageId,
        pageSize: this.pageSize,
      }).then(res => {
        this.newsData = res.data.data.lists;
        this.totalNum = res.data.data.countNum;
      });
    },
    // 根据标题和发布者进行模糊查询
    getNewsByTitleOrPublisherKey() {
      this.API.findNewsByTitleOrTagKey({
        publisherKey: this.publisherKey,
        titleKey: this.titleKey,
      })
        .then(res => {
          this.newsData = res.data.data;
          this.totalNum = res.data.data.length;
        })
        .catch(err => {});
    },
    // 处理访问码
    handleNewsCode(code) {
      let text = '';
      switch (code) {
        case 0:
          text = '普通用户';
          break;
        case 1:
          text = '特权用户';
          break;
        case 2:
          text = '管理用户';
          break;
        case 3:
          text = '作者权限';
          break;
      }
      return text;
    },
    // 删除新闻
    deleteNewsItem(scope) {
      this.API.deleteNewsById({
        _id: scope.row._id,
      }).then(res => {
        this.newsData.splice(scope.$index, 1);
      });
    },
    editNews(newsItem) {
      this.$router.push({ name: 'Public', params: newsItem });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getAllNewsDataByPage();
    },
    handleCurrentChange(pageId) {
      this.pageId = pageId;
      this.getAllNewsDataByPage();
    },
  },
};
</script>

<style lang="scss" scoped>
.NewsManage {
  header {
    padding: 0 10px;
    margin: 10px 0;
    .search-btn {
      background-color: #33b76c;
    }
  }
  main {
    padding: 0 10px;
    margin: 10px 0;
  }
}
</style>
