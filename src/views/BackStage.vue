<!--后台管理-->
<template>
  <el-container style="border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        router
        :default-openeds="['1']"
        :default-active="this.$route.path"
      >
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>每日打卡</template>
          <el-menu-item index="/backStage/dailyInfo">今日打卡统计</el-menu-item>
          <el-menu-item index="/backStage/exportData"
            >往日打卡统计</el-menu-item
          >
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>学生管理</template>
          <el-menu-item index="/backStage/enterUser">导入学生信息</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>后台管理</template>
          <el-menu-item index="/backStage/addAdmin">添加管理员</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><p @click="logout">退出登录</p></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ adminName }}</span>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "BackStage",
  data() {
    return {
      adminName: "null",
    };
  },
  created() {
    this.$axios
      .get(this.$store.state.location + "admin/checkLogin")
      .then(({ data }) => {
        if (data.code !== 200) {
          this.$router.push({ name: "Login" });
        }
      });
    this.adminName = this.commonApi.getCookie("adminName")
  },
  methods: {
    logout() {
      this.commonApi.deleteCookie("adminName");
      this.commonApi.deleteCookie("token");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
}
</style>
