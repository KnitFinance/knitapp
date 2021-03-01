import axios from 'axios'

export default axios.create({
    baseURL: 'https://knit.lightrains.com/api',
    //baseURL: 'https://3600e21ad78f.ngrok.io',
    headers: {
        'Content-type': 'application/json'
    }
})
