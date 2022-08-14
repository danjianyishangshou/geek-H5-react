import { combineReducers } from "redux"
import { LoginReducer } from "./login"
import { profileReducer } from "./profile"
import { channelsReducer } from "./channels"
import { articleReducer } from "./article"
import { searchReducer } from "./search"
import { commentReducer } from "./comment"
const reducers = combineReducers({
  login: LoginReducer,
  profile: profileReducer,
  channels: channelsReducer,
  articles: articleReducer,
  search: searchReducer,
  comment: commentReducer,
})

export default reducers
