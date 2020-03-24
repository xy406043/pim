<template>
  <div class="project">
    <!-- <div class="column-center flex-space-between"> -->
    <!-- <div class="le">
      <span :class="['content-icon',(tabValue===0)?'content-icon':'']">
        <Icon type="md-star" />
      </span>
      <span class="ml-10 option">全部任务集</span>
    </div>
    <div class="ge">
      <span class="theme_font mr-10 option" @click="showAdd">新建任务集</span>
      <span class="content-icon">
        <Icon type="ios-apps" />
        <Icon type="md-list" />
      </span>
    </div>-->
    <!-- </div> -->
    <div class="column-center flex-space-between thisTitle flex-row">
      <div>
        <!-- <router-link to="know" class="title-back option mr-10">我的记事库</router-link>/ -->
        <span class="theme_font ml-10 font-24">我的任务集</span>
      </div>
      <div class="flex-row">
        <!-- <vs-button style="width:100px" success dashed class="font-bolder" @click="toScreen">任务筛选器</vs-button> -->
        <vs-button style="width:100px" success dashed class="font-bolder" @click="showAdd">新增任务集</vs-button>
      </div>
    </div>
    <Divider />
    <div class="select">
      <div class="mb-10 mt-10 ml-20 flex-row">
        <div class="flex-start column-center">
          <span class="theme_font mr-20">搜索：</span>
          <span>
            <Input class="myInput" search v-model="selectTitle" @on-search="getProjectList"></Input>
          </span>
        </div>
      </div>
    </div>

    <Divider />
    <div class="view">
      <!-- 收藏任务集 -->
      <div v-show="tabValue===0">啊啊</div>
      <!-- 全部任务集---网格类型 -->
      <div v-show="tabValue===1"></div>
      <!-- 全部任务集---列表类型 -->
      <div v-show="tabValue===2">
        <Divider style="background:black" />
        <div v-for="(item,index) in projectList" :key="index">
          <div
            class="project-item column-center flex-space-between"
            @mouseover="moveOn(index)"
            @mouseleave="moveDown(index)"
            @click="toProjectDetail(item._id)"
          >
            <div>
              <strong
                class="font-18 black option ml-10 mr-10"
                @click="toProjectDetail(item._id)"
              >{{item.projectName}}</strong>
              <span @click.stop="editCollected(item)">
                <Icon
                  class="option"
                  v-show="showIndex===index && item.collected===false"
                  size="22"
                  type="md-star"
                />
              </span>
              <span @click.stop="editCollected(item)" calss="theme_font">
                <Icon
                  class="option theme_font"
                  v-show="item.collected===true"
                  size="22"
                  type="md-star"
                />
              </span>
            </div>
            <div>
              <Icon
                size="22"
                v-show="showIndex===index"
                @click.stop="handleDelete(item._id)"
                class="option mr-20"
                type="md-trash"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal
      :z-index="1000"
      v-model="showAddModel"
      footer-hide
       :closable="false"
      @on-visible-change="initAdd"
    >
      <!-- 内容 -->
      <div class="modal-header" >
        <vs-input v-model="projectName" label-placeholder="请输入任务集标题"></vs-input>
        <div class=" flex-row modal-button flex-space-between">
        <!-- <Button class="button-common" type="default" @click="hideAdd">取消</Button> -->
        <vs-button  dark  dashed style="width:120px" @click="hideAdd">取消</vs-button>
        <vs-button success  dashed class="ml-20" style="width:120px" @click="addProject">确认</vs-button>
        <!-- <Button class="button-common ml-20" type="primary" @click="addProject">确认</Button> -->
        </div>
      </div>
      <!-- 按钮、 -->
    </Modal>
  </div>
</template>
<script>
/**
 * 任务集首页，替代原有的home主页
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
      showIndex: -1,
      selectTitle: ""
    };
  },
  mounted() {
    this.getProjectList();
  },
  methods: {
    getProjectList() {
      let p = {};
      if (this.selectTitle !== "") {
        p.selectTitle = this.selectTitle;
      }
      projectApi.getProjectList(p).then(res => {
        this.projectList = res.result;
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
    /**
     * @去往任务筛选器
     */
    toScreen(){

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
      if(p.projectName===''){
        this.$Message.error("请输入任务集名称")
        return
      }
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
    editCollected(item) {
      let p = {
        id: item._id,
        collected: !item.collected
      };
      projectApi.editProject(p).then(res => {
        if (res.code === 0) {
          this.$Message.success(
            res.result.collected ? "收藏成功" : "解除收藏成功"
          );
          this.getProjectList();
        }
      });
    },
    /**
     * 删除任务集，相关的所有任务，日程安排都会被删除
     */
    handleDelete(id) {
      let vm = this;
      let lock = true;
      vm.$Modal.confirm({
        title: `即将删除本任务集的所有内容，确定要删除么？`,
        onOk: () => {
          if (lock) {
            lock = false;
            console.log("sas");
            projectApi.deleteProject(id).then(res => {
              if (res.code === 0) {
                this.getProjectList();
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
<style lang="less">
.modal-header{
  .vs-input{
    width:100%
  }
}
</style>

<style lang="less" scoped>
.project {
  height: 100%;

  .ivu-divider-horizontal {
    margin: 0;
  }
}
.min-child {
  position: relative;
}
.le {
  top: 70px;
  left: 20px;
}
.view {
  // margin-top: 20px;
  padding: 24px;
}
.ge {
  top: 70px;
  right: 20px;
}
.project-item {
  height: 52px;
  border-bottom: 1px solid gray;
}
.project-item:hover {
  background: #eff7fa;
  cursor: pointer;
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
.modal-header{
  margin-top: 20px;
  .vs-input{
    width:auto
  }
}
.modal-button{
  margin-top: 20px;
}
</style>