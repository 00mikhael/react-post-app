import http from '../http'
// 60c1079c59a5b82c65ebe729
const userId = '60c4f65ba313dc002235b1c5',
    token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM0ZjY1YmEzMTNkYzAwMjIzNWIxYzUiLCJ1c2VybmFtZSI6IkpvaG4iLCJpYXQiOjE2MjM1MjA4NzEsImV4cCI6MzYwMDE2MjM1MjA4NzF9.cof3jSzHnI4bo-5GtutVT6QF7VeJsMjKcHhTz6XzT-M'

export const register = data => {
    return http.post('/api/users/register', data)
}

export const login = data => {
    return http.post('/api/users/login', data)
}

export const getUser = id => {
    return http.get(`/api/users/${userId}`, {
        headers: {
            'x-access-token': token
        }
    })
}

export const updateUserById = (id, data) => {
    return http.put(`/api/users/${id}`, data, {
        headers: {
            'x-access-token': token
        }
    })
}
