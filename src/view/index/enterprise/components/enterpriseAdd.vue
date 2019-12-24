<template>
  <!-- 新增学科弹框 -->
  <el-dialog center class="addsubStyle" title="新增学科" :visible.sync="$parent.dialogFormVisible">
    <el-form ref="addForm" :model="form" :rules="addFromRules">
      <el-form-item required label="学科编号" prop="eid" :label-width="formLabelWidth">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item required label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark" :label-width="formLabelWidth">
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
import {addEnterprise} from '../../../../api/enterprise'
export default {
  data() {
    return {
      //弹框尺寸
      formLabelWidth: "100px",
      form: {
        eid: "",
        name: "",
        short_name: "",
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