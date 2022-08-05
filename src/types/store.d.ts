//. 主要配置与仓库redux有关的ts类型
import store from '../store'
import { ThunkAction } from 'redux-thunk'
import { Profile, UserInfo } from '@/types/data'
// 所有状态的类型
export type RootStore = ReturnType<typeof store.getState>

export interface TokenAction {
    type: 'login/set_tokenInfo'
    payload: TokenInfo
}
export interface LoginAction {
    type: 'login/login'
}
export interface ProfileAction {
    type: 'profile/set_profile'
    payload: Profile
}
export interface ProfileUserAction {
    type: 'profile/set_userInfo'
    payload: UserInfo
}
// 汇总与action相关的联合类型
export type RootAction = LoginAction | TokenAction | ProfileAction | ProfileUserAction

// 所有thunkAction的类型
export type RootThunkAction = ThunkAction<void, RootStore, unknown, RootAction>