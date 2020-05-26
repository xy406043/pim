<template>
  <div class="this_home">
    <!-- Time栏目 -->
    <div class="weather">
      <div class="date">
        {{province+' '}}
        <span class="font-24">{{city}}</span>
      </div>
      <div class="font-16">
        <span class="font-24">{{wList.type+' '}}</span>
        {{wList.low+' '+wList.high}}
      </div>
      <div class="font">{{wList.fengxiang + ' '}}{{wList.fengli}}</div>
    </div>
    <div class="clock">
      <div class="date">{{date}}</div>
      <div class="time">{{time}}</div>
      <div class="font">人生一世，自在生活</div>
    </div>
    <div class="el-looo" style="display:inline-block;float:right">
      <img class="header-img" src="http://xynagisa.xyz/3E1FC9B575243BE1BBE464F1D7DBF8FD_1590475736477.jpg" alt="tel" />
    </div>
    <!-- 任务层 -->
    <div>
      <div class="list-content">
        <div class="flex-space-between column-center">
          <span class="min-width">我的任务集:</span>
          <router-link :to="{name:'project'}" class="fs option">{{allProjectNum}}</router-link>
        </div>
        <div class="flex-space-between column-center">
          <span class="min-width">我的日记:</span>
          <router-link :to="{name:'note'}" class="fs option">{{allNoteNum}}</router-link>
        </div>
        <div class="flex-space-between column-center">
          <span class="min-width">我的通讯录:</span>
          <router-link :to="{name:'address-book'}" class="fs option">{{allAddressNum}}</router-link>
        </div>
        <div class="flex-space-between column-center">
          <span class="min-width">我的网址收藏:</span>
          <router-link :to="{name:'bookmarking'}" class="fs option">{{allBookmarkingNum}}</router-link>
        </div>
      </div>
      <div class="list-content">
        <div class="flex-space-between column-center">
          <span class="min-width">我的任务:</span>
          <router-link style="color:black" :to="{name:'project'}" class="fs option">{{allTodoNum}}</router-link>
        </div>
        <!-- 未安排时间且为开始 -->
        <div class="flex-space-between column-center">
          <span class="min-width">未安排任务:</span>
          <span class="fs" style="color:orange" @click="toScreen(1)">{{toBeginProject}}</span>
        </div>
        <!-- 过期未完成 -->
        <div class="flex-space-between column-center">
          <span class="min-width">已延误任务:</span>
          <span class="fs" style="color:red" @click="toScreen(2)">{{unFinishedProject}}</span>
        </div>
        <div class="flex-space-between column-center">
          <span class="min-width">本周任务:</span>
          <span class="fs option" @click="toScreen(3)">{{thisWeekProject}}</span>
        </div>
      </div>
      <!-- <div>
        <ve-line :data="chartData"></ve-line>
      </div>-->
    </div>
    <div class="thisContent">
      <!-- 日记 -->
      <div class="content">
        <b class="content-title" v-if="limitNoteList.length>0">最近日记</b>
        <div class="content-c flex-column">
          <div v-for="item in limitNoteList" :key="item._id">
            <div class="content-li option" @click="toEveryNote(item)">{{item.title}}</div>
          </div>
          <div>
            <span v-show="limitNoteList.length===10" class="option" @click="toNote">查看更多</span>
          </div>
        </div>
      </div>
      <!-- 通讯录 -->
      <div class="content">
        <b class="content-title" v-if="limitAddressList.length>0">联系人</b>
        <div class="content-c flex-column">
          <div class="content-li option" v-for="item in limitAddressList" :key="item._id">
            <div class="content-li option" @click="toEveryAddress(item)">{{item.name}}</div>
          </div>
          <div>
            <span v-show="limitAddressList.length===10" class="option" @click="toEveryAddress">查看更多</span>
          </div>
        </div>
      </div>
      <!-- 网址收藏 -->
      <div class="content">
        <b class="content-title" v-if="limitBookMarkList.length>0">最近网址收藏</b>
        <div class="content-c flex-column">
          <div class="column-center mb-10" v-for="item in limitBookMarkList" :key="item._id">
            <Avatar v-if="item.imgUrl===''" class="mr-10" :size="40" :username="item.title"></Avatar>
            <img v-else :src="item.imgUrl" class="img-avatar mr-10" alt="图标" />
            <a class="content-li option" :href="item.url" target="blank">{{item.title}}</a>
          </div>
          <div>
            <span v-show="limitBookMarkList.length===5" class="option" @click="toBookMarking">查看更多</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @主页显示布局下的基本信息
 * @param {参考点：流动布局}
 */
import axios from "axios";
import { commonApi, knowApi } from "@/api";
import Avatar from "vue-avatar";
import config from "@/config"
var week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
export default {
  name: "home",
  components: {
    Avatar
  },
  data() {
    return {
      date: "",
      time: "",
      province: "江苏省",
      city: "昆山市",
      wList: [],
      allAddressNum: 0,
      allBookmarkingNum: 0,
      allProjectNum: 0,
      allTodoNum: 0,
      allNoteNum: 0,
      thisWeekProject: 0,
      toBeginProject: 0,
      unFinishedProject: 0,
      words: [
        ["romance", 19],
        ["horror", 3],
        ["fantasy", 7],
        ["adventure", 3]
      ],
      limitBookMarkList: [],
      limitNoteList: [],
      limitAddressList: [],
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      }
    };
  },
  async mounted() {
   await this.getCity()
    const loading = this.$vs.loading({ type: "square" });
    setInterval(this.updateTime, 1000);
    await this.getWeather();
    await this.getOverView();
    await this.getLimitNote();
    await this.getLimitAddress();
    await this.getLimitBookMark();
    await loading.close();
  },
  filters: {},
  methods: {
    getOverView() {
      commonApi.getOverView().then(res => {
        let rel = res.result;
        this.allAddressNum = rel.allAddressNum;
        this.allBookmarkingNum = rel.allBookmarkingNum;
        this.allProjectNum = rel.allProjectNum;
        this.allTodoNum = rel.allTodoNum;
        this.allNoteNum = rel.allNoteNum;
        this.thisWeekProject = rel.thisWeekProject;
        this.unFinishedProject = rel.unFinishedProject;
        this.toBeginProject = rel.toBeginProject;
        // console.log(rel.allProjectNum)
      });
    },
    getCity() {
      let _this=this
      const geolocation= new BMap.Geolocation()
      geolocation.getCurrentPosition(function getinfo(position ){
        console.log("position",position.address)
        _this.city =position.address.city
        _this.province =position.address.province
        _this.getWeather()
        // console.log("位置",_this.city)
      },function(e){
        // console.log(e)
        _this.city="昆山"
      },{provider:'baidu'})
    },
    toScreen(val) {
      // 根据三种不同的条件进入不同的页面
      this.$router.push({
        name: "project-screen",
        query: {
          type: val
        }
      });
    },
    getLimitNote() {
      let options = {
        limit: 10
      };
      knowApi.getLimitNote(options).then(res => {
        this.limitNoteList = res.result;
      });
    },
    getLimitAddress() {
      let options = {
        limit: 10
      };
      knowApi.getLimitAddress(options).then(res => {
        console.log("res???", res);
        this.limitAddressList = res.result;
      });
    },
    getLimitBookMark() {
      let options = {
        limit: 5
      };
      knowApi.getLimitBookMark(options).then(res => {
        this.limitBookMarkList = res.result;
      });
    },
    getWeather() {
      axios({
        url: "http://wthrcdn.etouch.cn/weather_mini?city=" + this.city,
        method: "get"
      }).then(res => {
        // console.log(res.data.data.forecast[0])
        this.wList = res.data.data.forecast[0];
        this.wList.fengli = this.wList.fengli.slice(9, -3);
      });
    },
    updateTime() {
      var cd = new Date();
      this.time =
        this.getZero(cd.getHours(), 2) +
        ":" +
        this.getZero(cd.getMinutes(), 2) +
        ":" +
        this.getZero(cd.getSeconds(), 2);
      this.date =
        this.getZero(cd.getFullYear(), 4) +
        "-" +
        this.getZero(cd.getMonth() + 1, 2) +
        "-" +
        this.getZero(cd.getDate(), 2) +
        " " +
        week[cd.getDay()];
    },
    getZero(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    toEveryNote(item) {
      this.$router.push({
        name: "note-view",
        query: {
          id: item._id
        }
      });
    },
    toNote() {
      this.$router.push({
        name: "note"
      });
    },
    toEveryAddress(item) {
      this.$router.push({
        name: "address-book"
      });
    },
    toBookMarking() {
      this.$router.push({
        name: "bookmarking"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.this_home {
  padding: 20px;
}
.clock {
  display: inline-block;
  padding: 20px;
  font-family: "Courier New", Courier, monospace;
  //   border: 1px solid #bac812;
  text-align: center;
  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
}
.date {
  font-size: 18px;
  letter-spacing: 0.1em;
}
.time {
  font-size: 28px;
  letter-spacing: 0.45em;
}
.list-content {
  display: inline-block;
  padding: 20px;
  text-align: left;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.weather {
  display: inline-block;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  // text-align: left;
  text-shadow: 0 0 20px #0ae65e, 0 0 20px rgba(10, 175, 230, 0);
}
.thisContent {
  display: flex;
  justify-content: space-between;
}
.content {
  padding: 5px 6px;
  display: inline-block;
  min-height: 250px;
  // border: 1px solid #000000;
  min-width: 200px;
}
.content-title {
  font-size: 20px;
}
.content-li {
  font-family: "Times New Roman", Times, serif;
  font-size: 15px;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.content-li:hover {
  text-decoration: underline;
  margin: auto 0;
}
.icon {
  display: inline-block;
  height: 25px;
  width: 25px;
  margin-bottom: 10px;
  margin-right: 12px;
  background: #0aafe6;
}
.header-img {
  width: 240px;
}
.fs {
  cursor: pointer;
  font-size: 18px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin-left: 20px;
}
.img-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.el-looo {
  // height: 300px;
  // width: 300px;
}
</style>