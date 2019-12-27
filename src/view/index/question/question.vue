<template>
  <div class="question-container">
    <!-- 头部卡片 -->
    <el-card class="head-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <el-select v-model="formInline.subject" placeholder="请选择学科">
            <el-option v-for="item in subject" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select v-model="formInline.enterprise" placeholder="请选择企业">
            <el-option v-for="item in enterprise" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="简答" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="简单" :value="1"></el-option>
            <el-option label="一般" :value="2"></el-option>
            <el-option label="困难" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="formInline.create_date" placeholder=""></el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="标题" class="title-input">
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>
        <el-form-item class="btn-form-item">
          <el-button type="primary" @click="getData">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button @click="addFormVisible = true" type="primary" icon="el-icon-plus">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 身体卡片 -->
    <el-card class="body-card">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="title" label="题目">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="学科·阶段">
          <template slot-scope="scope">
            {{ scope.row.subject_name }}
            {{ { 1: "初级", 2: "中级", 3: "高级" }[scope.row.step] }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            {{ { 1: "单选", 2: "多选", 3: "简答" }[scope.row.type] }}
            <!-- {{ scope.row.type | fomatType }} -->
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span class="red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="changeStatus(scope.row)">{{
              scope.row.status === 1 ? "禁用" : "启用"
            }}</el-button>
            <el-button type="text" v-power="['学生', '老师']" @click="removeItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 新增框 -->
    <addQuestion></addQuestion>
    <!-- 编辑框框 -->
    <!-- <editDialog ref="editDialog"></editDialog> -->
  </div>
</template>

<script>
// //导入题库新增弹出框
import addQuestion from "./components/addQuestion";

// // //导入axios封装题库的接口
// import {questionList} from "../../../api/question";
//导入学科列表接口
import {subjectList} from '../../../api/subject'
//导入企业列表接口
import {enterpriseList} from '../../../api/enterprise'

export default {
  components: {
    addQuestion
  },
  data() {
    return {
      formInline: {},
      // table绑定的数据
      tableData: [],
      //学科获取数据数组
      subject:[],
      //企业获取数据数组
      enterprise:[],




      //新增弹框是否显示
      addFormVisible: false,
      //默认显示的页数
      page: 1,
      //默认显示的行数
      limit: 2,
      //下拉框到指定页面
      pageSizes: [2, 4, 6, 8],
      // 总条数
      total: 0,
      listContent: []
    };
  },
  methods: {
     
  },
  created() {
     //题库列表获取
   //   questionList(this.formInline).then(res=>{
   //      window.console.log(res);
   //   })
     //学科列表获取
     subjectList(this.formInline).then(res=>{
        this.subject = res.data.items
      //   window.console.log(this.subject);
     })
     //企业列表获取
     enterpriseList(this.formInline).then(res=>{
        this.enterprise = res.data.items
     })
  },
};
</script>

<style lang="less">
// css作用域
.question-container {
  .head-card {
    // 设置按钮的容器尺寸
    .el-form-item__content {
      width: 149px;
    }
    .short-input .el-form-item__content {
      width: 100px;
    }
    .btn-form-item .el-form-item__content {
      width: 100%;
    }
  }

  // 分页
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  .body-card {
    margin-top: 19px;
  }

  // 高亮的span
  span.red {
    color: #ff4b4b;
  }
  .head-card .el-form-item {
    .el-form-item__label {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  // 标题
  .title-input .el-form-item__content {
    width: 388px;
  }

  // .el-form--inline  .el-form-item:not(.title-input)
  //   选择器1         后代的 选择器2 但是没有.title-input这个类名
  .el-form--inline .el-form-item:not(.title-input) {
    margin-right: 0;
  }
}
</style>
 