<!--添加管理员-->
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
          <p>添加管理员</p>
          <p class="tip">只有超级管理员有权限添加管理员</p>
        </div>

        <el-form ref="addAdmin" :model="formData">
          <el-col :offset="1" :span="22">
            <el-form-item label="姓名：">
              <el-input
                v-model="formData.name"
                placeholder="请输入管理员姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="账号：">
              <el-input
                v-model="formData.account"
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="密码：">
              <el-input
                v-model="formData.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="确认密码：">
              <el-input
                v-model="formData.checkPassword"
                placeholder="请确认密码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item>
              <el-button type="primary" @click="onSubmit()">添加</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        account: "",
        password: "",
        checkPassword: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$axios
        .post(this.$store.state.location + "admin/auth/addAdmin", {
          account: this.formData.account,
          name: this.formData.name,
          password: this.formData.password,
          checkPassword: this.formData.checkPassword,
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code !== 200) {
            this.$message({
              message: data.message,
              type: "warning",
            });
          } else {
            this.$message({
              message: data.message,
              type: "success",
            });
            (this.formData.account = ""),
              (this.formData.name = ""),
              (this.formData.password = ""),
              (this.formData.checkPassword = "");
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  float: none;
  .title {
    font-size: 1.4rem;
    .tip {
      font-size: 12px;
      color: #606266;
    }
  }
}
</style>
