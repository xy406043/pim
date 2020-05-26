<template>
  <div>
    <div class="flex-row column-center">
      <span class="min-width font-bolder font-16">用户名：</span>
      <span>
        <vs-input dark label-placeholder="请输入用户名" v-model="userName"></vs-input>
      </span>
    </div>
    <div class="flex-row column-center mt-20">
      <span class="min-width font-bolder font-16">密码:</span>
      <span>
        <vs-input
          dark
          type="password"
          label-placeholder="请输入密码"
          style="width:100%"
          v-model="password"
        ></vs-input>
      </span>
    </div>
    <div class="flex-space-between mt-20">
      <div class="try-info">以上为试用账号</div>
      <a @click="toReset">忘记密码?</a>
    </div>
    <div class="mt-20 mb-20">
      <vs-button @click="handleSubmit" upload block dark bashed style="width:100%">登录</vs-button>
    </div>
  </div>
</template>

<script>
// import md5 from 'blueimp-md5'
import Crypto from "@/libs/crypto";

export default {
  name: "LoginForm",
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "账号不能为空", trigger: "blur" }];
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
    invalid: {
      type: Boolean,
      defalut: false
    }
  },
  watch: {
    userName() {
      this.userName = this.userName.replace(/\s+/g, "");
    },
    password() {
      this.password = this.password.replace(/\s+/g, "");
    }
  },
  data() {
    return {
      userName: "tomoyo",
      password: "406043",
      // form: {
      //   userName: "",
      //   password: ""
      // },
      isPass: false,
      loading: this.invalid
    };
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      };
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.userName);
      if (this.userName === "") {
        this.$Message.error("请输入用户名");
        return;
      }
      if (this.password === "") {
        this.$Message.error("请输入密码");
        return;
      }
      this.$emit("update:invalid", true);
      this.loading = true;
      this.$emit("on-success-valid", {
        userName: this.userName,
        password: Crypto.encode(this.password)
      });
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.$emit("update:invalid", true);
      //     this.loading = true;
      //     this.$emit("on-success-valid", {
      //       userName: this.form.userName,
      //       password: Crypto.encode(this.form.password)
      //     });
      //   }
      // });
    },
    handleBlank() {
      this.form["password"] = this.form["password"].replace(/\s+/g, "");
      this.form["userName"] = this.form["userName"].replace(/\s+/g, "");
    },
    toReset() {
      this.$emit("update:showState", 3);
    }
  }
};
</script>

<style scoped>
.reset-btn {
  font-size: 14px;
  color: #2d8cf0;
  cursor: pointer;
}
.get-btn {
  font-size: 14px;
  cursor: pointer;
  color: white;
  font-weight: bolder;
  text-shadow: 0 0 10px #ffffff, 0 2px 1px #ff0c0c;
}
.tonew {
  text-align: center;
  font-weight: 1000;
  color: #ffffff;
  text-shadow: 0 0 10px #2d8cf0, 0 2px 1px #641818;
}
.try-info{
  font-weight: bolder;
  color:cornflowerblue;
  text-shadow: 1px 1px 3px yellow;
}
</style>

