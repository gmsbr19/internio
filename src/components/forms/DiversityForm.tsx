import FormRow from '../ui/FormRow'
import { ICandidate } from '../../context/AuthProvider/types'
import { Diversity } from '../../types'

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

type DiversityForm = {
    div: ICandidate['data']['diversities'] | undefined
	handleDiversityChange: (field: keyof Diversity, value: string | boolean) => void
}

const DiversityForm = ({ div, handleDiversityChange }: DiversityForm) => {
	return (
		<>
			<div className="overflow-y-auto flex-grow">
				{div && (
					<>
                        <FormRow>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Estado de origem</span>
                                </label>
                                <select
                                    className="select select-bordered"
                                    value={div.origin_state}
                                    onChange={(ev) => handleDiversityChange('origin_state', ev.target.value)}
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
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Cidade de origem</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={div.origin_city}
                                    onChange={(ev) => handleDiversityChange('origin_city', ev.target.value)}
                                    autoComplete="city"
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </FormRow>
						<FormRow>
                        <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Pronomes</span>
                                </label>
                                <select
                                    className="select select-bordered"
                                    value={div.pronouns}
                                    onChange={(ev) => handleDiversityChange('pronouns', ev.target.value)}
                                >
                                    <option disabled value="">
                                        Selecione
                                    </option>
                                    <option value="Ele/Dele">Ele/Dele</option>
                                    <option value="Ela/Dela">Ela/Dela</option>
                                    <option value="Elu/Delu">Elu/Delu</option>
                                    <option value="Outro">Outro</option>
                                    <option value="Prefiro não responder">Prefiro não responder</option>
                                </select>
                            </div>
                            <div className="form-control w-1/2">
								<label className="label">
									<span className="label-text">Sexualidade</span>
								</label>
								<select
									className="select select-bordered"
									value={div.sexuality}
									onChange={(ev) => handleDiversityChange('sexuality', ev.target.value)}
								>
									<option disabled value="">
										Selecione
									</option>
									<option value="Assexual">Assexual</option>
									<option value="Bissexual">Bissexual</option>
									<option value="Heterossexual">Heterossexual</option>
									<option value="Homossexual">Homossexual</option>
									<option value="Pansexual">Pansexual</option>
									<option value="Prefiro não responder">Prefiro não responder</option>
								</select>
							</div>
						</FormRow>
						<FormRow>
							<div className="form-control w-1/2">
								<label className="label">
									<span className="label-text">Identidade de gênero</span>
								</label>
								<select
									className="select select-bordered"
									value={div.gender}
									onChange={(ev) => handleDiversityChange('gender', ev.target.value)}
								>
									<option disabled value="">
										Selecione
									</option>
									<option value="Cisgênero">Cisgênero</option>
									<option value="Transgênero">Transgênero</option>
									<option value="Outro">Outro</option>
									<option value="Prefiro não responder">Prefiro não responder</option>
								</select>
							</div>
							<div className="form-control w-1/2">
								<label className="label">
									<span className="label-text">Cor ou raça</span>
								</label>
								<select
									className="select select-bordered"
									value={div.color}
									onChange={(ev) => handleDiversityChange('color', ev.target.value)}
								>
									<option disabled value="">
										Selecione
									</option>
									<option value="Amarela">Amarela</option>
									<option value="Branca">Branca</option>
									<option value="Indígena">Indígena</option>
									<option value="Parda">Parda</option>
									<option value="Preta">Preta</option>
									<option value="Prefiro não responder">Prefiro não responder</option>
								</select>
							</div>
						</FormRow>
						<FormRow>
                        <div className="form-control w-fit">
								<label className="label cursor-pointer">
									<input
										type="checkbox"
										className="checkbox"
									/>
									<span className="label-text ml-4">Eu concordo em compartilhar esses dados com a Inter.io <br /> e com as empresas recrutadoras.</span>
								</label>
							</div>
						</FormRow>
					</>
				)}
			</div>
		</>
	)
}

export default DiversityForm
