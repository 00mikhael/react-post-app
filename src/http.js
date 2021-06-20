import axios from 'axios'
import store from './store'

// let serverUrl = 'https://post-app-server.herokuapp.com'
let serverUrl = 'http://localhost:3002'
const http = () => {
    let token = store.getState().user?.accessToken

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    let refreshToken = localStorage.getItem('refreshToken')

    return axios.create({
        baseURL: serverUrl,
        headers: { refreshToken }
    })
}

export default http
