<template>
  <!-- 新增学科弹框 -->
  <el-dialog center class="addsubStyle" title="编辑学科" :visible.sync="$parent.editdialogFormVisible">
    <el-form ref="editForm" :model="editForm" :rules="addFromRules">
      <el-form-item required label="学科编号" prop="rid" :label-width="formLabelWidth">
        <el-input v-model="editForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item required label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="editForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro" :label-width="formLabelWidth">
        <el-input v-model="editForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {subjectEdit} from '../../../../api/subject'
export default {
  data() {
    return {
      //弹框尺寸
      formLabelWidth: "100px",
      editForm: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      addFromRules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          subjectEdit(this.editForm).then(res=>{
            window.console.log(res);
            if(res.code === 200 ){
              this.$parent.subjectGet()
              
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