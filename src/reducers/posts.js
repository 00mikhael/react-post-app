import {
    ADD_POST,
    RETRIEVE_POSTS,
    REFRESH_POSTS,
    UPDATE_POST,
    DELETE_POST,
    DELETE_POSTS_USER
} from '../actions/type'

const initialState = null

const postReducer = (posts = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case ADD_POST:
            if (posts) {
                return [payload, ...posts]
            }
            return [payload]
        case RETRIEVE_POSTS:
            return payload
        case REFRESH_POSTS:
            return posts
        case UPDATE_POST:
            return posts.map(post => {
                if (post._id === payload.post._id) {
                    return {
                        ...post,
                        ...payload.post
                    }
                } else {
                    return post
                }
            })
        case DELETE_POST:
            return posts.filter(({ _id }) => {
                return _id !== payload.id
            })
        case DELETE_POSTS_USER:
            return posts.filter(({ creator_id }) => {
                return creator_id !== payload.userId
            })
        default:
            return posts
    }
}

export default postReducer
