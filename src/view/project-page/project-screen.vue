<template>
  <div class="thisTodo">
    <div class="column-center flex-space-between thisTitle flex-row">
      <div class="column-center">
        <span class="myTitle font-bolder theme_font mr-10">ALL My Todos</span>
        <span>
          /
          <span class="ml-10 show-type font-bolder">{{type | showType}}</span>
        </span>
      </div>
    </div>
    <Divider />
    <div class="all-content">
      <div v-for="item in todoList" :key="item._id" class="every-todo-this theme_border_1">
        <div>
          <span class="mr-20 font-bolder">标题:</span>
          <router-link
            :to="{name:'todo-detail',query:{todo_id:item._id}}"
            class="theme_font font-bolder"
          >{{item.name}}</router-link>
        </div>
        <div>
          <span class="mr-20 font-bolder">任务集:</span>
          <router-link
            :to="{name:'project-view',query:{id:item.project_id}}"
            class="option font-bolder"
            style="color:black"
          >{{item.projectName}}</router-link>
        </div>
        <div>
          <span class="mr-20 font-bolder">创建时间:</span>
          <span>{{item.createdAt | showCreateTime}}</span>
        </div>
        <div v-show="type!==1">
          <div v-show="item.startAt">
            <span class="mr-20 font-bolder">开始时间:</span>
            <span>{{item.start | showDoTime}}</span>
          </div>
          <div>
            <span class="mr-20 font-bolder">截止时间:</span>
            <span>{{item.endAt | showDoTime }}</span>
          </div>
        </div>
        <div v-show="item.child.length!==0" class="flex-row">
          <div class="font-bolder mr-20">子任务:</div>
          <div>
            <div v-for=" le in item.child" :key="le._id">{{le.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { projectApi } from "@/api";
const moment = require("moment");
export default {
  name: "screen", //任务筛选器
  data() {
    return {
      type: 0,
      todoList: []
    };
  },
  filters: {
    showType(val) {
      switch (val) {
        case 1:
          return "未安排任务";
        case 2:
          return "已延误任务";
        case 3:
          return "本周任务";
      }
    },
    showCreateTime(val) {
      return moment(val).format("YYYY年M月D日HH时mm分ss秒");
    },
    showDoTime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm");
    }
  },
  mounted() {
    this.type = this.$route.query.type;
    this.getTodoList();
  },
  methods: {
    getTodoList() {
      //根据筛选条件或许任务
      let p = {
        todoType: Number(this.type)
      };
      projectApi.getTodoList(p).then(res => {
        this.todoList = res.result;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.thisTodo {
  .ivu-divider {
    margin: 0;
  }
}
.thisTitle {
  height: 50px;
  padding: 10px;
  width: 962px;
  background: rgba(168, 204, 204, 0.13);
}
.myTitle {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 24px;
}
.show-type {
  font-size: 24px;
}
.all-content {
  padding: 20px 24px;
  column-count: 3;
}
.every-todo-this {
  margin-bottom: 20px;
  padding: 5px 8px;
//   border: 1px solid #00ff00;
  -webkit-column-break-inside: avoid;
  break-inside: avoid;
}
.every-todo-this:hover{
    background: radial-gradient(#bef7ff,#c9ffc9,#ffedfe,#f3ebdd,#bbfff4);
    border-radius: 4px;
}
</style>