<template>
  <div class="thisAddress">
    <!-- DONE:不能用语义化标签作为class名，不然宽度不受限制 -->
    <div class="column-center thisTitle flex-space-between flex-row">
      <!-- 顶部 -->
      <div>
        <router-link to="know" class="title-back option mr-10">我的记事库</router-link>/
        <span class="theme_font ml-10">我的通讯录</span>
      </div>
      <div>
        <div class="option">
          <span class="option" @click="openAddModal">新建联系人</span>
        </div>
      </div>
    </div>
    <Divider />
    <!-- 筛选搜索层面 -->
    <div class="mb-10 flex-row mt-10 ml-20">
      <div class="flex-start column-center">
        <span class="theme_font min-width mr-20">搜索：</span>
        <span>
          <Input
            class="myInput"
            search
            v-model="selectTitle"
            placeholder="输入联系人姓名进行搜索"
            @on-search="getAddressList"
          ></Input>
        </span>
      </div>
      <!-- <div class="flex-center ml-20">
            <span class="theme_font min-width mr-20">分类:</span>
            <span>
              <Select v-model="group_id" class="myNo" @on-change="getAddressList">
                <Option :value="0">全部联系人</Option>
                <Option :value="1">默认分类</Option>
                <Option v-for="item in groupList" :key="item._id" :value="item._id">{{item.name}}</Option>
              </Select>
            </span>
      </div>-->
    </div>
    <Divider />
    <!-- 列表展示层 -->
    <div v-show="showAll===false" class="flex-row this-content">
      <!-- 联系人简视 -->
      <div class="leftC">
        <div v-for="(item,index) in addressList" :key="item._id">
          <span
            class="option every-address-name"
            @click="showEveryAddress(item,index)"
          >{{item.name}}</span>
        </div>
      </div>
      <Divider type="vertical" style="width:2px;height:auto;margin:0"></Divider>
      <div class="rightC">
        <div class="option toRight" @click="showAll=true">
          <Icon size="40" type="ios-arrow-dropright-circle" />
        </div>

        <div v-show="showItemDiv===false" class="address-modal">
          <div style="height:20px"></div>
          <b class="mt-20" v-if="addoredit">新建联系人</b>
          <b class="mt-20" v-else>编辑联系人</b>
          <div class="flex-start mt-10 mb-10 column-center">
            <span class="min-width">名称:</span>
            <div class="form-width">
              <Input v-model="name" placeholder="输入名称"></Input>
            </div>
          </div>
          <div class="flex-start mt-10 mb-10">
            <span class="min-width mt-10">手机号:</span>
            <div calss="flex-column">
              <div v-for="(item,index) in phoneList" :key="index" class="column-center mb-5">
                <span class="form-width">
                  <Input v-model="item.value" placeholder="输入手机号"></Input>
                </span>
                <span class="option ml-20" @click="addPhone(index)">
                  <Icon size="22" type="ios-add-circle-outline" />
                </span>
                <span class="option ml-20" @click="removePhone(index)" v-show="phoneList.length>1 ">
                  <Icon size="22" type="ios-remove-circle-outline" />
                </span>
              </div>
            </div>
          </div>
          <div class="flex-start mt-10 mb-10">
            <span class="min-width mt-10">邮箱:</span>
            <div calss="flex-column">
              <div v-for="(item,index) in emailList" :key="index" class="column-center mb-5">
                <span class="form-width">
                  <Input v-model="item.value" placeholder="输入邮箱"></Input>
                </span>
                <span class="option ml-20" @click="addEmail(index)">
                  <Icon size="22" type="ios-add-circle-outline" />
                </span>
                <span v-show="emailList.length>1 " class="option ml-20" @click="removeEmail(index)">
                  <Icon size="22" type="ios-remove-circle-outline" />
                </span>
              </div>
            </div>
          </div>
          <div class="flex-start mt-10 mb-10 column-center">
            <span class="min-width">qq:</span>
            <div class="form-width">
              <Input v-model="qq" placeholder="输入qq号"></Input>
            </div>
          </div>
          <div class="flex-start mt-10 mb-10 column-center">
            <span class="min-width">通讯地址 :</span>
            <div class="form-width">
              <Input v-model="mailAddress" placeholder="输入通讯地址"></Input>
            </div>
          </div>
          <div class="flex-start mt-10 mb-10 column-center">
            <span class="min-width">兴趣爱好 :</span>
            <div class="form-width">
              <Input v-model="interest" type="textarea" placeholder="输入兴趣爱好"></Input>
            </div>
          </div>

          <div class="flex-space-between mt-20" style="width:285px">
            <Button type="default" @click="handleCacel">取消</Button>
            <Button v-if="addoredit" type="primary" @click="handleAdd">确认</Button>
            <Button v-else type="primary" @click="handleEdit">确认</Button>
          </div>
        </div>
        <div v-show="showItemDiv" class="address-modal">
          <div style="height:20px"></div>
          <b class="mt-20">联系人详情</b>
          <div class="flex-start mt-10 mb-10 column-center">
            <span class="min-width">名称:</span>
            <div >{{name}}</div>
          </div>
          <div class="flex-start mt-10 mb-10 column-center">
            <span class="min-width">手机号:</span>
            <span  v-for="(item,index) in phoneList" class="mr-5" :key="index">{{item.value}}</span>
          </div>
          <div class="flex-start mt-10 mb-10 column-center">
            <span class="min-width">邮箱:</span>
              <span  v-for="(item,index) in emailList" class="mr-5" :key="index">{{item.value}}</span>
          </div>
          <div class="flex-start mt-10 mb-10 column-center">
            <span class="min-width">qq:</span>
              <span  >{{qq}}</span>
          </div>
           <div class="flex-start mt-10 mb-10 column-center">
            <span class="min-width">兴趣爱好:</span>
              <span  >{{interest}}</span>
          </div>
           <div class="flex-start mt-10 mb-10 column-center">
            <span class="min-width">通讯地址:</span>
              <span  >{{mailAddress}}</span>
          </div>
          <div calss="mt-20">
            <Button type="primary" @click="openEdit">编辑</Button>
          </div>
        </div>
      </div>
    </div>
    <!-- 全展示表格 -->
    <div class="allRight this-content" v-show="showAll">
      <Table v-if="showAll" :height="tableHeight" :data="addressList" :columns="columns">
        <template slot-scope="{row,index}" slot="index">{{index+1}}</template>
        <template slot-scope="{row,index}" slot="phone">
          {{row.phoneList[0].value}}
        </template>
        <template slot-scope="{row,index}" slot="email">
          {{row.emailList[0].value}}
        </template>
        <template slot-scope="{row}" slot="operating">
          <span class="option theme_font mr-20" @click="showEdit(row)">编辑</span>
          <span class="option-delete" @click="deleteAddress(row._id)">删除</span>
        </template>
      </Table>
      <div style="float:right">
        <Page
          :currentPage.sync="currentPage"
          :totalCount="totalCount"
          :pageSize.sync="pageSize"
          @pageChanged="getAddressList"
        ></Page>
      </div>
    </div>
    <span v-show="showAll" class="option toLeft" @click="showAll=false">
      <Icon size="40" type="ios-arrow-dropleft-circle" />
    </span>
    <!-- <Divider /> -->
  </div>
</template>

<script>
/**
 * @description 通讯录
 */
import { knowApi } from "@/api";
import AddressItem from "../../components/knowledge/address-item";
import Page from "_c/self-page/page";
export default {
  name: "",
  components: { AddressItem, Page },
  data() {
    return {
      tableHeight: 0,
      addressList: [],
      addoredit: true,
      showAll: true,
      showItemDiv: false,
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      selectTitle: "",
      columns: [
        /**
         * @可展开操作
         * @此处暂时就不那么麻烦了
         */
        // {
        //   type: "expand",
        //   render: (h, params) => {
        //     return h(AddressItem, {
        //       props: {
        //         row: params.row
        //       }
        //     });
        //   }
        // },
        {
          title: "序号",
          slot: "index",
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          align: "center"
        },
        {
          title: "电话",
          slot: "phone",
          align: "center"
        },
        {
          title: "邮箱",
          slot: "email",
          align: "center"
        },
        {
         title: "qq",
          key: "qq",
          align: "center"
        },
        {
         title: "兴趣爱好",
          key: "interest",
          align: "center"
        },
        {
         title: "通讯地址",
          key: "mailAddress",
          align: "center"
        },
        {
          title: "操作",
          slot: "operating",
          align: "center"
        }
      ],
      name: "",
      email: "",
      qq: "",
      interest: "", //爱好
      mailAddress: "", //通讯地址
      pageIndex: 1,
      pageSize: 10,
      emailList: [{ value: "" }],
      phone: "",
      phoneList: [{ value: "" }]
    };
  },
  mounted() {
    this.tableHeight = 530;
    window.onresize = () => {
      this.tableHeight = 530;
    };
    this.getAddressList();
  },
  methods: {
    showEveryAddress(row, index) {
      this.address_id = row._id;
      this.showItemDiv = true;
      this.name = row.name;
      this.phoneList = row.phoneList;
      this.emailList = row.emailList;
      this.qq = row.qq;
      this.mailAddress = row.mailAddress;
      this.interest = row.interest;
    },
    getAddressList() {
      let p = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      if (this.selectTitle !== "") {
        p.selectTitle = this.selectTitle;
      }
      knowApi.getAddressList(p).then(res => {
        this.addressList = res.result;
        this.totalCount = res.totalCount;
        this.addressList.map(item => {
          if (item.phoneList.length == 0) {
            item.phoneList.push({ value: "" });
          }
          if (item.emailList.length == 0) {
            item.emailList.push({ value: "" });
          }
        });
      });
    },
    openAddModal() {
      this.initAddress();
      this.addoredit = true;
      this.showItemDiv = false;
      this.showAll = false;
    },
    openEdit() {
      this.addoredit = false;
      this.showItemDiv = false;
      this.addoredit = false; // 编辑
    },
    handleAdd() {
      let p = {
        name: this.name,
        interest: this.interest,
        mailAddress: this.mailAddress,
        phoneList:this.phoneList,
        emailList:this.emailList,
        qq: this.qq
      };
      if (p.name === "") {
        this.$Message.warning("请输入联系人姓名");
        return;
      }
       this.phoneList.map((item, index) => {
        if (index >= 1 && item.value === "") {
          this.$Message.warning("请完善联系人电话");
          return;
        }
      });
      this.emailList.map((item, index) => {
        if (index >= 1 && item.value === "") {
          this.$Message.warning("请完善联系人邮箱");
          return;
        }
      });
      knowApi.addAddress(p).then(res => {
        if (res.code === 0) {
          this.$Message.success("新建成功");
          this.initAddress();
          this.showAll = true;
          this.getAddressList();
        }
      });
    },
    handleEdit() {
      let p = {
        id:this.address_id,
        name: this.name,
        interest: this.interest,
        mailAddress: this.mailAddress,
         phoneList:this.phoneList,
        emailList:this.emailList,
        qq: this.qq
      };
      if (p.name === "") {
        this.$Message.warning("请输入联系人姓名");
        return;
      }
      this.phoneList.map((item, index) => {
        if (index >= 1 && item.value === "") {
          this.$Message.warning("请完善联系人电话");
          return;
        }
      });
      this.emailList.map((item, index) => {
        if (index >= 1 && item.value === "") {
          this.$Message.warning("请完善联系人邮箱");
          return;
        }
      });
      knowApi.editAddress(p).then(res => {
        if (res.code === 0) {
          this.$Message.success("编辑成功");
          this.showItemDiv = true;
          this.getAddressList();
        }
      });
    },
    addEmail(index) {
      this.emailList.splice(index, 0, {
        value: ""
      });
    },
    removeEmail(index) {
      this.emailList.splice(index, 1);
    },
    addPhone(index) {
      this.phoneList.splice(index, 0, {
        value: ""
      });
    },
    removePhone(index) {
      this.phoneList.splice(index, 1);
    },
    initAddress() {
      this.name = "";
      this.phoneList = [
        {value:""}
      ];
      this.emailList = [{value:""}];
      this.qq = "";
      this.interest = "";
      this.mailAddress = "";
    },

    handleCacel() {},
    getChange() {},
    showEdit(item) {
      this.address_id = item._id;
      this.showAll = false;
      this.showItemDiv = false;
      this.addoredit = false;
      this.name = item.name;
      this.phoneList = item.phoneList;
      this.emailList = item.emailList;
      this.qq = item.qq;
      this.mailAddress = item.mailAddress;
      this.interest = item.interest;
    },
    deleteAddress(id) {
      console.log(id);
      this.$Modal.confirm({
        title: "删除",
        content: "确定要删除此联系人么？",
        onOk: () => {
          knowApi.deleteAddress(id).then(res => {
            if (res.code === 0) {
              this.$Message.success("删除成功");
              this.getAddressList();
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
.thisAddress {
  .ivu-divider-horizontal {
    margin: 0;
  }
}
.thisTitle {
  height: 50px;
  padding: 5px 20px;
  background: rgba(168, 204, 204, 0.13);
}
.title-back{
  color: black;
}
.this-content {
  min-height: 650px;
}
.address-modal {
  padding: 20px;
}
.leftC {
  width: 100px;
  padding: 10px;
  text-align: center;
  overflow: scroll !important;
  // background: #dcd6f3;
}
.rightC {
  position: relative;
  flex: auto;
  background: #d6f0f3;
}
.toRight {
  position: absolute;
  top: 0;
  left: 0;
}
.allRight {
  position: relative;
}
.toLeft {
  position: absolute;
  top: 40px;
  right: -60px;
  background: #ffffff;
  border-radius: 50%;
  border: 3px solid rgba(1, 2, 3, 0.18);
}
.myInput {
  width: 200px;
}
.every-address-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis !important;
}
</style>