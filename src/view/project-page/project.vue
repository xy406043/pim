<template>
  <div>
    <div class="le">
      <span :class="['content-icon',(tabValue===0)?'content-icon':'']">
        <Icon type="ios-radio-button-on" />
      </span>
      <span class="ml-10 option">全部项目</span>
    </div>
    <div class="ge">
      <span class="theme_font mr-10 option" @click="showAdd">新建项目</span>
      <span class="content-icon">
        <Icon type="ios-apps" />
        <Icon type="md-list" />
      </span>
    </div>
    <div class="view">
      <!-- 收藏项目 -->
      <div v-show="tabValue===0">啊啊</div>
      <!-- 全部项目---网格类型 -->
      <div v-show="tabValue===1"></div>
      <!-- 全部项目---列表类型 -->
      <div v-show="tabValue===2">
        <div v-for="(item,index) in projectList" :key="index">
          <div
            class="project-item column-center flex-space-between"
            @mouseover="moveOn(index)"
            @mouseleave="moveDown(index)"
            @click="toProjectDetail(item._id)"
          >
            <div>
              <strong
                class="font-18 black option ml-10"
                @click="toProjectDetail(item._id)"
              >{{item.projectName}}</strong>
              <Icon class="option" v-show="showIndex===index" size="22" type="md-star" />
            </div>
            <div>
              <Icon
                size="22"
                v-show="showIndex===index"
                @click.stop="handleDelete(item._id)"
                class="option"
                type="ios-trash"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal
      :z-index="1000"
      v-model="showAddModel"
      fullscreen
      footer-hide
      @on-visible-change="initAdd"
    >
      <div class="relative_zs" @click="hideAdd">
        <Icon size="31" type="md-arrow-back" />
      </div>
      <!-- 内容 -->
      <div class="flex-all-center">
        <Input v-model="projectName" placeholder="请输入新的项目名字"></Input>
        <Button class="button-common" type="default" @click="hideAdd">取消</Button>
        <Button class="button-common" type="primary" @click="addProject">确认</Button>
      </div>
      <!-- 按钮、 -->
    </Modal>
  </div>
</template>
<script>
/**
 * 项目首页，替代原有的home主页
 */
import { projectApi } from "@/api";
const moment = require("moment");
export default {
  name: "",
  data() {
    return {
      showAddModel: false,
      projectName: "",
      projectList: [],
      tabValue: 2,
      showIndex: -1
    };
  },
  mounted() {
    this.getProjectList();
  },
  methods: {
    getProjectList() {
      projectApi.getProjectList().then(res => {
        this.projectList = res.result;
        // console.log("list", this.projectList);
      });
    },
    toProjectDetail(id) {
        // console.log("to",id)
      this.$router.push({
        name: "project-view",
        query: {
          id: id
        }
      });
    },
    showAdd() {
      this.showAddModel = true;
    },
    hideAdd() {
      this.showAddModel = false;
      this.initAdd();
    },
    initAdd() {
      this.projectName = "";
    },
    moveOn(index) {
      this.showIndex = index;
    },
    moveDown() {
      this.showIndex = -1;
    },
    addProject() {
      let p = {
        projectName: this.projectName
      };
      projectApi.addProject(p).then(res => {
        if (res.code === 0) {
          this.initAdd();
          this.hideAdd();
          this.getProjectList();
          this.$Message.success("新增成功");
        } else {
          this.$Message.error(res.errorMsg);
        }
      });
    },
    /**
     * 删除项目，相关的所有任务，日程安排都会被删除
     */
    handleDelete(id) {
      let vm = this;
      let lock = true;
      vm.$Modal.confirm({
        title: `即将删除本项目的所有内容，确定要删除么？`,
        onOk: () => {
          if (lock) {
            lock = false;
            console.log("sas")
            projectApi.deleteProject(id).then(res => {
              if (res.code === 0) {
                this.getProjectList()
                this.$Message.success("删除成功");
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.le {
  position: absolute;
  top: 30px;
  left: 20px;
}
.view {
  margin-top: 40px;
}
.ge {
  position: absolute;
  top: 30px;
  right: 20px;
}
.project-item {
  height: 52px;
  border-top: 1px solid gray;
}
.project-item:hover {
  background: #eff7fa;
  cursor: pointer;
}
</style>