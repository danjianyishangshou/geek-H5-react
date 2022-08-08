import { history } from "@/router";
import store from "@/store";
import { ApiResponse } from "@/types/data";
import { RootAction } from "@/types/store";
import { Toast } from "antd-mobile";
import axios, { AxiosError } from "axios";
import {
  getTokenInfo,
  isTokenInfo,
  removeTokenInfo,
  setTokenInfo,
} from "./localToken";
const baseURL = "http://geek.itheima.net/v1_0/";
// 创建axios实例
const http = axios.create({
  baseURL,
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
  async (error: AxiosError<ApiResponse>) => {
    // 本地有token的情况下在进行token的刷新判断
    if (isTokenInfo()) {
      if (
        error.response?.status === 401 &&
        error.response.data.message === "token超时或者未传token"
      ) {
        let refresh_token = getTokenInfo().refresh_token;
        //   axios第三个参数可以配置响应头
        //   这里要使用axios发起请求防止出现请求拦截器混乱
        try {
          let res = await axios.put(
            baseURL + "authorizations",
            {},
            {
              headers: {
                Authorization: `Bearer ${refresh_token}`,
              },
            }
          );
          //   获取到的新的token
          let newToken = res.data.data.token;
          //  新的token存储在本地
          setTokenInfo({
            ...getTokenInfo(),
            token: newToken,
          });
          //   新的token存在仓库中
          store.dispatch({
            type: "login/set_tokenInfo",
            payload: {
              ...getTokenInfo(),
              token: newToken,
            },
          } as RootAction);
          //   重新发起请求的新的token  之前的请求信息
          const config = error.response.config;
          return http(config);
        } catch {
          // "refresh_token失效" 回到首页 重新登录
          history.replace({
            pathname: "/login",
            state: {
              redirectUrl: history.location.pathname,
            },
          });
          //   清除token
          removeTokenInfo();
          store.dispatch({
            type: "login/set_tokenInfo",
            payload: {},
          } as RootAction);
        }
      }
    }

    // 处理网络异常的问题
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
