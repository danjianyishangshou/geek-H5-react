import { ApiResponse, ArticleDataPage } from "@/types/data"
import {
  RootAction,
  RootThunkAction,
  SearchKeyWordsAction,
} from "@/types/store"
import { setKeyWords } from "@/utils/localKeyWords"
import http from "@/utils/request"

/**
 * 获取关键字搜素的结果
 * @param q
 * @returns
 */
export const getSearchSuggestion = (q: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<ApiResponse<{ options: string[] }>>(
      "/suggestion",
      {
        params: { q },
      }
    )
    dispatch({
      type: "search/set_suggestion_article",
      payload: res.data.data.options,
    } as RootAction)
  }
}

export const setSearchKeyWords = (keyWord: string): RootThunkAction => {
  return (dispatch, getState) => {
    const keyWords = [keyWord, ...getState().search.keyWords]
    const set = new Set(keyWords)
    // 注意ts不能在数组中解构set对象
    const newKeyWords = Array.from(set)
    // 保证最多十个历史记录
    if (newKeyWords.length > 10) {
      newKeyWords.pop()
    }
    dispatch({
      type: "search/set_keyWords_article",
      payload: newKeyWords,
    } as SearchKeyWordsAction)

    setKeyWords(newKeyWords)
  }
}

export function getSearchResult(
  page: number = 1,
  keyword: string
): RootThunkAction {
  return async (dispatch, getState) => {
    const res = await http.get<ApiResponse<ArticleDataPage>>(`/search`, {
      params: {
        page,
        per_page: 10,
        q: keyword,
      },
    })
    const searchPage = getState().search.searchPage
    dispatch({
      type: "search/set_Page_article",
      payload: {
        page: res.data.data.page,
        per_page: searchPage.per_page,
        total_count: res.data.data.total_count,
        results: [...searchPage.results, ...res.data.data.results],
      },
    } as RootAction)
  }
}
