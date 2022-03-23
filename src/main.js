import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./axios"

import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
Vue.use(Element)

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)


import axios from 'axios'
Vue.prototype.$axios = axios //



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
