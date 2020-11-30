import http from './axios'

export const login = data => http.post('/user/login', data)
export const swap = data => http.post('/swap', data)
