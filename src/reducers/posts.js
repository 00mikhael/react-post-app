import {
    ADD_POST,
    RETRIEVE_POSTS,
    REFRESH_POSTS,
    UPDATE_POST,
    DELETE_POST,
    DELETE_POSTS_USER,
    FILTER_POSTS
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
        case FILTER_POSTS:
            if (payload.filter && payload.posts) {
                return payload.posts.filter(post => {
                    return post.title
                        .toLowerCase()
                        .includes(payload.filter.toLowerCase())
                })
            } else {
                return posts
            }
        case REFRESH_POSTS:
            if (payload && payload.id) {
                const postsRefresh = posts.map(post => {
                    if (post._id === payload.id) {
                        return { ...post, ...payload.update }
                    } else {
                        return post
                    }
                })
                return postsRefresh
            } else if (payload.posts) {
                return payload.posts
            } else {
                return posts
            }
        case UPDATE_POST:
            return posts.map(post => {
                if (post._id === (payload?.post?._id || payload?.id)) {
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
                return _id !== (payload?.post?._id || payload.id)
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
