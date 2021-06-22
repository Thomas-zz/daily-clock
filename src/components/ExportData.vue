<!--后台-->
<template>
  <el-row class="main-board">
    <el-col
      class="wrapper"
      type="flex"
      style="margin: 0 auto"
      justify="space-around"
      :xs="24"
      :sm="24"
      :md="20"
      :lg="18"
      :xl="16"
    >
      <div clase="warpper-inner">
        <div class="select">
          <Strong>往日打卡统计</Strong>
        </div>
        <el-table
          class="data-table"
          row-key="date"
          ref="filterTable"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column type="index" :index="indexMethod" min-width="100"> </el-table-column>
          <el-table-column prop="fileName" label="文件名" min-width="200">
          </el-table-column>
          <el-table-column label="文件下载">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="exportData(scope.row)"
                >下载</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="cur_page"
            :page-sizes="[10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      cur_page: 1,
      pageSize: 20,
      total: 0,
      form: {},
      dialogFormVisible: false,
    };
  },
  created() {
    this.verify(this.cur_page, this.pageSize);
  },
  methods: {
    verify(cur_page, pageSize) {
      this.$axios
        .get(
          this.$store.state.location +
            "admin/user/pass/file/auth/getAllUserPassFile",
          {
            params: {
              current: cur_page,
              size: pageSize,
            },
          }
        )
        .then(({ data }) => {
          console.log(data);
          this.tableData = data.data.userPassFile.data;
          this.total = data.data.userPassFile.total;
        });
    },
    chooseDepartment(filters) {
      // console.log(filters);
      this.isClock = filters["status"][0];
      // console.log(this.isClock);
      this.cur_page = 1;
      console.log(this.college);
      this.verify(this.cur_page, this.pageSize, this.college, this.isClock);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.cur_page = 1;
      this.verify(this.cur_page, this.pageSize, this.college, this.isClock);
    },
    indexMethod(index) {
      return index + 1 + (this.cur_page - 1) * this.pageSize;
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.verify(this.cur_page, this.pageSize, this.college, this.isClock);
    },
    exportData(val) {
      //   console.log(val);
      window.location.href = val.url;
    },
  },
};
</script>
<style scoped lang="scss">
.wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  .select {
    text-align: center;
    font-size: 1.8rem;
    margin: 16px 0;
  }
  .topLine {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .uploadData {
    display: inline-block;
  }
  .chooseCollege {
    text-align: left;
    font-size: 14px;
    margin: 18px 0 10px 0;
  }
  .data-table {
    padding: 5px 10px;
    border-radius: 5px;
    border: solid 1px #dcdfe6;
  }
}
</style>
