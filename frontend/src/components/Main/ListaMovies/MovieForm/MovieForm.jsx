
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const MovieForm = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const pelicula = location.state || null; // Si es edición, llega la película

	const [formData, setFormData] = useState({
		titulo: "",
		director: "",
		anio: "",
		sinopsis: ""
	});

	useEffect(() => {
		if (pelicula) {
			setFormData(pelicula); // Pre-rellenar datos para editar
		}
	}, [pelicula]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleVolver = () => {
		navigate(-1); // Volver a la página anterior
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

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

			const method = pelicula ? "PUT" : "POST";
			const endpoint = pelicula
				? `http://localhost:3000/api/movies/update/`
				: "http://localhost:3000/api/movies/create";
			
			

			// Añadir id_user al formData
			const dataToSend = { ...formData, id_user: userId };

			console.log("userId=", userId)
			console.log("dataToSend=", dataToSend)
			console.log("endpoint=", endpoint)

			const response = await fetch(endpoint, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(dataToSend),
			});
			if (response.ok) {
				navigate("/peliculas"); // Redirige a la lista
			} else {
				console.error("Erroooor al guardar la película");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div>
			<h1>{pelicula ? "Editar Película" : "Añadir Nueva Película"}</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Título:</label>
					<input
						type="text"
						name="titulo"
						value={formData.titulo}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Director:</label>
					<input
						type="text"
						name="director"
						value={formData.director}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Año:</label>
					<input
						type="number"
						name="anio"
						value={formData.anio}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Sinopsis:</label>
					<textarea
						name="sinopsis"
						value={formData.sinopsis}
						onChange={handleChange}
						required
					></textarea>
				</div>
				<div className="boxBotonera">
                    	<button onClick={handleVolver}>Cancelar</button>
						<button type="submit">{pelicula ? "Guardar Cambios" : "Crear"}</button>
				</div>
			</form>
		</div>
	);
};

export default MovieForm;
