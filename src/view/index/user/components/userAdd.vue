<template>
  <!-- 新增学科弹框 -->
  <el-dialog center class="addsubStyle" title="新增用户" :visible.sync="$parent.dialogFormVisible">
    <el-form ref="addForm" :model="form" :rules="addFromRules">
      <el-form-item required label="用户名" prop="username" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item required label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
        <el-select v-model="form.role_id" placeholder="请选择角色">
          <el-option label="管理员" :value="2"></el-option>
          <el-option label="老师" :value="3"></el-option>
          <el-option label="学生" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="禁用" :value="0"></el-option>
          <el-option label="启用" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { adduser } from "../../../../api/user";
export default {
  data() {
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
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空 !"));
      } else {
        // 判断手机号的格式
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
      //弹框尺寸
      formLabelWidth: "100px",
      form: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      },
      addFromRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        role_id: [{ required: true, message: "角色不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          adduser(this.form).then(res => {
            // window.console.log(res);
            if (res.code === 200) {
              this.$parent.userSearch();
              this.$message.success("新增成功");
              this.$refs.addForm.resetFields();
              this.$parent.dialogFormVisible = false;
            } else if (res.code === 201) {
              this.$message.warning(res.message);
            }
          });
        } else {
          this.$message.error("表单输入错误,请检查");
        }
      });
    },
    resetForm() {
      this.$refs.addForm.resetFields();
      this.$parent.dialogFormVisible = false;
    }
  }
};
</script>

<style lang="less">
.addsubStyle {
  .el-dialog {
    width: 603px;
  }
}
</style>