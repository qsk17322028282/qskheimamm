<template>
  <!-- 新增学科弹框 -->
  <el-dialog center class="addsubStyle" title="编辑用户" :visible.sync="$parent.editdialogFormVisible">
    <el-form ref="editForm" :model="form" :rules="editFromRUles">
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
import { userEdit } from "../../../../api/user";
import {checkPhone,checkEmail} from '../../../../utils/validator'
export default {
  data() {
   
    return {
      //弹框尺寸
      formLabelWidth: "100px",
      form: {
       
      },
      editFromRUles: {
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
      this.$refs.editForm.validate(valid => {
        if (valid) {
          userEdit(this.form).then(res=>{
            // window.console.log(res);
            if(res.code === 200 ){
              this.$parent.userSearch()
              
              this.$message.success("编辑成功");
              this.$refs.editForm.resetFields();
              this.$parent.editdialogFormVisible = false
            }else if(res.code === 201){
              this.$message.warning("编号已存在,请重新输入");

            }
          })
        } else {
          this.$message.error("表单输入错误,请检查");
        }
      });
    },
     resetForm() {
        this.$refs.editForm.resetFields();
        this.$parent.editdialogFormVisible = false
      },
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