import { combineReducers } from "redux"
import { LoginReducer } from "./login"
import { profileReducer } from "./profile"
import { channelsReducer } from "./channels"
const reducers = combineReducers({
  login: LoginReducer,
  profile: profileReducer,
  channels: channelsReducer,
})

export default reducers
