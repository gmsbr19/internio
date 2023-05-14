import { useState } from 'react'
import Login from '../components/Login'
import LoginCompany from '../components/LoginCompany'
import TopNav from '../components/TopNav'

const LOGINTYPES = ['Candidato', 'Empresa']

const LoginPage = () => {
	const [loginType, setLoginType] = useState<string>('Candidato')

	return (
		<div className="flex flex-col">
			<TopNav />
			<div className="mx-auto w-fit h-full flex flex-col items-center justify-center">
				<div className="card w-96 bg-base-100 shadow-xl">
					<div className="card-body">
						<div className="tabs">
							{LOGINTYPES.map((e, i) => (
								<a
									key={i}
									className={`tab tab-bordered flex items-center gap-2 ${
										loginType === e ? 'tab-active' : ''
									}`}
									onClick={() => setLoginType(e)}
								>
									{e === 'Candidato' ? (
										<i className="bi bi-person"></i>
									) : (
										<i className="bi bi-shop"></i>
									)}
									{e}
								</a>
							))}
						</div>
						{loginType === 'Candidato' ? <Login /> : <LoginCompany />}
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
