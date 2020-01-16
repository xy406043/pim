import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routers";
import store from "@/store";
import config from "@/config";
import ViewUI from "view-design";
const { homeName } = config;
import { setToken, getToken, canTurnTo } from "@/libs/utils";
Vue.use(VueRouter);
Vue.use(ViewUI);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
const LOGIN_PAGE_NAME = "login";

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next();
  // 有权限，可访问
  else next({ replace: true, name: "error_401" }); // 无权限，重定向到401页面
};
router.beforeEach((to, from, next) => {
  // console.log("from", from.name);
  // console.log("to", to.name);
  ViewUI.LoadingBar.start();
  const token = getToken();
  const homeName = config.homeName;
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    });
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next(); // 跳转
  } else if (token && (to.name === LOGIN_PAGE_NAME)) {
    // 已登录且要跳转的页面是登录页\
    next({
      name: homeName // 跳转到homeName页
    });
  }
  else {
    /**
     * 刷新界面会重置vuex的状态因此需要重新获取必备的vuex数据
     */
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next);
  
    } else {
      store
        .dispatch("getUserInfo")
        .then(res => {
           /**
            * . 或者 ['access']，不然会catch错误，把token置为空
            *  */
          turnTo(to, res.result.access, next);  
        })
        .catch(err => {
          console.log("token被清除")
          setToken("");
          next({
            name: LOGIN_PAGE_NAMEs
          });
        });
    }
  }
});

router.afterEach(to => {
  ViewUI.LoadingBar.finish();
  window.scrollTo(0, 0);
});
// beforeEach 路由权限配置
export default router;
