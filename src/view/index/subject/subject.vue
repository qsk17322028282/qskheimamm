<template>
  <div class="subject-bigbox">
    <!-- 头部表格 -->
    <el-card class="box-card subject-top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input class="short-input" v-model="formInline.rid" placeholder="学科编号"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.name" placeholder="学科名称"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="short-input" v-model="formInline.username" placeholder="创建者"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="全部" value></el-option>
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btn-form-item">
          <el-button type="primary" @click="subjectGet">搜索</el-button>
          <el-button @click="clearForm">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 主体表格 -->
    <el-card class="box-card subject-bottom">
      <el-table :data="listContent" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span class="red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="subjectstatus(scope.row)"
            >{{scope.row.status===1?"禁用":"启用"}}</el-button>
            <el-button type="text" @click="removeSubject(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增弹窗出口 -->
    <addtanchuang></addtanchuang>
    <!-- 编辑弹窗出口 -->
    <edittanchaung ref="editRef"></edittanchaung>
  </div>
</template>

<script>
//导入新增弹框的组件
import addtanchuang from "./components/addtanchaung";
//导入编辑弹框的组件
import edittanchaung from "./components/edittanchaung";
import {
  subjectList,
  subjectRemove,
  subjectStatus
} from "../../../api/subject";
export default {
  components: {
    addtanchuang,
    edittanchaung
  },
  data() {
    return {
      formInline: {
        name: "",
        username: "",
        rid: "",
        status: ""
      },
      user: "",
      region: "",
      currentPage4: 1,
      //新增弹框是否显示
      dialogFormVisible: false,
      // 编辑弹框是否显示
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
  methods: {
    //为搜索按钮增加点击事件
    subjectGet() {
      // window.console.log("qqqq");
      subjectList({
        page: this.page,
        limit: this.limit,
        ...this.formInline
      }).then(res => {
        this.listContent = res.data.items;
        this.total = res.data.pagination.total;
        // window.console.log(res);
        // window.console.log(this.listContent);
      });
    },
    //为清空按钮增加点击事件
    clearForm() {
      for (var key in this.formInline) {
        this.formInline[key] = "";
      }
      this.subjectGet();
    },
    //编辑按钮点击事件
    showEdit(item) {
      this.editdialogFormVisible = true;
      
      this.$refs.editRef.editForm = JSON.parse(JSON.stringify(item))
    },
    //状态按钮的点击事件
    subjectstatus(status) {
      // window.console.log(status);
      subjectStatus({
        id: status.id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success("恭喜您删除成功");
          this.subjectGet();
        }
        // window.console.log(res);
      });
    },
    // 删除按钮点击事件
    removeSubject(item) {
      // window.console.log(item);
      subjectRemove({
        id: item.id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success("恭喜您删除成功");
          this.subjectGet();
        }
        // window.console.log(res);
      });
    },
    //页码改变的点击事件
    handleCurrentChange(page) {
      // window.console.log(page);
      this.page = page;
      this.subjectGet();
    },
    //页容量改变
    handleSizeChange(limit) {
      window.console.log(limit);
      this.limit = limit;
      this.subjectGet();
    }
  },
  created() {
    this.subjectGet();
  }
};
</script>

<style lang="less">
.subject-bigbox {
  display: flex;
  flex-direction: column;
  // 顶部栏
  .subject-top {
    // width: 1190px;
    height: 103px;
    margin-bottom: 20px;

    .el-form-item__content {
      width: 120px;
    }

    .short-input .el-form-item__content {
      width: 100px;
    }

    .btn-form-item .el-form-item__content {
      width: 100%;
    }
  }
  // 主体栏
  .subject-bottom {
    .is-background {
      text-align: center;
      margin-top: 30px;
    }
  }

  span.red {
    color: red;
  }
}
</style>