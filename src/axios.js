import axios from 'axios'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import router from './router'
import store from './store'


//这里需要进行一些拦截

axios.defaults.baseURL="http://localhost:8080"

axios.interceptors.request.use(
    config => {
        config.withCredentials = true // 允许携带token ,解决跨域产生的相关问题
        let token = localStorage.getItem('token')//从本地缓存取出token值
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        if (token) {
            config.headers = {
                'token': token,
            }
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
