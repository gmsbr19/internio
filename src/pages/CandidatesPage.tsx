import { FunctionComponent, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import internio from '../assets/text.png'
import { ICandidate } from '../context/AuthProvider/types'
import { Api } from '../services/api'
import CandidateDetail from '../components/CandidateDetail'
import Spinner from '../components/ui/Spinner'

interface CandidatesPageProps {}

const CandidatesPage: FunctionComponent<CandidatesPageProps> = () => {
	const navigate = useNavigate()
	const [candidates, setCandidates] = useState<ICandidate['data'][]>([])
    const [fetching, setFetching] = useState<boolean>(false)
    const [filteredCandidates, setFilteredCandidates] = useState<ICandidate['data'][]>([])
	const [selectedCandidate, setSelectedCandidate] = useState<ICandidate['data']>()
    const [filter, setFilter] = useState<string>('')
    const cddArr = useRef<HTMLAnchorElement[]>(null)

	useEffect(() => {
        getCandidates()
	}, [])
    
    const getCandidates = () => {
        setFetching(true)
        Api.get('/candidates').then((res) => {
            if (res.status === 200) {
                setCandidates(res.data)
                setSelectedCandidate(res.data[0])
                setFilteredCandidates(res.data.filter((e: ICandidate['data']) => filter === '' && e.personal_data.city ? e : e.area === filter && e.personal_data.city))
                setFetching(false)
            }
        })
    }

    useEffect(() => {
        setFilteredCandidates(candidates.filter(e => filter === '' && e.personal_data.city ? e : e.area === filter && e.personal_data.city)) 
    }, [filter])

    useEffect(() => {
        handleSelectCandidate(0)
    }, [filteredCandidates])

	const handleSelectCandidate = (index: number) => {
		setSelectedCandidate(filteredCandidates[index])
	}

	return (
		<div className="flex flex-col">
			<div className="drawer">
				<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content flex flex-col items-center">
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
							<img src={internio} className="h-full max-h-[46px]" />
						</div>
						<div className="flex-none hidden md:block">
							<ul className="menu menu-horizontal">
								<li>
									<a className={`font-bold`} onClick={() => getCandidates()}>
										<i className={`bi bi-arrow-repeat ${fetching ? "animate-spin" : ""}`}></i>
										Atualizar
									</a>
								</li>
								<li>
									<a className={`font-bold`} onClick={() => navigate('/company')}>
										<i className={`bi bi-person`}></i>
										Perfil
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="w-screen candidate-screen gap-5 items-center justify-center flex py-4">
						<div className="card w-full h-full md:w-80 bg-base-100 shadow-xl">
							<div className="card-body overflow-y-auto p-2">
								<div className="form-control w-full mt-2">
									<label className="label">
										<span className="label-text">Filtro:</span>
									</label>
									<select
										className="select select-bordered"
                                        onChange={e => {
                                            setFilter(e.target.value)
                                            handleSelectCandidate(0)
                                        }}
                                        value={filter}
									>
										<option value="">
											Todas
										</option>
										<option value="Ciências Exatas e da Terra">Ciências Exatas e da Terra</option>
										<option value="Ciências Biológicas">Ciências Biológicas</option>
										<option value="Engenharia/Tecnologia">Engenharia/Tecnologia</option>
										<option value="Ciências da Saúde">Ciências da Saúde</option>
										<option value="Ciências Agrárias">Ciências Agrárias</option>
										<option value="Ciências Sociais">Ciências Sociais</option>
										<option value="Ciências Humanas">Ciências Humanas</option>
										<option value="Linguística">Linguística</option>
										<option value="Letras">Letras</option>
										<option value="Artes">Artes</option>
									</select>
								</div>
								<ul className="menu bg-base-100 w-full">
									{filteredCandidates.length > 0 ? filteredCandidates.map((e, i) => (
										<li key={i} className="">
											<a
												className={`flex justify-between ${
													e.id === selectedCandidate?.id ? 'active' : ''
												}`}
                                                ref={ref => cddArr.current && (cddArr.current[i] = ref as HTMLAnchorElement)}
												onClick={() => handleSelectCandidate(i)}
											>
												<div className="flex gap-2 items-center">
													<i className="bi bi-person-circle text-4xl"></i>
													<div className="flex- flex-col">
														<p className="text-lg font-bold">
															{e.name &&
																e.name
																	.toLowerCase()
																	.split(' ')
																	.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
																	.splice(0, 1)
																	.join(' ')}
														</p>
														<p className="text-sm">{e.area}</p>
													</div>
												</div>
												<i className="bi bi-caret-right"></i>
											</a>
										</li>
									)) : filteredCandidates.length === 0 && fetching ? (
                                        <li>
                                            <Spinner />
                                        </li>
                                    ) : (
                                        <li>Não há candidatos de {filter}.</li>
                                    )}
								</ul>
							</div>
						</div>
						{selectedCandidate ? <CandidateDetail c={selectedCandidate as ICandidate['data']} /> : <div className='w-[30rem]'></div>}
					</div>
				</div>
				<div className="drawer-side">
					<label htmlFor="my-drawer-3" className="drawer-overlay"></label>
					<ul className="menu p-4 w-80 bg-base-100">
						<li>
							<a className={`active font-bold`} onClick={() => navigate('/company')}>
								<i className={`bi bi-person`}></i>
								Perfil
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

export default CandidatesPage
