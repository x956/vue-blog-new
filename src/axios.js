import axios from 'axios'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import router from './router'
import store from './store'


//这里需要进行一些拦截

axios.defaults.baseURL="http://localhost:8080"
