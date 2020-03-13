<template>
  <div class="thisProjectView">
    <!-- <div class="flex-space-between">
      <div>
        <b class="font-32">{{name}}</b>
        <div>{{description}}</div>
      </div>
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
    </div> -->
     <div class="column-center thisTitle flex-space-between flex-row">
      <!-- 顶部 -->
      <div>
        <router-link to="project" class="title-back option mr-10">我的任务集</router-link>/
        <span class="theme_font ml-10">{{name}}</span>
      </div>
      <div class="flex-row">
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
    <Divider />
    {{description}}
    <Divider/>
    <!-- 任务层 -->
    <!-- FIXME:待完成：1.拖拽，移动 
    2. 鱼骨视图（暂时不做）-->
    <div class="this-content">
    <div class="mb-20  ">
      <div class="flex-space-between">
        <div class="column-center xy-button">
          <b class="font-24 mr-20">任务</b>
          <Button type="default" @click="addDiv">添加任务</Button>
          <span class="dropdown flex-all-center">
            <Dropdown trigger="click">
              <a href="javascript:void(0)">
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>
                  <div @click="addDiv">
                    <Icon size="16" type="md-checkbox-outline" />
                    <span>添加任务</span>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div @click="addList">
                    <Icon type="md-list" />
                    <span>添加清单</span>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </span>
        </div>
        <div class="flex-row column-center">
          <!-- <div class="mr-10 option border">
            <Icon size="16" type="ios-cube-outline" />
          </div>
          <div class="mr-10 option border">
            <Icon size="16" type="md-crop" />
          </div>-->
          <div></div>
        </div>
      </div>
      <!-- 新建清单层面 -->
      <div v-show="listAdd">
        <div class="padding:10px 0;margin:10px">
          <Input v-model="listName" placeholder="输入域清单名称"></Input>
          <Input v-model="listDescription" placeholder="补充说明（可选）"></Input>
          <div>
            <Button type="default" @click="cancelAddList">取消</Button>
            <Button type="primary" @click="handleAddList">确认</Button>
          </div>
        </div>
      </div>
      <!-- FIXME: 任务对象 -->
      <div style="padding:10px 0;width:100%;">
        <b class="mt-20 font-18">清单外任务</b>
        <div class="column-center">
          <div v-if="todoList.length===0" class="column-center">
            <Icon size="32" color="gray" type="md-checkbox-outline" />
            <span class="ml-20">建立任务，明确成员工作目标</span>
          </div>
          <div v-else style="width:100%">
            <!-- 效果 -->
            <div
              v-for="(item,index) in todoList"
              :key="item._id"
              @mouseover="onTodo(index)"
              @mouseleave="leaveTodo(index)"
            >
              <div
                class="column-center flex-space-between every-todo font-16"
                style="padding:5px 10px"
                @click="toTodo(item._id)"
              >
                <div class="every-right font-16 column-center">
                  <Checkbox
                    v-model="item.finished"
                    @click.native.stop="changeFinishState(item._id,item.finished)"
                  ></Checkbox>
                  <span class="option mr-10">{{item.name}}</span>
                  <span v-show="item.level!==2" @click.stop="stopMao">
                    <Icon size="20" :color="getColor(item.level)" type="md-warning" />
                  </span>
                  <span v-for="val in item.tags" :key="val.value" class="column-center">
                    <span
                      class="ml-5 font-12 every-padding"
                      @click.stop="stopMao"
                      :style="'color:white;padding:0 6px;border-radius:20px;border:1px solid gray;padding:3px;background:'+val.color"
                    >{{val.value}}</span>
                  </span>
                </div>
                <div class="every-left column-center">
                  <div>
                    <!-- 截止时间设置 -->
                    <span class="mr-5">
                      <span
                        class="font-12 every-padding"
                        style="border:1px solid gray;border-radius:20px;padding:2px;cursor:pointer"
                        v-show="item.endAt!==''"
                        @click.stop="stopMao"
                      >{{item.startAt?(item.startAt):'' | showTime}}{{item.startAt?'-':''}}{{item.endAt |showTime}}</span>
                    </span>
                    <span
                      class="ml-10 mr-5 option"
                      v-show="index===todoIndex"
                      @click="deleteTodo(item._id)"
                    >
                      <Icon size="20" type="md-trash" />
                    </span>
                    <span
                      v-show=" index===todoIndex &&(item.status===1 || item.status===3)"
                      class="mr-5 option"
                      @click.stop="changeState(item._id,2)"
                    >
                      <Icon type="md-play" />
                    </span>
                    <span
                      v-show="index===todoIndex && item.status===2"
                      class="mr-5 option"
                      @click.stop="changeState(item._id,3)"
                    >
                      <Icon type="md-pause" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="todoAdd">
        <div class="todoadd" style="padding:0 0;width:100%">
          <TodoAdd
            :todoAdd.sync="todoAdd"
            :projectId="projectId"
            :isOuter="isOuter"
            :tags.sync="tags"
            @getDetail="getProjectDetail"
          ></TodoAdd>
        </div>
      </div>
      <!-- 清单项目 -->
      <div v-for="(value,key,i) in every_list" :key="key" :value="value.list_id">
        <b class="font-18 option" @click="toList(value.list_id)">{{'清单:'+key}}</b>
        <div class="mb-10">{{value.description}}</div>

        <div style="width:100%">
          <!-- 效果 -->
          <div
            v-for="(item,index) in value.todoList"
            :key="item._id"
            @mouseover="onListTodo(item._id)"
            @mouseleave="leaveListTodo()"
          >
            <div
              class="column-center flex-space-between every-todo font-16"
              style="padding:5px 10px"
              @click="toTodo(item._id)"
            >
              <div class="every-right font-16 column-center">
                <Checkbox
                  v-model="item.finished"
                  @click.native.stop="changeFinishState(item._id,item.finished)"
                ></Checkbox>
                <span class="option mr-10">{{item.name}}</span>
                <span v-show="item.level!==2" @click.stop="stopMao">
                  <Icon size="20" :color="getColor(item.level)" type="md-warning" />
                </span>
                <span v-for="val in item.tags" :key="val.value" class="column-center">
                  <span
                    class="ml-5 font-12 every-padding"
                    @click.stop="stopMao"
                    :style="'color:white;padding:0 6px;border-radius:20px;border:1px solid gray;padding:3px;background:'+val.color"
                  >{{val.value}}</span>
                </span>
                <span>
                  <!-- 子任务与完成数量 -->
                  <!-- 因数据库设计问题，需要繁杂请求，暂时不做 -->
                </span>
              </div>
              <div class="every-left column-center">
                <div>
                  <!-- 截止时间设置 -->
                  <span class="mr-5">
                    <span
                      class="font-12 every-padding"
                      style="border:1px solid gray;border-radius:20px;padding:2px;cursor:pointer"
                      v-show="item.endAt!==''"
                      @click.stop="stopMao"
                    >{{item.startAt?(item.startAt):'' | showTime}}{{item.startAt?'-':''}}{{item.endAt |showTime}}</span>
                  </span>
                  <span
                    class="ml-10 mr-5 option"
                    v-show="item._id===todoIdIndex"
                    @click.stop="deleteTodo(item._id)"
                  >
                    <Icon size="20" type="md-trash" />
                  </span>
                  <span
                    v-show=" item._id===todoIdIndex && (item.status===1 || item.status===3)"
                    class="mr-5 option"
                    @click.stop="changeState(item._id,2)"
                  >
                    <Icon type="md-play" />
                  </span>
                  <span
                    v-show=" item._id===todoIdIndex && item.status===2"
                    class="mr-5 option"
                    @click.stop="changeState(item._id,3)"
                  >
                    <Icon type="md-pause" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- /添加新任务 -->
        <div>
          <button
            v-if="todoListAdd===false"
            class="theme_font font-12 ml-20 option this_button"
            @click="addListTodo(value.list_id)"
          >添加新任务</button>
          <button
            v-if="todoListAdd===false"
            class="theme_font font-12 ml-20 option-delete this_button"
            @click="deleteList(value.list_id)"
          >删除此清单</button>
          <div v-if="todoListAdd && value.list_id === list_id">
            <TodoAdd
              :todoAdd.sync="todoListAdd"
              :projectId="projectId"
              :tags.sync="tags"
              :listId="value.list_id"
              @getDetail="getProjectDetail"
            ></TodoAdd>
          </div>
        </div>
      </div>
      <!-- 展示更多信息 -->
      <!-- <span class="option font-12 showall mb-20">查看全部任务</span> -->
    </div>
    <!-- 日程层面 -->
    <!-- 日程具体内容 -->
    <div class="mb-20 mt-20">
      <div class="flex-space-between">
        <div class="column-center xy-button">
          <b class="font-24 mr-20">日程</b>
          <Button type="default" @click="showSchedule">添加日程</Button>
        </div>
      </div>
      <!-- 日程具体内容 -->
      <div class="pr-content" style="padding:20px 0">
        <div v-if="scheduleList.length===0 || schedule===true" class="column-center">
          <Icon size="32" color="gray" type="md-calendar" />
          <span class="ml-20">提前安排日程，项目进度不耽误</span>
        </div>
        <div v-else>
          <div v-for="(item,index) in scheduleList" :key="item.id" class="every-schedule">
            <div class="column-center">
              <!-- 左边显示时间 -->

              <div class="mr-20">{{item.startAt | calendatTime}} - {{item.endAt |calendatTime}}</div>
              <!-- 右边显示标题 -->
              <div class="ml-20 font-20 ">{{item.title}}</div>
            </div>
            <!-- 显示概览信息 -->
            <div >
              <span> 提醒方式：</span><span class="ml-5">{{item.notice | noticeType}}</span>
              <span class="ml-20" v-show="item.address"> 工作地点: {{item.address}}</span>
               <span class="ml-20 schdeule-description" style="description" v-show="item.description" > 描述： <span style="color:gray">{{item.description}}</span></span>

            </div>
            <div>
              <!-- 显示操作信息 -->
              <span class="option theme_font font-12" @click="toSchedule(item._id)">编辑日程</span>
              <span class="option theme_font ml-20 font-12" @click="deleteSchedule(item._id)">删除日程</span>
            </div>

            <Divider class="every-divider" />
          </div>
        </div>
        <!-- 添加任务 -->
        <div v-show="schedule">
          <ScheduleAdd
            :schedule.sync="schedule"
            :projectId="projectId"
            @getDetail="getProjectDetail"
          ></ScheduleAdd>
        </div>
      </div>
      <!-- 展示更多信息 -->
      <span class="option font-12 showall mb-20">查看全部日程</span>
    </div>
    <!-- 备注层 -->
    </div>
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
import TodoAdd from "_c/todo/todo-add.vue";
import ScheduleAdd from "_c/todo/schedule-add.vue";
const moment = require("moment");
export default {
  name: "",
  components: {
    TodoAdd,
    ScheduleAdd
  },
  inject: ["reload"],
  data() {
    return {
      projectId: "",
      name: "",
      description: "",
      todoList: [], //清单外任务列表
      every_list: {}, //每项任务清单
      scheduleList: [],
      tags: [],
      remarks: "",
      level: -1,
      todoIndex: -1,
      isOuter: false,
      todoAdd: false,
      listAdd: false,
      todoListAdd: false,
      listIndex: -1,
      todoIdIndex: "",
      listName: "",
      listDescription: "",
      cahg: [-1],
      schedule: false
    };
  },
  watch: {
    todoAdd(newV, oldV) {}
  },
  mounted() {
    let id = this.$route.query.id;
    this.projectId = id;
    this.getProjectDetail();
  },
  filters: {
    calendatTime(val) {
      return moment(val).format("YYYY-MM-DD");
    },
    showTime(time) {
      if (time === "") return "";
      return moment(new Date(time)).calendar();
    },
    noticeType(val){
      switch(val){
        case 0:
          return "不提醒"
        case 1:
          return "日程开始时"
        case 2:
          return "提前5分钟"
        case 3:
          return "提前15分钟"
        case 4:
          return "提前30分钟"
        case 5:
          return "提前一小时"
        case 6:
          return "提前一天"
      }
    }
  },
  methods: {
    getProjectDetail() {
      projectApi.getProjectDetail(this.projectId).then(res => {
        console.log("res", res);
        this.name = res.result.name;
        this.description = res.result.description;
        this.todoList = res.result.todoList.offList.todoList;
        for (let key in res.result.todoList) {
          if (key !== "offList") {
            console.log("as");
            this.$set(this.every_list, key, res.result.todoList[key]);
          }
        }
        this.scheduleList = res.result.scheduleList;
        this.tags = res.result.tags;
        this.remarks = res.result.remarks;
      });
    },
    addDiv() {
      this.todoListAdd = false;
      setTimeout(() => {
        this.todoAdd = true;
      });
    },
    addListTodo(id) {
      this.todoAdd = false;
      this.list_id = id;
      setTimeout(() => {
        this.todoListAdd = true;
      }, 10);
    },
    addList() {
      this.listAdd = true;
    },

    onTodo(index) {
      this.todoIndex = index;
    },
    onListTodo(id) {
      this.todoIdIndex = id;
    },
    onTodoList(i) {
      this.listIndex = i;
    },
    leaveTodoList() {
      this.listIndex = -1;
    },
    leaveTodo(index) {
      this.todoIndex = -1;
    },
    leaveListTodo() {
      this.todoIdIndex = "";
    },
    toSchedule(val) {
      this.$router.push({
        name: "schedule",
        query: {
          id: val
        }
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
              this.getProjectDetail();
            } else {
              this.$Message.error(res.errorMsg);
            }
          });
        },
        onCancel: () => {}
      });
    },
    cancelAddList() {
      this.listAdd = false;
    },
    handleAddList() {
      let p = {
        project_id: this.projectId,
        name: this.listName,
        description: this.listDescription
      };
      if (p.name === "") {
        this.$Message.error("请输入清单名");
        return;
      }

      projectApi.addList(p).then(res => {
        if (res.code === 0) {
          this.$Message.success("新建清单成功");
          this.listAdd = false;
          this.initAddList();
          this.getProjectDetail();
        } else {
          this.$Message.error(res.errorMsg);
        }
      });
    },
    /**
     * @删除清单内所有任务
     */
    deleteList(id) {
      this.$Modal.confirm({
        title: "删除",
        content: "该操作会删除清单内所有任务，确定要删除么？",
        onOk: () => {
          projectApi.deleteList(id).then(res => {
            if (res.code === 0) {
              this.$Message.success("删除成功");
              this.getProjectDetail();
              // setTimeout( ()=>{
              //  window.location.reload()
              // },100)
              this.reload();
            } else {
              this.$Message.error(res.errorMsg);
            }
          });
        },
        onCancel: () => {}
      });
    },
    initAddList() {
      this.listName = "";
      this.listDescription = "";
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
        finished: !status
      };
      projectApi.changeFinishState(p).then(res => {
        if (res.code === 0) {
          this.getProjectDetail();
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
          this.getProjectDetail();
        }
      });
    },
    toTodo(id) {
      this.$router.push({
        name: "todo-detail",
        query: { todo_id: id }
      });
    },
    toList(id) {
      this.$router.push({
        name: "list-detail",
        query: { list_id: id }
      });
    },
    stopMao() {},
    showSchedule() {
      this.schedule = true;
    },
    deleteSchedule(id){
       this.$Modal.confirm({
        title: "删除",
        content: "确定要删除此日程么？",
        onOk: () => {
          projectApi.deleteSchedule(id).then(res => {
            if (res.code === 0) {
              this.$Message.success("删除成功");
              this.getProjectDetail();
              // setTimeout( ()=>{
              //  window.location.reload()
              // },100)
              this.reload();
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
.thisProjectView {
  // overflow: initial;
  // padding: 20px;
  .ivu-divider-horizontal {
    margin: 0;
  }
}
.thisTitle {
  height: 50px;
  padding: 5px 20px;
  background: rgba(168, 204, 204, 0.13);
}
.this-content{
  padding: 24px;
}
.title-back{
  color: black;
}
.border {
  border: 1px solid #ebe6e6;
  padding: 3px 6px;
  border-radius: 20px;
}
.pr-content {
  min-height: 100px;
}
.showall:hover {
  text-decoration: underline;
}
.xy-button {
  .dropdown {
    height: 32px;
    width: 32px;
    border-radius: 0 4px 4px 0;
    border: 1px solid #dacece;
    .ivu-btn {
      border-radius: 4px 0 0 4px !important;
    }
  }
}
.todoadd {
  // border: 1px solid gray;
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
.showTitle {
  padding: 5px;
}
.showTitle:hover {
  background: #fcf0f0;
  // padding:5px 0;
  border-radius: 20px;
}
.every-padding {
  padding: 0 6px !important;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif !important;
}
.every-schedule {
  margin: 0 50px;
  width: 100%;
}
.every-divider {
  overflow: hidden;
  right: 30px;
  margin:10px;
}
.schdeule-description{

}
</style>
