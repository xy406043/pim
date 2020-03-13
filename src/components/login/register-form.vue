<template>
  <Form ref="registerForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
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

    <!-- <FormItem prop="password2">
      <Input
        type="password"
        v-model="form.password2"
        placeholder="请再输入一遍密码"
        @on-keyup="handleBlank"
        @on-focus="loading=false"
      >
        <span slot="prepend">
          <Icon :size="24" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>-->
    <FormItem prop="code">
      <Input
        v-model="form.code"
        placeholder="请输入邮箱验证码"
        @on-keyup="handleBlank"
        @on-focus="loading=false"
      >
        <span slot="prepend">
          <Icon :size="24" type="md-alarm"></Icon>
        </span>
      </Input>
      <div v-show="codeState===0" class="send">
        <Button @click="sendCode" size="large" style="font-weight:700;" type="primary" long>
          <span>发送验证码</span>
        </Button>
      </div>
      <div v-show="codeState===1" class="send">
        <Button type="primary">
          <span style="width:100px;overflow:hidden">{{codeTime + ' S'}}后再次发送</span>
        </Button>
      </div>
      <span>有效期十分钟</span>
    </FormItem>
    <div class="tonew mb-10">您已接受我们的默认条款</div>
    <FormItem>
      <Button @click="handleSubmit" size="large" style="font-weight:700;" type="primary" long>
        <span>注册</span>
      </Button>\
    </FormItem>
  </Form>
</template>

<script>
import { userApi } from "@/api";
// import md5 from 'blueimp-md5'
import Crypto from "@/libs/crypto";
const moment = require("moment");
export default {
  name: "",
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
  },
  data() {
    return {
      form: {
        email: "",
        userName: "",
        password: "",
        password2: "",
        code: "" //校验码
      },
      codeState: 0, //0 未发送  1 已发送 在一分钟内  2.已发送 一分钟后
      loading: this.invalid,
      codeTime: 60,
      stopVerify: false
    };
  },
  watch: {
    stopVerify(newV, oldV) {
      if (newV === true) {
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
    }
  },
  computed: {
    rules() {
      return {
        email: this.emailRules,
        userName: this.userNameRules,
        password: this.passwordRules,
        // password2: this.password2Rules,
        code: this.verifycodeRules
      };
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.registerForm
        .validate(valid => {
          console.log("结果", valid);
          if (valid) {
            this.$emit("update:invalid", true);
            this.$emit("signup", {
              userName: this.form.userName,
              code: this.form.code,
              email: this.form.email,
              password: Crypto.encode(this.form.password)
            });
            this.loading = true;
          } else {
            this.$Message.error("请先完善信息");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    sendCode() {
      let p = {
        userName: this.form.userName,
        email: this.form.email
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
        //发送验证码开始倒计时
        this.codeState = 1;
        this.stopVerify = true;
      });
    },
    handleBlank() {
      this.form["email"] = this.form["email"].replace(/\s+/g, "");
      this.form["password"] = this.form["password"].replace(/\s+/g, "");
      //   this.form["password2"] = this.form["password2"].replace(/\s+/g, "");
      this.form["userName"] = this.form["userName"].replace(/\s+/g, "");
      this.form["code"] = this.form["code"].replace(/\s+/g, "");
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
  margin-top: 10px;
  width: 120px;
  float: right;
}
</style>