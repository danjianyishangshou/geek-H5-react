import {
  ApiResponse,
  ArticleDetailInfo,
  ArticleItemDataPage,
} from "@/types/data"
import { RootAction, RootThunkAction } from "@/types/store"
import http from "@/utils/request"
/**
 * 获取文章列表
 * @param channelId
 * @returns
 */
export const getArticlesData = (
  channelId: number,
  timestamp: string
): RootThunkAction => {
  return async (dispatch, getState) => {
    const res = await http.get<ApiResponse<ArticleItemDataPage>>("/articles", {
      params: {
        channel_id: channelId,
        timestamp: timestamp,
      },
    })

    dispatch({
      type: "article/set_channel_article",
      payload: {
        channelId,
        data: {
          pre_timestamp: res.data.data.pre_timestamp,
          results: [
            ...(getState().articles.channelArticles[channelId]?.results || []),
            ...res.data.data.results,
          ],
        },
      },
    } as RootAction)
  }
}

/**
 * 获取下拉刷新文章列表
 * @param channelId
 * @returns
 */
export const getNewArticlesData = (channelId: number): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<ApiResponse<ArticleItemDataPage>>("/articles", {
      params: {
        channel_id: channelId,
        timestamp: "" + Date.now(),
      },
    })

    dispatch({
      type: "article/set_channel_article",
      payload: {
        channelId,
        data: res.data.data,
      },
    } as RootAction)
  }
}
/**
 * 获取的详情
 * @param id
 * @returns
 */
export function getArticleDetail(id: string): RootThunkAction {
  return async (dispatch) => {
    const res = await http.get<ApiResponse<ArticleDetailInfo>>(
      `/articles/${id}`
    )
    dispatch({
      type: "article/set_article_action",
      payload: res.data.data,
    } as RootAction)
  }
}
/**
 * 文章点赞取消点赞
 */
export function likeArticle(id: string, attitude: number): RootThunkAction {
  return async (dispatch) => {
    if (attitude === 1) {
      // 取消
      await http.delete(`/article/likings/${id}`)
    } else {
      // 点赞
      await http.post("/article/likings", { target: id })
    }

    // 重新获取文章详情
    await dispatch(getArticleDetail(id))
  }
}

/**
 * 收藏文章
 * @param id
 * @param is_collected
 * @returns
 */
export function collectArticle(
  id: string,
  is_collected: boolean
): RootThunkAction {
  return async (dispatch) => {
    if (is_collected) {
      // 取消
      await http.delete(`/article/collections/${id}`)
    } else {
      // 收藏
      await http.post("/article/collections", { target: id })
    }

    // 重新获取文章详情
    await dispatch(getArticleDetail(id))
  }
}

/**
 * followUser
 * @param userId  作者ID
 * @param is_follow 是否关注
 * @param articleId 文章id
 * @returns
 */
export function followUser(
  userId: string,
  is_follow: boolean,
  articleId: string
): RootThunkAction {
  return async (dispatch) => {
    if (is_follow) {
      await http.delete(`/user/followings/${userId}`)
    } else {
      await http.post("/user/followings", { target: userId })
    }
    await dispatch(getArticleDetail(articleId))
  }
}
