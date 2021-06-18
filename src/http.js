import axios from 'axios'
import store from './store'

let serverUrl =
    process.env.SERVER_URL || 'https://post-app-server.herokuapp.com'
const http = () => {
    let token = store.getState().user?.accessToken

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    return axios.create({
        baseURL: serverUrl
    })
}

export default http
