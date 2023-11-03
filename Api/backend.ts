import axios from "axios";

export const publicAPI = axios.create({
    baseURL: process.env.PUBLIC_API_URL,
    timeout: 30000
})

export const authAPI = axios.create({
    baseURL: process.env.AUTH_API_URL,
    timeout: 30000
})

export const mapAPI = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
    timeout: 30000,
    params: {
        key: process.env.GOOGLE_MAPS_API_KEY
    }
})