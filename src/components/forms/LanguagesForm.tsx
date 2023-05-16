import FormRow from '../ui/FormRow'
import { ICandidate } from '../../context/AuthProvider/types'
import { Language } from '../../types'
import DataCollapse from '../ui/DataCollapse'

type LanguagesForm = {
	languages: ICandidate['data']['languages'] | undefined
	handleLanguageChange: (index: number, field: keyof Language, value: string) => void
	setCurrentRoute: React.Dispatch<React.SetStateAction<string>>
	deleteLanguage: (i: number) => void
}

const LanguagesForm = ({
	languages,
	handleLanguageChange,
	setCurrentRoute,
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
			<div className='flex w-full justify-between md:hidden pb-1'>
				<button className="btn btn-accent btn-outline font-bold flex items-center gap-2 ml-1" onClick={() => setCurrentRoute('professionals')}>
					<i className="fa-solid fa-arrow-left fa-lg"></i>
					anterior
				</button>
				<button className="btn btn-success btn-outline font-bold flex items-center gap-2 mr-1" onClick={() => setCurrentRoute('certifications')}>
					próximo
					<i className="fa-solid fa-arrow-right fa-lg"></i>
				</button>
			</div>
		</>
	)
}

export default LanguagesForm
