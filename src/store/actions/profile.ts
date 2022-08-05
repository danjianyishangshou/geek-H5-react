import { ApiResponse, ProfileInfo, UserInfo } from "@/types/data"
import { RootAction, RootThunkAction } from "@/types/store"
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
