import http from './axios'
const userToken = localStorage.getItem('user')
const headers = { Authorization: `Bearer ${userToken}` }
export const login = data => http.post('/login', data)
export const signup = data => http.post('/signup', data)
export const swap = data => http.post('/swap', data)
export const withdraw = data => http.post('/withdraw', data)
export const withdrawMinimum = coin => http.get(`/withdraw/minimum/${coin}`)

export const swapVerify = data => http.post('/swap/verify', data)
export const addMerchant = data =>
    http.post('/custodian/minter', data, {
        headers: headers
    })
export const addMerchantLimit = data =>
    http.post('/custodian/limit', data, {
        headers: headers
    })

export const getMerchant = (coin, network = 'ETH') =>
    http.get(`/custodian/merchants/${coin}/${network}`, {
        headers: headers
    })

export const getSwapHistory = wallet =>
    http.get(`/history/${wallet}`, {
        headers: headers
    })
export const getMerchantLimit = (coin, wallet, network = 'ETH') =>
    http.get(`/custodian/limit/${coin}/${wallet}/${network}`, {
        headers: headers
    })
export const depositstatus = txId => http.get(`/depositstatus/${txId}`)
export const getWithdraw = (network = 'ETH') => http.get(`/withdraw/${network}`)
export const getSwap = (network = 'ETH') => http.get(`/swap/${network}`)
export const getInfo = (network = 'ETH') =>
    http.get(`/custodian/coins/${network}`, {
        headers: headers
    })
