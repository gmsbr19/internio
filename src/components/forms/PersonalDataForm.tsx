import FormRow from '../ui/FormRow'
import { ICandidate } from '../../context/AuthProvider/types'
import { PersonalData } from '../../types'
import InputMask from 'react-input-mask'

const estados = [
	'AC',
	'AL',
	'AP',
	'AM',
	'BA',
	'CE',
	'DF',
	'ES',
	'GO',
	'MA',
	'MT',
	'MS',
	'MG',
	'PA',
	'PB',
	'PR',
	'PE',
	'PI',
	'RJ',
	'RN',
	'RS',
	'RO',
	'RR',
	'SC',
	'SP',
	'SE',
	'TO'
]

type PersonalDataForm = {
	pd: ICandidate['data']['personal_data'] | undefined
	handlePersonalDataChange: (field: keyof PersonalData, value: string | boolean) => void
	setCurrentRoute: React.Dispatch<React.SetStateAction<string>>
}

const PersonalDataForm = ({ pd, handlePersonalDataChange, setCurrentRoute }: PersonalDataForm) => {
	return (
		<>
			<div className="overflow-y-auto flex-grow">
				{pd && (
					<>
						<FormRow>
							<div className="form-control w-full">
								<label className="label">
									<span className="label-text">Data de nascimento</span>
								</label>
								<input
									type="date"
									required
									value={pd.birth == '1900-01-01' ? '' : pd.birth}
									onChange={(ev) => handlePersonalDataChange('birth', ev.target.value)}
									autoComplete=""
									className="input input-bordered w-full"
								/>
							</div>
							<div className="form-control w-full">
								<label className="label">
									<span className="label-text">Gênero</span>
								</label>
								<select
									className="select select-bordered"
									value={pd.gender}
									onChange={(ev) => handlePersonalDataChange('gender', ev.target.value)}
								>
									<option disabled value="">
										Selecione
									</option>
									<option value="Masculino">Masculino</option>
									<option value="Feminino">Feminino</option>
									<option value="Outro">Outro</option>
								</select>
							</div>
						</FormRow>
						<FormRow>
							<div className="form-control w-fit">
								<label className="label cursor-pointer">
									<span className="label-text mr-4">Necessidades especiais</span>
									<input
										type="checkbox"
										checked={pd.disability}
										onChange={() => handlePersonalDataChange('disability', !pd.disability)}
										className="checkbox"
									/>
								</label>
							</div>
						</FormRow>
						<FormRow>
							<div className="form-control w-full">
								<label className="label">
									<span className="label-text">Endereço</span>
								</label>
								<input
									type="text"
									required
									value={pd.address}
									onChange={(ev) => handlePersonalDataChange('address', ev.target.value)}
									autoComplete="address"
									className="input input-bordered w-full"
								/>
							</div>
							<div className="form-control w-full">
								<label className="label">
									<span className="label-text">CEP</span>
								</label>
								<InputMask
									mask={'99999-999'}
									value={pd.cep === 0 ? '' : pd.cep}
									onChange={(ev) => handlePersonalDataChange('cep', ev.target.value)}
									className="input input-bordered w-full"
								/>
							</div>
						</FormRow>
						<FormRow>
							<div className="form-control w-full">
								<label className="label">
									<span className="label-text">Estado</span>
								</label>
								<select
									className="select select-bordered"
									value={pd.state}
									onChange={(ev) => handlePersonalDataChange('state', ev.target.value)}
								>
									<option disabled value="">
										Selecione
									</option>
									{estados.map((e, i) => (
										<option key={i} value={e}>
											{e}
										</option>
									))}
								</select>
							</div>
							<div className="form-control w-full">
								<label className="label">
									<span className="label-text">Cidade</span>
								</label>
								<input
									type="text"
									required
									value={pd.city}
									onChange={(ev) => handlePersonalDataChange('city', ev.target.value)}
									autoComplete="city"
									className="input input-bordered w-full"
								/>
							</div>
						</FormRow>
						<FormRow>
							<div className="form-control w-full">
								<label className="label">
									<span className="label-text">Linkedin (link)</span>
								</label>
								<input
									type="url"
									required
									value={pd.linkedin}
									onChange={(ev) => handlePersonalDataChange('linkedin', ev.target.value)}
									autoComplete="linkedin"
									className="input input-bordered w-full"
								/>
							</div>
						</FormRow>
					</>
				)}
			</div>
			<div className='flex w-full justify-between md:hidden pb-1 mt-1'>
				<button className="btn btn-accent btn-outline font-bold flex items-center gap-2" onClick={() => setCurrentRoute('certifications')}>
					<i className="fa-solid fa-arrow-left fa-lg"></i>
					anterior
				</button>
				<button className="btn btn-success btn-outline font-bold flex items-center gap-2" onClick={() => setCurrentRoute('diversities')}>
					próximo
					<i className="fa-solid fa-arrow-right fa-lg"></i>
				</button>
			</div>
		</>
	)
}

export default PersonalDataForm
