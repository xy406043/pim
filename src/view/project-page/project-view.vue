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
    </div>-->
    <div class="column-center thisTitle flex-space-between flex-row">
      <!-- 顶部 -->
      <div>
        <router-link to="project" class="title-back option mr-10">我的任务集</router-link>/
        <span class="theme_font ml-10">{{name}}</span>
      </div>
      <div class="flex-row">
        <div class="flex-center ml-20 option" @click="toProgress">
          <Icon type="md-pulse" />
          <span class="ml-5">进展</span>
        </div>
        <div class="flex-center ml-20 option" @click="toSetting">
          <Icon size="14" type="md-settings" />
          <span class="ml-5">设置</span>
        </div>
      </div>
    </div>
    <Divider />
    <!-- 任务集基本信息 -->
    <div class="main-info">
      <div class="main-title">
        任务集:
        <span class="theme_font font-bolder">{{name}}</span>
      </div>
      <div class="project-notice mb-10">任务既可以是普通的任务，也可以是目标，更可以是问题哦！！！</div>
      <div v-show="description">
        <span class="main-description mr-20">描述</span>
        <span>{{description}}</span>
      </div>
    </div>
    <Divider />
    <!-- 任务层 -->
    <!-- FIXME:待完成：1.拖拽，移动 
    2. 鱼骨视图（暂时不做）-->
    <div class="this-content">
      <div class="mb-20">
        <div class="flex-space-between">
          <div class="column-center xy-button">
            <b class="font-24 mr-20">任务</b>
            <vs-button dashed border dark type="default" @click="addDiv">
              <span class="font-bolder">添加任务</span>
            </vs-button>
            <vs-button class="ml-20" dashed border dark type="default" @click="addList">
              <span class="font-bolder">添加清单</span>
            </vs-button>
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
        <div v-show="listAdd" class="add-list">
          <div class="padding:10px 0;margin:10px">
            <div class="flex-row column-center">
              <span class="min-width font-bolder">清单名:</span>
              <!-- <Input class="mb-10" v-model="listName" placeholder="输入域清单名称"></Input> -->
              <vs-input style="width:100%" class="mb-10" v-model="listName" placeholder="输入清单名称"></vs-input>
            </div>
            <div class="flex-row column-center">
              <span class="min-width font-bolder">清单描述:</span>
              <Input class="mb-10" type="textarea" v-model="listDescription" placeholder="补充说明（可选）"></Input>
            </div>
            <div class="button-set flex-row">
              <!-- <Button type="default" @click="cancelAddList">取消</Button>
              <Button class="ml-20" type="primary" @click="handleAddList">确认</Button>-->
              <vs-button dark dashed style="width:150px" @click="cancelAddList">取消</vs-button>
              <vs-button success dashed style="width:150px" class="ml-20" @click="handleAddList">确认</vs-button>
            </div>
          </div>
        </div>
        <!-- FIXME: 任务对象 -->
        <div style="width:100%;">
          <div class="column-center">
            <div v-if="todoList.length===0" class="pr-content" style="padding:20px 0">
              <Icon size="32" color="gray" type="md-checkbox-outline" />
              <span class="ml-20">建立任务，明确成员工作目标</span>
            </div>
            <div v-else style="width:100%">
              <b class="mt-20 font-18 theme_font">清单外任务</b>
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
                    <vs-checkbox
                      color="rgb(59,222,200)"
                      v-model="item.finished"
                      @click.native.stop="changeFinishState(item._id,item.finished)"
                    ></vs-checkbox>
                    <span @click.stop="stopMao">
                      <Icon size="24" :color="getColor(item.level)" type="md-alert" />
                    </span>
                    <span class="option mr-10 every-main-title">{{item.name}}</span>
                    <span v-for="val in item.tags" :key="val.value" class="column-center">
                      <span
                        class="ml-5 font-12 every-padding"
                        @click.stop="stopMao"
                        :style="'color:white;white-space:nowrap;padding:0 6px;border-radius:20px;padding:3px;background:'+val.color"
                      >{{val.value}}</span>
                    </span>
                  </div>
                  <div class="every-left column-center">
                    <div class="column-center">
                      <!-- 截止时间设置 -->
                      <span
                        class="every-padding mr-5"
                        style="border:1px solid gray;border-radius:20px;padding:2px;cursor:pointer;font-size:14px"
                        v-show="item.endAt && item.endAt!==''"
                        @click.stop="stopMao"
                      >{{item.startAt?(item.startAt):'' | showTime}}{{item.startAt?'-':''}}{{item.endAt |showTime}}</span>
                      <span
                        class="ml-10 mr-5 option"
                        v-show="index===todoIndex"
                        @click.stop="deleteTodo(item._id)"
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
        <Modal v-model="todoAdd" fullscreen :styles="{top:0}" footer-hide title="新建任务">
          <div class="todoadd" style="padding:0 0;width:100%">
            <TodoAdd
              :todoAdd.sync="todoAdd"
              :projectId="projectId"
              :isOuter="isOuter"
              :tags.sync="tags"
              @getDetail="getProjectDetail"
            ></TodoAdd>
          </div>
        </Modal>
        <!-- 清单项目 -->
        <div v-for="(value,key,i) in every_list" :key="key" :value="value.list_id">
          <b class="font-18 option theme_font" @click="toList(value.list_id)">
            清单:
            <span class="ml-20">{{key}}</span>
          </b>
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
                  <vs-checkbox
                    color="rgb(59,222,200)"
                    v-model="item.finished"
                    @click.native.stop="changeFinishState(item._id,item.finished)"
                  ></vs-checkbox>
                  <span @click.stop="stopMao">
                    <Icon size="24" :color="getColor(item.level)" type="md-alert" />
                  </span>
                  <span class="option mr-10 every-main-title">{{item.name}}</span>
                  <span v-for="val in item.tags" :key="val.value" class="column-center">
                    <span
                      class="ml-5 font-12 every-padding"
                      @click.stop="stopMao"
                      :style="'color:white;;white-space:nowrap;overflow:auto;padding:0 6px;border-radius:20px;padding:3px;background:'+val.color"
                    >{{val.value}}</span>
                  </span>
                  <span>
                    <!-- 子任务与完成数量 -->
                    <!-- 因数据库设计问题，需要繁杂请求，暂时不做 -->
                  </span>
                </div>
                <div class="every-left column-center">
                  <div class="column-center">
                    <!-- 截止时间设置 -->
                    <span
                      class="font-12 every-padding mr-5"
                      style="border:1px solid gray;border-radius:20px;padding:2px;cursor:pointer;font-size:14px"
                      v-show=" item.endAt && item.endAt!=='' &&item.endAt!==null"
                      @click.stop="stopMao"
                    >{{item.startAt?(item.startAt):'' | showTime}}{{item.startAt?'-':''}}{{item.endAt |showTime}}</span>
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
          <div class="mt-5 mb-10">
            <button
              v-if="todoListAdd===false"
              class="font-12 ml-20 option this_button font-bolder this_left"
              @click="addListTodo(value.list_id)"
            >添加新任务</button>
            <button
              v-if="todoListAdd===false"
              class="font-12 ml-20 option-delete this_button font-bolder"
              @click="deleteList(value.list_id)"
            >删除此清单</button>
            <Modal v-model="todoListAdd" :styles="{top:0}" footer-hide :width="900" title="新建任务">
              <TodoAdd
                :todoAdd.sync="todoListAdd"
                :projectId="projectId"
                :tags.sync="tags"
                :listId="value.list_id"
                @getDetail="getProjectDetail"
              ></TodoAdd>
            </Modal>
          </div>
        </div>
        <!-- 展示更多信息 -->
        <!-- <span class="option font-12 showall mb-20">查看全部任务</span> -->
      </div>
      <!-- FixME:日程 -->
      <!-- 日程层面 -->
      <!-- 日程具体内容 -->
      <div class="mb-20 mt-20">
        <div class="flex-space-between">
          <div class="column-center xy-button">
            <b class="font-24 mr-20">日程</b>
            <!-- <Button type="default" @click="showSchedule">添加日程</Button> -->
            <vs-button dashed border dark type="default" @click="showSchedule">
              <span class="font-bolder">添加日程</span>
            </vs-button>
          </div>
        </div>
        <!-- 日程具体内容 -->
        <div class="pr-content" style="padding:20px 0">
          <div v-if="scheduleList.length===0 " class="column-center">
            <Icon size="32" color="gray" type="md-calendar" />
            <span class="ml-20">提前安排日程，项目进度不耽误</span>
          </div>
          <div v-else>
            <div v-for="(item,index) in scheduleList" :key="item.id" class="every-schedule">
              <div class="column-center flex-space-between">
                <!-- 左边显示标题 -->
                <div class="font-20 font-bolder theme_font">{{item.title}}</div>
                <!-- 右边显示时间-->
                <div
                  class="mr-20 schedule-time"
                >{{item.startAt | calendatTime}} - {{item.endAt |calendatTime}}</div>
              </div>
              <!-- 显示概览信息 -->
              <div>
                <span v-show="item.address" class="mr-20">
                  工作地点:
                  <span style="color:gray">{{item.address}}</span>
                </span>
                <span
                  class="schdeule-description"
                  style="description"
                  v-show="item.description"
                >
                  描述：
                  <span style="color:gray">{{item.description}}</span>
                </span>
              </div>
              <div class="flex-space-between mb-5">
                <div>
                  <span>提醒方式：</span>
                  <span class="ml-5">{{item.notice | noticeType}}</span>
                </div>
                <!-- 显示操作信息 -->
                <div class="mr-20">
                  <span class="option theme_font font-12" @click="toSchedule(item._id)">编辑日程</span>
                  <span class="option-delete ml-20 font-12" @click="deleteSchedule(item._id)">删除日程</span>
                </div>
              </div>
              <Divider class="every-divider mt-5" />
            </div>
          </div>
          <Modal v-model="schedule" footer-hide title="新增日程">
            <ScheduleAdd
              :schedule.sync="schedule"
              :projectId="projectId"
              @getDetail="getProjectDetail"
            ></ScheduleAdd>
          </Modal>
        </div>
        <!-- 展示更多信息 -->
        <!-- <span class="option font-12 showall mb-20">查看全部日程</span> -->
      </div>
      <!-- TODO:文件 -->
      <!-- 文件层 -->
      <div class="mb-20 mt-20">
        <div class="flex-space-between">
          <div class="column-center xy-button">
            <b class="font-24 mr-20">文件</b>
            <!-- <Button type="default" @click="showAddFolder">添加文件</Button> -->
            <vs-button dashed border dark type="default" @click="showAddFolder">
              <span class="font-bolder">添加文件</span>
            </vs-button>
          </div>
        </div>
        <div class="mt-20 pr-content">
          <!-- 展示文件 -->
          <div v-if="fileList.length===0" class="column-center">
            <Icon size="32" color="gray" type="md-folder" />
            <span class="ml-20">随时整理文件，做最舒服的事</span>
          </div>
          <div v-else class="ml-10">
            <div v-for="item in fileList" :key="item._id" class="every-file mr-20 mb-10 ml-20">
              <div class="show-content">
                <div v-if="checkType(item)===1 " class="show-file flex-all-center">
                  <img :src="item.fileUrl" class="show-image" />
                  <div class="image-show flex-all-center">
                    <div @click="showImage(item.fileUrl)">
                      <Icon class="show-p" size="30" type="ios-eye" />
                    </div>
                  </div>
                </div>
                <div v-else-if="checkType(item)===2" class="show-file flex-all-center">
                  <img src="../../assets/images/pdf.png" class="show-img" />
                </div>
                <div v-else-if="checkType(item)===3" class="show-file flex-all-center">
                  <img src="../../assets/images/rarfile.png" class="show-img" />
                </div>
                <div v-else class="show-file flex-all-center">
                  <!-- <Icon size="100" type="md-paper" /> -->
                  <img src="../../assets/images/file.png" class="show-img" />
                </div>
              </div>
              <div class="name">{{item.showName|| item.name}}</div>
              <div class="theme_font flex-space-between">
                <span>{{item.size | showSize}}</span>
                <span>{{item.name | showType}}</span>
              </div>
              <div class="flex-space-between">
                <span class="option" @click="copy(item)">链接</span>
                <span>
                  <a
                    class="option theme_font"
                    :href="item.fileUrl"
                    target="_blank"
                    :download="item.name"
                  >下载</a>
                </span>
                <span class="option-delete" @click="deleteThisFile(item._id)">删除</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal v-model="fileModal" footer-hide :closable="false" title="新建文件">
      <div class="file-outer">
        <div class="flex-row column-center">
          <span class="mr-20 font-bolder min-width">文件名:</span>
          <div class="thisIn">
            <vs-input v-model="fileName" style="width:100%" label-placeholder="(此处不填将将展示服务器文件名称)"></vs-input>
          </div>
        </div>
        <div class="mt-10">
          <UploadFile title="点击上传文件" @urlChange="getUrl"></UploadFile>
        </div>
        <div class="flex-row flex-space-between">
          <vs-button dark dashed style="width:120px" class="mt-10 ml-20" @click="fileModal=false">取消</vs-button>
          <vs-button
            success
            dashed
            style="width:120px"
            type="primary"
            class="mt-10 ml-20"
            @click="addFile"
          >保存</vs-button>
        </div>
      </div>
    </Modal>
    <Modal v-model="imageShow" :styles="{padding:'0'}" fullscreen footer-hide>
      <div class="flex-all-center" style="height:100%">
        <img class="modal-img" :src="modalImg" />
      </div>
    </Modal>
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
import UploadFile from "_c/self-page/upload-file";
const moment = require("moment");
export default {
  name: "",
  components: {
    TodoAdd,
    ScheduleAdd,
    UploadFile
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
      schedule: false,
      fileModal: false,
      /**
       * 新增文件层
       */
      fileName: "",
      fileUrl: "",
      imageShow: false,
      modalImg: "",
      fileData: {},
      fileList: []
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
      return moment(val).format("YYYY-MM-DD HH:mm");
    },
    showTime(time) {
      if (time === "") return "";
      return moment(time).format("YYYY-MM-DD HH:mm");
    },
    showType(val) {
      let tel = val.split(".");
      return tel.pop();
    },
    showSize(val) {
      let a = val / 1024 / 1024;
      if (a >= 1) {
        return a.toFixed(2) + "MB";
      } else {
        return (a * 1024).toFixed(2) + "KB";
      }
    },
    noticeType(val) {
      switch (val) {
        case 0:
          return "不提醒";
        case 1:
          return "日程开始时";
        case 2:
          return "提前5分钟";
        case 3:
          return "提前15分钟";
        case 4:
          return "提前30分钟";
        case 5:
          return "提前一小时";
        case 6:
          return "提前一天";
      }
    }
  },
  methods: {
    getUrl(val) {
      this.fileData = val;
    },
    addFile() {
      /**
       * @这里的文件与保险箱中的文件为同一类
       * @但是多了一些标识
       */
      console.log("sasa", this.fileData);
      if (Object.keys(this.fileData).length === 0) {
        this.$Message.error("尚未上传图片");
        return;
      }
      let p = {
        name: this.fileData.name,
        type: this.fileData.type,
        size: this.fileData.size,
        fileUrl: this.fileData.fileUrl,
        project_id: this.projectId
      };
      if (p.fileUrl === "") {
        this.$Message.error("尚未上传图片");
        return;
      }
      if (this.fileName === "") {
        p.showName = this.fileData.name;
      } else {
        let tl = this.fileData.name.split(".").pop();
        p.showName = this.fileName + "." + tl;
      }
      projectApi.addFile(p).then(res => {
        if (res.code === 0) {
          this.$Message.success("保存成功");
          this.fileName = "";
          this.fileModal = false;
          this.getProjectDetail();
        }
      });
    },
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
        this.fileList = res.result.fileList;
        this.tags = res.result.tags;
        this.remarks = res.result.remarks;
      });
    },
    showAddFolder() {
      this.fileModal = true;
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
        case 2:
          return "green";
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
    deleteSchedule(id) {
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
    },
    toProgress() {
      this.$router.push({
        name: "project-progress",
        query: {
          id: this.projectId,
          name: this.name
        }
      });
    },
    toSetting() {
      this.$router.push({
        name: "project-set",
        query: {
          id: this.projectId,
          name: this.name
        }
      });
    },
    checkType(item) {
      /**
       * @分析存储的文件类型
       * @放置展示图
       */
      let image1 = new RegExp("image", "i");
      let image2 = new RegExp("png|jpeg|cur|jpg");
      let rar = new RegExp("rar|zip|gzip|ra", "i");
      let pdf = new RegExp("pdf", "i");

      if (image1.test(item.type) || image2.test(item.name)) {
        return 1;
      }
      if (pdf.test(item.type)) {
        return 2;
      }
      if (rar.test(item.name)) {
        return 3;
      }
      // gzip.map(el => {
      //   nameList.forEach(v => {
      //     if (v === el) {
      //       console.log("3");
      //       return 3;
      //     }
      //   });
      // });

      return false;
    },
    /**
     * @点击复制链接
     */
    copy(item) {
      var oInput = document.createElement("input");
      oInput.value = item.fileUrl;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.$Message.success("复制成功");
    },
    /**
     * @点击下载文件
     */
    download(item) {},
    showImage(url) {
      this.modalImg = url;
      this.imageShow = true;
    },
    deleteThisFile(id) {
      this.$Modal.confirm({
        title: "删除",
        content: "确定要删除此文件？",
        onOk: () => {
          projectApi.deleteFile(id).then(res => {
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
    }
  }
};
</script>

<style lang="less">
.thisIn {
  width: 100%;
  .vs-input {
    width: 100%;
  }
}
</style>
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
.this-content {
  padding: 24px;
}
.title-back {
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
.every-main-title {
  font-family: "Times New Roman", Times, serif;
  font-weight: bolder;
}
.every-padding {
  padding: 0 6px !important;
  font-weight: bolder;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif !important;
}
.every-schedule {
  // margin: 0 50px;
  padding: 0 10px;
  width: 100%;
}
.every-divider {
  overflow: hidden;
  // right: 30px;
  margin: 10px;
}
.schdeule-description {
}
.project-notice {
  // margin: 20px;
  font-size: 12px;
}
.main-info {
  margin: 10px 24px;
}
.main-title {
  font-weight: bolder;
  font-size: 26px;
}
.main-description {
  font-weight: bolder;
}
.add-list {
  margin: 10px 0;
}
/*文件 */
.file-outer {
  padding: 16px 24px;
}
.type {
  text-align: right;
}
.every-file {
  width: 102px;
  margin: 0 8px;
  display: inline-block;
}
.show-content {
  // margin: 0 16px;
}
.show-img {
  height: 100px;
  width: 100px;
  border-radius: 12px;
}
.show-image {
  height: 100px;
  width: 100px;
  border-radius: 12px;
}
.show-file {
  position: relative;
}
.image-show {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: none;
}
.show-file:hover .image-show {
  display: flex;
  background: gray;
  border-radius: 12px;
  opacity: 0.6;
  color: white;
}
.show-p {
  cursor: pointer;
}
.show-file {
  height: 100px;
  width: 100px;
  border-radius: 12px !important;
}
.name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.schedule-time {
  font-family: "Times New Roman", Times, serif;
  font-weight: bolder;
  font-size: 16px;
}
.this_left {
  text-decoration: underline;
}
</style>
