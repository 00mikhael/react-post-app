import axios from 'axios'

const http = (_ =>
    axios.create({
        baseURL: process.env.SERVER_URL,
        Headers: {
            'Content-Type': 'application/json'
        }
    }))()

export default http
