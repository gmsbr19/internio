import { useState } from "react"
import Register from "../components/register/Register"
import RegisterCompany from "../components/register/RegisterCompany"
import { Link } from "react-router-dom"

const REGISTERTYPES = ["Candidato", "Empresa"]

const LoginPage = () => {
    const [registerType, setRegisterType] = useState<string>('Candidato')

	return (
		<div className="mx-auto w-fit h-full flex flex-col items-center justify-center">
			<div className="card shadow-xl">
				<div className="card-body">
					<div className="tabs">
                        {REGISTERTYPES.map((e, i) => (
                            <a key={i} className={`tab tab-bordered flex items-center gap-2 ${registerType === e ? "tab-active" : ""}`} onClick={() => setRegisterType(e)}>
                                {e === 'Candidato' ? <i className="bi bi-person"></i> : <i className="bi bi-shop"></i>}
                                {e}
                            </a>
                        ))}
					</div>
					{
                        registerType === 'Candidato' ? <Register /> : <RegisterCompany />
                    }
				</div>
			</div>
            <Link className="text-blue-500 self-start underline" to='/login'>
                Login
            </Link>
		</div>
	)
}

export default LoginPage
