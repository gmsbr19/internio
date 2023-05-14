import { IUser } from './types';
import { Api } from "../../services/api"

export function setUserLocalStorage(user: IUser | null) {
    localStorage.setItem('u', JSON.stringify(user))
}

export function getUserLocalStorage() {
    const json = localStorage.getItem('u')
    if(!json) return null
    return JSON.parse(json) ?? null
}

export async function LoginRequest (email: string, password: string){
    try {
        const request = await Api.post('/candidates/login', {email, password})

        return request.data
    } catch (error) {
        return null
    }
}

export async function CompanyLoginRequest (email: string, password: string){
    try {
        const request = await Api.post('/companies/login', {email, password})

        return request.data
    } catch (error) {
        return null
    }
}