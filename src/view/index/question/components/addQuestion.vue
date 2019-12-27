<template>
  <!-- 新增学科弹框 -->
  <el-dialog fullscreen center class="addsubStyle" title="新增题库测试" :visible.sync="$parent.addFormVisible">
    <el-form ref="addForm" :model="form" :rules="addFromRules">
     <el-form-item required label="学科名称" prop="subject" :label-width="formLabelWidth">
        <el-select v-model="form.subject" placeholder="请选择学科">
            <el-option v-for="item in $parent.subject" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item required label="阶段" prop="step" :label-width="formLabelWidth">
        <el-select v-model="form.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item required label="企业名称" prop="enterprise" :label-width="formLabelWidth">
        <el-select v-model="form.enterprise" placeholder="请选择企业">
            <el-option v-for="item in $parent.enterprise" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
      </el-form-item>
      
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {addEnterprise} from '../../../../api/enterprise'
export default {
  data() {
    return {
      //弹框尺寸
      formLabelWidth: "100px",
      form: {
        enterprise: "",
        subject: "",
        step: "",
        intro: "",
        remark: ""
      },
      addFromRules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "企业名称不能为空", trigger: "blur" }],
        short_name: [{ required: true, message: "企业简称不能为空", trigger: "blur" }],
        intro: [{ required: true, message: "企业简介不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          addEnterprise(this.form).then(res=>{
            // window.console.log(res);
            if(res.code === 200 ){
              this.$parent.enterpriseGet()
              this.$message.success("新增成功");
              this.$refs.addForm.resetFields();
              this.$parent.dialogFormVisible = false
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
        this.$refs.addForm.resetFields();
        this.$parent.dialogFormVisible = false
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