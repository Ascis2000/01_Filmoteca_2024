
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext'

import './Nav.css'


const Nav = ({ onAuthClick }) => {

	const { isAuthenticated } = useContext(AuthContext);

	return (
		
		<nav className="navigation">
			<div className="logo-container">
				<i className="fas fa-video fa-2x"></i>
				<div className="logo">
					<Link to="/">Filmoteca 2024</Link>
				</div>
			</div>
			<ul>
				<li><Link to="/">Home</Link></li>
				{
					isAuthenticated ? (
						<>
							<li><Link to="/peliculas">Mis Películas</Link></li>
							<li><Link to="/users/perfil">Mi perfil</Link></li>
						</>
						
					) : null
				}

			</ul>
			<div className={`auth-icon ${isAuthenticated ? "on" : ""}`} onClick={onAuthClick}>
				<i className="fa fa-user-circle"></i>
			</div>
		</nav>
	);
};

export default Nav;
