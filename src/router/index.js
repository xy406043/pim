import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routers";
import store from "@/store";
import config from "@/config";
import ViewUI from "view-design";
const { homeName } = config;
import { setToken, getToken, canTurnTo } from "@/libs/utils";
import { changeTheme } from "@/libs/theme";
Vue.use(VueRouter);
Vue.use(ViewUI);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
const LOGIN_PAGE_NAME = "login";
const pass = new RegExp("security-page");
const passhome = new RegExp("code-case");
const sCode = localStorage.getItem("sCode"); //是否输入过二级密码 true false
/**
 *
 * @param {*} to
 * @param {*} access
 * @param {*} next
 * 主要问题点：
 * @param {问题：token存在，但是刷新页面会存在token被清除以致回到登录页面的问题}
 */
const turnTo = (to, access, next) => {
  // debugger
  // console.log("canturnTo",canTurnTo(to.name, access, routes))
  if (canTurnTo(to.name, access, routes)) next();
  // 有权限，可访问
  else next({ replace: true, name: "error_401" }); // 无权限，重定向到401页面
};
router.beforeEach((to, from, next) => {
  // console.log("from", from);
  // console.log("to", to);
  // Vue.prototype.$vs.loading({type:'square'})
  // console.log("sas", pass.test(to.path), !passhome.test(to.path), !localStorage.getItem("sCode"));
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
  }
  // else if(token && pass.test(to.path) && !passhome.test(to.path) && sCode){
  /**
   * @存在token时就不要有这个了
   * @不然无法getUserInfo
   */
  //  //登录  输入过二级密码   可以进入保险箱子页面
  //  console.log("1")
  //   next()
  // }
  else if (token && pass.test(to.path) && !localStorage.getItem("sCode") && !passhome.test(to.path)) {
    // 登录   未输入过二级密码不可进入保险箱子页面
    next({ name: from.name });
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    });
  } else {
    /**
     * 刷新界面会重置vuex的状态因此需要重新获取必备的vuex数据
     */
    // console.log("3")
    if (store.state.user.hasGetInfo) {
      // console.log("1")
      turnTo(to, store.state.user.access, next);
    } else {
      // console.log("2")
      let theme = localStorage.getItem("colorTheme");
      changeTheme(theme);
      store
        .dispatch("getUserInfo")
        .then(res => {
          /**
           * . 或者 ['access']，不然会catch错误，把token置为空
           *  */
          turnTo(to, res.result.access, next);
        })
        .catch(err => {
          next({
            name: LOGIN_PAGE_NAME
          });
        });
    }
  }
});

router.afterEach(to => {
  ViewUI.LoadingBar.finish();
  // Vue.prototype.$vs.loading({type:'square'}).close()
  window.scrollTo(0, 0);
});
// beforeEach 路由权限配置
export default router;

// gaskal
