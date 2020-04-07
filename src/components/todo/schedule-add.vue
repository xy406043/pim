<template>
  <div>
    <div class="thisScheduleAdd">
      <div class="column-center mb-5" v-show="showType===1">
        <span class="min-width">任务集：</span>
        <span class="addWidth">
          <Select v-model="project_id" placeholder="请选择日程所属任务集" filterable>
            <Option
              v-for="item in projectList"
              :key="item._id"
              :value="item._id"
            >{{item.projectName}}</Option>
          </Select>
        </span>
      </div>
      <div class="column-center mb-5">
        <span class="min-width">标题：</span>
        <span class="addWidth">
          <Input v-model="title" placeholder="请输入日程标题"></Input>
        </span>
      </div>
      <div class="column-center mb-5">
        <span class="min-width">描述：</span>
        <span class="addWidth">
          <Input type="textarea" v-model="description" placeholder="日程描述"></Input>
        </span>
      </div>
      <div class="column-center mb-5">
        <span class="min-width">时间：</span>
        <span>
          <DatePicker
            v-model="timeList"
            class="addBW"
            format="yyyy-MM-dd HH:mm"
            placeholder="请选择日程时间"
            :clearable="false"
            type="datetimerange"
            @on-change="changeTime"
          ></DatePicker>
        </span>
      </div>
      <div class="column-center mb-5">
        <span class="min-width">通知方式：</span>
        <span class="addWidth">
          <Select v-model="notice">
            <Option v-for="item in noticeList" :value="item.id" :key="item.id">{{item.value}}</Option>
          </Select>
        </span>
      </div>
      <div class="column-center mb-10">
        <span class="min-width">工作位置：</span>
        <span class="addWidth">
          <Input v-model="address" placeholder="请输入工作位置"></Input>
        </span>
      </div>
      <div class="mt-5 flex-row">
        <!-- <Button class="mr-20" type="primary" @click="addSchedule">确定</Button>
        <Button class="ml-20"  type="default" @click="cancelAdd">取消</Button>-->
        <vs-button dark  dashed style="width:150px" @click="cancelAdd">取消</vs-button>
        <vs-button success dashed style="width:150px" class="ml-20" @click="addSchedule">确认</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
const moment = require("moment");
import { projectApi } from "@/api";
export default {
  name: "schedule-add",
  props: {
    schedule: {
      type: Boolean,
      defualt: false
    },
    showType: {
      type: Number,
      default: 0
    },
    projectId: String
  },
  data() {
    return {
      title: "",
      startAt: "",
      endAt: "",
      timeList: [],
      projectList: [],
      description: "",
      project_id: "",
      notice: 0, //提醒方式
      noticeList: [
        { id: 0, value: "不提醒" },
        { id: 1, value: "日程开始时" },
        { id: 2, value: "提前5分钟" },
        { id: 3, value: "提前15分钟" },
        { id: 4, value: "提前30分钟" },
        { id: 5, value: "提前一小时" },
        { id: 6, value: "提前一天" }
      ],
      address: "" //工作位置
    };
  },
  watch: {
    // timeList(newV, oldV) {
    //   console.log(newV);
    // }
  },
  mounted() {
    this.getProjectList();
  },
  methods: {
    getProjectList() {
      let p = {};
      projectApi.getProjectList(p).then(res => {
        this.projectList = res.result;
      });
    },
    changeTime(val) {
      this.startAt = val[0];
      this.endAt = val[1];
    },
    addSchedule() {
      if (this.showType === 1 && this.project_id === "") {
        this.$Message.warning("请选择该任务所属任务集");
        return;
      }
      if (this.title === "") {
        this.$Message.warning("请输入标题");
        return;
      }
      if (this.endAt === "") {
        this.$Message.warning("请选择时间");
        return;
      }
      let p = {
        title: this.title,
        startAt: this.startAt,
        endAt: this.endAt,
        notice: this.notice,
        address: this.address,
        project_id: this.project_id || this.projectId,
        description: this.description
      };
      projectApi.addSchedule(p).then(res => {
        if (res.code === 0) {
          this.initSchedule();
          this.$emit("update:schedule", false);
          this.$Message.success("新建日程成功");
          this.initSchedule();
          this.$emit("getDetail");
        }
      });
    },
    initSchedule() {
      this.title = "";
      this.description = "";
      this.timeList = [];
      this.notice = 0;
      this.address = "";
    },
    cancelAdd() {
      console.log(this.schedule);
      this.initSchedule();
      this.$emit("update:schedule", false);
    }
  }
};
</script>

<style lang="less" scoped>
.thisScheduleAdd {
  padding: 10px;
}
.addWidth {
  width: 150px;
}
.addBW {
  width: 320px !important;
}
</style>