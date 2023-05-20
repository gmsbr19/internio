import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider/useAuth";
import {useEffect} from 'react'

const ProtectedCompanyLayout = ({children}: {children: JSX.Element}) => {
    const auth = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.email || auth.type === 'candidate') {
            navigate('/')
        }
    })

    if (!auth.email || auth.type === 'candidate') {
        return null
    }


    return children;
}
 
export default ProtectedCompanyLayout;