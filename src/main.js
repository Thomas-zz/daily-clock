import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios"
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
import commonApi from './common/common'
Vue.prototype.commonApi = commonApi;

let $axios = axios.create({
  timeout: 20000,
  maxContentLength: 1024 * 1024
})

axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

$axios.interceptors.request.use(config => {
  // 为请求头添加token字段为服务器端返回的token
  config.headers.token = localStorage.getItem("token");
  // 固定用法
  return config;
})

//在API文件中
$axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  var config = err.config;
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err);

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err);
  }

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, config.retryDelay || 1);
  });

  // Return the promise in which recalls axios to retry the request
  return backoff.then(function () {
    return axios(config);
  });
});

Vue.prototype['$axios'] = $axios;

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
