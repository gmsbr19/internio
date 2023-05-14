import {createContext, useEffect, useState} from "react";
import { IAuthProvider, IContext, IUser, ICandidate, ICompanyData } from "./types";
import { CompanyLoginRequest, getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }:IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>()

    useEffect(() => {
        const user = getUserLocalStorage()

        if (user) {
            setUser(user)
        }
    }, [])

    async function authenticate (email: string, password: string, type: string){
        let response: {token?: string, data?: ICandidate | ICompanyData} = {token: undefined, data: undefined}
        if(type === "company"){
            response = await CompanyLoginRequest(email, password)
        } else if (type === "candidate"){
            response = await LoginRequest(email, password)
        }
        
        if(response){
            const payload = {token: response.token, email, type, data: response.data}
            if(payload){
                setUser({token: payload.token, email: payload.email, type: payload.type, id: payload.data?.id, data: payload?.data})
                setUserLocalStorage({token: payload.token, email: payload.email, type: payload.type, id: payload.data?.id, data: payload?.data})
            }
        }
    }

    function logout () {
        setUser(null)
        setUserLocalStorage(null)
    }

    return (
        <AuthContext.Provider value={{...user, authenticate, logout}}>
            {children}
        </AuthContext.Provider>
    )
}