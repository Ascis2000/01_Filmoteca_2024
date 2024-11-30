
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {

	const { isAuthenticated, user, loading, error } = useContext(AuthContext);

    if (loading) {
        return <h1>Conectando...</h1>;
    }

    if (error) {
        return <h3>Error: {error}</h3>;
    }

    return (
        <div className="home">
            {
				isAuthenticated ? (
					<>
						<h2>Usuario: {user?.nombre}</h2>
						<p>Tu tipo de rol actual es:
						{
								user?.role == 1 ? " No Premium" : 
								user?.role == 2 ? " Premium" : " Admin"
						}
						</p>
						<div>Acceso a <label><Link to="/peliculas">Mis Películas</Link></label></div>
					</>
				) : (
					<>
						<p>
							<h2>Bienvenid@ a la Filmoteca 2024</h2>
							<div className="boxInfoBienvenida">
								En esta App, podrás crear tu propia Filmoteca
								personalizada, con tus propios datos, comentarios,
								imagenes, etc.<br></br><br></br>
								Además, podrás llegar a ser 'Usuario Premium' si Registras
								en tu BBDD tus primeras 5.000 películas o puedes optar
								por ser 'Usuario Premium' ahora mismo optando por nuestras
								ofertas especiales para Usuarios.
								<br></br><br></br>

								Por favor, para iniciar sesión o registrarte pulsa en el icono &nbsp; 
								<i class="fa fa-user-circle"></i>
							</div>
						</p>
					</>
					
				)
			}
        </div>
    );
};

export default Home;