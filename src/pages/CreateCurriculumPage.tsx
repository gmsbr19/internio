import { useEffect, useRef, useState } from 'react'
import Card from '../components/createSections/Card'
import AcademicalsForm from '../components/forms/AcademicalsForm'
import {
	Academical,
	Professional,
	Certification,
	Language,
	PersonalData,
	Diversity,
	Candidate
} from '../types'
import { ICandidate, IUser } from '../context/AuthProvider/types'
import { getUserLocalStorage, setUserLocalStorage } from '../context/AuthProvider/util'
import { Api } from '../services/api'
import { toast } from 'react-toastify'
import ProfessionalsForm from '../components/forms/ProfessionalsForm'
import LanguagesForm from '../components/forms/LanguagesForm'
import CertificationsForm from '../components/forms/CertificationsForm'
import PersonalDataForm from '../components/forms/PersonalDataForm'
import DiversityForm from '../components/forms/DiversityForm'
import { useNavigate } from 'react-router-dom'
import internio from '../assets/text.png'

const SECTIONS = [
	{ icon: 'mortarboard', name: 'Formações', path: 'academicals' },
	{ icon: 'building-add', name: 'Experiências', path: 'professionals' },
	{ icon: 'translate', name: 'Idiomas', path: 'languages' },
	{ icon: 'patch-check', name: 'Certificações', path: 'certifications' },
	{ icon: 'file-earmark-person', name: 'Dados pessoais', path: 'personal_data' },
	{ icon: 'flag', name: 'Diversidade', path: 'diversities' }
]

interface CandidatePropType {
	academicals: Academical
	professionals: Professional
	languages: Language
	certifications: Certification
}

interface NotArray {
	personal_data: PersonalData
	diversities: Diversity
}

type ArraysType = Academical[] | Professional[] | Language[] | Certification[]

type NotArr = keyof NotArray
type Prop = keyof CandidatePropType
type PersonalDataKeys = keyof PersonalData
type DiversityKeys = keyof Diversity

const CreateCurriculumPage = () => {
	const userData: IUser = getUserLocalStorage()
	const candidateId = userData.id
	const [candidateData, setCandidateData] = useState<ICandidate['data']>()
	const [currentRoute, setCurrentRoute] = useState<string>('academicals')
	const navigate = useNavigate()
	const drawerToggle = useRef<HTMLInputElement>(null)
	const modal = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setCandidateData(userData.data as Candidate)
	}, [])

	useEffect(() => {
		updateLocalStorage()
	}, [candidateData])

	const updateLocalStorage = () => {
		setUserLocalStorage({...userData, data: candidateData as Candidate})
	}

	const getCandidate = (id?: number) => {
		Api.get(`/candidate/${id ? id : candidateData?.id}`).then((res) => {
			const data: Candidate = res.data
			const dataObj: ICandidate["data"] = {
				...data,
				id: id as number,
				name:
					data.name &&
					data.name
						.toLowerCase()
						.split(' ')
						.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
						.join(' '),
				email: data.email,
				phone: data.phone,
				cpf: data.cpf.toString()
			}
			setUserLocalStorage({...userData, data: dataObj} as IUser)
		})

	}

	const updateCandidate = () => {
		Api.put(`/candidate/${candidateId}`, {
			academicals: candidateData?.academicals,
			professionals: candidateData?.professionals,
			languages: candidateData?.languages,
			certifications: candidateData?.certifications,
			personal_data: {
				...candidateData?.personal_data,
				cep: parseInt(candidateData?.personal_data?.cep.toString().replace(/\D/g, '') as string)
			},
			diversities: candidateData?.diversities
		}).then((res) => {
			navigate('/profile')
			if (res.status === 200) {
				toast('Currículo salvo com sucesso.')
			}
			getCandidate()
		})
	}

	const handleChange = (
		propName: Prop,
		index: number,
		field: keyof CandidatePropType[Prop][],
		value: string | boolean
	) => {
		if (candidateData) {
			const updatedProp = [...(candidateData[propName] as ArraysType)]
			updatedProp[index] = {
				...updatedProp[index],
				[field]: value
			}
			setCandidateData({
				...candidateData,
				[propName]: updatedProp
			})
		}
	}

	const handleDelete = (i: number, propName: Prop) => {
		if (candidateData) {
			Api.delete(`/candidate/${candidateId}/${propName}/${i}`).then(() => {
				const updatedProp = [...(candidateData[propName] as ArraysType)].filter((e) => e.id !== i)
				setCandidateData({
					...candidateData,
					[propName]: updatedProp
				})
			})
		}
	}

	const handleAdd = (propName: Prop, base: CandidatePropType[Prop]) => {
		Api.post(`/candidate/${candidateId}/${propName}`, base).then((res) => {
			base.id = res.data[propName.toString()]
			if (candidateData) {
				setCandidateData({
					...candidateData,
					[propName]: [...(candidateData[propName] as ArraysType), base]
				})
			}
		})
	}

	const handleAcademicalChange = (index: number, field: keyof Academical, value: string) => {
		handleChange('academicals', index, field as keyof Academical[], value)
	}

	const addAcademical = () => {
		const baseAcademical: Academical = {
			formation_type: '',
			status: '',
			institution: '',
			course: '',
			degree: '',
			start_date: '1900-01-01',
			end_date: '1900-01-01',
			candidate_id: candidateId as number
		}
		handleAdd('academicals', baseAcademical)
	}

	const deleteAcademical = (i: number) => {
		handleDelete(i, 'academicals')
	}

	const handleProfessionalChange = (
		index: number,
		field: keyof Professional,
		value: string | boolean
	) => {
		handleChange('professionals', index, field as keyof Professional[], value)
	}

	const addProfessional = () => {
		const baseProfessional: Professional = {
			company: '',
			role: '',
			current_job: false,
			start_date: '1900-01-01',
			end_date: '1900-01-01',
			activity_description: '',
			candidate_id: candidateId as number
		}
		handleAdd('professionals', baseProfessional)
	}

	const deleteProfessional = (i: number) => {
		handleDelete(i, 'professionals')
	}

	const handleLanguageChange = (index: number, field: keyof Language, value: string | boolean) => {
		handleChange('languages', index, field as keyof Language[], value)
	}

	const addLanguage = () => {
		const baseProfessional: Language = {
			language: '',
			level: '',
			candidate_id: candidateId as number
		}
		handleAdd('languages', baseProfessional)
	}

	const deleteLanguage = (i: number) => {
		handleDelete(i, 'languages')
	}

	const handleCertificationChange = (
		index: number,
		field: keyof Certification,
		value: string | boolean
	) => {
		handleChange('certifications', index, field as keyof Certification[], value)
	}

	const addCertification = () => {
		const baseProfessional: Certification = {
			description: '',
			title: '',
			type: '',
			candidate_id: candidateId as number
		}
		handleAdd('certifications', baseProfessional)
	}

	const deleteCertification = (i: number) => {
		handleDelete(i, 'certifications')
	}

	const handleNAChange = (
		propName: NotArr,
		field: keyof PersonalData | keyof Diversity,
		value: string | boolean
	) => {
		if (candidateData) {
			const updatedProp = { ...candidateData[propName], [field]: value }
			setCandidateData({
				...candidateData,
				[propName]: updatedProp
			})
		}
	}

	const handlePersonalDataChange = (field: PersonalDataKeys, value: string | boolean) => {
		handleNAChange('personal_data', field, value)
	}

	const handleDiversityChange = (field: DiversityKeys, value: string | boolean) => {
		handleNAChange('diversities', field, value)
	}

	const showSaveModal = () => {
		modal.current?.click()
	}

	return (
		<div className="flex flex-col">
			<div className="drawer">
				<input id="my-drawer-3" type="checkbox" className="drawer-toggle" ref={drawerToggle} />
				<div className="drawer-content flex flex-col">
					<div className="w-full navbar bg-base-300">
						<div className="flex-none md:hidden">
							<label htmlFor="my-drawer-3" className="btn btn-ghost">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h8m-8 6h16"
									/>
								</svg>
							</label>
						</div>
						<div className="flex-1 px-2 mx-2">
							<img src={internio} className='h-full max-h-[46px]' />
						</div>
						<div className="flex-none hidden md:block">
							<ul className="menu menu-horizontal">
								<li>
									<a onClick={() => navigate('/profile')}>
										<i className={`bi bi-person`}></i>
										Perfil
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="mx-auto w-full md:w-fit flex md:h-full gap-5 items-center justify-center p-2 md:p-0">
						<div className="card w-fit bg-base-100 shadow-xl hidden md:flex">
							<div className="card-body p-2">
								<ul className="menu bg-base-100 w-56 p-2 rounded-box">
									{SECTIONS.map((e, i) => (
										<li key={i}>
											<a
												className={`${e.path === currentRoute ? 'active font-bold' : ''}`}
												onClick={() => setCurrentRoute(e.path)}
											>
												<i className={`bi bi-${e.icon}`}></i>
												{e.name}
											</a>
										</li>
									))}
									<label htmlFor="my-modal" className="btn btn-outline btn-primary">
										Salvar
									</label>
								</ul>
							</div>
						</div>
						{currentRoute == 'academicals' && (
							<Card title="Formações" addInfo={addAcademical}>
								<AcademicalsForm
									academicals={candidateData?.academicals ? [...candidateData.academicals] : []}
									deleteAcademical={deleteAcademical}
									handleAcademicalChange={handleAcademicalChange}
									setCurrentRoute={setCurrentRoute}
								/>
							</Card>
						)}
						{currentRoute == 'professionals' && (
							<Card title="Experiências" addInfo={addProfessional}>
								<ProfessionalsForm
									professionals={
										candidateData?.professionals ? [...candidateData.professionals] : []
									}
									deleteProfessional={deleteProfessional}
									setCurrentRoute={setCurrentRoute}
									handleProfessionalChange={handleProfessionalChange}
								/>
							</Card>
						)}
						{currentRoute == 'languages' && (
							<Card title="Idiomas" addInfo={addLanguage}>
								<LanguagesForm
									languages={candidateData?.languages ? [...candidateData.languages] : []}
									deleteLanguage={deleteLanguage}
									setCurrentRoute={setCurrentRoute}
									handleLanguageChange={handleLanguageChange}
								/>
							</Card>
						)}
						{currentRoute == 'certifications' && (
							<Card title="Certificações" addInfo={addCertification}>
								<CertificationsForm
									certifications={
										candidateData?.certifications ? [...candidateData.certifications] : []
									}
									setCurrentRoute={setCurrentRoute}
									deleteCertification={deleteCertification}
									handleCertificationChange={handleCertificationChange}
								/>
							</Card>
						)}
						{currentRoute == 'personal_data' && (
							<Card title="Dados pessoais">
								<PersonalDataForm
									handlePersonalDataChange={handlePersonalDataChange}
									setCurrentRoute={setCurrentRoute}
									pd={candidateData?.personal_data}
								/>
							</Card>
						)}
						{currentRoute == 'diversities' && (
							<Card title="Diversidade">
								<DiversityForm
									handleDiversityChange={handleDiversityChange}
									setCurrentRoute={setCurrentRoute}
									div={candidateData?.diversities}
									showSaveModal={showSaveModal}
								/>
							</Card>
						)}

						{/* Put this part before </body> tag */}
						<input type="checkbox" id="my-modal" ref={modal} className="modal-toggle" />
						<div className="modal z-50">
							<div className="modal-box">
								<h3 className="font-bold text-lg">Aviso!</h3>
								<p className="py-4">
									Tem certeza que deseja salvar as informações do seu currículo?
								</p>
								<div className="modal-action">
									<label htmlFor="my-modal" className="btn">
										Não
									</label>
									<button className="btn btn-outline btn-primary" onClick={() => updateCandidate()}>
										Salvar
									</button>
								</div>
							</div>
						</div>
					</div>
					
				</div>
				<div className="drawer-side">
					<label htmlFor="my-drawer-3" className="drawer-overlay"></label>
					<ul className="menu p-4 w-80 bg-base-100">
						<li>
							<a onClick={() => navigate('/profile')}>
								<i className={`bi bi-person`}></i>
								Perfil
							</a>
						</li>
						<span className="border-b w-full my-3"></span>
						{SECTIONS.map((e, i) => (
							<li key={i}>
								<a
									className={`${e.path === currentRoute ? 'active font-bold' : ''}`}
									onClick={() => {
										setCurrentRoute(e.path)
										if (drawerToggle) {
											drawerToggle.current?.click()
										}
									}}
								>
									<i className={`bi bi-${e.icon}`}></i>
									{e.name}
								</a>
							</li>
						))}
						<span className="border-b w-full my-3"></span>
						<li>
							<label
								htmlFor="my-modal"
								onClick={() => showSaveModal()}
								className="btn btn-outline btn-primary hidden md:block"
							>
								Salvar
							</label>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default CreateCurriculumPage
