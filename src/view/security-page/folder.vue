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
        <div class=" column-center ml-20">
              <span class="theme_font mr-20">排序方式:</span>
              <span>
                  <Select v-model="sortBy" @on-change="getFileList">
                    <Option :value="0">上传时间</Option>
                    <Option :value="1">文件类型</Option>
                    <Option :value="2">文件大小</Option>
                  </Select>
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
            <div v-if="checkType(item)===1 " class="show-file flex-all-center">
              <img :src="item.fileUrl" class="show-image" />
              <div class="image-show flex-all-center">
                <div @click="showImage(item.fileUrl)">
                  <Icon class="show-p" size="30" type="ios-eye" />
                </div>
              </div>
            </div>
            <div v-else-if="checkType(item)===2" class="show-file flex-all-center ">
              <img src="../../assets/images/pdf.png" class="show-img" />
            </div>
            <div v-else-if="checkType(item)===3" class="show-file flex-all-center ">
              <img src="../../assets/images/rarfile.png" class="show-img" />
            </div>
            <div v-else class="show-file flex-all-center ">
              <!-- <Icon size="100" type="md-paper" /> -->
              <img src="../../assets/images/file.png" class="show-img" />
            </div>
          </div>
          <div class="name">{{item.name}}</div>
          <div class=" theme_font flex-space-between"><span>{{item.size | showSize}}</span><span>{{item.name | showType}}</span></div>
          <div class="flex-space-between">
            <span class="option" @click="copy(item)">链接</span>
            <span>
              <a
                class="option theme_font"
                :href="item.fileUrl"
                target="_blank"
                :download="item.name"
              >下载</a>
            </span>
            <span class="option-delete" @click="deleteThisFile(item._id)">删除</span>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="imageShow" :styles="{padding:'0'}" fullscreen footer-hide>
       <div class="flex-all-center " style="height:100%">
      <img class="modal-img" :src="modalImg" />
      </div>
    </Modal>
  </div>
</template>

<script>
import { securityApi, commonApi,projectApi } from "@/api";
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
      fileUrl: "",
      imageShow: false,
      modalImg: "",
      sortBy:0
    };
  },
  mounted() {
    this.getFileList();
  },
  filters: {
    showType(val) {
      let tel = val.split(".");
      return tel.pop();
    },
        showSize(val){
       let a = (val/1024)/1024
       if(a>=1){
         return a.toFixed(2)+"MB"
       }else{
         return (a*1024).toFixed(2) + "KB"
       }
    },
  },
  computed: {},
  methods: {
    getFileList() {
      let p={
        sortBy: this.sortBy
      }
      securityApi.getFileList(p).then(res => {
        this.fileList = res.result;
      });
    },
    changeUrl(p) {
      securityApi.addFile(p).then(res => {
        this.getFileList();
      });
    },
    checkType(item) {
      /**
       * @分析存储的文件类型
       * @放置展示图
       */
      let image1 = new RegExp("image", "i");
      let image2 = new RegExp("png|jpeg|cur|jpg");
      let rar = new RegExp("rar|zip|gzip|ra", "i");
      let pdf = new RegExp("pdf", "i");

      if (image1.test(item.type) || image2.test(item.name)) {
        return 1;
      }
      if (pdf.test(item.type)) {
        return 2;
      }
      if (rar.test(item.name)) {
        return 3;
      }
      // gzip.map(el => {
      //   nameList.forEach(v => {
      //     if (v === el) {
      //       console.log("3");
      //       return 3;
      //     }
      //   });
      // });

      return false;
    },
    /**
     * @点击复制链接
     */
    copy(item) {
      var oInput = document.createElement("input");
      oInput.value = item.fileUrl;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.$Message.success("复制成功");
    },
    /**
     * @点击下载文件
     */
    download(item) {},
    showImage(url) {
      this.modalImg = url;
      this.imageShow = true;
    },
        deleteThisFile(id){
      this.$Modal.confirm({
        title: "删除",
        content: "确定要删除此文件？",
        onOk: () => {
          projectApi.deleteFile(id).then(res => {
            if (res.code === 0) {
              this.$Message.success("删除成功");
              this.getFileList()
            } else {
              this.$Message.error(res.errorMsg);
            }
          });
        },
        onCancel: () => {}
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ivu-modal-body {
  padding: 0 !important;
}
.thisFolder {
  height: auto;
  .ivu-modal-body {
    padding: 0 !important;
  }
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
  width: 102px;
  margin: 0 8px;
  display: inline-block;
}
.show-content {
  // margin: 0 16px;
}
.show-img {
  height: 100px;
  width: 100px;
  border-radius: 12px;
}
.show-image {
  height: 100px;
  width: 100px;
  border-radius: 12px;
}
.show-file {
  position: relative;
}
.image-show {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: none;
}
.show-file:hover .image-show {
  display: flex;
  background: gray;
  border-radius:12px;
  opacity: 0.6;
  color: white;
}
.show-p {
  cursor: pointer;
}
.show-file {
  height: 100px;
  width: 100px;
  border-radius: 12px !important;
}
.name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.type {
  text-align: right;
}
</style>