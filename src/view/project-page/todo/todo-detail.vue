<template>
  <div class="listDetail">
    <!-- 定一层，姑且闲置 -->
    <!-- <div class="column-center" style="height:55px;padding:10px">
      <span class="mr-20 option">
        <b @click="toProject" class="mr-10 font-18">{{projectName}}</b>
      </span>
      <span class="mr-20">></span>
      <span class="mr-20 option" v-if="list_id">
        <b @click="toList" class="mr-10 font-18">{{listName}}</b>
      </span>
      <span class="mr-20" v-else>
        <span class="mr-10 font-18">清单外任务</span>
      </span>
    </div>-->
    <div class="column-center thisTitle flex-space-between flex-row">
      <!-- 顶部 -->
      <div>
        <router-link to="project" class="title-back option mr-10">我的任务集</router-link>/
        <a @click="toProject" class="title-back ml-10 option mr-10">{{projectName}}</a>/
        <span class="mr-10 ml-10 option" v-if="list_id">
          <b @click="toList">{{listName}}</b>
        </span>
        <span class="mr-10 ml-10 theme_font" v-else>
          <span>清单外任务</span>
        </span>
      </div>
      <div>
        <div class="option"></div>
      </div>
    </div>
    <Divider />
    <div class="flex-row min-main-height">
      <!-- 主体左侧 -->
      <div style="flex:auto" class="main">
        <!-- 概览层 -->
        <div style="padding:16px 0" class="font-24 todo-title column-center">
          <!-- <Checkbox v-model="finished" @on-change="changeFinishState(todo_id,finished)"></Checkbox> -->
          <vs-checkbox
            color="rgb(59,222,200)"
            v-model="finished"
            @click="changeFinishState(todo_id,finished)"
          ></vs-checkbox>
          <b
            v-if="titleInput===false"
            class="font-24 title"
            style="width:100%"
            @click="titleInput=true"
          >{{name}}</b>
          <b v-else class="font-24 title" style="width:100%">
            <Input v-model="name" placeholder="输入任务标题" @on-blur="editName"></Input>
          </b>
        </div>

        <div style="margin:0 0 16px 40px" class="flex-row">
          <!-- 时间修改 -->
          <div class="mr-20">
            <Dropdown v-if="timeShow===false ">
              <a href="javascript:void(0)" class="column-center" style="width:350px">
                <span class="option" href="javascript:void(0)">
                  <Icon size="30" type="md-calendar" />
                </span>
                <span
                  href="javascript:void(0)"
                  class="option ml-10 font-16"
                  style="color:gray"
                  v-if="endAt && endAt!==''"
                >{{startAt?(startAt):'' | showTime}}{{startAt?'-':''}}{{endAt |showTime}}</span>
                <span
                  href="javascript:void(0)"
                  class="option ml-10 font-16"
                  style="color:gray"
                  v-else
                >设置截止时间</span>
              </a>

              <DropdownMenu slot="list">
                <DropdownItem>
                  <div @click="chooseTime(0)">开始时间-截止时间</div>
                </DropdownItem>
                <DropdownItem>
                  <div @click="chooseTime(1)">截止时间</div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div v-else-if="timeShow===true">
              <DatePicker
                v-show="isEnd===true"
                type="datetime"
                :value="endAt"
                style="width:250px"
                placeholder="输入截止时间"
                @on-change="showTime1"
                @on-open-change="changeTime1"
              ></DatePicker>
              <DatePicker
                v-show="isEnd===false"
                type="datetimerange"
                v-model="timeList"
                style="width:350px"
                placeholder="输入截止时间段"
                @on-change="showTime2"
                @on-open-change="changeTime2"
              ></DatePicker>
            </div>
          </div>
          <div class="ml-20 column-center">
            <div>
              <Dropdown>
                <a href="javascript:void(0)" class="column-center">
                  <span class="option">
                    <Icon size="30" :color="getColor(level)" type="md-alert" />
                  </span>
                  <span class="ml-20 option" style="color:gray;">{{ getLevel}}</span>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="item in levelList" :key="item.id" :value="item.id">
                    <span class="column-center" @click="editLevel(item.id)">
                      <div :style="'height:16px;width:16px;background:'+item.color"></div>
                      <span class="ml-10">{{item.value}}</span>
                    </span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>

        <Divider></Divider>
        <!-- 详细更改层 -->
        <div style="padding:16px 0">
          <div class="column-center flex-row">
            <Icon size="20" type="md-pricetags" />
            <div class="form-width ml-20" style="width:100%">
              <Select
                v-model="thisTags"
                filterable
                multiple
                allow-create
                placeholder="选择标签"
                @on-change="editTags"
                @on-create="handleCreate"
              >
                <Option
                  v-for="(item,index) in tags"
                  :value="item.value"
                  :label="item.value"
                  :key="item.value"
                >
                  <div class="column-center">
                    <div :style="'height:16px;width:16px;background:'+item.color"></div>
                    <span class="ml-10">{{item.value}}</span>
                  </div>
                  <!-- TODO:如果自定义了内容显示，那么默认值会显示空壳 -->
                  <!-- {{item.value}} -->
                </Option>
              </Select>
            </div>
          </div>
          <div class="mt-10">
            <div class="flex-space-between">
              <Icon size="20" type="ios-paper-outline" />
              <div style="text-align:right" class="column-center">
                <!-- <span class="theme_font">
                  <img src="../../../assets/icon/long-arrow.png" class="long-arrow" />
                </span>-->
                <!-- <span class="ml-20 mr-20 font-24 theme_font option" @click="editDescription">保存</span> -->
                <vs-button style="width:150px" success floating @click="editDescription">保存</vs-button>

                <!-- <img src="../../../assets/icon/long-left.png" class="long-arrow" /> -->
              </div>
            </div>
            <div class="form-width ml-20 mt-10" style="width:100%">
              <!--DOWN:v-if会刷新视图，这里如果使用v-if 即使content有内容，Editor里也不会进行显示 -->
              <!-- <Editor
                v-show="isEditor===false"
                ref="editor"
                @on-change="handleChange"
                :value="content"
              ></Editor>-->
              <MavonEditor ref="mavon" :originText="content" @getEditor="getContent"></MavonEditor>
              <div>
                <span v-show="isEditor===true" v-html="content"></span>
                <Button
                  type="primary"
                  v-show="isEditor===true"
                  @click="showDescription"
                  class="mt-10"
                >编辑</Button>
              </div>
              <div v-show="isEditor===false" class="mt-20">
                <!-- <Button type="primary" @click="editDescription">保存</Button> -->
                <!-- <Button @click="cancelDES" type="default" class="ml-20">取消</Button> -->
              </div>
            </div>
          </div>
        </div>

        <Divider />
        <!--子任务层面 -->
        <div style="padding:16px 0">
          <div class="column-center flex-row">
            <Icon size="20" type="ios-options" />
            <div class="form-width ml-20" style="width:100%">子任务</div>
          </div>
          <div class="mt-20 ml-20">
            <div
              v-for="(item,index) in childTodos"
              :key="item._id"
              :value="item._id"
              @mouseover="onChildTodo(index)"
              @mouseleave="leaveChildTodo()"
              style="padding:8px 0 8px 16px"
              :class="['font-16', 'column-center',missHover===index?'':'every-todo']"
            >
              <vs-checkbox
                color="rgb(59,222,200)"
                v-model="item.finished"
                @click="changeFinishState(item._id,item.finished)"
              ></vs-checkbox>

              <div
                class="font-16 flex-space-between column-center"
                style="width:100%"
                v-show="item.showInput===false"
              >
                <div>{{item.name}}</div>
                <div class="column-center">
                  <div class="column-center">
                    <!-- <span class="mr-5">
                    <span
                      class="font-12"
                      style="border:1px solid gray;border-radius:20px;padding:2px;cursor:pointer"
                      v-show="item.endAt!==''"
                    >{{item.startAt?(item.startAt):'' | showTime}}{{item.startAt?'-':''}}{{item.endAt |showTime}}</span>
                    </span>-->
                    <span
                      v-show="index===childShowIndex"
                      class="option mr-5"
                      @click="deleteTodo(item._id)"
                    >
                      <Icon size="20" type="md-trash" />
                    </span>
                    <span
                      v-show="index===childShowIndex"
                      class="option mr-5"
                      @click="showChildInput(item._id,index) "
                    >
                      <Icon size="20" type="ios-brush" />
                    </span>
                    <span
                      v-show="item.status===1 || item.status===3"
                      class="mr-10 option"
                      @click.stop="changeState(item._id,2)"
                    >
                      <Icon type="md-play" />
                    </span>
                    <span
                      v-show="item.status===2"
                      class="mr-10 option"
                      @click.stop="changeState(item._id,3)"
                    >
                      <Icon type="md-pause" />
                    </span>
                  </div>
                </div>
              </div>
              <div v-show="item.showInput===true">
                <span class="font-24" style="width:auto">
                  <Input
                    ref="editChild"
                    v-model="item.name"
                    style="width:auto"
                    placeholder="输入任务标题"
                    @on-blur="editChildTodoName(item._id,item.name)"
                  ></Input>
                </span>
              </div>
            </div>

            <div v-if="childAddInput" style="padding:0 0 8px 16px" class="font-24 column-center">
              <!-- <Checkbox v-model="childTodoFinished" disabled></Checkbox> -->
              <vs-checkbox color="rgb(59,222,200)" v-model="childTodoFinished" disbled></vs-checkbox>

              <span class="font-24" style="width:100%">
                <Input
                  ref="addChild"
                  v-model="childTodoName"
                  placeholder="输入任务标题"
                  @on-blur="addChildTodoName"
                ></Input>
              </span>
            </div>
            <div class="option theme_font column-center">
              <span class="mr-20">
                <Icon size="20" type="md-add" />
              </span>
              <span @click=" showAddInput">添加子任务</span>
            </div>
          </div>
        </div>
      </div>
      <Divider class="horizontal" style="margin:0;height:auto" type="vertical" />
      <!-- 主体右侧 -->
      <div
        style="width:264px !important;background:#f6f6f6;padding: 16px 20px;"
        class="flex-column thisRight"
      >
        <div class="option" v-show="status===1 || status===3" @click="changeState(todo_id,2)">开始任务</div>
        <div class="option" v-show="status===2" @click="changeState(todo_id,3)">暂停任务</div>
        <div class="option" v-show="collected===false" @click="addCollected(todo_id)">添加收藏</div>
        <div class="option" v-show="collected===true" @click="removeCollected(todo_id)">取消收藏</div>
        <Dropdown placement="bottom">
          <div class="option" href="javascript:void(0)">切换清单</div>
          <DropdownMenu slot="list">
            <DropdownItem v-show="list_id">
              <span @click="removeList">清单外任务</span>
            </DropdownItem>
            <DropdownItem v-show="item._id!==list_id" v-for="item in listList" :key="item._id">
              <span @click="changeList(item._id)">{{item.name}}</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <Divider />
    <div style="height:80px"></div>
  </div>
</template>

<script>
import { projectApi } from "@/api";
// import Editor from "_c/editor/Editor";
import MavonEditor from "_c/editor/mavon-editor";
const moment = require("moment");
export default {
  name: "",
  components: {
    // Editor,
    MavonEditor
  },
  inject: ["reload"],
  data() {
    return {
      todo_id: "",
      project_id: "",
      list_id: "",
      parent_todo: "",
      name: "",
      startAt: "",
      endAt: "",
      timeList: [],
      isEnd: false,
      description: "",
      level: 2,
      thisTags: [],
      tagsShow: false,
      tags: [],
      status: 1,
      remarks: "",
      projectName: "",
      listName: "",
      finished: false,
      childTodos: [],
      childTodoName: "",
      titleInput: false,
      childTodoFinished: false,
      childShowIndex: -1,
      loading: "",
      childInputIndex: "",
      timeShow: false,
      childIdIndex: -1,
      childAddInput: false,
      collected: false,
      listList: [],
      missHover: -1,
      levelList: [
        { id: 1, value: "较低", color: "gray" },
        { id: 2, value: "普通", color: "green" },
        { id: 3, value: "较高", color: "yellow" },
        { id: 4, value: "最高", color: "red" }
      ],
      isEditor: false,
      content: ""
    };
  },
  mounted() {
    this.loading = this.$vs.loading({ type: "square" });
    this.todo_id = this.$route.query.todo_id;
    this.getTodoDetail();
    setTimeout(()=>{
       this.loading.close();
    },600)
  },
  filters: {
    showTime(time) {
      if (time === "") return "";
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  computed: {
    getLevel() {
      switch (this.level) {
        case 1:
          return "较低";
        case 2:
          return "普通";
        case 3:
          return "较高";
        case 4:
          return "最高";
      }
    }
  },
  watch: {
    content(newV, oldV) {
      // console.log(newV);
    }
  },
  methods: {
    getContent(markdown, html) {
      this.m_content = markdown;
      this.h_content = html;
      this.content = markdown;
    },
    handleChange(html) {
      this.content = html;
    },
    onChildTodo(index) {
      // console.log(index)
      this.childShowIndex = index;
    },
    leaveChildTodo() {
      this.childShowIndex = -1;
    },
    getTodoDetail() {
      projectApi.getTodoDetail(this.todo_id).then(res => {
        let result = res.result;
        this.name = result.name ? result.name : "";
        this.content = result.description;
        this.$refs.mavon.putContent(this.content);
        this.startAt = result.startAt;
        this.endAt = result.endAt;
        this.isEnd = result.isEnd;
        this.level = result.level;
        this.finished = result.finished;
        this.status = result.status;
        this.remarks = result.remarks;
        this.tags = result.projectTags;
        this.project_id = result.project_id;
        this.list_id = result.list_id ? result.list_id : "";
        this.parent_todo = result.parent_todo ? result.parent_todo : "";
        this.projectName = result.projectName;
        this.listName = result.listName ? result.listName : "";
        this.childTodos = result.childTodos ? result.childTodos : [];
        this.collected = result.collected;
        this.childTodos.map(item => {
          item.showInput = false;
        });

        this.$nextTick(() => {
          this.thisTags = [];
          result.tags.map(item => {
            this.thisTags.push(item.value);
          });
          this.getListList();
        });
      });
    },
    getListList() {
      console.log("asa", this.project_id);
      projectApi.getListList(this.project_id).then(res => {
        this.listList = res.result;
      });
    },
    toProject() {
      this.$router.push({
        name: "project-view",
        query: {
          id: this.project_id
        }
      });
    },
    changeFinishState(id, val) {
      let p = {
        todo_id: id,
        finished: !val
      };
      projectApi.changeFinishState(p).then(res => {
        if (res.code === 0) {
          this.getTodoDetail();
        }
      });
    },
    chooseTime(status) {
      this.isEnd = status ? true : false;
      this.timeShow = true;
    },
    showAddInput() {
      this.childAddInput = true;
      this.childTodos.map(item => {
        item.showInput = false;
      });
      this.$nextTick(() => {
        this.$refs.addChild.focus();
      });
    },
    showChildInput(id, index) {
      // console.log(index)
      this.childShowIndex = -1;
      this.missHover = index;
      this.childTodos.map(item => {
        if (item._id !== id) {
          item.showInput = false;
        } else {
          item.showInput = true;
        }
      });
      this.childAddInput = false;
      //   console.log(this.$refs["editChild"]);
      this.$nextTick(() => {
        this.$refs.editChild[index].focus();
      });
    },
    handleCreate(val) {
      let list = JSON.parse(JSON.stringify(this.tags));
      list.push({
        value: val,
        color: "skyblue"
      });
      let p = {
        project_id: this.project_id,
        tags: list
      };
      /**
       * @新增tag
       */
      projectApi.addTag(p).then(res => {
        if (res.code === 0) {
          this.getTodoDetail();
          setTimeout(() => {
            if (this.thisTags.length === 5) {
              this.$Message.error("选择标签不能超过五个");
              return;
            }
            this.thisTags.push(val);
            this.editTags();
          }, 100);
        } else {
          this.$Message.error(res.errorMsg);
        }
      });
    },
    showTags(val) {
      console.log("tagsL", val);
    },
    showTime1(val) {
      this.endAt = moment(val).format("YYYY-MM-DD HH:mm:ss");
      console.log("sasas", this.endAt);
    },
    showTime2(val) {
      this.startAt = moment(val[0]).format("YYYY-MM-DD HH:mm:ss");
      this.endAt = moment(val[1]).format("YYYY-MM-DD HH:mm:ss");
    },
    changeTime1(status) {
      if (status === true) return;
      console.log(this.endAt);
      let data = {
        isEnd: true,
        endAt: this.endAt,
        startAt: ""
      };
      this.editTodo(data);
      this.timeShow = false;
    },
    changeTime2(status) {
      if (status === true) return;
      console.log(this.endAt, this.startAt);
      let data = {
        isEnd: false,
        endAt: this.endAt,
        startAt: this.startAt
      };
      this.editTodo(data);
      this.timeShow = false;
    },
    toList() {
      this.$router.push({
        name: "list-detail",
        query: { list_id: this.list_id }
      });
    },
    getColor(level) {
      switch (level) {
        case 1:
          return "gray";
        case 2:
          return "green";
        case 3:
          return "orange";
        case 4:
          return "red";
      }
    },
    addChildTodoName() {
      let p = {
        project_id: this.project_id,
        parent_todo: this.todo_id,
        name: this.childTodoName
      };
      if (p.name === "") {
        this.childAddInput = false;
        return;
      }
      projectApi.addTodo(p).then(res => {
        if (res.code === 0) {
          this.childTodoName = "";
          this.getTodoDetail();
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
          this.getTodoDetail();
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
              this.getTodoDetail();
            } else {
              this.$Message.error(res.errorMsg);
            }
          });
        },
        onCancel: () => {}
      });
    },
    editTodo(data) {
      let p = {
        id: this.todo_id,
        data: data
      };
      projectApi.editTodo(p).then(res => {
        if (res.code === 0) {
          this.getTodoDetail();
        }
      });
    },
    editDescription() {
      let p = {
        description: this.content
      };
      this.editTodo(p);
      this.$Message.success("修改成功");
    },
    editName() {
      if (this.name === "") {
        return;
      }
      this.titleInput = false;
      this.editTodo({ name: this.name });
    },
    editChildTodoName(id, name) {
      if (name === "") {
        this.getTodoDetail();
        return;
      }
      let p = {
        id: id,
        data: {
          name: name
        }
      };
      projectApi.editTodo(p).then(res => {
        if (res.code === 0) {
          this.childTodos.map(item => {
            if (item._id === id) {
              item.showInput = false;
              //   console.log(item.showInput)
            }
          });
          //   this.reload();
          this.missHover = -1;
        }
      });
    },
    editLevel(id) {
      this.level = id;
      this.editTodo({ level: id });
    },
    setHTML(html) {
      // this.$refs.editor.setHtml(html);
    },
    editTags() {
      if (this.thisTags.length >= 6) {
        this.$Message.error("选择标签不能超过五个！");
        this.thisTags.pop();
        return;
      }
      let tags = [];
      this.thisTags.map(item => {
        for (let val of this.tags) {
          if (item === val.value) {
            tags.push({
              value: item,
              color: val.color
            });
          }
        }
      });
      this.editTodo({ tags: tags });
    },
    showDescription() {
      this.isEditor = false;
      this.setHTML(this.content);
    },
    addCollected() {
      this.editTodo({ collected: true });
    },
    removeCollected() {
      this.editTodo({ collected: false });
    },
    removeList() {
      //将清单ID移除
      let id = this.todo_id;
      projectApi.removeOutList(id).then(res => {
        if (res.code === 0) {
          this.getTodoDetail();
        }
      });
    },
    changeList(list_id) {
      this.editTodo({ list_id: list_id });
    },
    cancelDES() {
      console.log(this.content);
      this.isEditor = true;
    }
  }
};
</script>

<style lang="less" scoped>
.listDetail {
  .ivu-divider-horizontal {
    margin: 0;
  }
  // .ivu-select-dropdown{
  //   z-index: 99999999 !important;
  // }
}
.main {
  padding: 0 24px;
}
</style>

<style lang="less">
.todo-title {
  .ivu-checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ivu-input {
    border: 0;
    font-size: 24px;
    font-weight: bolder;
  }
  .ivu-checkbox-inner {
    height: 30px !important;
    width: 30px !important;
    box-shadow: inset;
  }
  .ivu-checkbox-inner:after {
    height: 16px;
    width: 16px;
    top: 1px;
  }
  .ivu-select-selection {
    //   width: 100% !important;
    border: 0 !important;
  }
}
.title:hover {
  cursor: nw-resize;
  border-bottom: 1px dashed gray;
}
.thisTitle {
  height: 50px;
  padding: 5px 20px;
  background: rgba(168, 204, 204, 0.13);
}
.title-back {
  color: black;
}
.long-arrow {
  width: 40px;
}
.border {
  height: 20px;
  width: 20px;
  padding: 3px 6px;
  border-radius: 20px;
}

.timeCard {
  position: absolute;
  background: #ffffff;
  height: 400px;
  top: 240px;
  width: 350px;
  z-index: 3;
  border-radius: 6px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.16);
}
.every-todo {
  width: 100%;
  padding: 0 10px 0 10px;
}
.every-todo:hover {
  border-radius: 20px;
  background: #dee9de;
}
.thisRight {
  text-align: center;
  width: 264px !important;
}
</style>