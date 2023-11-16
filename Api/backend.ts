import axios from "axios";

export const publicAPI = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || "https://porto.morph.my.id/v1/",
    timeout: 30000
})

export const authAPI = axios.create({
    baseURL: process.env.EXPO_PUBLIC_AUTH_API_URL || "https://porto.morph.my.id/v1/auth",
    timeout: 30000
})

export const mapAPI = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
    timeout: 30000,
    params: {
        key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyAdpjwXdSXfUZOb6ztlzGhpBJqcphZQZYw"
    }
})