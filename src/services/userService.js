import http from '../http'
// 60c1079c59a5b82c65ebe729
const userId = process.env.USER_ID || '60c3f9e9142aeb256db2c336',
    token =
        process.env.TOKEN ||
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzZjllOTE0MmFlYjI1NmRiMmMzMzYiLCJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2MjM0OTI2OTYsImV4cCI6MTYyMzQ5NjI5Nn0.CT6I56Q697HSiwE_YZpLHQEw4YLaDocnak4xx2xOSqk'

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
