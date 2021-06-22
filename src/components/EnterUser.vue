<!--导入学生信息-->
<template>
  <el-row class="main-board">
    <el-col
      style="margin: 0 auto"
      class="wrapper"
      :xs="24"
      :sm="20"
      :md="18"
      :lg="16"
      :xl="14"
    >
      <div class="wrapper-inner">
        <div class="title">
          <p>添加学生信息</p>
        </div>
        <el-upload
          class="upload-demo"
          :limit="limitNum"
          drag
          :auto-upload="true"
          :headers="importHeaders"
          action="http://121.196.154.127/admin/user/auth/enterUserInfo"
          accept=".xlsx"
          :before-upload="beforeUpload"
          :on-exceed="exceedFile"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :file-list="fileList"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>

          <div class="el-upload__tip" slot="tip">
            请上传excel表格，格式为xlsx
          </div>
        </el-upload>
        <br />
        <!-- <el-button size="small" type="primary" @click="uploadFile"
          >立即上传</el-button
        > -->
        <!-- <el-button size="small">取消</el-button> -->
      </div>
    </el-col>
  </el-row>
</template>

<script>
var mytoken = localStorage.getItem("token");
export default {
  name: "",
  data() {
    return {
      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [], // excel文件列表
      importHeaders: { token: mytoken },
    };
  },
  methods: {
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$message.warning(
        `只能选择 ${this.limitNum} 个文件，当前共选择了 ${
          files.length + fileList.length
        } 个`
      );
    },
    // 上传前的拦截，判断文件类型是否正确
    beforeUpload(file) {
      // console.log("before upload");
      // console.log(file);
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let size = file.size / 1024 / 1024;
      if (extension !== "xlsx") {
        this.$message.warning("只能上传后缀是.xlsx的文件");
      }
      if (size > 10) {
        this.$message.warning("文件大小不得超过10M");
      }
    },
    // // 文件状态改变时的钩子
    // fileChange(file) {
    //   console.log(file);
    //   this.fileList.push(file.raw);
    //   // console.log(this.fileList);
    // },
    uploadSuccess(response) {
      console.log(response);
      // console.log(file);
      // console.log(fileList);
      this.$message.success("文件上传成功");
    },
    uploadError(err, file, fileList) {
      console.log(err);
      console.log(file);
      console.log(fileList);
      this.$message.error("文件上传失败");
    },
    // UploadUrl: function () {
    //   // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
    //   return "";
    // },
    // uploadFile() {
    //   if (this.fileList.length === 0) {
    //     this.$message.warning("请上传文件");
    //   } else {
    //     let form = new FormData();
    //     form.append("file", this.fileList);
    //     this.$axios
    //       .post("http://121.196.154.127/admin/user/auth/enterUserInfo", {
    //         headers: {
    //           "Content-type": "multipart/form-data",
    //         },
    //         data: form,
    //       })
    //       .then(
    //         (res) => {
    //           console.log(res);
    //         },
    //         (err) => {
    //           console.log(err);
    //         }
    //       );
    //   }
    // },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  float: none;
  .title {
    font-size: 1.4rem;
  }
}
</style>
