import { CommentRes } from "@/types/data"
import { RootAction } from "@/types/store"

export type CommentState = {
  comments: CommentRes
}
const initState: CommentState = {
  comments: {
    end_id: "",
    last_id: "",
    results: [],
    total_count: 0,
  },
}
export const commentReducer = (
  state = initState,
  action: RootAction
): CommentState => {
  switch (action.type) {
    case "article/set_Comments_action":
      return {
        ...state,
        comments: action.payload,
      }
    default:
      return state
  }
}
