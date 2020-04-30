
<template>
  <div>
    <div class="title-L column-center">
      <span class="ml-20 theme_font">我的记事库</span>
    </div>
    <Divider style="margin:0;background:#000000" />
    <div class="allContent">
        <!-- <Poptip trigger="hover" content="暂不支持" placement="left">
      <div class="password mr-20 mb-20 option-disabled">
        <div>
          <img class="every-image" src="../../assets/images/customize.png" />
        </div>
        <div class="code-font mt-10">自定义</div>
      </div>
      </Poptip> -->
      <div class="password mr-20 mb-20 option" @click="toNote">
        <div>
          <img class="every-image" src="../../assets/images/diary.png" />
          <!-- <Icon size="80" class="code-border" type="md-book" /> -->
        </div>
        <div class="code-font mt-10 font-bolder">日记本</div>
      </div>
        <div class="password mr-20 mb-20 option" @click="toBlog">
        <div>
          <img class="every-image" src="../../assets/images/blog.png" />
          <!-- <Icon size="80" class="code-border" type="md-book" /> -->
        </div>
        <div class="code-font mt-10 font-bolder">博客管理</div>
      </div>
      <div class="password mr-20 mb-20 option" @click="toAddress">
        <div>
          <!-- <Icon size="80" class="code-border" type="md-people" /> -->
          <img class="every-image" src="../../assets/images/address.png" />
        </div>
        <div class="code-font mt-10 font-bolder">通讯录</div>
      </div>
      <div class="password mr-20 mb-20 option" @click="toBookMarking">
        <div>
          <!-- <Icon size="80" class="code-border" type="md-bookmarks" /> -->
          <img class="every-image" src="../../assets/images/bookmark.png" />
        </div>
        <div class="code-font mt-10 font-bolder">网址收藏</div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @记事库
 * @包含网址收藏日记联系人等
 *
 */
import { securityApi } from "@/api";
import Crypto from "@/libs/crypto";
export default {
  name: "",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toNote() {
      this.$router.push({ name: "note" });
    },
    toBlog(){
          this.$router.push({name:"blog"})
    },
    toAddress() {
      this.$router.push({ name: "address-book" });
    },
    toBookMarking() {
      this.$router.push({ name: "bookmarking" });
    }
  }
};
</script>

<style lang="less" scoped>
//这里不能使用 关键词 作为类名   其样式固定  会产生异样效果
.title-L {
  padding: 12px;
  align-items: center;
  font-weight: bolder;
  justify-content: center;
  font-size: 26px;
}
.allContent {
  padding: 20px;
}
.code-border {
  border: 3px solid gray;
  border-radius: 12px;
}
.password {
  display: inline-block;
}
.code-font {
  text-align: center;
}
.every-image {
  height: 80px;
  width: 80px;
}
</style>