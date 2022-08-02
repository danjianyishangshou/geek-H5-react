// 引入创建仓库,与中间间配置项
import { createStore, applyMiddleware } from 'redux'
// 导入开发者工具
import { composeWithDevTools } from 'redux-devtools-extension'
// 导入总reducers子仓库
import reducers from './reducers/index'
// 导入thunk中间件
import thunk from 'redux-thunk'


// 配置仓库
const store = createStore(
    reducers,
    // 配置开发者工具与中间件
    composeWithDevTools(applyMiddleware(thunk))
)
// 到处仓库
export default store