<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-button
        @click="dialogVisible = true"
        type="primary"
        size="mini"
        icon="el-icon-download"
      >
        导入Excel
      </el-button>

      <el-button
        @click="exportData"
        type="primary"
        size="mini"
        icon="el-icon-upload2"
      >
        导出Excel
      </el-button>
    </div>

    <el-table :data="list" border row-key="id" lazy :load="load">
      <el-table-column label="名称" align="left" prop="name" />
      <el-table-column label="编码" prop="dictCode" />
      <el-table-column label="值" align="left" prop="value" />
    </el-table>
    <el-dialog title="数据字典导入" :visible.sync="dialogVisible" width="32%">
      <el-form>
        <el-form-item label="请选择Excel文件">
          <el-upload
            :auto-upload="true"
            :multiple="false"
            :limit="1"
            :on-exceed="fileUploadExceed"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            drag
            action="http://121.196.154.127/admin/auth/addAdmin"
            name="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
          <!-- <el-upload
            :auto-upload="true"
            :multiple="false"
            :limit="1"
            :on-exceed="fileUploadExceed"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :action="BASE_API + '/admin/core/dict/import'"
            name="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      list: [],
    };
  },
  created() {
    this.fetchData(1);
  },
  methods: {
    // 上传多于一个文件时
    fileUploadExceed() {
      this.$message.warning("最多只能上传一个文件");
    },
    fileUploadSuccess(response) {
      if (response.code === 200) {
        this.$message.success("数据导入成功");
        this.dialogVisible = false;
        this.fetchData(1);
      } else {
        this.$message.error(response.message);
      }
    },


    //Excel数据导出
    exportData() {
      window.location.href = this.BASE_API + "/admin/core/dict/export";

    },
  },
};
</script>
