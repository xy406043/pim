<template>
  <div class="login">
    <!-- <div class="star">
      <StarFlow />
    </div> -->
    <div class="login-con">
      <h1>PIM个人信息管理系统</h1>
      <LoginForm v-show="showState===1" :showState.sync="showState" :invalid.sync="invalid" @on-success-valid="handleSubmit"></LoginForm>
      <RegisterForm v-show="showState===2" :showState.sync="showState" :invalid.sync="invalid"  @signup="handleSignUp" ></RegisterForm>
      <ResetForm v-show="showState===3" ></ResetForm>
      <div v-show="showState===1" class="tonew">新用户?<a @click="showState=2">去注册</a></div>
      <div v-show="showState===2" class="tonew">已有账户?<a @click="showState=1">去登录</a></div>
      <div v-show="showState===3" class="tonew"><a @click="showState=1">返回登录</a></div>
    </div>
  </div>
</template>

<script>
/**
 * @description  账号一体@用户名手机号邮箱 为同一个人的身份信息
 */
import LoginForm from "_c/login/login-form.vue";
import  RegisterForm from "_c/login/register-form.vue"
import  ResetForm from "_c/login/reset-form.vue"

// import StarFlow from "_c/login/star.vue";
import { mapActions } from "vuex";
import {userApi} from "@/api"
export default {
  name: "login",
  components: {
    LoginForm,
    RegisterForm,
    ResetForm
    // StarFlow
  },
  data() {
    return {
      invalid: false,
      showState: 1, // 1登录 2注册 3 忘记密码 
    };
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo"]),
    handleSubmit({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        let result = res.result;
        if (res.code === 0) {
          /**
           * 可能存在情况：不同权限的用户进入的主页不同
           * 根据权限进行判断
           */
          this.getUserInfo().then(res => {
            console.log("跳转到首页")
            this.$router.push({ name: this.$config.homeName }).catch(err => {
              console.log(err)
            });
          });
        }else{
          this.$Message.error(res.errMsg)
          this.invalid = false
        }
      });
    },
    handleSignUp(val){
      userApi.register(val).then(res => {
        if(res.code===0){
          this.$Message.success("注册成功")
        }else{
          this.$Message.error(res.errorMsg)
        }
      })

    },
    toRegister(){
      this.invalid=false
      this.$router.push({
        name:"register"
      })
    }
  }
};
</script>

<style lang="less">
.login {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-image: url("../../assets/bg/02.png");

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &-con {
    width: 350px;
    background: rgba(207, 202, 202, 0.2);
    padding: 30px;

    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }

    .form-con {
      padding: 10px 0 0;
    }

    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }

    .ivu-input {
      height: 40px;
    }
  }

  h1 {
    color: #eef3fd;
    width: 100%;
    text-align: center;
    margin-bottom: 25px;
  }
}
.star {
  position: absolute;
}
.tonew{
  text-align: center;
  font-weight: 1000;
  color:#ffffff;
  text-shadow: 0 0 10px #2d8cf0,0 2px 1px #641818;
}
</style>