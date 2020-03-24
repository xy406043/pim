<template>
  <div>
    <div class="flex-row column-center">
      <span class="min-width font-bolder font-16 mb-5">邮箱:</span>
      <span>
        <vs-input dark label-placeholder="请输入注册邮箱" v-model="email"></vs-input>
      </span>
    </div>
    <div class="flex-row column-center mt-20 mb-5">
      <span class="min-width font-bolder font-16">用户名：</span>
      <span>
        <vs-input dark label-placeholder="请输入用户名" @on-keyup="handleBlank" v-model="userName"></vs-input>
      </span>
    </div>
    <div class="flex-row column-center mt-20 mb-5">
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
    <div class="flex-row column-center mb-20 flex-space-between mt-20 this-my">
      <span class="mr-10">
        <vs-input label-placeholder="请输入验证码" style="width:auto" v-model="code"></vs-input>
      </span>
      <div>
        <vs-button
          v-if="codeState===0"
          dashed
          dark
          upload
          square
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
      <vs-button dark dashed block upload @click="handleSubmit">注册</vs-button>
    </div>
  </div>
</template>

<script>
import { userApi } from "@/api";
// import md5 from 'blueimp-md5'
import Crypto from "@/libs/crypto";
const moment = require("moment");
export default {
  name: "",
  data() {
    return {
      email: "",
      userName: "",
      password: "",
      password2: "",
      code: "", //校验码
      codeState: 0, //0 未发送  1 已发送 在一分钟内  2.已发送 一分钟后
      loading: this.invalid,
      hasVisiblePassword: false,
      codeTime: 60,
      stopVerify: false
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
    code() {
      this.code = this.code.replace(/\s+/g, "");
    }
  },
  computed: {
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
  },
  methods: {
    handleSubmit() {
      this.$emit("update:invalid", true);
      this.$emit("signup", {
        userName: this.userName,
        code: this.code,
        email: this.email,
        password: Crypto.encode(this.password)
      });

      // this.$refs.registerForm
      //   .validate(valid => {
      //     console.log("结果", valid);
      //     if (valid) {
      //       this.$emit("update:invalid", true);
      //       this.$emit("signup", {
      //         userName: this.userName,
      //         code: this.code,
      //         email: this.email,
      //         password: Crypto.encode(this.password)
      //       });
      //       this.loading = true;
      //     } else {
      //       this.$Message.error("请先完善信息");
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    initRegister() {
      this.email = "";
      this.code = "";
      this.userName = "";
      this.password = "";
      this.stopVerify = false;
      this.codeTime = 60;
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
        } else {
          this.$Message.error(res.errorMsg);
        }
      });
    },
    handleBlank() {
      console.log(1);
      this.email = this.email.replace(/\s+/g, "");
      this.password = this.password.replace(/\s+/g, "");
      this.userName = this.userName.replace(/\s+/g, "");
      this.code = this.code.replace(/\s+/g, "");
    }
  },
  props: {
    emailRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "邮箱不能为空", trigger: "blur" }];
      }
    },
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "用户名不能为空", trigger: "blur" }];
      }
    },
    showState: {
      type: Number
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "密码不能为空", trigger: "blur" }];
      }
    },
    // password2Rules: {
    //   type: Array,
    //   default: () => {
    //     return [{ required: true, message: "密码不能为空", trigger: "blur" }];
    //   }
    // },
    codeRules: {
      type: Array,
      default: () => {
        return [{ required: true, messgae: "请输入验证码" }];
      }
    },
    invalid: {
      type: Boolean,
      defalut: false
    }
  }
};
</script>

<style lang="less" scoped>
.tonew {
  text-align: center;
  font-weight: 1000;
  color: #ffffff;
  text-shadow: 0 0 10px #2d8cf0, 0 2px 1px #641818;
}
.send {
  margin-left: 30px;
}
</style>
<style lang="less">
.this-my {
  .vs-input {
    width: 120px;
  }
}
</style>

<style>
/* <Form ref="registerForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="email">
      <Input
        v-model="form.email"
        @on-keyup="handleBlank"
        placeholder="请输入邮箱进行注册"
        @on-focus="loading=false"
      >
        <span slot="prepend">
          <Icon :size="24" type="md-mail" />
        </span>
      </Input>
    </FormItem>
    <FormItem prop="userName">
      <Input
        v-model="form.userName"
        @on-keyup="handleBlank"
        placeholder="用户名"
        @on-focus="loading=false"
      >
        <span slot="prepend">
          <Icon :size="24" type="md-person" />
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input
        type="password"
        v-model="form.password"
        placeholder="密码"
        @on-keyup="handleBlank"
        @on-focus="loading=false"
      >
        <span slot="prepend">
          <Icon :size="24" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="code">
      <div class="flex-row column-center flex-space-between">
        <Input
          v-model="form.code"
          placeholder="请输入邮箱验证码"
          @on-keyup="handleBlank"
          @on-focus="loading=false"
        ></Input>
        <div v-show="codeState===0" class="send">
          <vs-button @click="sendCode" dark border style="width:150px">
            <span>发送验证码</span>
          </vs-button>
        </div>
        <div v-show="codeState===1" class="send">
          <vs-button dark border style="width:150px">
            <span style="width:100px;overflow:hidden">{{codeTime + ' S'}}后再次发送</span>
          </vs-button>
        </div>
      </div>
    </FormItem>
    <FormItem>
      <vs-button @click="handleSubmit" block dark dashed>
        <span class="font-bolder">注册</span>
      </vs-button>
    </FormItem>
  </Form> */
</style>