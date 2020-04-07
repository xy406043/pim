
/**
 * @时间相关的通用函数
 * @用作日历组件开发
 */

 export default {
     getYearMonthDay: (time) =>{
         let year = time.getFullYear()
         let month =time.getMonth()
         let day = time.getDay()
         return {year,month,day}
     }
  }
