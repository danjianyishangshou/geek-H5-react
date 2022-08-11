import React from "react"
import ReactDOM from "react-dom/client"
import "./index.scss"
// import { BrowserRouter as Router } from 'react-router-dom'
// 配置全局的history实例
import { Router } from "react-router-dom"
import { history } from "@/router"
import App from "./App"
import store from "./store/index"
import { Provider } from "react-redux"
import dayjs from "dayjs"
// 引入中文模式
import "dayjs/locale/zh-cn"
// 引入几年前的配置
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.locale("zh-cn")
dayjs.extend(relativeTime)
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Provider store={store}>
    {/* 配置全局的history实例 */}
    <Router history={history}>
      <App />
    </Router>
  </Provider>
)
