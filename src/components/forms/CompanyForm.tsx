import FormRow from '../ui/FormRow'
import { Company } from '../../context/AuthProvider/types'
import InputMask from 'react-input-mask'
import { Api } from '../../services/api'
import { toast } from 'react-toastify'
import { useState } from 'react'
import Spinner from '../ui/Spinner'

type CompanyForm = {
	pf: Company | undefined
	handleProfileChange: (field: keyof Company, value: string | boolean) => void
	companyId: number
	getCompany: (id?: number) => void
}

const CompanyForm = ({ pf, handleProfileChange, companyId, getCompany }: CompanyForm) => {
	const [difPass, setDifPass] = useState<boolean>(false)
	const [err, setErr] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const submitUpdate = () => {
		setDifPass(false)
		setLoading(true)
		try {
			if (pf)
				Api.put(`/companies/${companyId}`, {
                    ...pf,
					phone: pf.representative_phone?.toString().replace(/\D/g, ''),
					cpf: pf.cnpj?.replace(/\D/g, '')
				} as Company)
					.then((res) => {
						console.log(res)
						if (res.status === 200) {
							toast(res.data)
							getCompany()
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
								<span className="label-text">Nome oficial</span>
							</label>
							<input
								type="text"
								required
								autoComplete="name"
								onChange={(e) => handleProfileChange('official_name', e.target.value)}
								value={
									pf?.official_name &&
									pf.official_name
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
								<span className="label-text">E-mail do representante</span>
							</label>
							<input
								type="email"
								onChange={(e) => handleProfileChange('representative_email', e.target.value)}
								value={pf?.representative_email}
								required
								autoComplete="username"
								className="input input-bordered w-full"
							/>
						</div>
					</FormRow>
					<FormRow>
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">Telefone do representante</span>
							</label>
							<InputMask
								type="text"
								mask="(99) 99999-9999"
								onChange={(e) => handleProfileChange('representative_phone', e.target.value)}
								value={pf?.representative_phone == 0 ? '' : pf?.representative_phone}
								required
								autoComplete="phone"
								className="input input-bordered w-full"
							/>
						</div>
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">CNPJ</span>
							</label>
							<InputMask
								type="text"
								mask="99.999.999-99/9999"
								onChange={(e) => handleProfileChange('cnpj', e.target.value)}
								value={pf?.cnpj}
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

export default CompanyForm
