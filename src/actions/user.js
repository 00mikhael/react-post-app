import {
    REGISTER,
    LOGIN,
    LOGOUT,
    REFRESH_TOKEN,
    REFRESH_USER,
    RETRIEVE_USER,
    UPDATE_USER,
    DELETE_USER
} from './type'
import UserService from '../services/userService'

export const register = data => async dispatch => {
    try {
        const res = await UserService.register(data)
        dispatch({
            type: REGISTER,
            payload: res.data
        })

        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const login = data => async dispatch => {
    try {
        const res = await UserService.login(data)
        dispatch({
            type: LOGIN,
            payload: res.data
        })

        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const logout = id => async dispatch => {
    try {
        const res = await UserService.logout(id)
        dispatch({
            type: LOGOUT,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const refreshUser = () => dispatch => {
    dispatch({
        type: REFRESH_USER
    })
}

export const refreshToken = () => async dispatch => {
    try {
        const res = await UserService.refreshToken()

        dispatch({
            type: REFRESH_TOKEN,
            payload: res.data
        })

        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const retrieveUser = () => async dispatch => {
    try {
        const res = await UserService.getUser()

        dispatch({
            type: RETRIEVE_USER,
            payload: res.data
        })
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const updateUser = (id, update) => async dispatch => {
    try {
        const res = await UserService.updateUserById(id, update)

        dispatch({
            type: UPDATE_USER,
            payload: res.data
        })
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const deleteUser = id => async dispatch => {
    try {
        const res = await UserService.removeUserById(id)

        dispatch({
            type: DELETE_USER,
            payload: res.data
        })
        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err)
    }
}
