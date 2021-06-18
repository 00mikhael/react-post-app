import '@fontsource/work-sans'

import axios from 'axios'
import store from './store'

const http = () => {
    let token = store.getState().user?.accessToken

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    return axios.create()
}

export default http
