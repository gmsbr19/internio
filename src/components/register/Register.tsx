import { useState } from 'react'
import InputMask from 'react-input-mask'
import FormRow from '../ui/FormRow'
import { Api } from '../../services/api'
import Spinner from '../ui/Spinner'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useAuth } from '../../context/AuthProvider/useAuth'

const Register = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [cpf, setCpf] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [difPass, setDifPass] = useState<boolean>(false)
    const [err, setErr] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const auth = useAuth()
    
    const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(password !== confirmPassword){
            setErr('Senhas não coincidem')
            setDifPass(true)
        }
        else if(password.length < 8){
            setErr('Senha deve haver pelo menos 8 caracteres')
            setDifPass(true)
        } else {
            setDifPass(false)
            setLoading(true)
            try {
                Api.post('/candidates', {name, email, phone: phone.replace(/\D/g, ''), cpf: cpf.replace(/\D/g, ''), password})
                .then(res => {
                    console.log(res)
                    auth.authenticate(email, password, 'candidate')
                    if (res.status === 200){
                        navigate('/curriculum')
                        toast(res.data.message)
                    }
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                    setDifPass(true)
                    setErr(err.response.data)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

	return (
		<form className="flex flex-col gap-2 w-full" onSubmit={e => formSubmit(e)}>
            <FormRow>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Nome completo</span>
					</label>
					<input
						type="text"
						required
						autoComplete="name"
                        onChange={e => setName(e.target.value)}
                        value={name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
						className="input input-bordered w-full"
					/>
				</div>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">E-mail</span>
					</label>
					<input
						type="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
						required
						autoComplete="username"
						className="input input-bordered w-full"
					/>
				</div>
            </FormRow>
            <FormRow>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Telefone</span>
					</label>
                    <InputMask
                        type="text"
                        mask="(99) 99999-9999"
                        onChange={e => setPhone(e.target.value)}
                        value={phone}
						required
						autoComplete="phone"
						className="input input-bordered w-full"/>
				</div>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">CPF</span>
					</label>
					<InputMask
                        type="text"
                        mask="999.999.999-99"
                        onChange={e => setCpf(e.target.value)}
                        value={cpf}
						required
						autoComplete="cpf"
						className="input input-bordered w-full"/>
				</div>
            </FormRow>
            <FormRow>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Senha</span>
					</label>
					<input
						type="password"
						required
                        onChange={e => setPassword(e.target.value)}
                        value={password}
						autoComplete="new-password"
						className="input input-bordered w-full"
					/>
				</div>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Confirme sua senha</span>
					</label>
					<input
						type="password"
						required
                        autoComplete=''
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
						className="input input-bordered w-full"
					/>
				</div>
            </FormRow>

			<div className="card-actions flex items-center justify-end gap-5">
                {difPass && <span className='text-red-600'>{err}</span>}
				<button className="btn btn-primary" type="submit">
					{loading ? <Spinner /> : "Registrar"}
				</button>
			</div>
		</form>
	)
}

export default Register
