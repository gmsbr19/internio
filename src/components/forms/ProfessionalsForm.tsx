import FormRow from '../ui/FormRow'
import { ICandidate } from '../../context/AuthProvider/types'
import { Professional } from '../../types'
import DataCollapse from '../ui/DataCollapse'

type ProfessionalsForm = {
	professionals: ICandidate['data']['professionals'] | undefined
	handleProfessionalChange: (
		index: number,
		field: keyof Professional,
		value: string | boolean
	) => void
	setCurrentRoute: React.Dispatch<React.SetStateAction<string>>
	deleteProfessional: (i: number) => void
}

const ProfessionalsForm = ({
	professionals,
	handleProfessionalChange,
	deleteProfessional,
	setCurrentRoute
}: ProfessionalsForm) => {
	return (
		<>
			<div className="overflow-y-auto flex-grow">
				{professionals &&
					professionals.map((e, i) => (
						<DataCollapse
							key={i}
							title="Experiência"
							i={i}
							id={e.id as number}
							deleteData={deleteProfessional}
						>
							<FormRow>
								<div className="form-control w-full">
									<label className="label">
										<span className="label-text">Empresa</span>
									</label>
									<input
										type="text"
										required
										value={e.company}
										onChange={(ev) => handleProfessionalChange(i, 'company', ev.target.value)}
										autoComplete=""
										className="input input-bordered w-full"
									/>
								</div>
								<div className="form-control w-full">
									<label className="label">
										<span className="label-text">Cargo</span>
									</label>
									<input
										type="text"
										required
										value={e.role}
										onChange={(ev) => handleProfessionalChange(i, 'role', ev.target.value)}
										autoComplete=""
										className="input input-bordered w-full"
									/>
								</div>
							</FormRow>
							<FormRow>
								<label className="label cursor-pointer w-fit">
									<input
										type="checkbox"
										required
										checked={e.current_job}
										onChange={() => handleProfessionalChange(i, 'current_job', !e.current_job)}
										autoComplete=""
										className="checkbox mr-3"
									/>
                                    <span className="label-text">Meu emprego atual</span>
								</label>
							</FormRow>
							<FormRow>
								<div className="form-control w-full">
									<label className="label">
										<span className="label-text">Início</span>
									</label>
									<input
										type="date"
										required
										value={e.start_date == '1900-01-01' ? '' : e.start_date}
										onChange={(ev) => handleProfessionalChange(i, 'start_date', ev.target.value)}
										autoComplete=""
										className="input input-bordered w-full"
									/>
								</div>
								{!e.current_job && (
									<div className="form-control w-full">
										<label className="label">
											<span className="label-text">Fim</span>
										</label>
										<input
											type="date"
											required
											value={e.end_date == '1900-01-01' ? '' : e.end_date}
											onChange={(ev) => handleProfessionalChange(i, 'end_date', ev.target.value)}
											autoComplete=""
											className="input input-bordered w-full"
										/>
									</div>
								)}
							</FormRow>
							<FormRow>
								<div className="form-control w-full">
									<label className="label">
										<span className="label-text">Descrição da atividade</span>
									</label>
									<textarea
										required
										value={e.activity_description}
										onChange={(ev) =>
											handleProfessionalChange(i, 'activity_description', ev.target.value)
										}
										autoComplete=""
										className="textarea textarea-bordered w-full"
									/>
								</div>
							</FormRow>
						</DataCollapse>
					))}
			</div>
			<div className='flex w-full justify-between md:hidden pb-1'>
				<button className="btn btn-accent btn-outline font-bold flex items-center gap-2 ml-1" onClick={() => setCurrentRoute('academicals')}>
					<i className="fa-solid fa-arrow-left fa-lg"></i>
					anterior
				</button>
				<button className="btn btn-success btn-outline font-bold flex items-center gap-2 mr-1" onClick={() => setCurrentRoute('languages')}>
					próximo
					<i className="fa-solid fa-arrow-right fa-lg"></i>
				</button>
			</div>
		</>
	)
}

export default ProfessionalsForm
