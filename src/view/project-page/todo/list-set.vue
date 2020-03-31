<template>
  <div class="thisListSet">
    <div class="column-center flex-space-between thisTitle flex-row">
      <div class="column-center">
        <router-link :to="{name:'project'}" class="title-back option mr-10">任务集</router-link>/
        <router-link
          :to="{name:'project-view',query:{id:project_id}}"
          class="title-back option mr-10 ml-10"
        >{{projectName}}</router-link>/
        <router-link
          :to="{name:'list-detail',query:{list_id:list_id}}"
          class="title-back option ml-10 theme_font"
        >{{listName}}</router-link>
      </div>
    </div>
    <Divider />
    <!-- 设置详情 -->
    <div class="set-content">
      <div class="flex-row mb-5">
        <div class="font-bolder min-width">创建时间:</div>
        <span class="theme_font font-bolder">{{createdAt | showTime}}</span>
      </div>
      <div class="flex-row mb-5">
        <div class="font-bolder min-width">更新时间:</div>
        <span class="theme_font font-bolder">{{updatedAt | showTime}}</span>
      </div>
      <div class="flex-row mb-5 column-center">
        <div class="font-bolder min-width">修改清单名:</div>
        <div class="theme_font font-bolder form-width">
          <Input v-model="listName" placeholder="请输入清单名称"></Input>
        </div>
      </div>
      <div class="flex-row mb-5 column-center">
        <div class="font-bolder min-width">清单描述:</div>
        <div class="theme_font font-bolder form-width">
          <Input class="form-width" type="textarea" v-model="description" placeholder="清单描述"></Input>
        </div>
      </div>
      <div class="flex-row mb-5 column-center">
        <div class="font-bolder min-width">切换任务集:</div>
        <div class="theme_font font-bolder form-width">
          <Select v-model="project_id">
            <Option
              v-for="item in projectList"
              :key="item._id"
              :value="item._id"
            >{{item.projectName}}</Option>
          </Select>
        </div>
        <span class="ml-10 theme_font">(请谨慎切换)</span>
      </div>
      <!-- 其他操作 -->
      <div class="mt-20 font-16 flex-row">
        <vs-button style="width:120px" dashed success  class="font-bolder" @click="handleEdit">保存修改</vs-button>
        <vs-button style="width:120px" dashed danger class=" font-bolder ml-20" @click="handleDelete">删除此清单</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @进行任务集的更换
 */
import { projectApi } from "@/api";
const moment = require("moment");
export default {
  name: "",
  data() {
    return {
      list_id: "",
      listName: "",
      project_id: "",
      projectName: "",
      createdAt: "",
      updatedAt: "",
      projectList: [],
      description: ""
    };
  },
  filters: {
    showTime(val) {
      return moment(val).format("YYYY-M-D HH:mm");
    }
  },
  mounted() {
    this.list_id = this.$route.query.id;
    this.getListDetail();
    this.getProjectList();
  },
  methods: {
    getListDetail() {
      projectApi.getListDetail(this.list_id).then(res => {
        let result = res.result;
        this.projectName = result.projectName;
        this.listName = result.name;
        this.description = result.description;
        this.project_id = result.project_id;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
      });
    },
    getProjectList() {
      projectApi.getProjectList().then(res => {
        this.projectList = res.result;
      });
    },
    handleEdit(){
         let p={
             list_id:this.list_id,
             project_id:this.project_id, //会切换所属任务集
             description:this.description,
             name:this.listName,
         }
         projectApi.editList(p).then( res =>{
             if(res.code===0){
                 this.$Message.success("编辑成功")
                 this.$router.push({
                     name:"list-detail",
                     query:{
                         list_id:this.list_id
                     }
                 })
             }
         })
    },
    handleDelete(){
        this.$Modal.confirm({
        title: "删除",
        content: "该操作会删除清单内所有任务，确定要删除么？",
        onOk: () => {
          projectApi.deleteList(this.list_id).then(res => {
            if (res.code === 0) {
              this.$Message.success("删除成功");
              this.$router.push({
                name: "project-view",
                query: { id: this.project_id }
              });
              // setTimeout( ()=>{
              //  window.location.reload()
              // },100)
            } else {
              this.$Message.error(res.errorMsg);
            }
          });
        },
        onCancel: () => {}
      });
    }
  }
};
</script>

<style lang="less" scoped>
.thisListSet {
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
.set-content {
  padding: 16px 24px;
}
</style>