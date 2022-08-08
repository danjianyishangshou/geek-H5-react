import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
// import { BrowserRouter as Router } from 'react-router-dom'
// 配置全局的history实例
import { Router } from "react-router-dom";
import { history } from "@/router";
import App from "./App";
import store from "./store/index";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    {/* 配置全局的history实例 */}
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);
