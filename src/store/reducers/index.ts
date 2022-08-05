import { combineReducers } from 'redux'
import LoginReducer from './login'
import { profileReducer } from './profile'
const reducers = combineReducers({
    login: LoginReducer,
    profile: profileReducer
})

export default reducers