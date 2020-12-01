import axios from 'axios'

export default axios.create({
    baseURL: 'https://knit.lightrains.com/api',
    headers: {
        'Content-type': 'application/json'
    }
})
