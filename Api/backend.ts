import axios from "axios";

export const publicAPI = axios.create({
    baseURL: 'https://porto.morph.my.id/',
    timeout: 30000
})

export const privateAPI = axios.create({
    baseURL: 'https://porto.morph.my.id/',
    timeout: 30000
})

export const authAPI = axios.create({
    baseURL: 'https://porto.morph.my.id/v1/auth/',
    timeout: 30000
})

export const mapAPI = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
    timeout: 30000,
    params: {
        key: 'AIzaSyAdpjwXdSXfUZOb6ztlzGhpBJqcphZQZYw'
    }
})