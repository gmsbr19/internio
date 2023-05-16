import FormRow from '../ui/FormRow'
import { ICandidate } from '../../context/AuthProvider/types'
import { Academical } from '../../types'
import DataCollapse from '../ui/DataCollapse'

type AcademicalsForm = {
	academicals: ICandidate['data']['academicals'] | undefined
	handleAcademicalChange: (index: number, field: keyof Academical, value: string) => void
	setCurrentRoute: React.Dispatch<React.SetStateAction<string>>
	deleteAcademical: (i: number) => void
}

const AcademicalsForm = ({
	academicals,
	handleAcademicalChange,
	setCurrentRoute,
	deleteAcademical
}: AcademicalsForm) => {
	return (
		<>
			<div className="overflow-y-auto flex-grow">
				{academicals &&
					academicals.map((e, i) => (
						<DataCollapse
							key={i}
							title="Formação"
							i={i}
							id={e.id as number}
							deleteData={deleteAcademical}
						>
							<FormRow>
								<div className="form-control w-full">
									<label className="label">
										<span className="label-text">Formação</span>
									</label>
									<select
										className="select select-bordered"
										value={e.formation_type}
										onChange={(ev) => handleAcademicalChange(i, 'formation_type', ev.target.value)}
									>
										<option value="">Selecione</option>
										<option value="Fundamental">Fundamental</option>
										<option value="Médio">Médio</option>
										<option value="Técnico">Técnico</option>
										<option value="Superior">Superior</option>
									</select>
								</div>
								<div className="form-control w-full">
									<label className="label">
										<span className="label-text">Status</span>
									</label>
									<select
										className="select select-bordered"
										value={e.status}
										onChange={(ev) => handleAcademicalChange(i, 'status', ev.target.value)}
									>
										<option value="">Selecione</option>
										<option value="Completo">Completo</option>
										<option value="Em andamento">Em andamento</option>
										<option value="Incompleto">Incompleto</option>
									</select>
								</div>
							</FormRow>
							<FormRow>
								{e.formation_type !== 'Fundamental' && e.formation_type !== 'Médio' && (
									<div className="form-control w-full">
										<label className="label">
											<span className="label-text">Instituição</span>
										</label>
										<input
											type="text"
											required
											value={e.institution}
											onChange={(ev) => handleAcademicalChange(i, 'institution', ev.target.value)}
											autoComplete=""
											className="input input-bordered w-full"
										/>
									</div>
								)}
								{e.formation_type === 'Superior' && (
									<div className="form-control w-full">
										<label className="label">
											<span className="label-text">Grau</span>
										</label>
										<select
											className="select select-bordered"
											value={e.degree}
											onChange={(ev) => handleAcademicalChange(i, 'degree', ev.target.value)}
										>
											<option disabled value="">
												Selecione
											</option>
											<option value="Tecnólogo">Tecnólogo</option>
											<option value="Graduação">Graduação</option>
											<option value="Pós-graduação">Pós-graduação</option>
											<option value="Mestrado">Mestrado</option>
											<option value="Doutorado">Doutorado</option>
										</select>
									</div>
								)}
							</FormRow>
							<FormRow>
								{e.formation_type !== 'Fundamental' && e.formation_type !== 'Médio' && (
									<div className="form-control w-full">
										<label className="label">
											<span className="label-text">Curso</span>
										</label>
										<input
											type="text"
											required
											value={e.course}
											onChange={(ev) => handleAcademicalChange(i, 'course', ev.target.value)}
											autoComplete=""
											className="input input-bordered w-full"
										/>
									</div>
								)}
							</FormRow>
							<FormRow>
								{e.formation_type !== 'Fundamental' && e.formation_type !== 'Médio' && (
									<div className="form-control w-full">
										<label className="label">
											<span className="label-text">Início</span>
										</label>
										<input
											type="date"
											required
											value={e.start_date == '1900-01-01' ? '' : e.start_date}
											onChange={(ev) => handleAcademicalChange(i, 'start_date', ev.target.value)}
											autoComplete=""
											className="input input-bordered w-full"
										/>
									</div>
								)}
								{e.formation_type !== 'Fundamental' &&
									e.formation_type !== 'Médio' &&
									e.status !== 'Em andamento' && (
										<div className="form-control w-full">
											<label className="label">
												<span className="label-text">Fim</span>
											</label>
											<input
												type="date"
												required
												value={e.end_date == '1900-01-01' ? '' : e.end_date}
												onChange={(ev) => handleAcademicalChange(i, 'end_date', ev.target.value)}
												autoComplete=""
												className="input input-bordered w-full"
											/>
										</div>
									)}
							</FormRow>
						</DataCollapse>
					))}
			</div>
			<div className='flex w-full justify-end md:hidden pb-1'>
				<button className="btn btn-success btn-outline font-bold flex items-center gap-2 mr-1" onClick={() => setCurrentRoute('professionals')}>
					próximo
					<i className="fa-solid fa-arrow-right fa-lg"></i>
				</button>
			</div>
		</>
	)
}

export default AcademicalsForm
