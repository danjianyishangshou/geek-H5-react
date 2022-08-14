import { ApiResponse, CommentRes } from "@/types/data"
import { RootAction, RootThunkAction } from "@/types/store"
import http from "@/utils/request"
/**
 * 获取评论信息
 * @param id
 * @param offset
 * @returns
 */
export const getCommentPage = (
  id: string,
  offset: string,
  type?: string
): RootThunkAction => {
  return async (dispatch, getState) => {
    const res = await http.get<ApiResponse<CommentRes>>("/comments", {
      params: {
        type: "a",
        source: id,
        limit: 5,
        offset,
      },
    })
    const oldCommentPage = getState().comment.comments
    const newCommentPage = res.data.data
    let NewList = []
    // 如果offset没有传就是需要在新增列表了
    if (oldCommentPage?.results?.length > 0 && offset) {
      NewList = [...oldCommentPage.results, ...newCommentPage.results]
    } else {
      NewList = [...newCommentPage.results]
    }

    dispatch({
      type: "article/set_Comments_action",
      payload: {
        ...newCommentPage,
        results: NewList,
      },
    } as RootAction)
  }
}

/**
 * 评论的请求
 * @param articleId 文章id
 * @param content
 * @returns
 */
export function addComment(
  target: string,
  content: string,
  articleId?: string
): RootThunkAction {
  return async (dispatch) => {
    ;(await http.post)<ApiResponse>("/comments", {
      target,
      content,
      art_id: articleId,
    })
    dispatch({
      type: "article/set_Comments_action",
      payload: {},
    } as RootAction)

    dispatch(getCommentPage(articleId || target, ""))
  }
}

/**
 * 获取回复信息
 * @param id
 * @param offset
 * @returns
 */
export function getReplyList(id: string, offset?: string): RootThunkAction {
  return async (dispatch) => {
    const res = await http.get<ApiResponse<CommentRes>>("/comments", {
      params: {
        type: "c",
        source: id,
        offset,
      },
    })

    dispatch({
      type: "article/set_save_reply",
      payload: res.data.data,
    } as RootAction)
  }
}
