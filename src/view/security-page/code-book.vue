<template>
  <div class="thisCodeBook">
    <div class="tabn flex-space-between column-center">
      <div>
        <router-link to="code-case" class="title-back option mr-10">我的保险箱</router-link>/
        <span class="theme_font ml-10">我的密码本</span>
      </div>
      <div>
        <span class="option ml-10 mr-20" @click="addCode">新建密码条</span>
        <!-- <span class="option ml-10">密码分类</span> -->
      </div>
    </div>
    <Divider class="myDivider" />
    <!-- 内容层 -->
    <div class="content">
      <!-- 搜索层 -->
      <div class="mb-10 flex-row">
        <div class="flex-start column-center">
          <span class="theme_font mr-20">搜索：</span>
          <span>
            <Input class="myInput" search v-model="selectCode" @on-search="getCodeList"></Input>
          </span>
        </div>
      </div>
      <Divider class="myDivider" />
      <!-- 表格层 -->
      <div class="table">
          <Table :height="tableHeight" :data="codeList" :columns="columns">
              <template slot-scope="{row,index}" slot="index">{{(currentPage-1)*pageSize+index+1}}</template> 
              <template slot-scope="{row}" slot="accountList">
                  <div class="flex=-column">
                    <div class="column-center" v-for="(item,inx) in row.accountList" :key="inx">
                        <span class="mr-5" >账号:</span>
                        <span class="mr-10">{{item.account}}</span>
                        <span class="mr-5" >密码:</span>
                        <span class="mr-10">{{item.password}}</span>
                    </div>
                  </div>
              </template>
              <template slot-scope="{row}" slot="operating">
                  <span class="theme_font option mr-10" @click="editCode(row)">编辑</span>
                  <span class="option-delete" @click="deleteCode(row._id)">删除</span>
              </template>
          </Table>
      </div>
      <div class="flex-space-between">
          <div></div>
       <Page
          :currentPage.sync="currentPage"
          :totalCount="totalCount"
          :pageSize.sync="pageSize"
          @pageChanged="getCodeList"
        ></Page>
        </div>
    </div>

    <!-- 新建/编辑密码条 -->
    <Modal :width="600" v-model="codeModal" footer-hide @on-visible-change="initModal">
      <div class="codeModal">
          <div class="modal-title">
               <span v-if="addoredit">新建账号条</span>
               <span v-else>编辑账号条</span>
          </div>
        <div class="column-center mb-10">
          <div class="mr-20">账号从属:</div>
          <div class="form-width">
          <Input v-model="affiliation"  placeholder="请输入账号所属"></Input>
        </div>
        </div>
        <div class="mb-10">
           <b >账号</b>
          <div class="flex-column">
            <div class="ml-20 column-center mb-10" v-for="(item,index) in accountList" :key="index">
              <div class="mr-10">账号:</div>
              <div class="mr-20">
                <Input v-model="item.account" placeholder="请输入账号"></Input>
              </div>
              <div class="mr-10">密码:</div>
              <div class="mr-20">
                <Input v-model="item.password" placeholder="请输入账号"></Input>
              </div>
              <span class="option ml-20" @click="addAccount(index)">
                <Icon size="22" type="ios-add-circle-outline" />
              </span>
              <span
                v-show="accountList.length>1 "
                class="option ml-20"
                @click="removeAccount(index)"
              >
                <Icon size="22" type="ios-remove-circle-outline" />
              </span>
            </div>
          </div>
        </div>
        <div class="column-center">
            <div class="mr-20">备注:</div>
            <div><Input type="textarea" v-model="remarks" placeholder="请输入备注信息"></Input></div>
        </div>
        <div class="mt-20 ml-20">
            <Button v-if="addoredit" type="primary" @click="handleAdd">确认</Button>
            <Button v-else type="primary" @click="hanldeEdit">确认</Button>
            <Button class="ml-20"  type="default" @click="cancelModal">取消</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
/**
 * @纯密码本
 * 独特的安全存储方式
 * 保护您密码安全
 */
import { securityApi } from "@/api";
import Page from "_c/self-page/page";
export default {
  name: "",
  components:{
      Page
  },
  data() {
    return {
      selectCode: "",
      code_id:"",
      codeList: [],
      codeModal: false,
      addoredit: true,
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
      affiliation: "", //账号从属于什么网站、游戏、等，
      accountList: [{ account: "", password: "" }], //同一从属下可能有多个账号
      remarks: "", //备注信息
      tableHeight:"",
      columns:[
          {
              title:"序号",
              slot:"index"
          },
          {
              title:"从属",
              key:"affiliation"
          },
          {
              title:"账户密码",
              slot:"accountList",
               width:"320"
          },
          {title:"备注",key:"remarks"},
          {title:"操作",slot:"operating"}
      ]
    };
  },
  mounted() {
       this.tableHeight = 490;
    window.onresize = () => {
      this.tableHeight = 490;
    };
    this.getCodeList()
  },
  methods: {
    getCodeList() {
        let p= {
            currentPage:this.currentPage,
            pageSize:this.pageSize
        }
        if(this.selectCode!==''){
            p.selectCode=this.selectCode
        }
        securityApi.getCodeList(p).then(res =>{
            this.codeList = res.result
            this.totalCount=res.totalCount
        })
    },
    addCode() {
      this.addoredit = true;
      this.codeModal = true;
    },
    editCode(item){
        console.log(item)
        this.addoredit = true;
      this.codeModal = true;
      this.code_id=item._id
      this.affiliation=item.affiliation
      this.accountList=item.accountList
      this.remarks=item.remarks

    },
    initModal(val){
        if(val===false){
        this.affiliation=""
        this.accountList=[{ account: "", password: "" }]
      this.remarks=""
        }else {return}
         this.affiliation=""
        this.accountList=[{ account: "", password: "" }]
      this.remarks=""
        
    },
    handleAdd(){
        let p= {
            affiliation:this.affiliation,
            accountList:this.accountList,
            remarks:this.remarks
        }
        if(p.affiliation===''){
            this.$Message.warning("请输入账号从属")
            return
        }
        this.accountList.map(item =>{
            if(item.account==='' || item.password===''){
               this.$Message.warning("请完善账号信息")
               return
            }
        })
        securityApi.addCode(p).then(res => {
            if(res.code===0){
                this.$Message.warning("新建成功")
                this.getCodeList()
                this.codeModal=false
            }
        })

    },
    handleEdit(){
         let p= {
             code_id:this.code_id,
            affiliation:this.affiliation,
            accountList:this.accountList,
            remarks:this.remarks
        }
        if(p.affiliation===''){
            this.$Message.warning("请输入账号从属")
            return
        }
        this.accountList.map(item =>{
            if(item.account==='' || item.password===''){
               this.$Message.warning("请完善账号信息")
               return
            }
        })
        securityApi.editCode(p).then(res => {
            if(res.code===0){
                this.$Message.warning("编辑成功")
                this.getCodeList()
                this.codeModal=false
            }
        })

    },
    deleteCode(id){
       this.$Modal.confirm({
        title: "删除",
        content: "确定要删除此条账号信息么？",
        onOk: () => {
          securityApi.deleteCode(id).then(res => {
            if (res.code === 0) {
              this.$Message.success("删除成功");
              this.getCodeList();
            } else {
              this.$Message.error(res.errorMsg);
            }
          });
        },
        onCancel: () => {}
      });
    },
    cancelModal(){
   this.codeModal=false
   this.initModal()
    },
    addAccount(index) {
      this.accountList.splice(index+1, 0, {
        account: "",
        password: ""
      });
    },
    removeAccount(index) {
      this.accountList.splice(index, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.thisCodeBook {
  height: auto;
}
.modal-title{
    font-size:24px;
    text-align: start;
    margin: 0 0 10px 20px;
}
.myDivider {
  margin: 0;
}
.title-back {
  color: black;
}
.tabn {
  height: 50px;
  padding: 5px 20px;
  background: rgba(168, 204, 204, 0.13);
}
.content {
  padding: 10px;
}
.myInput {
  width: 200px;
}
.table {
  padding: 10px;
}
</style>