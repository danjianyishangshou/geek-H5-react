import { createBrowserHistory } from "history";
// 创建一个全局的history的实例 在函数组件外也能使用
export const history = createBrowserHistory();
// 需要在主入口文件中配置
