import axios from 'axios'

const http = (_ =>
    axios.create({
        baseURL: `http://localhost:3002`,
        Headers: {
            'Content-Type': 'application/json'
        }
    }))()

export default http
