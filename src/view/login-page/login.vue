<template>
  <div class="login flex-all-center">
    <!-- <div class="star">
      <StarFlow />
    </div> -->
    <div class="login-con">
      <h1>Your's</h1>
      <LoginForm ref="login" v-show="showState===1" :showState.sync="showState" :invalid.sync="invalid" @on-success-valid="handleSubmit"></LoginForm>
      <RegisterForm ref="register" v-show="showState===2" :showState.sync="showState" :invalid.sync="invalid"  @signup="handleSignUp" ></RegisterForm>
      <ResetForm ref="reset" :showState.sync="showState" v-show="showState===3" ></ResetForm>
      <div v-show="showState===1" class="tonew">新用户?<a @click="showState=2">去注册</a></div>
      <div v-show="showState===2" class="tonew">已有账户?<a @click="backLogin" >去登录</a></div>
      <div v-show="showState===3" class="tonew"><a @click="backLogin">返回登录</a></div>
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
          this.showState=1
        }else{
          this.$Message.error(res.errorMsg)
        }
      })

    },
    backLogin(){
      this.$refs.reset.initReset()
      this.$refs.register.initRegister()
       this.showState=1 
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
  justify-content:flex-end  ;
  align-items: center;
  position: relative;

  &-con {
    width: 360px;
    height:500px;
    border-radius:18px;
    margin-right: 200px;
    background: rgba(255, 255, 255, 0.63);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    }

    .ivu-input {
      height: 40px;
    }
  }

  h1 {
    font-size:50px;
    width: 100%;
    text-align: center;
    margin-bottom: 25px;
    animation: changeTitle 3s ease-in infinite;
  }
  @keyframes  changeTitle {
    0%{
      background-image:linear-gradient(black);
      color:transparent;
      background-clip:text;
    }
    20%{
      background-image:linear-gradient(to right,rgb(116, 234, 255),rgb(81, 255, 0));
      color:transparent;
      background-clip:text;
    }
    40%{
      background-image:linear-gradient(350deg,rgb(255, 176, 176),rgb(228, 182, 255),rgb(158, 255, 158));
      color:transparent;
      background-clip:text;
    }
    55%{
       background-image:linear-gradient(to bottom,green,yellow,gray);
      color:transparent;
      background-clip:text;
    }
    70%{
       background-image:linear-gradient(to top,purple,white, black);
      color:transparent;
      background-clip:text;
    }
    90%{
      background-image:linear-gradient(to left,rgb(255, 255, 151),rgb(225, 247, 255));
      color:transparent;
      background-clip:text;
    }
    100%{
      background-image:linear-gradient(black);
      color:transparent;
      background-clip:text;
    }
  }
}
.star {
  position: absolute;
}
.tonew{
  text-align: center;
  font-weight: bolder;

}
</style>