<template>
  <div class="thisNotice">
    <div class="column-center flex-space-between thisTitle flex-row flex-space-between">
      <div>
        <span class="theme_font ml-10">我的通知</span>
      </div>
      <div>
        <span class="ml-10 mt-5" @click="backLast">
          <img src="../../assets/icon/back.png" class="back_img" alt="s" />
        </span>
      </div>
    </div>
    <Divider />
    <div>
      <vs-button dark dashed style="width:120px" class="font-bolder mt-5 mb-5 ml-5" @click="setRead">全部设为已读</vs-button>
    </div>
    <Divider />
    <!-- 展示通知内容 -->
    <div class="show-content">
      <div
        v-for="item in noticeList"
        :key="item._id"
        :class="['flex-space-between','every-content',item.read?'':'none-read']"
      >
        <div class="font-bolder mt-5 mb-5 font-18">
          <span class="value_color">{{item.content}}</span>
        </div>
        <div class="every-time">{{item.sendTime |showTime }}</div>
      </div>
      <Page
        :currentPage.sync="currentPage"
        :totalCount="totalCount"
        :pageSize.sync="pageSize"
        @pageChanged="getAllNotice"
      ></Page>
    </div>
  </div>
</template>

<script>
/**
 * @通知总页面
 */
import { commonApi } from "@/api";
import Page from "_c/self-page/page";
const moment = require("moment");
export default {
  name: "notice",
  components: {
    Page
  },
  inject: ["reload"],
  data() {
    return {
      noticeList: [],
      currentPage: 1,
      pageSize: 10,
      totalCount: 0
    };
  },
  filters: {
    showTime(val) {
      return moment(val).format("M-D HH:mm");
    }
  },
  mounted() {
    this.getAllNotice();
  },
  methods: {
    getAllNotice() {
      let p = {};
      commonApi.getNoticeList(p).then(res => {
        this.noticeList = res.result;
        this.totalCount = res.totalCount;
      });
    },
    backLast() {
      this.$router.go(-1);
    },
    setRead() {
      //将所有的通知设为已读
      let p = {};
      commonApi.setNotice(p).then(res => {
        if (res.code === 0) {
          this.getAllNotice();
        }
      });
      this.$nextTick(() => {
        this.reload();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.thisNotice {
  .ivu-divider {
    margin: 0;
  }
}
.thisTitle {
  height: 50px;
  padding: 10px;
  width: 962px;
  background: rgba(168, 204, 204, 0.13);
}
.back_img {
  height: 21px;
  width: 21px;
  cursor: pointer;
}
.page {
  // position: absolute;
  // margin-right: 20px;
  bottom: 20px;
  right: 20px;
}
.show-content {
  padding: 20px 24px;
}
.every-time {
  font-size: 16px;
}
.every-content {
  padding: 0 12px;
}
.none-read {
  background: rgb(241, 252, 252) !important;
}
</style>