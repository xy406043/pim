<template class="outerTel">
  <div class="thisBook">
    <div class="column-center flex-space-between thisTitle flex-row">
      <div>
        <router-link to="know" class="title-back option mr-10">我的记事库</router-link>/
        <span class="theme_font ml-10">我的网址收藏</span>
      </div>
      <div>
        <span class="option" @click="openAddModal">新增网址</span>
        <span class="option ml-20" @click="exportBook">导入网址</span>
        <span class="option ml-20" @click="toGroupSet">网址分类</span>
      </div>
    </div>
    <Divider />
    <div class="left">
      <!-- 搜索 -->
      <div class="mb-20 mt-10 ml-20 flex-row">
        <div class="flex-start column-center">
          <span class="theme_font mr-20">搜索：</span>
          <span>
            <Input class="myInput" search v-model="selectTitle" @on-search="getBookMarkingList"></Input>
          </span>
        </div>
        <div class="flex-center ml-20">
          <span class="theme_font min-width mr-20">分类:</span>
          <span>
            <Select v-model="group_id" class="myNo" @on-change="getBookMarkingList">
              <Option :value="0" label="全部收藏">全部收藏</Option>
              <Option :value="1" label="默认分类">默认分类</Option>
              <!-- 不能用默认分类喽这里，和新增那里冲突了 -->
              <Option
                v-for="item in groupList"
                :key="item._id"
                :value="item._id"
                :label="item.nmae"
              >{{item.name}}</Option>
            </Select>
          </span>
        </div>
      </div>
      <Divider></Divider>
      <!-- 具体展示内容 -->
      <div class="book-content">
        <!-- 外层设置行内块级 -->
        <div
          class="every-book"
          v-for="(item,index) in bookMarkingList "
          :key="item._id"
          :value="item.title"
          @mouseover="getIndex(index)"
          @mouseleave="leaveIndex"
        >
          <div class="every-inner">
            <a class="every-router" :href="item.url" target="blank">
              <div>
                <div class="flex-all-center">
                  <Avatar v-if="item.imgUrl===''" :size="40" :username="item.title"></Avatar>
                  <img v-else :src="item.imgUrl" class="img-avatar" alt="图标" />
                </div>
                <div class="every-title font-bolder">{{item.title}}</div>
                <div class="every-title-2">
                  <span
                    class="option theme_font font-12 font-bolder"
                    @click.stop.prevent="copy(item)"
                  >链接</span>
                  <span
                    class="option theme_font ml-10 mr-10 font-12 font-bolder"
                    @click.stop.prevent="openEditModal(item)"
                  >编辑</span>
                  <span
                    class="option-delete font-12 font-bolder"
                    @click.stop.prevent="deleteBookMarking(item._id)"
                  >删除</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- 左下导航栏目 -->
      <!-- <div class="left-menu">
      <div>收藏分类</div>
      </div>-->
      <!-- 增加modal -->
      <Modal v-model="groupModal" footer-hide>
        <div>
          <b class="font-24">
            <span v-if="addoredit">新建链接</span>
            <span v-else>修改链接</span>
          </b>
          <div class="flex-space-between mt-20">
            <!-- 左边基本信息 -->
            <div>
              <div class="column-center flex-row mb-10">
                <span class="min-width font-bolder">链接标题:</span>
                <vs-input v-model="title" placeholder="输入标题"></vs-input>
              </div>
              <div class="column-center flex-row mb-10">
                <span class="min-width font-bolder">所属分类:</span>
                <Select
                  v-model="group"
                  filterable
                  allow-create
                  placeholder="选择标签"
                  @on-create="handleCreate"
                >
                  <Option :value="0">默认分组</Option>
                  <Option v-for="item in groupList" :key="item._id" :value="item._id">{{item.name}}</Option>
                </Select>
              </div>
              <div class="column-center flex-row mb-10">
                <span class="min-width font-bolder">链接地址:</span>
                <vs-input v-model="url" placeholder="输入链接"></vs-input>
              </div>
            </div>
            <!-- 右侧上传图片 -->
            <div v-if="groupModal">
              <UploadImg :changeUrl.sync="imgUrl"></UploadImg>
              <div v-show="imgUrl===''" class="uploadImg" style="border: 1px solid gray"></div>
              <img v-show="imgUrl!==''" class="uploadImg" :src="imgUrl" alt="控制" />
            </div>
          </div>
          <div class="mt-5 flex-row flex-space-between">
            <!-- <Button v-if="addoredit" type="primary" @click="handleAdd">确认</Button>
            <Button v-else type="primary" @click="handleEdit">确认</Button>

            <Button type="default" @click="initModal">取消</Button>-->
            <vs-button dark dashed style="width:120px" @click="initModal">取消</vs-button>
            <vs-button v-if="addoredit" success style="width:120px" dashed @click="handleAdd">确认</vs-button>
            <vs-button v-else success dashed style="width:120px" @click="handleEdit">确认</vs-button>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
/**
 * @description 网址收藏
 */
import { knowApi, commonApi } from "@/api";
import Avatar from "vue-avatar";
import UploadImg from "_c/self-page/upload.vue";
export default {
  name: "",
  components: { UploadImg, Avatar },
  data() {
    return {
      bookMarkingList: {},
      groupModal: false,
      addoredit: true,
      title: "",
      url: "",
      imgUrl: "",
      rell: [{ id: 1 }, { id: 2 }],
      /**
       * @再次声明
       * @正页筛选用的是group
       * @新增修改用的是group_id
       */
      group_id: 0, // 为  正页面选择内容的 group_id
      group: 0, // 为新增修改是选择的group_id
      groupList: [], //分类列表，
      localNum: 1,
      pageSize: 10,
      selectTitle: "",
      showIndex: -1,
      bookMarking_id: 0,
      loading: ""
    };
  },
  watch: {
    // changeUrl(newV, oldV) {
    //   console.log("new", newV);
    // }
  },
  mounted() {
    this.loading = this.$vs.loading({ type: "square" });
    this.getBookMarkingList();
    setTimeout(() => {
      this.loading.close();
    }, 600);
  },
  methods: {
    getGroupList() {
      let p = {
        groupType: 2
      };
      commonApi.getGroupList(p).then(res => {
        this.groupList = res.result;
      });
    },
    getBookMarkingList(val) {
      let p = {};
      if (this.group_id === 0) {
        // 0 为全部日记
      } else {
        p.group_id = this.group_id;
      }
      if (this.selectTitle !== "") {
        p.selectTitle = this.selectTitle;
      }
      knowApi.getBookMarkList(p).then(res => {
        this.bookMarkingList = res.result;
        this.getGroupList();
      });
    },
    handleCreate(val) {
      let p = {
        groupType: 2,
        name: val
      };
      commonApi.addGroup(p).then(res => {
        if (res.code === 0) {
          this.getGroupList();
        } else {
          this.$Message.error(res.errorMsg);
        }
      });
    },
    initModal() {
      this.groupModal = false;
      this.title = "";
      this.url = "";
      this.imgUrl = "";
    },
    openAddModal() {
      this.groupModal = true;
      this.addoredit = true;
      if (this.group_id === 0 || this.group_id === 1) {
        this.group = 0;
      } else {
        this.group = this.group_id;
      }
    },
    openEditModal(item) {
      this.groupModal = true;
      this.addoredit = false;
      if (item.group_id) {
        this.group = item.group_id;
      } else {
        this.group = 0;
      }
      this.title = item.title;
      this.url = item.url;
      this.imgUrl = item.imgUrl;
      this.bookMarking_id = item._id;
    },
    exportBook() {},
    handleAdd() {
      let p = {
        title: this.title,
        url: this.url,
        imgUrl: this.imgUrl
      };
      if (p.title === "") {
        this.$Message.error("请输入网址名");
        return;
      }
      let url = new RegExp(
        /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
      );
      if (!url.test(p.url)) {
        this.$Message.error("请输入正确格式的URL");
        return;
      }
      if (this.group === null) {
        this.$Message.error("请选择分类");
        return;
      }
      if (this.group !== 0) {
        p.group_id = this.group;
      }
      knowApi.addBookMark(p).then(res => {
        if (res.code === 0) {
          this.$Message.success("新建成功");
          this.getBookMarkingList();
          this.groupModal = false;
          this.initModal();
        }
      });
    },
    deleteBookMarking(id) {
      this.$Modal.confirm({
        title: "删除",
        content: "确定要删除此网址么？",
        onOk: () => {
          knowApi.deleteBookMarking(id).then(res => {
            if (res.code === 0) {
              this.$Message.success("删除成功");
              this.getBookMarkingList();
            } else {
              this.$Message.error(res.errorMsg);
            }
          });
        },
        onCancel: () => {}
      });
    },
    getIndex(index) {
      this.showIndex = index;
    },
    toGroupSet() {
      this.$router.push({
        name: "group-set",
        query: {
          groupType: 2
        }
      });
    },
    leaveIndex() {
      this.showIndex = -1;
    },
    /**
     * @点击复制链接
     */
    copy(item) {
      var oInput = document.createElement("input");
      oInput.value = item.url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.$Message.success("复制链接成功");
    },
    handleEdit() {
      let p = {
        title: this.title,
        url: this.url,
        imgUrl: this.imgUrl,
        bookMarking_id: this.bookMarking_id
      };
      if (p.title === "") {
        this.$Message.error("请输入网址名");
        return;
      }
      let url = new RegExp(
        /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
      );
      if (!url.test(p.url)) {
        this.$Message.error("请输入正确格式的URL");
        return;
      }
      if (this.group_id === null) {
        this.$Message.error("请选择分类");
        return;
      }
      /**
       * @再次声明
       * @正页筛选用的是group
       * @新增修改用的是group_id
       */
      if (this.group !== 0) {
        p.group_id = this.group;
      }
      knowApi.editBookMarking(p).then(res => {
        if (res.code === 0) {
          this.$Message.success("编辑成功");
          this.getBookMarkingList();
          this.groupModal = false;
          this.initModal();
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.thisBook {
  height: 100%;

  .ivu-divider-horizontal {
    margin: 0;
  }
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
.outerTel {
  position: relative;
}
.left-menu {
  position: absolute;
  padding: 10px;
  border-radius: 10px;
  bottom: 0;
  left: -100px;
  width: 96px;
  border: 1px solid #121211;
  background: #ffffff;
}
.left {
  // padding:10px 24px;
}
.every {
  overflow: hidden;
  flex-wrap: nowrap;
}
.everyTitle {
  white-space: nowrap;
}
.everyBookmark {
  //   border: 1px solid gray;
  display: inline-block;
  margin: 0 10px;
  flex-direction: row;
  height: 80px;
  width: 80px;
}
.uploadImg {
  height: 100px;
  width: 100px;
}
.myInput {
  width: 200px;
}
.myNo {
  width: 150px !important;
}
.book-content {
  padding: 10px 24px;
}
.every-book {
  display: inline-block;
  margin: 5px;
  width: 160px;
}
.every-inner {
  padding: 10px;
}
.every-book :hover {
  background: #edf7f8;
}

.every-router {
  color: black !important;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.every-router:hover {
  // background: #94e1e4;
}
.img-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.every-title {
  text-align: center;
  margin-top: 10px;
  color: black;
  font-family: "Times New Roman", Times, serif;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.every-title-2 {
  text-align: center;
  margin-top: 10px;
}
</style>