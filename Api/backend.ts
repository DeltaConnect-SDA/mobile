import axios from "axios";

export const publicAPI = axios.create({
    baseURL: 'https://deltaconnect.morph.my.id/',
    timeout: 30000
})

export const privateAPI = axios.create({
    baseURL: 'https://deltaconnect.morph.my.id/',
    timeout: 30000
})

export const authAPI = axios.create({
    baseURL: 'https://deltaconnect.morph.my.id/v1/auth/',
    timeout: 30000
})
