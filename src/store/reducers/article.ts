import { ArticleDetailInfo, ArticleItemDataPage } from "@/types/data"
import { RootAction } from "@/types/store"
export type ArticleStore = {
  channelArticles: {
    [key: number]: ArticleItemDataPage
  }
  articleInfo: ArticleDetailInfo
}
const initState: ArticleStore = {
  channelArticles: {},
  articleInfo: {} as ArticleDetailInfo,
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
  if (action.type === "article/set_article_action") {
    return {
      ...state,
      articleInfo: action.payload,
    }
  }
  return state
}
