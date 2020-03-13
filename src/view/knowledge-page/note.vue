<template>
  <div class="thisNote">
    <div class="tabn flex-space-between column-center">
      <div>
        <router-link to="know" class="title-back option mr-10">我的记事库</router-link>/
        <span class="theme_font ml-10">我的日记本</span>
      </div>
      <div>
        <span class="option ml-10 mr-20" @click="addNote">新增笔记</span>
        <span class="option ml-10">笔记分类</span>
      </div>
    </div>
    <Divider class="myDivider"></Divider>
    <!-- 分层，右边进行设置 -->
    <div class="flex-row below">
      <!-- 列表 -->
      <div class="left">
        <!-- 搜索 -->
        <div class="mb-10 flex-row">
          <div class="flex-start column-center" >
            <span class="theme_font min-width mr-20">搜索：</span>
            <span>
              <Input class="myInput" search v-model="selectTitle" @on-search="getNoteList"></Input>
            </span>
          </div>
          <div class="flex-center ml-20">
            <span class="theme_font min-width mr-20">分类:</span>
            <span>
              <Select v-model="group_id" class="myNo" @on-change="getNoteList">
                <Option :value="0">全部日记</Option>
                <Option :value="1">默认分类</Option>
                <Option v-for="item in groupList" :key="item._id" :value="item._id">{{item.name}}</Option>
              </Select>
            </span>
          </div>
        </div>
        <!-- 笔记循环 -->
        <Divider class="myDivider" />
        <div
          v-for="(item,index) in noteList"
          :key="item._id"
          class="column-center every-note flex-space-between"
          @mouseover="getIndex(index)"
          @mouseleave="leaveIndex(index)"
        >
          <!-- 左边 标题 信息 分类 -->
          <div>
            <span class="ml-10 mr-20 font-18">{{(currentPage-1)*pageSize+index+1+'.'}}</span>
            <span class="option font-18 every-ts" @click="toDetail(item._id)">{{item.title}}</span>
            <!-- <span  class="this-content min-width ml-10" >{{item.content}}</span> -->
          </div>
          <!-- 右边  时间操作 -->
          <div>
            <span v-show="index===showIndex" class="mr-20">
              <span class="option-delete" @click="deleteNote(item._id)">删除</span>
            </span>
            <span class="font-16">{{item.updatedAt | showTime}}</span>
          </div>
        </div>
        <Page
          :currentPage.sync="currentPage"
          :totalCount="totalCount"
          :pageSize.sync="pageSize"
          @pageChanged="getNoteList"
        ></Page>
      </div>
      <!-- 
      <Divider class="myDivider2" type="vertical"></Divider>
      <div class="right">
        <div class="option" @click="get">全部笔记</div>
        <div v-for="item in groupList" class="font-group option" :key="item._id" :value="item._id">{{item.name}}</div>
      </div>-->
    </div>
  </div>
</template>

<script>
/**
 * @description 日记本相关操作
 */
const moment = require("moment");
import { knowApi, commonApi } from "@/api";
import Page from "_c/self-page/page";
export default {
  name: "",
  components: {
    Page
  },
  data() {
    return {
      content: "",
      noteList: [],
      selectTitle: "",
      showIndex: -1,
      group_id:0, // 0为所有分类 1为默认分组 
      groupList: [],
      totalCount: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  filters: {
    showTime(val) {
      return moment(new Date(val)).format("MM-DD HH:mm");
    }
    /**
     * @此处无法调用VUE的this
     */
  },
  mounted() {
    this.getNoteList();
    this.getGroupList();
  },
  methods: {
    getNoteList() {
      let p = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      if(this.group_id===0){
        // 0 为全部日记
      }else{
        p.group_id=this.group_id
      }
    
      if(this.selectTitle!==''){
        p.selectTitle=this.selectTitle
      }
      knowApi.getNoteList(p).then(res => {
        this.noteList = res.result;
        this.totalCount = res.totalCount;
      });
    },
    getGroupList() {
      let p = {
        groupType: 1
      };
      commonApi.getGroupList(p).then(res => {
        this.groupList = res.result;
        // console.log(this.groupList)
      });
    },
    getIndex(index) {
      this.showIndex = index;
    },
    leaveIndex(index) {
      this.showIndex = -1;
    },
    addNote() {
      this.$router.push({ name: "note-add" });
    },
    deleteNote(id) {
      this.$Modal.confirm({
        title: "删除",
        content: "确定要删除此日记么？",
        onOk: () => {
          knowApi.deleteNote(id).then(res => {
            if (res.code === 0) {
              this.$Message.success("删除成功");
              this.getNoteList();
            } else {
              this.$Message.error(res.errorMsg);
            }
          });
        },
        onCancel: () => {}
      });
    },
    toDetail(id) {
      this.$router.push({ name: "note-view", query: { id: id } });
    },
    tell(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  height: 100%;
}
.thisNote {
  // padding: 20px;
  height: auto;
}
.title-back {
  color: black;
}
.myDivider {
  margin: 0;
}
.myDivider2 {
  margin: 0;
  // height: 100%;
  height: auto;
}
.tabn {
  height: 50px;
  padding: 5px 20px;
  background: rgba(168, 204, 204, 0.13);
}
.below {
  min-height: 550px;
}
.myInput {
  width: 200px;
}
.left {
  flex: auto;
  padding: 10px 24px;
}
.right {
  width: 100px;
  padding: 10px 16px;
}
.every-note {
  margin: 10px 0;
}
.every-note:hover {
  background: #d0ebf0;
}
.font-group {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.myNo {
  width: 150px !important;
}
.every-ts{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>