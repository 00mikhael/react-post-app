import {
    SHOW_AUTH,
    CURRENT_POSTS,
    UPDATE_POST_CURRENT_POSTS,
    DELETE_POST_CURRENT_POSTS
} from './type'

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

export const updatePostCurrentPosts = (id, update) => async dispatch => {
    dispatch({
        type: UPDATE_POST_CURRENT_POSTS,
        payload: { id, post: update }
    })
}

export const deletePostCurrentPosts = id => async dispatch => {
    dispatch({
        type: DELETE_POST_CURRENT_POSTS,
        payload: { id }
    })
}
