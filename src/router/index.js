import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/",
    name: "DailyClock",
    component: () => import("../views/DailyClock.vue"),
  },
  {
    path: "/backStage",
    name: "BackStage",
    component: () => import("../views/BackStage.vue"),
    children: [
      {
        path: "addAdmin",
        name: "AddAdmin",
        component: () => import("../components/AddAdmin.vue")
      },
      {
        path: "dailyInfo",
        name: "DailyInfo",
        component: () => import("../components/DailyInfo.vue")
      },
      {
        path: "enterUser",
        name: "EnterUser",
        component: () => import("../components/EnterUser.vue")
      },
      {
        path: "exportData",
        name: "ExportData",
        component: () => import("../components/ExportData.vue")
      }
    ]
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
