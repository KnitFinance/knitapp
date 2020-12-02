import axios from 'axios'

export default axios.create({
    baseURL: 'https://knit.lightrains.com/api',
    //baseURL: 'https://9a99885a646d.ngrok.io/api',
    headers: {
        'Content-type': 'application/json'
    }
})
