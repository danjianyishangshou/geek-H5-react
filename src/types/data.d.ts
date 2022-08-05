//. 主要配置与请求数据有关的ts类型
/**
 * 登录表单的类型
 */
export type LoginFrom = {
    mobile: string
    code: string
}
/**
 * 统一的请求响应接口类型
 */
export type ApiResponse<T = any> = {
    data: T
    message: string
}
/**
 * TokenInFo返回的类型
 */
export type TokenInfo = {
    token: string
    refresh_token: string
}


/**
 * 个人中心类型
 */
export interface ProfileInfo {
    id: string;
    name: string;
    photo: string;
    art_count: number;
    follow_count: number;
    fans_count: number;
    like_count: number;
}


/**
 * 个人信息页类型
 */
interface UserInfo {
    id: string;
    photo: string;
    name: string;
    mobile: string;
    gender: number;
    birthday: string;
    intro: string
}