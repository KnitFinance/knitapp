import axios from 'axios'

export default axios.create({
    baseURL: 'https://knit.lightrains.com/api',
    //baseURL: 'https://33ca6390453f.ngrok.io/api',
    headers: {
        'Content-type': 'application/json'
    }
})
