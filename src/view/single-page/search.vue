<template>
  <div class="thisSearch">
    <div class="column-center flex-space-between thisTitle flex-row">
      <div class="column-center">
        <router-link :to="{name:'home'}" class="title-back option t mr-10">首页</router-link>
      </div>
      <div class="title theme_font">搜索</div>
      <div>
        <span class="ml-10 mt-5" @click="backLast">
          <img src="http://xynagisa.xyz/下载.png" class="back_img" />
        </span>
      </div>
    </div>
    <Divider />
    <div class="select">
      <!-- 搜索 -->
      <div class="flex-row">
        <div class="flex-start column-center">
          <span class="mr-10 font-bolder">关键字搜索：</span>
          <span>
            <Input class="myInput" search v-model="keyword" @on-search="getContent"></Input>
          </span>
        </div>
        <!-- <div class="ml-20 column-center">
          <span class="mr-10 font-bolder">排序:</span>
          <span>
              TODO:目前我不知道这里的排序该怎么搞，毕竟，后端的搜索如何还不清楚
           <Select  v-model="sortBy">
               <Option :value="0">按时间</Option>
               <Option :value="1">按相关性</Option>
           </Select>
          </span>
        </div>-->
      </div>
    </div>
    <Divider />
    <!-- 显示具体搜索内容 -->
    <div class="show-content">
      <div class="mb-20">
        共
        <span class="show-num">{{totalCount}}</span> 条搜索结果
      </div>
      <div class="content">
        <div v-for="item in contentList" :key="item._id" class="flex-row">
          <div class="search-type mr-20">{{item.type}}:</div>
          <div v-if="item.type==='任务集'" class="flex-column">
            <router-link
              :to="{name:'project-view',query:{id:item._id}}"
              class="option default-ts theme_font"
            >{{item.name | showSearch(keyword)}}</router-link>
            <div class="show-time">{{item.createdAt | showTime}}</div>
          </div>
          <div v-else-if="item.type==='任务清单'" class="flex-column">
            <router-link
              :to="{name:'list-detail',query:{list_id:item._id}}"
              class="option default-ts theme_font"
            >{{item.name | showSearch(keyword)}}</router-link>
            <div>
              <span class="mr-10">任务集:</span>
              <router-link
                :to="{name:'project-view',query:{id:item.project_id}}"
                class="option default-ts"
              >{{item.projectName }}</router-link>
            </div>
            <div class="show-time">{{item.createdAt | showTime}}</div>
          </div>
          <div v-else-if="item.type==='清单外任务'" class="flex-column">
            <router-link
              :to="{name:'todo-detail',query:{todo_id:item._id}}"
              class="option default-ts theme_font"
            >{{item.name | showSearch(keyword)}}</router-link>
            <div>
              <span class="mr-10">任务集:</span>
              <router-link
                :to="{name:'project-view',query:{id:item.project_id}}"
                class="option default-ts"
              >{{item.projectName}}</router-link>
            </div>
            <div class="show-time">{{item.createdAt | showTime}}</div>
          </div>
          <div v-else-if="item.type==='清单任务'" class="flex-column">
            <router-link
              :to="{name:'todo-detail',query:{todo_id:item._id}}"
              class="option default-ts theme_font"
            >{{item.name | showSearch(keyword)}}</router-link>
            <div>
              <span class="mr-10">任务清单:</span>
              <router-link
                :to="{name:'list-detail',query:{list_id:item.list_id}}"
                class="option default-ts"
              >{{item.listName}}</router-link>
            </div>
            <div>
              <span class="mr-10">任务集:</span>
              <router-link
                :to="{name:'project-view',query:{id:item.project_id}}"
                class="option default-ts"
              >{{item.projectName}}</router-link>
            </div>
            <div class="show-time">{{item.createdAt | showTime}}</div>
          </div>
          <div v-else-if="item.type==='子任务'" class="flex-column">
            <span class="option default-ts theme_font">{{item.name | showSearch(keyword)}}</span>
            <div>
              <span class="mr-10">父任务:</span>
              <router-link
                :to="{name:'todo-detail',query:{todo_id:item.parent_todo}}"
                class="option default-ts"
              >{{item.parentTodoName}}</router-link>
            </div>
            <div>
              <span class="mr-10">任务集:</span>
              <router-link
                :to="{name:'project-view',query:{id:item.project_id}}"
                class="option default-ts"
              >{{item.projectName}}</router-link>
            </div>
            <div class="show-time">{{item.createdAt | showTime}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { commonApi } from "@/api";
const moment = require("moment");
export default {
  name: "",
  data() {
    return {
      keyword: "", //搜索关键字,
      sortBy: 0, // 0时间 1相关性
      totalCount: 0, //总搜索数目
      contentList: []
    };
  },
  mounted() {
    this.keyword = this.$route.query.keyword;
    this.getContent();
  },
  filters: {
    showTime(val) {
      return moment(val).format("MM月DD日");
    },
    showSearch(val, keyword) {
      return val;
      //   return val
      //     .split(keyword)
      //     .join('<span class="hightLight">' + keyword + "</span>");
    }
  },
  computed: {},
  methods: {
    getContent() {
      let p = {
        keyword: this.keyword
      };
      if (p.keyword === "") {
        this.$Message.error("请输入内容进行搜索");
        return;
      }
      commonApi.getSearchContent(p).then(res => {
        console.log(res);
        this.contentList = res.result;
        this.totalCount = res.totalCount;
      });
    },
    backLast() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.thisSearch {
  .ivu-divider {
    margin: 0;
  }
}
.title-back {
  color: black;
}
.thisTitle {
  height: 50px;
  padding: 10px;
  width: 962px;
  background: rgba(168, 204, 204, 0.13);
}
.title {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 22px;
  font-weight: bolder;
  font-variant: small-caps;
}
.back_img {
  height: 21px;
  width: 21px;
  cursor: pointer;
}
.select {
  padding: 10px 24px;
}
.myInput {
  width: 200px;
}
// 展示具体内容
.show-content {
  padding: 10px 24px;
}
.show-num {
  font-size: 18px;
}
.content {
  padding: 0 24px;
}
.search-type {
  color: #242424;
  font-weight: bolder;
  //   font-size: 16px;
}
.default-ts {
  color: #242424;
  font-weight: bolder;
}
.show-time {
  color: gray;
  font-size: 13px;
}
.hightLight {
  border: 1px solid blue;
}
</style>