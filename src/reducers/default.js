import { SHOW_AUTH } from '../actions/type'


const defaultReducer = (showAuth = false, action) => {
    const { type, payload } = action

    switch (type) {
        case SHOW_AUTH:
            return { showAuth: payload }
        default:
            return showAuth
    }
}

export default defaultReducer
