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
          <span>选择图片作为头像</span>
        </span>
      </div>
    </div>
    <Divider></Divider>
    <!-- 样式设置 -->
    <div style="margin:16px 0">
      <div class="mb-10 column-center">
        <span class="min-width font-bolder">改变主题色:</span>
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
      <div class="mb-10 column-center flex-row">
        <span class="min-width font-bolder">改变背景图:</span>
        <div class="mr-20">
          <div class="show-img">
            <!-- 主题色选择 -->
            <img class="back-image" :src="backgroundUrl" alt="背景图片" />
            <div class="image-show flex-all-center">
              <div @click="showImage">
                <Icon class="show-p" size="30" type="ios-eye" />
              </div>
            </div>
          </div>
        </div>
        <!-- <span class="theme_font option ml-20">更换背景图片</span> -->
        <UploadImage
          :changeUrl.sync="backgroundUrl"
          title="更换背景图片"
          @urlChange="changeBackgroundUrl"
        ></UploadImage>
      </div>
      <div class="column-center">
        <span v-if="!mainInfo" class="min-width theme_font option" @click="mainInfo=true">修改基本信息</span>
        <span v-else class="min-width theme_font option" @click="mainInfo=false">隐藏基本信息</span>
      </div>
    </div>
    <div v-show="mainInfo">
      <Divider />
      <div style="margin:16px 0">
        <div class="flex-start column-center mb-10">
          <span class="min-width font-bolder">姓名:</span>
          <span class="form-width">
            <Input v-model="realName" placeholder="输入姓名"></Input>
          </span>
        </div>
        <div class="flex-start column-center mb-10">
          <span class="min-width font-bolder">性别:</span>
          <span>
            <RadioGroup v-model="sex">
              <Radio :label="1">男</Radio>
              <Radio :label="0" class="ml-20">女</Radio>
            </RadioGroup>
          </span>
        </div>
        <div class="flex-start column-center mb-10">
          <span class="min-width font-bolder">出生年月:</span>
          <span class="form-width">
            <DatePicker
              class="form-width"
              :value="birthDate"
              placeholder="选择出生日期"
              @on-change="showYe"
            ></DatePicker>
          </span>
        </div>
        <div class="flex-start column-center mb-10">
          <span class="min-width font-bolder">籍贯:</span>
          <span>
            <v-distpicker
              :province="selectedNativePlace.province"
              :city="selectedNativePlace.city"
              :area="selectedNativePlace.area"
              @selected="showArea"
            ></v-distpicker>
          </span>
        </div>
      </div>
    </div>
    <Divider />
    <!-- 具体内容设置 -->
    <div style="margin:16px 0">
      <div class="flex-start column-center mb-10">
        <span class="min-width font-bolder">昵称:</span>
        <span class="form-width">
          <Input v-model="nickName" placeholder="输入昵称"></Input>
        </span>
      </div>
      <div class="flex-start column-center mb-10">
        <span class="min-width font-bolder">邮箱:</span>
        <span class="form-width">
          <Input v-model="email" placeholder="输入邮箱" disabled></Input>
        </span>
      </div>
      <div
        class="theme_font option font-12"
        style="margin-left:85px"
        @click="showVerifyModal(1)"
      >修改邮箱</div>
      <div class="flex-start column-center mb-10">
        <span class="min-width font-bolder">密码:</span>
        <span class="theme_font option font-12" @click="showVerifyModal(2)">修改密码</span>
      </div>
      <div class="flex-start column-center mb-10">
        <span class="min-width font-bolder">二级密码:</span>
        <span class="theme_font option font-12" @click="showVerifyModal(3)">修改二级密码</span>
      </div>
      <div class="flex-start column-center mb-10">
        <span class="min-width font-bolder">手机号:</span>
        <span class="theme_hover showB">已绑定:{{phone}}</span>
        <span v-if="phone!==0" class="theme_font option-disabled font-12">更换手机号</span>
        <span v-else class="theme_font option-disabled font-12">绑定手机号</span>
      </div>
      <!-- <div class="flex-start column-center mb-10">
        <span class="min-width">通知设置:</span>
      </div>-->
    </div>
    <!-- 保存内容 -->
    <div>
      <vs-button style="width:140px" class="font-bolder" success square @click="editUserInfo">保存</vs-button>
    </div>
    <!-- 图片显示Modal/ -->
    <Modal v-model="imageShow" :styles="{padding:'0'}" fullscreen footer-hide>
      <div class="flex-all-center" style="height:100%">
        <img class="modal-img" :src="modalImg" />
      </div>
    </Modal>
    <!-- 验证密码Modal -->
    <Modal
      v-model="verifyModal"
      footer-hide
      :closable="false"
      @on-visible-change="changeVerifyModal"
    >
      <div class="thisModal">
        <div class="mt-10">
          <vs-input
            type="password"
            v-model="pass"
            style="width:auto"
            :label-placeholder="operating===2?'请输入原登录密码':'请输入登录密码'"
          ></vs-input>
        </div>
        <div class="mt-10 flex-row flex-space-between">
          <vs-button dark dashed style="width:120px" @click="verifyModal=false">取消</vs-button>
          <vs-button class="ml-5" success dashed style="width:120px" @click="verifyPass">确认</vs-button>
        </div>
      </div>
    </Modal>
    <!-- 绑定邮箱Modal -->
    <Modal v-model="emailModal" footer-hide :closable="false" @on-visible-change="initPass">
      <div class="thisModal">
        <div class="mt-20 mb-20">
          <vs-input class="form-width" v-model="editEmail" label-placeholder="请输入新的绑定邮箱"></vs-input>
        </div>
        <div class="flex-row flex-space-between">
          <vs-input class="form-width" v-model="verifyCode" label-placeholder="验证码"></vs-input>
          <span v-show="codeState===0">
            <vs-button dark style="width:150px" relief square @click="sendCode">验证码</vs-button>
          </span>
          <span v-show="codeState===1">
            <vs-button dark square relief style="width:150px">{{codeTime + ' S'}}后再次发送</vs-button>
          </span>
        </div>
        <div class="mt-5">
          <vs-button success flat style="width:100%" @click="editEmailFunc">提交</vs-button>
        </div>
      </div>
    </Modal>
    <!-- 修改密码Modal -->
    <Modal v-model="passModal" footer-hide :closable="false" @on-visible-change="initPass">
      <div class="thisModal">
        <div class="mb-20 mt-10" v-show="operating===2">
          <vs-input v-model="newpass" type="password" label-placeholder="请输入新的登录密码"></vs-input>
        </div>
        <div class="mb-20" v-show="operating===2">
          <vs-input v-model="newpass2" type="password" label-placeholder="请再次输入登录密码"></vs-input>
        </div>
        <div class="mb-10" v-if="operating===3">
          <vs-input
            type="password"
            v-model="newSecondPass"
            style="width:auto"
            label-placeholder="请输入新的二级密码"
          ></vs-input>
        </div>
        <div class="mb-10" v-if="operating===3">
          <vs-input
            type="password"
            v-model="newSecondPass2"
            style="width:auto"
            label-placeholder="请再次输入二级密码"
          ></vs-input>
        </div>
        <div class="mt-10 flex-row flex-space-between">
          <vs-button dark dashed style="width:120px" @click="passModal=false">取消</vs-button>
          <vs-button success floating style="width:120px" @click="editPass">提交</vs-button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
/**
 * @description 个人设置页面
 * @vuesax的Input为password时外层只能使用v-if
 */
import VDistpicker from "v-distpicker";
import { userApi } from "@/api";
import { changeTheme } from "@/libs/theme";
import UploadImage from "_c/self-page/upload";
import color from "./color";
import Crypto from "@/libs/crypto";
export default {
  name: "",
  components: {
    UploadImage,
    VDistpicker //地区选择器
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
      colorTheme: "",
      mainInfo: false,
      realName: "",
      birthDate: "",
      sex: 0, //0为女 1为男
      selectedNativePlace: {}, //籍贯
      nativePlace: {},
      imageShow: false,
      emailModal: false,
      passModal: false,
      verifyModal: false,
      modalImg: "",
      pass: "",
      operating: 0, //操作 1修改邮箱   2修改登录密码  3 修改二级密码 4 修改手机号
      editEmail: "",
      verifyCode: "",
      stopVerify: false,
      codeTime: 60, //验证码时间
      codeState: 0, //0 未发送  1 已发送 在一分钟内  2.已发送 一分钟后
      newpass: "",
      newpass2: "",
      newSecondPass: "",
      newSecondPass2: ""
    };
  },
  watch: {},
  mounted() {
    this.avatar = this.$store.state.user.avatar;
    this.nickName = this.$store.state.user.nickName;
    this.email = this.$store.state.user.email;
    this.phone = this.$store.state.user.phone;
    this.themeList = color.themeList;
    this.colorTheme = localStorage.getItem("colorTheme");
    this.backgroundUrl = this.$store.state.user.backgroundUrl;
    this.getUserInfo();
    // console.log("backgroundUrl", this.backgroundUrl);
  },
  methods: {
    getUserInfo() {
      userApi.getUserInfo().then(res => {
        this.sex = res.result.sex;
        this.email = res.result.email;
        this.birthDate = res.result.birthDate;
        this.realName = res.result.realName;
        this.nativePlace = res.result.nativePlace;
        this.selectedNativePlace.province =
          res.result.nativePlace.province.value;
        this.selectedNativePlace.city = res.result.nativePlace.city.value;
        this.selectedNativePlace.area = res.result.nativePlace.area.value;
      });
    },
    /**
     * 改变颜色主题 函数
     * theme_中所有主题均为全局配置
     */
    changeV(item) {
      changeTheme(item);
      this.colorTheme = item;
    },
    showYe(e) {
      this.birthDate = e;
    },
    showArea(data) {
      this.nativePlace = data;
    },
    editUserInfo() {
      let p = {
        nickName: this.nickName,
        colorTheme: this.colorTheme,
        backgroundUrl: this.backgroundUrl,
        eamil: this.email,
        phone: this.phone,
        avatar: this.avatar
      };
      if (this.mainInfo) {
        (p.nativePlace = this.nativePlace), (p.sex = this.sex);
        p.realName = this.realName;
        p.birthDate = this.birthDate;
      }
      userApi.editUserInfo(p).then(res => {
        if (res.code === 0) {
          this.$Message.success("编辑成功");
          this.getUserInfo();
          this.$store.dispatch("getUserInfo");
        }
      });
    },
    changeAvatar(url) {
      this.avatar = url;
      this.$nextTick(() => {
        this.$store.state.user.avatar = url;
        localStorage.setItem("avatar", url);
        this.reload();
      });
    },
    changeBackgroundUrl(url) {
      this.backgroundUrl = url;

      this.$nextTick(() => {
        this.$store.state.user.backgroundUrl = url;
        localStorage.setItem("backgroundUrl", url);
        this.reload();
      });
    },
    showImage() {
      this.modalImg = this.backgroundUrl;
      this.imageShow = true;
    },
    changeVerifyModal(val) {
      if (val === false) {
        this.pass = "";
      }
    },
    showVerifyModal(val) {
      this.operating = val;
      this.verifyModal = true;
    },
    verifyPass() {
      let p = {
        pass: Crypto.encode(this.pass),
        operating: this.operating
      };
      userApi.verifyPass(p).then(res => {
        if (res.code === 0) {
          //验证成功进入下一步
          if (res.result.operating === 1) {
            this.verifyModal = false;
            this.$nextTick(() => {
              this.emailModal = true;
            });
          } else if (res.result.operating === 2 || res.result.operating === 3) {
            this.verifyModal = false;
            this.$nextTick(() => {
              this.passModal = true;
            });
          }
        } else {
          this.$Message.error(res.errorMsg);
          this.pass = "";
        }
      });
    },
    sendCode() {
      // 发送验证码
      let p = {
        email: this.editEmail
      };
      if (p.email === "") {
        this.$Message.warning("请输入邮箱");
        return;
      }
      let mail = new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      );
      if (!mail.test(p.email)) {
        this.$Message.error("请输入正确的邮箱格式");
        return;
      }
      userApi.sendCode(p).then(res => {
        if (res.code === 0) {
          //发送验证码开始倒计时
          this.codeState = 1;
          this.stopVerify = true;
          setInterval(() => {
            this.codeTime = this.codeTime - 1;
            if (this.codeTime === 0) {
              this.codeTime = 60;
              this.codeState = 0;
              this.stopVerify = false;
              return;
            }
          }, 1000);
        }
      });
    },
    editEmailFunc() {
      let p = {
        email: this.editEmail,
        code: this.verifyCode
      };
      userApi.editEmail(p).then(res => {
        if (res.code === 0) {
          this.$Message.success("更换绑定成功");
          this.emailModal = false;
          this.getUserInfo();
          this.$store.dispatch("getUserInfo");
        } else {
          this.$Message.error(res.erroeMsg);
        }
      });
    },
    initPass() {
      this.newSecondPass = "";
      this.newSecondPass2 = "";
      this.newpass = "";
      this.newpass2 = "";
    },
    editPass() {
      let p = {};
      if (this.operating === 2) {
        p = {
          operating: 2,
          pass: Crypto.encode(this.newpass)
        };
        if (this.newpass === "") {
          this.$Message.warning("请输入密码");
          return;
        }
        if (this.newpass !== this.newpass2) {
          this.$Message.warning("两次密码不一致");
        }
        userApi.editPass(p).then(res => {
          if (res.code === 0) {
            this.$Message.success("修改成功");
            this.initPass();
            this.passModal = false;
            this.getUserInfo();
            this.$store.dispatch("getUserInfo");
          }
        });
      } else if (this.operating === 3) {
        p = {
          operating: 3,
          pass: Crypto.encode(this.newSecondPass)
        };
        if (this.nenewSecondPasswpass === "") {
          this.$Message.warning("请输入密码");
          return;
        }
        if (this.newSecondPass !== this.newSecondPass2) {
          this.$Message.warning("两次密码不一致");
        }
        userApi.editPass(p).then(res => {
          if (res.code === 0) {
            this.$Message.success("修改成功");
            this.initPass();
            this.passModal = false;
            this.getUserInfo();
            this.$store.dispatch("getUserInfo");
          }
        });
      }
    }
  }
};
</script>

<style lang="less">
.setting {
  padding: 20px;
  .ivu-divider {
    margin: 10px 0;
  }
}
.thisModal {
  .vs-input {
    width: 100% !important;
  }
}
// .ivu-modal-body {
//   padding: 0 !important;
// }
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
  // cursor: pointer;
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
.back-image {
  width: 120px;
}
.show-img {
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
.show-img:hover .image-show {
  display: flex;
  background: gray;
  opacity: 0.6;
  color: white;
}
.show-p {
  cursor: pointer;
}
.thisModal {
  padding: 10px;
}
</style>