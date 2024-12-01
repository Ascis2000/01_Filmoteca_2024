
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';

import utilsToken from "../../../utils/token.js";
import { AuthContext } from "../../../context/AuthContext";
import serviceMovies from '../../../services/movies.service.js';

import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import { v4 as uuidv4 } from "uuid";

import "./ListaMovies.css";

const ListaMovies = () => {
	const [peliculas, setPeliculas] = useState([]);
	const navigate = useNavigate();

	// desestructuración de la variable de contexto AuthContext
	const { isAuthenticated, user, loading, error } = useContext(AuthContext);

	useEffect(() => {

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
	}, []);

	const handleDetails = (pelicula) => {
		navigate(`/peliculas/details/${pelicula.id_movie}`, { state: pelicula });
	};

	const handleEdit = (pelicula) => {
		navigate(`/peliculas/edit/${pelicula.id_movie}`, { state: pelicula });
	};

	const handleDelete = async (peliculaId) => {
		const confirmDelete = window.confirm(
			"¿Estás seguro de que deseas eliminar esta película?"
		);

		if (confirmDelete) {
			try {
				// Obtener el JWT de la cookie
				const token = Cookies.get("token");

				if (!token) {
					console.error("No JWT token found");
					return;
				}

				// decodificamos el token para obtener el id del usuario
				const decodedToken = jwt_decode(token);
				const userId = decodedToken.id;

				if (!userId) {
					console.error("No userId found in token");
					return;
				}

				const response = await fetch(
					`http://localhost:3000/api/movies/delete/${peliculaId}`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ "id_user":userId }),
					}
				);

				if (response.ok) {
					// Actualizar la lista de películas después de la eliminación
					setPeliculas((prevPeliculas) =>
						prevPeliculas.filter((pelicula) => pelicula.id_movie !== peliculaId)
					);
					alert("Película eliminada exitosamente.");
				} else {
					console.error(
						"Error al eliminar la película:",
						response.statusText
					);
				}
			} catch (error) {
				console.error("Error en la solicitud para eliminar la película:", error);
			}
		}
	};

	const handleCreate = () => {
		navigate(`/peliculas/create`);
	};

	return (
		<div className="boxMovies">
			<h3>Mis Películas</h3>

			<div className="info">
				<label>Total Películas registradas: {peliculas.length}</label>
				<button onClick={handleCreate} style={{ marginBottom: "20px" }}>
					Añadir Película
				</button>
			</div>

			<div className="movie-grid">

				{peliculas.map((pelicula) => (
					<div className="movie-card" key={uuidv4()}>
						<h2>{pelicula.titulo}</h2>
						<div>{pelicula.director}</div>
						<div>{pelicula.anio}</div>

						<div className="boxRatingStars">
							<i className="fas fa-star on"></i>
							<i className="fas fa-star on"></i>
							<i className="fas fa-star on"></i>
							<i className="fas fa-star on"></i>
							<i className="fas fa-star on"></i>
						</div>

						<div className="boxBotonera">
							<i 
								data-tooltip-id="c_ttip"
								data-tooltip-content="Ver Ficha"
								data-tooltip-delay-hide={100}
								onClick={() => handleDetails(pelicula)} 
								className="fas fa-eye">
							</i>
							<i 
								data-tooltip-id="c_ttip"
								data-tooltip-content="Editar"
								data-tooltip-delay-hide={100}
								onClick={() => handleEdit(pelicula)} 
								className="fas fa-edit">
							</i>
							<i 
								data-tooltip-id="c_ttip"
								data-tooltip-content="Borrar"
								data-tooltip-delay-hide={100}
								onClick={() => handleDelete(pelicula.id_movie)} 
								className="fas fa-trash-alt">
							</i>
						</div>
					</div>
				))}
			</div>
			<Tooltip id="c_ttip" />
		</div>
	);
};

export default ListaMovies;
