import { useState } from "react"
import Register from "../components/register/Register"
import RegisterCompany from "../components/register/RegisterCompany"
import TopNav from "../components/TopNav"

const REGISTERTYPES = ["Candidato", "Empresa"]

const LoginPage = () => {
    const [registerType, setRegisterType] = useState<string>('Candidato')

	return (
        <div className="flex flex-col">
        <TopNav />
		<div className="mx-auto w-full h-full flex flex-col items-center justify-center mt-10">
			<div className="card w-full md:w-auto bg-base-100 shadow-xl">
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
		</div>
        </div>
	)
}

export default LoginPage
