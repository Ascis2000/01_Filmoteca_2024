
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext'

import './Nav.css'


const Nav = ({ onAuthClick }) => {

	const { isAuthenticated } = useContext(AuthContext);

	return (
		
		<nav className="navigation">
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
				<li>
					<div className="auth-icon" onClick={onAuthClick}>
						<i className="fa fa-user-circle"></i>
					</div>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
