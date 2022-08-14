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
  id: string
  name: string
  photo: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}

/**
 * 个人信息页类型
 */
interface UserInfo {
  id: string
  photo: string
  name: string
  mobile: string
  gender: number
  birthday: string
  intro: string
}

// 小智同学类型
type Message = {
  type: "robot" | "user"
  text: string
}

// 频道类型
type Channel = {
  id: number
  name: string
}
// 文章列表项分页信息
export type ArticleItemDataPage = {
  pre_timestamp: string
  results: ArticleItemData[]
}
// 文章的类型
export type ArticleItemData = {
  art_id: string
  title: string
  aut_id: string
  comm_count: number
  pubdate: string //发布日期
  aut_name: string
  is_top: number
  cover: ArticleItemCover
}
// 文章图片种类的类型
export type ArticleItemCover = {
  type: 0 | 1 | 3
  images: string[]
}

// 文章类型

interface ArticleDataPage {
  page: number
  per_page: number
  results: ArticleDetail[]
  total_count: number
}

type ArticleDetail = {
  art_id: string
  title: string
  aut_id: string
  aut_name: string
  comm_count: number
  pubdate: string
  cover: {
    type: number
    images?: string[]
  }
  like_count: number
  collect_count: number
} & ArticleItemData

//新闻详情类型
export type ArticleDetailInfo = {
  art_id: string
  attitude: number
  aut_id: string
  aut_name: string
  aut_photo: string
  comm_count: number
  content: string
  is_collected: boolean
  is_followed: boolean
  like_count: number
  pubdate: string
  read_count: number
  title: string
}
//文章评论的分页类型
export type Comment = {
  aut_id: string
  aut_name: string
  aut_photo: string
  com_id: string
  content: string
  is_followed: boolean
  is_liking: boolean
  like_count: number
  pubdate: string
  reply_count: number
}
//文章评论的类型
export type CommentRes = {
  end_id: string
  last_id: string
  results: Comment[]
  total_count: number
}
