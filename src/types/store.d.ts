//. 主要配置与仓库redux有关的ts类型
import store from '@/store'
import { ThunkAction } from 'redux-thunk'
// 所有状态的类型
export type RootStore = ReturnType<typeof store.getState>
// 
export interface LoginAction {
    type: 'login/login'
}
// 汇总与action相关的联合类型
export type RootAction = LoginAction

// 所有thunkAction的类型
export type RootThunkAction = ThunkAction<void, RootStore, unknown, RootAction>