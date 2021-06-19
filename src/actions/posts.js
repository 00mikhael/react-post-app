import {
    ADD_POST,
    RETRIEVE_POSTS,
    RETRIEVE_POST,
    REFRESH_POSTS,
    UPDATE_POST,
    DELETE_POST,
    DELETE_POSTS_USER
} from './type'
import PostService from '../services/postService'

export const addPost = post => async dispatch => {
    try {
        const res = await PostService.add(post)
        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const refreshPosts = () => dispatch => {
    dispatch({
        type: REFRESH_POSTS
    })
}

export const retrievePosts = () => async dispatch => {
    try {
        const res = await PostService.getAll()
        dispatch({
            type: RETRIEVE_POSTS,
            payload: res.data.posts
        })
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const retrievePostsByUserId = userId => async dispatch => {
    try {
        const res = await PostService.getAllByUserId(userId)
        dispatch({
            type: RETRIEVE_POSTS,
            payload: res.data.posts
        })
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const retrievePost = id => async dispatch => {
    try {
        const res = await PostService.getById(id)
        dispatch({
            type: RETRIEVE_POST,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const updatePost = (id, update) => async dispatch => {
    dispatch({
        type: REFRESH_POSTS,
        payload: { id, update }
    })

    try {
        const res = await PostService.updateById(id, update)

        dispatch({
            type: UPDATE_POST,
            payload: res.data
        })

        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const deletePost = id => async dispatch => {
    try {
        const res = await PostService.removeById(id)

        dispatch({
            type: DELETE_POST,
            payload: res.data
        })
        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const deletePostsByUser = userId => async dispatch => {
    try {
        const res = await PostService.removeAllByUserId(userId)

        dispatch({
            type: DELETE_POSTS_USER,
            payload: res.data
        })
        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const findPosts = query => async dispatch => {
    try {
        const res = await PostService.find(query)

        dispatch({
            type: RETRIEVE_POSTS,
            payload: res.data.posts
        })
        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err)
    }
}
