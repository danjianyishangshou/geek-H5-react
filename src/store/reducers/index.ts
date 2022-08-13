import { combineReducers } from "redux"
import { LoginReducer } from "./login"
import { profileReducer } from "./profile"
import { channelsReducer } from "./channels"
import { articleReducer } from "./article"
import { searchReducer } from "./search"
const reducers = combineReducers({
  login: LoginReducer,
  profile: profileReducer,
  channels: channelsReducer,
  articles: articleReducer,
  search: searchReducer,
})

export default reducers
