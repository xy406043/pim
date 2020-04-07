
<template>
  <div v-if="codeTrue===false">
    <div class="flex-row column-center">
      <span class="min-width font-bolder font-16 mb-5">邮箱:</span>
      <span>
        <vs-input dark label-placeholder="请输入注册邮箱" v-model="email"></vs-input>
      </span>
    </div>
    <div class="flex-row column-center mb-20 flex-space-between mt-20 this-my">
      <span class="mr-10">
        <vs-input dark label-placeholder="请输入验证码" style="width:auto" v-model="code"></vs-input>
      </span>
      <div>
        <vs-button
          v-if="codeState===0"
          dashed
          dark
          square
          upload
          @click="sendCode"
          style="width:120px"
        >发送验证码</vs-button>
        <vs-button
          v-if="codeState===1"
          dashed
          dark
          upload
          square
          style="width:120px"
        >{{codeTime + ' S'}}后再次发送</vs-button>
      </div>
    </div>
    <div class="mb-20">
      <vs-button block dark upload dashed @click="verifyCode">确认</vs-button>
    </div>
  </div>
  <div v-else>
    <!-- 密码正确是要重置密码 -->
    <div class="flex-row column-center mt-20 mb-20">
      <span class="min-width font-bolder font-16">密码:</span>
      <span>
        <vs-input
          type="password"
          :progress="getProgress"
          label-placeholder="请输入密码"
          @on-keyup="handleBlank"
          v-model="password"
        >
          >
          <!-- <template #icon>
            <i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
            <i v-else class="bx bx-hide"></i>
          </template>-->

          <template v-if="getProgress >= 100" #message-success>Secure password</template>
        </vs-input>
      </span>
    </div>
    <div class="flex-row column-center mb-20">
      <span class="min-width font-bolder font-16">密码:</span>
      <span>
        <vs-input
          type="password"
          :progress="getProgress"
          label-placeholder="请再次输入密码"
          @on-keyup="handleBlank"
          v-model="password2"
        >
          >
          <!-- <template #icon>
            <i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
            <i v-else class="bx bx-hide"></i>
          </template>-->

          <template v-if="getProgress >= 100" #message-success>Secure password</template>
        </vs-input>
      </span>
    </div>
    <div class="mb-20">
      <vs-button block dark dashed upload @click="resetPass">确认</vs-button>
    </div>
  </div>
</template>

<script>
import { userApi } from "@/api";
// import md5 from 'blueimp-md5'
const moment = require("moment");
import Crypto from "@/libs/crypto";
export default {
  name: "",
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      password2: "",
      code: "",
      codeState: 0, //0 未发送  1 已发送 在一分钟内  2.已发送 一分钟后
      loading: this.invalid,
      hasVisiblePassword: false,
      codeTime: 60,
      stopVerify: false,
      codeTrue: false
    };
  },
  watch: {
    email() {
      this.email = this.email.replace(/\s+/g, "");
    },
    userName() {
      this.userName = this.userName.replace(/\s+/g, "");
    },
    password() {
      this.password = this.password.replace(/\s+/g, "");
    },
    password2() {
      this.password2 = this.password2.replace(/\s+/g, "");
    },
    code() {
      this.code = this.code.replace(/\s+/g, "");
    }
  },
  methods: {
    handleBlank() {
      this.form["userName"] = this.form["userName"].replace(/\s+/g, "");
    },
    initReset() {
      this.email = "";
      this.code = "";
      this.userName = "";
      this.password = "";
      this.stopVerify = false;
      this.codeTime = 60;
      this.codeTrue=false
    },
    verifyCode() {
      if (this.email == "") return;
      if (this.code === "") return;
      let p = {
        email: this.email,
        code: this.code
      };
      userApi.verifyCode(p).then(res => {
        if (res.code === 0) {
          this.codeTrue = true;
        } else {
          this.$Message.error(res.errorMsg);
        }
      });
    },
    resetPass() {
      if(this.email===''){
         this.$Message.error("没有邮箱信息，请求出错，请重新走一遍流程！")
        return
      }
      if (this.password === "" || this.password2 === "") {
        this.$Message.error("请补全信息");
        return;
      }
      if (this.password !== this.password2) {
        this.$Message.error("两次密码不一致，请重新输入");
        return;
      }
      let p={
        email:this.email,
        password:this.password
      }
      userApi.resetPass(p).then(res =>{
        if(res.code===0){
          this.initReset()
          this.$Message.error("密码更改成功，可以尝试登录了！！！")
          this.$emit("update:showState",1)
        }
      })
    },
    sendCode() {
      let p = {
        userName: this.userName,
        email: this.email
      };
      if (p.userName === "") {
        //   this.$Message.warning("请输入用户名")
        // return;
      }
      if (p.email === "") {
        this.$Message.warning("请输入邮箱");
        return;
      }
         let mail =new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
      if(!mail.test(p.email)){
        this.$Message.error("请输入正确的邮箱格式")
        return
      }
      userApi.sendReCode(p).then(res => {
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
              clearInterval()
              return;
            }
          }, 1000);
        } else {
          this.$Message.error(res.errorMsg);
        }
      });
    }
  },
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "邮箱不能为空", trigger: "blur" }];
      }
    },
    showState: {
      type: Number
    },
    invalid: {
      type: Boolean,
      defalut: false
    }
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules
      };
    },
    getProgress() {
      let progress = 0;
      // at least one number
      if (/\d/.test(this.password)) {
        progress += 20;
      }
      // at least one capital letter
      if (/(.*[A-Z].*)/.test(this.password)) {
        progress += 20;
      }
      // at menons a lowercase
      if (/(.*[a-z].*)/.test(this.password)) {
        progress += 20;
      }
      // more than 5 digits
      if (this.password.length >= 6) {
        progress += 20;
      }
      // at least one special character
      if (/[^A-Za-z0-9]/.test(this.password)) {
        progress += 20;
      }
      return progress;
    }
  }
};
</script>

<style lang="less" scoped>
</style>


<style lang="less">
// <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
//   <FormItem prop="userName">
//     <Input
//       v-model="form.userName"
//       @on-keyup="handleBlank"
//       placeholder="账号"
//       @on-focus="loading=false"
//     >
//       <span slot="prepend">
//         <Icon :size="24" type="md-phone-portrait" />
//       </span>
//     </Input>
//   </FormItem>
// </Form>
</style>