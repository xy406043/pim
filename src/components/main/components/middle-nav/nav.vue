<template>
  <div class="flex-row column-center">
    <!-- 总体 -->
    <div class="ml-10">
      <Divider type="vertical" />
    </div>
    <div class=" flex-row this_text">
      <font class="ml-10 option font-m" @click="toProject">任务集</font>
      <!-- <Dropdown trigger="click" placement="bottom">
      <font href="javascript:void(0)" class="ml-10 option font-m ">记事库</font>
      <DropdownMenu slot="list">
        <DropdownItem>日记</DropdownItem>
        <DropdownItem>通讯录</DropdownItem>
        <DropdownItem>网址收藏</DropdownItem>
      </DropdownMenu>
      </Dropdown>-->
      <font href="javascript:void(0)" class="ml-10 option font-m" @click="toKnow">记事库</font>
      <font class="ml-10 option font-m" @click="toCase">保险箱</font>
      <!-- <font class="ml-10 option font-m" @click="toMySelf">我自己</font> -->
    </div>
    <div class="ml-10">
      <Divider type="vertical" />
    </div>
    <!-- 计划 -->
    <div class="mr-10">
      <!-- <font class="ml-10 option font-m" @click="toDynamic">动态</font> -->
      <font class="ml-10 option font-m" @click="toCalendar">日历</font>
      <!-- <font class="ml-10 option font-m" @click="toProgress">神觉</font> -->
      <span class="ml-10 option font-m" @click="toTest">文本编辑器示例</span>
    </div>
    <!-- 个人 -->
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
    toKnow() {
      this.$router.push({
        name: "know"
      });
    },
    toProject() {
      this.$router.push({
        name: "project"
      });
    },
    toCase() {
      this.$router.push({
        name: "code-case"
      });
    },
    toMySelf() {
      this.$router.push({
        name: "person-detail"
      });
    },
    /**
     * @动态
     * @将每次操作记录下来
     */
    toDynamic() {
      this.$router.push({
        name: "dynamic"
      });
    },
    /**
     * @神觉
     * @任务集概览
     */
    toProgress() {
      this.$router.push({
        name: "all-progress"
      });
    },
    toCalendar() {
      this.$router.push({
        name: "calendar"
      });
    },
    toTest(){
      this.$router.push({name:"test"})
    }
  }
};
</script>

<style lang="less" scoped>
.this_text {
  white-space: nowrap;
}
</style>