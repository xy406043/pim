<template>
  <div class="thisEdit">
    <div class="column-center thisTitle flex-space-between flex-row">
      <!-- 顶部 -->
      <div>
        <!-- <router-link to="know" class="title-back option mr-10">我的记事库</router-link>/ -->
        <span class="theme_font ml-10">编辑日程</span>
      </div>
      <div>
        <div class="option">
          <!-- <span class="option" @click="openAddModal">新建联系人</span> -->
        </div>
      </div>
    </div>
    <Divider />
    <div class="thisScheduleAdd">
      <div class="column-center mb-5" v-show="showType===1">
        <span class="min-width font-bolder">任务集：</span>
        <span class="addWidth">
          <Select v-model="project_id" placeholder="请选择日程所属任务集">
            <Option v-for="item in projectList" :key="item._id" :value="item._id">{{item.projectName}}</Option>
          </Select>
        </span>
      </div>
      <div class="column-center mb-5">
        <span class="min-width font-bolder">标题：</span>
        <span class="addWidth">
          <Input v-model="title" placeholder="请输入标题"></Input>
        </span>
      </div>
      <div class="column-center mb-5">
        <span class="min-width font-bolder">描述：</span>
        <span class="addWidth">
          <Input type="textarea" v-model="description" placeholder="请输入描述"></Input>
        </span>
      </div>
      <div class="column-center mb-5">
        <span class="min-width font-bolder" placeholder="请选择日程时间">时间：</span>
        <span>
          <DatePicker
            v-model="timeList"
            class="addBW"
            :clearable="false"
            type="datetimerange"
            @on-change="changeTime"
          ></DatePicker>
        </span>
      </div>
      <div class="column-center mb-5">
        <span class="min-width font-bolder">通知方式：</span>
        <span class="addWidth">
          <Select v-model="notice">
            <Option v-for="item in noticeList" :value="item.id" :key="item.id">{{item.value}}</Option>
          </Select>
        </span>
      </div>
      <div class="column-center mb-5">
        <span class="min-width font-bolder">工作位置：</span>
        <span class="addWidth">
          <Input v-model="address" placeholder="请输入工作位置"></Input>
        </span>
      </div>
      <div class="flex-row mt-10">
        <vs-button dark dashed style="width:120px" @click="cancelSchedule">取消</vs-button>
        <vs-button success  dashed  style="width:120px;margin-left:50px" @click="editSchedule">确定</vs-button>
        <!-- <Button type="default" @click="cancelAdd">取消</Button> -->
      </div>
    </div>
  </div>
</template>

<script>
const moment = require("moment")
import { projectApi } from "@/api";
export default {
  name: "",
  data() {
    return {
      schedule_id: "",
      project_id:"",
      title: "",
      endAt: "",
      startAt: "",
      timeList: [],
      projectList:[],
      description: "",
      notice: 0,
      showType:0,
      year:0,
      month:0,
      noticeList: [
        { id: 0, value: "不提醒" },
        { id: 1, value: "日程开始时" },
        { id: 2, value: "提前5分钟" },
        { id: 3, value: "提前15分钟" },
        { id: 4, value: "提前30分钟" },
        { id: 5, value: "提前一小时" },
        { id: 6, value: "提前一天" }
      ],
      address: ""
    };
  },
  mounted() {
    this.schedule_id = this.$route.query.id;
    this.showType =this.$route.query.showType || 0
    this.year =this.$route.query.year
    this.month=this.$route.query.month
    this.getProjectList()
    this.getScheuleDetail();
  },
  methods: {
      getProjectList() {
      let p = {};
      projectApi.getProjectList(p).then(res => {
        this.projectList = res.result;
      });
    },
       changeTime(val) {
      this.startAt =val[0]
      this.endAt =val[1]
      console.log(this.startAt, this.endAt);
    },
    getScheuleDetail() {
      projectApi.getScheduleDetail(this.schedule_id).then(res => {
        let rel = res.result;
        this.title = rel.title;
        this.description = rel.description;
        this.project_id=rel.project_id
        this.notice = rel.notice;
        this.address =rel.notice;
        this.startAt=moment(rel.startAt).format("YYYY-MM-DD HH:mm:ss")
        this.endAt=moment(rel.endAt).format("YYYY-MM-DD HH:mm:ss")
        this.timeList = [this.startAt,this.endAt];
        console.log(this.timeList)
      });
    },
    editSchedule() {
        if (this.title === "") {
        this.$Message.warning("请输入标题");
        return;
      }
      if (this.endAt === "") {
        this.$Message.warning("请选择时间");
        return;
      }
      let p = {
        schedule_id:this.schedule_id,
        title: this.title,
        startAt: this.startAt,
        endAt: this.endAt,
        notice: this.notice,
        address: this.address,
        project_id: this.projectId,
        description:this.description
      };
      projectApi.editSchedule(p).then( res => {
          if(res.code===0){
              this.$Message.success("编辑日程成功")
              if(this.showType===1){
                this.$router.push({
                  name:"calendar",
                   query:{
                      year:this.year,
                      month:this.month
                  }
                })
                return
              }
              this.$router.push({
                  name:"project-view",
                  query:{
                      id:this.project_id
                  }
              })
          }
      })
    },
    cancelSchedule(){
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="less" scoped>
.thisEdit{
    .ivu-divider-horizontal {
    margin: 0;
  }
}
.thisScheduleAdd {
  padding: 30px;
}
.thisTitle {
  height: 50px;
  padding: 5px 20px;
  background: rgba(168, 204, 204, 0.13);
}
.addWidth {
  width: 150px;
}
.addBW {
  width: 320px !important;
}
</style>