import { useState } from 'react'
import Spinner from './Spinner';

type Props = {
    onFinish: (event: React.FormEvent<HTMLFormElement>, values: {email: string; password: string}) => Promise<void>
    loginMalSucedido: boolean
    loading: boolean
}

const LoginForm = ({onFinish, loginMalSucedido, loading}:Props) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
        <form onSubmit={e => onFinish(e, {email, password})} className='flex flex-col gap-2'>
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">E-mail</span>
				</label>
				<input
					type="email"
					required
                    value={email}
                    autoComplete='username'
                    onChange={(e) => setEmail(e.target.value)}
					className="input input-bordered w-full max-w-xs"
				/>
			</div>
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">Senha</span>
				</label>
				<input
					type="password"
					required
                    value={password}
                    autoComplete='current-password'
                    onChange={(e) => setPassword(e.target.value)}
					className="input input-bordered w-full max-w-xs"
				/>
			</div>
            <div className="card-actions flex items-center justify-end ga-5">
            {loginMalSucedido && <span className='text-red-600 pl-1'>E-mail ou senha inválidos!</span>}
                <button className="btn btn-primary" type='submit'>{loading ? <Spinner /> : "Login"}</button>
            </div>
		</form>
    );
}
 
export default LoginForm;