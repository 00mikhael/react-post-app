import { SHOW_AUTH, CURRENT_POSTS } from '../actions/type'

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
        default:
            return defaultState
    }
}

export default defaultReducer
