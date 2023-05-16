import FormRow from '../ui/FormRow'
import { ICandidate } from '../../context/AuthProvider/types'
import { Certification } from '../../types'
import DataCollapse from '../ui/DataCollapse'
import { useEffect } from 'react'

type CertificationsForm = {
	certifications: ICandidate['data']['certifications'] | undefined
	handleCertificationChange: (index: number, field: keyof Certification, value: string) => void
	setCurrentRoute: React.Dispatch<React.SetStateAction<string>>
	deleteCertification: (i: number) => void
}

const CertificationsForm = ({
	certifications,
	handleCertificationChange,
	setCurrentRoute,
	deleteCertification
}: CertificationsForm) => {
	useEffect(() => {
		console.log(certifications)
	}, [])
	return (
		<>
			<div className="overflow-y-auto flex-grow">
				{certifications &&
					certifications.map((e, i) => (
						<DataCollapse
							key={i}
							title="Certificação"
							i={i}
							id={e.id as number}
							deleteData={deleteCertification}
						>
							<FormRow>
								<div className="form-control w-full">
									<label className="label">
										<span className="label-text">Tipo</span>
									</label>
									<select
										className="select select-bordered"
										value={e.type}
										onChange={(ev) => handleCertificationChange(i, 'type', ev.target.value)}
									>
										<option value="">Selecione</option>
										<option value="Certificado">Certificado</option>
										<option value="Curso">Curso</option>
										<option value="Reconhecimento">Reconhecimento</option>
										<option value="Trabalho voluntário">Trabalho voluntário</option>
									</select>
								</div>
								<div className="form-control w-full">
									<label className="label">
										<span className="label-text">Título</span>
									</label>
									<input
										type="text"
										required
										value={e.title}
										onChange={(ev) => handleCertificationChange(i, 'title', ev.target.value)}
										autoComplete=""
										className="input input-bordered w-full"
									/>
								</div>
							</FormRow>
							<FormRow>
								<div className="form-control w-full">
									<label className="label">
										<span className="label-text">Descrição</span>
									</label>
									<textarea
										required
										value={e.description}
										onChange={(ev) => handleCertificationChange(i, 'description', ev.target.value)}
										autoComplete=""
										className="textarea textarea-bordered w-full"
									/>
								</div>
							</FormRow>
						</DataCollapse>
					))}
			</div>
			<div className='flex w-full justify-between md:hidden pb-1'>
				<button className="btn btn-accent btn-outline font-bold flex items-center gap-2 ml-1" onClick={() => setCurrentRoute('languages')}>
					<i className="fa-solid fa-arrow-left fa-lg"></i>
					anterior
				</button>
				<button className="btn btn-success btn-outline font-bold flex items-center gap-2 mr-1" onClick={() => setCurrentRoute('personal_data')}>
					próximo
					<i className="fa-solid fa-arrow-right fa-lg"></i>
				</button>
			</div>
		</>
	)
}

export default CertificationsForm
