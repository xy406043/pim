<template>
  <div class="thisAdd">
    <!-- 标题 -->
    <div class="tabn flex-space-between column-center">
      <div>
        <router-link to="know" class="title-back option mr-10">我的记事库</router-link>/
        <router-link to="blog" class="title-back option ml-10 mr-10">我的博客管理</router-link>
      </div>
      <div>
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
      <div class="flex-row column-center font-bolder show-add">
            <div class="min-width">是否展示:</div>
        <div class="column-center">
            <RadioGroup v-model="isShow">
                <Radio :label="1">是</Radio>
                <Radio :label="0">否</Radio>
            </RadioGroup>
        </div>
        <div class="min-width ml-20">是否转载:</div>
        <div class="column-center">
            <RadioGroup v-model="isReproduced">
                <Radio :label="1">是</Radio>
                <Radio :label="0">否</Radio>
            </RadioGroup>
        </div>
        <div v-show="isReproduced" class="min-width ml-20">作者:</div>
        <div v-show="isReproduced" class="form-width">
          <Input placeholder="作者" v-model="author"></Input>
        </div>
        <div v-show="isReproduced" class="min-width ml-20">转载链接:</div>
        <div v-show="isReproduced">
          <Input placeholder="输入转载链接" v-model="reproduceUrl"></Input>
        </div>
      </div>
      <!-- 展示目前所有标签 -->
      <div class="flex-row column-center font-bolder "></div>
      <div class="flex-row font-bolder column-center mt-20">
        <div class="min-width">新建标签:</div>
        <div class="form-width">
          <Input class="form-width" placeholder="新建标签" v-model="newTag"></Input>
        </div>
        <div class="min-width ml-20">新标签颜色:</div>
        <div class="form-width">
          <ColorPicker v-model="newTagColor" />
        </div>
        <div>
          <Button type="default" @click="addNewTag">确定</Button>
        </div>
      </div>
      <div class="flex-space-between column-center">
        <div class="flex-row mt-20 font-bolder column-center">
          <div class="min-width column-center">
            <b>选择分类:</b>
          </div>
          <div class="form-width">
            <Select v-model="group_id" filterable allow-create @on-create="createGroup">
              <Option v-for="item in groupList" :value="item._id" :key="item._id ">{{item.name}}</Option>
            </Select>
          </div>
          <div class="min-width ml-20">标签展示:</div>
          <div>
            <Tag
              v-for="(item,index) in newTags"
              type="border"
              closable
              :color="item.color"
              :key="index"
              @on-close="handleClose(index)"
            >{{item.name}}</Tag>
          </div>
        </div>
        <div style="text-align:right" class="column-center">
          <vs-button style="width:150px" success floating @click="editBlog">保存</vs-button>
        </div>
      </div>
      <div class="textborder mt-20">
        <MavonEditor ref="mavon" :originText="content" @getEditor="getContent"></MavonEditor>
      </div>
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
  name: "blog-view",
  components: {
    MavonEditor
  },
  data() {
    return {
      title: "",
      content: "",
      group_id: 0, //选择的分类  默认分类
      groupList: [], //所有分类
      m_content: "1212",
      h_content: "",
      author: "",
      isReproduced: 0, //是否转载
      isShow:1, //是否展示
      reproduceUrl: "", //转载链接
      tags: [], //博客管理中所有标签
      thisTags: [], //当前选中的所有标签
      newTag: "", //当前新建
      newTagColor: "#20F5E5",
      newTags: [], //新建的标签
      group_id:0,
      groupList:[]

    };
  },
  mounted() {
     this.blog_id = this.$route.query.id;
     console.log(this.blog_id)
    /***
     * @获取分类的接口要比获取详情的接口先
     * @不然详情的ID无法渲染到Select组件上
     */
    this.getGroupList();
    this.$nextTick(() => {
      this.getBlogDetail();
    });
  },
  methods: {
    getContent(markdown, html) {
      this.m_content = markdown;
      this.h_content = html;
      this.content = markdown;
    },
     getBlogDetail() {
      knowApi.getBlogDetail(this.blog_id).then(res => {
        this.title = res.result.title;
        this.group_id = res.result.group_id._id;
        this.newTags =res.result.tag
        this.isShow =res.result.isShow
        this.isReproduced =res.result.isReproduced
        this.reproduceUrl =res.result.reproduceUrl || ''
        this.author  =res.result.author || ''
        this.content = res.result.content;
        this.$refs.mavon.putContent(this.content);
      });
    },
    getGroupList() {
      let p = {
        groupType: 3
      };
      commonApi.getGroupList(p).then(res => {
        this.groupList = res.result;
      });
    },
    createGroup(val) {
      let p = {
        groupType: 3,
        name: val
      };
      commonApi.addGroup(p).then(res => {
        this.getGroupList();
      });
    },
    addNewTag() {
      for (let item of this.tags) {
        if (item.name === this.newTag) {
          return;
        }
      }
      for (let item of this.newTags) {
        if (item.name === this.newTag) {
          return;
        }
      }
      if (this.newTag === "") return;
      let newV = {
        name: this.newTag,
        color: this.newTagColor
      };
      knowApi.addBlogTag(newV).then(res => {
        if (res.code === 0) {
          newV["_id"] = res.result.id;
          this.newTags.push(newV);
          this.newTag = "";
          console.log(this.newTags);
        }
      });
    },
    handleClose(index) {
      this.newTags.splice(index, 1);
    },
    editTags() {},
    editBlog() {
      let p = {
        blog_id:this.blog_id,
        title: this.title,
        content: this.content,
        isShow:this.isShow,
        isReproduced:this.isReproduced,
      };
      if(p.isReproduced){
          p.reproduceUrl=this.reproduceUrl
          p.author = this.author
      }
      if (p.title == "") {
        this.$Message.error("请输入标题");
        return;
      }
      if (
        this.group_id === "0" ||
        this.group_id === 0 ||
        this.group_id === undefined
      ) {
        this.$Message.error("请选择分类");
        return;
      }
      p.group_id = this.group_id;
      let tag =[]
      for(let item of this.newTags){
          tag.push(item._id)
      }
      p['tag']=tag
      knowApi.editBlog(p).then(res => {
        if (res.code === 0) {
          this.$Message.success("新增成功");
          this.$router.push({ name: "blog" });
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
.long-arrow {
  width: 40px;
}
.show-add{
    height:60px;
}
</style>