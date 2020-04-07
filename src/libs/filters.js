
const moment = require('moment')
export default{
  // 定全局过滤函数,引号必须有
  'getHandledValue': (num, len) => {
    return (Array(len).join('0') + num).slice(-len)
  },
  'timeFilter': (timetap, format) => {
    if (typeof timetap !== 'number') return
    return moment(timetap).format(format)
  }
}