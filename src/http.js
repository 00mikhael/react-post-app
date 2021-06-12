import axios from 'axios'

const http = (_ =>
    axios.create({
        baseURL: 'https://post-app-server.herokuapp.com',
        Headers: {
            'Content-Type': 'application/json'
        }
    }))()

export default http
