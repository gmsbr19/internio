import {createContext, useEffect, useState} from "react";
import { IAuthProvider, IContext, IUser, Company } from "./types";
import { CompanyLoginRequest, getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";
import { Candidate } from "../../types";

export type Res = {
    token?: string,
    data?: Candidate | Company
}

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }:IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>()

    useEffect(() => {
        const user = getUserLocalStorage()

        if (user) {
            setUser(user)
        }
    }, [])

    async function authenticate (email?: string, password?: string, type?: string): Promise<Res>{
        let response: Res = {token: undefined, data: undefined}
        if(type === "company"){
            response = await CompanyLoginRequest(email as string, password as string)
        } else if (type === "candidate"){
            response = await LoginRequest(email as string, password as string)
        }
        
        if(response){
            const payload = {token: response.token, email, type, data: response.data}
            if(payload){
                setUser({token: payload.token, email: payload.email, type: payload.type ?? '', id: payload.data?.id, data: payload?.data as Candidate | Company})
                setUserLocalStorage({token: payload.token, email: payload.email, type: payload.type ?? '', id: payload.data?.id, data: payload?.data as Candidate | Company})
            }
        }

        return response
    }

    function logout () {
        setUser(null)
        setUserLocalStorage(null)
    }

    return (
        <AuthContext.Provider value={{...user, authenticate, logout} as IContext}>
            {children}
        </AuthContext.Provider>
    )
}