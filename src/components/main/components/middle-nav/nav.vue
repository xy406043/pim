<template>
  <div class="flex-row">
    <!-- 总体 -->
    <div class="mr-20">
      <font class="ml-10 option font-m" @click="toNote">项目</font>
      <font class="ml-10 option font-m">知识库</font>
      <font class="ml-10 option font-m">动态</font>
    </div>
    <div>
      <Divider type="vertical" />
    </div>
    <!-- 计划 -->
    <div class="mr-20">
      <font class="ml-10 option font-m">日历</font>
      <font class="ml-10 option font-m">神觉</font>
      <font class="ml-10 option font-m">保险箱</font>
    </div>
    <div>
      <Divider type="vertical" />
    </div>
    <!-- 个人 -->
    <div class="mr-20">
      <font class="ml-10 option font-m">保险箱</font>
      <font class="ml-10 option font-m">我自己</font>
    </div>
  </div>
</template>

<script>
/**
 * 中间横向导航栏目
 */
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    toNote() {
      this.$router.push({
        name: "note"
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>