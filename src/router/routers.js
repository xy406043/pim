import Main from "@/components/main/main.vue";

export default [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Login-登录"
    },
    component: () => import("@/view/login-page/login.vue")
  },
  /**
   * 首页
   * Main是作为主页单页面应用必备的整体组件，所有页面都在其router-view中显示
   * 但是要想正常显示，需要使路由如/home,/personpage的页面作为main的子路由，不然会跳转到新页面
   */
  {
    path: "/",
    name: "_home",
    redirect: "/home",
    component: Main,
    children: [
      {
        path: "/home",
        name: "home",

        component: () => import("@/view/home-page/home.vue")
      }
    ]
  },
  /**
   * 知识页面
   * 包含日记，知识库，文件等
   */
  {
    path: "/knowledge-page",
    name: "knowledge-page",
    component: Main,
    children: [
      {
        path: "/note",
        name: "note",
        component: () => import("@/view/knowledge-page/note.vue")
      }
    ]
  },
  /**
   * 时间
   * 包含日历，计划，进度等与时间息息相关的页面
   */
  {
    path: "/time-page",
    name: "time-page",
    component: Main,
    children: [
      {
        path: "/calendar",
        name: "calendar",
        component: () => import("@/view/time-page/calendar.vue")
      },
      {
        path: "/plan",
        name: "plan",
        component: () => import("@/view/time-page/plan.vue")
      },
      {
        path: "/schedule",
        name: "schedule",
        component: () => import("@/view/time-page/schedule.vue")
      }
    ]
  },
  /**
   * 个人页面
   * 包含详情，设置，通知等
   */
  {
    path: "/person-page",
    name: "person-page",
    component: Main,
    children: [
      {
        path: "/person-setting",
        name: "person-setting",
        component: () => import("@/view/person-page/person-setting.vue")
      },
      {
        path: "/person-detail",
        name: "person-detail",
        component: () => import("@/view/person-page/person-detail.vue")
      },
      {
        path: "/notice",
        name: "notice",
        component: () => import("@/view/person-page/notice.vue")
      }
    ]
  },
  /**
   * 单页面
   * 指与主体功能没有什么关系的页面
   */
  {
    path: "single-page",
    name: "single-page",
    component: Main,
    children: [
      {
        path: "/about",
        name: "about",
        component: () => import("@/view/single-page/about.vue")
      }
    ]
  },
  ,
  /**
   * 以下为错误控制页面，利于SEO，利于用户浏览
   */ {
    path: "/401",
    name: "error_401",
    meta: {
      hideInMenu: true
    },
    component: () => import("@/view/error-page/401.vue")
  },
  {
    path: "/500",
    name: "error_500",
    meta: {
      hideInMenu: true
    },
    component: () => import("@/view/error-page/500.vue")
  },
  {
    path: "*",
    name: "error_404",
    meta: {
      hideInMenu: true
    },
    component: () => import("@/view/error-page/404.vue")
  }
];
