import { SHOW_AUTH, CURRENT_POSTS } from './type'

export const showAuth = data => async dispatch => {
    dispatch({
        type: SHOW_AUTH,
        payload: { showAuth: data }
    })
}

export const currentPosts = data => async dispatch => {
    dispatch({
        type: CURRENT_POSTS,
        payload: {
            currentPosts: data.currentPosts,
            isSetPosts: data.isSetPosts
        }
    })
}
