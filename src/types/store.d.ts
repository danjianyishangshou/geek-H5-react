//. 主要配置与仓库redux有关的ts类型
import store from "../store"
import { ThunkAction } from "redux-thunk"
import {
  ArticleDataPage,
  ArticleItemData,
  ArticleItemDataPage,
  Channel,
  Profile,
  UserInfo,
} from "@/types/data"

// 所有状态的类型
export type RootStore = ReturnType<typeof store.getState>

export interface TokenAction {
  type: "login/set_tokenInfo"
  payload: TokenInfo
}
export interface LoginAction {
  type: "login/login"
}
export interface ProfileAction {
  type: "profile/set_profile"
  payload: Profile
}
export interface ProfileUserAction {
  type: "profile/set_userInfo"
  payload: UserInfo
}
export interface ChannelsAction {
  type: "channels/set_channels"
  payload: Channel[]
}
export interface ChannelsAllAction {
  type: "channels/set_all_channels"
  payload: Channel[]
}
export interface ChannelsSelectedAction {
  type: "channels/set_selectedActive"
  payload: number
}
export interface ChannelArticle {
  type: "article/set_channel_article"
  payload: {
    channelId: number
    data: ArticleItemDataPage
  }
}

export interface SearchSuggestionArticle {
  type: "search/set_suggestion_article"
  payload: string[]
}

export interface SearchKeyWordsArticle {
  type: "search/set_keyWords_article"
  payload: string[]
}

export interface SearchPageArticle {
  type: "search/set_Page_article"
  payload: ArticleDataPage
}
// 汇总与action相关的联合类型
export type RootAction =
  | LoginAction
  | TokenAction
  | ProfileAction
  | ProfileUserAction
  | ChannelsAction
  | ChannelsAllAction
  | ChannelsSelectedAction
  | ChannelArticle
  | SearchSuggestionArticle
  | SearchKeyWordsArticle
  | SearchPageArticle

// 所有thunkAction的类型
export type RootThunkAction = ThunkAction<void, RootStore, unknown, RootAction>
