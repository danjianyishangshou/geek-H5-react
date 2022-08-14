import { ApiResponse, CommentRes } from "@/types/data"
import { RootAction, RootThunkAction } from "@/types/store"
import http from "@/utils/request"

export const getCommentPage = (id: string, offset: string): RootThunkAction => {
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
    if (oldCommentPage?.results?.length > 0) {
      NewList = [...newCommentPage.results, ...oldCommentPage.results]
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
