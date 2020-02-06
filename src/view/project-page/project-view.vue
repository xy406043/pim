<template>
  <div class="outer">
    <!-- 标题 -->
    <div class="flex-space-between">
      <div>
        <b class="font-32">{{name}}</b>
        <div>{{description}}</div>
      </div>
      <!-- 右上角设置 -->
      <div class="mt-10 mr-10 flex-row">
        <div class="flex-center ml-20 option">
          <Icon type="md-pulse" />
          <span class="ml-5">进展</span>
        </div>
        <div class="flex-center ml-20 option">
          <Icon size="14" type="md-settings" />
          <span class="ml-5">设置</span>
        </div>
      </div>
    </div>
    <!-- 任务层 -->
    <div class="mb-10 mt-10">
      <div class="flex-space-between">
        <div class="column-center xy-button">
          <b class="font-24 mr-20">任务</b>
          <Button type="default">添加任务</Button>
        </div>
        <div class="flex-row column-center">
          <div class="mr-10 option border">
            <Icon size="16" type="ios-cube-outline" />
          </div>
          <div class="mr-10 option border">
            <Icon size="16" type="md-crop" />
          </div>
          <div></div>
        </div>
      </div>
      <!-- 日程具体内容 -->
      <div class="pr-content column-center" style="padding:10px 20px">
        <div v-if="todoList.length===0" class="column-center">
          <Icon size="32" type="md-checkbox-outline" />
          <span class="ml-20">建立任务，明确成员工作目标</span>
        </div>
        <div v-else class="column-center">
          <div v-for="(item,index) in todoList" :key="item.id">{{item.name}}</div>
        </div>
      </div>
      <!-- 展示更多信息 -->
      <span class="option font-12 showall">查看全部任务</span>
    </div>
    <!-- 日程层面 -->
    <div class="mb-10 mt-10">
      <div class="flex-space-between">
        <div class="column-center xy-button">
          <b class="font-24 mr-20">日程</b>
          <Button type="default">添加日程</Button>
        </div>
      </div>
      <!-- 日程具体内容 -->
      <div class="pr-content column-center" style="padding:10px 20px">
        <div v-if="scheduleList.length===0" class="column-center">
          <Icon size="32" type="md-calendar" />
          <span class="ml-20">提前安排日程，项目进度不耽误</span>
        </div>
        <div v-else class="column-center">
          <div v-for="(item,index) in scheduleList" :key="item.id">{{item.name}}</div>
        </div>
      </div>
      <!-- 展示更多信息 -->
      <span class="option font-12 showall">查看全部日程</span>
    </div>
    <!-- 备注层 -->
  </div>
</template>

<script>
/**
 * 进入项目，显示项目内容，点击修改。
 * 原本想弄富文本，但是这里 vue-simplemde 不太会用
 * 暂时先使用自己定义的样式吧
 *
 */
import { projectApi } from "@/api";

export default {
  name: "",
  components: {},
  data() {
    return {
      name: "",
      description: "",
      todoList: [],
      scheduleList: [],
      remarks: "",
      sFlag: false,
      tFlag: false
    };
  },
  watch: {},
  mounted() {
    let id = this.$route.query.id;
    console.log("id", id);
    this.getProjectDetail(id);
  },
  methods: {
    getProjectDetail(id) {
      projectApi.getProjectDetail(id).then(res => {
        if (res.code === 0) {
          this.name = res.result.name;
          this.description = res.result.description;
          this.todolist = res.result.todolist;
          this.scheduleList = res.result.scheduleList;
          console.log("list", this.scheduleList.length);
          this.remarks = res.result.remarks;
        } else {
          this.$Message.error(res.errorMsg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.outer {
  padding: 10px;
}
.border {
  border: 1px solid #d3c7c7;
  padding: 3px 6px;
  border-radius: 20px;
}
.pr-content {
  min-height: 100px;
}
.showall:hover {
  text-decoration: underline;
}
</style>
