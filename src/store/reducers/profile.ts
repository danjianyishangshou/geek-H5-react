import { ProfileInfo, UserInfo } from "@/types/data"
import { RootAction } from "@/types/store"
type profileStore = {
    profile: ProfileInfo
    userInfo: UserInfo
}

const initProfileState: profileStore = {
    profile: {} as ProfileInfo,
    userInfo: {} as UserInfo
}

export const profileReducer = (
    state = initProfileState,
    action: RootAction
): profileStore => {
    if (action.type === 'profile/set_profile') {
        return {
            ...state,
            profile: action.payload
        }
    }
    if (action.type === 'profile/set_userInfo') {
        return {
            ...state,
            userInfo: action.payload
        }
    }
    return state

}

