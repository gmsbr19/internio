import FormRow from '../ui/FormRow'
import { ICandidate } from '../../context/AuthProvider/types'
import InputMask from 'react-input-mask'
import { Api } from '../../services/api'
import { toast } from 'react-toastify'
import { useState } from 'react'
import Spinner from '../ui/Spinner'

type ProfileForm = {
	pf: ICandidate['data'] | undefined
	handleProfileChange: (field: keyof ICandidate['data'], value: string | boolean) => void
	candidateId: number
	getCandidate: (id?: number) => void
}

const ProfileForm = ({ pf, handleProfileChange, candidateId, getCandidate }: ProfileForm) => {
	const [difPass, setDifPass] = useState<boolean>(false)
	const [err, setErr] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const submitUpdate = () => {
		setDifPass(false)
		setLoading(true)
		try {
			if (pf)
				Api.put(`/candidateInfo/${candidateId}`, {
					name: pf.name,
					email: pf.email,
					phone: pf.phone?.toString().replace(/\D/g, ''),
					cpf: pf.cpf?.replace(/\D/g, '')
				})
					.then((res) => {
						console.log(res)
						if (res.status === 200) {
							toast(res.data)
							getCandidate()
						}
						setLoading(false)
					})
					.catch((err) => {
						console.log(err)
						setLoading(false)
						setDifPass(true)
						setErr(err.response.data)
					})
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<div className="overflow-y-auto flex-grow p-4">
				<form className="flex flex-col gap-2 w-full">
					<FormRow>
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">Nome completo</span>
							</label>
							<input
								type="text"
								required
								autoComplete="name"
								onChange={(e) => handleProfileChange('name', e.target.value)}
								value={
									pf?.name &&
									pf.name
										.toLowerCase()
										.split(' ')
										.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(' ')
								}
								className="input input-bordered w-full"
							/>
						</div>
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">E-mail</span>
							</label>
							<input
								type="email"
								onChange={(e) => handleProfileChange('email', e.target.value)}
								value={pf?.email}
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
								onChange={(e) => handleProfileChange('phone', e.target.value)}
								value={pf?.phone == 0 ? '' : pf?.phone}
								required
								autoComplete="phone"
								className="input input-bordered w-full"
							/>
						</div>
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">CPF</span>
							</label>
							<InputMask
								type="text"
								mask="999.999.999-99"
								onChange={(e) => handleProfileChange('cpf', e.target.value)}
								value={pf?.cpf}
								required
								autoComplete="cpf"
								className="input input-bordered w-full"
							/>
						</div>
					</FormRow>
				</form>
			</div>
			<div className="card-actions flex items-center justify-end gap-5 pr-5 pb-5">
				{difPass && <span className="text-red-600">{err}</span>}
				<button className="btn btn-primary" onClick={() => submitUpdate()} type="submit">
					{loading ? <Spinner /> : 'Salvar'}
				</button>
			</div>
		</>
	)
}

export default ProfileForm
