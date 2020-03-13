<template>
  <div class="thisFolder">
    <div class="tabn flex-space-between column-center">
      <div>
        <router-link to="code-case" class="title-back option mr-10">我的保险箱</router-link>/
        <span class="theme_font ml-10">我的文件夹</span>
      </div>
      <div>
        <!-- <span class="option ml-10 mr-20" @click="upload">上传文件</span> -->
        <!-- <span class="option ml-10">密码分类</span> -->
      </div>
    </div>
    <Divider class="myDivider" />
    <!-- 内容层 -->
    <div class="content">
      <!-- 搜索层 -->
      <div class="mb-10 flex-row">
        <div class="flex-start column-center">
          <span class="theme_font mr-20">搜索：</span>
          <span>
            <Input
              class="myInput"
              search
              v-model="selectName"
              placeholder="请输入文件名称进行搜索"
              @on-search="getFileList"
            ></Input>
          </span>
        </div>
      </div>
      <Divider class="myDivider" />
      <div>
        <div class="ml-20 mt-10">
          <UploadFile title="点击上传文件" :changeUrl.sync="fileUrl" @urlChange="changeUrl"></UploadFile>
        </div>
      </div>
      <Divider class="myDivider" />
      <div class="mt-20 ml-20">
        <div v-for="item in fileList" :key="item._id" class="every-file mr-20 mb-10">
          <div class="show-content">
            <div v-if="checkImage(item) " class=" show-file flex-all-center ">
              <img :src="item.fileUrl"  class="show-img" />
            </div>
            <div v-else class="show-file flex-all-center theme_border_0">
              <Icon size="100" type="md-paper" />
            </div>
          </div>
          <div class="name">{{item.name}}</div>
          <div class="type theme_font">{{item.name | showType}}</div>
          <div class="flex-space-between">
            <span class="option" @click="copy(item)">复制链接</span>
            <span  >
                <a class="option theme_font" :href="item.fileUrl" target="_blank" :download="item.name"  >下载</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { securityApi, commonApi } from "@/api";
import UploadFile from "_c/self-page/upload-file";
export default {
  name: "",
  components: {
    UploadFile
  },
  data() {
    return {
      selectName: "",
      fileList: [],
      fileUrl: ""
    };
  },
  mounted() {
    this.getFileList();
  },
  filters:{
      showType(val){
          let tel =val.split('.')
          return  tel.pop()
      }
  },
  computed: {},
  methods: {
    getFileList() {
      securityApi.getFileList().then(res => {
        this.fileList = res.result;
      });
    },
    changeUrl(p) {
      console.log(p);
      securityApi.addFile(p).then(res => {
        this.$Message.success("上传成功");
        this.getFileList();
      });
    },
    checkImage(item) {
      let image = new RegExp("image", "i");
      return image.test(item.type);
    },
    /**
     * @点击复制链接
     */
    copy(item){
        var oInput = document.createElement("input");
        oInput.value = item.fileUrl;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = "oInput";
        oInput.style.display = "none"
        this.$Message.success("复制成功")
       
    },
    /**
     * @点击下载文件
     */
    download(item){
    }
  }
};
</script>

<style lang="less" scoped>
.thisFolder {
  height: auto;
}
.myDivider {
  margin: 0;
}
.title-back {
  color: black;
}
.tabn {
  height: 50px;
  padding: 5px 20px;
  background: rgba(168, 204, 204, 0.13);
}
.content {
  padding: 10px;
}
.myInput {
  width: 200px;
}
.every-file {
 width:102px;
  display: inline-block;
}
.show-content{

}
.show-img {
  height: 100px;
  width: 100px;
  border-radius:12px;
}
.show-file {
  height: 100px;
  width: 100px;
  border-radius:12px !important;
}
.name{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.type{
    text-align:right;
}
</style>