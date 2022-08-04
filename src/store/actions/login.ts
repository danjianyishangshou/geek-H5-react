import { ApiResponse, LoginFrom, TokenInfo } from "@/types/data"
import { RootAction, RootThunkAction } from "@/types/store"
import { setTokenInfo } from "@/utils/localToken"
import http from "@/utils/request"
// 封装一个发起登录请求的工厂函数 主要为了穿参数 因为thunk不支持穿参数
export const doLoginActionCreator = (values: LoginFrom) => {
    const doLogin: RootThunkAction = async (dispatch) => {
        const res = await http.post<ApiResponse<TokenInfo>>('/authorizations', values)
        const tokenInfo = res.data.data
        // 将返回的token信息储存到store仓库
        setTokenInfo(tokenInfo)
        dispatch({
            type: 'login/set_tokenInfo',
            payload: tokenInfo
        } as RootAction)
    }
    return doLogin
}