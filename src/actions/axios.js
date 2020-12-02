import axios from 'axios'

export default axios.create({
    baseURL: 'https://knit.lightrains.com/api',
    //baseURL: 'https://8d12bf294096.ngrok.io/api',
    headers: {
        'Content-type': 'application/json'
    }
})
