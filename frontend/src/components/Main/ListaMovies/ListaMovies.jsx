
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import { Tooltip } from 'react-tooltip';

import "./ListaMovies.css";

import utilsToken from "../../../utils/token.js";
import Paginacion from '../../../elements/Paginacion';
import { AuthContext } from "../../../context/AuthContext";
import serviceMovies from '../../../services/movies.service.js';

const ListaMovies = () => {
	const navigate = useNavigate();
	const [peliculas, setPeliculas] = useState([]);

	// desestructuración de la variable de contexto AuthContext
	const { isAuthenticated, user, loading, error } = useContext(AuthContext);

	// PAGINACION
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6; // Películas por página

	// Total de elementos (películas)
	const totalItems = peliculas.length; 

	// Calculamos el rango de películas que se mostrarán según la página actual
	const start = (currentPage - 1) * itemsPerPage;
	const end = currentPage * itemsPerPage;
	const peliculasPaginadas = peliculas.slice(start, end); 

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
				const movies = await serviceMovies.getAllMovies(idUser);
				setPeliculas(movies); // cargamos la variable estado 'peliculas'

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
				const token = Cookies.get("token");

				if (!token) {
					console.error("No JWT token found");
					return;
				}

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
						body: JSON.stringify({ "id_user": userId }),
					}
				);

				if (response.ok) {
					setPeliculas((prevPeliculas) =>
						prevPeliculas.filter((pelicula) => pelicula.id_movie !== peliculaId)
					);
					alert("Película eliminada con éxito");
				} else {
					console.error("Error al eliminar la película:", response.statusText);
				}
			} catch (error) {
				console.error("Error en la solicitud para eliminar la película:", error);
			}
		}
	};

	const handleCreate = () => {
		navigate(`/peliculas/create`);
	};

	const defaultImageUrl = "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"; 

	return (
		<div className="boxMovies">
			<h3>Mis Películas</h3>

			<div className="info">
				<label>Total Películas registradas: {peliculas.length}</label>
				<button 
					className="btn_main" 
					onClick={handleCreate} 
					style={{ marginBottom: "20px" }}>
						Añadir Película
				</button>
			</div>

			<Paginacion
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				totalItems={totalItems}
				onPageChange={(cPage) => setCurrentPage(cPage)}
			/>

			<div className="movie-grid">
				{peliculasPaginadas.map((pelicula) => (
					<div className="movie-card" key={uuidv4()}>
						<div className="box_data1">
							<img src={pelicula.image_url || defaultImageUrl} />
							<h2>{pelicula.titulo}</h2>
						</div>
						
						<div className="box_data2">
							<div>{pelicula.director}</div>
							<div>{pelicula.anio}</div>
						</div>

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
								className="fas fa-eye"
							/>
							<i
								data-tooltip-id="c_ttip"
								data-tooltip-content="Editar"
								data-tooltip-delay-hide={100}
								onClick={() => handleEdit(pelicula)}
								className="fas fa-edit"
							/>
							<i
								data-tooltip-id="c_ttip"
								data-tooltip-content="Borrar"
								data-tooltip-delay-hide={100}
								onClick={() => handleDelete(pelicula.id_movie)}
								className="fas fa-trash-alt"
							/>
						</div>
					</div>
				))}
			</div>

			<Paginacion
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				totalItems={totalItems}
				onPageChange={(cPage) => setCurrentPage(cPage)}
			/>
			<Tooltip id="c_ttip" />
		</div>
	);
};

export default ListaMovies;
