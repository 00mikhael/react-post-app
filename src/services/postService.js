import http from '../http'

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzZjllOTE0MmFlYjI1NmRiMmMzMzYiLCJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2MjM0OTI2OTYsImV4cCI6MTYyMzQ5NjI5Nn0.CT6I56Q697HSiwE_YZpLHQEw4YLaDocnak4xx2xOSqk'

export const add = data => {
    return http.post('/api/posts', data, {
        headers: {
            'x-access-token': token
        }
    })
}

export const getAll = () => {
    return http.get('/api/posts')
}

export const getById = id => {
    return http.get(`/api/posts/${id}`)
}

export const updateById = (id, data) => {
    return http.put(`/api/posts/${id}`, data, {
        headers: {
            'x-access-token': token
        }
    })
}

export const removeById = id => {
    return http.delete(`/api/posts/${id}`, {
        headers: {
            'x-access-token': token
        }
    })
}

export const removeAllByUserId = userId => {
    return http.delete(`/api/posts/user/${userId}`, {
        headers: {
            'x-access-token': token
        }
    })
}

export const find = query => {
    return http.get(`/api/posts?title=${query}`)
}
