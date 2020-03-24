<template>
  <div class="listDetail">
    <!-- 归属层 -->
    <!-- <div style="height:55px ;padding:20px" class="column-center">
      <b>
        <span class="option ml-10" @click="toProject">{{projectName}}</span>
      </b>
    </div>-->
    <div class="column-center thisTitle flex-space-between flex-row">
      <!-- 顶部 -->
      <div>
        <router-link :to="{name:'project'}" class="title-back option mr-10">我的任务集</router-link>/
        <router-link
          :to="{name:'project-view',query:{id:project_id,projectName:projectName}}"
          class="title-back option ml-10"
        >{{projectName}}</router-link>
      </div>
      <div>
        <div class="option">
          <router-link class="option theme_font" :to="{name:'list-set',query:{id:list_id}}">设置</router-link>
        </div>
      </div>
    </div>
    <Divider />
    <div class="flex-row min-main-height">
      <!-- 主体左侧 -->
      <div style="flex:auto;padding:0 24px">
        <b class="font-24 mt-10 mb-20">
          任务清单：
          <span class="ml-20 theme_font">{{listName}}</span>
        </b>

        <div style="width:100%">
          <!-- 效果 -->
          <div
            v-for="item in todos"
            :key="item._id"
            @mouseover="onListTodo(item._id)"
            @mouseleave="leaveListTodo()"
          >
            <div
              class="column-center flex-space-between every-todo font-16"
              style="padding:5px 10px"
              @click="toTodo(item._id)"
            >
              <div class="every-right option font-16">
                <Checkbox
                  v-model="item.finished"
                  @on-change.stop="changeFinishState(item._id,item.finished)"
                ></Checkbox>
                {{item.name}}
                <span v-show="item.level!==2" class="option">
                  <Icon size="20" :color="getColor(item.level)" type="md-warning" />
                </span>
                <span v-for="val in item.tags" :key="val.value">
                  <span
                    class="ml-5 font-12"
                    :style="'color:white;padding:3px 8px;border-radius:20px;background:'+val.color"
                  >{{val.value}}</span>
                </span>
              </div>
              <div class="every-left column-center">
                <div v-show="item._id===todoIdIndex">
                  <!-- 截止时间设置 -->
                  <span class="mr-5">
                    <span
                      class="font-12"
                      style="border:1px solid gray;border-radius:20px;padding:2px;cursor:pointer"
                      v-show="item.endAt!==''"
                    >{{item.startAt?(item.startAt):'' | showTime}}{{item.startAt?'-':''}}{{item.endAt |showTime}}</span>
                  </span>
                  <span class="ml-10 mr-5 option" @click.stop="deleteTodo(item._id)">
                    <Icon size="20" type="md-trash" />
                  </span>
                  <span
                    v-show="item.status===1 || item.status===3"
                    class="mr-5 option"
                    @click.stop="changeState(item._id,2)"
                  >
                    <Icon type="md-play" />
                  </span>
                  <span
                    v-show="item.status===2"
                    class="mr-5 option"
                    @click.stop="changeState(item._id,3)"
                  >
                    <Icon type="md-pause" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- /添加新任务 -->
          <div>
            <button
              class="theme_font font-12 ml-20 option this_button"
              @click="addListTodo(list_id)"
            >添加新任务</button>
          </div>
        </div>
      </div>
      <!-- <Divider class="horizontal" style="margin:0;height:auto" type="vertical" /> -->
      <!-- 主体右侧 -->
      <!-- <div class="row-center" style="width:264px;background:#f6f6f6;padding:20px"> -->
      <!-- 操作部分 -->
      <!-- <a class="option-delete" @click="deleteList">删除</a>
      </div>-->
    </div>
    <Modal
      v-model="todoListAdd"
      title="新增任务"
      fullscreen
      :styles="{top:0}"
      footer-hide
    >
      <TodoAdd
        :todoAdd.sync="todoListAdd"
        :projectId="project_id"
        :tags.sync="tags"
        :listId="list_id"
        @getDetail="getListDetail"
      ></TodoAdd>
    </Modal>
  </div>
</template>

<script>
import { projectApi } from "@/api";
import TodoAdd from "_c/todo/todo-add.vue";
const moment = require("moment");
export default {
  name: "list-detail",
  components: {
    TodoAdd
  },
  inject: ["reload"],
  data() {
    return {
      list_id: "",
      project_id: "",
      createdAt: "",
      updatedAt: "",
      todoListAdd: false, // 新建任务
      listName: "",
      projectName: "",
      description: "",
      archived: false,
      todos: [],
      todoIdIndex: -1,
      tags: []
    };
  },
  mounted() {
    this.list_id = this.$route.query.list_id;
    this.getListDetail();
  },
  filters: {
    showTime(time) {
      if (time === "") return "";
      return moment(new Date(time)).calendar();
    }
  },
  methods: {
    getListDetail() {
      projectApi.getListDetail(this.list_id).then(res => {
        let result = res.result;
        this.projectName = result.projectName;
        this.listName = result.name;
        this.project_id = result.project_id;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
        this.todos = result.todos;
        this.description = result.description;
        this.tags = result.tags;
      });
    },
    getColor(level) {
      switch (level) {
        case 1:
          return "gray";
        case 3:
          return "orange";
        case 4:
          return "red";
      }
    },
    changeFinishState(id, status) {
      let p = {
        todo_id: id,
        finished: status
      };
      projectApi.changeFinishState(p).then(res => {
        if (res.code === 0) {
          this.getListDetail();
        }
      });
    },
    changeState(id, status) {
      let p = {
        todo_id: id,
        status: status
      };
      projectApi.changeState(p).then(res => {
        if (res.code === 0) {
          this.getListDetail();
        }
      });
    },
    toProject() {
      this.$router.push({
        name: "project-view",
        query: { id: this.project_id }
      });
    },
    addListTodo() {
      this.todoListAdd = true;
    },
    onListTodo(id) {
      this.todoIdIndex = id;
    },
    leaveListTodo() {
      this.todoIdIndex = "";
    },
    toTodo(id) {
      this.$router.push({
        name: "todo-detail",
        query: { todo_id: id }
      });
    },
    deleteTodo(id) {
      this.$Modal.confirm({
        title: "删除",
        content: "确定要删除么？",
        onOk: () => {
          projectApi.deleteTodo(id).then(res => {
            if (res.code === 0) {
              this.$Message.success("删除成功");
              this.getListDetail();
            } else {
              this.$Message.error(res.errorMsg);
            }
          });
        },
        onCancel: () => {}
      });
    },
    deleteList() {
      this.$Modal.confirm({
        title: "删除",
        content: "该操作会删除清单内所有任务，确定要删除么？",
        onOk: () => {
          projectApi.deleteList(this.list_id).then(res => {
            if (res.code === 0) {
              this.$Message.success("删除成功");
              this.$router.push({
                name: "project-view",
                query: { id: this.project_id }
              });
              // setTimeout( ()=>{
              //  window.location.reload()
              // },100)
            } else {
              this.$Message.error(res.errorMsg);
            }
          });
        },
        onCancel: () => {}
      });
    }
  }
};
</script>

<style lang="less" scoped>
.listDetail {
  .ivu-divider-horizontal {
    margin: 0;
  }
}
.thisTitle {
  height: 50px;
  padding: 5px 20px;
  background: rgba(168, 204, 204, 0.13);
}
.title-back {
  color: black;
}
.every-todo {
  margin-top: 5px;
  margin-bottom: 5px;
  width: 100%;
  padding: 0 0 0 10px;
}
.every-left {
}
.every-left:hover {
  // background:#112211
}
.every-right {
  // width:100%;
}
.every-todo:hover {
  border-radius: 20px;
  background: #dee9de;
}
.this_button {
  border: 0;
}
</style>