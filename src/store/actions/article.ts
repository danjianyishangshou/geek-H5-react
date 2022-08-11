import { ApiResponse, ArticleItemDataPage } from "@/types/data"
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
