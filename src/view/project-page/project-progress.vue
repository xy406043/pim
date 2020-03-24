<template>
  <div class="thisProgress">
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
    <div>
      <!-- 任务集完成情况展示图 -->
        <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
    </div>
    <div class="footer-text">组件依赖：  <a href="https://v-charts.js.org/#/line" target="_blank">V-charts</a> </div>
  </div>
</template>

<script>
/**
 * @任务集任务进展图示
 * @由于并未记录每日的任务进展情况所以只展示当天完成情况
 */
import {projectApi} from "@/api"
    export default {
        name: '',
        data() {
            this.chartSettings = {
        level: [
              ['总数'],
          ['已完成', '已延误', '未安排',"进行中"]
        ]
      }
            return {
                projectName:"",
                project_id:"",
                /**
                 * @以下包含子任务
                 */
                finished:null,//已完成
                delaying:null,//已延误
                unschedule:null,//为安排
                totalCount:null,
                ondoing:null, //进行中 
                chartData:{
                    columns:["标题","Number"],
                    rows:[
                        {"标题":"已完成","Number":0},
                        {"标题":"已延误","Number":0},
                        {"标题":"未安排","Number":0},
                        {"标题":"进行中","Number":0},
                        {"标题":"总数","Number":0},
                    ]
                }
            }
        },
        created(){
            this.projectName=this.$route.query.name
            this.project_id=this.$route.query.id
            this.getProjectOverView()
        },
        methods:{
            getProjectOverView(){
               projectApi.getProjectOverView(this.project_id).then(res =>{
                   const {totalCount,unschedule,ondoing,finished,delaying} = res.result
                   this.totalCount=totalCount
                   this.unschedule=unschedule
                   this.ondoing=ondoing
                   this.finished=finished
                   this.delaying=delaying
                   this.chartData={
                    columns:["标题","Number"],
                    rows:[
                        {"标题":"已延误","Number":delaying},
                        {"标题":"未安排","Number":unschedule},
                        {"标题":"已完成","Number":finished},
                        {"标题":"进行中","Number":ondoing},
                        {"标题":"总数","Number":totalCount},
                    ]
                }
                   
               })
            }
        }


    }
</script>

<style lang="less" scoped>
.thisProgress {
  .ivu-divider {
    margin: 0;
  }
}
.thisTitle {
  height: 50px;
  padding: 5px 20px;
  background: rgba(168, 204, 204, 0.13);
}
.this-content {
  padding: 24px;
}
.title-back {
  color: black;
}
.footer-text{
  margin-top: 20px;
  margin-right: 30px;
  font-weight: bolder;
  text-align: right;
}
</style>