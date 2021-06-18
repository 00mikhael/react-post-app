import http from '../http'

export const add = data => {
    return http().post('/api/posts', data)
}

export const getAll = async () => {
    return http().get('/api/posts')
}

export const getById = id => {
    return http().get(`/api/posts/${id}`)
}

export const getAllByUserId = userId => {
    return http().get(`/api/posts/user/${userId}`)
}

export const updateById = (id, data) => {
    return http().put(`/api/posts/${id}`, data)
}

export const removeById = id => {
    return http().delete(`/api/posts/${id}`)
}

export const removeAllByUserId = userId => {
    return http().delete(`/api/posts/user/${userId}`)
}

export const find = query => {
    return http().get(`/api/posts?title=${query}`)
}

const PostService = {
    add,
    getAll,
    getAllByUserId,
    getById,
    updateById,
    removeById,
    removeAllByUserId,
    find
}

export default PostService
