<template>
  <div class="outer" :style="{backgroundImage: 'url('+url+')'}">
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
        <Setting :Avatar="avatar"></Setting>
      </span>
    </header>
    <div style="height:20px"></div>

    <div class="short_router this_show" style="position:relative">
      <!-- 预览 -->
      <!-- <div v-if="parentPath==='/knowledge-page'" class="left-catalogue flex-column">
        <span :class="['option',localPath==='note'?'focus':'']" @click="toNote">日记</span>
        <span :class="['option',localPath==='address-book'?'focus':'']" @click="toAddress">通讯录</span>
        <span :class="['option',localPath==='bookmarking'?'focus':'']" @click="toBookMark">网址收藏</span>
      </div> -->
      <!-- 路由渲染 -->
      <div>
        <router-view />
      </div>
    </div>
    <!-- <div class="back" v-show="localPath!=='home'">
      <Button type="primary" @click="backToLastRouter">返回</Button>
    </div> -->
    <footer style="height:100px" class="footerT">
      苏ICP备20011251号-1
    </footer>
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
      url: "",
      parentPath: "",
      localPath: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    /**
     * @父级路由不一致时使用
     * @description 此函数内使用vm 代替this
     */
    next(vm => {
      console.log("next", to.name);
      vm.localPath = to.name;
      vm.parentPath = to.matched[0].path;
    });
  },
  beforeRouteUpdate(to, from, next) {
    /**
     * @父级路由一致时使用
     * @description 此函数内使用vm 代替this
     */
  
    this.localPath = to.name;
       console.log("to", this.localPath);
    next();
  },
  mounted() {
    let color = localRead("colorTheme") || "#0066ff";
    this.url = localRead("backgroundUrl");
    this.parentPath = this.$route.matched[0].path;
    // console.log("当前路由",this.$route.path)
    console.log("父路由", this.$route.matched[0].path);
  },
  methods: {
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
    backToLastRouter(){
          this.$router.go(-1)
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
}
.this_show {

  margin: 0 auto;
  width: 962px;
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
  border: 2px solid rgb(0, 0, 0,.48);
}
.footerT{
  font-size:20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color:#ffffff;

}
.back{
  position:fixed;
  top:120px;
  left:10px;

}
</style>
