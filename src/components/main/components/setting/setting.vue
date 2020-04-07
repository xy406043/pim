<template>
  <div class="column-center showL">
    <font class="mr-16 ml-16 tab-icon option" @click="toAbout">
      <Icon size="24" type="md-help-circle" />
    </font>
    <!-- FIXME:通知层 -->
    <div class="thisNoticeOuter">
      <Dropdown trigger="click">
        <font class="mr-16 tab-icon option" @click="showNotice">
          <Badge :count="noticeNum" class-name="thmeme_hover">
            <a href="#" class="demo-badge"></a>
            <Icon size="24" type="md-notifications-outline" />
          </Badge>
        </font>
        <DropdownMenu slot="list">
          <div class="notice-outer">
            <div class="notice-header">
              <span class="title-left">通知</span>
            </div>
            <Divider />
            <div v-if="noticeList.length!==0" class="notice-content">
              <div
                v-for="item in noticeList"
                :key="item._id"
                :class="['every-notice',item.read?'':'no-read']"
              >
                <div class="flex-space-between">
                  <div class="every-title theme_font">{{item.title}}</div>
                  <div class="every-time">{{item.sendTime | showTime}}</div>
                </div>
                <div class="every-content">{{item.content}}</div>
              </div>
            </div>
            <div v-else class="flex-all-center none-notice notice-content">- 没有新通知 -</div>
            <div class="notice-footer flex-space-between">
              <div class="option" @click="setRead">
                <span>
                  <Icon type="md-thumbs-up" />全部设为已读
                </span>
              </div>
              <!-- <router-link :to="{name:'notice'}" class="notice-footer-text theme_font">查看全部消息</router-link> -->
              <div class="notice-footer-text theme_font option" @click="toAllNotice">查看全部消息</div>
            </div>
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
    <!-- TODO:个人层 -->
    <div class="thisSetting">
      <Dropdown trigger="click">
        <font class="mr-16 option">
          <Avatar :src="Avatar"></Avatar>
          <Icon size="18" type="md-arrow-dropdown"></Icon>
        </font>
        <DropdownMenu slot="list">
          <div class="personHeader flex-column">
            <span class="font-24 black font-bolder">{{nickName}}</span>
            <span class="font-12 font-bolder">{{email}}</span>
          </div>
          <Divider />
          <!-- 这里由于要添加样式，改变其颜色 -->
          <DropdownItem @click.native="setting">
            <div
              :class="['item', (showIt&&index===1)?'theme_hover':'' ]"
              @mouseover="addm(1)"
              @mouseleave="removem(1)"
            >
              <b :class="['font-16','font-bolder', (showIt&&index===1)?'theme_show_white':'theme_font' ]">个人设置</b>
              <div class="font-14 font-bolder">头像，姓名，密码，通知等</div>
            </div>
          </DropdownItem>
          <!-- <DropdownItem @click.native>
            <div
              :class="['item',(showIt&& index===2)?'theme_hover':'' ]"
              @mouseover="addm(2)"
              @mouseleave="removem(2)"
            >
              <b :class="['font-16','font-bolder', (showIt&&index===2)?'theme_show_white':'theme_font' ]">应用中心</b>
              <div class="font-14 font-bolder">相关应用，api等</div>
            </div>
          </DropdownItem> -->
          <Divider />
          <DropdownItem @click.native="logout">
            <div
              :class="['item' ,'logout' ,showIt&&index===3?'theme_hover':'' ]"
              @mouseover="addm(3)"
              @mouseleave="removem(3)"
            >
              <b :class="['font-16','font-bolder', (showIt&&index===3)?'theme_show_white':'theme_font' ]">退出登录</b>
              <!-- <span class="font-14">清除token</span> -->
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
/**
 * 右上角设置栏
 * 包含消息设置，个人设置
 * Dropdown组件z-index继承父级所在区域的z-index，因此要把main.vue中
 * .header设置足够高的z-index才可使dropdown不被中间区域遮挡
 */
import { mapActions } from "vuex";
import { localRead } from "@/libs/utils";
import { commonApi } from "@/api";
const moment = require("moment");
export default {
  name: "useSetting",
  props: {
    Avatar: {
      type: String,
      default: ""
    },
    email: String,
    nickName: String
  },
  data() {
    return {
      index: 0,
      showIt: false,
      noticeList: [], //消息通知列表,
      noticeNum: 0,
      allread: true
    };
  },
  mounted() {
    console.log("sasasasasas,");
    this.getNotice();
  },
  filters: {
    showTime(val) {
      return moment(val).format("M-D HH:mm");
    }
  },
  methods: {
    ...mapActions(["handleLogOut"]),
    getNotice() {
      commonApi.getLimitNotice().then(res => {
        this.noticeList = res.result;
        this.noticeNum = 0;
        for (let item of this.noticeList) {
          if (item.read === false) {
            this.noticeNum += 1;
            //存在未读通知
            this.allread = false;
          }
        }
      }).catch(err =>{
        console.log("错误",err)
      });
    },
    setRead() {
      //将所有的通知设为已读
      let p = {};
      commonApi.setNotice(p).then(res => {
        if (res.code === 0) {
          this.getNotice();
        }
      });
    },
    toAbout() {
      this.$router.push({ name: "about" });
    },
    setting() {
      this.$router.push({
        name: "person-setting"
      });
    },
    showNotice() {
      // 显示通知消息
    },
    logout() {
      this.handleLogOut().then(() => {
        this.$router.push({ name: "login" });
      });
    },
    addm(item) {
      this.showIt = true;
      this.index = item;
    },
    removem(item) {
      this.showIt = false;
      this.index = 0;
    },
    toAllNotice() {
      this.$router.push({
        name: "notice"
      });
    }
  }
};
</script>

<style  scoped lang="less">
.personHeader {
  background: #dadadf;
  border-radius: 4px 4px 0 0;
  padding: 15px 10px 15px 10px;
  background: rgba(238, 238, 238, 0.74);
}
.logout {
}
</style>

<style lang="less">
.thisSetting {
  .ivu-select-dropdown {
    border-radius: 4px;
    padding: 0;
    left: 0;
    background: rgb(255, 255, 255);
  }
  .ivu-divider {
    margin: 0;
  }
  .ivu-divider-horizontal {
    margin: 0;
    border-radius: 4px !important;
  }
  .item {
    margin: 10px 0;
    padding: 4px 10px;
    font-weight: 12px;
  }
  .ivu-dropdown-item {
    padding: 0;
  }
  .item:hover {
    color: #ffffff;
  }
}

// 显示通知
.thisNoticeOuter {
  .ivu-divider {
    margin: 0;
  }
  .ivu-select-dropdown {
    border-radius: 4px;
    padding: 0;
    left: 1000px !important;
    width: 400px;
  }
  .ivu-badge-count{
    border: 1px solid black;
    box-shadow: none;
    font-weight: bolder;
    font-size: 15px;
  }
}
.notice-outer {
  // padding: 10px;
}
.notice-header {
  padding: 10px;
  border-radius: 4px 4px 0 0;
  background: rgba(238, 238, 238, 0.671);

  .title-left {
    font-weight: bolder;
    font-size: 16px;
    color: black !important;
  }
}
.notice-content {
  // height: 0px;
  height: 200px;
  overflow-y: scroll;
}

.none-notice {
  font-size: 25px;
  color: gray;
}
.notice-footer {
  border-radius: 0 0 4px 4px;
  background: rgba(238, 238, 238, 0.671);
  padding: 12px 16px;
}
.every-notice {
  padding: 10px 16px;
}
.every-notice:hover {
  background: rgb(233, 244, 247);
}
.every-title {
  font-weight: bolder;
  font-size: 16px;
}
.every-time {
  color: gray;
}
.every-content {
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.no-read {
  background: rgb(233, 244, 247);
}
</style>