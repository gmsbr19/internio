import { useAuth } from "../context/AuthProvider/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'

const ProtectedLayout = ({children}: {children: JSX.Element}) => {
    const auth = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.email || auth.type === 'company') {
            navigate('/')
        }
    })

    if (!auth.email || auth.type === 'company') {
        return null
    }


    return children;
}
 
export default ProtectedLayout;