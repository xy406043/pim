
<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input
        v-model="form.userName"
        @on-keyup="handleBlank"
        placeholder="账号"
        @on-focus="loading=false"
      >
        <span slot="prepend">
          <Icon :size="24" type="md-phone-portrait" />
        </span>
      </Input>
    </FormItem>
  </Form>
</template>

<script>
export default {
  name: "",
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
    rules () {
      return {
        userName: this.userNameRules
      }
    }
  },
  data() {
    return {
      form: {
        userName: "",
      },
      loading: this.invalid
    };
  },
  methods: {
    handleBlank() {
      this.form["userName"] = this.form["userName"].replace(/\s+/g, "");
    }
  }
};
</script>

<style lang="less" scoped>
</style>