import { ApiResponse, ProfileInfo, UserInfo } from "@/types/data"
import { RootAction, RootThunkAction } from "@/types/store"
import { removeTokenInfo } from "@/utils/localToken"
import http from "@/utils/request"

/**
 * 获取个人中心信息
 */
export const getProfileActionCreator = (): RootThunkAction => {
    return async (dispatch) => {
        const res = await http.get<ApiResponse<ProfileInfo>>('/user')
        const Profile = res.data.data
        dispatch({
            type: 'profile/set_profile',
            payload: Profile
        } as RootAction)
    }
}
/**
 * 获取个人信息页信息
 */
export const getUserInfoActionCreator = (): RootThunkAction => {
    return async (dispatch) => {
        const res = await http.get<ApiResponse<UserInfo>>('/user/profile')
        const userInfo = res.data.data
        dispatch({
            type: 'profile/set_userInfo',
            payload: userInfo
        } as RootAction)
    }

}
/**
 * 更新局部信息
 * @param data 
 * @returns 
 */
// Partial可以将UserInfo中所有的类型转换成可选的
export const updateUserInfoActionCreator = (data: Partial<UserInfo>): RootThunkAction => {
    return async (dispatch) => {
        await http.patch('/user/profile', data)
        // 获取更新后的用户信息
        dispatch(getUserInfoActionCreator())

    }
}
/**
 * 更新头像
 * @param data 
 * @returns 
 */
export const updateUserPhotoActionCreator = (data: FormData): RootThunkAction => {
    return async (dispatch) => {
        await http.patch('/user/photo', data)
        dispatch(getUserInfoActionCreator())
    }
}

/**
 * 
 * 退出登录 
 * 
 */
export const logoutInfo = (): RootThunkAction => {
    return async (dispatch) => {
        // 1,清除本地token
        removeTokenInfo()
        //2 清除redux数据
        dispatch({
            type: 'login/set_tokenInfo',
            payload: {}
        } as RootAction)
        // 3,清除个人信息 profile
        dispatch({
            type: 'profile/set_profile',
            payload: {}
        } as RootAction)
        // 清除userInfo
        dispatch({
            type: 'profile/set_userInfo',
            payload: {}
        } as RootAction)
    }
}
