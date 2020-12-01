import http from './axios'

export const login = data => http.post('/admin/login', data)
export const signup = data => http.post('/admin/signup', data)
export const swap = data => http.post('/swap', data)
export const withdraw = data => http.post('/withdraw', data)

export const getWithdraw = () => http.get('withdraw')
export const getSwap = () => http.get('swap')
