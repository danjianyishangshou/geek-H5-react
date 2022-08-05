import { ApiResponse } from '@/types/data'
import { Toast } from 'antd-mobile'
import axios, { AxiosError } from 'axios'
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
    (error: AxiosError<ApiResponse>) => {
        if (!error.response) {
            Toast.show({
                icon: 'fail',
                content: '网络异常'
            })
        } else {
            const message = error.response.data.message
            Toast.show({
                icon: 'fail',
                content: message
            })
        }
        return Promise.reject(error)
    }
)
export default http