import axios from 'axios'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import router from './router'
import store from './store'


//这里需要进行一些拦截

axios.defaults.baseURL="http://localhost:8080"


// TODO:对于访问/blogs/**的方法放行且不需要发送token（发送也可以，就是需要验证token的时效性）
// TODO:对于其他访问接口需要发送token 若没有token需要提示重新登录/页面转换到login页面
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
