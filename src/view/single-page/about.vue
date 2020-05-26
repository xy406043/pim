<template>
  <div class="show_detail">
    <div class="column-center thisTitle flex-row">
      <!-- 顶部 -->
      <div class="flex-all-center">
        <div class="title flex-all-center">关于</div>
      </div>
    </div>
    <Divider />
    <!-- 关于 -->
    <div class="about-content">
      <div class="about-title theme_font">修改记录</div>
      <div class="show-content">
        <br /> 2020-05-26   预性能优化，优化体验
        <br /> 2020-04-23   博客管理后台
        <br /> 2020-03-31   第一次部署上线
        <br />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @此文件位于右上角
 * @标明对于此项目的一些介绍以及相关的其它信息
 * 使用方面的解释
 */
export default {
  name: "",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.show_detail {
  .ivu-divider {
    margin: 0;
  }
}
.thisTitle {
  height: 50px;
  padding: 5px 20px;
  background: rgba(168, 204, 204, 0.13);
}
.title {
  font-size: 26px;
  font-weight: bolder;
  text-align: center;
}
.about-content {
  padding: 16px 24px;
}
.about-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
.show-content {
  // text-indent: 25px;
  padding: 0 24px;
  font-weight: bold;
  font-kerning: unset;
  font-size: 18px;
}
.main-about {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 0 24px;
  text-indent: 40px;
  font-size: 20px;
  font-weight: bolder;
}
</style>