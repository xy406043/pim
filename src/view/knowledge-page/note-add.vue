<template>
  <div class="thisAdd">
    <!-- 标题 -->
    <div class="tabn flex-space-between column-center">
      <div>
        <router-link to="know" class="title-back option mr-10">我的记事库</router-link>/
        <router-link to="note" class="title-back option ml-10 mr-10">我的笔记本</router-link>
      </div>
      <div>
        <!-- <span class="option ml-10 mr-20" @click="addNote">新增笔记</span>
        <span class="option ml-10">笔记分类</span>-->
        <a
          href="https://www.zybuluo.com/mdeditor"
          target="_blank"
          class="option theme_font font-24 ml-10 font-bolder font-border"
        >Markdown语法教程</a>
      </div>
    </div>
    <Divider />
    <div class="add-content">
      <div class="flex-row column-center font-bolder">
        <div class="min-width">标题:</div>
        <Input v-model="title" placeholder="输入标题"></Input>
      </div>
      <div class="flex-space-between column-center">
        <div class="flex-row mt-20 column-center">
          <div class="min-width column-center">
            <b>选择分类:</b>
          </div>
          <span>
            <Select
              v-model="group_id"
              style="width:160px"
              filterable
              allow-create
              @on-create="createGroup"
            >
              <Option :value="0">默认分组</Option>
              <Option v-for="item in groupList" :value="item._id" :key="item._id ">{{item.name}}</Option>
            </Select>
          </span>
        </div>
        <div style="text-align:right" class="column-center">
          <!-- <span class="theme_font">
            <img src="../../assets/icon/long-arrow.png" class="long-arrow" />
          </span>
          <span class="ml-20 mr-20 font-20 theme_font option" @click="addNote">新增文章</span> -->
          <vs-button style="width:150px" success floating  @click="addNote">保存</vs-button>
          <!-- <img src="../../../assets/icon/long-left.png" class="long-arrow" /> -->
        </div>
      </div>
      <div class="textborder mt-20">
        <!-- <textarea class="thisText" v-model="content"></textarea> -->
        <MavonEditor ref="mavon" :originText="content" @getEditor="getContent"></MavonEditor>
      </div>
      <!-- <div class="mt-5">
        <Button type="primary" @click="addNote">新增文章</Button>
      </div>-->
      <div style="margin-top:20px;text-align:right" class="mr-50">
        此Markdown编辑器为:
        <span class="theme_font">mavon-editor</span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @description 新增日记
 */
import { knowApi, commonApi } from "@/api";
import MavonEditor from "_c/editor/mavon-editor";

export default {
  name: "note-add",
  components: {
    MavonEditor
  },
  data() {
    return {
      title: "",
      content: "",
      group_id: 0, //选择的分类  默认分类
      groupList: [], //所有分类
      m_content: "skalskalskal",
      h_content: ""
    };
  },
  mounted() {
    this.getGroupList();
  },
  methods: {
    getContent(markdown, html) {
      this.m_content = markdown;
      this.h_content = html;
      this.content = markdown;
    },
    getGroupList() {
      let p = {
        groupType: 1
      };
      commonApi.getGroupList(p).then(res => {
        this.groupList = res.result;
      });
    },
    createGroup(val) {
      let p = {
        groupType: 1,
        name: val
      };
      commonApi.addGroup(p).then(res => {
        this.getGroupList();
      });
    },
    addNote() {
      let p = {
        title: this.title,
        content: this.content
      };
      if (p.title == "") {
        this.$Message.error("请输入标题");
        return;
      }
      //    if(p.content==""){
      //       this.$Message.error("请输入文本")
      //       return
      //   }
      if (this.group_id !== 0) {
        p.group_id = this.group_id;
      }
      knowApi.addNote(p).then(res => {
        if (res.code === 0) {
          this.$Message.success("新增成功");
          this.$router.push({ name: "note" });
          return;
        }
      });
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
.title-back {
  color: black;
}
.textborder {
  // border:1px solid #000000;
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
  resize: none;
}
.add-content {
  padding: 24px;
}
.long-arrow{
  width: 40px;
}
</style>