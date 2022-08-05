import { TokenInfo } from "@/types/data"
import { RootAction } from '@/types/store'
import { getTokenInfo } from "@/utils/localToken"
export type LoginStore = {
    tokenInfo: TokenInfo
}

const initState = {
    tokenInfo: getTokenInfo() || {
        token: '',
        refresh_token: ''
    }
}
const LoginReducer = (
    state: LoginStore = initState,
    action: RootAction
): LoginStore => {
    if (action.type === 'login/set_tokenInfo') {
        return {
            tokenInfo: action.payload
        }
    }
    return state
}

export default LoginReducer