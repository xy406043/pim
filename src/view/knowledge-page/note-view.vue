<template>
  <div class="thisView">
    <!-- 标题 -->
    <div class="tabn flex-space-between column-center">
      <div>
        <router-link to="know" class="title-back option mr-10">我的记事库</router-link>/
        <router-link to="note" class="title-back option ml-10 mr-10">我的笔记本</router-link>
      </div>
      <div>
        <!-- <span class="option ml-10 mr-20" @click="addNote">新增笔记</span> -->
        <a
          href="https://www.zybuluo.com/mdeditor"
          target="_blank"
          class="option theme_font font-24 ml-10 font-bolder font-border"
        >Markdown语法教程</a>
      </div>
    </div>
    <Divider />
    <div class="add-content">
      <div class="flex-row">
        <div class="min-width">
          <b>标题</b>
        </div>
        <Input v-model="title" placeholder="输入标题"></Input>
      </div>
      <div class="flex-row mt-20 column-center flex-space-between">
        <div class="mb-20 flex-row column-center">
          <span class="min-width">
            <b class="mr-20">选择分类</b>
          </span>
          <span class="ml-10 flex-row form-width">
            <Select v-model="group_id" filterable allow-create @on-create="createGroup">
              <Option :value="0">默认分组</Option>
              <Option v-for="item in groupList" :value="item._id" :key="item._id ">{{item.name}}</Option>
            </Select>
          </span>
        </div>
        <div class="column-center">
          <!-- <span class="theme_font">
            <img src="../../assets/icon/long-arrow.png" style="width:40px" />
          </span>
          <span class="option mr-20 ml-20 font-20 theme_font" @click="editNote">保存修改</span>-->
          <vs-button style="width:150px" success floating @click="editNote">保存</vs-button>
        </div>
      </div>
      <div></div>
      <!-- <textarea class="textarea" v-model="content"></textarea> -->
      <MavonEditor ref="mavon" :originText="content" @getEditor="getContent"></MavonEditor>
    </div>
    <div style="margin-top:20px;text-align:right" class="mr-50">
      此Markdown编辑器为:
      <span class="theme_font">mavon-editor</span>
    </div>
  </div>
</template>

<script>
import { knowApi, commonApi } from "@/api";
import MavonEditor from "_c/editor/mavon-editor";
export default {
  name: "note-view",
  components: {
    MavonEditor
  },
  data() {
    return {
      note_id: "",
      title: "",
      content: "",
      m_content: "1212",
      h_content: "",
      group_id: 0, //选择的分类  默认分类
      groupList: [] //所有分类
    };
  },
  mounted() {
    this.note_id = this.$route.query.id;
    /***
     * @获取分类的接口要比获取详情的接口先
     * @不然详情的ID无法渲染到Select组件上
     */
    this.getGroupList();
    this.$nextTick(() => {
      this.getNoteDetail();
    });
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
    getNoteDetail() {
      knowApi.getNoteDetail(this.note_id).then(res => {
        this.title = res.result.title;
        // this.group_id = res.result.group_id || '0';
        if (res.result.group_id) {
          this.group_id = res.result.group_id;
          console.log("id", this.group_id);
        } else {
          this.group_id = 0;
        }
        this.content = res.result.content;
        this.$refs.mavon.putContent(this.content);
      });
    },
    createGroup(val) {
      this.groupList.push({
        _id: "asa",
        name: val
      });
      let p = {
        groupType: 1,
        name: val
      };
      commonApi.addGroup(p).then(res => {
        this.getGroupList();
      });
    },
    getGroupID(id) {
      this.group_id = id;
    },
    editNote() {
      let p = {
        title: this.title,
        content: this.content,
        note_id: this.note_id
      };
      if (p.title == "") {
        this.$Message.error("请输入标题");
        return;
      }
      //    if(p.content==""){
      //       this.$Message.error("请输入文本")
      //       return
      //   }
      if (
        this.group_id !== "0" &&
        this.group_id !== 0 &&
        !this.group_id !== undefined
      ) {
        p.group_id = this.group_id;
        console.log("group_id", p.group_id);
      }
      knowApi.editNote(p).then(res => {
        if (res.code === 0) {
          this.$Message.success("编辑成功");
          this.getNoteDetail();
          return;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.thisView {
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
.textarea {
  height: 400px;
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
</style>