import Main from "@/components/main/main.vue";
/**
 * @description children 只有一个，会忽略掉父路由
 */
export default [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Login-登录"
    },
    component: () => import("@/view/login-page/login.vue")
  },
  // {
  //   path: "/register",
  //   name: "register",
  //   meta: {
  //     title: "注册"
  //   },
  //   component: () => import("@/view/login-page/register.vue")
  // },
  // {
  //   path: "/reset",
  //   name: "reset",
  //   meta: {
  //     title: "重置密码"
  //   },
  //   component: () => import("@/view/login-page/reset.vue")
  // },
  {
    path:"/",
    name:"_home",
    component:Main,
    redirect:"home",
    children:[
      {
        path:"home",
        name:"home",
        meta:{
          title:"主页"
        },
        component: () =>import("@/view/home-page/home.vue")
      }
    ]
  },
  /**
   * 
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
      },
      {
        path: "project-screen",
        name: "project-screen",
        component: () => import("@/view/project-page/project-screen.vue")
      },
      {
        path: "todo-detail",
        name: "todo-detail",
        component: () => import("@/view/project-page/todo/todo-detail.vue")
      },{
        path:"list-detail",
        name:"list-detail",
        component: () => import("@/view/project-page/todo/list-detail")
      },
      {
        path:"list-set",
        name:"list-set",
        component: ()=>import("@/view/project-page/todo/list-set")
      },
      {
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
   * @保险箱
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
      },
      {
        path: "code-book",
        name: "code-book",
        component: () => import("@/view/security-page/code-book.vue")
      },
      {
        path: "folder",
        name: "folder",
        component: () => import("@/view/security-page/folder.vue")
      },
      {
        path: "photo",
        name: "photo",
        component: () => import("@/view/security-page/photo.vue")
      }
    ]
  },
  /**
   * @知识页面
   * @description 包含日记，知识库，文件等
   * 目前划分为具体的不做为细分
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
      },
      {
        path: "note",
        name: "note",
        component: () => import("@/view/knowledge-page/note.vue")
      },
      {
        path: "note-add",
        name: "note-add",
        component: () => import("@/view/knowledge-page/note-add.vue")
      },
      {
        path: "note-view",
        name: "note-view",
        component: () => import("@/view/knowledge-page/note-view.vue")
      },
      {
        path:"label",
        name:"label",
        component:() => import ("@/view/knowledge-page/label")
      },
      {
        path:"bookmarking",
        name:"bookmarking",
        component:() => import ("@/view/knowledge-page/bookmarking")
      },
      {
        path:"bill",
        name:"bill",
        component:() => import ("@/view/knowledge-page/bill")
      },
      {
        path:"address-book",
        name:"address-book",
        component:() => import ("@/view/knowledge-page/address-book")
      }
    ]
  },
  /**
   * @时间
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
   * @个人页面
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
      }
    ]
  },
  /**
   * @单页面
   * @通用页面
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
      },
      {
        path: "add-second",
        name: "add-second",
        component: () => import("@/view/security-page/add-second.vue")
      },
      {
        path: "search",
        name: "search",
        component: () => import("@/view/single-page/search.vue")
      },
      {
        path: "notice",
        name: "notice",
        component: () => import("@/view/single-page/notice.vue")
      },
      {
        path: "test",
        name: "test",
        component: () => import("@/view/single-page/test.vue")
      },
      {
        path: "group-set",
        name: "group-set",
        component: () => import("@/view/single-page/group-set.vue")
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
