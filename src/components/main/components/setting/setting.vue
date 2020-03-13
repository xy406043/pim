<template>
  <div class="column-center showL">
    <!-- <font class="mr-16 ml-16 tab-icon option" @click="toAbout">
      <Icon size="24" type="md-help-circle" />
    </font> -->
    <font class="mr-16 ml-16 tab-icon option" @click="showNotice">
      <Icon size="24" type="md-notifications-outline" />
    </font>
    <Dropdown trigger="click">
      <font class="mr-16 option">
        <Avatar :src="Avatar"></Avatar>
        <Icon size="18" type="md-arrow-dropdown"></Icon>
      </font>
      <DropdownMenu slot="list">
        <div class="personHeader flex-column">
          <span class="font-24 black">{{nickName}}</span>
          <span class="font-12">{{email}}</span>
        </div>
        <Divider></Divider>
        <!-- 这里由于要添加样式，改变其颜色 -->
        <DropdownItem @click.native="setting">
          <div
            :class="['item', (showIt&&index===1)?'theme_hover':'' ]"
            @mouseover="addm(1)"
            @mouseleave="removem(1)"
          >
            <b :class="['font-16', (showIt&&index===1)?'theme_show_white':'theme_font' ]">个人设置</b>
            <div class="font-14">头像，姓名，密码，通知等</div>
          </div>
        </DropdownItem>
        <DropdownItem @click.native>
          <div
            :class="['item',(showIt&& index===2)?'theme_hover':'' ]"
            @mouseover="addm(2)"
            @mouseleave="removem(2)"
          >
            <b :class="['font-16', (showIt&&index===2)?'theme_show_white':'theme_font' ]">应用中心</b>
            <div class="font-14">相关应用，api等</div>
          </div>
        </DropdownItem>
        <Divider></Divider>
        <DropdownItem @click.native="logout">
          <div
            :class="['item' ,'logout' ,showIt&&index===3?'theme_hover':'' ]"
            @mouseover="addm(3)"
            @mouseleave="removem(3)"
          >
            <b :class="['font-16', (showIt&&index===3)?'theme_show_white':'theme_font' ]">退出登录</b>
            <!-- <span class="font-14">清除token</span> -->
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
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
export default {
  name: "useSetting",
  props: {
    Avatar: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      email: localRead("email"),
      nickName: this.$store.state.user.nickName,
      index: 0,
      showIt: false
    };
  },
  mounted() {},
  methods: {
    ...mapActions(["handleLogOut"]),
    toAbout() {
      this.$router.push({ name: "about" });
    },
    setting() {
      this.$router.push({
        name: "person-setting"
      });
    },
    showNotice() {},
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
    }
  }
};
</script>

<style  scoped lang="less">
.personHeader {
  background: #dadadf;
  border-radius: 10px 10px 0 0;
  padding: 15px 10px 15px 10px;
}
.logout {
}
</style>

<style lang="less">
.showL {
  .ivu-select-dropdown {
    border-radius: 10px;
    padding: 0;
    left: 0;
    background: rgb(255, 255, 255);
  }
  .ivu-divider-horizontal {
    margin: 0;
    background: #9e9e9c;
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
</style>