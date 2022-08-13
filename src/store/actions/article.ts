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
