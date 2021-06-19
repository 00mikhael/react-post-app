import { combineReducers } from 'redux'
import defaults from './default'
import posts from './posts'
import user from './user'

export default combineReducers({
    defaults,
    posts,
    user
})
