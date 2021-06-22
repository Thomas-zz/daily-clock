<!--登录页面-->
<template>
  <el-row class="main-board">
    <el-col
      style="margin: 0 auto"
      class="wrapper"
      :xs="21"
      :sm="12"
      :md="9"
      :lg="8"
      :xl="7"
    >
      <div class="wrapper-inner">
        <div class="title">
          <div class="title-container">
            <p class="user">{{ user }}登录</p>
            <p class="switch" @click="switchTo">
              <i :class="iconSrc"></i>
              {{ switchUser }}
            </p>
          </div>
        </div>
        <el-form ref="ruleForm" :model="formData" :rules="formRules">
          <el-col :offset="1" :span="22">
            <el-form-item label="账号：" prop="account">
              <el-input
                v-model="formData.account"
                placeholder="请输入登录账号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="密码：" prop="password">
              <el-input
                v-model="formData.password"
                placeholder="请输入登录密码"
                show-password
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item>
              <el-button
                size="medium"
                type="primary"
                @click="onSubmit('ruleForm')"
                >登录</el-button
              >
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      user: "用户",
      switchUser: "管理员",
      iconSrc: "el-icon-user",
      formData: {
        account: "",
        password: "",
      },
      formRules: {
        account: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    switchTo() {
      if (this.user === "用户") {
        this.user = "管理员";
        this.switchUser = "用户";
        this.iconSrc = "el-icon-user-solid";
      } else {
        this.user = "用户";
        this.switchUser = "管理员";
        this.iconSrc = "el-icon-user";
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.user === "用户") {
            this.$axios
              .post(this.$store.state.location + "web/user/login", {
                identificationNumber: this.formData.account,
                password: this.formData.password,
              })
              .then(({ data }) => {
                if (data.code === 200) {
                  // console.log(data);
                  // 设置cookie.token
                  // this.commonApi.setCookie("token", data.data.user.token, 10);
                  localStorage.setItem("token", data.data.user.token);
                  // 设置localStorage
                  localStorage.setItem(
                    "formData",
                    JSON.stringify(data.data.user)
                  );
                  this.$router.push({ name: "DailyClock" });
                } else {
                  this.$message({
                    showClose: true,
                    message: data.message,
                    type: "error",
                  });
                }
              });
            console.log();
          } else {
            this.$axios
              .post(this.$store.state.location + "admin/login", {
                account: this.formData.account,
                password: this.formData.password,
              })
              .then(({ data }) => {
                if (data.code === 200) {
                  console.log(data);
                  // this.commonApi.setCookie("token", data.data.admin.token, 10);
                  localStorage.setItem("token", data.data.admin.token);
                  this.commonApi.setCookie(
                    "adminName",
                    data.data.admin.name,
                    10
                  );
                  this.$router.push({ name: "DailyInfo" });
                } else {
                  this.$message({
                    showClose: true,
                    message: data.message,
                    type: "error",
                  });
                }
              });
            console.log();
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  float: none;
  .wrapper-inner {
    overflow: hidden;
    .title {
      height: 4.8rem;
      font-size: 1.4rem;
      position: relative;
      .user {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
      .switch {
        cursor: pointer;
        .el-icon-user {
          margin-right: 5px;
        }
        position: absolute;
        right: 5%;
        font-size: 14px;
      }
    }
    // width: 50%;
    margin: 0 auto;
    margin-top: 4rem;
    border: solid 1px #dcdfe6;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
