<template>
  <div class="cal-wrap">
    <div class="cal-top">
      <div class="cal-YM">
        <Spin v-if="calLoading" fix>
          <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
        </Spin>
        <div class="YM-text ovh">
          <div title="上一月" class="cal-left option fl" @click="getPrevMonth">
            <Icon type="md-arrow-round-back"></Icon>
          </div>
          {{calendar.year}}年-{{calendar.month}}月
          <span
            @click="backToday"
            class="option theme_font"
            title="返回今天"
            v-if="showToday"
          >今</span>
          <div title="下一月" class="cal-right option fr" @click="getNextMonth">
            <Icon type="md-arrow-round-forward"></Icon>
          </div>
        </div>
      </div>
      <div class="cal-week-wrap ovh">
        <div class="cal-week">日</div>
        <div class="cal-week" v-for="(item,index) in calendar.weeks" :key="index">{{item}}</div>
        <div class="cal-week">六</div>
      </div>
    </div>

    <table class="cal-table mb20">
      <tr v-for="(item,itemIndex) in calendar.dayList" :key="itemIndex">
        <td v-for="(key,keyIndex) in item" :key="key.date" :class="{'bg-grey':key.disable}">
          <div
            class="cal-item"
            @mouseover="getIndex(itemIndex,keyIndex)"
            @mouseleave="leaveIndex(itemIndex,keyIndex)"
          >
            <div
              :class="{'cal-active':calendar.isDay === key.date}"
              style="color:#000000;display:block"
            >{{key.day}}</div>
            <div
              v-for="date in scheduleList"
              :key="item._id"
              class="display-inline-block mr-5"
              @click="showSchedule(key,date)"
            >
              <Avatar
                class="option"
                :size="30"
                v-show="key.formatDate && key.formatDate<=date.endAt &&key.formatDate>=date.startAt"
                :username="date.title"
              ></Avatar>
            </div>
            <div class="schedule-item" v-show="key.showSchedule===true">
              <div class="every-show-div">
                <div>标题：{{scheduleItem.title}}</div>
                <div>时间：{{scheduleItem.startAt}}{{scheduleItem.endAt}}</div>

              </div>
              <Divider style="margin:0"/>
              <div class="flex-space-between font-16" style="padding:12px" >
                 <div>
                   <span class="option-delete" @click="cancelSchedule">取消</span>
                 </div>
                 <div>
                   <span class="option" @click="toSchedule(scheduleItem._id)">编辑</span>
                 </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
/**
 * @时间相关注意点
 * @传到node客户端的Date时间格式与浏览器的时间格式不一致
 * @需要再两端分别进行统一
 */
import { projectApi } from "@/api";
import Avatar from "vue-avatar";
export default {
  name: "myCalendar",
  components: {
    Avatar
  },
  props: {
    showToday: {
      type: Boolean,
      default: false //是否显示返回今天按钮
    }
  },
  data() {
    return {
      calLoading: false,
      scheduleList: [],
      rowIndex: -1,
      colIndex: -1,
      snow: -1,
      showIt: false,
      scheduleItem: [],
      calendar: {
        //日历
        dayList: [], //二维数组，循环行，循环列
        prev: [], //当前日历前一个月的几天
        current: [], //当前月
        next: [], //当前日历后一个月的几天
        year: "", //当前页 日历 年
        tempArr: [],
        /**
         *
         * @月份01的时间比1的时间多了8小时
         */
        month: "", // 当前页日历  月
        shortMonth: "", //未格式化的日期
        weeks: ["一", "二", "三", "四", "五"],
        isDay: "" //判断是否是'今天'
      }
    };
  },
  mounted() {
    this.backToday();
  },
  methods: {
    getSchedule() {
      let time = new Date(this.calendar.year, this.calendar.month, 0); //当月月末
      let time2 = new Date(this.calendar.year, this.calendar.month - 1); //当月月初
      let p = {
        startAt: time2,
        endAt: time
      };
      projectApi.getMonthScheduleList(p).then(res => {
        this.scheduleList = res.result;
        this.scheduleList.map(item => {
          item.startAt = new Date(item.startAt);
          item.endAt = new Date(item.endAt);
          // console.log(item.startAt, item.endAt);
        });
      });
    },
    showSchedule(item, know) {
      // this.snow=(Math.sqrt(this.rowIndex))*this.colIndex
      // this.showIt=true
      this.calendar.tempArr.map(item => {
        item.showSchedule = false;
      });
      console.log(know);
      this.scheduleItem = know;
      item.showSchedule = true;
    },
    cancelSchedule() {
      this.calendar.tempArr.map(item => {
        item.showSchedule = false;
      });
    },
    formatDate(val) {
      if (val < 10) {
        return "0" + val;
      } else {
        return val;
      }
    },
    getLastDate(year, month) {
      // 月末
      return new Date(year, month, 0);
    },
    getmonthDays() {
      //获取上月 当前月和下月天数
      let that = this;
      let y = that.calendar.year;
      let m = that.calendar.month;
      let sm = that.calendar.shortMonth;
      let preYear; //上一年
      let preMonth; //上一月
      let nextYear; //下一年
      let nextMonth; //下一月
      that.calendar.current = [];
      that.calendar.prev = [];
      that.calendar.next = [];

      // 当前月天数
      for (let i = 1; i <= that.getLastDate(y, m).getDate(); i++) {
        //date用于日期判断，day用于显示，flag用于状态判断
        that.calendar.current.push({
          date: y + "-" + m + "-" + that.formatDate(i),
          formatDate: new Date(y + "-" + sm + "-" + that.formatDate(i)),
          day: i,
          timeList: [],
          disable: false,
          showSchedule: false
        });
      }

      /*上月*/
      let d = that.getLastDate(y, m - 1).getDate(); //上月一共多少天
      preYear = m == 1 ? y - 1 : y; //当前月是1月，那么上一月的年份要-1
      preMonth = m == 1 ? 12 : that.formatDate(parseInt(m) - 1); //当前月是1月，那么上一月是12月
      for (let j = that.getLastDate(y, m - 1).getDay(); j >= 0; j--) {
        //getDay 获取当天是星期几
        // console.log(j)
        that.calendar.prev.push({
          date: preYear + "-" + preMonth + "-" + (d - j),
          day: d - j,
          timeList: [],
          disable: true,
          showSchedule: false
        });
      }
      // console.log(this.calendar.prev)

      /*下月*/
      nextYear = m == 12 ? y + 1 : y; //当前月是12月，那么下一月的年份要+1
      nextMonth = m == 12 ? "01" : that.formatDate(parseInt(m) + 1); //当前月是12月，那么下一月是1月
      for (
        let k = 1;
        k <= 42 - that.calendar.current.length - that.calendar.prev.length;
        k++
      ) {
        that.calendar.next.push({
          date: nextYear + "-" + nextMonth + "-" + that.formatDate(k),
          day: k,
          timeList: [],
          disable: true,
          showSchedule: false
        });
      }
      that.calendar.dayList = [];

      // 数组合并
      let tempArr = that.calendar.prev.concat(
        that.calendar.current,
        that.calendar.next
      );
      that.calendar.tempArr = tempArr;
      // 数组分组，每7个一组
      for (let i = 0; i < tempArr.length; i += 7) {
        that.calendar.dayList.push(tempArr.slice(i, i + 7));
      }
      this.getSchedule();
      // console.log(this.calendar.dayList);
    },
    getPrevMonth() {
      //上一月
      if (this.calendar.month != 1) {
        this.calendar.month = this.formatDate(--this.calendar.month);
        this.calendar.shortMonth = this.calendar.month;
      } else {
        this.calendar.month = 12;
        this.calendar.shortMonth = 12;
        this.calendar.year = --this.calendar.year;
      }
      this.getmonthDays();
      this.currentDay();
      this.$emit("on-click", 0);
    },
    getNextMonth() {
      //下一月
      if (this.calendar.month < 12) {
        this.calendar.month = this.formatDate(++this.calendar.month);
        this.calendar.shortMonth = this.calendar.month;
      } else {
        this.calendar.month = "01";
        this.calendar.shortMonth = 1;
        this.calendar.year = ++this.calendar.year;
      }
      this.getmonthDays();
      this.currentDay();
      this.$emit("on-click", 1);
    },
    currentDay() {
      //获取今天,高亮显示今天
      let that = this;
      let date = new Date();
      let y = that.calendar.year;
      let m = that.calendar.month;
      if (y === date.getFullYear() && m == date.getMonth() + 1) {
        //如果是当年当月
        that.calendar.isDay =
          y + "-" + m + "-" + that.formatDate(date.getDate()); //获取到今天的号数
      } else {
        that.calendar.isDay = -1;
      }
      // console.log(this.calendar.isDay)
    },
    backToday() {
      //返回今天
      let that = this;
      let d = new Date();
      that.calendar.year = d.getFullYear();
      that.calendar.month = that.formatDate(d.getMonth() + 1);
      that.calendar.shortMonth = d.getMonth() + 1;
      that.currentDay();
      that.getmonthDays();
    },
    getIndex(itemIndex, leaveIndex) {
      // this.rowIndex = itemIndex;
      // this.colIndex = leaveIndex;
    },
    leaveIndex(itemIndex, leaveIndex) {
      // this.rowIndex = -1;
      // this.colIndex = -1;
    },
    toSchedule(id){
      this.$router.push({
        name: "schedule",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-affix {
  background: #fff;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.hand {
  cursor: pointer;
}
.cal-wrap,
.perconsult .cert-title + p {
  font-family: "SimSun";
}
.cal-YM {
  text-align: center;
  font-size: 28px;
  line-height: 50px;
  width: 260px;
  margin: 0 auto;
}
.cal-body {
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
.cal-week-wrap {
  border: 1px solid #eeeeee;
  border-bottom: none;
}
.cal-week {
  width: 14.28%;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  float: left;
}
.YM-text {
  font-size: 18px;
}
.YM-text span {
  margin: -10px 0 0 10px;
  font-size: 24px;
  border-radius: 3px;
}
.cal-left,
.cal-right {
  font-size: 22px;
  width: 20px;
  text-align: center;
}
.cal-left:hover > i,
.cal-right:hover > i {
  color: #3583f7;
}
.cal-table {
  width: 100%;
  border: 1px solid #eee;
  text-align: center;
  border-collapse: collapse;
}
.cal-table tr {
  border-bottom: 1px solid #eee;
}

.cal-table tr td:first-child .cal-item > span,
.cal-table tr td:last-child .cal-item > span {
  // color: red;
}
.cal-table td {
  border-right: 1px #d4d4d4 solid;
  // cursor: pointer;
  vertical-align: top;
  font-size: 20px;
}
.cal-table td:hover {
  // background: #d4d4d4;
}

.cal-item {
  width: 129px;
  padding: 5px;
  min-height: 100px;
  position: relative;
}
.cal-item > span {
  // display: block;
  // width: 32px;
  // height: 32px;
  border-radius: 50%;
  margin: 4px auto;
  line-height: 32px;
  font-size: 16px;
}
.schedule-item {
  position: absolute;
  // display:block;
  right: -200px;
  top: 60px;
  background: #ffffff;
  height: 160px;
  width: 250px;
  z-index: 2129;
  border-radius: 12px;
  border: 1px solid #000000;
}
.cal-active {
  // color: #fff !important;
  font-size: 24px;
  font-weight: bolder;
  text-shadow: 1px 2px 4px aqua;
  // background: #3583f7;
  // border-radius: 20%;
  // padding: 8px 11px;
}
.cal-time-list {
  font-size: 12px;
  text-align: left;
}
.cal-time-list > p {
  width: 100px;
  margin: 0 auto;
  padding-left: 8px;
  height: 18px;
  line-height: 18px;
}
.cal-time-list > p > span {
  display: block;
  overflow: hidden;
}
.bg-grey span {
  color: rgb(182, 181, 181) !important;
}
.every-show-div{
  text-align:start !important;
  font-size:16px;
}
</style>