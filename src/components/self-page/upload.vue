<template>
  <div>
      <Upload
        :action="uploadUrl"
        :accept="acceptType"
        :format="format"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-error="handleError"
        :show-upload-list="false"
        :data="uploadParams"
      >
        <div class="option theme_font font-16 font-bolder">{{title}}</div>
      </Upload>
      <!-- <img class="uploadImg"  :src="changeUrl" alt /> -->
  </div>
</template>

<script>
/**
 * 图片上传组件
 */
import { commonApi } from "@/api";
export default {
  name: "upload",
  props: {
    changeUrl: String,
    originUrl:String,
    title: { type: String, default: "选择上传图片" }
  },
  data() {
    return {
      uploadUrl: "http://upload.qiniu.com",
      acceptType: ".png, .jpeg, .jpg, .gif, .bmp",
      format: ["png", "jpg", "jpeg", "gif", "bmp"],
      uploadParams: {
        key: "",
        token: ""
      }
    };
  },
  mounted() {},
  methods: {
    getToken() {
      commonApi.getQiniuToken().then(res => {
        this.uploadParams.key = res.result.name;
        this.uploadParams.token = res.result.token;
      });
    },
    async beforeUpload(file) {
        this.type=file.type
        this.size=file.size
        this.name=file.name
        let p ={
            name:file.name
        }
        await commonApi.getQiniuToken(p).then(res => {
          this.uploadParams.key = res.result.name;
          this.uploadParams.token = res.result.token;
        });
    },
    handleSuccess(res, file, fileList) {
      const changeUrl = "http://xynagisa.xyz/" + res.key;
      this.$emit("update:changeUrl", changeUrl);
      let  p={
          fileUrl:changeUrl,
          name:this.name,
          type:this.type,
          size:this.size
      }
      this.$emit("urlChange",changeUrl)
      this.uploadParams = {
        key: "",
        token: ""
      };
    },
    handleError(err, file, fileList) {
      if (err) {
        this.$Message.error("异步错误，重新尝试即可！！");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.uploadImg {
  height: 100px;
  width: 100px;
  border: 0;
}
</style>