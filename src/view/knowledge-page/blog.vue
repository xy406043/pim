<template>
  <div class="thisBlog">
    <div class="tabn flex-space-between column-center">
      <div>
        <router-link to="know" class="title-back option mr-10">我的记事库</router-link>/
        <span class="theme_font ml-10">我的博客管理</span>
      </div>
      <div>
        <span class="option ml-10" @click="addBlog">新增博文</span>
        <span class="option ml-10" @click="toTagSet">标签管理</span>
        <span class="option ml-10" @click="toGroupSet">分类管理</span>
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
            <span class="theme_font  mr-20">搜索：</span>
            <span>
              <Input class="myInput" search v-model="selectTitle" @on-search="getBlogList"></Input>
            </span>
          </div>
          <div class="flex-center ml-20">
            <span class="theme_font min-width mr-20">分类:</span>
            <span>
              <Select v-model="group_id" class="myNo" @on-change="getBlogList">
                <Option :value="0">全部博客</Option>
                <Option v-for="item in groupList" :key="item._id" :value="item._id">{{item.name}}</Option>
              </Select>
            </span>
          </div>
        </div>
        <!-- 日记循环 -->
        <Divider class="myDivider" />
        <!-- <div
          v-for="(item,index) in blogList"
          :key="item._id"
          class="column-center every-blog flex-space-between"
          @mouseover="getIndex(index)"
          @mouseleave="leaveIndex(index)"
        >
          <div class="flex-row">
            <span class="ml-10 mr-20 font-18">{{(currentPage-1)*pageSize+index+1+'.'}}</span>
            <div class="option font-18 every-ts font-bolder" @click="toDetail(item._id)">{{item.title}}</div>
          </div>
          <div>
            <span v-show="index===showIndex" class="mr-20">
              <span class="option-delete" @click="deleteBlog(item._id)">删除</span>
            </span>
            <span class="font-16" style="color:gray">{{item.createdAt | showTime}}</span>
          </div>
        </div> -->
        <Table :data="blogList" :columns="columns" :height="tableHeight">
              <template slot-scope="{row,index}" slot="index">{{(currentPage-1)*pageSize+index+1+'.'}}</template>
              <template slot-scope="{row,index}" slot="group">{{row.group_id.name}}</template>
              <template slot-scope="{row,index}" slot="isShow">{{row.isShow?"是":""}}</template>
              <template slot-scope="{row,index}" slot="isReproduced">{{row.isReproduced?"是":""}}</template>
              <template slot-scope="{row,index}" slot="tag">
                <Tag v-for="item in row.tag" :key="item._id" :color="item.color">{{item.name}}</Tag>
              </template>
              <template slot-scope="{row,index}" slot="createdAt" >{{row.createdAt | showTime}}</template>
              <template slot-scope="{row,index}" slot="operate">
                <span class="option theme_font font-bolder"  @click="toDetail(row._id)">编辑</span>  <span class="ml-20 font-bolder option-delete"  @click="deleteBlog(row._id)">删除</span>
              </template>
        </Table>
        <Page
          :currentPage.sync="currentPage"
          :totalCount="totalCount"
          :pageSize.sync="pageSize"
          @pageChanged="getBlogList"
        ></Page>
      </div>
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
      blogList: [],
      selectTitle: "",
      showIndex: -1,
      group_id:0, // 0为所有分类 1为默认分组 
      groupList: [],
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
      tableHeight:0,
      columns:[
        {title:"序号",slot:"index",align:"center"},
        {title:"标题",key:"title",align:"center"}, 
        {title:"分类",slot:"group",align:"center"},
        {title:"展示",slot:"isShow",align:"center"},
        {title:"转载",slot:"isReproduced",align:"center"},
        {title:"作者",key:"author",align:"center"},
        {title:"标签",slot:"tag",align:"center"},
        {title:"时间",slot:"createdAt",align:"center"},
        {title:"操作",slot:"operate",align:"center"}
      ]
    };
  },
  filters: {
    showTime(val) {
      return moment(new Date(val)).format("M-D HH:mm");
    }
    /**
     * @此处无法调用VUE的this
     */
  },
  mounted() {
    console.log(window.innerHeight)
    
        this.tableHeight = window.innerHeight - 280;
    window.onresize = () => {
      this.tableHeight = window.innerHeight - 280;
    };
    this.getBlogList();
    this.getGroupList();
  },
  methods: {
    getBlogList() {
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
      knowApi.getBlogList(p).then(res => {
        this.blogList = res.result;
        this.totalCount = res.totalCount;
      });
    },
    getGroupList() {
      let p = {
        groupType: 3
      };
      commonApi.getGroupList(p).then(res => {
        this.groupList = res.result;
        // console.log(this.groupList)
      })
    },
    getIndex(index) {
      this.showIndex = index;
    },
    leaveIndex(index) {
      this.showIndex = -1;
    },
    addBlog() {
      this.$router.push({ name: "blog-add" });
    },
    deleteBlog(id) {
      this.$Modal.confirm({
        title: "删除",
        content: "确定要删除此日记么？",
        onOk: () => {
          knowApi.deleteBlog(id).then(res => {
            if (res.code === 0) {
              this.$Message.success("删除成功");
              this.getBlogList();
            } else {
              this.$Message.error(res.errorMsg);
            }
          });
        },
        onCancel: () => {}
      });
    },
    toDetail(id) {
      this.$router.push({ name: "blog-view", query: { id: id } });
    },
    tell(val) {
      // console.log(val);
    },
    toTagSet(){

    },
    toGroupSet(){
      this.$router.push({
        name:"group-set",
        query:{
          groupType:3
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  height: 100%;
}
.thisBlog {
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
.every-blog {
  margin: 10px 0;
}
.every-blog:hover {
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
  color:black;
  white-space: nowrap;
  overflow: hidden;
  // 文字超出必须要在块级中才能生效
  text-overflow:ellipsis;
  max-width: 700px !important;
  font-family: 'Times New Roman', Times, serif;
}
</style>