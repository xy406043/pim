<template>
  <div class="thisSetting">
    <div class="column-center thisTitle flex-space-between flex-row">
      <!-- 顶部 -->
      <div>
        <router-link to="project" class="title-back option mr-10">我的任务集</router-link>/
        <router-link
          :to="{name:'project-view',query: {id: project_id}}"
          class="title-back option ml-10"
        >{{projectName}}</router-link>
      </div>
    </div>
    <Divider />
    <div class="setting-content">
      <!-- 完成任务集的设置 -->
      <!-- 基本信息设置栏 -->
      <div>
        <div class="classic-setting mb-20">基础设置</div>
        <div class="mb-10 flex-row column-center">
          <span class="min-width setting-title">任务集名:</span>
          <span class="form-width">
            <Input v-model="projectName" placeholder="请输入任务集名称"></Input>
          </span>
        </div>
        <div class="mb-10 flex-row column-center">
          <span class="min-width setting-title">任务集描述:</span>
          <span class="form-width">
            <Input type="textarea" v-model="description" placeholder="请输入任务集描述"></Input>
          </span>
        </div>
        <div class="mb-10 flex-row column-center">
          <span class="min-width setting-title">模式选择:</span>
          <RadioGroup v-model="showType">
            <Radio label="普通模式" class="mr-20"></Radio>
            <Radio label="鱼骨图" class="group-right" disabled></Radio>
          </RadioGroup>
        </div>
        <div class="mb-10 flex-row column-center">
          <span class="min-width setting-title">参考图:</span>
          <div class="image-div">
            <img class="set-img mr-20" src="http://xynagisa.xyz/WX20200317-170036.png" />
            <div class="image-show flex-all-center">
              <div @click="showImage('http://xynagisa.xyz/WX20200317-170036.png')">
                <Icon class="show-p" size="30" type="ios-eye" />
              </div>
            </div>
          </div>
          <div class="image-div">
            <img
              class="set-img ml-20"
              src="http://xynagisa.xyz/1584433886285_WX20200317-163101.png"
            />
            <div class="image-show flex-all-center">
              <div @click="showImage('http://xynagisa.xyz/1584433886285_WX20200317-163101.png')">
                <Icon class="show-p" size="30" type="ios-eye" />
              </div>
            </div>
          </div>
        </div>
        <div class="mb-10 flex-row column-center">
          <span class="mr-20 setting-title">任务集界面功能与参考:</span>
          <a href="https://tower.im/" class="theme_font" target="_blank">Tower</a>
        </div>
        <div class="set-button">
          <vs-button success dashed square style="width:120px" type="primary" class="font-bolder" @click="editProject">保存</vs-button>
        </div>
      </div>
      <Divider />
      <!-- 标签设置栏目 -->
      <div>
        <div class="classic-setting">标签设置</div>
        <div>
          <div class="h2-title flex-row column-center">
            <span>自定义标签</span>
            <vs-button class="ml-20 "style="width:120px" dark square dashed @click="showAddModal">新建标签</vs-button>
          </div>
          <div>
            <div v-for="(item,index) in otherList" :key="index" class="every-tag">
              <div class="flex-space-between">
                <div class="flex-row column-center">
                  <!-- 标签颜色块 -->
                  <div class="color-card" :style="'background:'+item.color"></div>
                  <!-- 标签名称 -->
                  <div class="ml-10 every-value">{{item.value}}</div>
                  <!-- 任务集中此标签使用个数 -->
                  <div class="every-num">{{item.count}}个任务</div>
                </div>
                <div>
                  <span class="mr-20 option theme_font" @click="showEditModal(item)">编辑</span>
                  <span class="ml-20 option-delete" @click="deleteThisTag(item)">删除</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="h2-title">通用标签</div>
          <div>
            <div v-for="(item,index) in basicList" :key="index" class="every-tag">
              <div class="flex-space-between">
                <div class="flex-row column-center">
                  <!-- 标签颜色块 -->
                  <div class="color-card" :style="'background:'+item.color"></div>
                  <!-- 标签名称 -->
                  <div class="ml-10 every-value">{{item.value}}</div>
                  <!-- 任务集中此标签使用个数 -->
                  <div class="every-num">{{item.count}}个任务</div>
                </div>
                <div>
                  <span class="mr-20 option-disabled">编辑</span>
                  <span class="ml-20 option-disabled">删除</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 展示图片 -->
    <Modal :width="900" v-model="showModal" footer-hide :closable="false">
      <div class="modal">
        <img :src="imgUrl" style="width:100%" alt="预览图" />
      </div>
    </Modal>
    <!-- 新增编辑标签 -->
    <Modal v-model="labelModal" footer-hide :closable="false" title="新建标签">
      <div class="mb-10 ml-10 thisModal">
        <vs-input label-placeholder="请输入标签名"  v-model="editTagValue"></vs-input>
      </div>
      <div class="flex-row flex-space-between">
        <vs-button style="width:120px" class="mr-20" dark dashed @click="cancelOperate">取消</vs-button>
        <vs-button style="width:120px" v-if="addoredit" success dashed @click="handleAdd">确认</vs-button>
        <vs-button style="width:120px" v-else success dashed @click="handleEdit">保存</vs-button>
      </div>
    </Modal>
  </div>
</template>

<script>
/**
 * @此处进行任务集的设置
 */
import { projectApi } from "@/api";
export default {
  name: "",
  inject: ["reload"],
  data() {
    return {
      projectName: "",
      project_id: "",
      description: "",
      showType: "普通模式", //0为普通模式  1为鱼骨图模式
      showModal: false,
      addoredit: true, //新建或者编辑
      labelModal: false,
      allList: [],
      basicList: [],
      otherList: [],
      editTagValue: "",
      imgUrl: "",
      origin: {}
    };
  },
  mounted() {
    console.log(this.$route.query);
    this.projectName = this.$route.query.name;
    this.project_id = this.$route.query.id;
    this.getProjectInfo();
  },
  methods: {
    getProjectInfo() {
      projectApi.getProjectInfo(this.project_id).then(res => {
        this.projectName = res.result.projectName;
        this.description = res.result.description;
        this.allList = JSON.parse(JSON.stringify(res.result.tags));
        this.basicList = res.result.tags.splice(0, 4);
        this.otherList = res.result.tags;
        console.log(this.otherList);
      });
    },
    editProject() {
      let p = {
        project_id: this.project_id,
        projectName: this.projectName,
        description: this.description
      };
      projectApi.editProjectInfo(p).then(res => {
        if (res.code === 0) {
          this.$Message.success("修改成功");
          this.getProjectInfo();
        }
      });
    },
    editLabel() {},
    showAddModal() {
      this.labelModal = true;
      this.addoredit = true;
      this.editTagValue = "";
    },
    showEditModal(item) {
      this.editTagValue = item.value;
      this.labelModal = true;
      this.addoredit = false;
      this.origin = {
        value: item.value,
        color: item.color
      };
    },
    deleteThisTag(item) {
      let p = {
        project_id: this.project_id,
        value: item.value,
        color: item.color
      };
      this.$Modal.confirm({
        title: "删除",
        content: "同时会把相关任务的此标签也删除！！！确定要删除此标签么？",
        onOk: () => {
          projectApi.deleteLabel(p).then(res => {
            if (res.code === 0) {
              this.$Message.success("删除成功");
              this.getProjectInfo();
            } else {
              this.$Message.error(res.errorMsg);
            }
          });
        },
        onCancel: () => {}
      });
    },
    handleAdd() {
      if (this.editTagValue === "") {
        this.$Message.error("请输入标签名");
        return;
      }
      let list = [];
      this.allList.map(item => {
        list.push({
          value: item.value,
          color: item.color
        });
      });
      list.push({
        value: this.editTagValue,
        color: "skyblue"
      });
      let p = {
        project_id: this.project_id,
        tags: list
      };
      projectApi.addTag(p).then(res => {
        if (res.code === 0) {
          this.$Message.success("新增成功");
          this.getProjectInfo();
          this.labelModal = false;
        } else {
          this.$Message.error(res.errorMsg);
        }
      });
    },
    handleEdit() {
      let p = {
        project_id: this.project_id,
        nowValue: this.editTagValue,
        originValue: this.origin.value,
        color: this.origin.color
      };
      projectApi.editLabel(p).then(res => {
        if (res.code === 0) {
          this.$Message.success("编辑成功");
          this.getProjectInfo();
          this.labelModal = false;
        }
      });
    },
    cancelOperate() {
      this.editTagValue = "";
      this.labelModal = false;
    },
    showImage(url) {
      this.imgUrl = url;
      this.showModal = true;
    }
  }
};
</script>
<style lang="less">
.thisModal{
  .vs-input{
    width:100%;
  }
}
</style>
<style lang="less" scoped>
.thisSetting {
  .ivu-divider {
    margin: 0;
  }
}
.thisTitle {
  height: 50px;
  padding: 5px 20px;
  background: rgba(189, 189, 189, 0.33);
}
.this-content {
  padding: 24px;
}
.title-back {
  color: black;
}
.setting-content {
  padding: 20px 24px;
}
.classic-setting {
  font-weight: bolder;
  font-size: 26px;
}
.setting-title {
  font-weight: bolder;
  // font-size: 22px;
}
.set-img {
  height: 80px;
}
.group-right {
  margin-left: 80px;
}
.image-div {
  position: relative;
}
.image-show {
  top: 0;
  left: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  display: none;
}
.image-div:hover .image-show {
  display: flex;
  background: gray;
  opacity: 0.3;
  color: white;
}
.show-p {
  cursor: pointer;
}
.modal-image {
  height: 300px;
}
.modal {
  // padding: 10px;
}
.set-button {
  margin: 0 0 20px 20px;
}
.h2-title {
  margin: 0 12px;
  font-size: 20px;
  font-weight: bold;
}
.color-card {
  height: 20px;
  width: 20px;
  margin: auto 0;
}
.every-tag {
  padding: 10px 9px;
}
.every-tag:hover {
  background: rgb(224, 243, 242);
}
.every-value {
  min-width: 140px;
  font-weight: bolder;
}
.every-num {
  color: gray;
  font-size: 15px;
  margin-left: 100px;
}
.thisInput {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>