<template>
  <div class="outer" :style="{backgroundImage: 'url('+url+')'}">
    <!-- header -->
    <div class="header flex-between">
      <span>
        <Unknown></Unknown>
      </span>
      <span style="margin-left:360px">
        <MiddleNav></MiddleNav>
      </span>
      <!-- 这里设置flex为一是为了使搜索框变长是不挤压左边的区域
      此处应该还有更好的解决办法-->
      <span class="flex-end" style="flex: 1">
        <Data></Data>
        <FullScreen></FullScreen>
        <Setting :Avatar="avatar"></Setting>
      </span>
    </div>
    <router-view />
  </div>
</template>
 
<script>
import FullScreen from "./components/full-screen/full-screen";
import Unknown from "./components/Unknown/Unknown";
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
    Unknown,
    Data,
    Setting,
    MiddleNav
  },
  data() {
    return {
      //行内图片不好用相对地址
      avatar: this.$store.state.user.avatar,
      url: ""
    };
  },
  mounted() {
    let color = localRead("colorTheme") || "#0066ff";
    this.url = localRead("backgroundUrl");
  },
  methods: {

  }
};
</script>


<style lang="less" scoped>
.header {
  z-index: 99999;
}

</style>
