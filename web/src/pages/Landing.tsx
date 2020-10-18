import React from 'react';
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom';


import LogoImg from '../images/logo.svg'


import '../styles/pages/landing.css';

const Landing = () => {

	return (
		<div id="page-landing">
			<div className="content-wrapper">
				<img src={LogoImg} alt="Happy" />

				<main>

					<h1>Leve felicidade para o mundo</h1>
					<p>Visite orfanatos e mude o dia de muitas crianças.</p>

				</main>

				<div className="location">
					<strong>Rio de Janeiro</strong>
					<span>Rio de janeiro</span>
				</div>

				<Link to="/app" className="enter-app">
					<FiArrowRight size={30} color="#0794a0" />
				</Link>

			</div>
		</div>
	);

}

export default Landing;