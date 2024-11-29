
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import { v4 as uuidv4 } from "uuid";

const ListaMovies = () => {
	const [peliculas, setPeliculas] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPeliculas = async () => {
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
					`http://localhost:3000/api/movies/all/${userId}`,
					{
						method: "GET",
						headers: { "Content-Type": "application/json" },
					}
				);

				if (response.ok) {
					const data = await response.json();
					setPeliculas(data.movies);
				} else {
					console.error("Error al obtener las películas:", response.statusText);
				}
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
		<div>
			<h1>Mis Películas</h1>
			<h3>Listado de películas</h3>
			<button onClick={handleCreate} style={{ marginBottom: "20px" }}>
				Añadir Película
			</button>
			<ul>
				{peliculas.map((pelicula) => (
					<li key={uuidv4()}>
						<div>
							{pelicula.titulo} de {pelicula.director}. ({pelicula.anio})
						</div>
						<button onClick={() => handleDetails(pelicula)} style={{ marginLeft: "10px" }}>
							Detalle
						</button>
						<button onClick={() => handleEdit(pelicula)} style={{ marginLeft: "10px" }}>
							Editar
						</button>
						<button
							onClick={() => handleDelete(pelicula.id_movie)}
							style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
						>
							Borrar
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ListaMovies;
