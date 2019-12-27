<template>
  <div class="question-container">
    <!-- 头部卡片 -->
    <el-card class="head-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <el-select v-model="formInline.subject" placeholder="请选择学科">
            <el-option v-for="item in subjectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
            <el-option v-for="item in enterpriseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
          <el-button @click="addFormVisible = true" type="primary" icon="el-icon-plus">新增学科</el-button>
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
    <addDialog></addDialog>
    <!-- 编辑框框 -->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
// //导入用户新增弹出框
// import userAdd from "./components/userAdd";
// // //导入用户编辑弹出框
// import userEdit from "./components/userEdit";
// // //导入axios封装的接口
// import {userList,userRemove,userStatus} from "../../../api/user";
export default {
//   components: {
//     userAdd,
//     userEdit
//   },
  data() {
    return {
      formInline: {
        username: "",
        phone: "",
        email: "",
        role_id: "",
        remark: "",
        status: "",
        address:''
      },
      //新增弹框是否显示
      dialogFormVisible: false,
      editdialogFormVisible: false,
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
//   methods: {
//     //   搜索按钮的点击事件
//     userSearch() {
//       userList({
//         page: this.page,
//         limit: this.limit,
//         ...this.formInline
//       }).then(res => {
//         this.listContent = res.data.items;
//         this.total = res.data.pagination.total;
//         window.console.log(res);
//       });
//     },
//     //清除按钮点击事件
//     clearForm() {
//       for (var key in this.formInline) {
//         this.formInline[key] = "";
//       }
//       this.userSearch();
//     },
//     // //编辑按钮点击事件
//     showEdit(item) {
//       window.console.log(item);
//       // alert("1222")
//       this.editdialogFormVisible = true;
//       this.$refs.editRef.form = JSON.parse(JSON.stringify(item));
//     },
//     // 状态按钮点击事件
//     enterpriseStatus(item) {
//       userStatus({
//         id: item.id
//       }).then(res => {
//         if (res.code === 200) {
//           this.$message.success("恭喜您改变状态成功");
//           this.userSearch();
//         }
//         window.console.log(res);
//       });
//     },
//     //删除按钮点击事件
//     removeEnterprise(item) {
//       //  window.console.log(item);
//       userRemove({
//         id: item.id
//       }).then(res => {
//         if (res.code === 200) {
//           this.$confirm("确定要删除这条内容么", "警告", {
//             confirmButtonText: "确定",
//             cancelButtonText: "取消",
//             type: "warning"
//           })
//             .then(() => {
//               this.$message.success("恭喜您删除成功");
//               this.userSearch();
//             })
//             .catch(() => {
//               this.$message.success("就知道你不会删除我的");
//             });
//         }
//         window.console.log(res);
//       });
//     },
//     //页码改变的点击事件
//     handleCurrentChange(page) {
//       // window.console.log(page);
//       this.page = page;
//       this.userSearch();
//     },
//     //页容量改变
//     handleSizeChange(limit) {
//       window.console.log(limit);
//       this.limit = limit;
//       this.userSearch();
//     }
//   },
//   created() {
//     //进入页面调用列表发送axios
//     this.userSearch();
//   }
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
