import { FC } from 'react'
import TopNav from '../components/TopNav'
import internio from '../assets/internio.png'
import fametro from '../assets/fametro.png'
import inovatec from '../assets/inovatec.png'
import { Link } from 'react-router-dom'

const LandingPage: FC = () => {
	return (
		<div className="flex flex-col h-screen justify-between text-black bg-[url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] bg-no-repeat bg-fixed bg-center bg-cover w-full">
			<TopNav />
			<main className="mt-16 p-5 h-full">
				<div className="snap-x snap-mandatory bg-none w-full flex h-full overflow-x-auto md:justify-between gap-2">
					<div
						id="slide1"
						className="card shrink-0 w-64 md:w-[32%] snap-center  backdrop-blur-md"
					>
						<div className="card-body">
							<article className="prose prose-p:text-justify prose-p:font-semibold text-black prose-h3:text-black">
								<h3 className="card-title text-lg font-bold uppercase">o Estágio Perfeito</h3>
								<p>
									Nós entendemos que encontrar o estágio perfeito pode ser desafiador, mas estamos
									aqui para facilitar esse processo para você. Nosso site oferece uma plataforma
									fácil de usar, onde você pode explorar uma ampla gama de oportunidades de estágio
									em diversos setores e empresas renomadas.
								</p>
							</article>
						</div>
					</div>
					<div
						id="slide2"
						className="card shrink-0 w-64 md:w-[32%] snap-center  backdrop-blur-md"
					>
						<div className="card-body">
							<article className="prose prose-p:text-justify prose-p:font-semibold text-black prose-h3:text-black">
								<h3 className="card-title text-lg font-bold uppercase">
									Candidatura Simplificada
								</h3>
								<p>
									Com nosso sistema de candidatura simplificado, você pode enviar sua inscrição em
									apenas alguns cliques. Nossa plataforma também permite que você crie um perfil
									personalizado, destacando suas habilidades, experiências e objetivos
									profissionais, para que os recrutadores possam ter uma visão clara do seu
									potencial.
								</p>
							</article>
						</div>
					</div>
					<div
						id="slide3"
						className="card shrink-0 w-64 md:w-[32%] snap-center  backdrop-blur-md"
					>
						<div className="card-body md:justify-between">
							<article className="prose prose-p:text-justify prose-p:font-semibold text-black prose-h3:text-black">
								<h3 className="card-title text-lg font-bold uppercase">um Futuro Brilhante</h3>
								<p>
									Não perca mais tempo, comece a explorar as oportunidades de estágio disponíveis
									agora mesmo! Estamos ansiosos para fazer parte da sua história profissional e
									ajudá-lo a alcançar seus sonhos. Junte-se a nós e dê um salto em direção ao seu
									futuro brilhante!
								</p>
							</article>
							<div className="card-actions justify-end">
								<Link to='/register' className="btn btn-primary">Comece já!</Link>
							</div>
						</div>
					</div>
				</div>
			</main>
			<footer className="footer h-fit text-white footer-center p-6 bg-base-100">
				<div>
					<div className="flex flex-col md:flex-row gap-4 md:gap-52 justify-evenly">
						<img src={internio} className="w-[200px]" alt="" />
						<img src={fametro} className="w-[200px]" alt="" />
						<img src={inovatec} className="w-[200px]" alt="" />
					</div>
					<p>Copyright © 2023 - Todos os direitos reservados</p>
				</div>
			</footer>
		</div>
	)
}

export default LandingPage
