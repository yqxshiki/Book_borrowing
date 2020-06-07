import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/avue'

import axios from 'axios'
// import Vue from 'vue'

Vue.prototype.$axios = axios.create({
  baseURL: 'http://129.211.11.64:801/api'
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
