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
