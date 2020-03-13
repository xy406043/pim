<template>
  <div ref="input" class="tab-icon column-center this_data">
    <!-- 这里等待调整成输入搜索框 -->
    <!-- 直接修改iview样式会对其他组件造成影响 -->
    <!-- <div class="tab-left"> -->

    <Input
      v-model="value"
      type="text"
      placeholder="搜索"
      ref="focus"
      @on-focus="changeL"
      @on-blur="changeS"
      @on-enter="select"
    >
      <font class="input_icon option" slot="prefix" @click="changeSelect">
        <Icon type="md-search"></Icon>
      </font>
    </Input>

 <!-- FIXME:此处由于 wangeditor 存在 不同页面打开 会创建新的编辑器 
 而一部分必须使用v-show才能显示内容  一部部分需要v-if进行刷新，这里的功能就不做了 -->
    <!-- <div class="option ml-16 mr-16 this_add" @click="getData">
      <Icon size="24" type="md-add-circle" />
    </div> -->

    <Modal
      v-model="outerAdd"
      width="700"
      footer-hide
      @on-visible-change="initModal"
    >
      <TodoAdd ref="todoadd" @cancelAdd="cancel" :projectList="projectList" :todoAdd="outerAdd" :isOuter="true"></TodoAdd>
    </Modal>
  </div>
</template>

<script>
import "../../../../../public/theme.less";
import TodoAdd from "_c/todo/todo-add";
import { projectApi } from "@/api";
export default {
  name: "",
  components: {
    TodoAdd
  },
  data() {
    return {
      status: 0,
      value: "",
      outerAdd: false,
      projectList: []
    };
  },
  methods: {
    getData() {
      this.outerAdd = true;
      this.getProjectList();
    },
    getProjectList() {
      projectApi.getProjectList().then(res => {
        this.projectList = res.result;
        this.$refs.todoadd.selectedProject = this.projectList[0]._id;
      });
    },
    cancel(status){
      console.log("sas")
      this.outerAdd=false

    },
    changeL() {
      let data2 = this.$refs["input"].style;
      data2.width = 250 + "px";
      this.status = 1;
      this.$refs["focus"].focus();
    },
    changeS() {
      let data2 = this.$refs["input"].style;
      //   console.log(data2)
      data2.width = 140 + "px";
      this.status = 0;
    },
    changeSelect(e) {
      if (this.status === 0) {
        this.changeL();
      } else {
      }
    },
    initModal() {
      this.$refs["todoadd"].initTodo();
    },
    select() {
      /**
       * 如何手动触发失去焦点？？？？？
       * 暂时不需要，刷新就完事了
       */
      let value = this.value;
      console.log("当前值", value);
    }
  }
};
</script>

<style lang="less" >
// .tab-left {
//   width: 250px;
//   display: flex;
//   justify-content: flex-end;
// //   margin: auto;
//   // position: relative;
// }
.this_data {
  //生效元素为最右方
  width: 200px;
  .ivu-input-with-prefix {
    cursor: pointer;
    background: transparent !important;
    border-radius: 30px;
    border: 1px solid #eee3e3;
  }
  .ivu-input-with-prefix:hover {
    border: 1px solid #d3c6c6;
  }
  .ivu-input-with-prefix:focus {
    border: 2px solid #0bf1f1 !important;
    background: #ffffff !important;
    // width: 200px;

    cursor: text;
    border: 2px solid;
  }
  //   .ivu-input-type-text {
  //     // width: 100px;
  //   }
  //   .ivu-input-type-text:focus {
  //     // width: 200px;
  //      background: #ffffff;
  //   }

  .input_icon {
    .ivu-icon-md-search {
      color: #e4dada !important;
    }
    .ivu-icon-md-search:focus {
      color: #0f0101 !important;
    }
  }
}

// .tab-left .this_Input:focus {
//   margin-right: 100px;
// }
// .this_add {
//   display: flex;
// }
</style>