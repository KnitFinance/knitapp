import axios from 'axios'

export default axios.create({
    //baseURL: 'https://knit.lightrains.com/api',
    baseURL: 'https://1f5b040e983f.ngrok.io/api',
    headers: {
        'Content-type': 'application/json'
    }
})
