import { ApiResponse } from "@/types/data";
import { Toast } from "antd-mobile";
import axios, { AxiosError } from "axios";
import { getTokenInfo } from "./localToken";
// 创建axios实例
const http = axios.create({
  baseURL: "http://geek.itheima.net/v1_0/",
  timeout: 10000,
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    const token = getTokenInfo().token;
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 响应拦截器
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    // console.log(error.message)
    // if(error.message==='Request failed with status code 401'&&error.code==='ERR_BAD_REQUEST'){
    //     console.log(1566666);
    // }
    if (
      error.response?.status === 401 &&
      error.response.data.message === "token超时或者未传token"
    ) {
      let refresh_token = getTokenInfo().refresh_token;
      let data =
        (error.config.headers!.Authorization = `Bearer ${refresh_token}`);
      let res = http.put("/authorizations", data);
      console.log(res);
    }
    if (!error.response) {
      Toast.show({
        icon: "fail",
        content: "网络异常",
      });
    } else {
      const message = error.response.data.message;
      Toast.show({
        icon: "fail",
        content: message,
      });
    }
    return Promise.reject(error);
  }
);
export default http;
