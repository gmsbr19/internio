import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthProvider/useAuth';

const Logout = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        auth.logout()
        navigate('/login')
    })

    return null
}
 
export default Logout;