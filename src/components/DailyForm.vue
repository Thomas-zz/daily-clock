<!--每日打卡表单-->
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
          <p>疫情防控，每日打卡</p>
          <p class="clockStatus">{{ clockMessage }}</p>
        </div>
        <div class="riskArea">
          <el-col :offset="1" :span="22">
            <p>高风险地区：{{ risks.L1 }}</p>
            <p>中风险地区：{{ risks.L2 }}</p>
            <p>低风险地区：{{ risks.L3 }}</p>
          </el-col>
        </div>
        <el-form
          ref="dailyForm"
          :model="formLabelAlign"
          :rules="formRules"
          :disabled="isClock"
        >
          <el-col :offset="1" :span="22">
            <el-form-item label="您的姓名：" prop="name">
              <el-input
                v-model="formLabelAlign.name"
                placeholder="请填写您的姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="学号/职工号：" prop="identificationNumber">
              <el-input
                v-model="formLabelAlign.identificationNumber"
                placeholder="请填写您的学号/职工号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="所在学院：" prop="college">
              <el-input
                v-model="formLabelAlign.college"
                placeholder="请选择学院"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="所在班级：" prop="clazz">
              <el-input
                v-model="formLabelAlign.clazz"
                placeholder="请填写所在班级"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="联系电话：" prop="phone">
              <el-input
                v-model="formLabelAlign.phone"
                placeholder="请填写联系电话"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="身份证号:" prop="idCard">
              <el-input
                v-model="formLabelAlign.idCard"
                placeholder="请填写您的身份证号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="籍贯:" prop="region">
              <el-cascader
                size="large"
                :options="provinceAndCityOptions"
                v-model="formLabelAlign.region"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="家庭住址：" prop="address">
              <el-input
                v-model="formLabelAlign.address"
                placeholder="请填写您的家庭住址"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="紧急联系人：" prop="emergencyContact">
              <el-input
                v-model="formLabelAlign.emergencyContact"
                placeholder="请填写紧急联系人姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item
              label="与紧急联系人关系："
              prop="emergencyRelationship"
            >
              <el-input
                v-model="formLabelAlign.emergencyRelationship"
                placeholder="请填写与紧急联系人关系"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="紧急联系人电话：" prop="emergencyPhone">
              <el-input
                v-model="formLabelAlign.emergencyPhone"
                placeholder="请填写紧急联系人电话"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="今日体温：" prop="temperature">
              <el-input
                v-model="formLabelAlign.temperature"
                placeholder="请填写目前体温"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="今日状态：">
              <el-input v-model="formLabelAlign.condition"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="近期是否有出国：" prop="abroad">
              <el-radio-group v-model="formLabelAlign.abroad">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item
              label="是否有途经或到达过疫情风险区："
              prop="isToVisitRisk"
            >
              <el-radio-group
                v-model="formLabelAlign.isToVisitRisk"
                @change="$forceUpdate()"
              >
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-if="formLabelAlign.isToVisitRisk" :offset="1" :span="22">
            <el-form-item label="途径或到达过的风险区：" prop="visitRisk">
              <el-checkbox-group v-model="formLabelAlign.visitRisk">
                <el-checkbox
                  v-for="area in risksArea"
                  :label="area"
                  :key="area"
                  >{{ area }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item
              label="是否接触过感染者或疑似感染者："
              prop="contactInfection"
            >
              <el-radio-group v-model="formLabelAlign.contactInfection">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="疫苗接种情况：" prop="vaccine">
              <el-select
                v-model="formLabelAlign.vaccine"
                placeholder="请选择接种情况"
              >
                <el-option label="未接种疫苗" value="0"></el-option>
                <el-option label="已接种第一针" value="1"></el-option>
                <el-option label="已接种两针" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item label="目前所在地：" prop="location">
              <el-cascader
                size="large"
                :options="options"
                v-model="formLabelAlign.location"
                @change="handleChange"
              >
              </el-cascader>
              <p v-if="isAddressFalse" style="color: #f56c6c">
                选择的位置与当前地理位置不匹配！
              </p>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="22">
            <el-form-item>
              <el-button type="primary" @click="onSubmit('dailyForm')"
                >立即提交</el-button
              >
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import { provinceAndCityData } from "element-china-area-data";
import fetchJsonp from "fetch-jsonp";

export default {
  name: "DailyForm",
  data() {
    return {
      options: regionData,
      // selectedOptions: [],
      provinceAndCityOptions: provinceAndCityData,
      isClock: false,
      clockMessage: "",
      // provinceAndCity: ["120000", "120100"],
      formLabelAlign: {
        name: "",
        phone: "",
        role: 0,
        idCard: null,
        identificationNumber: "",
        emergencyContact: "",
        emergencyPhone: "",
        college: "",
        clazz: null,
        classNo: null,
        region: [],
        token: "",
        temperature: 0,
        condition: "",
        isToVisitRisk: false,
        visitRisk: [],
        contactInfection: false,
        vaccine: "",
        location: [],
        abroad: false,
      },
      formRules: {
        name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
        idCard: [
          { required: true, message: "请输入您的身份证号", trigger: "blur" },
        ],
        identificationNumber: [
          { required: true, message: "请输入您的学号/职工号", trigger: "blur" },
        ],
        college: [{ required: true, message: "请选择学院", trigger: "change" }],
        clazz: [{ required: true, message: "请输入所在班级", trigger: "blur" }],
        region: [{ required: true, message: "请选择籍贯", trigger: "change" }],
        phone: [{ required: true, message: "请填写联系电话", trigger: "blur" }],
        address: [
          { required: true, message: "请填写家庭地址", trigger: "blur" },
        ],
        condition: [
          { required: true, message: "请填写今日身体状态", trigger: "blur" },
        ],
        abroad: [
          { required: true, message: "请填写近期是否有出国", trigger: "blur" },
        ],

        emergencyContact: [
          {
            required: true,
            message: "请填写与紧急联系人关系",
            trigger: "blur",
          },
        ],
        emergencyRelationship: [
          { required: true, message: "请输入紧急联系人姓名", trigger: "blur" },
        ],
        emergencyPhone: [
          {
            required: true,
            message: "请输入紧急联系人联系电话",
            trigger: "blur",
          },
        ],
        temperature: [
          { required: true, message: "请输入您今日的体温", trigger: "blur" },
        ],
        isToVisitRisk: [
          {
            required: true,
            message: "请选择是否有途经或到达过疫情风险区",
            trigger: "change",
          },
        ],
        contactInfection: [
          {
            required: true,
            message: "请选择是否接触过感染者或疑似感染者",
            trigger: "change",
          },
        ],
        vaccine: [
          { required: true, message: "请选择疫苗接种情况", trigger: "change" },
        ],
        location: [
          { required: true, message: "请选择目前所在地", trigger: "change" },
        ],
      },
      risks: {},
      risksArea: [],
      // 用户当前地理位置
      currentAddress: "",
      // 当前地理位置是否不正确
      isAddressFalse: true,
    };
  },
  created() {
    this.getClockStatus();
    this.riskZone();
    this.getLocation();
  },
  methods: {
    getClockStatus() {
      // 判断token是否失效，并拿到打卡状态
      this.$axios
        .get(this.$store.state.location + "web/pass/getStatus")
        .then(({ data }) => {
          if (data.code !== 200) {
            this.$router.push({ name: "Login" });
          }
          console.log(data.data.status);
          this.isClock = data.data.status;
          if (this.isClock) {
            this.clockMessage = "您今日已打卡";
          } else {
            this.clockMessage = "您今日还未打卡！";
          }
        });
    },
    deleteItem(index, list) {
      for (let i = 0; i < list.length; i++) {
        if (i === index) {
          list.splice(i, 1);
        }
      }
    },
    // 获取用户地理位置
    getLocation() {
      fetchJsonp(
        "https://api.map.baidu.com/location/ip?ak=o90XllPvfuLWg2sUkYyuRTA3NIGHsxAi&coor=bd09ll",
        {
          headers: { Accept: "application/json" },
          jsonCallbackFunction: "showLocation",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.currentAddress = data.content.address;
        });
    },
    riskZone() {
      // 拿到localStorage
      this.formLabelAlign = JSON.parse(localStorage.getItem("formData"));
      console.log(this.formLabelAlign);

      // abroad返的是string，但传给后台要boolean
      if (this.formLabelAlign.abroad === "是") {
        this.formLabelAlign.abroad = true;
      } else {
        this.formLabelAlign.abroad = false;
      }

      if (this.formLabelAlign.contactInfection === "是") {
        this.formLabelAlign.contactInfection = true;
      } else {
        this.formLabelAlign.contactInfection = false;
      }

      this.formLabelAlign.region = this.formLabelAlign.region.split(",");
      this.formLabelAlign.location = this.formLabelAlign.location.split(",");
      // 判断去过的风险区是否为空来为isToVisitRisk字段设值
      if (
        this.formLabelAlign.visitRisk === "" ||
        this.formLabelAlign.visitRisk === null ||
        typeof this.formLabelAlign.visitRisk === "undefined"
      ) {
        this.formLabelAlign.isToVisitRisk = false;
      } else {
        this.formLabelAlign.isToVisitRisk = true;
      }
      this.formLabelAlign.visitRisk = this.formLabelAlign.visitRisk.split(",");
      // console.log(this.formLabelAlign);
      this.$axios
        .get(this.$store.state.location + "web/pass/getRisk")
        .then(({ data }) => {
          let risks = data.data.risks;
          // console.log("data.data.risks");
          // console.log(data.data);
          let L1 = "",
            L2 = "",
            L3 = "";
          for (let i of risks) {
            if (i.level === 1) {
              L1 += i.name;
              L1 += "，";
            } else if (i.level === 2) {
              L2 += i.name;
              L2 += "，";
            } else {
              L3 += i.name;
              L3 += "，";
            }
            this.risksArea.push(i.name);
          }
          this.risks = {
            L1,
            L2,
            L3,
          };
        });
      // console.log(this.formLabelAlign);
    },
    handleChange() {
      let loc = "";
      let that = this;
      for (let i = 0; i < that.formLabelAlign.location.length - 1; i++) {
        loc += CodeToText[that.formLabelAlign.location[i]];
      }
      if (loc !== this.currentAddress) {
        this.isAddressFales = true;
      } else {
        this.isAddressFalse = false;
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (typeof this.formLabelAlign.region !== "string") {
            this.formLabelAlign.region = this.formLabelAlign.region.join();
          }
          if (typeof this.formLabelAlign.location !== "string") {
            this.formLabelAlign.location = this.formLabelAlign.location.join();
          }

          if (typeof this.formLabelAlign.temperature !== "number") {
            this.formLabelAlign.temperature = parseFloat(
              this.formLabelAlign.temperature
            );
          }
          if (this.formLabelAlign.isToVisitRisk === false) {
            this.formLabelAlign.visitRisk = "";
          } else {
            if (typeof this.formLabelAlign.visitRisk !== "string") {
              this.formLabelAlign.visitRisk =
                this.formLabelAlign.visitRisk.join();
            }
          }
          console.log(this.formLabelAlign);
          let that = this;
          this.$axios
            .put(
              this.$store.state.location + "web/pass/auth/submit",
              this.formLabelAlign
            )
            .then(({ data }) => {
              console.log(data);
              if (data.code === 200) {
                this.$message({
                  message: "提交成功！",
                  type: "success",
                });
                localStorage.setItem(
                  "formData",
                  JSON.stringify(that.formLabelAlign)
                );
                // 锁住表单
                that.isClock = true;
              } else {
                this.$message({
                  message: "提交失败！",
                  type: "error",
                });
              }
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.main-board {
  .wrapper {
    float: none;
    .wrapper-inner {
      .title {
        font-size: 1.6rem;
        font-weight: 600;
        p {
          margin-bottom: 10px;
        }
        .clockStatus {
          font-size: 16px;
          color: #f56c6c;
        }
      }
      .riskArea {
        text-align: left;
        font-size: 12px;
        color: #f56c6c;
        p {
          margin: 6px 0 !important;
        }
      }
      .el-form-item {
        margin-bottom: 16px;
      }
      .el-radio-group {
        width: 100%;
        text-align: left;
      }
      .el-checkbox-group {
        display: inline-block;
        width: 100%;
        text-align: left;
      }
      .el-select {
        width: 100%;
      }
      .el-cascader {
        width: 100%;
      }
    }
  }
}
</style>
