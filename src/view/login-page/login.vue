<template>
  <div class="login">
    <div class="star">
      <StarFlow />
    </div>
    <div class="login-con">
      <h1>PIM个人信息管理系统</h1>
      <LoginForm :invalid.sync="invalid" @on-success-valid="handleSubmit"></LoginForm>
    </div>
  </div>
</template>

<script>
import LoginForm from "_c/login/login-form.vue";
import StarFlow from "_c/login/star.vue";
import { mapActions } from "vuex";

export default {
  name: "login",
  components: {
    LoginForm,
    StarFlow
  },
  data() {
    return {
      invalid: false
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
</style>