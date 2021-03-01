import http from './axios'
const userToken = localStorage.getItem('user')
const headers = { Authorization: `Bearer ${userToken}` }
export const login = data => http.post('/login', data)
export const signup = data => http.post('/signup', data)
export const swap = data => http.post('/swap', data)
export const withdraw = data => http.post('/withdraw', data)
export const depositstatus = txId => http.get(`/depositstatus/${txId}`)
export const getWithdraw = () => http.get('/withdraw')
export const getSwap = () => http.get('/swap')
export const getInfo = () => http.get('/coins')
export const addMerchant = data =>
    http.post('/custodian/minter', data, {
        headers: headers
    })
export const addMerchantLimit = data => http.post('/custodian/limit', data)
export const getMerchant = () =>
    http.get('/custodian/merchants', {
        headers: headers
    })
export const getMerchantLimit = (coin, wallet) =>
    http.get(`/custodian/limit/${coin}/${wallet}`, {
        headers: headers
    })
