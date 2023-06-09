import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Card from '../components/createSections/Card'
import { Api } from '../services/api'
import { getUserLocalStorage, setUserLocalStorage } from '../context/AuthProvider/util'
import { ICandidate, IUser } from '../context/AuthProvider/types'
import ProfileForm from '../components/forms/ProfileForm'
import { Candidate } from '../types'
import internio from '../assets/text.png'

const ProfilePage = () => {
	const navigate = useNavigate()
	const user: IUser = getUserLocalStorage()
	const [candidateData, setCandidateData] = useState<Candidate>()


	useEffect(() => {
		setCandidateData(user.data as Candidate)
	}, [])

	useEffect(() => {
		updateLocalStorage()
	}, [candidateData])

	const updateLocalStorage = () => {
		setUserLocalStorage({...user, data: candidateData as Candidate})
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
			setCandidateData(dataObj)
			setUserLocalStorage({...user, data: dataObj} as IUser)
		})
	}

	const handleProfileChange = (field: keyof ICandidate['data'], value: string | boolean) => {
		const updatedData = { ...candidateData, [field]: value }
		setCandidateData(updatedData as Candidate)
	}

	return (
		<div className="flex flex-col">
			<div className="drawer">
				<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
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
							<ul className="menu menu-horizontal"></ul>
						</div>
					</div>
					<div className="mx-auto w-full md:w-fit h-full gap-5 items-center justify-center flex">
						<div className="card w-full md:w-fit bg-base-100 shadow-xl hidden md:flex">
							<div className="card-body p-2">
								<ul className="menu bg-base-100 w-56 p-2 rounded-box">
									<li>
										<a className={`active font-bold`}>
											<i className={`bi bi-person`}></i>
											Perfil
										</a>
									</li>
									<li>
										<a onClick={() => navigate('/curriculum')}>
											<i className="bi bi-file-earmark-text"></i>
											Editar currículo
										</a>
									</li>
									<span className="border-b w-full my-3"></span>
									<li>
										<a onClick={() => navigate('/logout')}>
											<i className="bi bi-sign-turn-left"></i>
											Logout
										</a>
									</li>
								</ul>
							</div>
						</div>
						<Card title="Perfil">
							<ProfileForm
								candidateId={candidateData?.id as number}
								handleProfileChange={handleProfileChange}
								pf={candidateData}
								getCandidate={getCandidate}
							/>
						</Card>
					</div>
				</div>
				<div className="drawer-side">
					<label htmlFor="my-drawer-3" className="drawer-overlay"></label>
					<ul className="menu p-4 w-80 bg-base-100">
						<li>
							<a onClick={() => navigate('/curriculum')}>
								<i className="bi bi-file-earmark-text"></i>
								Editar currículo
							</a>
						</li>
						<span className="border-b w-full my-3"></span>
						<li>
							<a onClick={() => navigate('/logout')}>
								<i className="bi bi-sign-turn-left"></i>
								Logout
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default ProfilePage
