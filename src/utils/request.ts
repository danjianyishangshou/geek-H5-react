import axios from 'axios'
// 创建axios实例
const http = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0/',
    timeout: 10000
})

// 请求拦截器
http.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
// 响应拦截器
http.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default http