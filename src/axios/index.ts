import axios from "axios";

export const AUTH_URL = 'https://auth-api-pro.herokuapp.com/auth';

const auth = axios.create({
    withCredentials: true,
    baseURL: AUTH_URL
})

auth.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    }
})

export default auth;