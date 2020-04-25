import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import filters from "@/libs/filters"
import 'view-design/dist/styles/iview.css';
import config from "@/config"
import "../public/common.less"
import "../public/callTheme.less"
import "../public/xy.less"
// import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
import VueClipboard from 'vue-clipboard2'  //复制
import VCharts from "v-charts"
import VueSocketIO from "vue-socket.io"
import axios from "@/libs/axios"
import axios2 from "axios"
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import VueJsonp from "vue-jsonp"
Vue.use(VueJsonp)

Vue.use(Vuesax,{})
Vue.prototype.$https=axios2  //此为使用第三方接口时使用
Vue.prototype.$axios=axios
Vue.use(ViewUI);
Vue.use(VCharts)
Vue.use(VueClipboard)
// Vue.component('vue-simplemde', VueSimplemde)
Vue.use(new VueSocketIO({
  // debug:true,
  connection:(process.env.VUE_APP_CURRENTMODE==="production")?'http:118.190.162.231:4000':'http://127.0.0.1:4000'
  // connnection:'http:118.190.162.231:4000'
}))
Vue.config.productionTip = false

Vue.prototype.$config = config

Object.keys(filters).forEach(item => {
  // console.log(item)
  // console.log(filters[item])
  Vue.filter(item,filters[item])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
