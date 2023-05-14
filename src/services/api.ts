import axios from 'axios'
import { getUserLocalStorage } from '../context/AuthProvider/util'

export const Api = axios.create({
    baseURL: "https://43e7-191-189-17-207.ngrok-free.app"
})

Api.interceptors.request.use(
    config => {
        const user = getUserLocalStorage()
        config.headers.Authorization = user?.token

        return config
    },
    error => {
        return Promise.reject(error)
    }
)