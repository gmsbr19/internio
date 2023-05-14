import FormRow from '../ui/FormRow'
import { ICandidate } from '../../context/AuthProvider/types'
import { Language } from '../../types'
import DataCollapse from '../ui/DataCollapse'

type LanguagesForm = {
	languages: ICandidate['data']['languages'] | undefined
	handleLanguageChange: (index: number, field: keyof Language, value: string) => void
	addLanguage: () => void
	deleteLanguage: (i: number) => void
}

const LanguagesForm = ({
	languages,
	handleLanguageChange,
	addLanguage,
	deleteLanguage
}: LanguagesForm) => {

	return (
		<>
			<div className="overflow-y-auto flex-grow">
				{languages &&
					languages.map((e, i) => (
						<DataCollapse
							key={i}
							title="Idioma"
							i={i}
							id={e.id as number}
							deleteData={deleteLanguage}
						>
							<FormRow>
								<div className="form-control w-full">
									<label className="label">
										<span className="label-text">Idioma</span>
									</label>
									<input
										type="text"
										required
										value={e.language}
										onChange={(ev) => handleLanguageChange(i, 'language', ev.target.value)}
										autoComplete=""
										className="input input-bordered w-full"
									/>
								</div>
								<div className="form-control w-full">
									<label className="label">
										<span className="label-text">Formação</span>
									</label>
									<select
										className="select select-bordered"
										value={e.level}
										onChange={(ev) => handleLanguageChange(i, 'level', ev.target.value)}
									>
										<option value="">Selecione</option>
										<option value="Básico">Básico</option>
										<option value="Intermediário">Intermediário</option>
										<option value="Avançado">Avançado</option>
										<option value="Nativo/Fluente">Nativo/Fluente</option>
									</select>
								</div>
							</FormRow>
						</DataCollapse>
					))}
			</div>
			<button className="btn" onClick={() => addLanguage()}>
				Adicionar
			</button>
		</>
	)
}

export default LanguagesForm
