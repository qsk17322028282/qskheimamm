<template>
  <div class="bgc-box">
    <div class="form-box">
      <div class="title-box">
        <img src="../../assets/矢量智能对象 拷贝 9.png" alt />
        <span class="title">黑马面面</span>
        <i></i>
        <span class="sub-title">用户登录</span>
      </div>

      <!-- eleme表单 -->
      <el-form class="login-form" ref="form" :model="form" :rules="rules">
        <!-- 手机号输入框 -->
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 验证码输入框 -->
        <el-form-item prop="captcha">
          <!-- 行 -->
          <el-row>
            <!-- 列 -->
            <el-col :span="18">
              <el-input placeholder="请输入验证码" v-model="form.captcha" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="6">
              <img class="captcha" :src="captchaUrl" alt @click="changeCaptcha" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 隐私协议同意勾选栏 -->
        <el-form-item>
          <el-checkbox v-model="form.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <!-- 登录注册电机按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button type="primary" class="register-btn" @click="dialogFormVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="../../assets/login_banner_ele.png" alt />

    <!-- 注册框 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
      <el-form :model="regForm" :rules="regrules" ref="regForm">
        <el-form-item label="头像" prop="avatar" :label-width="formLabelWidth">
          <!-- 头像上传 -->
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
          <el-input v-model="regForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="regForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="regForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="regForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" prop="captcha" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regForm.captcha" autocomplete="off"></el-input>
            </el-col>
            <el-col :offset="1" :span="7">
              <img class="register-captcha" :src="regCaptchaUrl" alt @click="changeCaptchaUrl" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="rcode" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regForm.rcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button @click="messageSend" :disabled="time != 0">获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="regSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//导入封装好的axios  api抽取
import {login,sendsms,register} from "../../api/axiosfz";
import {setToken} from '../../utils/token'
export default {
  data() {
    // 判断手机号
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空 !"));
      } else {
        // 判断手机号的格式
        // 正则
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("手机号输入错误 !"));
        }
      }
    };
    // 判断邮箱号
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        // alert("111")
        return callback(new Error("邮箱不能为空 !"));
      } else {
        // alert("222")
        // 判断邮箱的格式
        // 正则
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("邮箱输入错误 !"));
        }
      }
    };

    return {
      form: {
        phone: "",
        password: "",
        captcha: "",
        code: "",
        regphone: "",
        checked: false
      },
      regForm: {
        avatar: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        rcode: "",
        captcha: ""
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: "change" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "change" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "change"
          }
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "change" },
          { min: 4, max: 4, message: "长度为4个字符", trigger: "change" }
        ]
      },
      //regForm的规则设置
      regrules: {
        //用户名
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 12, message: "长度在 2 到 12 个字符", trigger: "blur" }
        ],
        //邮箱
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        //手机号
        phone: [
          {
            required: true,
            validator: checkPhone,
            message: "手机号不能为空",
            trigger: "blur"
          },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "change" }
        ],
        //密码
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "change"
          }
        ],
        // 图片验证码
        captcha: [
          { required: true, message: "图片验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ],
        //短信验证码
        rcode: [
          { required: true, message: "短信验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ]
      },
      //验证码的获取
      captchaUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      // 点击注册是弹出的对话框  给默认值 不弹出
      dialogFormVisible: false,
      // 宽度设置
      formLabelWidth: "70px",
      // 上传地址
      imageUrl: "",
      //注册框的验证码获取
      regCaptchaUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      //倒计时按钮事件
      time: 0,
      //上传头像的地址
      uploadUrl: process.env.VUE_APP_BASEURL + "/uploads"
    };
  },
  methods: {
    //登录按钮事件
    submitForm() {
      if (this.form.checked == false) {
        this.$message.warning("请先同意用户协议 !");
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            // axios({
            //   url: process.env.VUE_APP_BASEURL + "/login",
            //   method: "post",
            //   withCredentials: true,
            //   data: {
            //     phone: this.form.phone,
            //     password: this.form.password,
            //     code: this.form.captcha
            //   }
            // })
            login({
              phone: this.form.phone,
              password: this.form.password,
              code: this.form.captcha
            }).then(res => {
              //成功回调
              if(res.data.code === 202){
                this.$message.error(res.data.message);
              }else if(res.data.code === 200){
                this.$message.success("登录成功");
                setToken(res.data.data.token)
                // localStorage.setItem = res.data.data.token
                this.$router.push('/index/chart') 

              }
              // window.console.log(res);
            });
          } else {
            this.$message.error("信息错误");
            return false;
          }
        });
      }
    },
    //点击验证码图片刷新验证码
    changeCaptcha() {
      this.captchaUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now();
    },
    // 上传的方法
    handleAvatarSuccess(res, file) {
      // 生成本地服务器的图片的地址
      this.regForm.avatar = res.data.file_path;
      // window.console.log(res);
      // window.console.log(res.data.file_path);
      //本地临时生成的图片地址
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //点击注册的验证码更新验证码
    changeCaptchaUrl() {
      this.regCaptchaUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=sendsms&" + Date.now();
    },
    //点击获取短信验证码
    messageSend() {
      if (this.time == 0) {
        // alert("已调用")
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!reg.test(this.regForm.phone)) {
          return this.$message.error("手机号输入错误 !");
        }
        if (this.regForm.captcha == "" || this.regForm.captcha.length != 4) {
          return this.$message.error("图片验证码输入错误!");
        }

        //验证通过以后再    创建一个计时器
        this.time = 60;
        let timerID = setInterval(() => {
          this.time--;
          if (this.time == 0) {
            clearInterval(timerID);
          }
        }, 10);

        //手机号与验证码全部符合要求发送axios获取短信验证码
        // axios({
        //   url: process.env.VUE_APP_BASEURL + "/sendsms",
        //   method: "POST",
        //   withCredentials: true,
        //   data: {
        //     code: this.regForm.captcha,
        //     phone: this.regForm.phone
        //   }
        // })
        sendsms({
          code: this.regForm.captcha,
          phone: this.regForm.phone
        }).then(res => {
          //成功回调
          if (res.data.code == 200) {
            this.$message.success(
              "手机验证码为:" +
                res.data.data.captcha +
                "! 验证码状态为:" +
                res.data.message +
                "!"
            );
          } else {
            return this.$message.error("验证码输入错误 !");
          }
          // window.console.log(res);
        });
      }
    },
    //注册确定按钮点击事件
    regSubmit() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          //成功发送axios 储存注册内容
          // axios({
          //   url: process.env.VUE_APP_BASEURL + "/register",
          //   method: "POST",
          //   data: {
          //     phone: this.regForm.phone,
          //     username: this.regForm.username,
          //     email: this.regForm.email,
          //     avatar: this.regForm.avatar,
          //     password: this.regForm.password,
          //     rcode: this.regForm.rcode
          //   }
          // })
          register({
            phone: this.regForm.phone,
            username: this.regForm.username,
            email: this.regForm.email,
            avatar: this.regForm.avatar,
            password: this.regForm.password,
            rcode: this.regForm.rcode
          }).then(res => {
            //成功回调
            if (res.data.code == 200) {
              this.$message.success("恭喜您注册成功");
              this.dialogFormVisible = false;
              // window.console.log(res);
            }
          });
        } else {
          this.$message.error("很抱歉,内容没有填写正确");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
// login页面
.bgc-box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );

  .form-box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 44px;
    box-sizing: border-box;

    .title-box {
      display: flex;
      align-items: center;

      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      i {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    // 表单
    .login-form {
      margin-top: 27px;
      // 验证码
      .captcha {
        height: 40px;
        width: 100%;
      }
      //协议选择框
      .el-checkbox {
        display: flex;
        align-items: center;
        .el-checkbox__label {
          display: flex;
          align-items: center;
        }
      }
      // 登录注册按钮
      .el-button {
        width: 100%;
        margin: 0;
      }
      .register-btn {
        margin-top: 26px;
      }
    }
  }
}
// 注册页面
.el-dialog {
  width: 603px;
  // 顶部样式设置
  .el-dialog__header {
    text-align: center;
    background: linear-gradient(to right, #01c4fa, #1294fa);
    padding-bottom: 20px;
    //字体颜色
    .el-dialog__title {
      color: white;
    }
  }
  // 注册验证码
  .register-captcha {
    height: 40px;
    width: 100%;
  }
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>