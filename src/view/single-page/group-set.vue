<template>
  <div class="thisGroupSet">
    <div class="column-center flex-space-between thisTitle flex-row">
      <div>
        <span class="theme_font ml-10 font-24">分类设置</span>
      </div>
      <div>
        <span class="ml-10 mt-5" @click="backLast">
          <img src="http://xynagisa.xyz/下载.png" class="back_img mr-20" />
        </span>
      </div>
    </div>
    <Divider />
    <!-- 显示各分类 -->
    <div class="showContent">
      <div class="mb-20">
        <vs-button success floating @click="addGroup">新建分类</vs-button>
      </div>
      <div v-for="item in groupList" :key="item._id" class="every-class flex-space-between">
        <div>
          <span class="font-bolder">{{item.name}}</span>
        </div>
        <div style="color:gray">
                 该分类下共有 {{item.count}} 个子项
        </div>
        <div>
          <span class="theme_font option" @click="changeEdit(item)">编辑</span>
          <span v-if="item.count===0" class="ml-20 mr-20 option-delete" @click="deleteGroup(item._id)">删除</span>
          <span v-else class="mr-20 ml-20 option-disabled">删除</span>
        </div>
      </div>
    </div>
    <Modal v-model="groupModal" footer-hide @on-visible-change="changeV" :title="addoredit?'新建分类':'编辑分类'">
        <div class="mt-20 mb-20">
            <vs-input  v-model="newV" label-placeholder="请输入分类名"></vs-input>
        </div>
      <div class="flex-row">
        <vs-button dark border @click="cancelEdit">取消</vs-button>
        <vs-button v-if="addoredit===false" success border @click="handleEdit">确认</vs-button>
        <vs-button v-else success border @click="handleAdd">确认</vs-button>
      </div>
    </Modal>
  </div>
</template>

<script>
/**
 * 分类设置
 */
import { commonApi } from "@/api";
export default {
  name: "",
  data() {
    return {
      groupType: 1,
      groupList: [],
      groupModal: false,
      addoredit: false,
      group_id: "",
      newV: ""
    };
  },
  mounted() {
    let { groupType } = this.$route.query;
    this.groupType = groupType;
    this.getGroupList();
  },
  methods: {
    getGroupList() {
      let p = {
        groupType: this.groupType
      };
      commonApi.getGroupList(p).then(res => {
        this.groupList = res.result;
        /**
         * @for无法向对象中添加元素
         */
        // for(item of this.groupList){
        //     item.state=false
        // }
        /**
         * @map可以
         */
        this.groupList.map(item => {
          item.state = false;
          item.newV = "";
        });
      });
    },
    changeV(val) {
      if (val === false) {
        this.newV = "";
      }
    },
    addGroup() {
      this.addoredit = true;
      this.groupModal = true;
    },
    changeEdit(item) {
      this.groupModal = true;
      this.addoredit = false;
      this.newV=item.name
      this.group_id = item._id;
    },
    handleAdd() {
      let p={
          groupType:this.groupType,
          name:this.newV
      }
      if(p.name===''){
          this.$Message.error("请输入分类名")
          return
      }
      commonApi.addGroup(p).then(res=>{
          if(res.code===0){
              this.$Message.success("新增成功")
              this.groupModal=false
              this.getGroupList()
          }
      })
    },
    handleEdit() {
      let p = {
        group_id: this.group_id,
        name: this.newV
      };
      commonApi.editGroup(p).then(res => {
        if (res.code === 0) {
          this.$Message.success("编辑成功");
          this.getGroupList();
          this.groupModal=false
          this.newV = "";
        }
      });
    },
    deleteGroup(id){
 this.$Modal.confirm({
        title: "删除",
        content: "确定要删除此分类？",
        onOk: () => {
          commonApi.deleteGroup(id).then(res => {
            if (res.code === 0) {
              this.$Message.success("删除成功");
              this.getGroupList();
            } else {
              this.$Message.error(res.errorMsg);
            }
          });
        },
        onCancel: () => {}
      });
    },
    backLast() {
      this.$router.go(-1);
    },
    cancelEdit() {
      this.groupModal = false;
    }
  }
};
</script>

<style lang="less" scoped>
.thisTitle {
  height: 50px;
  padding: 10px;
  width: 962px;
  background: rgba(168, 204, 204, 0.13);
}
.thisGroupSet {
  .ivu-divider {
    margin: 0;
  }
}
.back_img {
  height: 50px;
  width: 50px;
  cursor: pointer;
}
.showContent {
  padding: 20px 24px;
}
.every-class {
  padding: 5px 16px;
}
.every-class:hover {
  background: rgb(209, 245, 245);
  border-radius: 4px;
}
</style>