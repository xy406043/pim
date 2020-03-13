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
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
import VueClipboard from 'vue-clipboard2'  //复制
import VCharts from "v-charts"


Vue.use(ViewUI);
Vue.use(VCharts)
Vue.use(VueClipboard)
Vue.component('vue-simplemde', VueSimplemde)
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
