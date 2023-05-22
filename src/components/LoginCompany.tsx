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
			navigate('/company')
		}
	})

	async function onFinish(event: React.FormEvent<HTMLFormElement>, values: { email: string; password: string }) {
        event.preventDefault()
		try {
            setLoading(true)
            auth.authenticate(values.email, values.password, 'company')
            .then(() => {
                if(!auth.token){
                    setLoading(false)
                    setLoginMalSucedido(true)
                } else {
                    navigate('/company')
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
