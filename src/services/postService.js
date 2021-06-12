import http from '../http'

const token =
    process.env.TOKEN ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM0ZjY1YmEzMTNkYzAwMjIzNWIxYzUiLCJ1c2VybmFtZSI6IkpvaG4iLCJpYXQiOjE2MjM1MjA4NzEsImV4cCI6MzYwMDE2MjM1MjA4NzF9.cof3jSzHnI4bo-5GtutVT6QF7VeJsMjKcHhTz6XzT-M'

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
