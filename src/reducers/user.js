import {
    REGISTER,
    LOGIN,
    LOGOUT,
    REFRESH_TOKEN,
    REFRESH_USER,
    RETRIEVE_USER,
    UPDATE_USER,
    DELETE_USER,
    RESET_PASSWORD_TOKEN_ID
} from '../actions/type'

const initialState = null

const userReducer = (user = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case REGISTER:
            return initialState
        case LOGIN:
            return payload
        case LOGOUT:
            return initialState
        case REFRESH_TOKEN:
            return {
                ...user,
                ...payload
            }
        case REFRESH_USER:
            if (payload) {
                return { ...user, ...payload }
            } else {
                return user
            }
        case RETRIEVE_USER:
            return { ...payload, ...user }
        case UPDATE_USER:
            return {
                ...payload.user,
                accessToken: user.accessToken,
                jwtExp: user.jwtExp
            }
        case DELETE_USER:
            return initialState
        case RESET_PASSWORD_TOKEN_ID:
            return { ...user, resetToken: payload.resetToken, id: payload.id }
        default:
            return user
    }
}

export default userReducer
