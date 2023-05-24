import { useState, useRef } from 'react'
import InputMask from 'react-input-mask'
import FormRow from '../ui/FormRow'
import { Api } from '../../services/api'
import Spinner from '../ui/Spinner'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthProvider/useAuth'
import { verifyCpf } from '../../functions/functions'
import { useEffect } from 'react'

const Register = () => {
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [cpf, setCpf] = useState<string>('')
    const [area, setArea] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [difPass, setDifPass] = useState<boolean>(false)
	const [err, setErr] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const navigate = useNavigate()
	const auth = useAuth()
	const modal = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (auth.email) {
			navigate('/profile')
		}
	})

	const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!verifyCpf(cpf.replace(/\D/g, ''))) {
			setErr('CPF inválido')
			setDifPass(true)
			return
		}
		if (password !== confirmPassword) {
			setErr('Senhas não coincidem')
			setDifPass(true)
		} else if (password.length < 8) {
			setErr('Senha deve haver pelo menos 8 caracteres')
			setDifPass(true)
		} else {
			setDifPass(false)
			setLoading(true)
			try {
				Api.post('/candidates', {
					name,
					email,
					phone: phone.replace(/\D/g, ''),
					cpf: cpf.replace(/\D/g, ''),
                    area,
					password
				})
					.then((res) => {
                        if (res.status === 200) {
                            auth.authenticate(email, password, 'candidate')
                            .then(() => {
                                navigate('/curriculum')
                                toast(res.data.message)
                            })
						}
						setLoading(false)
					})
					.catch((err) => {
						console.log(err)
						setLoading(false)
						setDifPass(true)
						setErr(err.response.data)
					})
			} catch (error) {
				console.log(error)
			}
		}
	}

	return (
		<form className="flex flex-col gap-2 w-full" onSubmit={(e) => formSubmit(e)}>
			<FormRow>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Nome completo</span>
					</label>
					<input
						type="text"
						required
						autoComplete="name"
						onChange={(e) => setName(e.target.value)}
						value={name
							.toLowerCase()
							.split(' ')
							.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
							.join(' ')}
						className="input input-bordered w-full"
					/>
				</div>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">E-mail</span>
					</label>
					<input
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						required
						autoComplete="username"
						className="input input-bordered w-full"
					/>
				</div>
			</FormRow>
			<FormRow>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Telefone</span>
					</label>
					<InputMask
						type="text"
						mask="(99) 99999-9999"
						onChange={(e) => setPhone(e.target.value)}
						value={phone}
						required
						autoComplete="phone"
						className="input input-bordered w-full"
					/>
				</div>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">CPF</span>
					</label>
					<InputMask
						type="text"
						mask="999.999.999-99"
						onChange={(e) => {
							setCpf(e.target.value)
						}}
						value={cpf}
						required
						autoComplete="cpf"
						className={`input input-bordered w-full ${
							!verifyCpf(cpf.replace(/\D/g, '')) && cpf.replace(/\D/g, '').length > 10
								? 'border-red-600'
								: ''
						}`}
					/>
				</div>
			</FormRow>
			<FormRow>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Área do Conhecimento</span>
					</label>
					<select
						className="select select-bordered"
						value={area}
						onChange={(e) => setArea(e.target.value)}
					>
						<option disabled value="">
							Selecione
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
			</FormRow>
			<FormRow>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Senha</span>
					</label>
					<input
						type="password"
						required
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						autoComplete="new-password"
						className="input input-bordered w-full"
					/>
				</div>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Confirme sua senha</span>
					</label>
					<input
						type="password"
						required
						autoComplete=""
						onChange={(e) => setConfirmPassword(e.target.value)}
						value={confirmPassword}
						className="input input-bordered w-full"
					/>
				</div>
			</FormRow>
			<div className="card-actions flex items-center justify-end gap-5">
				{difPass && <span className="text-red-600">{err}</span>}
				<label htmlFor="my-modal" className="btn btn-primary">
					{loading ? <Spinner /> : 'Registrar'}
				</label>
			</div>

			<input type="checkbox" id="my-modal" ref={modal} className="modal-toggle" />
			<div className="modal">
				<div className="modal-box max-w-none">
					<article className="prose-sm max-w-none">
						<h1>AVISO DE PRIVACIDADE DO PROJETO INTERN.IO PARA O INOVATEC 2023</h1>
						<p>
							A INTERN.IO tem um forte compromisso com a privacidade e a proteção dos seus dados
							pessoais.
						</p>
						<p>
							Por isso, apresentamos este Aviso de Privacidade, que possui todas as informações
							necessárias sobre quando e para quais finalidades a INTERN.IO trata seus dados
							pessoais, além de informar quais são os seus direitos, quando você utiliza o site como
							pessoa candidata em processos seletivos.
						</p>
						<h1>QUEM SOMOS?</h1>
						<p>
							Site desenvolvido pela turma SIS221N01 do Centro Universitário FAMETRO, Unidade Zona
							Leste, para apresentação na Feira Tecnológica INOVATEC do ano de 2023.
						</p>
						<h1>QUAIS SÃO OS DADOS COLETADOS?</h1>
						<p>
							Nunca coletamos dados pessoais desnecessários de você e não trataremos suas
							informações de quaisquer outras formas que não as especificadas neste Aviso.
						</p>
						<ul>
							<li>
								Dados de Cadastro: Para criar uma conta na plataforma, solicitamos nome completo,
								e-mail, CPF e telefone.
							</li>
							<li>
								Dados de Currículo: Para montar seu currículo, será necessário informar dados de
								formação acadêmica, histórico profissional, data de nascimento, gênero e se você é
								ou não pessoa com deficiência. Ainda se achar necessario pode informar o link
								externo para seu Linkedin.
							</li>
							<li>
								Dados de Diversidade: Caso deseje, você poderá informar dados sobre sua identidade
								de gênero, orientação sexual, cor ou raça e pronome de tratamento mais adequado para
								você. O preenchimento não é obrigatório e o uso desses dados será feito somente com
								o seu consentimento, que pode ser revogado a qualquer tempo.
							</li>
							<li>
								Dados de Navegação: Coletamos dados sobre a sua navegação na Plataforma, que podem
								envolver informações a respeito de seu dispositivo, registros de acesso a aplicação
								de internet
							</li>
						</ul>
						<h1>COM QUEM COMPARTILHAMOS OS DADOS COLETADOS?</h1>
						<p>
							Os dados não serão compartilhados com ninguém além da equipe de desenvolvimento e com
							aqueles que estiverem presentes nos dias da apresentação do projeto.
						</p>
						<h1>COMO PROTEGEMOS SEUS DADOS?</h1>
						<p>
							Esses dados são armazenados em ambiente seguro com camadas básicas de segurança que
							estavam dentro do orçamento da equipe de desenvolvimento do projeto.
						</p>
						<p>
							No entanto, considerando a natureza e arquitetura da internet, o que inclui elementos
							que não estão sob nosso controle, é impossível garantir que agentes mal-intencionados
							não conseguirão ter acesso ou fazer uso indevido de dados pessoais, pois se trata de
							um risco inerente à utilização de sistemas informatizados.
						</p>
						<h1>QUAIS SÃO SEUS DIREITOS?</h1>
						<p>
							<ul>
								<li>
									A correção de seus dados, caso estes estejam incompletos, inexatos ou
									desatualizados;
								</li>
								<li>
									O anonimato, bloqueio ou eliminação de dados desnecessários, excessivos ou
									tratados em desconformidade com a legislação brasileira aplicável, conforme os
									recursos técnicos disponíveis à INTERN.IO;
								</li>
								<li>
									Informações sobre a possibilidade de não fornecer o seu consentimento ao
									tratamento dos dados, bem como de ser informado sobre suas consequências, em caso
									de negativa.
								</li>
							</ul>
						</p>
						<p>
							Nesse sentido, para que você possa exercer seus direitos, basta que entre em contato
							conosco no dia da apresentação ou pelo e-mail thiagovidaportela@gmail.com. A INTERN.IO
							se esforçará para atendê-lo no menor tempo possível.
						</p>
						<blockquote className="font-bold text-lg">
							Atestamos que todos os dados armazenados pelo projeto serão apagados logo ao fim de
							suas demonstrações (02/06/2023).
						</blockquote>
					</article>
					<div className="modal-action">
						<button
							className="btn btn-primary"
							type="submit"
							onClick={() => {
								modal?.current?.click()
							}}
						>
							{loading ? <Spinner /> : 'Registrar'}
						</button>
					</div>
				</div>
			</div>
		</form>
	)
}

export default Register
