import axios from 'axios'

export default axios.create({
    baseURL: 'https://knit.lightrains.com/api',
    //baseURL: 'https://62d9a6f01dcd.ngrok.io/api',
    headers: {
        'Content-type': 'application/json'
    }
})
