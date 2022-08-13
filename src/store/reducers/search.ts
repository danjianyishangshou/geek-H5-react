import { ArticleDataPage } from "@/types/data"
import { RootAction } from "@/types/store"
import { getKeyWords } from "@/utils/localKeyWords"

export type SearchStore = {
  suggestion: string[]
  keyWords: string[]
  searchPage: ArticleDataPage
}
const initState = {
  suggestion: [],
  keyWords: getKeyWords(),
  searchPage: {
    page: 1,
    per_page: 10,
    results: [],
    total_count: 0,
  },
}

export const searchReducer = (
  state: SearchStore = initState,
  action: RootAction
): SearchStore => {
  if (action.type === "search/set_suggestion_article") {
    return {
      ...state,
      suggestion: action.payload,
    }
  }
  if (action.type === "search/set_keyWords_article") {
    return {
      ...state,
      keyWords: action.payload,
    }
  }
  if (action.type === "search/set_Page_article") {
    return {
      ...state,
      searchPage: action.payload,
    }
  }
  return state
}
