<template>
  <div v-show="todoAdd" class="thisAdd">
    <div class="flex-row mb-20">
      <div class="mr-10 column-center min-width font-bolder">任务标题:</div>
      <div class="form-width">
        <Input v-model="todoName" placeholder="输入任务标题"></Input>
      </div>
    </div>
    <div v-if="isOuter" class="flex-row mb-20 mt-20">
      <div class="mr-10 column-center min-width font-bolder">所属任务集:</div>
      <div class="form-width">
        <Select v-model="selectedProject" filterable class="form-width" @on-change="getListList">
          <Option
            v-for="(item,index) in projectList"
            :key="item._id"
            :value="item._id"
          >{{item.projectName}}</Option>
        </Select>
      </div>
    </div>
    <div v-if="isOuter" class="flex-row mb-20">
      <div class="mr-10 column-center min-width font-bolder">所属清单:</div>
      <div class="form-width">
        <Select v-model="selectedList" filterable class="form-width">
          <Option :value="-1">清单外列表</Option>
          <Option v-for="(item,index) in listList" :key="item._id" :value="item._id">{{item.name}}</Option>
        </Select>
      </div>
    </div>

    <div class="flex-row mb-20">
      <div class="mr-10 column-center min-width font-bolder">时间设置:</div>
      <div class="form-width">
        <RadioGroup v-model="isEnd">
          <Radio :label="0">设置开始-截止时间</Radio>
          <Radio :label="1">只设置截止时间</Radio>
        </RadioGroup>
      </div>
    </div>
    <div v-show="!isEnd" class="flex-row mb-20">
      <div class="mr-10 column-center min-width font-bolder">开始日期:</div>
      <div class="form-width">
        <DatePicker v-model="startAt" type="datetime" placeholder="输入开始日期"></DatePicker>
      </div>
    </div>
    <div class="flex-row mb-20">
      <div class="mr-10 column-center min-width font-bolder">截止日期:</div>
      <div calss="form-width">
        <DatePicker v-model="endAt" type="datetime" placeholder="输入截止日期" @on-change="changeTime"></DatePicker>
      </div>
    </div>
    <div class="flex-row mb-20">
      <div class="mr-10 column-center min-width font-bolder">任务级别:</div>
      <div class="form-width">
        <Select v-model="level" filterable class="form-width" @on-change="getChange">
          <Option v-for="item in levelList" :key="item.id" :value="item.id" :label="item.value">
            <span class="column-center">
              <div :style="'height:16px;width:16px;background:'+item.color"></div>
              <span class="ml-10">{{item.value}}</span>
            </span>
          </Option>
        </Select>
      </div>
    </div>
    <div class="flex-row mb-20">
      <div class="mr-10 column-center min-width font-bolder">任务标签:</div>
      <div class="form-width">
        <Select v-model="uploadTags" filterable multiple allow-create @on-create="handleCreate">
          <Option v-for="(item,index) in tags" :value="item.value" :key="item.value">
            <div class="column-center">
              <div :style="'height:16px;width:16px;background:'+item.color"></div>
              <span class="ml-10">{{item.value}}</span>
            </div>
          </Option>
        </Select>
      </div>
    </div>
    <div class="mb-20 thisTel">
      <div class="mb-10 min-width font-bolder column-center flex-row">
        任务描述:
        <!-- <span class="ml-20"> <vs-switch v-model="editType">
        <template #off>
            Markdown编辑
        </template>
        <template #on>
            富文本编辑
        </template>
        </vs-switch></span>-->
      </div>
      <!-- <div class="Editor"><Editor v-if="todoAdd"  :value="description" @on-change="changeDescription"></Editor></div> -->
      <MavonEditor ref="mavon" :originText="description" @getEditor="getContent"></MavonEditor>
      <!-- <QuillEditor ref="quill" @showContent="getContent2" ></QuillEditor> -->
    </div>

    <div class="flex-between mt-20">
      <!-- <Button type="default" @click="cancel">取消</Button>
      <Button type="primary" @click="handleAdd">确认</Button>-->
      <vs-button dark floating style="width:150px" @click="cancel">取消</vs-button>
      <vs-button success floating style="width:150px" class="ml-20" @click="handleAdd">确认</vs-button>
    </div>
  </div>
</template>

<script>
import { projectApi } from "@/api";
// import Editor from "_c/editor/Editor"
import MavonEditor from "_c/editor/mavon-editor";
// import QuillEditor from "_c/editor/quill-editor";
/**
 * @由于互相之间HTML文本转换方法的不同
 * @这两个编辑器只能二选其一
 * @且quillEditor不知道有没有将图片转成链接的方法
 */
export default {
  name: "TodoAdd",
  components: {
    // Editor,
    MavonEditor,
    // QuillEditor
  },
  props: {
    todoAdd: {
      type: Boolean,
      default: false
    },
    projectList: Array,
    tags: Array,
    todos: Array, // 任务对象 包含清单外任务 以及各清单任务
    isOuter: {
      type: Boolean,
      default: false
    },
    projectId: String, //项目Id
    listId: String // 项目内添加处理
  },
  data() {
    return {
      open: false,
      startAt: "",
      endAt: "",
      isEnd: 1, //1表示时间段
      projectIndex: 0,
      projectLevel: 2,
      selectedProject: "",
      selectedList: -1,
      listList: [],
      uploadTags: [],
      level: 2,
      levelList: [
        { id: 1, value: "较低", color: "gray" },
        { id: 2, value: "普通", color: "green" },
        { id: 3, value: "较高", color: "yellow" },
        { id: 4, value: "最高", color: "red" }
      ],
      tagIndex: -1,
      todoName: "",
      project_id: "", //outer时进行选择
      list_id: "", //outer 时 清单ID,
      description: "",
      editType: false
    };
  },
  mounted() {},
  watch: {
    selectedProject(newV) {
      this.getListList();
    }
  },
  computed: {},
  methods: {
    getContent(markdown, html) {
      // this.m_content = markdown;
      // this.h_content = html;
      this.description = markdown;
      // this.$refs.quill.setText(markdown)
    },
    // getContent2(value){
    //     this.description=value
    //     this.$refs.mavon.putContent(value)
    // },
    cancel() {
      this.$emit("update:todoAdd", false);
      this.$emit("cancelAdd", false);
      this.initTodo();
    },
    getListList() {
      projectApi.getListList(this.selectedProject).then(res => {
        this.listList = res.result;
      });
    },
    changeDescription(html) {
      this.description = html;
    },
    handleAdd() {
      let p = {
        isEnd: this.isEnd,
        name: this.todoName,
        level: this.level,
        tags: [],
        description: this.description
      };
      this.uploadTags.map(item => {
        for (let val of this.tags) {
          if (item === val.value) {
            p.tags.push({
              value: item,
              color: val.color
            });
          }
        }
      });
      console.log("p", p);
      if (p.name === "") {
        this.$Message.error("请输入任务名");
        return;
      }
      if (!this.isEnd) {
        if (this.endAt !== "") {
          p.endAt = this.endAt;
        }
        if (this.startAt !== "") {
          p.startAt = this.startAt;
        }
        // if(p.startAt===''){
        //   this.$Message.error("请选择开始时间")
        //   return
        // }
        //  if(p.endAt===''){
        //   this.$Message.error("请选择截止时间")
        //   return
        // }
      } else {
        if (this.endAt !== "") {
          p.endAt = this.endAt;
        }
        // if(p.endAt===''){
        //    this.$Message.error("请选择截止时间")
        //   return
        // }
      }

      if (this.isOuter) {
        p.list_id = this.list_id;
        p.project_id = this.project_id;
      } else {
        p.project_id = this.projectId;
      }
      if (this.listId !== "" && this.listId !== undefined) {
        console.log("list_id", this.listId);
        p.list_id = this.listId;
      }

      projectApi.addTodo(p).then(res => {
        if (res.code === 0) {
          this.$Message.success("新增成功");
          this.$emit("getDetail");
          this.$emit("update:todoAdd", false);
        } else {
          this.$Message.error(res.errorMsg);
        }
      });
    },
    handleClick() {
      this.open = !this.open;
    },
    handleChange(date) {
      this.value3 = date;
    },
    handleClear() {
      this.open = false;
    },
    handleOk() {
      this.open = false;
    },
    handleCreate(val) {
      let list = JSON.parse(JSON.stringify(this.tags));
      list.push({
        value: val,
        color: "skyblue"
      });
      let p = {
        project_id: this.projectId,
        tags: list
      };
      /**
       * @新增tag
       */
      projectApi.addTag(p).then(res => {
        if (res.code === 0) {
          this.initTodo();
        } else {
          this.$Message.error(res.errorMsg);
        }
      });
      this.$emit("update:tags", list);
    },
    initTodo() {
      this.todoName = "";
      this.startAt = "";
      this.endAt = "";
      this.project_id = "";
      this.$emit("update:listId", "");
      this.description = "";
      this.uploadTags = [];
      this.level = 2;
      this.isEnd = 0;
      // this.$refs.editor.clearEditor()
    },
    getChange(val) {
      console.log(val);
    },
    changeTime(val) {
      console.log("time", val, this.endAt);
    }
  }
};
</script>

<style lang="less" scoped>
.thisAdd {
  padding: 0 10px;
  margin: 0 !important;
}
.Editor {
  // width: 400px;
  overflow: scroll;
  width: 800px;
}
.thisTel {
  max-height: 340px;
  overflow: scroll;
}
</style>