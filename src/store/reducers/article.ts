import { ArticleItemDataPage } from "@/types/data"
import { RootAction } from "@/types/store"
export type ArticleStore = {
  channelArticles: {
    [key: number]: ArticleItemDataPage
  }
}
const initState: ArticleStore = {
  channelArticles: {},
}
export const articleReducer = (
  state: ArticleStore = initState,
  action: RootAction
): ArticleStore => {
  if (action.type === "article/set_channel_article") {
    const id = action.payload.channelId
    return {
      ...state,
      channelArticles: {
        ...state.channelArticles,
        [id]: action.payload.data,
      },
    }
  }
  return state
}
