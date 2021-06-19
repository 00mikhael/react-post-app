import { SHOW_AUTH } from './type'

export const showAuth = data => async dispatch => {
    dispatch({
        type: SHOW_AUTH,
        payload: data
    })
}
