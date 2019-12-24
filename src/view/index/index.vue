<template>
  <el-container class="containerBox">
    <!-- 头部导航栏 -->
    <el-header class="my-header">
      <div class="head-left">
        <i class="el-icon-s-fold icon" @click="isCollapse= !isCollapse"></i>
        <img src="../../assets/首页logo.png" alt class="logo" />
        <span class="heimamm_text">黑马面面</span>
      </div>
      <div class="head-right">
        <img :src="userInfo.avatar" alt class="userPic" />
        <span class="hello">{{userInfo.username}} ,您好</span>
        <el-button class="exitBtn" type="primary" size="small" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="auto" class="my-Aside">
        <!-- 侧边栏导航菜单 -->
        <el-menu
          router
          :default-active="$router.path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体内容 -->
      <el-main class="my-Main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { removeToken } from "../../utils/token";
// import { userInfo } from "../../api/axiosfz";
import { userlogout } from "../../api/axiosfz";
// import store from '../../store/store'
export default {
  name: "index",
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    logout() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userlogout().then(res => {
            window.console.log(res);
            if (res.data.code === 200) {
              // 删除token信息
              removeToken();
              //删除用户信息
              this.$store.state.userInfo = {};
              // 跳转到登录页
              this.$router.push("/login");
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },

  // beforeCreate() {
  //   if (!getToken()) {
  //     this.$message.error("没有令牌禁止进入");
  //     this.$router.push("/login");
  //   }
  // },
  created() {
    // userInfo().then(res => {
    //   window.console.log(res.data.data);
    //   if (res.data.code === 200) {
    //     // 用户头像图片需要加上基地址
    //     res.data.data.avatar = `${process.env.VUE_APP_BASEURL}/${res.data.data.avatar}`;
    //     this.userMessage = res.data.data;
    //   window.console.log(this.userMessage.username);
    //   }else if(res.data.code === 206){
    //     this.$message.error("伪造令牌是不好的");
    //     removeToken();
    //     this.$router.push("/login");
    //   }
    // });
  }
};
</script>

<style lang="less">
.containerBox {
  height: 100%;
  .my-header {
    // background-color: skyblue;
    display: flex;
    justify-content: space-between;
    // 导航栏左侧信息栏
    .head-left {
      display: flex;
      align-items: center;
      // 字体图标
      .icon {
        font-size: 30px;
        margin-right: 22px;
      }
      // nav logo
      .logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      // heimamm 文字
      .heimamm_text {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    // 导航栏左侧信息栏
    .head-right {
      display: flex;
      align-items: center;
      //用户头像
      .userPic {
        width: 43px;
        height: 43px;
        margin-right: 9px;
      }
      // 用户名  您好
      .hello {
        font-size: 15px;
        margin-right: 38px;
      }
      // 退出按钮
      .exitBtn {
        color: #fff;
      }
    }
  }
  .my-Aside {
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .my-Main {
    background-color: #E8E9EC;
  }
}
</style>