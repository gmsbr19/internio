import { FunctionComponent } from 'react'
import { useAuth } from '../context/AuthProvider/useAuth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import internio from '../assets/text.png'

const TopNav: FunctionComponent = () => {
	const auth = useAuth()
	const location = useLocation()
    const navigate = useNavigate()

	return (
		<div className="navbar bg-base-100">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost md:hidden">
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
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						{auth.token && auth.type == 'candidate' ? (
							<>
								<li>
									<Link to="/profile">Perfil</Link>
								</li>
								<li>
									<Link className="active" to="/register">
										Currículo
									</Link>
								</li>
							</>
						) : auth.token && auth.type == 'company' ? (
							<>
								<li>
									<Link to="/company">Perfil</Link>
								</li>
								<li>
									<Link className="active" to="/candidates">
										Candidatos
									</Link>
								</li>
							</>
						) : (
							<>
								<li>
									<Link className={`${location.pathname === '/login' ? 'active' : ''}`} to="/login">
										Login
									</Link>
								</li>
								<li>
									<Link
										className={`${location.pathname !== '/login' ? 'active' : ''}`}
										to="/register"
									>
										Registrar
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
				<a className="btn btn-ghost normal-case text-xl" onClick={() => navigate('/')}>
                    <img src={internio} className='h-full' />
                </a>
			</div>
			<div className="navbar-end hidden md:flex">
				{auth.token && auth.type == 'candidate' ? (
					<ul className="menu menu-horizontal px-1">
						<li>
							<Link to="/profile">Perfil</Link>
						</li>
						<li>
							<Link className="active" to="/curriculum">
								Currículo
							</Link>
						</li>
					</ul>
				) : auth.token && auth.type == 'company' ? (
					<ul className="menu menu-horizontal px-1">
						<li>
							<Link to="/company">Perfil</Link>
						</li>
						<li>
							<Link className="active" to="/candidates">
								Candidatos
							</Link>
						</li>
					</ul>
				) : (
					<ul className="menu menu-horizontal px-1">
						<li>
							<Link className={`${location.pathname === '/login' ? 'active' : ''}`} to="/login">
								Login
							</Link>
						</li>
						<li>
							<Link className={`${location.pathname !== '/login' ? 'active' : ''}`} to="/register">
								Registrar
							</Link>
						</li>
					</ul>
				)}
			</div>
		</div>
	)
}

export default TopNav
