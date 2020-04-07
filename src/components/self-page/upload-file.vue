<template>
  <div>
    <Upload
      :action="uploadUrl"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :data="uploadParams"
    >
      <vs-button border color="rgb(59,222,200)" class="font-bolder" block>{{title}}</vs-button>
    </Upload>
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
    originUrl: String,
    title: { type: String, default: "选择上传图片" }
  },
  data() {
    return {
      uploadUrl: "http://upload.qiniu.com",
      acceptType: ".png, .jpeg, .jpg, .gif, .bmp",
      format: ["png", "jpg", "jpeg", "gif", "bmp"],
      type: "",
      size: "",
      name: "",
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
      console.log(file);
      this.type = file.type;
      this.size = file.size;
      this.name = file.name;
      let p = {
        name: file.name
      };
      await commonApi.getQiniuToken(p).then(res => {
        this.uploadParams.key = res.result.name;
        this.uploadParams.token = res.result.token;
      });
    },
    handleSuccess(res, file, fileList) {
      const changeUrl = "http://xynagisa.xyz/" + res.key;
      console.log(changeUrl);
      this.$emit("update:changeUrl", changeUrl);
      let p = {
        fileUrl: changeUrl,
        name: this.name,
        type: this.type,
        size: this.size
      };
      this.$Message.success("上传成功");
      this.$emit("urlChange", p);
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