import { setLocalStore, getLocalStore, removeLocalStore } from './localStore'
import { TokenInfo } from '@/types/data'
const TOKEN_KEY = 'geek_token-info'
/**
 * 获取tokenInfo信息
 * @returns 
 */
export const getTokenInfo = () => getLocalStore(TOKEN_KEY)
/**
 * 设置tokenInfo信息
 * @param value  存入的数据
 * @returns 
 */
export const setTokenInfo = (value: TokenInfo) => setLocalStore(TOKEN_KEY, value)
/**
 * 移除tokenInfo信息
 * @returns 
 */
export const removeTokenInfo = () => removeLocalStore(TOKEN_KEY)

/**
 * 判断有没有token
 * @returns 
 */
export const isTokenInfo = () => getTokenInfo().token
// .tokenInfo
// export const isTokenInfo = () => {
//     // if (JSON.stringify(getTokenInfo() === '{}')) {
//     //     return false
//     // } else {
//     //     return true
//     // }
//     return !!getTokenInfo().tokenInfo
// }