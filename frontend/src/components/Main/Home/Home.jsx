
import React, { useContext, useState, useEffect } from 'react';

import { Link } from "react-router-dom";
import utilsToken from "../../../utils/token.js";
import { AuthContext } from "../../../context/AuthContext";
import serviceMovies from '../../../services/movies.service.js';

const Home = () => {

	const [peliculas, setPeliculas] = useState([]); 

	// desestructuración de la variable de contexto AuthContext
	const { isAuthenticated, user, loading, error } = useContext(AuthContext);

	/* if (loading) {
		return <h1>Conectando...</h1>;
	}

	if (error) {
		return <h3>Error: {error}</h3>;
	} */

	// llamamos al serviceMovies utilizando 'isAuthenticated && user'
	useEffect(() => {
		const fetchPeliculas = async () => {
			try {
				if (isAuthenticated && user) {
					const movies = await serviceMovies.getAllMovies(user.id_user); // Obtén las películas con el ID del usuario
					setPeliculas(movies);
				}
			} catch (err) {
				console.error("Error al obtener las películas:", err);
			}
		};

		fetchPeliculas();
	}, [isAuthenticated, user]);

	
	const peliculasTexto = () => {
		if (peliculas.length === 1) {
			return "1 película registrada";
		}
		return `${peliculas.length} películas registradas`;
	};

	/* useEffect(() => {

		const fetchPeliculas = async () => {
			try {
				let idUser = null;

				// obtenemos el token
				const decodedToken = utilsToken.getDecodedToken();

				// obtenemos su identificador de usuario
				if (decodedToken) {
					idUser = decodedToken.id;
				}

				if (!idUser) {
					console.error("ListaMovies: No existe el token");
					return;
				}

				// llamamos al servicio de movies (fetch)
				// `http://localhost:3000/api/movies/all/${idUser}`
				const movies = await serviceMovies.getAllMovies(idUser);
        		setPeliculas(movies);

			} catch (error) {
				console.error("Error en la solicitud fetch:", error);
			}
		};

		fetchPeliculas();
	}, []); */

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
						<div>Tienes actualmente {peliculasTexto()} en tu BBDD</div>
					</>
				) : (
					<>
						<div>
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
								<i className="fa fa-user-circle"></i>
							</div>
						</div>
					</>
				)
			}
		</div>
	);
};

export default Home;