import http from '../http'

export const register = async data => {
    return http().post('/api/users/register', data)
}

export const login = async data => {
    return http().post('/api/users/login', data)
}

export const logout = async () => {
    return http().post('/api/users/logout')
}

export const refreshToken = async () => {
    return await http().post('/api/users/refreshToken')
}

export const getUser = async () => {
    return http().get(`/api/users/user`)
}

export const updateUserById = async (id, data) => {
    return await http().put(`/api/users/${id}`, data)
}

export const removeUserById = async id => {
    return http().delete(`/api/users/${id}`)
}

export const forgotPassword = async data => {
    return http().post(`/api/users/forgotPassword`, data)
}

export const cancelPasswordReset = async id => {
    return http().post(`/api/users/cancelPasswordReset?id=${id}`)
}

export const resetPassword = async (resetToken, id, data) => {
    return http().post(
        `/api/users/resetPassword?resetToken=${resetToken}&id=${id}`,
        data
    )
}

const UserService = {
    register,
    login,
    logout,
    refreshToken,
    getUser,
    updateUserById,
    removeUserById,
    forgotPassword,
    cancelPasswordReset,
    resetPassword
}

export default UserService
