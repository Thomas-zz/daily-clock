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
      :md="24"
      :lg="24"
      :xl="24"
    >
      <div clase="warpper-inner">
        <div class="select">
          <Strong>每日打卡</Strong>
        </div>
        <!-- <el-button @click="clearFilter">清除过滤器</el-button> -->
        <div class="topLine">
          <div class="chooseCollege">
            <span>学院筛选：</span>
            <el-select
              @change="verify(cur_page, pageSize, college, isClock)"
              v-model="college"
              size="mini"
              placeholder="选择学院"
            >
              <el-option
                v-for="item in collegeOptions"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </div>
          <div class="chooseTemperature">
            <span>体温筛选：</span>
            <el-select
              @change="verify(cur_page, pageSize, college, isClock)"
              v-model="temperature"
              size="mini"
              placeholder="正常体温"
            >
              <el-option
                v-for="item in temperatureOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <div class="chooseAbroad">
            <span>是否出国回来：</span>
            <el-radio-group v-model="abroad" @change="verify()">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </div>
          <div class="chooseContactInfection">
            <span>是否接触过感染者或疑似感染者：</span>
            <el-radio-group v-model="contactInfection" @change="verify()">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </div>
          <div class="chooseVisitRisk">
            <span>是否有到达过风险区：</span>
            <el-radio-group v-model="visitRisk" @change="verify()">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </div>
          <div class="uploadData">
            <span>导出今日全部/打卡/未打卡同学名单：</span>
            <el-button
              @click="exportData"
              type="primary"
              size="mini"
              icon="el-icon-upload2"
            >
              导出Excel
            </el-button>
          </div>
        </div>
        <el-table
          class="data-table"
          row-key="date"
          ref="filterTable"
          :data="tableData"
          @filter-change="chooseDepartment"
          style="width: 100%"
        >
          <el-table-column type="index" :index="indexMethod"> </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="college" label="学院" min-width="200">
          </el-table-column>
          <el-table-column prop="clazz" label="班级"></el-table-column>
          <el-table-column prop="temperature" label="体温"></el-table-column>
          <el-table-column prop="abroad" label="出国回来">{{
            abroad ? "是" : "否"
          }}</el-table-column>
          <el-table-column prop="visitRisk" label="到达过风险区">{{
            visitRisk == "" ? "否" : "是"
          }}</el-table-column>
          <el-table-column prop="contactInfection" label="接触过(疑似)感染者"
            >{{ contactInfection ? "是" : "否" }}
          </el-table-column>
          <el-table-column
            prop="status"
            label="打卡状态"
            column-key="status"
            :filters="[
              { text: '已打卡', value: true },
              { text: '未打卡', value: false },
            ]"
            :filter-multiple="false"
            min-width="100"
          >
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
      college: null,
      collegeOptions: [],
      temperature: null,
      temperatureOptions: ["正常体温", "体温异常（>37.3℃）"],
      abroad: false,
      contactInfection: false,
      visitRisk: false,
      isClock: null,
      form: {},
      dialogFormVisible: false,
    };
  },
  created() {
    this.verify(this.cur_page, this.pageSize, this.college, this.isClock);
    this.$axios
      .get(this.$store.state.location + "web/class/auth/getCollege")
      .then(({ data }) => {
        if (data.code === 200) {
          this.collegeOptions = data.data.college;
          this.collegeOptions.unshift({
            name: "全部",
          });
        }
      });
  },
  methods: {
    verify(cur_page, pageSize, college, isClock) {
      // console.log(college);
      // console.log(isClock);
      if (college === "全部") {
        college = null;
      }
      let temp = null;
      if (this.temperature === "体温异常（>37.3℃）") {
        temp = 37.3;
      }
      let that = this;
      this.$axios
        .get(
          this.$store.state.location + "admin/user/pass/auth/getUserPassInfo",
          {
            params: {
              college: college,
              current: cur_page,
              size: pageSize,
              sign: isClock,
              abroad: that.abroad,
              contactInfection: that.contactInfection,
              temperature: temp,
              visitRisk: that.visitRisk,
            },
          }
        )
        .then(({ data }) => {
          console.log(data);
          this.tableData = data.data.userPassInfo.data;
          this.total = data.data.userPassInfo.total;
        });
    },
    chooseDepartment(filters) {
      // console.log(filters);
      this.isClock = filters["status"][0];
      // console.log(this.isClock);
      this.cur_page = 1;
      // console.log(this.college);
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
    exportData() {
      // window.location.href =
      //   this.$store.state.location + "admin/user/pass/auth/exportUserPassInfo" + this.isClock ===
      //   null
      //     ? null
      //     : this.isClock;

      // if (this.isClock === null) {
      //   window.location.href =
      //     this.$store.state.location +
      //     "admin/user/pass/auth/exportUserPassInfo";
      // } else {
      //   window.location.href =
      //     this.$store.state.location +
      //     `admin/user/pass/auth/exportUserPassInfo?sign=${this.isClock}`;
      // }

      // 带token请求
      let clockMessage = "";
      if (this.isClock === null) {
        clockMessage = "全部";
      } else if (this.isClock === true) {
        clockMessage = "已打卡";
      } else {
        clockMessage = "未打卡";
      }
      function createObjectURL(object) {
        return window.URL
          ? window.URL.createObjectURL(object)
          : window.webkitURL.createObjectURL(object);
      }
      var xhr = new XMLHttpRequest();
      var formData = new FormData();
      if (this.isClock === null) {
        xhr.open(
          "get",
          this.$store.state.location + "admin/user/pass/auth/exportUserPassInfo"
        ); //url填写后台的接口地址，如果是post，在formData append参数
      } else {
        xhr.open(
          "get",
          this.$store.state.location +
            `admin/user/pass/auth/exportUserPassInfo?sign=${this.isClock}`
        );
      }

      xhr.setRequestHeader("token", localStorage.getItem("token"));
      xhr.responseType = "blob";
      xhr.onload = function () {
        if (this.status == 200) {
          var blob = new Blob([this.response], {
            type: "application/vnd.ms-excel",
          });
          var date = new Date();
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var filename =
            year +
            "-" +
            month +
            "-" +
            day +
            " " +
            hours +
            "时" +
            minutes +
            "分" +
            clockMessage +
            "同学名单" +
            ".xlsx";
          // console.log(this.response);
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, filename);
          } else {
            var a = document.createElement("a");
            var url = createObjectURL(blob);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          }
        }
      };
      xhr.send(formData);
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
  }
  .topLine {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    text-align: left;
    font-size: 14px;
  }
  .uploadData {
    font-size: 14px;
    display: inline-block;
  }
  .chooseCollege {
    margin: 18px 0 10px 0;
  }
  .chooseTemperature {
    .el-select {
      width: 160px;
    }
  }
  .data-table {
    padding: 5px 10px;
    border-radius: 5px;
    border: solid 1px #dcdfe6;
  }
}
</style>
