import { ICandidate } from '../context/AuthProvider/types'
import { FC } from 'react'
import { calculateAge, formatPhoneNumber } from '../functions/functions'

interface CandidateDetailProps {
	c: ICandidate['data']
}

const CandidateDetail: FC<CandidateDetailProps> = ({ c }) => {
	return (
		<div className="card w-[30rem] h-full bg-base-100 shadow-xl p-4 border border-gray-700">
			<div className="card-body overflow-y-auto p-0">
				<article className="prose prose-h3:m-0 prose-p:m-0">
					<h2 className="mb-0">
						{c.name &&
							c.name
								.toLowerCase()
								.split(' ')
								.map((word) => word.charAt(0).toUpperCase() + word.slice(1))

								.join(' ')}
					</h2>
					<p>{c.area}</p>
                    <div className='flex gap-3 w-1/2'>
                        <p>{c.personal_data.city ? c.personal_data.city.trim().replace(c.personal_data.city[0], c.personal_data.city[0].toUpperCase()) : ''}/{c.personal_data.state}</p>
                        <p>{calculateAge(c.personal_data.birth)} anos</p>
                    </div>
                    <div className='flex font-bold gap-3'>
                        <p>{c.email}</p>
                        <p>{formatPhoneNumber(c.phone.toString())}</p>
                        {c.personal_data.linkedin && <p>
                            <a href={c.personal_data.linkedin} target='_blank'>
                                <i className="bi bi-linkedin"></i>
                            </a>
                        </p>}
                    </div>
                    {c.academicals.length > 0 && c.academicals[0].course && 
                    <div>
                        <div className='flex items-center gap-3'>
                            <i className='bi bi-mortarboard'></i>
                            <h3>Formações</h3>
                            <span className='border-b w-full'></span>
                        </div>
                        {c.academicals.map((e, i) => (
                            e.course && 
                            <div key={i} className='p-5 py-3 mb-2 flex'>
                                <div className='flex flex-col uppercase border-r border-gray-400 w-3/12 text-right pr-3'>
                                    <span>curso</span>
                                    <span>status</span>
                                    <span>instituição</span>
                                    <span>conclusão</span>
                                </div>
                                <div className='flex flex-col ps-2'>
                                    <span>{e.course}</span>
                                    <span>{e.status}</span>
                                    <span>{e.institution}</span>
                                    <span>{e.end_date?.substring(0, 4)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    }
                    {c.professionals.length > 0 && c.professionals[0].role && 
                    <div>
                        <div className='flex items-center gap-3'>
                            <i className='bi bi-building'></i>
                            <h3>Experiências</h3>
                            <span className='border-b w-full'></span>
                        </div>
                        {c.professionals.map((e, i) => (
                            e.role && 
                            <div key={i} className='p-5 py-3 mb-2 flex'>
                                <div className='flex flex-col uppercase border-r border-gray-400 w-3/12 text-right pr-3'>
                                    <span>empresa</span>
                                    <span>cargo</span>
                                    <span>início</span>
                                    {!e.current_job && <span>fim</span>}
                                    <span>descrição</span>
                                </div>
                                <div className='flex flex-col ps-2'>
                                    <span>{e.company}</span>
                                    <span>{e.role}</span>
                                    <span>{e.start_date.substring(0, 4)}</span>
                                    {!e.current_job && <span>{e.end_date?.substring(0, 4)}</span>}
                                    <span>{e.activity_description}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    }
                    {c.languages.length > 0 && c.languages[0].language && 
                    <div>
                        <div className='flex items-center gap-3'>
                            <i className='bi bi-translate'></i>
                            <h3>Idiomas</h3>
                            <span className='border-b w-full'></span>
                        </div>
                        {c.languages.map((e, i) => (
                            e.language && 
                            <div key={i} className='p-5 py-3 mb-2 flex'>
                                <div className='flex flex-col uppercase border-r border-gray-400 w-3/12 text-right pr-3'>
                                    <span>idioma</span>
                                    <span>nível</span>
                                </div>
                                <div className='flex flex-col ps-2'>
                                    <span>{e.language}</span>
                                    <span>{e.level}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    }
                    {c.certifications.length > 0 && c.certifications[0].title && 
                    <div>
                        <div className='flex items-center gap-3'>
                            <i className='bi bi-patch-check'></i>
                            <h3>Certificações</h3>
                            <span className='border-b w-full'></span>
                        </div>
                        {c.certifications.map((e, i) => (
                            e.title && 
                            <div key={i} className='p-5 py-3 mb-2 flex'>
                                <div className='flex flex-col uppercase border-r border-gray-400 w-3/12 text-right pr-3'>
                                    <span>tipo</span>
                                    <span>título</span>
                                    <span>descriçao</span>
                                </div>
                                <div className='flex flex-col ps-2'>
                                    <span>{e.type}</span>
                                    <span>{e.title}</span>
                                    <span>{e.description}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    }
                    {c.diversities.share &&
                        <div>
                        <div className='flex items-center gap-3'>
                            <i className='bi bi-flag'></i>
                            <h3>Diversidade</h3>
                            <span className='border-b w-full'></span>
                        </div>
                        <div className='p-5 py-3 mb-2 flex'>
                            <div className='flex flex-col uppercase border-r border-gray-400 w-fit text-right pr-3'>
                                <span>Estado de origem</span>
                                <span>Cidade de origem</span>
                                <span>pronomes</span>
                                <span>sexualidade</span>
                                <span>gênero</span>
                                <span>cor</span>
                            </div>
                            <div className='flex flex-col ps-2'>
                                <span>{c.diversities.origin_state}</span>
                                <span>{c.diversities.origin_city}</span>
                                <span>{c.diversities.pronouns}</span>
                                <span>{c.diversities.sexuality}</span>
                                <span>{c.diversities.gender}</span>
                                <span>{c.diversities.color}</span>
                            </div>
                        </div>
                    </div>
                    }
				</article>
			</div>
		</div>
	)
}

export default CandidateDetail
