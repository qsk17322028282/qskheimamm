<template>
  <div class="subject-bigbox">
    <!-- 头部表格 -->
    <el-card class="box-card subject-top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input class="short-input" v-model="formInline.eid" placeholder="企业编号"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formInline.name" placeholder="企业名称"></el-input>
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
          <el-button type="primary" @click="enterpriseGet">搜索</el-button>
          <el-button @click="clearForm">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 主体表格 -->
    <el-card class="box-card subject-bottom">
      <el-table :data="listContent" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          2019-12-24
          <!-- <template slot-scope="scope">
            {{scope.row.create_time | formatTime}}
          </template>-->
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span class="red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="enterpriseStatus(scope.row)">{{scope.row.status===1?"禁用":"启用"}}</el-button>
            <el-button type="text" @click="removeEnterprise(scope.row)">删除</el-button>
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
    <enterpriseAdd></enterpriseAdd>
    <!-- 编辑弹窗出口 -->
    <enterpriseEdit ref="editRef"></enterpriseEdit>
  </div>
</template>

<script>
//导入企业新增弹出框
import enterpriseAdd from "./components/enterpriseAdd";
//导入企业编辑弹出框
import enterpriseEdit from "./components/enterpriseEdit";
//导入axios封装的接口
import {
  enterpriseList,
  enterpriseRemove,
  enterpriseStatus
} from "../../../api/enterprise";
export default {
  components: {
    enterpriseAdd,
    enterpriseEdit
  },
  data() {
    return {
      formInline: {
        name: "",
        username: "",
        eid: "",
        status: ""
      },
      //新增弹框是否显示
      dialogFormVisible: false,
      editdialogFormVisible:false,
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
    //   搜索按钮的点击事件
    enterpriseGet() {
      enterpriseList({
        page: this.page,
        limit: this.limit,
        ...this.formInline
      }).then(res => {
        this.listContent = res.data.items;
        this.total = res.data.pagination.total;
      //   window.console.log(res);
      });
    },
    //清除按钮点击事件
    clearForm() {
      for (var key in this.formInline) {
        this.formInline[key] = "";
      }
      this.enterpriseGet();
    },
    //编辑按钮点击事件
    showEdit(item) {
      this.editdialogFormVisible = true;
      this.$refs.editRef.editForm = JSON.parse(JSON.stringify(item));
    },
    //状态按钮点击事件
    enterpriseStatus(item) {
      enterpriseStatus({
        id: item.id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success("恭喜您改变状态成功");
          this.enterpriseGet();
        }
        window.console.log(res);
      });
    },
    //删除按钮点击事件
    removeEnterprise(item) {
      //  window.console.log(item);
      enterpriseRemove({
        id: item.id
      }).then(res => {
        if (res.code === 200) {
          this.$confirm("确定要删除这条内容么", "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$message.success("恭喜您删除成功");
              this.enterpriseGet();
            })
            .catch(() => {
              this.$message.success("就知道你不会删除我的");
            });
        }
        window.console.log(res);
      });
    },
    //页码改变的点击事件
    handleCurrentChange(page) {
      // window.console.log(page);
      this.page = page;
      this.enterpriseGet();
    },
    //页容量改变
    handleSizeChange(limit) {
      window.console.log(limit);
      this.limit = limit;
      this.enterpriseGet();
    }
  },
  created() {
    //进入页面调用列表发送axios
    this.enterpriseGet();
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
</style