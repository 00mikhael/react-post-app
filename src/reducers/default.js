import {
    SHOW_AUTH,
    CURRENT_POSTS,
    UPDATE_POST_CURRENT_POSTS,
    DELETE_POST_CURRENT_POSTS
} from '../actions/type'

const initialState = { showAuth: false, isSetPosts: false, currentPosts: null }

const defaultReducer = (defaultState = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SHOW_AUTH:
            return { ...defaultState, showAuth: payload.showAuth }
        case CURRENT_POSTS:
            return {
                ...defaultState,
                isSetPosts: payload.isSetPosts,
                currentPosts: payload.currentPosts
            }
        case UPDATE_POST_CURRENT_POSTS:
            if (defaultState.currentPosts) {
                let posts = defaultState.currentPosts.map(post => {
                    if (post._id === payload?.id) {
                        return {
                            ...post,
                            ...payload.post
                        }
                    } else {
                        return post
                    }
                })
                return { ...defaultState, currentPosts: posts }
            } else {
                return defaultState
            }
        case DELETE_POST_CURRENT_POSTS:
            if (defaultState.currentPosts) {
                let posts = defaultState.currentPosts.filter(({ _id }) => {
                    return _id !== payload.id
                })
                return { ...defaultState, currentPosts: posts }
            } else {
                return defaultState
            }
        default:
            return defaultState
    }
}

export default defaultReducer
