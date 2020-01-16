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
Vue.use(ViewUI);
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
