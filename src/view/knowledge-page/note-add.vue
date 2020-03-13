<template>
  <div class="thisAdd">
      <!-- 标题 -->
      <div class="tabn flex-space-between column-center">
      <div>
        <router-link to="know" class="title-back option mr-10">我的记事库</router-link>/
        <router-link to="note" class="title-back option ml-10 mr-10">我的笔记本</router-link>/
      </div>
      <div>
        <!-- <span class="option ml-10 mr-20" @click="addNote">新增笔记</span>
        <span class="option ml-10">笔记分类</span> -->
      </div>
    </div>
    <Divider />
    <div class="add-content">
    <div class="flex-row ">
      <div class="min-width">
        <b>标题</b>
      </div>
      <Input v-model="title" placeholder="输入标题"></Input>
    </div>
    <div class="flex-row mt-20">
      <div class="min-width">
        <b>选择分类</b>
      </div>
      <span>
        <Select v-model="group_id" style="width:160px"  filterable allow-create @on-create="createGroup">
          <Option :value="0">默认分组</Option>
          <Option v-for="item in groupList" :value="item._id" :key="item._id ">
              {{item.name}}
          </Option>
        </Select>
      </span>
    </div>
    <div>内容</div>
    <div class="textborder">
    <textarea class="thisText" v-model="content"></textarea>
    </div>
    <div>
    <Button type="primary" @click="addNote">新增文章</Button>
    </div>
    </div>
  </div>
</template>

<script>
/**
 * @description 新增日记
 */
import {knowApi,commonApi} from "@/api"
export default {
  name: "note-add",
  data() {
    return {
      title: "",
      content: "",
      group_id:0, //选择的分类  默认分类
      groupList:[] //所有分类
    };
  },
  mounted(){
    this.getGroupList()
  },
  methods:{
    getGroupList(){
      let p ={
        groupType:1
      }
      commonApi.getGroupList(p).then(res =>{
        this.groupList = res.result

      })

    },
    createGroup(val){
      let p={
        groupType:1,
        name:val
      }
        commonApi.addGroup(p).then(res => {
          this.getGroupList()
        })
    },
      addNote(){
          let p ={
              title:this.title,
              content:this.content,
          }
          if(p.title==""){
              this.$Message.error("请输入标题")
              return
          }
        //    if(p.content==""){
        //       this.$Message.error("请输入文本")
        //       return
        //   }
         if(this.group_id!==0){
           p.group_id = this.group_id
         }
        knowApi.addNote(p).then(res => {
            if(res.code===0){
                this.$Message.success("新增成功")
                this.$router.push({name:"note"})
                return
            }
        })

      }
  }
};
</script>

<style lang="less" scoped>
.thisAdd {
  // padding: 20px;
   .ivu-divider-horizontal {
    margin: 0;
  }
}
.tabn {
  height: 50px;
  padding: 5px 20px;
  background: rgba(168, 204, 204, 0.13);
}
.title-back{
  color: black;
}
.textborder{
    border:1px solid #000000;
}
.thisText {
  height: 402px;
  border: none;
  width: 100%;
  /* 首行退两格 */
  text-indent: 2em;
  line-height: 20px;
  background: url(http://www.w3dev.cn/eg/linebg.gif) repeat;
  overflow: scroll;
  box-sizing: border-box;
  outline: none;
  resize:none;
}
.add-content{
  padding: 24px;
}
</style>