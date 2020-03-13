<template>
  <div class="setting">
    <!-- 头像信息栏目 -->
    <div class="flex-start">
      <div class="flex-row">
        <span class="title">
          <img class="img" :src="avatar" changeT="切换图片" alt="头像" />
          <!-- <div class="img-show">切换图片</div> -->
        </span>
        <span class="flex-column flex-space-between font-title">
          <!-- <b class="theme_font option">选择新头像</b> -->
          <UploadImage :changeUrl.sync="avatar" title="选择新头像" @urlChange="changeAvatar"></UploadImage>
          <span>可以选择png/jpeg图片作为头像</span>
        </span>
      </div>
    </div>
    <Divider></Divider>
    <!-- 样式设置 -->
    <div style="margin:16px 0">
      <div class="mb-10 column-center">
        <span class="min-width">改变主题色:</span>
        <span>
          <!-- 主题色选择 -->
          <div class="every-color" v-for="item in themeList" :key="item.title">
            <div
              class="option every-color-child"
              @click="changeV(item.title)"
              :style="'background:'+item.color"
            ></div>
          </div>
        </span>
      </div>
      <div class="mb-10 column-center">
        <span class="min-width">改变背景图:</span>
        <span class="mr-20">
          <!-- 主题色选择 -->
          <img class="back" :src="backgroundUrl" alt="背景图片" />
        </span>
        <!-- <span class="theme_font option ml-20">更换背景图片</span> -->
        <UploadImage  :changeUrl.sync="backgroundUrl" title="更换背景图片" @urlChange="changeBackgroundUrl"></UploadImage>
        
      </div>
    </div>
    <Divider />
    <!-- 具体内容设置 -->
    <div style="margin:16px 0">
      <div class="flex-start column-center mb-10">
        <span class="min-width">昵称:</span>
        <span class="form-width">
          <Input v-model="nickName" placeholder="输入昵称"></Input>
        </span>
      </div>
      <div class="flex-start column-center mb-10">
        <span class="min-width">邮箱:</span>
        <span class="form-width">
          <Input v-model="email" placeholder="输入邮箱" disabled></Input>
        </span>
      </div>
      <div class="theme_font option font-12" style="margin-left:85px">修改邮箱</div>
      <div class="flex-start column-center mb-10">
        <span class="min-width">密码:</span>
        <span class="theme_font option font-12">修改密码</span>
      </div>
      <div class="flex-start column-center mb-10">
        <span class="min-width">手机:</span>
        <span class="theme_hover showB">已绑定:{{phone}}</span>
        <span v-if="phone!==0" class="theme_font option font-12">更换手机号</span>
        <span v-else class="theme_font option font-12">绑定手机号</span>
      </div>
      <!-- <div class="flex-start column-center mb-10">
        <span class="min-width">通知设置:</span>
      </div>-->
    </div>
    <!-- 保存内容 -->
    <div class="button-setting">
      <Button class="set-button" type="primary" @click="editUserInfo">保存</Button>
    </div>
  </div>
</template>

<script>
/**
 * @description 个人设置页面
 */
import { userApi } from "@/api";
import { changeTheme } from "@/libs/theme";
import UploadImage from "_c/self-page/upload"
import color from "./color";
export default {
  name: "",
  components:{
    UploadImage
  },
  inject: ["reload"],
  data() {
    return {
      avatar: "",
      nickName: "",
      email: "",
      phone: 0,
      themeList: [],
      backgroundUrl: "",
      colorTheme:''
    };
  },
  mounted() {
    this.avatar = this.$store.state.user.avatar;
    this.nickName = this.$store.state.user.nickName;
    this.email = this.$store.state.user.email;
    this.phone = this.$store.state.user.phone;
    this.themeList = color.themeList;
    this.colorTheme=localStorage.getItem("colorTheme")
    this.backgroundUrl = this.$store.state.user.backgroundUrl;

    // console.log("backgroundUrl", this.backgroundUrl);
  },
  methods: {
    /**
     * 改变颜色主题 函数
     * theme_中所有主题均为全局配置
     */
    changeV(item) {
      changeTheme(item);
      this.colorTheme=item
    },
    editUserInfo(){
        let p ={
            nickName:this.nickName,
            colorTheme:this.colorTheme,
            backgroundUrl:this.backgroundUrl,
            eamil:this.email,
            phone:this.phone,
            avatar:this.avatar
        }
        userApi.editUserInfo(p).then(res=>{
            if(res.code===0){
                this.$Message.success("编辑成功")
                this.$store.dispatch("getUserInfo")
            }
        })
    },
    changeAvatar(url){
      this.avatar=url
      this.$nextTick(()=>{
        this.$store.state.user.avatar=url
        this.reload()
      })
      
    },
    changeBackgroundUrl(url){
      this.backgroundUrl=url
      
        this.$nextTick(()=>{
        this.$store.state.user.backgroundUrl=url
        localStorage.setItem("backgroundUrl",url)
        this.reload()
      })
    }
  }
};
</script>

<style lang="less">
.setting {
  padding: 20px;
}
.title {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.img {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  cursor: pointer;
}
.img-show {
  font-size: 9px;
  background: rgba(0, 0, 0, 0.35);
  overflow: hidden;
  position: absolute;
  display: inline-block;
  color: #ffffff;
  //   display: none;
  //   z-index: 9999999;
}
.img-show:hover {
  // display: inline-block;
}
.font-title {
  padding: 12px;
}
.button-setting {
  position: absolute;
  bottom: 250px;
  right: 70px;
}
.showB {
  margin-right: 10px;
  font-weight: bolder;
  color: white;
  padding: 2px;
}
.every-color {
  display: inline-block;
  .every-color-child {
    height: 30px;
    width: 30px;
    margin: 0 3px;
  }
}
.back {
  width: 120px;
}
</style>