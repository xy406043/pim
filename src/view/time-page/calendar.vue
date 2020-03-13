
<template>
    <div>
        <div class="tabn flex-space-between column-center">
      <div>
        <span class="theme_font ml-10 font-24">我的日历</span>
      </div>
      <div>
        <!-- <span class="option ml-10 mr-20" @click="upload">上传文件</span> -->
        <!-- <span class="option ml-10">密码分类</span> -->
      </div>
    </div>
        <MyCalendar :showToday="showToday" @on-click="showInfo"></MyCalendar>
    </div>
</template>

<script>
/**
 * @日历
 * @进行日程概览以及日程新建日程等活动
 */
import MyCalendar from "_c/todo/calendar"
const moment=require("moment")
    export default {
        name: 'calendar',
        components:{
            MyCalendar
        },
        data() {
            return {
                showToday: true
            }
        },
        methods:{
            showInfo(val){
                if(val===0){
                       console.log("点击了上个月")
                }else{
                    console.log("点击了这个月")
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.title{
    text-align: center;
    font-weight: bold;
    text-shadow: 1px 2px 9px #808080;
}
.tabn {
  height: 50px;
  padding: 5px 20px;
  background: rgba(168, 204, 204, 0.13);
}
</style>    
