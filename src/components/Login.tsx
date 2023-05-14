import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider/useAuth'
import LoginForm from './ui/LoginForm'

const Login = () => {
	const auth = useAuth()
	const navigate = useNavigate()
    const [loginMalSucedido, setLoginMalSucedido] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		if (auth.email) {
			navigate('/profile')
		}
	})

	async function onFinish(event: React.FormEvent<HTMLFormElement>, values: { email: string; password: string }) {
        event.preventDefault()
		try {
            setLoading(true)
            auth.authenticate(values.email, values.password, 'candidate')
            .then(() => {
                if(!auth.email){
                    setLoading(false)
                    console.log("Login mal sucedido")
                    setLoginMalSucedido(true)
                } else {
                    navigate('/profile')
                }
            })
		} catch (error) {
            console.log(error)
            setLoading(false)
			console.log('Invalid email or password')
		}
	}

	return (
		<div>
            
			<LoginForm loginMalSucedido={loginMalSucedido} loading={loading} onFinish={onFinish}/>
		</div>
	)
}

export default Login
