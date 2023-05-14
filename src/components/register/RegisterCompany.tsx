import { useState } from 'react'
import InputMask from 'react-input-mask'
import FormRow from '../ui/FormRow'
import { Api } from '../../services/api'
import Spinner from '../ui/Spinner'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

const RegisterCompany = () => {
    const [name, setName] = useState<string>('')
    const [tradingName, setTradingName] = useState<string>('')
    const [cnpj, setCnpj] = useState<string>('')
    const [cep, setCep] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [state, setState] = useState<string>('')
    const [representativeName, setRepresentativeName] = useState<string>('')
    const [representativeEmail, setRepresentativeEmail] = useState<string>('')
    const [representativePhone, setRepresentativePhone] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [difPass, setDifPass] = useState<boolean>(false)
    const [err, setErr] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    
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
                Api.post('/companies', {official_name: name, trading_name: tradingName, cnpj: cnpj.replace(/\D/g, ''), cep: cep.replace(/\D/g, ''), city, address, state, representative_name: representativeName, representative_email: representativeEmail, representative_phone: representativePhone.replace(/\D/g, ''), password})
                .then(res => {
                    console.log(res)
                    if (res.status === 200){
                        navigate('/login')
                        toast(res.data)
                    } 
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                    if(err){
                        setDifPass(true)
                        setErr(err.response.data)
                    }
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
						<span className="label-text">Nome fantasia</span>
					</label>
					<input
						type="text"
                        onChange={e => setTradingName(e.target.value)}
                        value={tradingName}
						required
						autoComplete="username"
						className="input input-bordered w-full"
					/>
				</div>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">CNPJ</span>
					</label>
					<InputMask
                        type="text"
                        mask="99.999.999/9999-99"
                        onChange={e => setCnpj(e.target.value)}
                        value={cnpj}
						required
						autoComplete="cnpj"
						className="input input-bordered w-full"/>
				</div>
            </FormRow>
            <FormRow>
				<div className="form-control w-full grow">
					<label className="label">
						<span className="label-text">CEP</span>
					</label>
                    <InputMask
                        type="text"
                        mask="99999-999"
                        onChange={e => setCep(e.target.value)}
                        value={cep}
						required
						autoComplete="cep"
						className="input input-bordered w-full"/>
				</div>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Endereço</span>
					</label>
					<input
                        type="text"
                        onChange={e => setAddress(e.target.value)}
                        value={address}
						required
						autoComplete="address"
						className="input input-bordered w-full"/>
				</div>
            </FormRow>
            <FormRow>
                <div className="form-control w-full">
					<label className="label">
						<span className="label-text">Nome do representante</span>
					</label>
					<input
                        type="text"
                        onChange={e => setRepresentativeName(e.target.value)}
                        value={representativeName}
						required
						autoComplete="name"
						className="input input-bordered w-full"/>
				</div>
                <div className="form-control w-full">
					<label className="label">
						<span className="label-text">E-mail do representante</span>
					</label>
					<input
                        type="email"
                        onChange={e => setRepresentativeEmail(e.target.value)}
                        value={representativeEmail}
						required
						autoComplete="email"
						className="input input-bordered w-full"/>
				</div>
                <div className="form-control w-full">
					<label className="label">
						<span className="label-text">Telefone</span>
					</label>
                    <InputMask
                        type="text"
                        mask="(99) 99999-9999"
                        onChange={e => setRepresentativePhone(e.target.value)}
                        value={representativePhone}
						required
						autoComplete="phone"
						className="input input-bordered w-full"/>
				</div>
            </FormRow>
            <FormRow>
                <div className="form-control w-full">
					<label className="label">
						<span className="label-text">Cidade</span>
					</label>
					<input
                        type="text"
                        onChange={e => setCity(e.target.value)}
                        value={city}
						required
						autoComplete="city"
						className="input input-bordered w-full"/>
				</div>
                <div className="form-control w-full">
					<label className="label">
						<span className="label-text">Estado</span>
					</label>
					<input
                        type="text"
                        onChange={e => setState(e.target.value)}
                        value={state}
						required
						autoComplete="address"
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

export default RegisterCompany
