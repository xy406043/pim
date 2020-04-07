<template>
  <div class="outer" id="outer" :style="{backgroundImage: 'url('+url+')'}" @scroll="scrollWindow">
    <!-- header -->
    <header class="header flex-between">
      <div>
        <home></home>
      </div>
      <div>
        <MiddleNav></MiddleNav>
      </div>
      <!-- 这里设置flex为一是为了使搜索框变长是不挤压左边的区域
      此处应该还有更好的解决办法-->
      <span class="flex-end" style="flex: 1">
        <Data></Data>
        <FullScreen></FullScreen>
        <Setting ref="notice" :Avatar="avatar" :email="email" :nickName="nickName"></Setting>
      </span>
    </header>
    <div style="height:20px"></div>
    <div v-if="checkIs" class="long_router">
      <div>
        <router-view />
      </div>
    </div>
    <div v-else class="short_router" style="position:relative">
      <!-- 预览 -->
      <!-- <div v-if="parentPath==='/knowledge-page'" class="left-catalogue flex-column">
        <span :class="['option',localPath==='note'?'focus':'']" @click="toNote">日记</span>
        <span :class="['option',localPath==='address-book'?'focus':'']" @click="toAddress">通讯录</span>
        <span :class="['option',localPath==='bookmarking'?'focus':'']" @click="toBookMark">网址收藏</span>
      </div>-->
      <!-- 路由渲染 -->
      <div>
        <router-view />
      </div>
    </div>
    <!-- <div class="back" v-show="localPath!=='home'">
      <Button type="primary" @click="backToLastRouter">返回</Button>
    </div>-->
    <!-- ScrollTop -->
    <div class="my-scrolltop" v-show="scrollTopShow" @click="scrollTop">
      <img class="scrollimg" src="http://xynagisa.xyz/上.png" />
    </div>
    <audio controls="controls" hidden src="../../assets/2.mp3" ref="audio"></audio>
    <footer style="height:100px" class="footerT">苏ICP备20011251号-1</footer>
  </div>
</template>
 
<script>
import FullScreen from "./components/full-screen/full-screen";
import home from "./components/home/home";
import MiddleNav from "./components/middle-nav/nav";
import Setting from "./components/setting/setting";
import Data from "./components/data/data";
import { localRead } from "@/libs/utils";
import "./main.less";
import "../../../public/common.less";
import { commonApi } from "@/api";
import Cookies from "js-cookie";
/**
 * @小人所在的static需要与html同级
 * @不知为什么我这里必须引入
 */
import "../../../public/static/live2dw/lib/L2Dwidget.0.min.js";
export default {
  /**
   * mixin混入
   * 公共方法的Vue，较少方法组件复用
   */
  name: "",
  components: {
    FullScreen,
    home,
    Data,
    Setting,
    MiddleNav
  },
  data() {
    return {
      //行内图片不好用相对地址
      avatar: localStorage.getItem("avatar"),
      email: localStorage.getItem("email"),
      nickName: "",
      url: "",
      parentPath: "",
      localPath: "",
      scrollTopShow: false,
      screenHeight: 0,
      whiteList: ["test", "note-view", "note-add", "todo-detail"],
      checkIs: false
    };
  },
  beforeRouteEnter(to, from, next) {
    /**
     * @父级路由不一致时使用
     * @description 此函数内使用vm 代替this
     */
    next(vm => {
      // console.log("next", to.name);
      vm.localPath = to.name;
      let flag = false;
      // console.log("1", to.name);
      vm.whiteList.map(item => {
        // console.log("2", item, item === to.name);
        if (item === to.name) {
          flag = true;
        }
      });
      vm.checkIs = flag;
      // console.log("to", vm.localPath, vm.checkIs);
      vm.parentPath = to.matched[0].path;
    });
  },
  beforeRouteUpdate(to, from, next) {
    /**
     * @父级路由一致时使用
     * @description 此函数内使用vm 代替this
     */

    this.localPath = to.name;
    let flag = false;
    // console.log("1", to.name);
    this.whiteList.map(item => {
      // console.log("2", item, item === to.name);
      if (item === to.name) {
        flag = true;
      }
    });
    this.checkIs = flag;
    // console.log("to", this.localPath, this.checkIs);
    next();
  },
  created() {
    // const that = this;
    // window.onresize = val => {
    //   console.log("基本",val);
    //   return (() => {
    //     console.log("屏幕高度", window.screenHeight);
    //     window.screenHeight = document.body.clientHeight;
    //     that.screenHeight = window.screenHeight;
    //   })();
    // };
    window.addEventListener("scroll", this.scrollWindow);
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: "../../../static/live2dw/",
        pluginJsPath: "lib/",
        pluginModelPath: "live2d-widget-model-koharu/assets/",
        tagMode: false,
        debug: false,
        model: {
          jsonPath:
            "../../../static/live2dw/live2d-widget-model-koharu/assets/koharu.model.json"
        },
        display: { position: "left", width: 150, height: 300 },
        mobile: { show: true },
        log: false
      });
    }, 1000);
  },
  mounted() {
    // 滚动事件
    // this.$vs.loading({type:'square'})
    let color = localRead("colorTheme") || "#0066ff";
    this.nickName = this.$store.state.user.nickName;
    this.url = localRead("backgroundUrl");
    this.parentPath = this.$route.matched[0].path;
    // console.log("当前路由",this.$route.path)
    // console.log("父路由", this.$route.matched[0].path);
    this.judgeNotification();
    this.getRealNotice();
    // this.monitor();
    /**
    * @setInterval不会清除定时器
    @不断使用会使页面卡死
    @但是setTimeout自带清除定时器
    @或者通过socket连接
     */
    let token = Cookies.get("PimToken");
    this.sendMessage(token);
    // window.setInterval(() => {
    //   setTimeout(() => {}, 0);
    // }, 10000);
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
    getNotice(data) {
      /**
       * @socket获取通知将之进行浏览器通知
       */
      // this.message.splice(this.message,0,data)
      if (data === 0) {
        setTimeout(() => {
          let token = Cookies.get("PimToken");
          this.sendMessage(token);
        }, 3000);
      } else {
        let msg = data.content;
        this.monitor(msg);
        setTimeout(() => {
          let token = Cookies.get("PimToken");
          this.sendMessage(token);
        }, 3000);
      }
    },
    getTodoNotice(data) {
      // console.log("任务接受",data)
      if (data === 0) {
        setTimeout(() => {
          let token = Cookies.get("PimToken");
          this.sendTodoNotice(token);
        }, 3000);
      } else {
        let msg = data.content;
        this.monitor(msg);
        setTimeout(() => {
          let token = Cookies.get("PimToken");
          this.sendTodoNotice(token);
        }, 3000);
      }
    }
  },
  methods: {
    scrollTop(e) {
      //无过渡
      // document.getElementById("outer").scrollTop=0
      //有过渡效果
      let timer = setInterval(() => {
        let osTop = document.getElementById("outer").scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.getElementById("outer").scrollTop = osTop + ispeed;
        if (osTop <= 0) {
          clearInterval(timer);
        }
      }, 30);
    },
    scrollWindow(e) {
      let top = e.srcElement.scrollTop;
      // console.log("当前", top, top / 11);
      if (top / 11 > 22) {
        this.scrollTopShow = true;
      } else {
        this.scrollTopShow = false;
      }
    },
    sendMessage(val) {
      this.$socket.emit("scheduleNotice", { value: val });
    },
    sendTodoNotice(val) {
      this.$socket.emit("notice", { value: val });
    },
    judgeNotification() {
      if (window.Notification) {
        /**
         * @判断浏览器是否支持WindowsH5通知功能
         *  */
        if (Notification.permission === "granted") {
          /**
           * @判断浏览器是否已经开启通知
           */
        } else {
          /**
           * @设置允许通知
           */
          Notification.requestPermission();
        }
      } else {
        console.log("不支持");
      }
    },
    monitor(msg) {
      /**
       * @轮询监控任务日程一旦达到发起通知
       * @一方面是站内Badge通知
       * @一方面是浏览器通知
       */
      // commonApi.getNotice().then(res=>{

      // })
      //获取消息通知放置于消息列中
      this.getRealNotice();

      this.$refs.audio.currentTime = 0; //从头开始播放提示音
      this.$refs.audio.play(); //播放
      let notify = new Notification("新消息通知！", {
        body: msg,
        lang: "zh-CN"
      });
      notify.onshow = function() {
        console.log("通知显示!");
      };
      notify.onclick = function() {
        console.log("windows弹窗点击通知");
        window.focus();
        // window.location.href = "https://www.baidu.com/";
        notify.close();
      };
      notify.onerror = function() {
        console.log("通知错误!");
        // 手动关闭
        notify.close();
      };
      notify.onclose = function() {
        console.log("通知关闭");
      };
    },
    getRealNotice() {
      //让setting组件内获取
      /**
       * @父组件调用子组件中的方法
       */
      this.$refs.notice.getNotice();
    },
    toNote() {
      this.$router.push({ name: "note" });
    },
    toBookMark() {
      this.$router.push({ name: "bookmarking" });
    },
    toBill() {
      this.$router.push({ name: "bill" });
    },
    toAddress() {
      this.$router.push({ name: "address-book" });
    },
    toLabel() {
      this.$router.push({ name: "label" });
    },
    backToLastRouter() {
      this.$router.go(-1);
    }
  }
};
</script>


<style lang="less" scoped>
.header {
  // z-index: 10;
  // background:seagreen;
}

.outer {
  overflow-y: scroll;
  position: relative;
}
.snipper {
  position: absolute;
  // translate:(-50%,-50%);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-catalogue {
  position: absolute;
  top: 0;
  left: -100px;
  background: #ffffff;
  border: 1px solid #000000;
  width: 96px;
  padding: 10px;
  border-radius: 10px;
}
.focus {
  color: #ffffff;
  background-color: #10abe9;
  border: 2px solid rgb(0, 0, 0, 0.48);
}
.footerT {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  animation: changeshadow 1s ease-in infinite;
}
@keyframes changeshadow {
  0% {
    text-shadow: 0 0 4px rgb(255, 5, 255);
    color: white;
  }
  50% {
    text-shadow: 0 0 40px rgb(0, 132, 255);
    color: rgb(255, 0, 0);
  }
  75% {
    text-shadow: 0 0 40px rgb(65, 253, 8);
    color: rgb(21, 4, 247);
  }
  100% {
    text-shadow: 0 0 4px red;
    color: white;
  }
}
// 向上

.my-scrolltop {
  position: fixed;
  bottom: 100px;
  right: 100px;
  z-index: 999999;
}
.scrollimg {
  height: 60px;
  width: 60px;
  cursor: pointer;
}
.back {
  position: fixed;
  top: 120px;
  left: 10px;
}
</style>
