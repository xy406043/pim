<template>
  <Form ref="loginForm" :model="form" :rules="rules"  @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" @on-keyup="handleBlank"   placeholder="账号" @on-focus="loading=false">
        <span slot="prepend">
          <Icon :size="24" type="md-phone-portrait" />
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="密码" @on-keyup="handleBlank" @on-focus="loading=false">
        <span slot="prepend">
          <Icon :size="24" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <div class="reset-btn" @click="toReset">
      忘记密码
    </div>
    <FormItem>
      <Button @click="handleSubmit" size="large" style="font-weight:700;" type="primary" :loading="loading" long>
        <span v-if="!loading">登录</span>
        <span v-else>登录中...</span>
      </Button>
    </FormItem>
  </Form>
</template>

<script>
// import md5 from 'blueimp-md5'
import Crypto from "@/libs/crypto"

export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    },
    invalid: {
      type: Boolean,
      defalut: false
    }
  },
  data () {
    return {
      form: {
        userName: '',
        password: ''
      },
      loading: this.invalid
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('update:invalid', true)
          this.loading = true
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: Crypto.encode(this.form.password)
          })
        }
      })
    },
    handleBlank(){
      this.form['password'] = this.form['password'].replace(/\s+/g,'')
       this.form['userName'] = this.form['userName'].replace(/\s+/g,'')
    },
    toReset () {
      const route = {
        path: '/reset'
      }
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.reset-btn {
  font-size: 14px;
  color: #2d8cf0;
  text-align: right;
  margin: 20px 0;
  font-weight: 700;
  cursor: pointer;
}
</style>

