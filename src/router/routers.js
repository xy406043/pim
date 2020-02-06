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
   * 首页 ===> 现在使用project作为首页
   * Main是作为主页单页面应用必备的整体组件，所有页面都在其router-view中显示
   * 但是要想正常显示，需要使路由如/project,/personpage的页面作为main的子路由，不然会跳转到新页面
   * 项目页面做以下配置
   * 新增项目   目前只做清单类项目   任务，计划时间安排都可以在同一个项目的结合。
   * 目前功能: 名称=>标签 任务=>子任务   日程=》提醒  事件记录
   * 文件 文档   评论 暂时先不做！
   * 讨论暂时做成可遮挡 的 内容提示
   * 
   * 部分
   * 需处理    事件记录    
   */
  {
    path: "/projectB",
    name: "_project",
    redirect: "project",
    component: Main,
    children: [
      {
        path: "project",
        name: "project",
        component: () => import("@/view/project-page/project.vue")
      },
      {
        path: "project-view",
        name: "project-view",
        component: () => import("@/view/project-page/project-view.vue")
      },
      {
        path: "project-set",
        name: "project-set",
        component: () => import("@/view/project-page/project-set.vue")
      },
      {
        path: "project-progress",
        name: "project-progress",
        component: () => import("@/view/project-page/project-progress.vue")
      },{
        path: "todo-detail",
        name: "todo-detail",
        component: () => import("@/view/project-page/todo/todo-detail.vue")
      },{
        path: "schedule",
        name: "schedule",
        meta:{
             title: "日程活动"
        },
        component: () => import("@/view/project-page/schedule/schedule.vue")
      },{
        path: "schedule-add-edit",
        name: "schedule-add-edit",
        meta:{
             title: "日程操作"
        },
        component: () => import("@/view/project-page/schedule/schedule-add-edit.vue")
      },
    ]
  },
  /**
   * 保险箱
   * 存放重要文件 
   * 兼容设置中密码锁
   * 密码本
   */
  {
    path: "/security-page",
    name: "security-page",
    component: Main,
    children: [
      {
        path: "code-case",
        name: "code-case",
        component: () => import("@/view/security-page/code-case.vue")
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
        path: "know",
        name: "know",
        component: () => import("@/view/knowledge-page/know.vue")
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
        path: "calendar",
        name: "calendar",
        component: () => import("@/view/time-page/calendar.vue")
      },
      {
        path: "plan",
        name: "plan",
        component: () => import("@/view/time-page/plan.vue")
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
        path: "person-setting",
        name: "person-setting",
        component: () => import("@/view/person-page/person-setting.vue")
      },
      {
        path: "person-detail",
        name: "person-detail",
        component: () => import("@/view/person-page/person-detail.vue")
      },
      {
        path: "notice",
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
    path: "/single-page",
    name: "single-page",
    component: Main,
    children: [
      {
        path: "about",
        name: "about",
        meta:{
          title:"通知"
        },
        component: () => import("@/view/single-page/about.vue")
      },
      {
        path: "dynamic",
        name: "dynamic",
        meta:{
          title:"动态"
        },
        component: () => import("@/view/single-page/dynamic.vue")
      },
       {
        path: "all-progress",
        name: "all-progress",
        meta:{
          title:"任务概览"
        },
        component: () => import("@/view/single-page/all-progress.vue")
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
